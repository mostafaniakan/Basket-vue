<script setup>
const props = defineProps(['itemsBasket']);
const emit = defineEmits(['delete','IncreaseBasket','DecreaseBasket']);
function deleteProduct(id){
    emit('delete',id);
}
function Increase(id){
    emit('IncreaseBasket',id)
}
function DeIncrease(id) {
    emit('DecreaseBasket',id)
}
console.log(props.itemsBasket)
</script>

<template>
<tr>
    <td>{{props.itemsBasket.name}}</td>
    <td>{{props.itemsBasket.price}}$</td>
    <td>
        <button @click="DeIncrease(props.itemsBasket.id)">-</button>
        <span>{{props.itemsBasket.count}}</span>
        <button @click="Increase(props.itemsBasket.id)">+</button>
    </td>
    <td><button @click="deleteProduct(props.itemsBasket.id)" class="delete" >Delete</button></td>
</tr>
</template>

<style scoped>
.delete{
    background-color: rgb(255, 0, 0);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 6px;
}
.delete:hover{
    cursor: pointer;
}

</style>