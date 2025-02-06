$(document).ready(function () {
  function loadCatalog() {
    let medicineCatalog = $("#medicineCatalog tbody");
    medicineCatalog.empty();

    // Fetch data from JSON file
    $.getJSON("../../assets/database/products.json", function (data) {
      $.each(data, function (key, medicine) {
        addMedicineToCatalog(medicine);
      });
    }).fail(function () {
      console.log("Error: Unable to load JSON data.");
    });
  }

  function addMedicineToCatalog(medicine) {
    let medicineCatalog = $("#medicineCatalog tbody");
    let medicineRow = `
      <tr>
        <td><img src="${medicine.image}" alt="${
      medicine.name
    }" width="50" height="50" class="rounded-circle"></td>
        <td>${medicine.name}</td>
        <td>${medicine.price.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}</td>
        <td>${medicine.description}</td>
        <td>${medicine.quantity}</td>
        <td>${medicine.function}</td>
      </tr>
    `;
    medicineCatalog.append(medicineRow);
  }

  $("#addCatalogModal form").submit(function (e) {
    e.preventDefault();
    let name = $("#medicineName").val().trim();
    let price = parseFloat($("#medicinePrice").val().trim());
    let image = $("#medicineImage").val().trim();
    let description = $("#medicineDescription").val().trim();
    let quantity = parseInt($("#medicineQuantity").val().trim());
    let functions = $("#medicineFunction").val().trim();

    if (
      !name ||
      isNaN(price) ||
      !image ||
      !description ||
      isNaN(quantity) ||
      !functions
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    let newMedicine = {
      name: name,
      price: price,
      image: image,
      description: description,
      quantity: quantity,
      function: functions,
    };
    addMedicineToCatalog(newMedicine);
    $("#addCatalogModal").modal("hide");
    $("#addCatalogModal form")[0].reset();
  });

  loadCatalog();
});
