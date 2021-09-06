<template>
  <div class="row center-xs">
    <Cost />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cost from "@/components/Cost.vue";

export default defineComponent({
  name: "Home",
  components: {
    Cost,
  },
});
</script>
