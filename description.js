let para = new URLSearchParams(window.location.search)
let image = para.get('image')
let title = para.get('title')
let founder = para.get('founder')
let price = para.get('price')

document.querySelector(".ProductImg").src = image