//Variaveis
const div_cartBtn = document.querySelector('.cart-btn');
const span_closeCart = document.querySelector('.close-cart');
const button_clearCart = document.querySelector('.clear-cart');
const div_cart = document.querySelector('.cart');
const div_cartOverlay = document.querySelector('.cart-overlay');
const div_cartItems = document.querySelector('.cart-items');
const span_cartTotal = document.querySelector('.cart-total');
const div_cartContent = document.querySelector('.cart-content');
const div_productsCenter = document.querySelector('.products-center');
// cart
let cart = [];

// getting the products
class Products{
    async getProducts(){
        try {
            let result = await fetch("products.json");
            let data = await result.json();

            let products = data.items;
            products = products.map(item =>{
                const {title,price} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url;
                return {title, price, id, image}
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}
// display products
class UI{
    displayProducts(products){
        let result = '';
        products.forEach(product => {
            result += `
            <!-- single products -->
            <article class="product">
                <div class="img-container">
                    <img src=${product.image} alt="product" class="product-img">
                    <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to bag
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>R$${product.price}</h4>
            </article>
            <!-- end of single products -->
            `;
        });
        div_productsCenter.innerHTML = result;
    }
}
// local storage
class Storage{}
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // get all products
    products.getProducts().then(products => ui.displayProducts(products));
});