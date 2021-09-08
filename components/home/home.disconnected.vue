<template>
  <v-container>
    <v-row class="justify-space-around">
      <v-col class="d-flex justify-space-around">
        Bienvenu sur le site de gestion de votre accueil de mariage
      </v-col>
    </v-row>
    <v-row class="justify-space-around">
      <v-col class="d-flex justify-space-around">
        <v-btn to="/account/login">
          Se connecter
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class HomeDisconnected extends Vue {
}
</script>
