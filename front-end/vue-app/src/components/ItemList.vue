
<template>
    <tr class="container" :key="item.id" v-for="item in itemList">
        <AddedItem :addedItem="item" @delete-item-event="$emit('delete-item-event', item.id)"/>
    </tr>
</template>

<script lang="ts">
import AddedItem from '@/components/AddedItem.vue'

export default {
  name: 'ItemList',
  components: {
    AddedItem
  },
  props: [
    'itemList'
  ]
}
</script>
