<template>
  <v-text-field :label="label" :value="value" @input="input" ref="textField" clearable counter/>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class BagdeInput extends Vue {

  @Prop() value!: string
  @Prop() label!: string

  @Emit('input')
  input(value: string) {
    let newValue = value
    if (!newValue) {
      newValue = ''
    }
    const numbers = ['à', '&', 'é', '"', "'", '(', '-', 'è', '_', 'ç'];
    numbers.forEach(
      (val, index) => (newValue = newValue.replace(val, index.toString())),
    )
    newValue = newValue.replace(/[^0-9]+/g, '')
    return newValue
  }
}
</script>
