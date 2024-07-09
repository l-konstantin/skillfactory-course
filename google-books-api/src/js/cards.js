import loading from "./loader.js";
import iconStarFill from "../images/star_fill.svg";
import iconStar from "../images/star.svg";
import iconStarHalf from "../images/star_half.svg";

export class Cards {
    constructor(apiKey, cardsLimit, cardsIncrease, cardsStartIndex, itemInCart) {
        this.apiKey = apiKey;
        this.cardsLimit = cardsLimit;
        this.cardsIncrease = cardsIncrease;
        this.cardsStartIndex = cardsStartIndex;
        this.itemInCart = itemInCart;
    }

    request(url) {
        loading.init()

        fetch(url)
            .then(response => { return response.json() })
            .then(data => {
                this.writeOutput(this.formatOutput(data))
            })
        .catch((error) => {
            console.log(error)
        })
    }

    requestLoadMore(url) {
        loading.init()

        fetch(url)
            .then(response => { return response.json() })
            .then(data => {
                this.writeOutputLoadMore(this.formatOutput(data))
                loading.hide()
            })

            .catch((error) => {
                console.error(error)
            })
    }

    defaultRequest() {
        let defaultLink = document.querySelector('[data-category="subject:Architecture"]')
        defaultLink.classList.add('link-active')
        let defaultItem = document.querySelector('.sidebar-category-list_item').querySelector('.link')
        let defaultSubject = defaultItem.getAttribute('data-category')
        document.querySelector('.products').setAttribute('data-type', defaultSubject)
        let url = `https://www.googleapis.com/books/v1/volumes?q='${defaultSubject}'&key=${this.apiKey}&printType=books&startIndex=${this.cardsStartIndex}&maxResults=${this.cardsLimit}&langRestrict=en`
        this.request(url)
    }

