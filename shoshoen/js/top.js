"use strict";

// ファーストビュー
const mvText = document.querySelector('.mv-text');
const text = "笑顔で照らされる介護";
const textArr = [...text];

for (let i = 0; i < textArr.length; i++) {
  const span = document.createElement('span');
  span.classList.add('spans');
  span.setAttribute('aria-hidden',true);
  span.textContent = textArr[i];
  mvText.append(span);
  span.animate(
    {
      opacity: [0,1],
      rotate: ["90deg","0"],
      translate: ["0 50px","0 0"],
    },
    {
      duration: 500,
      delay: 100 * i,
      fill: "forwards",
    }
  );
}

const topServiceTabs = document.querySelectorAll(".top-service__tab");
const topServiceTabPanels = document.querySelectorAll(".top-service__tabpanel");

function tabAllOut() {
  topServiceTabs.forEach((tab) => {
    tab.setAttribute("tabindex", "-1");
    tab.setAttribute("aria-selected", "false");
    tab.setAttribute("aria-expanded", "false");
  });
  topServiceTabPanels.forEach((panel) => {
    panel.setAttribute("hidden", "until-found");
    panel.classList.remove("-active");
  });
}

topServiceTabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();
    tabAllOut();
    tab.setAttribute("tabindex", "0");
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("aria-expanded", "true");
    const idName = tab.getAttribute("aria-controls");
    document.querySelector(`#${idName}`).hidden = false;
    document.querySelector(`#${idName}`).classList.add("-active");
  });
});

function tabAllIn() {
  topServiceTabs.forEach((tab) => {
    tab.setAttribute("tabindex", "0");
  });
}

topServiceTabs.forEach((tab, index) => {
  tab.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (document.activeElement === tab) {
        tabAllIn();
      }
    }
  });
  tab.addEventListener("keyup", (e) => {
    if (e.key === "Tab") {
      if (document.activeElement === tab) {
        tabAllOut();
        tab.setAttribute("aria-selected", "true");
        tab.setAttribute("aria-expanded", "true");
        const idName = tab.getAttribute("aria-controls");
        document.querySelector(`#${idName}`).hidden = false;
        document.querySelector(`#${idName}`).classList.add("-active");
      }
    }
  });
});

document.addEventListener('keydown',(e)=>{
  console.log(e.key);
});


// top-features 
const topFeaturesPicture = document.querySelectorAll('.top-features__picture');

function topFeaturesFunc(entry){
  if(entry[0].isIntersecting) {
    entry[0].target.classList.add('-active');
  }
}

const topFeaturesOb = new IntersectionObserver(topFeaturesFunc);

topFeaturesPicture.forEach((picture)=>{
  topFeaturesOb.observe(picture);
});

// top-news 
const newsCardWrap = document.querySelector('.news-card-wrap');

function newsCardFunc(entry){
  if(entry[0].isIntersecting) {
    entry[0].target.classList.add('-active');
  }
}
const newsCardOb = new IntersectionObserver(newsCardFunc);
newsCardOb.observe(newsCardWrap);


// top-recruit 
const topRecruitText = document.querySelector('.top-recruit-text-wrap');

function topRecruitTextFunc(entry){
  if(entry[0].isIntersecting) {
    entry[0].target.classList.add('-active');
  }
}

const topRecruitTextOb = new IntersectionObserver(topRecruitTextFunc);

topRecruitTextOb.observe(topRecruitText);

