"use strict";

const fullWidth = window.innerWidth;
const inWidth = document.documentElement.clientWidth;
const scrollBarWidth = fullWidth - inWidth;

const gnavSpBtn = document.querySelector(".gnav--sp-button");
const gnavSpBtnText = document.querySelector(".gnav--sp-button span");
const gnavSp = document.querySelector(".gnav--sp");

const body = document.querySelector("body");
const gnavLinkSp = document.querySelectorAll('.gnav--sp [tabindex="-1"]');

let currentScrollY = 0;
currentScrollY = body.getBoundingClientRect().top;

window.addEventListener("scroll", () => {
  currentScrollY = body.getBoundingClientRect().top;
});

gnavSpBtn.addEventListener("click", (e) => {
  if (gnavSpBtn.classList.contains("-active") === false) {
    gnavSpBtnText.textContent = "メニューを閉じる";
    gnavSp.setAttribute("aria-hidden", false);
    gnavSpBtn.setAttribute("aria-expanded", true);

    body.style.position = "fixed";
    body.style.top = `${currentScrollY}px`;
    gnavSp.classList.add("-active");
    gnavSpBtn.classList.add("-active");
    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`;
    }
    gnavLinkSp.forEach((link) => {
      link.setAttribute("tabindex", 0);
    });

    //開いた.ganv--sp内でフォーカスがループするよう設定
    document.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        if (document.activeElement === gnavLinkSp[gnavLinkSp.length - 1]) {
          event.preventDefault();
          gnavSpBtn.focus();
          if (event.shiftKey) {
            gnavLinkSp[gnavLinkSp.length - 2].focus();
          }
        }
        if (event.shiftKey) {
          if (document.activeElement === gnavSpBtn) {
            event.preventDefault();
            gnavLinkSp[gnavLinkSp.length - 1].focus();
          }
        }
      }
    });
  } else {
    gnavSp.classList.remove("-active");
    gnavSpBtn.classList.remove("-active");
    gnavSpBtnText.textContent = "メニューを開く";
    gnavSpBtn.setAttribute("aria-expanded", false);
    gnavSp.setAttribute("aria-hidden", true);
    gnavLinkSp.forEach((link) => {
      link.setAttribute("tabindex", "-1");
    });

    body.style.position = "";
    body.style.paddingRight = 0;
    window.scrollTo(0, currentScrollY * -1);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 767) {
    gnavSp.classList.remove("-active");
    gnavSpBtn.classList.remove("-active");
    gnavSpBtnText.textContent = "メニューを開く";
    gnavSpBtn.setAttribute("aria-expanded", false);
    gnavSp.setAttribute("aria-hidden", true);
    body.style.position = "";
    gnavLinkSp.forEach((link) => {
      link.setAttribute("tabindex", "-1");
    });
  }
});

//トップ画面で.top-fixed-navが出ているときに.gnav-pcにフォーカスが当たらないようにし、ある程度スクロールすると出現してフォーカスが当たり、.top-fixed-navにはフォーカスが当たらないようにする。
const gnavLinkPc = document.querySelectorAll(".gnav--pc .gnav__link");

function gnavPcFocusOut() {
  gnavLinkPc.forEach((link) => {
    link.setAttribute("tabindex", "-1");
    link.setAttribute("aria-hidden", true);
  });
}

function gnavPcFocusIn() {
  gnavLinkPc.forEach((link) => {
    link.setAttribute("tabindex", "0");
    link.setAttribute("aria-hidden", false);
  });
}

function topNavFunc(entry) {
  if (entry[0].isIntersecting === false) {
    header.classList.add("-active");
    gnavPcFocusIn();
    fixedNavLinks.forEach((link) => {
      link.setAttribute("tabindex", "-1");
    });
  } else {
    header.classList.remove("-active");
    gnavPcFocusOut();
    fixedNavLinks.forEach((link) => {
      link.setAttribute("tabindex", "0");
    });
  }
}

const gnavPcNav = document.querySelector(".gnav--pc");
const fixedNavLinks = document.querySelectorAll(".top-fixed-nav .gnav__link");
const header = document.querySelector(".header");
const mv = document.querySelector(".mv-wrap");

const mvOb = new IntersectionObserver(topNavFunc);
mvOb.observe(mv);

const topBtn = document.querySelector("#pageTopBtn");
topBtn.addEventListener("click", () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});

function footerFunc(entry) {
  if (entry[0].isIntersecting) {
    gnavSpBtn.classList.add("-hidden");
    topBtn.classList.add("-active");
  } else {
    gnavSpBtn.classList.remove("-hidden");
    topBtn.classList.remove("-active");
  }
}

const footer = document.querySelector(".footer");
const footerOb = new IntersectionObserver(footerFunc);

footerOb.observe(footer);

// title
const titles = document.querySelectorAll('.title');
function titleFunc(entry){
  if(entry[0].isIntersecting){
    entry[0].target.classList.add('-active');
  }
}

const titleOb = new IntersectionObserver(titleFunc);
titles.forEach((title)=>{
  titleOb.observe(title)
});
