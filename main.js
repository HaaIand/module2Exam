//Modal
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

function loginUIB() {
    window.open('https://mitt.uib.no/', '_blank');
}

let listingData = {};

//Fetch data and display it.
function fetchHousings() {
    fetch("https://api.npoint.io/eb3c116538e7dcbfc7bf/listings")
    .then(response => response.json())
    .then(data => {
        listingData = data;
        const listingArray = Object.values(listingData);
        console.log(listingArray);
        console.log(listingArray[0]);
        console.log(listingArray[0].pricePerMonth); 
        console.log(listingArray.length);

        for (let i = 0; i < listingArray.length; i++) {
            apartmentdiv = document.createElement("div");
            apartmentdiv.id = "apartment" + [i];
            document.getElementById("availableapartments").appendChild(apartmentdiv);
            document.getElementById("apartment" + [i]).classList.add("flexitem");

            contentdiv = document.createElement("div");
            contentdiv.id = "content" + [i];
            document.getElementById("apartment" + [i]).appendChild(contentdiv);
            document.getElementById("content" + [i]).classList.add("flexcontent");

            topcontent = document.createElement("div");
            topcontent.id = "topcontent" + [i];
            document.getElementById("content" + [i]).appendChild(topcontent);
            document.getElementById("topcontent" + [i]).classList.add("topcontent");

            imagelist = Object.values(listingArray[i].media);
            photo = document.createElement("img");
            photo.id = "photo" + i;
            source = photo.src = imagelist[0][0];
            topcontent.appendChild(photo);
            document.getElementById("photo" + i).classList.add("cardphoto");

            bottomcontent = document.createElement("div");
            bottomcontent.id = "bottomcontent" + [i];
            document.getElementById("content" + [i]).appendChild(bottomcontent);
            document.getElementById("bottomcontent" + [i]).classList.add("bottomcontent");

            title = document.createElement("p");
            title.innerText = listingArray[i].title;
            title.id = "title" + i;
            document.getElementById("bottomcontent" + i).appendChild(title);
            document.getElementById("title" + i).classList.add("apartmenttitle")

            price = document.createElement("p");
            price.innerText = listingArray[i].pricePerMonth + " NOK per month";
            price.id = "price" + i;
            document.getElementById("bottomcontent" + i).appendChild(price);
            document.getElementById("price" + i).classList.add("apartmentprice")

            verybottom = document.createElement("div");
            verybottom.id = "verybottom" + i;
            document.getElementById("bottomcontent" + i).appendChild(verybottom);
            document.getElementById("verybottom" + i).classList.add("verybottom");

            distancecard = document.createElement("div");
            distancecard.id = "distancecard" + i;
            document.getElementById("verybottom" + i).appendChild(distancecard);
            document.getElementById("distancecard" + i).classList.add("distancecard");

            walker = document.createElement("img");
            walker.id = "walker" + i;
            walksource = walker.src = "images/distanceto.png";
            distancecard.appendChild(walker);
            document.getElementById("walker" + i).classList.add("icon");

            houseelements = Object.values(listingArray[i].housingConditions);
            actualDistance = houseelements[6] + " km";
            distance = document.createElement("p");
            distance.innerText = actualDistance;
            distance.id = "distance" + i;
            distancecard.appendChild(distance);
            document.getElementById("distance" + i).classList.add("actualdistance");

            rightverybottom = document.createElement("div");
            rightverybottom.id = "rightverybottom" + i;
            document.getElementById("verybottom" + i).appendChild(rightverybottom);
            document.getElementById("rightverybottom" + i).classList.add("rightverybottom");

            detailsbtn = document.createElement("button");
            detailsbtn.id = "detailsbtn" + i;
            //detailsbtn.href = "details.html";
            detailsbtn.addEventListener("click", () => {
                seeDetails(listingArray[i].id);
            });
            detailsbtn.target = "_blank";
            detailsbtn.innerText = "See details";
            document.getElementById("rightverybottom" + i).appendChild(detailsbtn);
            document.getElementById("detailsbtn" + i).classList.add("button");
            document.getElementById("detailsbtn" + i).classList.add("secondary");

        }
    })
}

//Functions called immediately.
window.onload = function() {
    fetchHousings();
    showPrice();
}

