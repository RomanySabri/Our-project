// check If There's Local Storage color option
let maincolor = localStorage.getItem("color-option");

if (maincolor !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-option")
  );
  document.querySelectorAll(".color-list li").forEach((e) => {
    e.classList.remove("active");

    if (e.dataset.color === maincolor) {
      e.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundoption = true;

// Variable To Control the Interval
let backgroundInterval;

// Chack If There's Local Storage Random Background Item
let backgroundlocalitem = localStorage.getItem("background-option");

if (backgroundlocalitem !== null) {
  if (backgroundlocalitem === "ture") {
    backgroundoption = true;
    randomize();
  } else {
    backgroundoption = false;
  }
  document.querySelectorAll(".random span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundlocalitem === "ture") {
    document.querySelector(".option-box .random .yes").classList.add("active");
  } else {
    document.querySelector(".option-box .random .no").classList.add("active");
  }
}

document.querySelector(".setting-box .toggle-settings i").onclick =
  function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
  };

let roma = document.querySelectorAll(".setting-box .option-box li");

let landing = document.querySelector(".landing-page");
// Get Array Of Imgs
let arrayimgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Loop On All List Items
roma.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color On Local Storage
    localStorage.setItem("color-option", e.target.dataset.color);
    // Remove active Class From All Childerns
    handelActive(e);
  });
});

let random = document.querySelectorAll(".random span");

random.forEach((span) => {
  span.addEventListener("click", (e) => {
    handelActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundoption = true;
      randomize();
      localStorage.setItem("background-option", true);
    } else {
      backgroundoption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

// Function To Randomize Imgs
function randomize() {
  if (backgroundoption === true) {
    backgroundInterval = setInterval(function () {
      // Get Random Number
      let random = Math.floor(Math.random() * arrayimgs.length);
      // Change Background Imgs Url
      landing.style.backgroundImage = `Url("imgs/` + arrayimgs[random] + `")`;
    }, 1000);
  }
}

randomize();

// Select Skills Selector
let ourskills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsoffsettop = ourskills.offsetTop;
  let skillsouterheight = ourskills.offsetHeight;
  let windowheight = this.innerHeight;
  let windowscrolltop = this.pageYOffset;
  // console.log(windowscrolltop);
  if (skillsouterheight + skillsoffsettop - windowheight > windowscrolltop) {
    let scrolling = document.querySelectorAll(
      ".skills-box .skills-progress span"
    );
    scrolling.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup With The Image
let ourgallery = document.querySelectorAll(".gallery img");

ourgallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupbox = document.createElement("div");
    popupbox.className = "popupbox";
    if (img.alt !== null) {
      let imagepopup = document.createElement("h3");
      let textpopup = document.createTextNode(img.alt);
      imagepopup.appendChild(textpopup);
      popupbox.appendChild(imagepopup);
    }
    let popupimage = document.createElement("img");
    popupimage.src = img.src;
    popupbox.appendChild(popupimage);
    document.body.appendChild(popupbox);
    let closebutton = document.createElement("span");
    let closebuttontext = document.createTextNode("X");
    closebutton.appendChild(closebuttontext);
    popupbox.appendChild(closebutton);
    closebutton.className = "close-button";
  });
  document.addEventListener("click", (e) => {
    if (e.target.className == "close-button") {
      e.target.parentElement.remove();
      document.querySelector(".popup-overlay").remove();
    }
  });
});

let bullets = document.querySelectorAll(".nav-bullets .bullet");

let links = document.querySelectorAll(".links a");

function scrolltosomewhere(elements) {
  elements.forEach((bullet) => {
    bullet.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrolltosomewhere(bullets);
scrolltosomewhere(links);

function handelActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

let bullestspan = document.querySelectorAll(".bullets-option span");
let bulletscontainer = document.querySelector(".nav-bullets");
let bulletlocalstrage = localStorage.getItem("bullets-option");

if (bulletlocalstrage !== null) {
  bullestspan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletlocalstrage === "block") {
    bulletscontainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletscontainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bullestspan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletscontainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletscontainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handelActive(e);
  });
});

document.querySelector(".setting-container .reset-options").onclick =
  function () {
    localStorage.clear();
    window.location.reload();
  };

let togglebtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

togglebtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tlinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== togglebtn && e.target !== tlinks) {
    tlinks.classList.remove("open");
    togglebtn.classList.remove("menu-active");
  }
});
