
//const timeoutId = setTimeout(); //pass to clearTimeout(timeoutId) to clear

getUMEventsWithImages((events) => {
    const eventList = events;
    console.log(eventList);
    const thumbDiv = document.querySelector("#thumbnails");
    const imgList = document.createElement("ul");
    for (const idx = 0; idx < eventList.length; idx++){
        const imgLi = document.createElement('li');
        const img = document.createElement('img');
        img.src = eventList[idx].image_url;
        // img.src = currEv;
        imgLi.append(img);
        imgList.append(imgLi); 
    }
    console.log(imgList);
    
    // for (item in events){
    //     console.log(item)
    // }
});

// function setSelectedIndex((i) => {

// });
// const eventsArray = getUMEventsWithImages(events);
// console.log(eventsArray);
// // function setSelectedIndex((i) => { 

// // });
