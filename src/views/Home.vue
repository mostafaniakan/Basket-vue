<script setup>
import Card from "@/components/Card.vue";
import {ref, watch} from "vue";
import BasketItems from "@/components/BasketItems.vue";

// const products = ref([
//     {id: 1, name: "Basket", count: 10, price: 1},
//     {id: 2, name: "Dress", count: 3, price: 3},
//     {id: 3, name: "Bag", count: 5, price: 4},
//     {id: 4, name: "Shows", count: 6, price: 6},
//     {id: 5, name: "Hat", count: 1, price: 4},
//     {id: 6, name: "Pants", count: 0, price: 1},
// ])
// const Basket = ref([]);
// let ItemsInBasket = ref(Basket.value.length);
// const EnableAndDisableBasket = ref(false);
//
// watch(Basket.value, (newx) => {
//     ItemsInBasket.value = newx.length;
// });
//
// class Variables {
//     constructor(products, Basket) {
//         this.products = products;
//         this.Basket = Basket;
//     }
//
//     findProduct(id) {
//         return this.products.value.find(product => product.id === id);
//     }
//
//     findBasketProduct(id) {
//         return this.Basket.value.find(product => product.id === id);
//     }
//
//     findProductIndex(id) {
//         return this.products.value.findIndex(item => item.id === id);
//     }
//
//     findBasketIndex(id) {
//         return this.Basket.value.findIndex(item => item.id === id);
//     }
// }
//
// const variables = new Variables(products, Basket);
//
// function addProductToBasket(id, count) {
//     if (count !== 0) {
//         const product = variables.findProduct(id);
//         const BasketProduct = variables.findBasketProduct(id);
//         const productIndex = variables.findProductIndex(id);
//         const BasketIndex = variables.findBasketIndex(id);
//
//         if (BasketProduct) {
//             variables.Basket.value[BasketIndex].count += count;
//             variables.Basket.value[BasketIndex].price = (product.price * count) + variables.Basket.value[BasketIndex].price;
//             variables.products.value[productIndex].count -= count;
//         } else {
//             variables.Basket.value.push({
//                 id: product.id,
//                 name: product.name,
//                 price: product.price * count,
//                 count: count
//             });
//             variables.products.value[productIndex].count -= count;
//         }
//     }
// }
//
// function deleteProductFromBasket(id) {
//     const BasketProduct = variables.findBasketProduct(id);
//     const productIndex = variables.findProductIndex(id);
//     const BasketIndex = variables.findBasketIndex(id);
//
//     if (BasketProduct) {
//         variables.products.value[productIndex].count += variables.Basket.value[BasketIndex].count;
//         variables.Basket.value.splice(BasketIndex, 1);
//     }
// }
//
// function ToggleBasket() {
//     EnableAndDisableBasket.value = !EnableAndDisableBasket.value;
// }
//
// function IncreaseBasket(id) {
//     const productIndexInBasket = variables.findBasketIndex(id);
//     const productIndexInProducts = variables.findProductIndex(id);
//     if (products.value[productIndexInProducts].count !== 0) {
//         Basket.value[productIndexInBasket].count++;
//         products.value[productIndexInProducts].count--;
//     }
//     console.log(Basket.value[productIndexInBasket], products.value[productIndexInProducts])
// }
//
// function DeIncreaseBasket(id) {
//     const productIndexInBasket = variables.findBasketIndex(id);
//     const productIndexInProducts = variables.findProductIndex(id);
//     if (Basket.value[productIndexInBasket].count !== 0) {
//         Basket.value[productIndexInBasket].count--;
//         products.value[productIndexInProducts].count++;
//     }
//     console.log(Basket.value[productIndexInBasket], products.value[productIndexInProducts])
// }
import {useProductStore} from "@/stores/productStores.js";

const productStore = useProductStore();
const products = productStore.products;
const Basket = productStore.Basket;
const ToggleBasket = productStore.ToggleBasket;
import { storeToRefs } from 'pinia'
// ✅ keeps reactivity
const {
    EnableAndDisableBasket,
    ItemsInBasket,
} = storeToRefs(productStore)

</script>

<template>
    <header class="header">
        <div class="basket-icon">
            <img @click="ToggleBasket" src="../assets/images/shopping.png" alt="">
            <span>{{ Basket.length }}</span>
        </div>
        <div class="basket" v-if="EnableAndDisableBasket">
            <table style="margin: 10px">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                <BasketItems/>
                </tbody>
            </table>
        </div>
    </header>
    <div class="cards">
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>COUNT</th>
                <th>ADD</th>
            </tr>
            </thead>
            <tbody>
            <Card v-for="product in products" :product="product"/>
            </tbody>
        </table>

        <blockquote> Responsive Table</blockquote>
    </div>
    <RouterView/>
</template>

<style scoped lang="scss">
.header {
    width: 100%;
}

.header .basket-icon img {
    width: 46px;
}

.header .basket {
    border: solid 1px darkgray;
    border-radius: 5px;
}

$gl-ms: "screen and (max-width: 23.5em)";
$gl-xs: "screen and (max-width: 35.5em)";
$gl-sm: "screen and (max-width: 48em)";
$gl-md: "screen and (max-width: 64em)";
$gl-lg: "screen and (max-width: 80em)";

table {
    border-spacing: 1px;
    border-collapse: collapse;
    background: white;
    border-radius: 6px;
    overflow: hidden;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    position: relative;

    * {
        position: relative
    }

    td, th {
        padding-left: 8px
    }

    thead tr {
        height: 60px;
        background: #FFED86;
        font-size: 16px;
    }

    tbody tr {
        height: 48px;
        border-bottom: 1px solid #E3F1D5;

        &:last-child {
            border: 0;
        }
    }

    td, th {
        text-align: left;

        &.l {
            text-align: right
        }

        &.c {
            text-align: center
        }

        &.r {
            text-align: center
        }
    }
}


@media #{$gl-xs} {

    table {
        display: block;

        > *, tr, td, th {
            display: block
        }

        thead {
            display: none
        }

        tbody tr {
            height: auto;
            padding: 8px 0;

            td {
                padding-left: 45%;
                margin-bottom: 12px;

                &:last-child {
                    margin-bottom: 0
                }

                &:before {
                    position: absolute;
                    font-weight: 700;
                    width: 40%;
                    left: 10px;
                    top: 0
                }

                &:nth-child(1):before {
                    content: "Code";
                }

                &:nth-child(2):before {
                    content: "Stock";
                }

                &:nth-child(3):before {
                    content: "Cap";
                }

                &:nth-child(4):before {
                    content: "Inch";
                }

                &:nth-child(5):before {
                    content: "Box Type";
                }
            }
        }
    }
}


// body style

body {
    background: #9BC86A;
    font: 400 14px 'Calibri', 'Arial';
    padding: 20px;
}

blockquote {
    color: white;
    text-align: center;
}
</style>