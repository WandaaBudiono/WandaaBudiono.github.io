product = {
    create: function (name, value) {
    },
    read: function (name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    delete: function (data) {
        delete user.getCart()[data]
    },
    add: function (data) {
        user.getCart()
        user.getCart().push(data)
        user.update()
    }
};

// $(document).ready(function () {
//     function updateTotal() {
//         let subtotal = 0;
//         $(".product").each(function () {
//             let quantity = parseInt($(this).find(".quantity-input").val()) || 0;
//             if (quantity === 0) {
//                 $(this).remove();
//             } else {
//                 let price = parseFloat(
//                     $(this).find(".product-price").text().replace("$", "")
//                 );
//                 subtotal += quantity * price;
//             }
//         });
//         $(".subtotal-price").text(`$${subtotal.toFixed(2)}`);
//         $(".total-price").text(`$${subtotal.toFixed(2)}`);
//     }

//     cart = $('#cart')
//     $(user.getCart()).each((this) => {
//         // let this = JSON.parse(this)
//         let row = $('<tr></tr>')
//         row.append(`<td>${this.name}</td>`)
//         row.append(`<td>$${this.price.toFixed(2)}</td>`)
//         row.append(`<td><input type="number" class="quantity-input" value="${this.quantity}" data-previous-value="${this.quantity}"></td>`)
//         row.append(`<td>$${(this.price * this.quantity).toFixed(2)}</td>`)
//         row.append(`<td><button class="btn btn-danger" onclick="product.delete('${this}')">Remove</button></td>`)
//         cart.append(row)
//     })

//     // $(".quantity-input").on("input", function () {
//     $(document).on("click", ".quantity-input", () => {
//         console.log(this);

//         let value = parseInt($(this).val());
//         let previousValue = parseInt($(this).data("previous-value")) || 1;

//         if (isNaN(value) || value < 0) {
//             $(this).val(0);
//         }

//         if (previousValue === 1 && value === 0) {
//             let confirmRemove = confirm("Confirm remove item?");
//             if (confirmRemove) {
//                 $(this).val(0);
//                 updateTotal();
//             } else {
//                 $(this).val(1);
//             }
//         } else {
//             updateTotal();
//         }

//         $(this).data("previous-value", value);
//     });

//     updateTotal();
// })