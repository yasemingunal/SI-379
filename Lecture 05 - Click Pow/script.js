// Write your code here

const zzzimage = document.querySelector('.clickable');
zzzimage.addEventListener('click', function(){
    console.log('clicked');
    zzzimage.src='pow.png';
    zzzimage.classList.add('clicked');
    setInterval(() => {
        zzzimage.classList.remove('clicked')}, 1000);
    })