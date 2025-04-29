function openModal() {
    let modal = document.getElementById("searchmodal");
    modal.style.display = "block";

    window.addEventListener("click", clickOutside);
}

function closeModal() {
    let modal = document.getElementById("searchmodal");
    modal.style.display = "none";

    window.removeEventListener("click", clickOutside);
}

function clickOutside(event) {
    let modal = document.getElementById("searchmodal");
    if (event.target === modal) {
        closeModal();
    }
}

const urlParams = new URLSearchParams(window.location.search);
const listingid = urlParams.get("id");

console.log("Loaded Listing ID:", listingid);

listingData = {}

function fetchData() {
    fetch("https://api.npoint.io/eb3c116538e7dcbfc7bf/listings")
    .then(response => response.json())
    .then(data => {
    listingData = data;
    //const listingArray = Object.values(listingData);
    //const listing = listingArray[listingid];
    const listing = data[listingid];
    console.log(listing);

    if (!listing) {
        console.error("Not found: ", listingid);
        return;
    }

    renderPage(listing);
});
};

function renderPage(list) {

    let container = document.getElementById("detailsbody");
            container.innerHTML =
    `<div>
        <div class="topofdetails">
            <p class="bigheader">${list.title}</p>
        </div>
        <div class="detailsheader">
            <div class="detailsleftheader">
                <img class="mainphoto" src="${list.media.images[0]}" alt="Apartment photo">
            </div>
            <div class="detailsrightheader">
                <div class="detailstopright">
                    <p class="smallheader">Seller:</p>
                    <p class="smallheader">${list.provider.replace(/_/g, " ")}</p>
                    <p class="smallheader">Contact Information: </p>
                    <a class="miniheader" href="https://sammen.no/no/hjelp-og-dialog">Contact here</a>
                    <p class="miniheader">Mail: example@gmail.com</p>
                </div>
                <div class="detailsbottomright">
                    <a href="#" onclick="openCompSelector()" data-bs-toggle="modal" data-bs-target="#compareModal" class="button secondary">Compare Housing</a>
                    <a href="" target="_self" class="button primary">Apply for Housing</a>
                </div>
            </div>
        </div>
        <div class="housingconditions">
            <p class="smallheader">
                Housing conditions
            </p>
            <p class="miniheader">Apartment size: </p>
            <p class="text">${list.housingConditions.sizeSqm} square meters.</p>
            <p class="miniheader">Location info: <i>(based on previous inhabitants comments and ratings of this apartment.)</i></p>
            <img id="locationdiagram" src="images/Location diagram.png" alt="Location diagram">
            <p class="text">
                This apartment is located at ${list.address.city}. It features a bed, kitchen and bathroom. There is an activity room 
                for everyone. The tram is just a few minutes away. There are also busses not too far away. Very silent neighborhood 
                usually.
            </p>
            <div id="private">
                <img class="icon" src="images/material-symbols_personorange.png" alt="Personal facilities">
                <p class="text">None</p>
            </div>
            <div id="shared">
                <img class="icon" src="images/ic_baseline-people.png" alt="Shared facilities">
                <p class="text">Activity room</p>
                <p class="text">Car park</p>
            </div>
            <p class="miniheader">Additional info: </p>
            <img class="icon" id="nosmoking" src="images/tabler_smoking-no.png" alt="No smoking">
            <img class="icon" src="images/guidance_no-access-for-service-animal-3.png" alt="No dogs allowed">
        </div>
        <div class="socialenvironment">
            <p class="smallheader">Social environment: </p>
            <p class="miniheader">Demographic data: </p>
            <div class="demographiccontent">
                <div id="neighborchart">
                    <img class="graphic" src="images/Frame 27.png" alt="Neighbor age groups chart">
                </div>
                <div id="neighborchartgroup">
                    <img class="graphic" src="images/Right side chart.png" alt="Neighbor age groups">
                </div>
                <div id="neighborstfieldchart">
                    <img class="graphic" src="images/Frame 26.png" alt="Neighbor study field chart">
                </div>
                <div id="neighborstfieldgroup">
                    <img class="graphic" src="images/Right side chart2.png" alt="Neighbor study field groups">
                </div>
                <div id="neighborstyrschart">
                    <img src="images/neistuyrs.png" alt="Neigbor study years chart">
                </div>
                <div id="neighborstyrsgroup">
                    <img src="images/neistuyrsgrp.png" alt="Neighbor study years groups">
                </div>
                <div id="neighborintchart">
                    <img src="images/neiint.png" alt="Neigbor interest chart">
                </div>
                <div id="neighborintgroup">
                    <img src="images/neiintgrp.png" alt="Neighbor interest groups">
                </div>
            </div>
        </div>
        <div id="comments">
            <div id="commentsheader">
                <p id="comhead" class="smallheader">Comments</p>
            <p id="two" class="head">${list.reviews.length}</p>
            </div>
        </div>
    </div>`
    
    let commentsHTML = "";
    list.reviews.forEach((review, idx) => {
    commentsHTML += `
    <div class="commentsection">
        <p class="miniheader">Anonymous${idx + 1}</p>
        <p class="text">${review.comment}</p>
        <img class="icon star" src="images/Frame 11.png" alt="Star Rating">
        <img class="icon star" src="images/Frame 11.png" alt="Star Rating">
    </div>`;
    });
    document.getElementById("comments").innerHTML += commentsHTML;

    renderPrivate(list.housingConditions.privateKitchen, list.housingConditions.privateBathroom);

    renderShared(list.housingConditions.infrastructure);
};

