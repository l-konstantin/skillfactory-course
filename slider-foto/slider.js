let images = [
    {
        src: "./images/slide-1.png",
        name: "ROSTOV-ON-DON, ADMIRAL" 
    },
    {
        src: "./images/slide-2.png",
        name: "SOCHI THIEVES" 
    },
    {
        src: "./images/slide-3.png",
        name: "ROSTOV-ON-DON PATRIOTIC" 
    }
];

function projectSlider(options) {
    if (!images || !images.length) return;

    options = options || {
        titles: false,
        points: true
    };

    let sliderImages = document.querySelector(".project-photo_title");
    let sliderPagination = document.querySelector(".project-pagination_items");
    let sliderPoints = document.querySelector(".project-pagination_points");
    let sliderTitles = document.querySelector(".project-city");

    initImages();
    initPagination();

    if (options.points) {
        initPoints();
    }
    
    if (options.titles) {
        initTitles();
    }

    function initImages() {
        images.forEach((image, index) => {
            let imageDiv = `<img class="project-photo_icon n${index} ${index === 0 ? "active" : ""}"
                            src="${images[index].src}" alt="${images[index].name}" data-index="${index}"/>`;
            sliderImages.innerHTML += imageDiv;
        });
    }

    function initPagination() {
        sliderPagination.querySelectorAll(".project-pagination_link").forEach(pagination => {
            pagination.addEventListener("click", function() {
                let curNumber = +sliderImages.querySelector(".active").dataset.index;
                let nextNumber;
                if (pagination.classList.contains("left")) {
                    nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
            });
        });
    }

    function initPoints() {
        images.forEach((image, index) => {
            let point = `<div class="project-pagination_circle n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;
            sliderPoints.innerHTML += point;
        });
        sliderPoints.querySelectorAll(".project-pagination_circle").forEach(point => {
            point.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            })
        })
    }

    function initTitles() {
        images.forEach((image, index) => {
            let title = `<div class="project-city_name n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${images[index].name}</div>`;
            sliderTitles.innerHTML += title;
        });
        sliderTitles.querySelectorAll(".project-city_name").forEach(title => {
            title.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            })
        })
    }

    function moveSlider(num) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");

        if (options.points) {
            sliderPoints.querySelector(".active").classList.remove("active");
            sliderPoints.querySelector(".n" + num).classList.add("active");
        }

        if (options.titles) {
            sliderTitles.querySelector(".active").classList.remove("active");
            sliderTitles.querySelector(".n" + num).classList.add("active");
        }
    }    
}

let sliderOptions = {
    titles: true,
    points: true
}

document.addEventListener("DOMContentLoaded", function() {
    projectSlider(sliderOptions);
});