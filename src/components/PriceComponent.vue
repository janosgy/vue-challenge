<template>
  <div class="priceComponent">
    <input type="text" v-model.trim="updatedLabel" placeholder="Label" />

    <button class="btn btn-edit" type="button" v-if="!isProtected">\</button>

    <input
      type="number"
      v-model.number="updatedValue"
      placeholder="value"
      min="0"
      @change="onValueChange()"
    />

    <button
      class="btn btn-delete"
      type="button"
      v-if="!isProtected"
      @click="$emit('on-delete')"
    >
      X
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { isValid } from "@/util/valueValidator";

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
    const updatedValue = ref(props.value);
    const updatedLabel = ref(props.label);

    return {
      updatedValue,
      updatedLabel,
      onValueChange: () => {
        if (!isValid(updatedValue.value)) {
          updatedValue.value = 0;
        }
        emit("on-change", { value: updatedValue.value });
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.priceComponent {
  .btn {
    display: none;
  }

  &:hover .btn {
    display: unset;
  }
}
</style>
