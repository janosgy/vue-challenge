<template>
  <div
    class="priceComponent row between-xs"
    @mouseenter="setHovered(true)"
    @mouseleave="setHovered(false)"
  >
    <div class="col-xs-4 col-xs-offset-1 label-wrapper">
      <div v-if="!isEditing">{{ label }}</div>
      <input
        v-if="isEditing"
        type="text"
        v-model.trim="updatedLabel"
        placeholder="Label"
        @change="onLabelChange()"
        @blur="toggleEditMode()"
      />
    </div>
    <div class="col-xs-1">
      <button
        class="btn"
        type="button"
        v-if="!isProtected"
        v-show="isHovered"
        @click="toggleEditMode()"
      >
        \
      </button>
    </div>

    <div class="col-xs-3">
      <input
        class="valueInput"
        v-model.number="updatedValue"
        placeholder="value"
        min="0"
        @focus="unformatValue()"
        @blur="formatValue()"
        @change="onValueChange()"
      />
    </div>

    <div class="col-xs-1">
      <button
        class="btn"
        type="button"
        v-if="!isProtected"
        v-show="isHovered"
        @click="$emit('on-delete')"
      >
        X
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { isValid } from "@/util/valueValidator";
import { formatPrice } from "@/util/formatPrice";

export default defineComponent({
  name: "PriceComponent",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    isProtected: {
      type: Boolean,
    },
  },
  emits: ["on-delete", "on-change"],
  setup(props, { emit }) {
    const updatedValue = ref(props.value.toString());
    const updatedLabel = ref(props.label);
    const isHovered = ref(false);
    const isEditing = ref(false);

    const formatValue = () => (updatedValue.value = formatPrice(props.value));
    const unformatValue = () => (updatedValue.value = props.value.toString());

    onMounted(formatValue);

    return {
      updatedValue,
      updatedLabel,
      onValueChange: () => {
        let newVal = parseFloat(updatedValue.value);
        if (!isValid(newVal)) {
          newVal = 0;
        }
        emit("on-change", { value: newVal });
      },
      onLabelChange: () => {
        if (!updatedLabel.value.length) {
          updatedLabel.value = props.label; //reset label
          return;
        }
        emit("on-change", { label: updatedLabel.value });
      },
      setHovered: (newVal: boolean) => (isHovered.value = newVal),
      toggleEditMode: () => (isEditing.value = !isEditing.value),
      formatValue,
      unformatValue,
      isHovered,
      isEditing,
    };
  },
});
</script>

<style lang="scss" scoped>
.priceComponent {
  position: relative;
  margin-bottom: 5px;
}

.label-wrapper {
  overflow: hidden;
}

.valueInput {
  text-align: right;
}
</style>
