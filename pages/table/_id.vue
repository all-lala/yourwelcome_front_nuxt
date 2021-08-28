<template>
  <v-container>
    <v-form v-if="table && table.id">
      <v-text-field
        :value="table.name"
        @input="setName"
        label="Nom de la table"
        required
      ></v-text-field>
      <v-switch
        :value="!!table.inviteMax"
        @change="setInviteMaxSlide"
        label="Alerte maximum d'invité"/>
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
          color="indigo darken-1"
          light
        >
          <v-spacer/>
          <v-toolbar-title class="white--text">Invités à la table ({{ table.invites.length }})</v-toolbar-title>
          <v-spacer/>
          <v-btn
            color="pink"
            fab
            dark
            small
            absolute
            top
            right
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list subheader>
          <v-list-item-group>
            <template v-for="(invite, index) in table.invites">
              <v-divider v-if="index > 0" :key="index"/>
              <v-list-item :key="invite.id">
                <v-list-item-title>{{ invite.nom }} {{ invite.prenom }}</v-list-item-title>
                <v-list-item-action><v-btn color="warning" icon rounded><v-icon>mdi-minus</v-icon></v-btn></v-list-item-action>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { pageStore, tableStore } from '~/store'

@Component({
  layout: 'page'
})
export default class TableEdit extends Vue {
  mounted() {
    pageStore.setTitle('Chargement')
    pageStore.setPrevious('/table')
    pageStore.setValidIsVisible(true)
    tableStore.find(this.$route.params.id)
  }

  get table() {
    pageStore.setTitle(tableStore.table?.name || 'Chargement')
    return tableStore.table
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
}
</script>
