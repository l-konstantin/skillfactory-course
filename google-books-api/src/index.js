import { Cards } from './js/cards.js';
import { Slider } from './js/slider.js';
import images from './js/slider.js'

import './main.scss';
import './fonts/fonts.scss';

class Main {
    init() {
        let books = new Cards('AIzaSyApcHP4GDuFqCQkrvfavTn7qvrb_RheN-Y', 6, 6, 0, 0)
        books.defaultRequest()
        books.currentRequest()

        let slider = new Slider(images, 5000, 0)
        slider.play()
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let shop = new Main()
    shop.init()
})