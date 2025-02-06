$(document).ready(function () {
  let products = [
    {
      id: 1,
      name: "paracetamol",
      image: "./assets/img/tech/image2.jpg",
      price: 1000,
    },
    {
      id: 2,
      name: "promag",
      image: "./assets/img/tech/image2.jpg",
      price: 1000,
    },
    {
      id: 3,
      name: "sangobion",
      image: "./assets/img/tech/image2.jpg",
      price: 1000,
    },
    {
      id: 4,
      name: "paracetamol",
      image: "./assets/img/tech/image2.jpg",
      price: 1000,
    },
  ];

  function loadProduct() {
    let productList = $("#productList");
    productList.empty();
    $.each(products, function (index, product) {
      let itemProduct = `
        <div class="col-12 col-md-6 col-lg-4 mb-4">
          <div class="card border-light-subtle clean-product-item">
            <div class="image text-center p-3">
              <a href="#">
                <img class="img-fluid d-block mx-auto" src="${
                  product.image
                }" alt="${product.name}" />
              </a>
            </div>
            <div class="card-body">
              <h5 class="product-name text-center">
                <a href="#">${product.name}</a>
              </h5>
              <div class="about text-center">
                <div class="rating">
                  <img src="../../assets/img/star.svg" />
                  <img src="../../assets/img/star.svg" />
                  <img src="../../assets/img/star.svg" />
                  <img src="../../assets/img/star-half-empty.svg" />
                  <img src="../../assets/img/star-empty.svg" />
                </div>
                <div class="price text-success fw-bold">
                  Rp ${product.price.toLocaleString("id-ID")}
                </div>
              </div>
            </div>
          </div>
        </div>`;
      productList.append(itemProduct);
    });
  }

  loadProduct();
});
