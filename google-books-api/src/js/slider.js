//images
import SlideOne from '../images/slide-text-1.jpg';
import SlideTwo from '../images/slide-text-2.jpg';
import SlideThree from '../images/slide-text-3.jpg';

export class Slider {
    constructor(images, changeTime, intervalId) {
        this.images = images;
        this.changeTime = changeTime;
        this.intervalId = intervalId;
    }

    initSlider() {
        if (!images || !images.length) return;
    }

    initImages() {
        let sliderImages = document.querySelector(".slider-block_item_group");
        this.images.forEach((item, index) => {
            item = `<img class="slider-block_item_image n${index} ${index === 0 ? "active" : ""}"
                        src="${this.images[index].photo}" alt="${this.images[index].name}" data-index="${index}" />`;
            sliderImages.innerHTML += item;
        })
    }

    initPoints() {
        let sliderPoints = document.querySelector(".slider-pagination_items");
        this.images.forEach((item, index) => {
            item = `<div class="slider-pagination_circle n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`
            sliderPoints.innerHTML += item;
        })

        sliderPoints.querySelectorAll(".slider-pagination_circle").forEach(point => {
            point.addEventListener('click', () => {
                this.moveSlider(point.dataset.index)
                this.initAutoPlay()
            })
        })
    }

    moveSlider(num) {
        let sliderImages = document.querySelector(".slider-block_item_group");
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");
        let sliderPoints = document.querySelector(".slider-pagination_items");
        sliderPoints.querySelector(".active").classList.remove("active");
        sliderPoints.querySelector(".n" + num).classList.add("active");
    }

    initAutoPlay() {
        let sliderImages = document.querySelector(".slider-block_item_group");
        clearInterval(this.intervalId)
        this.intervalId = setInterval(() => {
            let curNumber = +sliderImages.querySelector(".active").dataset.index
            let nextNumber = curNumber === this.images.length - 1 ? 0 : curNumber + 1
            this.moveSlider(nextNumber)
        }, this.changeTime)
    }

    play() {
        this.initSlider()
        this.initImages()
        this.initPoints()
        this.initAutoPlay()
    }
}

let images = [
    {
        photo: SlideOne,
        name: "black friday sale"
    },
    {
        photo: SlideTwo,
        name: "for entrepreneurs"
    },
    {
        photo: SlideThree,
        name: "check out"
    }
];

export default images;