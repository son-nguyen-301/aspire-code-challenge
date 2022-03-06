<template>
    <q-item
        v-bind="$attrs"
        class="side-bar-nav-btn"
        clickable
        manual-focus
        exact-active-class="side-bar-nav-btn--active"
    >
        <div class="side-bar-nav-btn__icon">
            <slot name="icon"></slot>
        </div>
        <div class="side-bar-nav-btn__label">
            <slot></slot>
        </div>
    </q-item>
</template>

<style lang="scss">
.side-bar-nav-btn {
    @apply text-white hover:text-brand;
    @apply flex flex-row items-center justify-start #{!important};
    &__icon {
        @apply mr-4 flex items-center;
    }
    &__label {
        @apply prose-7;
    }
    &--active {
        @apply text-brand font-bold;
    }
}
</style>