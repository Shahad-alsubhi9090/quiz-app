let questions = [];
function Question(text, options, trueOption) {
  this.text = text;
  this.options = options;
  this.trueOption = trueOption;
  userOption = null;
}



let currentIndex = 0;
let container = document.querySelector(".container");

let q1 = new Question(
  "What is the result of 12 + 8?",
  ["16", "20", "24"],
  "20"
);
let q2 = new Question("Subtract 5 from 15.", ["10", "5", "15"], "10");
let q3 = new Question(
  "What is the product of 6 and 7?",
  ["36", "42", "48"],
  "42"
);
questions.push(q1);
questions.push(q2);
questions.push(q3);

let startButton = document.querySelector(".start");
startButton.onclick = () => {
 
      let questionsContainer = document.createElement("div");
      questionsContainer.className = "questionsContainer";
      questionsContainer.innerHTML = ` <div class="arrows"> 
  <div class="backward">
          <i class="fa-solid fa-arrow-left back"></i>

        <i class="fa-solid fa-angles-left firstQ"></i>
    </div>
    <div class="forward">
        <i class="fa-solid fa-angles-right lastQ"></i>
        <i class="fa-solid fa-arrow-right next"></i>
    </div>
   
</div> 
<div class=q-div>
<h3 class="Qnum"></h3>
   <p class="QText"></p>
  
   <ul class="options">
    <li class="option"></li>
    <li class="option"></li>
    <li class="option"></li>
    

   </ul>
   </div>
   <br>
<button type="submit" class="submit">submit</button>
   
   `;
      startButton.remove();
      document.querySelector(".Definition").remove();
      container.append(questionsContainer);

      displayQuestion();

      function displayQuestion() {
        document.querySelector(".Qnum").textContent = `Q${currentIndex + 1}.`;
        document.querySelector(".QText").textContent =
          questions[currentIndex].text;

        let optionsTag = document.querySelectorAll(".option");
        let i = 0;

        optionsTag.forEach((tag) => {
          questions[currentIndex].userOption ==
          questions[currentIndex].options[i]
            ? (tag.innerHTML = `<i class="fa-solid fa-circle" ><span>${
                "\t" + questions[currentIndex].options[i]
              }</span></i>`)
            : (tag.innerHTML = `<i class="fa-regular fa-circle" ><span>${
                "\t" + questions[currentIndex].options[i]
              }</span></i>`);
          i++;
        });

        let checkIcon = document.querySelectorAll(".fa-regular.fa-circle");
        checkIcon.forEach((choose) => {
          choose.onclick = () => {
            questions[currentIndex].userOption = choose.textContent.trim();
            deselect();
            choose.classList.add("fa-solid");
            choose.classList.remove("fa-regular");
          };
        });
        let submitButton = document.querySelector(".submit");

        currentIndex != questions.length - 1
          ? (submitButton.style.visibility = "hidden")
          : (submitButton.style.visibility = "visible");
      }

      let nextarr = document.querySelector(".next");
      function nextQ() {
        if (currentIndex != questions.length - 1) {
          currentIndex = currentIndex + 1;
          displayQuestion();
        }
      }

      let backarr = document.querySelector(".back");

      function backQ() {
        if (currentIndex != 0) {
          currentIndex = currentIndex - 1;
          displayQuestion();
        }
      }

      let lastQ = document.querySelector(".lastQ");
      function lastest() {
        currentIndex = questions.length - 1;
        displayQuestion();
      }

      let firstQ = document.querySelector(".firstQ");
      function firstQustion() {
        currentIndex = 0;
        displayQuestion();
      }

      firstQ.addEventListener("click", firstQustion);
      lastQ.addEventListener("click", lastest);
      backarr.addEventListener("click", backQ);
      nextarr.addEventListener("click", nextQ);

      function deselect() {
        console.log("deselect");
        let checkIcon = document.querySelectorAll(".fa-circle");

        checkIcon.forEach((choose) => {
          choose.classList.remove("fa-solid");
          choose.classList.add("fa-regular");
        });
      }

      let submitbutton = document.querySelector(".submit");
      submitbutton.onclick = () => {
        let i = 0;
        let questionsContainer = document.querySelector(".questionsContainer");
        console.log(questionsContainer);
        questionsContainer.remove();

        let scorediv = document.createElement("div");
        scorediv.className = "scorediv";
        scorediv.innerHTML = `<h3 class=""></h2>`;

        questions.forEach((opj, index) => {
          console.log(opj.userOption == opj.trueOption);

          if (opj.userOption == opj.trueOption) {
            i = i + 1;
          }
          let answerDiv = document.createElement("div");
          answerDiv.className = "answerDiv";
          console.log(i);
          let q = document.createTextNode(`Q${index + 1}. ${opj.text} `);

          answerDiv.append(q);

          answerDiv.innerHTML += ` <h5><i class="fa-regular fa-circle-check" style="color: #c4eb9b;"></i>  ${opj.trueOption}</h5>
`;
          if (opj.userOption != opj.trueOption)
            answerDiv.innerHTML += `<i class="fa-regular fa-circle-xmark" style="color: #db5151;"></i> ${
              opj.userOption || "No answer selected"
            }`;

          scorediv.append(answerDiv);
        });
        let scoreContainer = document.createElement("div");
        scoreContainer.className = "scoreContainer";
        scoreContainer.innerHTML = ` <div class="score"><h4> ${i} / ${questions.length}</h4> </div>Your Score`;
        let restartButton = document.createElement("button");
        restartButton.className = "restart";
        restartButton.innerHTML = `<i class="fa-solid fa-rotate-right" ></i>`;
        restartButton.onclick = () => {
          location.reload();
        };
        scorediv.prepend(scoreContainer);
        container.append(scorediv);
        container.append(restartButton);
      };
    
};
