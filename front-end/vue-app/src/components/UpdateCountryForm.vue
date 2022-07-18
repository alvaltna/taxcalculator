<template>
<div class="container">
  <Form :validation-schema="schema" v-slot="{ errors }">
    <div class="d-flex flex-row align-items-center flex-wrap">
        <div class="col m-3">
          <Field type="text"
            name="name"
            class="form-control"
            placeholder="Country"
            v-model="name"
            :class="{ 'is-invalid': errors.name }"/>
            <div class="invalid-feedback"
            style="position:absolute">{{errors.name}}</div>
        </div>
        <div class="col m-3">
          <Field
          type="text"
          name="ISO"
          class="form-control"
          placeholder="ISO"
          v-model="ISO"
          :class="{ 'is-invalid': errors.ISO }"/>
          <div class="invalid-feedback"
          style="position:absolute">{{errors.ISO}}</div>
        </div>
        <div class="col m-3">
          <Field
          type="number"
          name="VAT"
          class="form-control"
          placeholder="Country VAT %"
          v-model="VAT"
          :class="{ 'is-invalid': errors.VAT }"/>
          <div class="invalid-feedback"
          style="position:absolute">{{errors.VAT}}</div>
        </div>
        <button style="float:right"
        type="button"
        class="btn btn-primary"
        @click="updateCountry(country.id)">
        Update</button>
    </div>
  </Form>
  </div>
</template>

<script>
import apiRequests from '../typescript/apiRequests'
import errorHandling from '../typescript/errorHandling'
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'

export default {
  props: ['country'],
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
      name: this.$props.country.name,
      ISO: this.$props.country.ISO,
      VAT: this.$props.country.VAT,
      schema
    }
  },
  components: {
    Field,
    Form
  },
  methods: {
    updateCountry (id) {
      apiRequests.patchRequestWithAuthorization('/countries/update/' + id, {
        name: this.name,
        ISO: this.ISO,
        VAT: parseFloat(this.VAT).toFixed(2)
      })
        .then(() => {
          errorHandling.successMsg('Country successfully updated!', 1200)
          window.location.reload()
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
              'could not update country!')
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
