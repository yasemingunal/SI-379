
let timer = false;
let eventList = null;
let selectedIndex = 0;

getUMEventsWithImages((events) => {
    eventList = events;
    //console.log(eventList);
    const thumbDiv = document.querySelector("#thumbnails");
    for (let i=0; i<eventList.length; i++){
        let currEvent = events[i];
        let newImg = document.createElement("img");
        newImg.setAttribute("id", `thumb-${currEvent.id}`);
        newImg.src = currEvent.styled_images.event_thumb;
        thumbDiv.appendChild(newImg);

        newImg.addEventListener('click', () => { 
            setSelectedIndex(i);
        });
        

        //console.log(newImg.src);
    };
    setSelectedIndex(0);
    // clearTimeout(timer);
    // timer = setTimeout(() => {
    //     selectedIndex = (selectedIndex + 1) % events.length;
    //     setSelectedIndex(selectedIndex);
    // }, 10000);

});

function setSelectedIndex(i) { 
    let prevSelected = document.querySelector(".selected");
    if (prevSelected) { 
        prevSelected.classList.remove('selected');
    }

    const newSelect = document.querySelector(`#thumb-${eventList[i].id}`);
    if (newSelect){
        newSelect.classList.add('selected');
    }

    let selectedIdx = eventList[i]; 
    //let selectedEl = document.querySelector(`#thumb-${selectedIdx}`);
    let selectedDate = document.querySelector('#selected-date')
    let selectedImage = document.querySelector('#selected-image')
    let selectedTitleEl = document.querySelector('#selected-title')
    let selectedDescrip = document.querySelector('#selected-description');
    selectedTitleEl.textContent = selectedIdx.event_title;
    selectedTitleEl.href = selectedIdx.permalink
    selectedImage.src = selectedIdx.image_url;
    selectedDate.textContent = getReadableTime(selectedIdx['datetime_start']);
    selectedDescrip.textContent = selectedIdx['description'];

    clearTimeout(timer);
    timer = setTimeout(() => {
        setSelectedIndex((i+1)%eventList.length);
    }, 10000);

};


