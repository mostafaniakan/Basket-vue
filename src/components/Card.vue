<script setup>
import {ref, watch} from "vue";

const props = defineProps(['product']);
// const emit = defineEmits(['add']);
let countProduct=ref(0);
const endProduct=ref(false);
if(props.product.count === 0){
    endProduct.value = true;
}
watch(props.product,()=>{
   if(props.product.count === 0){
       endProduct.value = true;
   }else {
       endProduct.value = false;
   }
})
function Increase(){
    if(countProduct.value < props.product.count){
        countProduct.value++;
    }
}
function DeIncrease(){
    if(countProduct.value > 0){
        countProduct.value--;
    }
}

import {useProductStore} from "@/stores/productStores.js";
const productStore = useProductStore();
function addProduct(id){
    let  products=countProduct.value
    productStore.addProductToBasket(id,products);
    countProduct.value = 0;
}

</script>

<template>
    <tr :class="endProduct ? 'end' : '' ">
        <td>{{props.product.id}}</td>
        <td>{{props.product.name}}</td>
        <td>{{props.product.price}}$</td>
        <td>
            <div>
                <button @click="DeIncrease">-</button>
                <span>{{countProduct}}</span>
                <button @click="Increase">+</button>
            </div>
        </td>
        <td><button @click="addProduct(props.product.id)">Add</button></td>
    </tr>
</template>

<style scoped>
.end{
    background-color: rgba(255, 0, 0, 0.39);
}
</style>