const mobileMenu = document.getElementById ('mobile_menu')
const navActive = document.getElementById ('nav_active')
const slider = document.getElementById ('slider')
const slRibbon = slider.querySelector ('#sl_ribbon')
const weveTabs = document.getElementById ('weve_tabs')
const workList = document.getElementById ('work__list')
const spittingWindow = document.querySelector ('.spitting_window')
console.log (spittingWindow)
console.log (workList)

function clickEl (event, el, nameClass, func) {
    const elements = [...el.querySelectorAll (`.${nameClass}`)]
    for (let elem of elements) {
        elem.classList.remove (`${nameClass}`)
    }
    event.target.classList.add (nameClass)
    if (func && window.matchMedia ("(max-width: 960px)").matches) {

        func ()
    }
}

function mobileMenuToggle () {

    if (!mobileMenu.classList.contains ('mobile_menu_open')) {
        mobileMenu.classList.add ('mobile_menu_open')
        navActive.classList.add ('nav__items__active')
    } else {
        mobileMenu.classList.remove ('mobile_menu_open')
        navActive.classList.remove ('nav__items__active')
    }
}

/*slider start*/
let sliderLeft = 0

const ribbonChildren = slRibbon.children
const elWidth = ribbonChildren.item (0).clientWidth

const slRibbonWidth = elWidth * ribbonChildren.length
slRibbon.style.width = slRibbonWidth + 'px'

const slider_inner = slider.querySelector ('.slider__inner')
const slider_button = slider.querySelectorAll ('button')


slider.addEventListener ("click", (event) => {
    if (event.target.classList.contains ('sl__btn__right') && !event.target.classList.contains ('sl__btn__disabled')) {
        sliderLeft -= elWidth
        slRibbon.style.left = sliderLeft + 'px'
        if (slRibbon.offsetLeft >= 0) {
            slider_button[0].classList.remove ('sl__btn__disabled')
        }
        if (slider_inner.clientWidth >= (slRibbonWidth + slRibbon.offsetLeft - (elWidth * 2))) {
            slider_button[1].classList.add ('sl__btn__disabled')
        }
    }
    if (event.target.classList.contains ('sl__btn__left') && !event.target.classList.contains ('sl__btn__disabled')) {
        sliderLeft += elWidth
        slRibbon.style.left = sliderLeft + 'px'
        if (slider_button[1].classList.contains ('sl__btn__disabled')) {
            slider_button[1].classList.remove ('sl__btn__disabled')

        }
        if (slRibbon.offsetLeft >= (-elWidth)) {
            slider_button[0].classList.add ('sl__btn__disabled')
        }
    }
})
/*slider end*/

const containerImg = spittingWindow.querySelector ('.container__img')
workList.addEventListener ('click', (event) => {
    spittingWindow.classList.remove ('window__none')
    spittingWindow.addEventListener ('click', event => {
        if (event.target.localName !== 'img') {
            closeSpittingWindow ()
        }
    })
    const img = event.target.cloneNode (true)
    containerImg.appendChild (img)

})

const buttonCloseSpittingWindow = spittingWindow.querySelector ('.clos__spitting_window')
buttonCloseSpittingWindow.addEventListener ('click', closeSpittingWindow)

function closeSpittingWindow () {
    spittingWindow.classList.add ('window__none')
    containerImg.removeChild (containerImg.firstChild)
}

navActive.addEventListener ('click', (event) => clickEl (event, navActive, 'nav__item__link__active', mobileMenuToggle))


mobileMenu.addEventListener ('click', mobileMenuToggle)

