<template>
  <v-container>
    <v-row class>
      <v-col offset-lg="3" lg="6" >
        <v-form ref="loginForm" v-model="valid" >
          <v-card>
            <v-toolbar color="blue">
              <v-toolbar-title>
                Connexion
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field label="Identifiant" v-model="login" :rules="loginRules" clearable/>
                <v-text-field label="Mot de passe" type="password" v-model="password" :rules="passwordRules" clearable/>
            </v-card-text>
            <v-slide-y-transition>
              <v-card-text class="red text-center font-weight-bold body-1" v-if="loginError">{{ loginError }}</v-card-text>
            </v-slide-y-transition>
            <v-card-actions>
              <v-btn to="/account/create" color="secondary" text>
                Créer un compte
              </v-btn>
              <v-spacer />
              <v-btn @click="connexion" color="primary" :loading="loading">
                Se connecter
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
import { container } from 'tsyringe'
import { DependencyInjectionEnum } from '~/plugins/dependencie-injection.enum'
import LoginPassAuthInterface from '~/services/providers/auth/login.pass.auth.interface'
import { userStore } from '~/store'

@Component
export default class LoginAccount extends Vue {
  // Auth Service
  private loginPassAuthProvider: LoginPassAuthInterface = container.resolve(DependencyInjectionEnum.LoginPassAuthProvider)

  private loginError = ''
  
  private login: string = ''
  private readonly loginRules = [
        (v: string) => !!v || 'Le login est requis',
        (v: string) => /.+@.+\..+/.test(v) || 'Le login doit avoir le format aaaa@bbbb.cc',
      ]
  private password: string = ''
  private readonly passwordRules = [
        (v: string) => !!v || 'Le mot de passe est requis',
      ]
  private loading: boolean = false
  private valid: boolean = true

  connexion() {
    this.loginError = ''
    if((this.$refs.loginForm! as any) .validate()) {
      this.loading = true
      this.loginPassAuthProvider.connect(this.login, this.password).then(result => {
        if (result) {
          userStore.findMe().then(() => {
            this.loading = false
            this.$router.push('/')
          })
        } else {
          this.loading = false
          this.valid = false
          this.loginError = 'Le couple login mot de passe est erroné!'
        }
      })
    }
  }
}
</script>

<style>

</style>