//Find the infrastructure parts of the apartment.
function renderShared(infrastructure) {

    let sharedHTML = `<img class="icon" src="images/ic_baseline-people.png" alt="Shared facilities">
                    <ul style="list-style: none; padding-left: 0px">
                    `
    
    infrastructure.forEach(item => {
        let uppercase = item.charAt(0).toUpperCase() + item.slice(1);
        formatitem = uppercase.replace(/_/g, " ");
        sharedHTML +=   `<li class="text">${formatitem}</li>`;
    });

    sharedHTML += `</ul>`;

    document.getElementById("shared").innerHTML = sharedHTML;
};

window.onload = fetchData;

function renderPrivate(kitchen, bathroom) {

    if (!kitchen && !bathroom) return;

    let privateHTML = `<img class="icon" src="images/material-symbols_personorange.png" alt="Personal facilities">
                    <ul style="list-style: none; padding-left: 0px">
    `
    if (kitchen) {
        privateHTML += `<li class="text">Private Kitchen</li>`;
    }
    if (bathroom) {
        privateHTML += `<li class="text">Private Bathroom</li>`;
    }

    privateHTML += `</ul>`;

    document.getElementById("private").innerHTML = privateHTML;
}

function openCompSelector() {
    fetch("https://api.npoint.io/eb3c116538e7dcbfc7bf/listings")
    .then(response => response.json())
    .then(data => {
        const currentid = new URLSearchParams(window.location.search).get("id");
        const listings = Object.entries(data);
        const container = document.getElementById("listingcontainer");
        container.innerHTML = "";
        console.log(currentid);
        console.log(listings);

        listings.forEach(([id, listing]) => {
            if (id !== currentid) {
                const div = document.createElement("div");
                div.classList.add("p-2", "border", "rounder", "mb-2", "listing-option");
                div.style.cursor = "pointer";
                div.innerHTML = `<strong>${listing.title}</strong><br>
                                ${listing.address.city}<br>
                                ${listing.pricePerMonth} NOK`;
                div.onclick = () => {
                    window.location.href = `comparison.html?id1=${currentid}&id2=${id}`;
                };
                container.appendChild(div);
            }
        });
    })
}

function uibFacebook() {
    window.open('https://www.facebook.com/unibergen/?locale=nb_NO','_blank')
}

function uibSnap() {
    window.open('https://www.snapchat.com/add/uib_student','_blank')
}

function uibInstagram() {
    window.open('https://www.instagram.com/unibergen/?hl=en','_blank')
}

function uibYoutube() {
    window.open('https://www.youtube.com/@UniBergen','_blank')
}