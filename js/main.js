class CartItem {
	constructor(product, quantity, img = 'https://placehold.it/200x150'){
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
		this.img = img;
        this.quantity = quantity;
	}
    render() {
        
        return `<div class="cart-item" data-id="${this.id}">
        <img src="${this.img}" class = "cart-item-img" alt="Some img">
        <div class = "cart-item-title">${this.title}</div>
        <div class = "cart-item-count">
        <button id = "down-quantity_${this.id}">+</button>
        <input type="text" style = "width: 32px;" id = "edit-quantity_${this.id}" value = "${this.quantity}">
        <button id = "up-quantity_${this.id}">-</button>
        </div>
        <div class = "cart-item-price">${this.price} руб.</div>
        <div class = "cart-item-price">${this.price*this.quantity} руб.</div>
        <div class = "cart-item-cmd">
            <button class="del-btn" data-id="${this.id}" onclick = "removeFromCart(this)">Удалить</button>
        </div>
    </div>`
    }
}

class Cart {
    constructor(container = '.cart') {
        this.container = container;
        this.goods = [];
        this.sum = 0;
        this 
    }
    addItem(product, quantity) {
        let itemInCart = this.goods.find(item => item.id == product.id);
        if (itemInCart == undefined) {
            this.goods.push(new CartItem(product, quantity));
        }
        else {
            itemInCart.quantity += quantity;
        }
        this.calcTotal();
        this.render();
    }
    delItem(product) {
        let itemInCartIndex = this.goods.findIndex(item => item.id == product.id);
        this.goods.splice(itemInCartIndex, 1);
        this.calcTotal();
        this.render();
    }
    calcTotal() {
        let sum = 0;
        let total = 0;
        this.goods.forEach(item =>{
            sum += item.price*item.quantity;
            total += item.quantity;

        });
        return {'sum':sum, 'total':total};
    }
    render() {
       let div_cart_content = document.querySelector('.cart-content');
       div_cart_content.innerHTML = '';
       this.goods.forEach(item => div_cart_content.insertAdjacentHTML('beforeEnd',item.render()));
       let div_cart_footer = document.querySelector('.cart-footer');
       let totals = this.calcTotal();
       div_cart_footer.innerHTML = `
       Всего товаров в корзине ${totals.total} на сумму ${totals.sum} руб.       
       `;
       document.querySelector('.btn-cart').innerText = `Корзина (${this.calcTotal().total})`;
    }
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList{
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    } 
    
    _fetchProducts() {
        fetch(`${API_URL}/catalogData.json`).
            then(data => data.json()).
            then(data => {
                data.forEach(product => this.goods.push(new ProductItem(product)));
                this.render()});
    }

    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            block.insertAdjacentHTML('beforeend',product.render())
        }
    }
    
}

class ProductItem{
	constructor(product, img = 'https://placehold.it/200x150'){
		this.title = product.product_name;
		this.price = product.price;
		this.id = product.id_product;
		this.img = img;
	}
	
	render(){
		 return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn" data-id="${this.id}" onclick = "buyProduct(this)">Купить</button>
            </div>`
	}
}

let list = new ProductsList();
let cart = new Cart();

// вопрос - подскажите как назначить обработчик методом 
// addEventListener('click',buyProduct);
// для кнопки "Купить" ?
// 
// если написать команду в строке 121
// document.querySelector(".buy-btn").addEventListener('click',buyProduct)
// то document.querySelector(".buy-btn") ничего не находит и обработчик не назначается.

function buyProduct (e) {
    cart.addItem(list.goods.find(item => item.id == e.dataset['id']), 1);
}

function removeFromCart (e) {
    cart.delItem(cart.goods.find(item => item.id == e.dataset['id']), 1);
}

function showCart() {
    document.querySelector('.cart').style.display = 'block';
}

function closeCart() {
    document.querySelector('.cart').style.display = 'none';
}







    



