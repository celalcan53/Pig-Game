'use strict';

// Elementleri Seçmek
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let scores, currentScore, activePlayer, playing;

//Başlatma Fonksiyonu - Sayfa ilk kez yüklendiğinde ve New Game butonuna basıldığında kullanılır.
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player1El.classList.add("player--active");
    player1El.classList.remove("player--active");
}
init(); //Başlatma Fonksiyonun Kullanılması


//Aktif Oyuncuyu Değiştirmemizi Sağlayan Fonksiyon
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};

// Zar Atma Fonksiyonları
btnRoll.addEventListener("click", function () {
    if (playing) {
        // 1.Rastgele Zar Atma
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2.Zarı Görüntüleme
        diceEl.classList.remove("hidden");
        diceEl.src = `/images/dice-${dice}.png`;
        // 3.Atılan zarın 1 olup olmadığını kontrol etme; Eğer 1'se sıra diğer oyuncuya geçer.
        if (dice !== 1) {
            //Gelen sayıyı mevcut skora ekle;
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //Sıra diğer oyuncuya geçer;
            switchPlayer();
        }
    }
});

//Mevcut Skoru Tutma (Skora Ekleme) İşlemi

btnHold.addEventListener("click", function () {
    if (playing) {
        // 1.Mevcut skoru, aktif oyuncunun skoruna ekleme;
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2. Oyuncunun skorunun >=100 olma durumu;
        if (scores[activePlayer] >= 20) {
            // Oyunu Bitir
            playing = false;
            diceEl.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
        } else {
            // Diğer Oyuncuya Geç 
            switchPlayer();

        }
    }
})

//Tekrar oynamak - Yeni Oyun Butonu

btnNew.addEventListener("click", init);






