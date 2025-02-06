$(document).ready(function () {
  function loadProduct() {
    let productList = $("#productList");
    productList.empty();

    $.getJSON("../../assets/database/products.json", function (data) {
      $.each(data, function (key, product) {
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
                <p class="text-center text-muted">${product.function}</p>
                <div class="about text-center">
                  <div class="price text-success fw-bold">
                    Rp ${parseInt(product.price).toLocaleString("id-ID")}
                  </div>
                </div>
              </div>
            </div>
          </div>`;

        productList.append(itemProduct);
      });

      // Fungsi pencarian
      $("#searchInput").on("input", function () {
        let searchTerm = $(this).val().toLowerCase();
        $(".clean-product-item").each(function () {
          let productName = $(this).find(".product-name").text().toLowerCase();
          if (productName.includes(searchTerm)) {
            $(this).parent().show();
          } else {
            $(this).parent().hide();
          }
        });
      });
    }).fail(function () {
      console.error("Gagal memuat data produk.");
    });
  }

  loadProduct();
});
