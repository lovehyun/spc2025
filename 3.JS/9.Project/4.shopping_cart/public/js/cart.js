document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/cart');
    const data = await response.json();

    displayTable(data.cart);
});

function displayTable(cart) {
    const cartTableBody = document.querySelector('#cartTable tbody'); 
    cart.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td><button>삭제</button></td>
        `
        cartTableBody.appendChild(row);
    })
}