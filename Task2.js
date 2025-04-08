function calculateTotal() {
    var roomRate = document.getElementById('room-type').value;
    //var nights = document.getElementById('nights').innerHTML;
    //var nights is defined as the innterHTML of the nights element, but it is the value of that element which we want, as in
    //the roomRate.
    var nights = document.getElementById('nights').value;

    nights = parseInt(nights);
    if (isNaN(nights) || nights <= 0) {
        console.log(nights);
        alert('Please enter a valid number of nights.');
        return;
    }

    if (roomRate === "") {
        alert('Please select a room type.');
        return;
    }

    var total = parseInt(roomRate) * nights;  
    //There is a capital D in getElementById, which shouldn't be there.
    //document.getElementByID('total-cost').innerText = total.toFixed(2);
    document.getElementById('total-cost').innerText = total.toFixed(2);
}

function confirmBooking() {
    var total = document.getElementById('total-cost').innerText;
    if (total === 0) {
        alert('Please calculate the total before confirming.');
        return;
    }

    document.getElementById('confirmation-msg').innerText = `Your booking is confirmed. Total cost: $${total}`;
}

function resetForm() {
    document.getElementById('room-type').selectedIndex = 0;
    //document.getElementById('nights').value = 0;
    //Nights value should be 1 by default, when resetting, because you are staying at least one night if you fill the form.
    document.getElementById('nights').value = 1;
    document.getElementById('confirmation-msg').innerText = '';
}