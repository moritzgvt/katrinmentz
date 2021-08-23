<template>
  <div :class="'grid-' + cols">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    cols: {
      type: String,
      default: '12'
    }
  }
}
</script>
