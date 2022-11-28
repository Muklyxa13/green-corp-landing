const INCREASE_NUMBER_ANIMATION_SPEED = 50;

function increaseNumberAnimationStep (i, el, endNumber) {
    if (i <= endNumber) {
        if (i === endNumber) {
            el.innerText = i + '+';
        } else {
            el.innerText = i
        }
    }

    i += 100;

    setTimeout(() => increaseNumberAnimationStep(i, el, endNumber), INCREASE_NUMBER_ANIMATION_SPEED);
}

function initIncreaseNumberAnimation () {
    let element = document.querySelector('.features__clients-count');
    increaseNumberAnimationStep(0, element, 5000);
}
// initIncreaseNumberAnimation()

document.querySelector('#budget').addEventListener('change', function handleSelectChange(event) {
    console.log(event);
    if (event.target.value === 'other') {
        // должны добавить еще одно текствое поле
        const formContainer = document.createElement('div');
        formContainer.classList.add('form__group');
        formContainer.classList.add('form__other-input');

        const input = document.createElement('input');
        input.placeholder = 'Введите ваш вариант';
        input.type = 'text';

        formContainer.appendChild(input);
        document.querySelector('#form form').insertBefore(formContainer, document.querySelector('.form__submit'));
    }
    const otherInput = document.querySelector('.form__other-input');
    if (event.target.value !== 'other' && Boolean(otherInput)) {
        // удаляем ранее добавленное текстовое поле, если оно есть в DOM
        document.querySelector('#form form').removeChild(otherInput);
    }
});

function updateScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList = 'header__scrolled';
    } else {
        header.classList.remove('header__scrolled');
    }
    // Запуск анимации увеличения числа
    let countElementPosition = document.querySelector('.features__clients-count').offsetTop;
    let windowBottomPosition = window.scrollY + window.innerHeight;
    if (windowBottomPosition >= countElementPosition && !animationInited) {
        animationInited = true;
        initIncreaseNumberAnimation();
    }
}

window.addEventListener('scroll', updateScroll);

let animationInited = false;

function addSmoothScroll(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}

function onLinkClick(event) {
    event.preventDefault();

    document.querySelector(event.target.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    addSmoothScroll(anchor);
})

addSmoothScroll(document.querySelector('.more-button'));