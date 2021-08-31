<template>
  <v-container>
    <v-form v-if="table && table.id && !sauvegarde">
      <v-text-field
        :value="table.name"
        @input="setName"
        label="Nom de la table"
        readonly
        required
      ></v-text-field>
      <v-switch
        :input-value="!!table.inviteMax"
        @change="setInviteMaxSlide"
        label="Alerte maximum d'invité"
        >
        <template v-slot:label>
          <v-icon color="orange" class="mr-2">mdi-alert-outline</v-icon>
          Alerte maximum d'invité?
        </template>

      </v-switch>
      <v-text-field
        class="mb-5"
        v-if="!!table.inviteMax"
        :value="table.inviteMax"
        type="number"
        @change="setInviteMax"
        label="Nombres d'invités maximum à la table"
      ></v-text-field>
      <v-card>
        <v-toolbar
          :color="table.inviteMax && table.invites.length > table.inviteMax ? 'red darken-1': 'indigo darken-1'"
          light
        >
          <v-spacer/>
          <v-toolbar-title class="white--text">Invités à la table ({{ table.invites.length }})</v-toolbar-title>
          <v-spacer/>
        </v-toolbar>
        <v-list subheader>
          <v-list-item-group>
            <template v-for="(invite, index) in table.invites">
              <v-divider v-if="index > 0" :key="index"/>
              <v-list-item :key="invite.id">
                <v-list-item-title>{{ invite.nom }} {{ invite.prenom }}</v-list-item-title>
                <v-list-item-action><v-btn color="warning" @click="removeInvite(invite)" icon rounded ><v-icon>mdi-minus</v-icon></v-btn></v-list-item-action>
              </v-list-item>
            </template>
          </v-list-item-group>
          <v-list-item v-if="invitesList.length > 1" class="blue lighten-4" light>
            <v-list-item-content><v-autocomplete :items="invitesList" v-model="selectedInvite" solo-inverted filled :hide-details="true" class="white"></v-autocomplete></v-list-item-content>
            <v-list-item-action-text><v-btn text color="green" @click="addInvite" :disabled="!selectedInvite.id" ><v-icon class="mr-2">mdi-account-plus</v-icon><span v-if="!$vuetify.breakpoint.mobile">Ajouter</span></v-btn></v-list-item-action-text>
          </v-list-item>
        </v-list>
      </v-card>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import InviteInterface from '~/models/invite/invite.interface'
import TableInterface from '~/models/table/table.interface'
import { pageStore, tableStore, inviteStore } from '~/store'

@Component({
  layout: 'page'
})
export default class TableEdit extends Vue {
  private sauvegarde = false
  private invites: InviteInterface[] = []
  private selectedInvite: InviteInterface = {} as InviteInterface

  beforeMount() {
    pageStore.setTitle('Chargement')
    pageStore.setPrevious('/table')
    pageStore.setValidIsVisible(true)
    pageStore.setOnValid(this.valid)
    tableStore.find(this.$route.params.id)
    inviteStore.findAll().then(invites => this.invites = invites)
  }

  get table() {
    pageStore.setTitle(tableStore.table?.name || 'Chargement')
    return tableStore.table || {} as TableInterface
  }

  get invitesList() {
    const result = this.invites.filter(invite => !this.table?.invites.find(tableInvite => tableInvite.id === invite.id)).map(invite =>
      ({
        text: `${invite.nom} ${invite.prenom}` + (invite.table ? ` à la table ${invite.table}` : ''),
        value: invite,
      })
    )
    result.unshift({text: 'Aucun', value: {} as InviteInterface})
    return result
  }

  setName(value: string) {
    tableStore.setProperty({property: 'name', value})
  }

  setInviteMax(value: number) {
    tableStore.setProperty({property: 'inviteMax', value})
  }

  setInviteMaxSlide(value: boolean) {
    const newValue = value ? this.table?.inviteMax || 1 : 0
    tableStore.setProperty({property: 'inviteMax', value: newValue})
  }

  valid() {
    pageStore.setTitle('Sauvegarde ...')
    this.sauvegarde = true
    tableStore.save().then(table => this.$router.push('/table'))
  }

  addInvite() {
    if(this.selectedInvite) {
      const invites: InviteInterface[] = [...this.table.invites] || []
      invites.push(this.selectedInvite)
      this.selectedInvite = {} as InviteInterface
      tableStore.setProperty({property: 'invites', value: invites})
    }
  }

  removeInvite(inviteToRemove: InviteInterface) {
    const invites: InviteInterface[] = this.table.invites.filter(invite => invite.id !== inviteToRemove.id)
    tableStore.setProperty({property: 'invites', value: invites})
  }
}
</script>
