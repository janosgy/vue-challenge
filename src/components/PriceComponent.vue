<template>
  <div class="priceComponent">
    <input type="text" :value="label" placeholder="Label" />
    <button class="btn btn-edit" type="button" v-if="!isProtected">\</button>

    <input
      type="number"
      :value="value"
      placeholder="value"
      min="0"
      @blur="onSubmit()"
    />
    <button
      class="btn btn-delete"
      type="button"
      v-if="!isProtected"
      @click="$emit('onDelete')"
    >
      X
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
  emits: ["on-delete"],
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
