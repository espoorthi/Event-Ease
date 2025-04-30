

//handle ticket booking
document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const tickets = document.getElementById('tickets').value;
    localStorage.setItem('tickets', tickets); // Store in local storage
    window.location.href = 'payinfo.html'; // Redirect to payment page
});
//handle payment submission
document.getElementById('paymentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const amount = document.getElementById('amount').value;

    const paymentData = { name, email, paymentMethod, amount };

    fetch('http://localhost:5000/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.href = 'paysuccess.html'; // Redirect to success page
    })
    .catch(error => console.error('Error:', error));
});

//retrive stored tickets
document.addEventListener('DOMContentLoaded', () => {
    const tickets = localStorage.getItem('tickets');
    const amount = tickets * 100; // Assume each ticket costs 100
    document.getElementById('amount').value = amount; // Pre-fill amount
});
