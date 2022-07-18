<template>
    <tr>
      <th scope="row">{{rowNum + 1}} </th>
      <td>{{country.name}}</td>
      <td>{{country.ISO}}</td>
      <td>{{country.VAT}}%</td>
      <td>
        <div class="container">
            <button style="float:right"
            type="button"
            class="btn btn-danger m-1"
            @click="deleteCountry(country.id)">
            Delete</button>
            </div>
        <div v-if="!showUpdateCountryForm" class="container">
            <button style="float:right"
            type="button"
            class="btn btn-warning m-1"
            @click="showUpdateCountryForm=!showUpdateCountryForm">
            Edit</button>
            </div>
            <div v-if="showUpdateCountryForm" class="container">
            <button style="float:right"
            type="button"
            class="btn btn-warning m-1"
            @click="showUpdateCountryForm=!showUpdateCountryForm">
            Cancel</button>
            </div>
        </td>
    </tr>
    <tr v-if="showUpdateCountryForm">
        <td colspan="5"><UpdateCountryForm :country='country'>
        </UpdateCountryForm></td>
    </tr>
</template>

<script lang="ts">

import UpdateCountryForm from '@/components/UpdateCountryForm.vue'
import apiRequests from '../typescript/apiRequests'
import errorHandling from '../typescript/errorHandling'
export default {

  data () {
    return {
      showUpdateCountryForm: false
    }
  },
  components: {
    UpdateCountryForm
  },
  props: ['country', 'rowNum'],
  methods: {
    deleteCountry (id) {
      apiRequests.deleteRequestWithAuthorization('/countries/delete/' + id)
        .then(() => {
          errorHandling.successMsg('Country successfully added!', 1200)
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 403) {
            errorHandling.errorMsgWithButton('Send correct JWT in Authorization!')
          } else if (error.response.status === 429) {
            errorHandling.errorMsgWithButton('Too many requests')
          } else {
            errorHandling.errorMsgWithButton('Sorry, ' +
              'there was a problem and could not delete country!')
          }
        })
      window.location.reload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
