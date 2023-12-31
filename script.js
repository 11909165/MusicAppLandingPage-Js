//initialize variable

let audioElement = new Audio('songs/1.mp3');
let songIndex=0;
let masterPlay= document.getElementById('masterPlay');
let myprogressBar= document.getElementById('myprogressBar');
let gif= document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: 'Wariyo - Mortals', filePath:'songs/1.mp3', coverPath:'covers/1.jpg'},
    {songName: 'Cielo - Huma Huma', filePath:'songs/2.mp3', coverPath:'covers/2.jpg'},
    {songName: 'Deaf - Kev', filePath:'songs/3.mp3', coverPath:'covers/3.jpg'},
    {songName: 'My Heart [NCS Release]-320k', filePath:'songs/4.mp3', coverPath:'covers/4.jpg'},
    {songName: 'Janji - Heroes - Tonight', filePath:'songs/5.mp3', coverPath:'covers/5.jpg'},
    {songName: 'Perfect - Ed Shreen', filePath:'songs/1.mp3', coverPath:'covers/6.jpg'},
    {songName: 'Love Story - Taylor Swift', filePath:'songs/2.mp3', coverPath:'covers/7.jpg'},
    {songName: 'Empty Room - Jamie Miller', filePath:'songs/3.mp3', coverPath:'covers/9.jpg'},
]

songItem.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})



// media play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity =1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity =0;
    }
})

audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressBar.value = progress;
})

myprogressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myprogressBar.value * audioElement.duration/100;
})

const makeAllPlay =()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText= songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity =1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >=  7){
        songIndex = 0;
    }
    else{
        songIndex = songIndex+ 1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText= songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex = songIndex- 1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText= songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})