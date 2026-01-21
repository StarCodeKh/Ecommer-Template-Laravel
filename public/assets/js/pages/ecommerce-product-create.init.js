/**
 * Ecommerce Add Product - Full Script
 * This version handles ALL Dropdowns, Tags, Datepicker, and Dropzone.
 */

// 1. GLOBAL VARIABLES
var itemid = 13; 

// 2. CKEDITOR INITIALIZATION
if (document.querySelector("#ckeditor-classic")) {
    ClassicEditor.create(document.querySelector("#ckeditor-classic")).then(function(e) {
        e.ui.view.editable.element.style.height = "200px";
    }).catch(function(e) {
        console.error("CKEditor Error:", e);
    });
}

// 3. DROPZONE INITIALIZATION
var dropzonePreviewNode = document.querySelector("#dropzone-preview-list");
if (dropzonePreviewNode) {
    var previewTemplate = dropzonePreviewNode.parentNode.innerHTML;
    dropzonePreviewNode.itemid = "";
    var parentNode = dropzonePreviewNode.parentNode;
    parentNode.removeChild(dropzonePreviewNode);

    var dropzone = new Dropzone(".dropzone", {
        url: "https://httpbin.org/post",
        method: "post",
        previewTemplate: previewTemplate,
        previewsContainer: "#dropzone-preview"
    });
}

// 4. MAIN APP LOGIC
!function() {
    "use strict";

    // --- A. UNIVERSAL CHOICES.JS INITIALIZER ---
    // This fix makes Visibility, Status, and Tags work automatically
    var choicesElements = document.querySelectorAll('[data-choices]');
    choicesElements.forEach(function(el) {
        var settings = {
            itemSelectText: '', // Removes the "Press to select" hint
            searchEnabled: true
        };

        // Disable search if data-choices-search-false is present
        if (el.getAttribute("data-choices-search-false") !== null) {
            settings.searchEnabled = false;
        }

        // Enable remove button if data-choices-multiple-remove is present (for Tags)
        if (el.getAttribute("data-choices-multiple-remove") !== null) {
            settings.removeItemButton = true;
        }

        new Choices(el, settings);
    });

    // --- B. FLAT PICKR (Datepicker) ---
    var datePickerField = document.querySelector("#datepicker-publish-input");
    if (datePickerField) {
        flatpickr(datePickerField, {
            dateFormat: "d.m.y",
            enableTime: false
        });
    }

    // --- C. UTILITIES & FORM LOGIC ---
    var forms = document.querySelectorAll(".needs-validation");
    var currentDate = (new Date).toUTCString().slice(5, 16);

    function getFormattedTime() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        return (hours < 10 ? "0" + hours : hours) + ":" + minutes + " " + ampm;
    }

    // Image Preview
    var productImageInput = document.querySelector("#product-image-input");
    if (productImageInput) {
        productImageInput.addEventListener("change", function() {
            var previewImg = document.querySelector("#product-img");
            var file = productImageInput.files[0];
            var reader = new FileReader();
            reader.addEventListener("load", function() {
                previewImg.src = reader.result;
            }, false);
            if (file) reader.readAsDataURL(file);
        });
    }

    // --- D. EDIT MODE & SUBMISSION ---
    var editData = sessionStorage.getItem("editInputValue");
    if (editData) {
        var g = JSON.parse(editData);
        if(document.getElementById("formAction")) document.getElementById("formAction").value = "edit";
        if(document.getElementById("product-id-input")) document.getElementById("product-id-input").value = g.id;
        if(document.getElementById("product-img")) document.getElementById("product-img").src = g.product.img;
        if(document.getElementById("product-title-input")) document.getElementById("product-title-input").value = g.product.title;
        if(document.getElementById("stocks-input")) document.getElementById("stocks-input").value = g.stock;
        if(document.getElementById("product-price-input")) document.getElementById("product-price-input").value = g.price;
        if(document.getElementById("orders-input")) document.getElementById("orders-input").value = g.orders;
    }

    Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener("submit", function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                // Logic for saving to sessionStorage...
                window.location.replace("apps-ecommerce-products.html");
            }
            form.classList.add("was-validated");
        }, false);
    });
}();