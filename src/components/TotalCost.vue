<template>
  <div>Total: {{ total }} EUR/KG</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TotalCost",
  setup() {
    const store = useStore();

    return {
      total: computed(() => store.getters.totalCost),
    };
  },
});
</script>
