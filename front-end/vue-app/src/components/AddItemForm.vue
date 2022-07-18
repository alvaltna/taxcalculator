<template>
  <Form @submit.prevent :validation-schema="schema"
      v-slot="{ errors }" class="m-5">
      <div class="d-flex flex-row align-items-center flex-wrap">
          <div class="col m-1">
            <Field type="text"
            class="form-control"
            placeholder="Item"
            name="name"
            v-model="name"
            :class="{ 'is-invalid': errors.name }"/>
             <div class="invalid-feedback"
              style="position:absolute">{{errors.name}}</div>
          </div>

          <div class="col m-1">
              <Field type="number"
                class="form-control"
                placeholder="Price"
                name="price"
                v-model="price"
                :class="{ 'is-invalid': errors.price }"/>
              <div class="invalid-feedback"
              style="position:absolute">
              {{errors.price}}</div>
          </div>
      </div>
      <div class="col m-1">
          <button type="submit"
          class="btn btn-primary"
          style="float:right"
          @click="addItem"
          >Add item</button>
      </div>
  </Form>
</template>

<script >

import { v4 as uuidv4 } from '../../node_modules/uuid'
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'

export default {
  data () {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required('Name is required'),
      price: Yup.number()
        .typeError('Amount must be a number')
        .required('Price is required')
        .positive('Must be more than 0')
    })
    return {
      name: '',
      price: 0,
      schema
    }
  },
  components: {
    Field,
    Form
  },
  methods: {
    addItem (event) {
      if (this.name !== null && this.name.length > 0 &&
       this.price !== null && parseFloat(this.price).toFixed(2) > 0) {
        const newItemObject = {
          id: uuidv4(),
          name: this.name,
          price: this.price
        }

        this.$emit('add-item-event', newItemObject)
        this.name = ''
        this.price = 0
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
