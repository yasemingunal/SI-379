
//const timeoutId = setTimeout(); //pass to clearTimeout(timeoutId) to clear

getUMEventsWithImages((events) => {
    console.log(events);
    const thumbDiv = document.querySelector("#thumbnails");
    const imgList = document.createElement("ul");
    for (obj in events){
        const imgLi = document.createElement('li');
        const img = document.createElement('img');
        img.src = obj['image_url'];
        imgLi.append(img);
        imgList.append(imgLi);   
    }
    console.log(imgList);
    
    // for (item in events){
    //     console.log(item)
    // }
});


// const eventsArray = getUMEventsWithImages(events);
// console.log(eventsArray);
// // function setSelectedIndex((i) => { 

// // });
