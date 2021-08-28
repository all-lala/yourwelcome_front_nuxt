<template>
  <v-app>
    <v-app-bar
      fixed
      app
    >
      <v-btn icon :to="previous" exact><v-icon>mdi-arrow-left</v-icon></v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon exact><v-icon>mdi-cog-outline</v-icon></v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation
      v-if="validIsVisible"
      color="primary"
      fixed
    >
      <v-btn class="green">
        <span>Valider</span>
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-footer
      v-else
      fixed
      app
    >
    All-lala 2021
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { pageStore } from '~/store'

@Component
export default class  extends Vue {
  get validIsVisible() {
    return pageStore.validIsVisible
  }

  get title() {
    return pageStore.title
  }
  get previous() {
    return pageStore.previous
  }
}
</script>
