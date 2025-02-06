$(document).ready(function () {
  function updateTotal() {
    let subtotal = 0;
    $(".product").each(function () {
      let quantity = parseInt($(this).find(".quantity-input").val()) || 0;
      if (quantity === 0) {
        $(this).remove();
      } else {
        let price = parseFloat(
          $(this).find(".product-price").text().replace("$", "")
        );
        subtotal += quantity * price;
      }
    });
    $(".subtotal-price").text(`$${subtotal.toFixed(2)}`);
    $(".total-price").text(`$${subtotal.toFixed(2)}`);
  }

  $(".quantity-input").on("input", function () {
    let value = parseInt($(this).val());
    let previousValue = parseInt($(this).data("previous-value")) || 1;

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
