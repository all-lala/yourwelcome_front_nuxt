<template>
  <home-connected v-if="isConnected" />
  <home-disconnected v-else />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { userStore } from '~/store'

@Component
export default class  extends Vue {
  get isConnected () {
    return userStore.me && userStore.me.id
  }
}
</script>