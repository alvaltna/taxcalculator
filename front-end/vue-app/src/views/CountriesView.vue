<template>
  <div class="container">
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Country</th>
      <th scope="col">ISO</th>
      <th scope="col">VAT</th>
    </tr>
  </thead>
  <tbody>
    <CountryComponent v-for="(country, index) in countries"
      :country='country'
      :rowNum='index'
      :key='index'/>
  </tbody>
</table>
<button type="button" class="btn btn-success m-2"
  @click="showAddCountryForm = !showAddCountryForm">
  Add country</button>
<AddCountryForm v-if="showAddCountryForm" @hideForm="hideCountryForm"></AddCountryForm>
  </div>
</template>

<script>

import CountryComponent from '@/components/CountryComponent.vue'
import AddCountryForm from '@/components/AddCountryForm.vue'
import apiRequests from '../typescript/apiRequests'

export default {

  data () {
    return {
      showAddCountryForm: false,
      countries: []
    }
  },

  components: {
    CountryComponent,
    AddCountryForm

  },
  props: ['msg'],
  methods: {
    hideCountryForm (value) {
      this.showAddCountryForm = value
    },

    dataRequest (url) {
      apiRequests.getRequestToApi(url)
        .then(result => {
          this.countries = result.data
        })
    }

  },
  mounted () {
    this.dataRequest('/countries')
  }

}
</script>
