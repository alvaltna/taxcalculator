<template>
<div class="container m-5">
  <Form :validation-schema="schema" v-slot="{ errors }">
  <div class="mb-3">
    <label for="countryName" class="form-label">Country</label>
    <Field type="text" name="name" class="form-control" v-model="name"
    :class="{ 'is-invalid': errors.name }"></Field>
    <div class="invalid-feedback">{{errors.name}}</div>
  </div>
  <div class="mb-3">
    <label for="countryISOCode" class="form-label">Country ISO Code</label>
    <Field type="text" name="ISO" class="form-control" v-model="ISO"
    :class="{ 'is-invalid': errors.ISO }"></Field>
    <div class="invalid-feedback">{{errors.ISO}}</div>
  </div>
  <div class="mb-3">
    <label for="countryVAT" class="form-label">Country VAT %</label>
    <Field type="number" name="VAT" class="form-control" v-model="VAT"
    :class="{ 'is-invalid': errors.VAT }"></Field>
    <div class="invalid-feedback">{{errors.VAT}}</div>
  </div>
  <button type="submit" class="btn btn-primary m-2" @click="addCountry()">Add country</button>
  <button class="btn btn-danger" @click="$emit('hideForm', false)">Cancel</button>
</Form>
</div>
</template>

<script>

import apiRequests from '../typescript/apiRequests'
import errorHandling from '../typescript/errorHandling'
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'

export default {
  data () {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required('Name is required'),
      ISO: Yup.string()
        .required('ISO is required')
        .test('len', 'ISO must be exactly 2 characters', val => val.length === 2),
      VAT: Yup.number()
        .typeError('Amount must be a number')
        .required('VAT% is required')
        .positive('Must be more than 0')
    })
    return {
      name: '',
      ISO: '',
      VAT: 0,
      schema
    }
  },
  components: {
    Form,
    Field
  },
  methods: {
    addCountry () {
      apiRequests.postRequestToApiWithAuthorization('/countries/add', {
        name: this.name,
        ISO: this.ISO,
        VAT: parseFloat(this.VAT).toFixed(2)
      })
        .then(() => {
          errorHandling.successMsg('Country successfully added!', 1200)
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 403) {
            errorHandling.errorMsgWithButton('Send correct JWT in Authorization!')
          } else if (error.response.status === 400) {
            errorHandling.errorMsgWithButton('Form was not properly filled!')
          } else if (error.response.status === 429) {
            errorHandling.errorMsgWithButton('Too many requests')
          } else {
            errorHandling.errorMsgWithButton('Sorry, ' +
              'there was a problem and could not add country!')
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
