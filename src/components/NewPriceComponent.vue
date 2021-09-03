<template>
  <div>
    <input type="text" v-model.trim="label" placeholder="Label" />
    <input
      type="number"
      v-model.number="value"
      placeholder="value"
      min="0"
      @blur="onSubmit()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

const initialLabel = "";
const initialValue = null;

export default defineComponent({
  name: "NewPriceComponent",
  setup() {
    const store = useStore();

    const label = ref(initialLabel);
    const value = ref(initialValue);

    const onSubmit = () => {
      if (
        !label.value.length ||
        value.value === "" ||
        (value.value ?? -1) < 0
      ) {
        console.warn(`Invalid form data: ${label.value}, ${value.value}`);
        return;
      }

      store.commit("ADD_PRICE_COMPONENT", {
        label: label.value,
        value: value.value,
      });

      label.value = initialLabel;
      value.value = initialValue;
    };

    return {
      onSubmit,
      label,
      value,
    };
  },
});
</script>

<style scoped>
input {
  color: gray;
}
</style>
