document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded");
// ganerate keyboad
    function keyboad(){
        for(let i=0; i<26; i++){
            let x = String.fromCharCode(65 + i)
            const button = document.createElement("button");
            button.innerText = x;
            document.querySelector("article#container").append(button);
        };
    };
    keyboad()

    //answers 
    const answers = ['SPINACH','APPLE','MUSHROOM','ZUCCHINI','TOFU','EXERCISE','DOG', 'HAPPINESS', 'CALIFORNIA', 'MONEY', 'DEVELOPER', 'EXPRESS'];
    // const answers = ['OKUSAN','DANNASAN','INU','NEKO','GOHAN'];
    // const answers = ['KOWAI','SCARY','REACT','DOWNTOWN','GOMEN'];
    // answer
    const word = answer(answers);
    //countting times for lose
    let lose = 0;
    
    // generate the answer 
    function answer(answers){
        let letters = answers[Math.floor(Math.random() * answers.length)];
        console.log("Answer: " + letters);
        for(letter of letters){
            //make answer boxs for the each letter
            const makeDiv = document.createElement("div")
            makeDiv.className = "answer"
            //put the answer letters to the box
            const makeH1 = document.createElement("h1")
            makeH1.classList.add("moji")
            makeH1.innerText = letter
            makeH1.setAttribute("name", letter.toUpperCase())
            //hide the answer
            makeH1.style.visibility = 'hidden'
            makeDiv.append(makeH1)
            document.querySelector("div.answerBox").append(makeDiv)
        }
        return letters
    };

    // check that the answer has the letter or not
    function check(letter,answer) {
        const upperLetter = letter.toUpperCase();
        const upperAnswer = answer.toUpperCase();
        if(upperAnswer.includes(upperLetter)) return true
        else return false
    };
    //if it's correct, letters become 'visible'
    function makeVisible(letter){
        document.querySelectorAll(`h1.moji`).forEach((h) =>{
            if(h.innerHTML == letter){
                h.style.visibility = 'visible';
            }
        });
    };

    // checks all answer elements on page and sees if any are empty. If so, return false
    function check_win() {
        const answers = document.querySelectorAll('h1.moji');
        for (answer of answers) {
            if(answer.style.visibility == 'hidden') 
                return false;
        }
        return true;
    };


    function checkAnswer(letter,answer){
        if(check(letter, answer)){
            makeVisible(letter);
            if(check_win()){
                setTimeout(function(){
                    alert('Congratulations!You won ;)');
                    location.reload();
                },0)
            }
        }
        else if(!check(letter, answer)){
            const pathArr = ["styles/hangman-assets/gallows+head.jpg",
            "styles/hangman-assets/gallows+head+torso.jpg",
            "styles/hangman-assets/gallows+head+torso+leg.jpg",
            "styles/hangman-assets/gallows+head+torso+2leg.jpg",
            "styles/hangman-assets/gallows+head+torso+2leg+arm.jpg",
            "styles/hangman-assets/gallows+head+torso+2leg+2arm.jpg"       
            ];                         
            const img = document.querySelector('img');
            img.src = pathArr[lose];
            if(lose >= 5){
                setTimeout(function(){
                    alert('Better luck next time.. :(')
                    location.reload();
                },50);
            }
            else {
                console.log("lose" + lose)
                lose += 1
            }
        };
    };

    //for clicking
    function hangman (answer) {
        document.querySelectorAll("button").forEach(word => {
            word.addEventListener('click', event => {
                const currentTarget = event.currentTarget
                currentTarget.classList.add('click');
                console.log(`currentTarget.innerText: ${currentTarget.innerText}`);
                checkAnswer(currentTarget.innerText,answer)
            });  
        });
    }
    
    hangman(word);

    //for pressing keyboad
    function pressKey (answer){
        document.addEventListener('keydown', event =>{
            const key = event.key.toUpperCase();
            document.querySelectorAll(`button`).forEach(b =>{
                if(b.innerText == key) b.classList.add('click')
            })
            checkAnswer(key,answer);   
        });
    };
    pressKey(word)
});
