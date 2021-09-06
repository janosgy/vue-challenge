<template>
  <div class="row between-xs">
    <div class="col-xs-4 col-xs-offset-1">
      <input
        type="text"
        v-model.trim="label"
        placeholder="Label"
        @blur="onSubmit()"
      />
    </div>
    <div class="col-xs-1"></div>
    <div class="col-xs-3">
      <input v-model.number="value" placeholder="value" @blur="onSubmit()" />
    </div>
    <div class="col-xs-1"></div>
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
    const value = ref(initialValue);

    const onSubmit = () => {
      if (!label.value.length || !isValid(value.value)) {
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

<style lang="scss" scoped>
input {
  color: gray;
}
</style>
