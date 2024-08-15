document.getElementById('accountForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    const formData = {
      type: document.getElementById('type').value,
      accountTitle: document.getElementById('accountTitle').value,
      accountNumber: document.getElementById('accountNumber').value,
      balance: document.getElementById('balance').value,
      activeDate: document.getElementById('activeDate').value,
      closedDate: document.getElementById('closedDate').value,
      dormantDate: document.getElementById('dormantDate').value
    };
  
    fetch('http://localhost:8080/api/accounts/${customerId}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        alert('Account created successfully!');
        window.location.href = 'index.html'; 
      })
      .catch(error => {
        console.error('Error creating account:', error);
      });
    });
  