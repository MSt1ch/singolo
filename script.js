// Header
document.addEventListener("scroll", () => {
    let curPos = window.scrollY;
    const anchors = document.querySelectorAll("section");
    const menu = document.querySelectorAll("nav a");

    anchors.forEach(el => {
      if (
        el.offsetTop - 80 <= curPos &&
        el.offsetTop + el.offsetHeight - 50 > curPos
      ) {
        menu.forEach(link => {
          link.classList.remove("active-color");
          if (el.getAttribute("id") === link.getAttribute("href").substring(1)) {
            link.classList.add("active-color");
          }
        });
      }
    });
    if (
      document.documentElement.scrollTop +
        document.documentElement.clientHeight ===
      document.documentElement.scrollHeight
    ) {
      document.querySelector("nav a.active-color").classList.remove("active-color");
      menu[menu.length - 1].classList.add("active-color");
    }
    if (document.querySelector("nav a.active-color") === null) {
      menu[0].classList.add("active-color");
    }
  });
// end: Header



// Slider. Переключение слайдов
let slider = document.querySelector("#slider"),
  sliderItems = document.querySelector("#slides"),
  prev = document.querySelector("#slider-left-control"),
  next = document.querySelector("#slider-right-control");

function slide(wrapper, items, prev, next) {
  let posInitial,
    slides = items.querySelectorAll(".slide"),
    slidesLength = slides.length,
    slideSize = slides[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true;

  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add("loaded");

  prev.addEventListener("click", function() {
    shiftSlide(-1);
  });

  next.addEventListener("click", function() {
    shiftSlide(1);
  });

  items.addEventListener("transitionend", checkIndex);

  function shiftSlide(dir, action) {
    items.classList.add("shifting");

    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft;
      }

      if (dir == 1) {
        items.style.left = posInitial - slideSize + "px";
        index++;
      } else if (dir == -1) {
        items.style.left = posInitial + slideSize + "px";
        index--;
      }
    }

    allowShift = false;
  }

  function checkIndex() {
    items.classList.remove("shifting");

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }
}
slide(slider, sliderItems, prev, next);
// end: Slider. Переключение слайдов

//Slider. Активация экранов телефонов
function showOrHideScreen(n) {
    document.querySelectorAll(".slider-screen-black")[n].classList.toggle("hidden");
}

document.querySelector("#btn-vertical").addEventListener("click", () => {
    showOrHideScreen(0);
});
  
  document.querySelector("#btn-horizontal").addEventListener("click", () => {
    showOrHideScreen(1);
});
// end: Slider. Активация экранов телефонов

// Portfolio. Взаимодействие с картинками
function addBorderToImg(e) {
    if (e.target.tagName === "IMG") {
      document.querySelectorAll("#portfolio img").forEach(item =>
      {
        item==e.target ? item.className = 'active interactive' : item.className = 'interactive';
      });
    }
}

document.querySelector("#portfolio").addEventListener("click", addBorderToImg);
// end: Portfolio. Взаимодействие с картинками

// Portfolio. Переключение табов
document.querySelector("#portfolio-tabs").addEventListener("click", clickTab);

function clickTab(e) {
    let target = e.target;
    if (target.tagName === "A" && !target.classList.contains('active-tab'))
    {
        var table = document.querySelector('#portfolio');
        for (var i = table.children.length-1; i >= 0; i--) {
            table.appendChild(table.children[Math.random() * i | 0]);
        }
        
        var links = document.querySelectorAll('#portfolio-tabs .portfolio-div-button');
        links.forEach(item =>  item === target
            ? item.classList.add("active-tab")
            : item.classList.remove("active-tab")
        );
    }
}
// end: Portfolio. Переключение табов

// Get a quote
document.querySelector("#contact-button").addEventListener("click", contactButtonClick);
document.querySelector("#contact-button-close").addEventListener("click", contactCloseModal);

function contactButtonClick(e) {
  if (document.querySelector('#name').reportValidity() && document.querySelector('#email').reportValidity()) {
    e.preventDefault();
    let subject = document.querySelector('#subject').value;
    let  details = document.querySelector('#details').value;

    let textSubject = document.createElement('p');
    textSubject.textContent = subject ? "Тема: " + subject : "Без темы";

    let textDetails = document.createElement('p');
    textDetails.textContent =  details ? "Описание: " + details : "Без описания";

    let resultDiv = document.querySelector('#modal-contact-text');
    resultDiv.textContent='';
    resultDiv.appendChild(textSubject).appendChild(textDetails);
    document.querySelector(".modal").classList.add("active");
  }
}

function contactCloseModal() {
    document.querySelector('#form-contact').reset();
    document.querySelector(".modal").classList.remove("active");
}
// end: Get a quote