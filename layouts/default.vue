<template>
  <v-app>
    <div class="text-center">
      <h1 class="title-font">YourWelcome</h1>
    </div>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<style scoped>
.text-center {
  text-align: center;
}

.title-font {
  font-family: 'Adine Kirnberg';
  font-size: 6rem;
}
</style>
