let soat = document.getElementById("soat");
let minut = document.getElementById("minut");
let sekund = document.getElementById("sekund");

let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let intervalBtn = document.getElementById("intervalBtn");
let resetBtn = document.getElementById("resetBtn");

let historyBox = document.getElementById('history-box__id');

let yurish = '';
let data = JSON.parse(localStorage.getItem('data')) || [];

const updateLocalStorage = () => {
    let currentTime = {
        soat: soat.innerHTML,
        minut: minut.innerHTML,
        sekund: sekund.innerHTML
    };
    localStorage.setItem('currentTimer', JSON.stringify(currentTime));
};

const loadTimeFromLocalStorage = () => {
    let savedTime = JSON.parse(localStorage.getItem('currentTimer'));
    if (savedTime) {
        soat.innerHTML = savedTime.soat;
        minut.innerHTML = savedTime.minut;
        sekund.innerHTML = savedTime.sekund;
    }
};

const loadHistoryFromLocalStorage = () => {
    historyBox.innerHTML = '';
    data.forEach(element => {
        let history = document.createElement('p');
        history.setAttribute("class", "history-content");
        history.innerHTML = `${element.soat} : ${element.minut} : ${element.sekund}`;
        historyBox.append(history);
    });
};

loadTimeFromLocalStorage();
loadHistoryFromLocalStorage();

startBtn.addEventListener("click", (e) => {
    startBtn.disabled = true;

    yurish = setInterval(() => {
        if (+sekund.innerHTML < 59) {
            sekund.innerHTML = +sekund.innerHTML + 1;
        } else if (+minut.innerHTML < 59) {
            sekund.innerHTML = 0;
            minut.innerHTML = +minut.innerHTML + 1;
        } else {
            sekund.innerHTML = 0;
            minut.innerHTML = 0;
            soat.innerHTML = +soat.innerHTML + 1;
        }
        updateLocalStorage();
    }, 1000);
});

stopBtn.addEventListener("click", (e) => {
    clearInterval(yurish);
    startBtn.disabled = false;
});

intervalBtn.addEventListener("click", (e) => {
    let obj = {
        soat: soat.innerHTML,
        minut: minut.innerHTML,
        sekund: sekund.innerHTML
    };

    data.push(obj);
    localStorage.setItem('data', JSON.stringify(data));

    let history = document.createElement('p');
    history.setAttribute("class", "history-content");
    history.innerHTML = `${obj.soat} : ${obj.minut} : ${obj.sekund}`;
    historyBox.append(history);
});

resetBtn.addEventListener("click", (e) => {
    clearInterval(yurish);
    startBtn.disabled = false;

    soat.innerHTML = 0;
    minut.innerHTML = 0;
    sekund.innerHTML = 0;

    historyBox.innerHTML = '';
    data = [];
    localStorage.setItem('data', JSON.stringify(data));
    localStorage.removeItem('currentTimer');
});
