<template>
  <div>
    <div class="d-flex justify-space-around mb-10">
      <h1 class="title-font">YourWelcome</h1>
    </div>
    <v-container>
      <v-row class="justify-space-around mb-10">
        <v-col class="d-flex justify-space-around">
          <div class="text-center">
            <h2 class="mb-2">Tables</h2>
            <v-badge
              bottom
              content="6"
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
        <v-col class="d-flex justify-space-around">
          <div class="text-center">
            <h2 class="mb-2">Invités</h2>
            <v-badge
              bottom
              content="80"
            >
                <v-btn
                fab
                dark
                x-large
                outlined
                color="indigo">
                  <v-icon x-large>
                    mdi-account-multiple
                  </v-icon>
                </v-btn>
            </v-badge>
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-space-around">
        <v-col class="d-flex justify-space-around">
          <div class="text-center">
            <h2 class="mb-2">Configurations</h2>
            <v-btn
            fab
            dark
            x-large
            outlined
            color="green">
              <v-icon x-large>
                mdi-cog-outline
              </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class  extends Vue {

}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.title-font {
  font-family: 'Adine Kirnberg';
  font-size: 4rem;
}
</style>