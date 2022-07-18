<template>
    <td>
        {{ addedItem.name }}
    </td>
    <td>
        {{ addedItem.price }}
    </td>
    <td>
        <div class="container">
            <button class="btn btn-danger" style="float:right"
            @click="$emit('delete-item-event', addedItem.id)">Delete</button>
        </div>
    </td>
</template>

<script>

export default {
  name: 'AddedItem',
  props: [
    'addedItem'
  ]
}
</script>
