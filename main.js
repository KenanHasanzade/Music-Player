var audio = document.querySelector("#myAudio");
var img = document.querySelector("#coverimg");
var title = document.querySelector("#title");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause-img");
var nextButton = document.querySelector("#nextButton");
var prevButton = document.querySelector("#prev");
var randomButton = document.querySelector("#random");
var volumeInput = document.querySelector("#volume");
var muteButton = document.querySelector("#mute");
var beginningTime = document.querySelector("#beginningTime");
var endTime = document.querySelector("#endTime");
var progressBar = document.querySelector("#duration");

// Mahnilar
const songs = [
  {
    name: "Ash-Mosaique",
    path: "./musi/Ash-Mosaique.mp3",
    cover: "./images/image1.jpg",
  },
  {
    name: "Hippie_Sabotage_-_Devil_Eyes",
    path: "./musi/Hippie_Sabotage_-_Devil_Eyes.mp3",
    cover: "./images/image2.jpg",
  },
  {
    name: "Ash_-_Senses",
    path: "./musi/Ash_-_Senses.mp3",
    cover: "./images/image3.jpg",
  },
];

let songIndex = 0;

// Sehife acilanda  ilk musiqini index.html -e inner edir..
window.addEventListener("load", () => {
  musicSet(songs[songIndex]);
});

// Musiqini melumatlarini set edir
function musicSet(music) {
  audio.src = music.path;
  img.src = music.cover;
  title.innerText = music.name;
}

var firstInterval;
var secondInterval;
  var i = 0;
// Musiqini oxutmaq
const playMusic = function () {
  audio.play();
  document.querySelector("#play").style.display = "none";
  document.querySelector("#pause-img").style.display = "block";

 secondInterval = setInterval(() => {
  timeUpdate();
}, 1000);




  firstInterval = setInterval(() => {
    i++;
    img.style.transform = `rotate(${i}deg)`;
  }, 10);
};

// Musiqini pause etmek
const pauseMusic = function () {
  audio.pause();
  document.querySelector("#play").style.display = "block";
  document.querySelector("#pause-img").style.display = "none";
  clearInterval(firstInterval);
  clearInterval(secondInterval);
};

// Novbeti musiqiye kecmek
const nextMusic = function () {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }

  musicSet(songs[songIndex]);
  clearInterval(firstInterval);
  clearInterval(secondInterval);
  playMusic();
};

// Evvelki musiqiye kecmek
const prevMusic = function () {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }
  musicSet(songs[songIndex]);
  clearInterval(firstInterval);
  clearInterval(secondInterval);
  playMusic();
};

// Tesadufi musiqi secmek
const randomSelect = function () {
  var randomIndex = Math.round(Math.random() * (songs.length - 1));
  if (songIndex !== randomIndex) {
    songIndex = randomIndex;
    musicSet(songs[songIndex]);
    clearInterval(firstInterval);
    clearInterval(secondInterval);
    playMusic();
    
  } else {
    randomSelect();
   
  }
  

};

// Sesi artirib - azaltmaq
const volumeChange = function () {
  console.log(volumeInput.value);
  audio.volume = volumeInput.value / 100;
};

// Sessize alib-cixarmaq
const toggleMute = function () {
  audio.muted = !audio.muted;

  if (audio.muted) {
    muteButton.style.textDecoration = "line-through";
  } else {
    muteButton.style.textDecoration = "none";
  }
};



// Vaxti deyismek
const changeTime = function () {
  audio.currentTime = progressBar.value;
};


// Vaxti deyismek ucun elave funksiya
const timeUpdate = function () {

    if (!isNaN(audio.duration)) {
       
        // rangePosition = audio.currentTime * (100 / audio.duration);
        // progressBar.value = rangePosition;
        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(audio.currentTime / 60);
        let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
     
        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
     
        // Display the updated duration
        beginningTime.textContent = currentMinutes + ":" + currentSeconds;
        endTime.textContent = durationMinutes + ":" + durationSeconds;
        
      }

  if(endTime.textContent === beginningTime.textContent ){
    nextButton.click()
  }

  // Range inputun valuesini deyisirik.
  progressBar.min = 0;
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
};



// Eventler
playButton.addEventListener("click", playMusic);
pauseButton.addEventListener("click", pauseMusic);
nextButton.addEventListener("click", nextMusic);
prevButton.addEventListener("click", prevMusic);
randomButton.addEventListener("click", randomSelect);
volumeInput.addEventListener("change", volumeChange);
muteButton.addEventListener("click", toggleMute);
progressBar.addEventListener("change", changeTime);
