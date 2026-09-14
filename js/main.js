/* ==========================================================================
   Badylarnia — Roślinna Kawiarnia — main.js
   Nawigacja, animacje przy scrollu, lightbox galerii, status "otwarte/
   zamknięte" liczony na żywo z godzin, oraz opcjonalne pobieranie
   aktualnej oceny Google (patrz js/config.js).
   ========================================================================== */
(function(){
  "use strict";

  /* ---------------- sticky header ---------------- */
  var header = document.querySelector(".site-header");
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 24){ header.classList.add("is-scrolled"); }
    else{ header.classList.remove("is-scrolled"); }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- mobile nav ---------------- */
  var burger = document.querySelector(".burger");
  var panel = document.querySelector(".mobile-panel");
  if(burger && panel){
    burger.addEventListener("click", function(){
      panel.classList.toggle("open");
      burger.classList.toggle("open");
    });
    panel.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        panel.classList.remove("open");
        burger.classList.remove("open");
      });
    });
  }

  /* ---------------- scroll reveal ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("in"); });
  }

  /* ---------------- popularne dania: podmiana zdjęcia po kliknięciu ---------------- */
  var popularPicker = document.querySelector("[data-popular-picker]");
  var popularImg = document.querySelector("[data-popular-img]");
  if(popularPicker && popularImg){
    var popularMedia = popularImg.closest(".popular-media");
    var buttons = Array.prototype.slice.call(popularPicker.querySelectorAll(".tag-pill"));

    // preload wszystkie zdjęcia dań, żeby zmiana była natychmiastowa
    buttons.forEach(function(btn){
      var src = btn.getAttribute("data-image");
      if(src){ var pre = new Image(); pre.src = src; }
    });

    buttons.forEach(function(btn){
      btn.addEventListener("click", function(){
        var newSrc = btn.getAttribute("data-image");
        var newAlt = btn.getAttribute("data-alt") || btn.textContent;
        if(!newSrc || popularImg.getAttribute("src") === newSrc){
          // to samo zdjęcie (np. Matcha Latte i Pistacjanka) — tylko podmień stan przycisków
          buttons.forEach(function(b){ b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
          return;
        }
        buttons.forEach(function(b){ b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
        popularImg.classList.add("is-swapping");
        if(popularMedia){ popularMedia.classList.add("show-hint"); }
        setTimeout(function(){
          popularImg.src = newSrc;
          popularImg.alt = newAlt;
          popularImg.classList.remove("is-swapping");
        }, 220);
      });
    });

    if(popularMedia){
      popularMedia.addEventListener("mouseenter", function(){ popularMedia.classList.add("show-hint"); });
      popularMedia.addEventListener("mouseleave", function(){ popularMedia.classList.remove("show-hint"); });
    }
  }

  /* ---------------- lightbox ---------------- */
  var lightbox = document.querySelector(".lightbox");
  if(lightbox){
    var lbImg = lightbox.querySelector("img");
    document.querySelectorAll("[data-lightbox]").forEach(function(fig){
      fig.addEventListener("click", function(){
        var full = fig.getAttribute("data-lightbox");
        lbImg.src = full;
        lbImg.alt = fig.querySelector("img") ? fig.querySelector("img").alt : "";
        lightbox.classList.add("open");
      });
    });
    lightbox.addEventListener("click", function(e){
      if(e.target === lightbox || e.target.closest(".lightbox-close")){
        lightbox.classList.remove("open");
        lbImg.src = "";
      }
    });
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape"){
        lightbox.classList.remove("open");
        lbImg.src = "";
      }
    });
  }

  /* ---------------- godziny otwarcia ---------------- */
  // 0 = niedziela ... 6 = sobota (standard JS Date)
  var HOURS = {
    0: null,               // niedziela — zamknięte
    1: null,               // poniedziałek — zamknięte
    2: [8, 17],
    3: [8, 17],
    4: [8, 17],
    5: [8, 19],
    6: [9, 19]
  };
  var DAY_NAMES = ["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"];

  function pad(n){ return n < 10 ? "0" + n : "" + n; }

  function computeStatus(){
    var now = new Date();
    var day = now.getDay();
    var mins = now.getHours() * 60 + now.getMinutes();
    var today = HOURS[day];
    var isOpen = false;
    if(today){
      var openMins = today[0] * 60;
      var closeMins = today[1] * 60;
      isOpen = mins >= openMins && mins < closeMins;
    }
    return { isOpen: isOpen, day: day, today: today };
  }

  function nextOpening(day){
    for(var i = 1; i <= 7; i++){
      var d = (day + i) % 7;
      if(HOURS[d]){
        return { day: d, hour: HOURS[d][0] };
      }
    }
    return null;
  }

  function renderStatus(){
    var el = document.querySelector("[data-open-status]");
    if(!el) return;
    var s = computeStatus();
    if(s.isOpen){
      var closeH = s.today[1];
      el.className = "status-badge open";
      el.innerHTML = '<span class="dot-live"></span> Otwarte teraz — do ' + closeH + ':00';
    } else {
      var nxt = nextOpening(s.day);
      el.className = "status-badge closed";
      if(nxt){
        el.innerHTML = '<span class="dot-live"></span> Zamknięte — otwieramy ' +
          (nxt.day === (s.day + 1) % 7 ? "jutro" : "w " + DAY_NAMES[nxt.day].toLowerCase()) +
          " o " + nxt.hour + ":00";
      } else {
        el.innerHTML = '<span class="dot-live"></span> Zamknięte';
      }
    }
  }

  document.querySelectorAll("[data-today-row]").forEach(function(row){
    var d = parseInt(row.getAttribute("data-today-row"), 10);
    if(d === new Date().getDay()){ row.classList.add("today"); }
  });

  renderStatus();
  setInterval(renderStatus, 60000);

  /* ---------------- baner informacyjny (cookies / usługi Google) ---------------- */
  var COOKIE_ACK_KEY = "badylarnia_cookie_notice_ack";
  var cookieNotice = document.querySelector("[data-cookie-notice]");
  if(cookieNotice){
    var alreadyAck = null;
    try{ alreadyAck = localStorage.getItem(COOKIE_ACK_KEY); } catch(e){ /* prywatna karta / zablokowany storage — pokaż baner */ }
    if(!alreadyAck){ cookieNotice.hidden = false; }
    var cookieAckBtn = cookieNotice.querySelector("[data-cookie-ack]");
    if(cookieAckBtn){
      cookieAckBtn.addEventListener("click", function(){
        cookieNotice.hidden = true;
        try{ localStorage.setItem(COOKIE_ACK_KEY, "1"); } catch(e){ /* trudno, po prostu wróci przy kolejnej wizycie */ }
      });
    }
  }

  /* ---------------- rok w stopce ---------------- */
  document.querySelectorAll("[data-year]").forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

  /* ---------------- ocena Google (na żywo, opcjonalnie) ---------------- */
  function renderRating(rating, count, live){
    var stars = document.querySelectorAll("[data-rating-stars]");
    var nums = document.querySelectorAll("[data-rating-num]");
    var counts = document.querySelectorAll("[data-rating-count]");
    var liveFlags = document.querySelectorAll("[data-rating-live]");
    var rounded = Math.round(rating * 2) / 2;
    var full = Math.floor(rounded);
    var half = rounded - full === 0.5;
    var starStr = "★".repeat(full) + (half ? "½" : "") + "☆".repeat(Math.max(0, 5 - full - (half?1:0)));

    stars.forEach(function(el){ el.textContent = "★★★★★".slice(0, 5); el.setAttribute("title", rating + "/5"); });
    nums.forEach(function(el){ el.textContent = rating.toFixed(1).replace(".", ","); });
    counts.forEach(function(el){ el.textContent = count; });
    liveFlags.forEach(function(el){ el.classList.toggle("is-live", !!live); });
  }

  function initRating(){
    var cfg = window.BADYLARNIA_CONFIG || {};
    // Zawsze najpierw pokaż wartości zapasowe, żeby strona nie migała pustką.
    renderRating(cfg.FALLBACK_RATING || 5.0, cfg.FALLBACK_REVIEW_COUNT || 0, false);

    if(!cfg.GOOGLE_PLACES_API_KEY){ return; } // brak klucza -> zostajemy przy wartości zapasowej

    var url = "https://places.googleapis.com/v1/places:searchText";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": cfg.GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": "places.rating,places.userRatingCount,places.googleMapsUri"
      },
      body: JSON.stringify({ textQuery: cfg.PLACE_QUERY, languageCode: "pl" })
    })
    .then(function(res){ return res.ok ? res.json() : Promise.reject(res.status); })
    .then(function(data){
      var place = data && data.places && data.places[0];
      if(place && place.rating){
        renderRating(place.rating, place.userRatingCount || cfg.FALLBACK_REVIEW_COUNT, true);
      }
    })
    .catch(function(){ /* po cichu zostajemy przy wartości zapasowej */ });
  }
  initRating();

})();
