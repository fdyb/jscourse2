class Cart {
    constructor() {
        this.goods = []; // [{CartItem_1},{CartItem_2},...,{CartItem_N}]
    }
    addItem(product) {
        console.log('Метод добавления товара в корзину');
    }
    delItem(product) {
        console.log('Метод удаления товара из корзины');
    }
    calcTotal() {
        console.log('Метод подсчета суммы товаров в корзине');
    }
    render() {
        console.log('Метод отрисовки корзины на странице');
    }
}

class cartItem {
	constructor(product, img = 'https://placehold.it/200x150'){
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
		this.img = img;
        this.quantity = 1;
	}
    render() {

    }
}


class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    } 
    
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }
    calcTotal() {
        let sum = 0;
        this.goods.forEach(item => sum += item.price);
        return sum;
    }
    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend',productObj.render())
//            block.innerHTML += productObj.render();
        }
    }
    
}


class ProductItem{
	constructor(product, img = 'https://placehold.it/200x150'){
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
		this.img = img;
	}
	
	render(){
		 return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
	}
}

let list = new ProductsList();
list.render();
console.log(list.calcTotal());






    



