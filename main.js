console.log("Welcome to the Community Portal");

window.onload = function(){
    alert("Page fully loaded");
};

function Event(name, date, category, seats, status){
    this.name = name;
    this.date = date;
    this.category = category;
    this.seats = seats;
    this.status = status;
}

Event.prototype.checkAvailability = function(){
    return this.seats > 0;
};

const events = [];

function addEvent(name, date, category, seats, status="upcoming"){
    events.push(new Event(name, date, category, seats, status));
}

addEvent("Music Fest", "10 June 2026", "Music", 5);
addEvent("Cooking Workshop", "15 June 2026", "Workshop", 3);
addEvent("Football Match", "20 June 2026", "Sports", 0);

const displayNames = events.map(event => `Event: ${event.name}`);
console.log(displayNames);

const musicEvents = events.filter(event => event.category === "Music");
console.log(musicEvents);

const copiedEvents = [...events];
console.log(copiedEvents);

events.forEach(event => {
    console.log(Object.entries(event));
});

function registrationTracker(){
    let count = 0;

    return function(){
        count++;
        return count;
    };
}

const trackRegistration = registrationTracker();

const container = document.querySelector("#eventsContainer");
const selectedEvent = document.querySelector("#selectedEvent");

function renderEvents(eventList){

    container.innerHTML = "";
    selectedEvent.innerHTML = "";

    eventList.forEach((event,index)=>{

        if(event.status !== "upcoming"){
            return;
        }

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p>Date: ${event.date}</p>
            <p>Category: ${event.category}</p>
            <p>Seats Available: ${event.seats}</p>
            <button onclick="registerUser(${index})">Register</button>
        `;

        container.appendChild(card);

        const option = document.createElement("option");
        option.value = event.name;
        option.textContent = event.name;
        selectedEvent.appendChild(option);
    });
}

renderEvents(events);

function registerUser(index){

    try{

        if(events[index].seats <= 0){
            throw "No seats available";
        }

        events[index].seats--;

        console.log("Registration Count:", trackRegistration());

        alert("Registered Successfully for " + events[index].name);

        renderEvents(events);
    }

    catch(error){
        console.log("Error:", error);
        alert(error);
    }
}

function filterEventsByCategory(category, callback){

    let filtered;

    if(category === "All"){
        filtered = events;
    }
    else{
        filtered = events.filter(event => event.category === category);
    }

    callback(filtered);
}

document.getElementById("categoryFilter")
.addEventListener("change", function(){

    filterEventsByCategory(this.value, function(result){
        renderEvents(result);
    });
});

document.getElementById("searchBox")
.addEventListener("keydown", function(){

    const value = this.value.toLowerCase();

    const filtered = events.filter(event =>
        event.name.toLowerCase().includes(value)
    );

    renderEvents(filtered);
});

const form = document.getElementById("regForm");

form.addEventListener("submit", function(event){

    event.preventDefault();

    console.log("Form submission started");

    debugger;

    const username = form.elements["username"].value;
    const email = form.elements["email"].value;
    const selected = form.elements["selectedEvent"].value;

    if(username === "" || email === ""){
        document.getElementById("error").innerHTML =
        "All fields are required";

        return;
    }

    document.getElementById("error").innerHTML = "";

    const userData = {
        name: username,
        email: email,
        event: selected
    };

    console.log("Fetch Payload:", userData);

    setTimeout(()=>{

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success", data);
            alert("Registration Submitted Successfully");
        })
        .catch(error => {
            console.log("Failure", error);
        });

    },2000);
});

async function fetchEvents(){

    document.getElementById("loading").style.display = "block";

    try{

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

        const data = await response.json();

        console.log("Fetched Events", data.slice(0,3));
    }

    catch(error){
        console.log(error);
    }

    finally{
        document.getElementById("loading").style.display = "none";
    }
}

fetchEvents();

const eventInfo = {
    eventName:"Music Fest",
    eventDate:"10 June 2026",
    category:"Music"
};

const {eventName, eventDate, category} = eventInfo;

console.log(eventName);
console.log(eventDate);
console.log(category);

function showMessage(message="Welcome User"){
    console.log(message);
}

showMessage();

$("#registerBtn").click(function(){

    $(".card").fadeOut(1000);

    $(".card").fadeIn(1000);
});

console.log(
"React and Vue provide component-based architecture for reusable UI."
);