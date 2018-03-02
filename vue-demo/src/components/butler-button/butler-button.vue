<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>
<style lang="scss" scoped>
@import './butler-button.scss';
</style>

<script>
export default {
  name: 'butler-button'
}
</script>
