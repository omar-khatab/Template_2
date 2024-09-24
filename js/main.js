// open the head with the toggle menu
let toggleMenu = document.querySelector(".toggle-menu");
let  mainLinks = document.querySelector(".main-links");

toggleMenu.onclick = () => {
    mainLinks.classList.toggle("open")
}
// appear the text head

let textHead = document.querySelector(".landing .text");

onscroll = () => {
    if(scrollY < 150 ) {
        textHead.style.cssText = "left:0";
    } else {
        textHead.style.cssText = "left:-50%";
    }
}

// create input search

let iconSearch = document.querySelector("header nav .form i");
let searchInput = document.querySelector('header .form input[type="search"]')

iconSearch.onclick = function () {
    searchInput.classList.toggle("fill")
    searchInput.classList.toggle("infill")
}

// image slider to landing

let arrImage = document.querySelectorAll(".slide-show img");
let indicator = document.querySelector(".indicators")
let prevArrow = document.querySelector(".prev")
let nextArrow = document.querySelector(".next")

let currentSlide = 1;

for ( i = 0; i < arrImage.length ; i++) {
    let listImage = document.createElement("li");
    listImage.classList.add(`${i+1}`)
    indicator.append(listImage);
}

let targetImage = document.querySelectorAll(".indicators li");

for(i = 0; i < targetImage.length; i++) {
    targetImage[i].onclick = function () {
        currentSlide = Number(this.className)
        theCheck();
    }
}

prevArrow.onclick = previous
nextArrow.onclick = next
theCheck();



function previous () {
    if (prevArrow.classList.contains("disabled")) {
        return false
    } else {
        currentSlide--
        theCheck()
    }
}
function next () {
    if(nextArrow.classList.contains("disabled")) {
        return false 
    } else {
        currentSlide++
        theCheck()
    }
}


function theCheck () {
    removeActive(arrImage)
    removeActive(targetImage)
    arrImage[currentSlide-1].classList.add("active")
    targetImage[currentSlide-1].classList.add("active")
    if(currentSlide == 1 ) {
        prevArrow.classList.add("disabled")
    } else {
        prevArrow.classList.remove("disabled")
    }
    if (currentSlide == arrImage.length) {
        nextArrow.classList.add("disabled")
    }  else {
        nextArrow.classList.remove("disabled")
    }
}

// auto image slide the landing

function slideNext () {
    let autoNext = setInterval(function () {
        nextArrow.click();
        if(nextArrow.classList.contains("disabled")) {
            clearInterval(autoNext);
            slidePrev();
        }
    }, 10000)
}
function slidePrev () {
    let autoPrev = setInterval(function () {
        prevArrow.click();
        if(prevArrow.classList.contains("disabled")) {
            clearInterval(autoPrev);
            slideNext();
        }
    }, 10000)
}
slideNext()

// filter the sections
let shuffle = document.querySelectorAll(".shuffle li")
let boxes = document.querySelectorAll(".portfolio .imgs-container .box");
let showBoxes = document.querySelectorAll(".portfolio .imgs-container .show");

shuffle.forEach((e) => {
    e.onclick = function () {
        shuffle.forEach((e) => e.classList.remove("active"));
        this.classList.add("active")
        boxes.forEach((e) => e.classList.add("hide"));
        document.querySelectorAll(`.${this.dataset.section}`).forEach((e) => e.classList.remove("hide"));
    }
})

// show more section

let more = document.querySelector(".more");
let less= document.querySelector(".less");

more.onclick = () => {
    showBoxes.forEach((e) => e.classList.remove("show"))
    hideAndShow(less,more)
}
less.onclick = () => {
    showBoxes.forEach((e) => e.classList.add("show"))
    hideAndShow(more,less)
}

function hideAndShow (appear, disappear) {
    appear.style.display = "block";
    disappear.style.display = "none";
}

// play the video 

let textVideo = document.querySelector(".video .text")
let watch = document.querySelector(".video .text button");
let video = document.querySelector("video")

watch.onclick = () => {
    video.play();
    textVideo.style.display = "none";
}

// when the video end
video.onended = () => {
    textVideo.style.display = "block";
}

// increase the number in stats and width at scrolling

let numBox = document.querySelectorAll(".stats .box .number")
let stats = document.querySelector(".stats")
let started = true;
let spanScroll = document.querySelectorAll(".skills .prog span")
let progressScroll = document.querySelector(".prog")


function numberIncrease (el) {
    let target = el.dataset.num;
    let increase = setInterval ( function () {
    el.textContent++;
    if (target == el.textContent) {
        clearInterval(increase);
    }
    }, 2000 / target )
}

onscroll = () => {
if (scrollY >= stats.offsetTop - 300) {
    if(started) {
        numBox.forEach((e) => numberIncrease(e))
    }
    started = false;

    if (scrollY >= progressScroll.offsetTop - 300) {
        spanScroll.forEach((e)=> {
            e.style.width = e.dataset.progress;    
        })
    }
}
}

// show the Testimonials

let testimonialsSec = document.querySelectorAll(".our-skills .testimonials .section");

let testimonialsCont = document.querySelector(".our-skills .testimonials");

let testimonialsBullets = document.querySelectorAll(".our-skills .container ul li");
let initial = 0;

testimonialsBullets.forEach((e) => {
    e.onclick =  (e) => {
        removeActive(testimonialsSec);
        removeActive(testimonialsBullets);
        e.target.classList.add("active");
        document.querySelector(`.${e.target.dataset.test}`).classList.add("active");
    }
})

let showClient = setInterval(function () {
        testimonialsBullets[initial++].click();
        if (initial==3) {
            initial = 0;
        }
}, 5000)




function removeActive (target) {
    target.forEach(e =>  e.classList.remove("active"))
}
