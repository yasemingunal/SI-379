
//const timeoutId = setTimeout(); //pass to clearTimeout(timeoutId) to clear
let timer = false;
let eventList = null;


getUMEventsWithImages((events) => {
    eventList = events;
    console.log(eventList);
    const thumbDiv = document.querySelector("#thumbnails");

    for (let i=0; i<eventList.length; i++){
        let currEvent = events[i];
        
        console.log('')
        let newImg = document.createElement("img");
        let eventDetails = document.create
        newImg.src = currEvent['image_url']
        thumbDiv.appendChild(newImg);

        //console.log(newImg.src);
    };

    clearTimeout(timer);
    timer = setTimeout(() => {
        setSelectedIndex()
    }, 10000);

});

function setSelectedIndex() { 
    for (let i = 0; i<eventList.length; i++){
        let selectedIdx = eventList[i];
        let selectedDate = document.querySelector('#selected-date')
        let selectedTitleEl = document.querySelector('#selected-title')
        let selectedDescrip = document.querySelector('#selected-description');
        selectedTitleEl.value = selectedIdx['event_title'];
        selectedTitleEl.src = selectedIdx['image_url'];
        //selectedDate.value = getReadableTimes(selectedIdx['datetime_start']);
        selectedDescrip.value = selectedIdx['description'];
        //console.log("look here: " + selectedTitle);
        //selectedIdx.classList.add('selected');

        // give selected img title #selected-title 's value

        //give img at selectedIdx classList.add('selected')
    };  
};


