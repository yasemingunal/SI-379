
//const timeoutId = setTimeout(); //pass to clearTimeout(timeoutId) to clear
let timer = false;
const eventList = null;


getUMEventsWithImages((events) => {
    eventList = events;
    console.log(eventList);
    const thumbDiv = document.querySelector("#thumbnails");

    for (let i=0; i<eventList.length; i++){
        let currEvent = events[i];
        let newImg = document.createElement("img");
        newImg.src = currEvent['image_url']
        thumbDiv.appendChild(newImg);
        //console.log(newImg.src);
    };

    clearTimeout(timer);
    timer = setTimeout(() => {
        setSelectedIndex(i)
    });

});

function setSelectedIndex() { 
    for (let i = 0; i<eventList.length; i++){
        let selectedIdx = eventList[i];
        //give img at selectedIdx classList.add('selected')
    };  
};


