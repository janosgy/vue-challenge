<template>
  <div>
    <div class="row end-xs">
      <div class="col-xs-11">Total: {{ total }} EUR/KG</div>
      <div class="col-xs-1"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { formatPrice } from "@/util/formatPrice";

export default defineComponent({
  name: "TotalCost",
  setup() {
    const store = useStore();

    return {
      total: computed(() => formatPrice(store.getters.totalCost)),
    };
  },
});
</script>