//Search function.
function searchHousing() {

    removeBody();

    const searchValue = document.getElementById("housesearch").value.toLowerCase();
        console.log(searchValue);

        fetch("https://api.npoint.io/eb3c116538e7dcbfc7bf/listings")
        .then(response => response.json())
        .then(data => {
            listingData = data;
            const listingArray = Object.values(listingData);
            const filterListings = listingArray.filter(listing => {
                return (
                    listing.title.toLowerCase().includes(searchValue) ||
                    listing.address.city.toLowerCase().includes(searchValue) ||
                    listing.address.street.toLowerCase().includes(searchValue) ||
                    listing.pricePerMonth.toString().includes(searchValue) ||
                    listing.type.toLowerCase().includes(searchValue)
                );
            })

            let container = document.getElementById("availableapartments");
            container.innerHTML = "";

            filterListings.forEach(listing => {
                const div = document.createElement("div");
                div.classList.add("flexitem");
                div.innerHTML = 
                `<div class="flexcontent">
                <div class="topcontent">
                    <img class="cardphoto" src="${listing.media.images[0]}" alt="${listing.title}"> 
                </div>
                <div class="bottomcontent">
                    <p class="apartmenttitle">
                        ${listing.title}
                    </p>
                    <p class="apartmentprice">
                        ${listing.pricePerMonth} NOK per month
                    </p>
                    <div class="verybottom">
                        <div class="distancecard">
                            <img class="icon" src="images/distanceto.png" alt="Icon symbolizing distance">
                            <p>${listing.housingConditions.distanceToCityCentre} km</p>
                        </div>
                        <div class="rightverybottom" id="buttondiv">
                        </div>
                    </div>
                </div>
            </div>`;
            
            const button = document.createElement("button");
            button.className = "button secondary";
            button.textContent = "See details";
            button.addEventListener("click", () => seeDetails(listing.id));

            div.querySelector("#buttondiv").appendChild(button);

            container.appendChild(div);
            })
        })

}

//Show live price input in filter.
function showPrice() {
    const pricelabel = document.getElementById("pricelabel");
    const rangeInput = document.getElementById("dropdownRange");
    pricelabel.innerHTML = "Max price: " + rangeInput.value;
    rangeInput.addEventListener("input", function() {
        pricelabel.innerHTML = "Max price: " + this.value;
    });
    
}

//Add filter to page, then display.
function applyFilters(e) {
    e.preventDefault();

    removeBody();

    const privBathroom = document.getElementById("dropdownCheck1").checked;
    console.log(privBathroom);
    const privKitchen = document.getElementById("dropdownCheck2").checked;
    const isFurnished = document.getElementById("dropdownCheck3").checked;
    const maxPrice = document.getElementById("dropdownRange").value;
    console.log(privBathroom);

    fetch("https://api.npoint.io/eb3c116538e7dcbfc7bf/listings")
        .then(response => response.json())
        .then(data => {
            const listingArray = Object.values(data);

            const filteredListings = listingArray.filter(listing => {
                return  (!privBathroom || listing.housingConditions.privateBathroom) &&
                        (!privKitchen || listing.housingConditions.privateKitchen) &&
                        (!isFurnished || listing.housingConditions.isFurnished) &&
                        listing.pricePerMonth <= maxPrice;
            });
            console.log(filteredListings);

            let container = document.getElementById("availableapartments");
            container.innerHTML = "";
            
            filteredListings.forEach(listing => {
                const div = document.createElement("div");
                div.classList.add("flexitem");
                div.innerHTML = 
                `<div class="flexcontent">
                <div class="topcontent">
                    <img class="cardphoto" src="${listing.media.images[0]}" alt="${listing.title}"> 
                </div>
                <div class="bottomcontent">
                    <p class="apartmenttitle">
                        ${listing.title}
                    </p>
                    <p class="apartmentprice">
                        ${listing.pricePerMonth} NOK per month
                    </p>
                    <div class="verybottom">
                        <div class="distancecard">
                            <img class="icon" src="images/distanceto.png" alt="Icon symbolizing distance">
                            <p>${listing.housingConditions.distanceToCityCentre} km</p>
                        </div>
                        <div class="rightverybottom" id="buttondiv">
                        </div>
                    </div>
                </div>
            </div>`;

            const button = document.createElement("button");
            button.className = "button secondary";
            button.textContent = "See details";
            button.addEventListener("click", () => seeDetails(listing.id));

            div.querySelector("#buttondiv").appendChild(button);

            container.appendChild(div);
            })
        });
}

document.addEventListener("DOMContentLoaded", function() {
    const filterButton = document.getElementById("filterapply");
    filterButton.addEventListener("click", applyFilters);
    console.log("hallo");
});


