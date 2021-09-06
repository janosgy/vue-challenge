<template>
  <fieldset class="cost">
    <legend>Price Components</legend>

    <TotalCost />
    <PriceComponents />

    <NewPriceComponent />
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NewPriceComponent from "./NewPriceComponent.vue";
import PriceComponents from "./PriceComponents.vue";
import TotalCost from "@/components/TotalCost.vue";

export default defineComponent({
  name: "Cost",
  components: { TotalCost, NewPriceComponent, PriceComponents },
});
</script>

<style lang="scss" scoped>
.cost {
  text-align: left;
  width: 50%;
  max-width: 500px;
}
</style>
