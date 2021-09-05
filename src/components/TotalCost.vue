<template>
  <div class="row">
    <div class="col">Total: {{ total }} EUR/KG</div>
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

<style lang="scss" scoped>
.row {
  justify-content: flex-end;
}
</style>
