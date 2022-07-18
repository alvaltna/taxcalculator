<template>
  <div class="container">
    <GreetingMessage class="text-center" msg="Welcome to Tax Calculator"/>
    <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button"
  id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Select country
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li v-for="country in countries"
      :key='country.id'>
      <a class="dropdown-item" @click="selectedCountry(country)">{{country.name}}</a>
      </li>
  </ul>
</div>
  <div class="container" v-if="this.countryName != ''">
    <div class="d-flex">
        <div class="col m-1">
          <h1 class="display-4">{{this.countryName}}</h1>
        </div>
        <div class="col m-1">
          <h1 class="display-4">{{this.countryISO}}</h1>
        </div>
        <div class="col m-1">
          <h1 class="display-4">VAT: {{this.countryVAT}}%</h1>
        </div>
      </div>
      <table class="table mb-5">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Price Gross</th>
            <th scope="col" v-if="!this.canAddItems">Price Net</th>
          </tr>
        </thead>
        <tbody>
            <ItemList :itemList="items"
            @delete-item-event="deleteItem"
            v-if="this.canAddItems"></ItemList>
            <CalculatedItemsList :calculatedItemsList="calculatedItems"
            v-if="!this.canAddItems">
            </CalculatedItemsList>
        </tbody>
      </table>
      <AddItemForm @add-item-event="addItem"  v-if="this.canAddItems">
        </AddItemForm>
      <button type="submit" class="btn btn-success m-2" @click="calculatePrice"  v-if="this.canAddItems"> Calculate price</button>
      <button class="btn btn-danger m-2" @click="clear"  v-if="!this.canAddItems"> Clear</button>
      </div>
  </div>
</template>

<script >
import GreetingMessage from '@/components/GreetingMessage.vue'
import AddItemForm from '@/components/AddItemForm.vue'
import ItemList from '@/components/ItemList.vue'
import CalculatedItemsList from '@/components/CalculatedItemsList.vue'
import apiRequests from '../typescript/apiRequests'

export default {

  data () {
    return {
      countries: [],
      canAddItems: true,
      countryName: '',
      countryISO: '',
      countryVAT: '',
      items: [],
      calculatedItems: []

    }
  },
  props: ['msg', 'itemList', 'calculatedItemsList'],

  components: {
    GreetingMessage,
    AddItemForm,
    ItemList,
    CalculatedItemsList
  },
  methods: {
    selectedCountry (country) {
      this.countryName = country.name
      this.countryISO = country.ISO
      this.countryVAT = country.VAT
    },
    addItem (newItem) {
      newItem.price = parseFloat(newItem.price).toFixed(2)
      this.items = [...this.items, newItem]
    },

    deleteItem (itemId) {
      this.items = this.items.filter(item => item.id !== itemId)
    },
    calculatePrice () {
      if (this.items.length > 0) {
        apiRequests.postRequestToApi('',
          {
            country:
            {
              name: this.countryName,
              ISO: this.countryISO,
              VAT: this.countryVAT
            },
            items: this.items
          })
          .then(result => {
            this.calculatedItems = result.data.items
          })
        this.canAddItems = false
      }
    },
    clear () {
      this.items = []
      this.calculatedItems = []
      this.canAddItems = true
    },
    dataRequest (url) {
      apiRequests.getRequestToApi(url)
        .then(result => {
          this.countries = result.data
        })
    }
  },
  watch: {
    $route () {
      this.dataRequest('/countries')
    }
  },
  mounted () {
    this.dataRequest('/countries')
  }
}
</script>
