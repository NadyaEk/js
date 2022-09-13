'use strict';


let filterCategory = document.querySelectorAll('.filter__category');
let filterContent = document.querySelectorAll('.filter__content');

filterCategory.forEach(function (elm) {
            elm.addEventListener('click', (event) => {
                event.target.nextElementSibling.classList.toggle('hidden')
            })
        });


