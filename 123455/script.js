document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.querySelectorAll('.header-ico')[2]
    const mainPage = document.querySelector('.homepage')
    const cartPage = document.querySelector('.cart')
    const buyButton = document.querySelectorAll('.form-button')
    const logo = document.querySelector('.logo-img')
    
    const cart = []
    
    cartButton.addEventListener('click', () => {
        if (cart.length !== 0) {
            mainPage.classList.add('hidden')
            cartPage.classList.remove('hidden')
        }
    })

    const backToMain = () => {
        mainPage.classList.remove('hidden')
        cartPage.classList.add('hidden')
    }

    logo.addEventListener('click', () => {
        backToMain()
    })

    const removeProduct = e => {
        const i = cart.findIndex(item => item.name === e.target.parentNode.querySelector('.product-name').textContent)
        cart.splice(i, 1)
        updateCart()
    }

    const updateCart = () => {
        cartPage.innerHTML = ''
        if (cart.length === 0) {
            return backToMain()
        }
        cart.forEach(item => {
            cartPage.innerHTML += `
                <div class="product">
                    <img class="product-img" src="${item.src}" alt="">
                    <div>
                        <p class="product-name">${item.name}</p>
                        <span>${item.price}</span>
                    </div>
                    <button class="product-remove"></button>
                </div>
            `
        })
        const removeButtons = cartPage.querySelectorAll('.product-remove')
        removeButtons.forEach(item => item.removeEventListener('click', removeProduct))
        removeButtons.forEach(item => item.addEventListener('click', removeProduct))
    }

    buyButton.forEach(item => {
        item.addEventListener('click', e => {
            const src = e.target.parentNode.firstElementChild.src
            const name = e.target.parentNode.querySelector('.font-name').textContent
            const price = e.target.parentNode.querySelector('.price').firstElementChild.textContent
            cart.push({src, name, price})
            updateCart()
        })
    })
})


