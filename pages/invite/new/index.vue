<template>
  <invite-form v-if="invite && !sauvegarde"/>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import InviteInterface from '~/models/invite/invite.interface'
import { inviteStore, pageStore, tableStore } from '~/store'
import InviteForm from '~/components/invite/invite.form.vue'

@Component({
  layout: 'page',
  components: {
    InviteForm
  }
})
export default class InviteEdit extends Vue {
  private sauvegarde = false

  beforeMount() {
    pageStore.setTitle('Chargement')
    pageStore.setPrevious('/invite')
    pageStore.setValidIsVisible(true)
    pageStore.setOnValid(this.valid)
    inviteStore.add()
    tableStore.findAll()
  }

  getTitle(invite: InviteInterface | undefined) {
    return invite && (invite.nom || invite.prenom) ? `${invite.nom} ${invite.prenom}` : 'Ajouter invité'
  }

  get invite() {
    pageStore.setTitle(inviteStore.invite ? this.getTitle(inviteStore.invite) : 'Chargement')
    return inviteStore.invite || {} as InviteInterface
  }

  valid() {
    pageStore.setTitle('Sauvegarde ...')
    this.sauvegarde = true
    inviteStore.save().then(invite => this.$router.push('/invite'))
  }
}
</script>

<style>

</style>