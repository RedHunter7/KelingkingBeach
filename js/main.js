// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("../service-worker.js")
        .then(() => {
          console.log("ServiceWorker Registration Success");
        }).catch(() => {
          console.log("ServiceWorker Registration Fail")
        });
    });
  } else {
    console.log("ServiceWorker not supported in this browser")
  }

  // Load Page
const loadPage = page => {
  const preload = document.getElementById('preloader');
  const content = document.querySelector("#body-content");
  console.log(page)
  fetch(`/pages/${page}.html`)
    .then(response => {
      return response.text();
    }).then(html => {
      content.innerHTML = html;
      preload.style.display = "none";
      content.style.visibility = "visible";
    }).catch(err => {
      content.innerHTML = 
      `<h2 class="center-align" id="error-message">
         Ooops, You can't access this page 
       </h2>`;
      preload.style.display = "none";
      content.style.visibility = "visible";
      console.log(err);
    })
}

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);

  const preload = document.getElementById('preloader');
  const content = document.querySelector("#body-content");

  //Load Nav Content
  const loadNav = () => {
    fetch('nav.html').then(response => {
      return response.text();
    }).then(html => {
      document.querySelectorAll("#nav-mobile").forEach(elm => {
        elm.innerHTML = html;
      });

      document.querySelector(".brand-logo").addEventListener("click", () => {
        //Load  Page Content
        const page = event.target.getAttribute("href").substr(1);
        content.style.visibility = "hidden";
        preload.style.display = "flex";
        loadPage(page);
      })

      document.querySelectorAll("#nav-mobile a, .sidenav a").forEach(elm => {
        elm.addEventListener("click", event => {
          //Close Sidenav
          const sidenav = document.querySelector(".sidenav");
          M.Sidenav.getInstance(sidenav).close();

          //Load  Page Content
          const page = event.target.getAttribute("href").substr(1);
          content.style.visibility = "hidden";
          preload.style.display = "flex";
          loadPage(page);
        })
      })
    }).catch(err => {
      document.querySelectorAll("#nav-mobile").forEach(elm => {
        elm.innerHTML = "Error";
        console.log(err);
      });
    })
  }
  
  loadNav();

  //Load Page on First Experience
  let page = window.location.hash.substr(1);
  if (page === '') page = 'home';
  console.log(page);

  loadPage(page);
});

const loadBtn = () => {
  setInterval(() => {
      if (window.location.hash.substr(1) === "home" || window.location.hash.substr(1) === "") {
          const preload = document.getElementById('preloader');
          const content = document.querySelector("#body-content");
          const btn = document.getElementById('btn-go');
          btn.addEventListener("click", () => {
              const page = event.target.getAttribute("href").substr(1);
              content.style.visibility = "hidden";
              preload.style.display = "flex";
              loadPage(page);
          })
      }
  },1000)
}

//Load Button 
window.addEventListener("hashchange", () => {
  loadBtn();
})

//Load Button on first try
document.addEventListener("DOMContentLoaded", () => {
  loadBtn();
})

const loadIframe = () => {
  if (window.location.hash.substr(1) === "video" || window.location.hash.substr(1) === "route") {
      const iframe = document.querySelector("iframe");
      const loader = document.querySelector(".error-loading");
      const offline = document.querySelector(".container-iframe h6");

      if (navigator.onLine === true) {
          offline.style.display = "none";
          iframe.style.display = "block";
          loader.style.display = "none";
      } else {
          iframe.style.display = "none"
          offline.style.display = "block";
          loader.style.display = "none";
      }
  }
}

//Load Iframe on first try
window.addEventListener("load", () => {
  setInterval(loadIframe,1000);
})

//Load Iframe
window.addEventListener("hashchange", () => {
  setInterval(loadIframe,1000);
})