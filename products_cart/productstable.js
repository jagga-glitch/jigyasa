fetch("https://dummyjson.com/products")
            .then(response => response.json())
            .then(data => {
                const products = data.products;
           const table = document.getElementById("productTable");
            products.forEach(product => {
            table.innerHTML += `
                        <tr>
                            <td>${product.id}</td>
                            <td>
                            <img src="${product.thumbnail}">
                            </td>
                            <td>${product.title}</td>
                            <td>${product.category}</td>
                            <td>$${product.price}</td>
                            <td>${ratingStars(product.rating)}</td>
                            <td>${product.stock}</td>
                            <td>
                            <button>Add to Cart</button>
                            </td>
                        </tr>`;
 });
            })
            .catch(error => {
                console.log("Error:", error);
            });


            function ratingStars(product_rating){
      const stars= Math.floor(product_rating);
      return "⭐".repeat(stars);
}