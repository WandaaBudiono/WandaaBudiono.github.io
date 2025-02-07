$(document).ready(function () {
    // function pushCart() {
    cart = $('#cart')
    $(cart).html('')
    user.getCart().forEach(data => {
        let row = $(`<div class="product">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-md-3">
                                    <div class="product-image">
                                        <img class="img-fluid d-block mx-auto image" src="${db.products[data.name.toLowerCase()].image}" />
                                    </div>
                                </div>
                                <div class="col-md-5 product-info">
                                    <a class="product-name" href="#">${db.products[data.name.toLowerCase()].name}</a>
                                    <div class="product-specs">
                                        <div>
                                            <span>${db.products[data.name.toLowerCase()].description}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-2 quantity">
                                    <label class="form-label d-none d-md-block" for="quantity">Quantity</label><input type="number" id="number" class="form-control quantity-input" value="${data.quantity}" />
                                </div>
                                <div class="col-6 col-md-2 price"><span class="product-price">Rp.${db.products[data.name.toLowerCase()].price}</span></div>
                                <button class="btn btn-danger mt-2" onclick="product.delete(${db.products[data.name.toLowerCase()]})">Remove</button>
                        </div>`)
        cart.append(row)
    })
    // }

    function updateTotal() {
        let subtotal = 0;
        $(".product").each(function () {
            let quantity = parseInt($(this).find(".quantity-input").val()) || 0;
            if (quantity === 0) {
                $(this).remove();
            } else {
                let price = $(this).find(".product-price").text().replace("Rp.", "").replace('.', '')
                subtotal += quantity * price;
            }
        });
        $(".subtotal-price").text(`Rp.${subtotal}`);
        $(".total-price").text(`Rp.${subtotal}`);
    }

    $(".quantity-input").on("input", function () {
        let value = $(this).val() - 0;
        let previousValue = $(this).data("previous-value") - 0 || 1;

        if (isNaN(value) || value < 0) {
            $(this).val(0);
        }

        if (previousValue === 1 && value === 0) {
            let confirmRemove = confirm("Confirm remove item?");
            if (confirmRemove) {
                $(this).val(0);
                updateTotal();
            } else {
                $(this).val(1);
            }
        } else {
            updateTotal();
        }

        $(this).data("previous-value", value);
    });

    updateTotal();
});
