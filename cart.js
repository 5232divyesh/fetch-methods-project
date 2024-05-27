let productContainer = document.querySelector("#product-container")
function cartFetch() {
    fetch('http://localhost:3000/cartpage').then((res) => res.json()).then((data) => cardList(data))
        .catch((err) => console.log(err))
}
cartFetch()

function cart(image, title, quantity, description, price) {
    let cart = `
    <div class="card">
            <img src=${image} alt="${name}">
        <div class="card-body">
            <h3 class="product-title">${title}</h3>
            <p class="product-description">${description}</p>
            <p class="product-price">${price}</p>
            <button>+</button>
            <p >Quantity ${quantity}</p>
            <button>-</button>
        </div>
    </div>
    `
    return cart
}
function cardList(arr){
    let newArr = arr.map((el,inx)=>{
        return cart(el.image, el.title, el.quantity, el.description, el.price)
    })
    productContainer.innerHTML=newArr.join(""); 
}
