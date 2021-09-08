<template>
  <v-container>
    <v-row class="justify-space-around mb-10">
      <v-col class="d-flex justify-space-around" cols="6" lg="4">
        <div class="text-center">
          <h2 class="mb-2">Tables</h2>
          <v-badge
            bottom
            :content="this.tables.length"
          >
              <v-btn
              fab
              dark
              x-large
              outlined
              color="purple"
              to="/table">
                <v-icon x-large>
                  mdi-table-furniture
                </v-icon>
              </v-btn>
          </v-badge>
        </div>
      </v-col>
      <v-col class="d-flex justify-space-around" cols="6" lg="4">
        <div class="text-center">
          <h2 class="mb-2">Invités</h2>
          <v-badge
            bottom
            :content="this.invites.length"
          >
              <v-btn
              fab
              dark
              x-large
              outlined
              color="indigo"
              to="/invite">
                <v-icon x-large>
                  mdi-account-multiple
                </v-icon>
              </v-btn>
          </v-badge>
        </div>
      </v-col>
      <v-col class="d-flex justify-space-around" cols="12" lg="4" :class="$vuetify.breakpoint.mdAndDown ? 'mt-5' : ''">
        <div class="text-center">
          <h2 class="mb-2">Déconnexion</h2>
          <v-btn
          fab
          dark
          x-large
          outlined
          color="red"
          @click="disconnect">
            <v-icon x-large>
              mdi-power
            </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { container } from 'tsyringe'
import { DependencyInjectionEnum } from '~/plugins/dependencie-injection.enum'
import LoginPassAuthInterface from '~/services/providers/auth/login.pass.auth.interface'
import { inviteStore, tableStore, userStore } from '~/store'

@Component
export default class HomeConnected extends Vue {
  // Auth Service
  private loginPassAuthProvider: LoginPassAuthInterface = container.resolve(DependencyInjectionEnum.LoginPassAuthProvider)
  
  async beforeMount() {
    tableStore.findAll()
    inviteStore.findAll()
  }

  get tables() {
    return tableStore.tables || []
  }

  get invites() {
    return inviteStore.invites || []
  }

  disconnect() {
    console.log('la')
    this.loginPassAuthProvider.disconnect().then(() => {
      userStore.disconnect()
      console.log('ici')
    })
  }

}
</script>

<style>
.text-center {
  text-align: center;
}

.title-font {
  font-family: 'Adine Kirnberg';
  font-size: 4rem;
}
</style>