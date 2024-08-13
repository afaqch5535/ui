document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8080/api/customers')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('customerTableBody');
        tableBody.innerHTML = ''; 
  
        data.forEach(customer => {
          const row = document.createElement('tr');
  
          row.innerHTML = `
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.idNumber}</td>
            <td>${customer.address}</td>
            <td>${customer.status}</td>
            <td>
              <a href="edit-customer.html?id=${customer.id}" class="btn btn-warning btn-sm">Edit</a>
              <a href="view-customer.html?id=${customer.id}" class="btn btn-info btn-sm">View</a>
            </td>
          `;
  
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
  });
  