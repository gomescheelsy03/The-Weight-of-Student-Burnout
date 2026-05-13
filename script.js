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

/* ========================================
   VISUAL 5: TWO STUDENT OUTCOME GAME
======================================== */

const studentGameData = {
  sleep: {
    lt5: { label: "<5 hrs", score: 2.81 },
    "5to6": { label: "5–6 hrs", score: 2.17 },
    "6to7": { label: "6–7 hrs", score: 1.74 },
    "7to8": { label: "7–8 hrs", score: 1.35 },
    gt8: { label: ">8 hrs", score: 0.92 },
  },

  stress: {
    low: { label: "Low Stress", score: 0.42 },
    medium: { label: "Medium Stress", score: 2.08 },
    high: { label: "High Stress", score: 4.57 },
  },

  support: {
    low: { label: "Low Support", protection: 0, lowRisk: 64.1 },
    medium: { label: "Medium Support", protection: 0.35, lowRisk: 75.6 },
    high: { label: "High Support", protection: 0.7, lowRisk: 84.7 },
  },
};

const studentChoices = {
  a: {
    sleep: "gt8",
    stress: "low",
    support: "high",
  },

  b: {
    sleep: "lt5",
    stress: "high",
    support: "low",
  },
};

function getStudentResult(studentId) {
  const choices = studentChoices[studentId];

  const sleepScore = studentGameData.sleep[choices.sleep].score;
  const stressScore = studentGameData.stress[choices.stress].score;
  const supportProtection = studentGameData.support[choices.support].protection;

  let burnoutScore = (sleepScore + stressScore) / 2;

  // Support acts like protection, so stronger support softens the final score.
  burnoutScore = Math.max(0, burnoutScore - supportProtection);

  let level = "low";
  let riskText = "Lower Risk";

  if (burnoutScore >= 1.75 && burnoutScore < 3) {
    level = "medium";
    riskText = "Moderate Risk";
  }

  if (burnoutScore >= 3) {
    level = "high";
    riskText = "Higher Risk";
  }

  return {
    score: burnoutScore,
    level: level,
    riskText: riskText,
  };
}

function updateStudentCard(studentId) {
  const result = getStudentResult(studentId);

  const card = document.getElementById(`student-${studentId}-card`);
  const img = document.getElementById(`student-${studentId}-img`);
  const meter = document.getElementById(`student-${studentId}-meter`);
  const score = document.getElementById(`student-${studentId}-score`);
  const risk = document.getElementById(`student-${studentId}-risk`);

  card.classList.remove("low-result", "medium-result", "high-result", "is-updating");
  risk.classList.remove("low", "medium", "high");

  void card.offsetWidth;

  card.classList.add(`${result.level}-result`, "is-updating");
  risk.classList.add(result.level);

  img.src = `./photo/student-${studentId}-${result.level}.png`;
  
  const meterPercent = Math.min((result.score / 4.6) * 100, 100);
  const roundedPercent = Math.round(meterPercent);
  
  meter.style.width = `${roundedPercent}%`;
  
  score.textContent = `${roundedPercent}%`;
  risk.textContent = result.riskText;
}

function updateGameSummary() {
  const resultA = getStudentResult("a");
  const resultB = getStudentResult("b");

  const winnerText = document.getElementById("game-winner-text");
  const takeawayTitle = document.getElementById("game-takeaway-title");
  const takeawayText = document.getElementById("game-takeaway-text");

  const percentA = Math.round(Math.min((resultA.score / 4.6) * 100, 100));
  const percentB = Math.round(Math.min((resultB.score / 4.6) * 100, 100));
  const difference = Math.abs(percentA - percentB);

  if (percentA < percentB) {
    winnerText.textContent = "Student A is carrying less burnout pressure.";
    takeawayTitle.textContent = "Student B is carrying the heavier burnout load.";
    takeawayText.textContent =
      `Student B's burnout load is ${difference}% higher than Student A's. This shows how sleep, stress, and support can combine into a heavier burnout pattern.`;
  } else if (percentB < percentA) {
    winnerText.textContent = "Student B is carrying less burnout pressure.";
    takeawayTitle.textContent = "Student A is carrying the heavier burnout load.";
    takeawayText.textContent =
      `Student A's burnout load is ${difference}% higher than Student B's. This shows how sleep, stress, and support can combine into a heavier burnout pattern.`;
  } else {
    winnerText.textContent = "Both students are carrying about the same burnout pressure.";
    takeawayTitle.textContent = "Both students show a similar burnout load.";
    takeawayText.textContent =
      "Changing sleep, stress, and support can shift the outcome. This game shows that burnout is shaped by the full pattern, not one choice alone.";
  }
}

function updateWholeGame() {
  updateStudentCard("a");
  updateStudentCard("b");
  updateGameSummary();
}

document.querySelectorAll(".choice-row").forEach((row) => {
  const studentId = row.dataset.student;
  const choiceType = row.dataset.type;

  row.querySelectorAll(".choice-btn").forEach((button) => {
    button.addEventListener("click", () => {
      row.querySelectorAll(".choice-btn").forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      studentChoices[studentId][choiceType] = button.dataset.value;

      updateWholeGame();
    });
  });
});



updateWholeGame();