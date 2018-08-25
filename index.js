let Next = document.getElementById("next");
let Prev = document.getElementById("prev");
let h1 = document.getElementById("num");

let rock = document.getElementById("Rock");
let hiphop = document.getElementById("Hip Hop");
let country = document.getElementById("Country");

let object;
rock.addEventListener('click', function(){
    buttonClicked('rock');
}, false);
hiphop.addEventListener('click', function(){
    buttonClicked('hip_hop');
}, false);
country.addEventListener('click', function(){
    buttonClicked('country');
}, false);

function  buttonClicked(val){
    window.location.replace("./?pageNum=1&searchTerm=" + val);


}
let navButtons = document.getElementById("nav");
let pageNum;
let APIKey = "AIzaSyC6YNBp5YTz9_VxpwWk3bfhpIaISC05Yq4";
let googleURL = "https://www.googleapis.com/youtube/v3/search";
var embedDiv1 = '<div class="player"><h1>';
var embedDiv2 = '<h2>';
let embedHTML1 = '<iframe class = "videoFrame" width="640" height="400" src="https://www.youtube.com/embed/';
let embedHTML2 = '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

function pageLoad() {
    object = getURLParam(window.location.href);
    console.log(object.searchTerm);
    pageNum = object.pageNum;
    h1.innerHTML = object.pageNum;
    loadVids();
}
window.onload = pageLoad;

function nextPage (){
    console.log(pageNum);
    if (pageNum < 10){
        console.log('here');
        pageNum++;
        window.location.replace("./?pageNum=" + pageNum + '&searchTerm=' + object.searchTerm );
    }
}
function prevPage (){
    console.log(pageNum);
    if (pageNum > 1){
        pageNum--;
        window.location.replace("./?pageNum=" + pageNum);
    }

}
let params = {
    part: 'snippet',
    key: APIKey,
    maxResults: 10,
    order: "rating",
    topicId:"/m/04rlf"
}


function loadVids(val) {
    console.log('fired');
    let search = object.searchTerm;
        params.q = search;

        $.getJSON(googleURL, params, function (data) {
            let n = 10;
            console.log(data.items);
            data.items = shuffle(data.items);
            console.log(data);
            let index = pageNum - 1;
            console.log(embedHTML1 + data.items[index].id.videoId + embedHTML2);
            $("#video").append(embedHTML1 + data.items[index].id.videoId + embedHTML2);
        });
}
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function submitSearch () {
    console.log("submit search");

    var input = $('#searchForm').val();

     buttonClicked(input);
}

// event listener
$("#searchbutton").click(submitSearch);



function getURLParam(url){
    let object = {};
    let id = url.substring(url.lastIndexOf('/') + 1);
    if (url.includes('?')){
        let arr = id.split('?');
        let arr1 = arr[1].split('&');
        for (let i = 0; i < arr1.length; i++){
            let arr2 = arr1[i].split("=");
            let char;
            if (arr2[1].includes('%20')){
                let newArr = arr2[1].split('%20');
                char = newArr.join(' ');
                object[arr2[0]] = char;
            }
            else{
                object[arr2[0]] = arr2[1];
            }
            
        }
        
        return object;
    }
    else{
        return {'pageNum':1, 'searchTerm':'music'};
    }

}

Next.addEventListener('click', nextPage);
Prev.addEventListener('click', prevPage);



