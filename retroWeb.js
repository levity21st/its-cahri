const onClick = new Audio("musicAudio/click.mp3")
const onClose = new Audio("musicAudio/meow.mp3")

const dialogAll = document.querySelectorAll(".dialog")

let dragCondition = false;
let selectedDialog = null;
let offsetX = 0
let offsetY = 0

dialogAll.forEach((self) => {
    self.addEventListener ("mousedown", (event) => {
        dragCondition = true
        selectedDialog = self
        offsetX = event.clientX - self.offsetLeft
        offsetY = event.clientY - self.offsetTop
    })
})

document.addEventListener ("mousemove", (event) => {
    if(dragCondition && selectedDialog){
        selectedDialog.style.left = `${event.clientX - offsetX}px`
        selectedDialog.style.top = `${event.clientY - offsetY}px`
    }
})

document.addEventListener ("mouseup", (event) => {
    dragCondition = false
    selectedDialog = null;
})

let stackPriority = 1;
dialogAll.forEach((self) => {
    self.addEventListener("mousedown", function(){
        stackPriority++;
        self.style.zIndex = stackPriority;
    })
}) 

const iconAll = document.querySelectorAll("[data-dialog-pair]")
iconAll.forEach((self) => {
    const dialogId = self.dataset.dialogPair;
    const dialogBox = document.getElementById(dialogId);
    self.addEventListener("click", function() {
        if (dialogBox) {
            stackPriority++;
            dialogBox.style.display = 'flex';
            dialogBox.style.zIndex = stackPriority;
            onClick.play()
        }
    })
})

const dialogClose = document.querySelectorAll(".dialog-close")
dialogClose.forEach((self) => {
    self.addEventListener("click", function() {
        const dialogBox = this.closest(".dialog")
        dialogBox.style.display = 'none';
        onClose.play()
    })
})

const bookAll = document.querySelectorAll(".readingListButtons")
bookAll.forEach((self) => {
    const bookId = self.dataset.bookPair;
    const bookDialog = document.getElementById(bookId);
    self.addEventListener("click", function() {
        onClick.play()
        stackPriority++;
        bookDialog.style.display = 'flex';
        bookDialog.style.zIndex = stackPriority;
    })
})

const songList = [
    {
        title: "The Cardigans - Choke",
        cover: "musicImages/FirstBandOnTheMoon.jpg",
        audio: "musicAudio/Choke.webm"
    },
    {
        title: "TV Girl - The Blonde",
        cover: "musicImages/FrenchExit.png",
        audio: "musicAudio/The Blonde.webm"
    },
    {
        title: "Arlo Parks - Portra 400",
        cover: "musicImages/Portra400.png",
        audio: "musicAudio/Portra 400.webm"
    },
    {
        title: "Hippo Campus - Bambi",
        cover: "musicImages/bambi.jpg",
        audio: "musicAudio/Bambi.webm"
    },
    {
        title: "SWMRS - Lose It",
        cover: "musicImages/LoseIt.jpg",
        audio: "musicAudio/Lose It.webm"
    },
    {
        title: "Jungle - Casio",
        cover: "musicImages/Casio.jpg",
        audio: "musicAudio/Casio.webm"
    },
    {
        title: "Metric - Black Sheep",
        cover: "musicImages/BlackSheep.png",
        audio: "musicAudio/Black Sheep.webm"
    },
    {
        title: "Jack Stauber - Coffee",
        cover: "musicImages/Coffee.png",
        audio: "musicAudio/Coffee.webm"
    },
    {
        title: "The Cardigans - Heartbreaker",
        cover: "musicImages/FirstBandOnTheMoon.jpg",
        audio: "musicAudio/Heartbreaker.webm"
    },
    {
        title: "Lilypichu - waiting for a sign",
        cover: "musicImages/waitingforasign.jpg",
        audio: "musicAudio/waiting for a sign.webm"
    },
    {
        title: "Arctic Monkeys - Secret Door",
        cover: "musicImages/secretdoor.jpg",
        audio: "musicAudio/Secret Door.webm"
    }
];

const songAudio = document.createElement("audio");
const songTitle = document.getElementById("musicPlayerTitle");
const songCover = document.getElementById("musicPlayerCover");
songAudio.volume = 0.6;

function changeSong() {
    const currentSong = songList[songNumber];
    songAudio.src = currentSong.audio;
    songTitle.textContent = currentSong.title;
    songCover.src = currentSong.cover;
}

let isPaused = true;
const play = document.getElementById("musicPlayerPlay")
play.addEventListener("click", function() {
    onClick.play()
    if (isPaused) {
        songAudio.play();
        isPaused = false;
    }
    else{
        songAudio.pause()
        isPaused = true;
    }
})

let songNumber = 0;

const next = document.getElementById("musicPlayerNext")
next.addEventListener("click", function() {
    if(songNumber == songList.length - 1) {
        songNumber = 0;
    }
    else{
        songNumber++;
    }
    changeSong();
    songAudio.play();
    onClick.play();
    isPaused = false;
})

const previous = document.getElementById("musicPlayerPrevious")
previous.addEventListener("click", function() {
    if(songNumber == 0) {
        songNumber = songList.length - 1;
    }
    else{
        songNumber--;
    }
    changeSong();
    songAudio.play();
    onClick.play()
    isPaused = false;
})

changeSong();

