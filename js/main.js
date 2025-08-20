import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js';



// header - 장바구니 toggle
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation();
  if (basketEl.classList.contains('show')) {
    // hide
    hideBasket();
  } else {
    // show
    showBasket();
  }
});

basketEl.addEventListener('click', function (event) {
  event.stopPropagation();
});

window.addEventListener('click', function () {
  hideBasket();
});

function showBasket() {
  basketEl.classList.add('show');;
}
function hideBasket() {
  basketEl.classList.remove('show');
}


// header - search start를 클릭하면 search-wrap

const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const shadowEl = searchWrapEl.querySelector('.shadow');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];
const searchInputEl = searchWrapEl.querySelector('input');

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', hideSearch);
shadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searching');
  document.documentElement.classList.add('fixed');
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length +'s';
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + 's';
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
};
function hideSearch() {
  headerEl.classList.remove('searching');
  document.documentElement.classList.remove('fixed');
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length +'s';
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = '0s';
  });
  searchInputEl.value = '';
};


// generate icon frames
// let x = 0;
// let y = 0;
// let frames = '';
// for (let i = 0; i < 60;  i += 1) {
//   x = - (i % 6) * 100;
//   y = - parseInt(i / 6) * 100;
//   frames += `${(i / 60 * 100).toFixed(2)}% { background-position: ${x}px ${y}px; } \n`;
// }
// console.log(frames);



// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add('show');
  });
});


const featureEls = document.querySelectorAll('.info');
featureEls.forEach(function (el) {
  io.observe(el);
})


// camera - video - 재생/일시정지 togger
const videoEl = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', function () {
  videoEl.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
})

pauseBtn.addEventListener('click', function () {
  videoEl.pause();
  pauseBtn.classList.add('hide');
  playBtn.classList.remove('hide');
})


// compare - 당신에게 맞는 iPad는? 렌더링
const itemsEl = document.querySelector('section.compare .items');
ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  let colorList = '';
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`;
  })
  
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}">
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
    `;
  
  itemsEl.append(itemEl);
});


// footer - navigation 렌더링
const navigationsEl = document.querySelector('footer .navigations');
navigations.forEach(function (navigation) {
  const mapEl = document.createElement('div');
  mapEl.classList.add('map');

  let mapList = '';
  navigation.maps.forEach(function (map) {
    mapList += /* html */`
      <li>
        <a href="${map.url}">${map.name}</a>
      </li>
    `;
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${navigation.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;

  navigationsEl.append(mapEl);
});


// footer - copyright 올해
const thisYearEl = document.querySelector('span.this-year');
thisYearEl.textContent = new Date().getFullYear();