<template>
  <q-layout view="hHh lpR fFf" class="app-layout">
    <q-drawer
      v-if="!$q.screen.lt.md"
      :model-value="true"
      class="app-layout__drawer"
      :width="340"
      behavior="desktop"
    >
      <div class="app-layout__drawer__content">
        <div class="app-layout__drawer__content__header">
          <logo-with-text />
          <div
            class="app-layout__drawer__content__header__introduce"
          >Trusted way of banking for 3,000+ SMEs and startups in Singapore</div>
        </div>

        <q-list class="app-layout__drawer__content__header__menu">
          <side-bar-nav-btn to="/home" exact>
            <template #icon>
              <logo />
            </template>
            Home
          </side-bar-nav-btn>
          <side-bar-nav-btn to="/" exact>
            <template #icon>
              <view-card-icon />
            </template>
            Cards
          </side-bar-nav-btn>
          <side-bar-nav-btn to="/payments" exact>
            <template #icon>
              <payments-icon />
            </template>
            Payments
          </side-bar-nav-btn>
          <side-bar-nav-btn to="/credit" exact>
            <template #icon>
              <credit-icon />
            </template>
            Credit
          </side-bar-nav-btn>
          <side-bar-nav-btn to="/profile" exact>
            <template #icon>
              <profile-icon />
            </template>
            Profile
          </side-bar-nav-btn>
        </q-list>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
    <q-footer v-if="$q.screen.lt.md" class="app-layout__footer">
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        active-bg-color="white"
        class="app-layout__footer__tabs"
      >
        <bottom-nav-btn exact to="/home">
          <template #icon>
            <logo />
          </template>
          Home
        </bottom-nav-btn>
        <bottom-nav-btn exact to="/">
          <template #icon>
            <view-card-icon />
          </template>
          Cards
        </bottom-nav-btn>
        <bottom-nav-btn exact to="/payments">
          <template #icon>
            <payments-icon />
          </template>
          Payments
        </bottom-nav-btn>
        <bottom-nav-btn exact to="/credit">
          <template #icon>
            <credit-icon />
          </template>
          Credit
        </bottom-nav-btn>
        <bottom-nav-btn exact to="/profile">
          <template #icon>
            <profile-icon />
          </template>
          Profile
        </bottom-nav-btn>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import Logo from '~/assets/svg/logo.svg?component'
import LogoWithText from '~/assets/svg/logo-with-text-green.svg?component'
import ViewCardIcon from '~/assets/svg/view-card.svg?component'
import PaymentsIcon from '~/assets/svg/payments.svg?component'
import CreditIcon from '~/assets/svg/credit.svg?component'
import ProfileIcon from '~/assets/svg/account.svg?component'
import BottomNavBtn from '../components/BottomNavBtn.vue'
import SideBarNavBtn from 'src/components/pages/SideBarNavBtn.vue'
</script>

<style lang="scss">
.app-layout {
  .q-drawer {
    @apply fixed;
  }
  &__drawer {
    @apply bg-dark-blue  #{!important};

    &__content {
      @apply sticky top-0 p-12;
      &__header {
        &__introduce {
          @apply text-white opacity-30 prose-6 mt-19px;
        }
        &__menu {
          @apply mt-81px text-white flex flex-col gap-11;
        }
      }
    }
  }
  &__footer {
    @apply bg-white #{!important};
    filter: drop-shadow(0px 0px 3px #00000014);
    &__tabs {
      @apply text-grey py-2 pt-1;
    }
  }
}
</style>
