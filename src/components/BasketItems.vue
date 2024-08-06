<script setup>
import {onMounted, watch} from "vue";

// const props = defineProps(['itemsBasket']);
// const emit = defineEmits(['delete','IncreaseBasket','DecreaseBasket']);
// function deleteProduct(id){
//     emit('delete',id);
// }
// function Increase(id){
//     emit('IncreaseBasket',id)
// }
// function DeIncrease(id) {
//     emit('DecreaseBasket',id)
// }

import {useProductStore} from "@/stores/productStores.js";
const productStore = useProductStore();
const DeIncreaseBasket = productStore.DeIncreaseBasket;
const IncreaseBasket = productStore.IncreaseBasket;
const deleteProductFromBasket = productStore.deleteProductFromBasket;
const Basket = productStore.Basket

</script>

<template>
<tr  v-for="itemsBasket in Basket " :key="itemsBasket.id">
    <td>{{itemsBasket.name}}</td>
    <td>{{itemsBasket.price}}$</td>
    <td>
        <button @click="DeIncreaseBasket(itemsBasket.id)">-</button>
        <span>{{itemsBasket.count}}</span>
        <button @click="IncreaseBasket(itemsBasket.id)">+</button>
    </td>
    <td><button @click="deleteProductFromBasket(itemsBasket.id)" class="delete" >Delete</button></td>
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