const boxes = document.querySelectorAll(".box")
const msgContainer = document.querySelector(".msgContainer")
const newGame = document.querySelector(".newGame")
const reset = document.querySelector(".reset")
const msg = document.querySelector(".msg")
let turnX = true
let count = 0

let winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 4, 2],
    [6, 7, 8]];

const resetGame = () => {
    turnX = true
    count = 0
    msgContainer.classList.add("hide")
    enableBox()
}

const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true
    }
}
const enableBox = () => {
    for (let box of boxes) {
        box.disabled = false
        box.innerText = ""
    }
}

const gameDraw = () => {
    msg.innerText = `Game draw`
    msgContainer.classList.remove("hide")
    disableBox()
}
const showWinner = (winner) => {
    msg.innerText = `Congratulation you win the game ${winner}`
    msgContainer.classList.remove("hide")
    disableBox()
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "x";
            box.style.color = "#F64740";
            turnX = false;
        } else {
            box.innerText = "o";
            box.style.color = "#c4d3b0";
            turnX = true;
        }
        box.disabled = true
        count++

        let isWinner = checkWinner()
        if (count === 9 && !isWinner) {
            gameDraw()
        }
    })
})

const checkWinner = () => {
    for (let pattern of winpattern) {
        let check1val = boxes[pattern[0]].innerText
        let check2val = boxes[pattern[1]].innerText
        let check3val = boxes[pattern[2]].innerText

        if (check1val != "" && check2val != "" && check3val != "") {
            if (check1val === check2val && check2val === check3val) {
                showWinner(check1val)
                return check1val
            }
        }
    }
}

reset.addEventListener("click", resetGame)
newGame.addEventListener("click", resetGame)