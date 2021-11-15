
const music = document.querySelector("audio");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const img = document.querySelector("img");

let total_duration = document.getElementById("duration");
var current_time = document.getElementById("current-time");

let progress = document.getElementById("progress");
let isPlay = false; 

const progress_div = document.getElementById("progress-div");

// creating the array of objects of all the songs
const songs = [
    {
        name: "NF- search",
        title: "The Search",
        artist: "NF",
    },

    {
        name: "Arizona Zervas - ROXANNE",
        title: "Roxanne",
        artist: "Arizona Zervas",
    },

    {
        name: "The Kid LAROI, Justin Bieber - STAY",
        title: "STAY",
        artist: " Justin Bieber",
    },

    {
        name: "The Weeknd - The Hills",
        title: "The Hills",
        artist: "The Weeknd",
    },

    {
        name: "Trevor Daniel - Falling",
        title: "Falling",
        artist: "Trevor Daniel",
    },

    {
        name: "Xxxtentacion - Numb",
        title: "Numb",
        artist: "Xxxtentacion",
    },
];



//  for playing the song 
const playMusic =  () => {
    isPlay = true;
    music.play();
    
    // for changing the play button to pause 
    play.classList.replace('fa-play', "fa-pause");
    
};


//  for pausing the song
const pauseMusic =  () => {
    isPlay = false;
    music.pause();
    
    play.classList.replace('fa-pause', "fa-play");
    
};


// for adding the pause or play according the user is using
play.addEventListener('click', () => {
    
    isPlay ? pauseMusic() : playMusic();
});


// for changing the songs

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "songs/" + songs.name + ".mp3";
    img.src = "images/" + songs.name + ".png";
};

songIndex = 0;

const nextSong = () => {
    // to make the songs run on loop 
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    music.play();
    
}

const prevSong = () => {
    // to make the songs run on loop 
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    music.play();
    
}

// progress bar 

music.addEventListener('timeupdate', (event) => {

    // adding the status of the progress bar 
    const {currentTime, duration} = event.srcElement;
    // console.log(currentTime);
    // console.log(duration);

    let progressTime = (currentTime/duration) * 100;
    progress.style.width = `${progressTime}%`;

    // updation of duration of song

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let tot_duration = `${min_duration}:${sec_duration}`;
    
    //  to remove the nan appearing while changing the form 
    if(duration) {
        total_duration.textContent = `${tot_duration}`;
    }

    // // current duration update
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    //  for making the time as 0:00
    if(sec_currentTime < 10){
        sec_currentTime = `0${sec_currentTime}`;
    }

    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    
    current_time.textContent = `${tot_currentTime}`;

    // console.log(currentTime);

});

//  progress onclick functionality 

progress_div.addEventListener("click", (event) => {
    const { duration } = music;
    
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;

    console.log(duration);
    console.log(move_progress);
    music.currentTime = move_progress;
})



music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);



