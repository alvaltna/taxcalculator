<template>
    <td>
        {{ calculatedItem.name }}
    </td>
    <td>
        {{ calculatedItem.priceGross }}
    </td>
    <td>
        {{ calculatedItem.priceNet }}
    </td>
</template>

<script>

export default {
  name: 'CalculatedItem',
  props: [
    'calculatedItem'
  ]
}
</script>
