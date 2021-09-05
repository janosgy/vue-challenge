<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.row {
  display: flex;
  flex-flow: row wrap;

  &-between {
    justify-content: space-between;
  }

  &-center {
    justify-content: center;
  }
}
</style>
