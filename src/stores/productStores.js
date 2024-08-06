import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useProductStore = defineStore('productStore', () => {
    // State
    const products = ref([
        {id: 1, name: "Basket", count: 10, price: 1},
        {id: 2, name: "Dress", count: 3, price: 3},
        {id: 3, name: "Bag", count: 5, price: 4},
        {id: 4, name: "Shoes", count: 6, price: 6},
        {id: 5, name: "Hat", count: 1, price: 4},
        {id: 6, name: "Pants", count: 0, price: 1},
    ]);
    const Basket = ref([]);
    const EnableAndDisableBasket = ref(false);

    // Methods
    function findProduct(id) {
        return products.value.find(product => product.id === id);
    }

    function findBasketProduct(id) {
        return Basket.value.find(product => product.id === id);
    }

    function findProductIndex(id) {
        return products.value.findIndex(item => item.id === id);
    }

    function findBasketIndex(id) {
        return Basket.value.findIndex(item => item.id === id);
    }

    function addProductToBasket(id, count) {
        if (count !== 0) {
            const product = findProduct(id);
            const BasketProduct = findBasketProduct(id);
            const productIndex = findProductIndex(id);
            const BasketIndex = findBasketIndex(id);

            if (BasketProduct) {
                Basket.value[BasketIndex].count += count;
                Basket.value[BasketIndex].price = (product.price * count) + Basket.value[BasketIndex].price;
                products.value[productIndex].count -= count;
            } else {
                Basket.value.push({
                    id: product.id,
                    name: product.name,
                    price: product.price * count,
                    count: count
                });
                products.value[productIndex].count -= count;
            }
        }
    }

    function deleteProductFromBasket(id) {
        const BasketProduct = findBasketProduct(id);
        const productIndex = findProductIndex(id);
        const BasketIndex = findBasketIndex(id);

        if (BasketProduct) {
            products.value[productIndex].count += Basket.value[BasketIndex].count;
            Basket.value.splice(BasketIndex, 1);
        }
    }

    function ToggleBasket() {
        EnableAndDisableBasket.value = !EnableAndDisableBasket.value;
    }

    function IncreaseBasket(id) {
        const productIndexInBasket = findBasketIndex(id);
        const productIndexInProducts = findProductIndex(id);
        if (products.value[productIndexInProducts].count !== 0) {
            Basket.value[productIndexInBasket].count++;
            products.value[productIndexInProducts].count--;
        }
    }

    function DeIncreaseBasket(id) {
        const productIndexInBasket = findBasketIndex(id);
        const productIndexInProducts = findProductIndex(id);
        if (Basket.value[productIndexInBasket].count !== 0) {
            Basket.value[productIndexInBasket].count--;
            products.value[productIndexInProducts].count++;
        }
    }

    // Expose state and methods
    return {
        products,
        Basket,
        EnableAndDisableBasket,
        addProductToBasket,
        deleteProductFromBasket,
        ToggleBasket,
        IncreaseBasket,
        DeIncreaseBasket,
    };
});
