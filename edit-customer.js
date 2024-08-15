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
  
  document.getElementById('editCustomerForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const customerId = document.getElementById('customerId').value;
    const customerData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      idNumber: document.getElementById('idNumber').value,
      address: document.getElementById('address').value,
      status: document.getElementById('status').value
    };
  
    fetch(`http://localhost:8080/api/customers/${customerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerData)
    })
    .then(response => response.json())
    .then(data => {
      alert('Customer updated successfully!');
      window.location.href = 'index.html'; 
    })
    .catch(error => {
      console.error('Error updating customer:', error);
    });
  });
  