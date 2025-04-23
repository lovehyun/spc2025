document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/products');
    const data = await response.json();

    displayTable(data);
});

function displayTable(products) {
    const productTableBody = document.querySelector('#productTable tbody');
    products.forEach((product) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button class="addCartBtn" data-product-id="${product.id}">담기</button></td>
        `
        productTableBody.appendChild(row);

        row.querySelector('.addCartBtn').addEventListener('click', function () {
            addToCart(this.getAttribute('data-product-id'));
        })
    })
}

async function checkLoginStatus() {
    const response = await fetch('/api/check-login');
    if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        return true;
    } else {
        const data = await response.json();
        console.log(data);
        return false;
    }
}

async function addToCart(productId) {
    const isLogin = await checkLoginStatus();
    if (!isLogin) {
        alert('로그인을 하고 오세요')
    } else {
        const response = await fetch(`/api/cart/${productId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log(data);
    }
}
