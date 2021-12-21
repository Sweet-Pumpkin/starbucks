// SEARCH
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

// BADGE
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // badgeEl.style.display = 'none'; → 배지 보이기
    // gsap.to(요소, 지속시간, 옵션); → 애니메이션 효과 → gsap
    gsap.to(badgeEl, 0.6, {
      opacity: 0,
      display: 'none'
    });
    // TO TOP 버튼 보이기
    gsap.to(toTopEl, 0.2, {
      x: 0
    });
  } else {
    // badgeEl.style.display = 'block'; → 배지 숨기기
    gsap.to(badgeEl, 0.6, {
      opacity: 1,
      display: 'block'
    });
    // TO TOP 버튼 숨기기
    gsap.to(toTopEl, 0.2, {
      x: 100
    });
  }
}, 300)); // _.throttle(함수, 시간) → lodash cdn

toTopEl.addEventListener('click', function () {
  gsap.to(window, 0.7, {
    scrollTo: 0
  });
});

// FADE-IN 
const fadeEls = document.querySelectorAll('.visual .fade-in');

fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7,
    opacity: 1
  });
});

//SWIPER
// new Swiper(선택자, 옵션);
new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  autoplay: { //자동슬라이드 설정
    disableOnInteraction: false //스와이프 후 자동 재생 비활성화가 되지 않음
  },
  loop: true //슬라이드 반복 여부
});
new Swiper('.promotion .swiper', {
  //direction: 'horizontal' 생략
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  autoplay: {
    disableOnInteraction: false,
    delay: 5000 //시간
  },
  loop: true,
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

//SWIPER AWARDS
new Swiper('.awards .swiper', {
  autoplay: {
    disableOnInteraction: false
  },
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

//TOGGLE
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
const toggleBtnEls = promotionToggleBtn.querySelectorAll('.material-icons');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    // 숨김 처리
    promotionEl.classList.add('hide');
    toggleBtnEls.forEach(function (toggleBtnEl) {
      toggleBtnEl.classList.add('hide')
    });
  } else {
    // 보임 처리
    promotionEl.classList.remove('hide');
    toggleBtnEls.forEach(function (toggleBtnEl) {
      toggleBtnEl.classList.remove('hide')
    });
  }
});

//FLOATING
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floationgObject(selector, delay, size) {
  gsap.to(selector, // 선택자 
    random(1.5, 2.5), //애니메이션 동작 시간
    { //옵션
    y: size,
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut,
    delay: random(0, delay)
  });
}
floationgObject('.floating1', 1, 15);
floationgObject('.floating2', 0.5, 15);
floationgObject('.floating3', 1.5, 20);

// Scroll Magic 
const spyEls = document.querySelectorAll('section.scroll-spy');

spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook: 0.8 // viewport 기준 페이지 0~1 사이 값
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

//THIS YEAR
const thisYear = document.querySelector('.this-year');

thisYear.textContent = new Date().getFullYear();