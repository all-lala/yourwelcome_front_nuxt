<template>
  <v-list tile>
    <v-list-item-group
      color="gray"
    >
      <template v-for="(table, index) in tables">
        <v-divider v-if="index > 0" :key="index"></v-divider>
        <v-list-item :key="table.id" :to="`/table/${table.id}`">
          <v-list-item-title>{{ table.name }}</v-list-item-title>
          <v-list-item-action-text><v-chip :color="table.invites.length? 'green': 'red'">{{ table.invites.length }}</v-chip></v-list-item-action-text>
        </v-list-item>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { pageStore, tableStore } from '~/store'

@Component({
  layout: 'page'
})
export default class TableList extends Vue {
  mounted() {
    pageStore.setTitle('Tables')
    pageStore.setPrevious('/')
    pageStore.setValidIsVisible(false)
    tableStore.findAll()
  }

  get tables() {
    return [...tableStore.tables].sort((a, b) => a.name > b.name ? 1 : -1)
  }
}
</script>

<style>

</style>