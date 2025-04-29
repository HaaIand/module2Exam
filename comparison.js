const urlParams = new URLSearchParams(window.location.search);
const id1 = urlParams.get("id1");
const id2 = urlParams.get("id2");

console.log("Loaded Listing ID:", id1);
console.log("Loaded listing  ID:", id2);

listingData = {}

let listing1;
let listing2;

function fetchData() {
    fetch("https://api.npoint.io/eb3c116538e7dcbfc7bf/listings")
    .then(response => response.json())
    .then(data => {
        listingData = data;
        listing1 = data[id1];
        listing2 = data[id2];

        renderPage(listing1, listing2);
        renderInfrastructure(listing1, listing2);
    })
}

function renderPage(listing1, listing2) {
    const container = document.getElementById("maincontent");
    container.innerHTML = `
                <div class="compbighead">
                    <div class="compareheader">
                        <p class="mediumheader">${listing1.title}</p>
                        <img class="apartmentphoto" src="${listing1.media.images[0]}" alt="Photo of listing 1">
                    </div>
                    <div class="compareheader">
                        <p class="mediumheader">${listing2.title}</p>
                        <img class="apartmentphoto" src="${listing2.media.images[0]}" alt="Photo of listing 2"> 
                    </div>
                </div>
                <div id="conditioncomp">
                    <p class="smallheader center">House condition diagram</p>
                    <div id="locationdiagram">
                        <img class="diagram" src="images/Location diagram.png" alt="Brann stadion location diagram">
                        <img class="diagram" src="images/Location diagram2.png" alt="Cabin location diagram">
                    </div>
                </div>
                
                <div id="agecomp">
                    <p class="smallheader center">Neighbor age groups</p>
                    <div class="demographiccontent" id="agegraphic">
                        <div id="neighborchartgroup">
                            <img class="graphic" src="images/Right side chart.png" alt="Neighbor age groups brann">
                        </div>
                        <div id="neighborchart">
                            <img class="graphic" src="images/Frame 27.png" alt="Neighbor age groups brann">
                        </div>
                        <div id="neighborchart2">
                            <img class="graphic" src="images/cabinframage.png" alt="Neighbor age groups cabin">
                        </div>
                        <div id="neighborchartgroup2">
                            <img class="graphic" src="images/Right side chart.png" alt="Neighbor age groups chart">
                        </div>
                    </div>
                </div>

                <div id="aptsizecomp">
                    <p class="smallheader center">Apartment size</p>
                    <div id="aptsizes" class="smallcompare">
                        <p class="smallheader aptsize">${listing1.housingConditions.sizeSqm} square meters</p>
                        <p class="smallheader aptsize">${listing2.housingConditions.sizeSqm} square meters</p>
                    </div>
                </div>

                <div id="distancecomp">
                    <p class="smallheader center">Distance from city centre</p>
                    <div id="distancecomparison" class="smallcompare">
                        <div class="distancecard">
                            <img class="icon" src="images/distanceto.png" alt="Icon symbolizing distance">
                            <p>${listing1.housingConditions.distanceToCityCentre} km</p>
                        </div>
                        <div class="distancecard">
                            <p>${listing2.housingConditions.distanceToCityCentre} km</p>
                            <img class="icon" src="images/distancetorotated.png" alt="Icon symbolizing distance">
                        </div>
                    </div>
                </div>
                <div id="pricecomparison">
                    <p class="smallheader center">Price per Month</p>
                    <div id="pricecomp">
                        <div class="distancecard">
                            <p class="smallheader">${listing1.pricePerMonth} NOK</p>
                        </div>
                        <div class="distancecard">
                            <p class="smallheader">${listing2.pricePerMonth} NOK</p>
                        </div>
                    </div>
                </div>

                <div id="sharedcomp">
                    <p class="smallheader center">Shared facilities</p>
                    <div id="shared" class="smallcompare">
                    </div>
                </div>

                <div id="interestcomp">
                    <p class="smallheader center">Neighbor interests</p>
                    <div class="demographiccontent" id="interestgraphic">
                        <div id="neighborintgroup">
                            <img class="graphic" src="images/neiintgrp.png" alt="Neighbor interest groups brann">
                        </div>
                        <div id="neighborintchart">
                            <img class="graphic" src="images/neiint.png" alt="Neighbor interest brann">
                        </div>
                        <div id="neighborchart2">
                            <img class="graphic" src="images/Frame 26.png" alt="Neighbor interest cabin">
                        </div>
                        <div id="neighborintgroup2">
                            <img class="graphic" src="images/neiintgrp.png" alt="Neighbor interest groups cabin">
                        </div>
                    </div>
                </div>`
}

function applyComparison(e) {
    e.preventDefault();
    console.log("heieh");

    const filters = document.querySelectorAll(".comparison-filter");

    filters.forEach(filter => {
        const sectionid = filter.getAttribute("data-section");
        const section = document.getElementById(sectionid);

        console.log(section);

        if (section) {
            section.style.display = filter.checked ? "block" : "none";
        }
    })

    renderInfrastructure(listing1, listing2);

}

function renderInfrastructure(listing1, listing2) {
    const infrastructure1 = listing1.housingConditions.infrastructure || [];
    const infrastructure2 = listing2.housingConditions.infrastructure || [];

    const container = document.getElementById("shared");
    container.innerHTML = "";

    container.innerHTML = `
    <div class="structurecolumn">
        <ul class="structurelist">
            ${infrastructure1.map(facility => `<li class=smallheader aptsize>${formatInfrastructure(facility)}</li>`).join("")}
        </ul>
        <ul class="structurelist">
            ${infrastructure2.map(facility => `<li class=smallheader aptsize>${formatInfrastructure(facility)}</li>`).join("")}
        </ul>
    </div>`
}

function formatInfrastructure(facility) {
    if (!facility) return "";
    const spaced = facility.replace(/_/g, " ");
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

document.addEventListener("DOMContentLoaded", function() {
    const filterButton = document.getElementById("filterapply");
    filterButton.addEventListener("click", applyComparison);
    console.log("hallo");
});

let currentside = null;


function newCompareModal(side) {
    currentside = side;

    const modal = new bootstrap.Modal(document.getElementById("compareModalright"));
    modal.show();

    const select = document.getElementById("newListingSelectright");
    select.innerHTML = "";


    Object.keys(listingData).forEach(id => {
        const listing = listingData[id];
        const option = document.createElement("option");
        option.value = id;
        option.textContent = listing.title;
        select.appendChild(option);
    });
}

function applyNewCompare() {
    const selectid = document.getElementById("newListingSelectright").value;
    const newlisting = listingData[selectid];

    if (currentside === "left") {
        listing1 = newlisting;
    } else if (currentside === "right") {
        listing2 = newlisting;
    }

    renderPage(listing1, listing2);
    renderInfrastructure(listing1, listing2);

    const modal = document.getElementById("compareModalright");
    const modalinstance = bootstrap.Modal.getInstance(modal);
    modalinstance.hide();
}

window.onload = fetchData;

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