<template>
  <div>
    <PriceComponent
      v-for="priceComponent in priceComponents"
      :key="priceComponent.id"
      :label="priceComponent.label"
      :value="priceComponent.value"
      :is-protected="priceComponent.isProtected"
      @on-delete="onDelete(priceComponent.id)"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import { State } from "@/store";
import PriceComponent from "@/components/PriceComponent.vue";

export default defineComponent({
  name: "PriceComponents",
  components: { PriceComponent },
  setup() {
    const store = useStore<State>();

    return {
      priceComponents: computed<State["priceComponents"]>(
        () => store.state.priceComponents
      ),
      onDelete: (id: number) => store.commit("REMOVE_PRICE_COMPONENT", { id }),
    };
  },
});
</script>
