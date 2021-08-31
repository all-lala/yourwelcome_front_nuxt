<template>
  <v-list tile>
    <v-card>
      <v-toolbar>
        <v-toolbar-title class="grow">
          <v-text-field v-model="filter" clearable label="Filtre" outlined hide-details class="grow"></v-text-field>
        </v-toolbar-title>
        <v-btn
          color="pink"
          fab
          dark
          small
          absolute
          bottom
          right
          to="/invite/new"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-list-item-group
      color="gray"
    >
      <template v-for="(invite, index) in invites">
        <v-divider v-if="index > 0" :key="index"></v-divider>
        <v-list-item :key="invite.id" :to="`/invite/${invite.id}`">
          <v-list-item-title>{{ invitePresentation(invite) }}</v-list-item-title>
          <v-list-item-action v-if="invite.table">{{ invite.table.name }}</v-list-item-action>
        </v-list-item>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import InviteInterface from '~/models/invite/invite.interface'
import { inviteStore, pageStore } from '~/store'

@Component({
  layout: 'page'
})
export default class TableList extends Vue {
  private filter: string =''

  mounted() {
    pageStore.setTitle('Invites')
    pageStore.setPrevious('/')
    pageStore.setValidIsVisible(false)
    inviteStore.findAll()
  }

  invitePresentation(invite: InviteInterface) {
    return `${invite.nom} ${invite.prenom}`
  }

  get invites() {
    return [...inviteStore.invites]
    .filter(invite => this.invitePresentation(invite).includes(this.filter))
    .sort((a, b) => (a.nom+a.prenom) > (b.nom+b.prenom) ? 1 : -1)
  }
}
</script>

<style>

</style>