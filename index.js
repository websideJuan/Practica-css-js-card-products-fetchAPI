const listDinamic = document.querySelector('#products');
const productCarId = document.querySelector('#productCarId').content;

const fragment = document.createDocumentFragment()

let products = []

window.addEventListener('DOMContentLoaded',  async () => {
    const data = await dataAppProducts()
    products = data.data
    pintarProducts(products)
    console.log(products)
})

async function dataAppProducts () {
    const response = await fetch('https://fakerapi.it/api/v1/products?_quantity=1&_taxes=12&_categories_type=uuid')
    return await response.json()
    .catch(err => console.log(err))
    
}

const pintarProducts = (data) => {
    data.map(product => {
        productCarId.querySelector('.product__content > h2').textContent = product.name
        productCarId.querySelector('.product__content > p').textContent = product.description
        productCarId.querySelector('.product__content > .priceValid').textContent = `$ ${product.price - product.net_price}`
        productCarId.querySelector('.product__content > .priceOld').textContent = `$  ${product.price}`

        let tagsData = []

        tagsData = product.tags

        tagsData.map(tags => {
            const tagsElement = productCarId.querySelector('.tags')
            tagsElement.innerHTML = `<li><a>#${tags}</a></li>`
        })
        

        const clone = productCarId.cloneNode(true)

        fragment.appendChild(clone)
    })

    listDinamic.appendChild(fragment)
}
