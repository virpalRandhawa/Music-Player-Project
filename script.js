// we need a target audio element this element has no id
const img = document.querySelector('img');
const tittle = document.getElementById('tittle');
const artist = document.getElementById('artist')
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music stp 3
const songs = [
    {
        name: 'navjot-1',
        displayName: 'jutti jatti di',
        artist: 'Navjot ',
    },
    {
        name: 'navjot-2',
        displayName: 'gal mukdi pai a',
        artist: 'Navjot ',
    },
    {
        name: 'navjot-3',
        displayName: 'kush bolo na',
        artist: 'Navjot ',
    },
    {
        name: 'navjot-4',
        displayName: 'lakk barbie da',
        artist: 'Navjot ',
    },
];


// check if playing stp 1
let isPlaying = false;

// play stp 1
function playSong() {
    isPlaying = true;
    // stp 2 if we want play first target bullen btn
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

// pause stp 1
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

// play or pause Event List stp 1
playBtn.addEventListener('click', ()=> (isPlaying ? pauseSong() : playSong()));

// stp 3 Update DOM
function loadSong(song) {
    
    tittle.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    img.src = `img/${song.name}.jpg`;
}

// current song stp 4
let songIndex = 0;

// prev song
function prevSong() {
    songIndex--;
    // stp 5 solve problem prev & next 
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// next song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length -1) {
        songIndex = 0;
    }
    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// Onload select first song from array
loadSong(songs[songIndex]);

// stp 6 UpdateProgressBar & time
function updateProgressBar(e) {
    if(isPlaying) {
       const {duration, currentTime} = e.srcElement;
    
    //    update the p[rogress bar width]
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
   
    // Delay switching duration Element to avoid NaN
     if(durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
     }
    //  calculate display for current
     const currentMinutes = Math.floor(currentTime / 60);
   
     let currentSeconds = Math.floor(currentTime % 60);
     if(currentSeconds < 10) {
         currentSeconds = `0${currentSeconds}`;
     }
 
     currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    }
}
// stp 7 setProgressBar
function setProgressBar(e) {
    const width = this.clientWidth;
   
    const clickX = e.offsetX;
    const {duration} = music;
   
    music.currentTime = (clickX / width) * duration; 
}

// event listner stp4
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended',nextSong );



