const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
const renderProduct = (item) => {
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <img src = 'img/${item.id}.jpg' alt = 'Should be ${item.id}.jpg, but smth go wrong &#128064;'>
                <p>${item.price} руб.</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    // убрать запятые можно, если выводить не массив целиком, а поэлементно
    productsList.forEach(element => {
        document.querySelector('.products').insertAdjacentHTML('beforeend',element) ;
    });
    
};

renderPage(products);