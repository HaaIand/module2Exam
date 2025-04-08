let userData = []
let postData = []
let commentData = []

//function that loads all posts according to the userid.
function loadPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
        postData = data;
        const selectedUserId = parseInt(userlist.value);
        const selectedPosts = postData
            .filter(post => post.userId === selectedUserId)
            .sort((a,b) =>b.id - a.id)
            .slice(0,2);

        if (selectedPosts.length > 0) {
            document.getElementById("title1").innerText = selectedPosts[0].title;
            document.getElementById("post1").innerText = selectedPosts[0].body;

            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${selectedPosts[0].id}`)
                    .then(response => response.json())
                    .then(comments => {
                        for (let i = 0; i < comments.length; i++) {
                            let compa = document.createElement("p");
                            compa.id = comments[i].id;
                            compa.innerText = comments[i].body;
                            document.getElementById("comments1").appendChild(compa);
                        }
                    });
        } else {
            document.getElementById("title1").innerText = "";
            document.getElementById("post1").innerText = "";
        }

        if (selectedPosts.length > 1) {
            document.getElementById("title2").innerText = selectedPosts[1].title;
            document.getElementById("post2").innerText = selectedPosts[1].body;

            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${selectedPosts[1].id}`)
                    .then(response => response.json())
                    .then(comments => {
                        for (let i = 0; i < comments.length; i++) {
                            let compa = document.createElement("p");
                            compa.id = comments[i].id;
                            compa.innerText = comments[i].body;
                            document.getElementById("comments2").appendChild(compa);
                        }
                    });
        } else {
            document.getElementById("title2").innerText = "";
            document.getElementById("post2").innerText = "";
        }
    
});
}

//Function that fills the select element with options from the API.
function loadUser() {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
        userData = data;
        
        for (let i = 0; i < data.length; i++) {
            const select = document.getElementById("userlist");
            const option = document.createElement("option");
            option.value = data[i].id;
            option.text = data[i].name;
            select.appendChild(option);
        }

});
}

window.onload = loadUser;

//function that "prints" all wanted data in their respective HTML elements.
function loadUserData() {
    resetForm();
    const selectedUser = (userlist.value) - 1;
        document.getElementById("email").innerText = userData[selectedUser].email;
        document.getElementById("phone").innerText = userData[selectedUser].phone;
        loadAddress();
        loadPosts();

}

//function that creates an array of the addresses and returns the corresponding address and the details about the address.
function loadAddress() {
    const selectedUser = (userlist.value) - 1;
    const selAddress = userData[selectedUser].address;
    const addressArray = Object.values(selAddress);

    for (let i = 0; i < addressArray.length; i++) {

        //Skipping the geographical coordinates of the location. Seems unneccesary.
        if (addressArray[i] === selAddress.geo) {
            continue
        }

        const address = document.getElementById("address");
        const paragraph = document.createElement("p");
        paragraph.id = addressArray[i];
        paragraph.innerText = addressArray[i];
        address.appendChild(paragraph);
    }
}

//Function that resets all used fields.
function resetForm() {
    document.getElementById("email").innerText = "";
    document.getElementById("phone").innerText = "";
    document.getElementById("address").innerHTML = "";
    document.getElementById("title1").innerText = "";
    document.getElementById("post1").innerText = "";
    document.getElementById("comments1").innerText = "";
    document.getElementById("title2").innerText = "";
    document.getElementById("post2").innerText = "";
    document.getElementById("comments2").innerText = "";
}