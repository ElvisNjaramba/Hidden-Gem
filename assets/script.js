/* Hidden Gem — vibrant edition behaviour */
(function(){
  "use strict";

  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  function onScroll(){
    if(!nav) return;
    if(window.scrollY > 40){ nav.classList.add("is-scrolled"); }
    else{ nav.classList.remove("is-scrolled"); }
  }
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  if(toggle && links){
    toggle.addEventListener("click", function(){
      var open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        links.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded","false");
        document.body.style.overflow = "";
      });
    });
  }

  var here = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a[href]").forEach(function(a){
    var href = a.getAttribute("href");
    if(href === here || (here === "" && href === "index.html")){
      a.classList.add("active");
    }
  });

  var revealEls = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.15, rootMargin:"0px 0px -60px 0px" });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("is-visible"); });
  }

  document.querySelectorAll(".faq-q").forEach(function(q){
    q.addEventListener("click", function(){
      var item = q.closest(".faq-item");
      var wasOpen = item.classList.contains("is-open");
      item.parentElement.querySelectorAll(".faq-item").forEach(function(i){ i.classList.remove("is-open"); });
      if(!wasOpen){ item.classList.add("is-open"); }
    });
  });

  var form = document.getElementById("contact-form");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var status = document.getElementById("form-status");
      if(status){
        status.textContent = "Sent — the riad desk calls back within one day.";
        status.classList.add("is-visible");
      }
      form.reset();
    });
  }
})();
