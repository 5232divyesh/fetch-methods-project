
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}

// ✅ Shows the correct initial data - 3 marks 
let allProductData = [];
function fatchFun() {
  fetch("https://fetch-methods-project.onrender.com/pitches").then((res) => res.json()).then((data) => {
    allProductData = data;
    cartList(data)
  })
    .catch((err) => console.log(err))
}
fatchFun()

function cart(image, title, founder, category, price, id) {
  let cart = `
    <div class="card-list">
    
        <!-- <div class="card" data-id="1"> -->
                <div class="card-img">
                  <a href="description.html">
                      <img src="${image}" alt="">
                  </a>
                </div>
        <!-- </div>card end -->
        <div class="card-body">
                <h4 class="card-title">${title}</h4>
                <p class="card-founder">Founder :${founder}</p>
                <p class="card-category">${category}</p>
                <p class="card-price">${price}</p>
                <a href="#" data-id="${id}" class="card-link">Edit</a>
                <button data-id="${id}" class="card-button">Delete</button>
                <button data-id=${id} class="addToCart-button">Add to Cart</button>
        </div><!-- card-body end -->
    </div><!--  card-list -->
    `
  return cart
}

function cartList(arr) {
  let cartlist =
    arr.map((el) => {
      return cart(el.image, el.title, el.founder, el.category, el.price, el.id)
    })
  mainSection.innerHTML = cartlist.join("")
}

function makeObj() {
  pitchCreateBtn.addEventListener('click', () => {
    let extrapitch = {
      image: pitchImageInput.value,
      title: pitchTitleInput.value,
      founder: pitchfounderInput.value,
      category: pitchCategoryInput.value,
      price: pitchPriceInput.value,
    }
    console.log(extrapitch)
    fetch("https://fetch-methods-project.onrender.com/pitches", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(extrapitch),
    });
  })
}
makeObj()

// for delete button
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('card-button')) {
    let store = e.target.dataset.id;
    deleteFetch(store);
  }
})
function deleteFetch(id) {
  fetch(`https://fetch-methods-project.onrender.com/pitches/${id}`, {
    method: 'DELETE'
  }).then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}


// for edit button

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('card-link')) {

    let editData = e.target.dataset.id;
    editBtn(editData)
  }
})

function editBtn(id) {

  fetch(`https://fetch-methods-project.onrender.com/pitches/${id}`).then((res) => res.json()).then((person) => {
    console.log(person)
    updatePitchIdInput.value = person.id
    updatePitchTitleInput.value = person.title
    updatePitchImageInput.value = person.image
    updatePitchfounderInput.value = person.founder
    updatePitchCategoryInput.value = person.category
    updatePitchPriceInput.value = person.price
  })
    .catch((err) => console.log(err))
  updatePitchBtn.addEventListener('click', () => {
    let pitch = {
      image: updatePitchImageInput.value,
      title: updatePitchTitleInput.value,
      founder: updatePitchfounderInput.value,
      category: updatePitchCategoryInput.value,
      price: updatePitchPriceInput.value,
    }
    console.log(pitch)
    fetch(`https://fetch-methods-project.onrender.com/pitches/${id}`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pitch),
    });
  })
}














sortAtoZBtn.addEventListener('click', () => {
  cartList(allProductData.sort((a, b) => a.price - b.price))
})

sortZtoABtn.addEventListener('click', () => {
  cartList(allProductData.sort((a, b) => b.price - a.price))
})

filterFood.addEventListener('click', () => {
  let filterFoodData = allProductData.filter((el) => el.category == "Foood")
  cartList(filterFoodData)
})

filterElectronics.addEventListener('click', () => {
  let filterElectronicsData = allProductData.filter((el) => el.category == "Electronics")
  cartList(filterElectronicsData)
})

filterPersonalCare.addEventListener('click', () => {
  let filterPersonalData = allProductData.filter((el) => el.category == "Tech")
  cartList(filterPersonalData)
})


// Add To Cart 
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("addToCart-button")) {
    addCarts(e.target.dataset.id)
  }
})


function addCarts(id){
  fetch(`https://fetch-methods-project.onrender.com/pitches/${id}`).then((res)=>res.json()).then((data)=>{
    let addToCartObj = {
      image : data.image,
      title : data.title,
      founder : data.founder,
      category : data.category,
      price : data.price
    }
    fetch(`https://fetch-methods-project.onrender.com/cartpage`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addToCartObj),
    });
  })
  .catch((err)=>console.log(err))
}