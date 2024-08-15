document.getElementById('customerForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      idNumber: document.getElementById('idNumber').value,
      address: document.getElementById('address').value
    };
  
    fetch('http://localhost:8080/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        alert('Customer created successfully!');
        window.location.href = 'index.html'; 
      })
      .catch(error => {
        console.error('Error creating customer:', error);
      });
    });
  