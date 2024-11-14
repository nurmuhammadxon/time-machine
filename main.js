let soat = document.getElementById("soat")
let minut = document.getElementById("minut")
let sekund = document.getElementById("sekund")

let startBtn = document.getElementById("startBtn")
let stopBtn = document.getElementById("stopBtn")
let intervalBtn = document.getElementById("intervalBtn")
let resetBtn = document.getElementById("resetBtn")

let historyBox = document.getElementById('history-box__id')

let yurish = ''

startBtn.addEventListener("click", (e) => {
    startBtn.disabled = true;

    yurish = setInterval(() => {
        if (sekund.innerHTML < 59) {
            sekund.innerHTML = +sekund.innerHTML + 1;
        } else if (minut.innerHTML < 59) {
            sekund.innerHTML = 0
            minut.innerHTML = +minut.innerHTML + 1;
        } else {
            sekund.innerHTML = 0;
            minut.innerHTML = 0;
            soat.innerHTML = +soat.innerHTML + 1;
        }
    }, 1000);
});

stopBtn.addEventListener("click", (e) => {
    clearInterval(yurish);
    startBtn.disabled = false;
})

intervalBtn.addEventListener("click", (e) => {
    let history = document.createElement('p');
    history.setAttribute("class", "history-content");
    history.innerHTML = `${soat.innerHTML} : ${minut.innerHTML} : ${sekund.innerHTML}`;

    historyBox.append(history);
});

resetBtn.addEventListener("click", (e) => {
    clearInterval(yurish);
    startBtn.disabled = false;

    soat.innerHTML = 0;
    minut.innerHTML = 0;
    sekund.innerHTML = 0;

    historyBox.innerHTML = '';
});

