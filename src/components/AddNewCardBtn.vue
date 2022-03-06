<template>
  <button class="add-new-card-btn">
    <PlusCircle class="add-new-card-btn__icon" />
    <span>New card</span>
  </button>
</template>

<script lang="ts" setup>
import PlusCircle from '~/assets/svg/plus-circle.svg?component'
</script>

<style lang="scss">
.add-new-card-btn {
  @apply font-bold text-cyan prose-3 flex items-center whitespace-nowrap;
  @apply lg:px-3 lg:py-2 lg:bg-dark-blue-1 lg:rounded lg:text-white;
  &__icon {
    @apply mr-1.5;
  }
}
</style>
