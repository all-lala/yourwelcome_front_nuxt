<template>
  <v-form>
    <v-text-field label="Nom" :value="invite.nom" @input="setNom"/>
    <v-text-field label="Prenom" :value="invite.prenom" @input="setPrenom"/>
    <badge-input label="Badge" :value="invite.badge" @input="setInvite"/>
    <v-select label="table" :items="tables" :value="invite.table" @change="setTable" />
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TableInterface from '~/models/table/table.interface'
import { inviteStore, tableStore } from '~/store'
import BadgeInput from '~/components/badge.input.vue'

@Component({
  components: {
    BadgeInput
  }
})
export default class InviteForm extends Vue {
  get invite() {
    return inviteStore.invite
  }

  get tables() {
    return tableStore.tables.map(table => ({
      text: table.name,
      value: table
    }))
  }

  setNom(value: string) {
    inviteStore.setProperty({property: 'nom', value})
  }

  setPrenom(value: string) {
    inviteStore.setProperty({property: 'prenom', value})
  }

  setInvite(value: string) {
    inviteStore.setProperty({property: 'badge', value})
  }

  setTable(table: TableInterface) {
    inviteStore.setProperty({property: 'table', value: table})
  }

}
</script>

<style>

</style>