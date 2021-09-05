<template>
  <div class="row row-between">
    <div class="col">
      <input
        type="text"
        :class="{ invalid: !labelValid }"
        v-model.trim="label"
        placeholder="Label"
      />
    </div>
    <div class="col">
      <input
        v-model.number="value"
        :class="{ invalid: !valueValid }"
        placeholder="value"
        @blur="onSubmit()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { isValid } from "@/util/valueValidator";

const initialLabel = "";
const initialValue = null;

export default defineComponent({
  name: "NewPriceComponent",
  setup() {
    const store = useStore();

    const label = ref(initialLabel);
    const labelValid = ref(true);
    const value = ref(initialValue);
    const valueValid = ref(true);

    const onSubmit = () => {
      labelValid.value = !!label.value.length;
      valueValid.value = isValid(value.value);

      if (!labelValid.value || !valueValid.value) {
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
      labelValid,
      value,
      valueValid,
    };
  },
});
</script>

<style lang="scss" scoped>
input {
  color: gray;

  &.invalid {
    border-color: red;
  }
}
</style>
