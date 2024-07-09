export class Loader {
    init() {
        let cards = document.querySelector('.products');
        let loader = `<div class="loader"><div></div><div></div><div></div><div></div></div>`
        cards.insertAdjacentHTML('beforeend', loader)
    }

    hide() {
        let cards = document.querySelector('.products')
        cards.removeChild(document.querySelector('.loader'))
    }
}
let loading = new Loader();
export default loading;