    currentRequest() {
        let products = document.querySelector('.products');
        let links = document.querySelectorAll('.sidebar-category-list_item');
        links.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.target

                links.forEach(item => {
                    item.querySelector('.link').classList.remove('link-active')
                })

                this.cardsLimit = 6;
                this.cardsStartIndex = 0
                target.classList.add('link-active')
                let newSubject = target.getAttribute('data-category')
                document.querySelector('.products').setAttribute('data-type', newSubject)
                let url = `https://www.googleapis.com/books/v1/volumes?q='${newSubject}'&key=${this.apiKey}&printType=books&startIndex=${this.cardsStartIndex}&maxResults=${this.cardsLimit}&langRestrict=en`
                products.innerHTML = ''
                this.request(url)
            })
        })
    }

    formatOutput(data) {
        let cards = ''

        data.items.forEach(function(item) {
            let thumbnail

            if (item.volumeInfo.hasOwnProperty('imageLinks')) {
                thumbnail = item.volumeInfo.imageLinks.thumbnail
            } else {
                thumbnail = './images/thumbnail.png'
            }

            let authors

            if (item.volumeInfo.hasOwnProperty('authors')) {
                if (item.volumeInfo.authors.length > 1) {
                    authors = item.volumeInfo.authors.join(', ')
                } else {
                    let authorsFull = item.volumeInfo.authors.join(', ')

                    let maxLength = 70

                    authors = authorsFull.substring(0, maxLength) + '...'
                }
            } else {
                authors = ''
            }

            let title

            if (item.volumeInfo.hasOwnProperty('title')) {
                let titleFull = item.volumeInfo.title

                if (titleFull.length > 45) {
                    let maxLength = 45
                    title = titleFull.substring(0, maxLength) + '...'
                } else {
                    title = item.volumeInfo.title
                }
            } else {
                title = ''
            }

            let description

            if (item.volumeInfo.hasOwnProperty('description')) {
                let descriptionFull = item.volumeInfo.description
                let maxLength = 100
                description = descriptionFull.substring(0, maxLength) + '...'
            } else {
                description = ''
            }

            let averageRating = item.volumeInfo.averageRating
            let ratingsCount

            if (item.volumeInfo.hasOwnProperty('ratingsCount')) {
                ratingsCount = item.volumeInfo.ratingsCount
            } else {
                ratingsCount = ''
            }

            let price

            if (item.saleInfo.hasOwnProperty('ratailPrice')) {
                let rate = 80
                price = (item.saleInfo.retailPrice.amount / rate).toFixed(2)
            } else {
                price = ''
            }

            let bookId = item.id
            let cardBlock = `
                <div class='products-list_data' data-id='${bookId}'>
                    <img class='product-data_image' src='${thumbnail}' alt='Book Image'/>
                    <div class='product-data'>
                        <div class='product-data_author'>${authors}</div>
                        <div class='product-data_name'>${title}</div>
                        <div class='product-data_star'>
                            <div class='product-rating_average'>${averageRating}</div>
                            <div class='product-rating_count'>${ratingsCount} review</div>
                        </div>
                        <div class='product-data_description'>${description}</div>
                        <div class='product-data_price'>${price}</div>
                        <button class='product-data_button'>Buy Now</button>
                    </div>
                </div>`
            cards += cardBlock
        })
        return cards
    }

    writeOutput(card) {
        let cards = document.querySelector('.products')
        cards.innerHTML = card
        this.formatBooksInformation()
        this.loadMore()
        this.addToCart()
    }

    writeOutputLoadMore(card) {
        let products = document.querySelector('.products');
        products.innerHTML += card;
        this.formatBooksInformation();
        this.loadMore();
        this.addToCart();
    }

    loadMore() {
        let loadBtn = document.querySelector('.button-load');
        const increaser = () => {
            let products = document.querySelector('.products');
            products.removeChild(document.querySelector('.products-load'));
            this.cardsStartIndex += this.cardsIncrease;
            let currentSubject = document.querySelector('.products').getAttribute('data-type');
            let url = `https://www.googleapis.com/books/v1/volumes?q='${currentSubject}'&key=${this.apiKey}&printType=books&startIndex=${this.cardsStartIndex}&maxResults=${this.cardsLimit}&langRestrict=en`;
            this.requestLoadMore(url);
        }
        loadBtn.addEventListener('click', increaser);
    }

    addToCart() {
        let cartTop = document.querySelector('.icon-cart_block')
        let cartTopText = document.querySelector('.icon-cart_text')
        let buyBtns = document.querySelectorAll('.product-data_button')
        let booksDataInCart = []

        buyBtns.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = e.target

                let currentBookItem = {
                    id: target.closest('.products-list_data').getAttribute('data-id')
                }

                let userIndex = booksDataInCart.findIndex((item) => item.id === currentBookItem.id)

                if (!booksDataInCart.find((item) => item.id === currentBookItem.id)) {
                    cartTop.style.display = 'block'
                    target.textContent = 'In the cart'
                    this.itemInCart += 1
                    localStorage.setItem('booksInCart', this.itemInCart)
                    cartTopText.textContent = this.itemInCart
                    target.classList.add('product-data_button_selected')
                    booksDataInCart.push(currentBookItem)
                    localStorage.setItem('booksDataInCart', JSON.stringify(booksDataInCart))
                } else {
                    target.textContent = 'Buy now'
                    this.itemInCart -= 1
                    localStorage.setItem('booksInCart', this.itemInCart)
                    target.classList.remove('product-data_button_selected')
                    cartTopText.textContent = this.itemInCart
                    booksDataInCart.splice(userIndex, 1)
                    localStorage.setItem('booksDataInCart', JSON.stringify(booksDataInCart))
                }

                if (this.itemInCart === 0) {
                    cartTop.style.display = 'none'
                }
            })

            if (localStorage.getItem('booksDataInCart') != null) {
                booksDataInCart = JSON.parse(localStorage.getItem('booksDataInCart'))
                let cardsItems = document.querySelectorAll('.products-list_data')

                cardsItems.forEach(item => {
                    let currentItem = item.getAttribute('data-id')

                    if (booksDataInCart.find((item) => item.id === currentItem)) {
                        item.querySelector('.product-data_button').textContent = 'In the cart'
                        item.querySelector('.product-data_button').classList.add('product-data_button_selected')
                    }
                })
            }
        })

        if (localStorage.getItem('booksInCart') != null) {
            cartTop.style.display = 'block'
            this.itemInCart = Number(localStorage.getItem('booksInCart'))
            cartTopText.textContent = this.itemInCart

            if (this.itemInCart === 0) {
                cartTop.style.display = 'none'
            }
        }
    }

    formatBooksInformation() {
        let authorRow = document.querySelectorAll('.product-data_author')
        authorRow.forEach(item => {
            if (item.textContent === '') {
                item.classList.add('hidden')
            }
        })

        let descriptionRow = document.querySelectorAll('.product-data_description')

        descriptionRow.forEach(item => {
            if (item.textContent === '') {
                item.classList.add('hidden')
            }
        })

        let priceRow = document.querySelectorAll('.product-data_price')
        priceRow.forEach(item => {
            if (item.textContent === '$' || item.textContent === '$0') {
                item.classList.add('hidden')
            }
        })

        let averageRatingRow = document.querySelectorAll('.product-rating_average')
        averageRatingRow.forEach((item) => {
            const rating = parseFloat(item.textContent)
            const fullStars = Math.floor(rating)
            const hasHalfStar = rating % 1 !== 0
            const emptyStars = 5 - Math.ceil(rating)

            if (fullStars) {
                item.innerHTML = ""

                for (let i = 0; i < fullStars; i++) {
                    let starFill = document.createElement("img")
                    starFill.src = iconStarFill
                    item.appendChild(starFill)
                }

                if (hasHalfStar) {
                    let starHalf = document.createElement("img")
                    starHalf.src = iconStarHalf
                    item.appendChild(starHalf)
                }

                if (emptyStars) {
                    for (let i = 0; i < emptyStars; i++) {
                        let star = document.createElement("img")
                        star.src = iconStar
                        item.appendChild(star)
                    }
                }
            }

            if (item.textContent === 'undefined') {
                item.innerHTML = ""
                for (let i = 0; i < 5; i++) {
                    let star = document.createElement("img")
                    star.src = iconStar
                    item.appendChild(star)
                }
            }
        })

        let loadBtn = `<div class='products-load'><button class='button-load'>Load More</button></div>`
        let cards = document.querySelector('.products')
        cards.insertAdjacentHTML('beforeend', loadBtn)
    }
}