//Remove most of the page.
function removeBody() {
    const mainbody = document.getElementById("mainbody");

        [...mainbody.children].forEach(child => {
        if (child.id !== "availhead" && child.id !== "availableapartments") {
        child.remove();
        }

    });
}

//Used chat to create this function to get a value within an object in the array.
//This was the prompt.
//"If one of the properties is within an object, how can I easily access it without having to make a separate function?""
function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

//Add sorting, then display.
function sortASC(property) {

    removeBody();

    fetch("https://api.npoint.io/eb3c116538e7dcbfc7bf/listings")
    .then(response => response.json())
    .then(data => {
        listingData = data;
        const listingArray = Object.values(listingData);
        const valueType = typeof getNestedValue(listingArray[0], property);
        console.log(valueType);
        console.log(listingArray[0]);

        let sorted;

        if (valueType === 'number') {
            sorted = listingArray.sort((a,b) => getNestedValue(a, property) - getNestedValue(b, property));
        } else if (valueType === 'string') {
            sorted = listingArray.sort((a,b) => getNestedValue(a, property).localeCompare(getNestedValue(b, property)));
        };

        let container = document.getElementById("availableapartments");
            container.innerHTML = "";

            sorted.forEach(listing => {
                const div = document.createElement("div");
                div.classList.add("flexitem");
                div.innerHTML = 
                `<div class="flexcontent">
                <div class="topcontent">
                    <img class="cardphoto" src="${listing.media.images[0]}" alt="${listing.title}"> 
                </div>
                <div class="bottomcontent">
                    <p class="apartmenttitle">
                        ${listing.title}
                    </p>
                    <p class="apartmentprice">
                        ${listing.pricePerMonth} NOK per month
                    </p>
                    <div class="verybottom">
                        <div class="distancecard">
                            <img class="icon" src="images/distanceto.png" alt="Icon symbolizing distance">
                            <p>${listing.housingConditions.distanceToCityCentre} km</p>
                        </div>
                        <div class="rightverybottom" id="buttondiv">
                        </div>
                    </div>
                </div>
            </div>`;

            const button = document.createElement("button");
            button.className = "button secondary";
            button.textContent = "See details";
            button.addEventListener("click", () => seeDetails(listing.id));

            div.querySelector("#buttondiv").appendChild(button);

            container.appendChild(div);
            })

    })
}

function sortDESC(property) {

    removeBody();

    fetch("https://api.npoint.io/eb3c116538e7dcbfc7bf/listings")
    .then(response => response.json())
    .then(data => {
        listingData = data;
        const listingArray = Object.values(listingData);
        const valueType = typeof getNestedValue(listingArray[0], property);
        console.log(valueType);
        console.log(listingArray[0]);

        let sorted;

        if (valueType === 'number') {
            sorted = listingArray.sort((a,b) => getNestedValue(b, property) - getNestedValue(a, property));
        } else if (valueType === 'string') {
            sorted = listingArray.sort((a,b) => getNestedValue(b, property).localeCompare(getNestedValue(a, property)));
        };

        let container = document.getElementById("availableapartments");
            container.innerHTML = "";

            sorted.forEach(listing => {
                const div = document.createElement("div");
                div.classList.add("flexitem");
                div.innerHTML = 
                `<div class="flexcontent">
                <div class="topcontent">
                    <img class="cardphoto" src="${listing.media.images[0]}" alt="${listing.title}"> 
                </div>
                <div class="bottomcontent">
                    <p class="apartmenttitle">
                        ${listing.title}
                    </p>
                    <p class="apartmentprice">
                        ${listing.pricePerMonth} NOK per month
                    </p>
                    <div class="verybottom">
                        <div class="distancecard">
                            <img class="icon" src="images/distanceto.png" alt="Icon symbolizing distance">
                            <p>${listing.housingConditions.distanceToCityCentre} km</p>
                        </div>
                        <div class="rightverybottom" id="buttondiv">
                        </div>
                    </div>
                </div>
            </div>`;

            const button = document.createElement("button");
            button.className = "button secondary";
            button.textContent = "See details";
            button.addEventListener("click", () => seeDetails(listing.id));

            div.querySelector("#buttondiv").appendChild(button);

            container.appendChild(div);
            })

    })
}

function seeDetails(id) {
    console.log("hallo");

    window.location.href = `details.html?id=${id}`;
}

//footer
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