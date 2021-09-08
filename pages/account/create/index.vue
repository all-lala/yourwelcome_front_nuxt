<template>
  <v-container>
    <v-row class>
      <v-col offset-lg="3" lg="6" >
        <v-form>
          <v-card>
            <v-toolbar color="blue">
              <v-toolbar-title>
                Créer un Compte
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field label="Identifiant (email)" v-model="login" clearable/>
                <v-text-field label="Mot de passe" type="password" v-model="password" clearable/>
                <v-text-field label="Valider le mot de passe" type="password" v-model="passwordValid" clearable/>
            </v-card-text>
            <v-card-actions>
              <v-btn to="/" color="secondary" text>
                Retour
              </v-btn>
              <v-spacer />
              <v-btn @click="create" color="primary">
                Créer un compte
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>

  </v-container>

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CreateAccount extends Vue {
  private login: string = ''
  private password: string = ''
  private passwordValid: string = ''

  create() {

  }
}
</script>

<style>

</style>