fetch("items.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error(
                `Network response was not ok ${response.statusText}`
            );
        }
        return response.json();
    })
    .then((data) => {
        const container = document.querySelector(".container");
        const fragment = document.createDocumentFragment();

        data.forEach((product) => {
            if (
                !product.image ||
                !product.name ||
                !product.price ||
                !product.buyLink
            ) {
                console.warn("Missing product data:", product);
                return;
            }

            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.name;
            productImage.classList.add("product-image");
            productCard.appendChild(productImage);

            const productName = document.createElement("h2");
            productName.textContent = product.name;
            productName.classList.add("product-name");
            productCard.appendChild(productName);

            const productPrice = document.createElement("p");
            productPrice.textContent = `Price: $${product.price.toFixed(2)}`;
            productPrice.classList.add("product-price");
            productCard.appendChild(productPrice);

            const buyButton = document.createElement("button");
            buyButton.classList.add("buy-button");
            buyButton.textContent = "Buy Now";
            buyButton.addEventListener("click", () => {
                window.location.href = product.buyLink;
            });
            productCard.appendChild(buyButton);

            fragment.appendChild(productCard);
        });

        container.appendChild(fragment);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
