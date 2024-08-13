document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const customerId = urlParams.get('id');

  if (customerId) {
    document.getElementById('customerId').value = customerId;

    fetch(`http://localhost:8080/api/customers/${customerId}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('firstName').value = data.firstName;
        document.getElementById('lastName').value = data.lastName;
        document.getElementById('phone').value = data.phone;
        document.getElementById('email').value = data.email;
        document.getElementById('idNumber').value = data.idNumber;
        document.getElementById('address').value = data.address;
        document.getElementById('status').value = data.status;
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
  }
});