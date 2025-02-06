$(document).ready(function () {
  function loadProduct() {
    let productList = $("#productList");
    productList.empty();

    $(".product-item").each(function () {
      let product = {
        name: $(this).find(".product-name").text().trim(),
        image: $(this).find("img").attr("src"),
        price: $(this)
          .find(".price")
          .text()
          .trim()
          .replace("Rp ", "")
          .replace(/\./g, ""),
      };

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
                  Rp ${parseInt(product.price).toLocaleString("id-ID")}
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
