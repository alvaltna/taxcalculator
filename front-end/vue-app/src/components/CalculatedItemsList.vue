<template>
    <tr class="container" :key="item.id" v-for="item in calculatedItemsList">
        <CalculatedItem :calculatedItem="item"/>
    </tr>
</template>

<script lang="ts">
import CalculatedItem from '@/components/CalculatedItem.vue'

export default {
  name: 'CalculatedItemList',
  components: {
    CalculatedItem
  },
  props: ['calculatedItemsList']
}
</script>
