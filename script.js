/* ========================================
   EYE CHANGE ON SCROLL
======================================== */

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 20) {
    document.body.classList.add("is-scrolling-down");
  } else {
    document.body.classList.remove("is-scrolling-down");
  }

  lastScrollY = currentScrollY;
});

/* ========================================
   SCROLL REVEAL TRANSITIONS
======================================== */

const chapters = document.querySelectorAll(".chapter");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

chapters.forEach((chapter) => {
  revealObserver.observe(chapter);
});

/* ========================================
   VISUAL 4: BURNOUT JOURNEY
======================================== */

const journeyData = {
  sleep: {
    title: "Low Sleep Path",
    text:
      "Students sleeping less than 5 hours had an average burnout score of 2.81. Students sleeping more than 8 hours had an average burnout score of 0.92.",
    number: "2.81 average burnout",
    icons: ["sleep.png", "stress.png", "burnout.png", "risk.png"],
    labels: ["Low Sleep", "Pressure Builds", "Burnout Rises", "Higher Risk"],
    alt: ["Sleep icon", "Stress icon", "Burnout icon", "Risk icon"],
  },

  stress: {
    title: "High Stress Path",
    text:
      "High stress students had an average burnout score of 4.57, compared to 0.42 for low stress students.",
    number: "4.57 average burnout",
    icons: ["stress.png", "burnout.png", "burnout.png", "risk.png"],
    labels: ["High Stress", "Mental Pressure", "Burnout Rises", "Higher Risk"],
    alt: ["Stress icon", "Burnout icon", "Burnout icon", "Risk icon"],
  },

  support: {
    title: "Low Support Path",
    text:
      "High support students were 84.7% low risk, while low support students were 64.1% low risk. This suggests support can act like protection.",
    number: "84.7% low risk with high support",
    icons: ["support.png", "stress.png", "burnout.png", "risk.png"],
    labels: ["Low Support", "Less Protection", "Burnout Rises", "Higher Risk"],
    alt: ["Support icon", "Stress icon", "Burnout icon", "Risk icon"],
  },
};

const journeyButtons = document.querySelectorAll(".journey-btn");

const iconOne = document.getElementById("icon-one");
const iconTwo = document.getElementById("icon-two");
const iconThree = document.getElementById("icon-three");
const iconFour = document.getElementById("icon-four");

const labelOne = document.getElementById("label-one");
const labelTwo = document.getElementById("label-two");
const labelThree = document.getElementById("label-three");
const labelFour = document.getElementById("label-four");

const journeyTitle = document.getElementById("journey-title");
const journeyText = document.getElementById("journey-text");
const journeyNumber = document.getElementById("journey-number");
const journeyCard = document.querySelector(".journey-data-card");

const journeyIcons = [iconOne, iconTwo, iconThree, iconFour];
const journeyLabels = [labelOne, labelTwo, labelThree, labelFour];

function updateJourney(pathName) {
  const selectedPath = journeyData[pathName];

  journeyButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.path === pathName);
  });

  journeyCard.classList.add("change");

  setTimeout(() => {
    journeyTitle.textContent = selectedPath.title;
    journeyText.textContent = selectedPath.text;
    journeyNumber.textContent = selectedPath.number;

    journeyIcons.forEach((icon, index) => {
      icon.src = `./photo/${selectedPath.icons[index]}`;
      icon.alt = selectedPath.alt[index];
    });

    journeyLabels.forEach((label, index) => {
      label.textContent = selectedPath.labels[index];
    });

    journeyCard.classList.remove("change");

    document.querySelectorAll(".journey-step").forEach((step) => {
      step.classList.remove("active");
      void step.offsetWidth;
      step.classList.add("active");
    });
  }, 220);
}

journeyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateJourney(button.dataset.path);
  });
});