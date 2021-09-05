<template>
  <div
    class="priceComponent row row-between"
    @mouseenter="setHovered(true)"
    @mouseleave="setHovered(false)"
  >
    <div class="col">
      <input type="text" v-model.trim="updatedLabel" placeholder="Label" />
    </div>
    <div class="col">
      <button class="btn" type="button" v-if="!isProtected" v-show="isHovered">
        \
      </button>
    </div>

    <div class="col">
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

    <div class="delete-wrapper">
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
      setHovered: (newVal: boolean) => (isHovered.value = newVal),
      formatValue,
      unformatValue,
      isHovered,
    };
  },
});
</script>

<style lang="scss" scoped>
.priceComponent {
  position: relative;
}

.valueInput {
  text-align: right;
}

.delete-wrapper {
  position: absolute;
  right: -30px;
}
</style>
