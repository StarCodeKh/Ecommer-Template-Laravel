/*
* Ecommerce Order List - Complete Implementation
* Features: Local Data, Delete Multiple, Edit (Flatpickr Fix), Range Filter (Fix)
*/

document.addEventListener("DOMContentLoaded", function () {

    // 1. Date Formatter
    var str_dt = function(e) {
        var e = new Date(e),
            t = (e.getHours() + ":" + e.getMinutes()).split(":"),
            a = 12 <= (n = t[0]) ? "PM" : "AM",
            n = (n %= 12) || 12,
            t = (t = t[1]) < 10 ? "0" + t : t;
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var month = months[e.getMonth()];
        var day = e.getDate() < 10 ? "0" + e.getDate() : e.getDate();
        var year = e.getFullYear();
        return day + " " + month + ", " + year + " <small class='text-muted'>" + n + ":" + t + " " + a + "</small>";
    };

    // 2. Status Badge Helper
    function isStatus(e) {
        switch (e) {
            case "Delivered":
                return '<span class="badge bg-success-subtle text-success text-uppercase">' + e + "</span>";
            case "Cancelled":
                return '<span class="badge bg-danger-subtle text-danger text-uppercase">' + e + "</span>";
            case "Inprogress":
                return '<span class="badge bg-secondary-subtle text-secondary text-uppercase">' + e + "</span>";
            case "Pickups":
                return '<span class="badge bg-info-subtle text-info text-uppercase">' + e + "</span>";
            case "Returns":
                return '<span class="badge bg-primary-subtle text-primary text-uppercase">' + e + "</span>";
            case "Pending":
                return '<span class="badge bg-warning-subtle text-warning text-uppercase">' + e + "</span>";
            default:
                return '<span class="badge bg-primary-subtle text-primary text-uppercase">' + e + "</span>";
        }
    }

    // 3. Initialize Choices.js
    var isChoiceEl = document.getElementById("idStatus"),
        choices = new Choices(isChoiceEl, { searchEnabled: !1 }),
        isPaymentEl = document.getElementById("idPayment"),
        choices = new Choices(isPaymentEl, { searchEnabled: !1 });

    // 4. Header Checkbox Logic
    var checkAll = document.getElementById("checkAll");
    if (checkAll) {
        checkAll.onclick = function() {
            var checkboxes = document.querySelectorAll('.form-check-all input[type="checkbox"]');
            var checkedCount = document.querySelectorAll('.form-check-all input[type="checkbox"]:checked').length;
            
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = this.checked;
                if (checkboxes[i].checked) {
                    checkboxes[i].closest("tr").classList.add("table-active");
                } else {
                    checkboxes[i].closest("tr").classList.remove("table-active");
                }
            }
            
            // Show/Hide Delete Button
            var removeActions = document.getElementById("remove-actions");
            if(removeActions) {
                removeActions.style.display = (this.checked && checkboxes.length > 0) ? "block" : "none";
            }
        };
    }

    // 5. Initialize List.js
    var perPage = 8,
        editlist = !1,
        options = {
            valueNames: ["id", "customer_name", "product_name", "date", "amount", "payment", "status"],
            page: perPage,
            pagination: !0,
            plugins: [ListPagination({ left: 2, right: 2 })]
        };

    var orderList = new List("orderList", options).on("updated", function(list) {
        // Handle No Results
        if (list.matchingItems.length == 0) {
            document.getElementsByClassName("noresult")[0].style.display = "block";
        } else {
            document.getElementsByClassName("noresult")[0].style.display = "none";
        }

        // Handle Pagination Buttons
        var isFirst = list.i == 1;
        var isLast = list.i > list.matchingItems.length - list.page;
        
        if (document.querySelector(".pagination-prev.disabled")) document.querySelector(".pagination-prev.disabled").classList.remove("disabled");
        if (document.querySelector(".pagination-next.disabled")) document.querySelector(".pagination-next.disabled").classList.remove("disabled");
        
        if (isFirst) document.querySelector(".pagination-prev").classList.add("disabled");
        if (isLast) document.querySelector(".pagination-next").classList.add("disabled");

        if (list.matchingItems.length <= perPage) {
            document.querySelector(".pagination-wrap").style.display = "none";
        } else {
            document.querySelector(".pagination-wrap").style.display = "flex";
        }
        
        if (list.matchingItems.length > 0) {
            document.getElementsByClassName("noresult")[0].style.display = "none";
        } else {
            document.getElementsByClassName("noresult")[0].style.display = "block";
        }

        // --- PICKUPS COUNTER ---
        var pickupCount = list.items.filter(function(item) {
            return item.values().status.includes("Pickups");
        }).length;

        var badge = document.getElementById("pickups-count");
        if (badge) {
            badge.innerHTML = pickupCount;
        }
        
        // Re-bind click events
        refreshCallbacks();
        ischeckboxcheck();
    });

    // 6. LOAD DATA
    var allOrders = [
        {
            "id": "2101",
            "customer_name": "Frank Hook",
            "product_name": "Puma Tshirt",
            "date": "2021-12-20T02:21:00",
            "amount": "$654",
            "payment": "Mastercard",
            "status": "Pending"
        },
        {
            "id": "2102",
            "customer_name": "Rickey Casillas",
            "product_name": "Adidas Sneakers",
            "date": "2022-01-05T13:45:00",
            "amount": "$120",
            "payment": "Visa",
            "status": "Pickups" 
        },
    ];

    orderList.clear(); 

    allOrders.forEach(function(e) {
        orderList.add({
            id: '<a href="apps-ecommerce-order-details.html" class="fw-medium link-primary">#KH' + e.id + "</a>",
            customer_name: e.customer_name,
            product_name: e.product_name,
            date: str_dt(e.date),
            amount: e.amount,
            payment: e.payment,
            status: isStatus(e.status)
        });
    });

    orderList.sort("id", { order: "desc" });
    refreshCallbacks();

    // 7. Form Elements
    var idField = document.getElementById("orderId"),
        customerNameField = document.getElementById("customername-field"),
        productNameField = document.getElementById("productname-field"),
        dateField = document.getElementById("date-field"),
        amountField = document.getElementById("amount-field"),
        paymentField = document.getElementById("payment-field"),
        statusField = document.getElementById("delivered-status"),
        addBtn = document.getElementById("add-btn"),
        example = null, 
        statusVal = new Choices(statusField),
        productnameVal = new Choices(productNameField);

    // --- MODAL DATE PICKER ---
    var datePicker = flatpickr("#date-field", {
        enableTime: true,
        dateFormat: "d M, Y, h:i K",
        defaultDate: new Date(),
    });

    // --- RANGE DATE PICKER (HEADER FILTER) ---
    flatpickr("#demo-datepicker", {
        mode: "range",
        dateFormat: "d M, Y",
        onChange: function(selectedDates, dateStr, instance) {
            SearchData();
        }
    });

    // 8. Filter Tabs Logic
    var tabEl = document.querySelectorAll('a[data-bs-toggle="tab"]');
    Array.from(tabEl).forEach(function(e) {
        e.addEventListener("shown.bs.tab", function(e) {
            var filterVal = e.target.id;
            if(filterVal === "All"){
                 orderList.filter();
            } else {
                orderList.filter(function(item) {
                    var statusHTML = item.values().status;
                    var statusText = new DOMParser().parseFromString(statusHTML, "text/html").body.textContent.trim();
                    return statusText === filterVal;
                });
            }
        });
    });

    // 9. Modal Show/Hide Events
    document.getElementById("showModal").addEventListener("show.bs.modal", function(e) {
        if (e.relatedTarget.classList.contains("edit-item-btn")) {
            document.getElementById("exampleModalLabel").innerHTML = "Edit Order";
            document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
            document.getElementById("add-btn").innerHTML = "Update";
        } else if (e.relatedTarget.classList.contains("add-btn")) {
            document.getElementById("modal-id").style.display = "none";
            document.getElementById("exampleModalLabel").innerHTML = "Add Order";
            document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
            document.getElementById("add-btn").innerHTML = "Add Order";
        } else {
            document.getElementById("exampleModalLabel").innerHTML = "List Order";
            document.getElementById("showModal").querySelector(".modal-footer").style.display = "none";
        }
    });

    document.getElementById("showModal").addEventListener("hidden.bs.modal", function() {
        clearFields();
    });

    // 10. Search Data (Filter)
    window.SearchData = function() {
        var s = document.getElementById("idStatus").value;
        var r = document.getElementById("idPayment").value;
        var i = document.getElementById("demo-datepicker").value;
        
        var d = i.split(" to ")[0];
        var o = i.split(" to ")[1];

        orderList.filter(function(e) {
            var statusRaw = new DOMParser().parseFromString(e.values().status, "text/html").body.textContent.trim();
            var paymentRaw = e.values().payment;
            var dateRaw = e.values().date; // "20 Jan, 2021 <small>..."
            
            // Clean date for comparison
            var cleanDateStr = new DOMParser().parseFromString(dateRaw, "text/html").body.textContent.trim();
            var rowDate = new Date(cleanDateStr);

            var matchStatus = (s === "all" || s === "" || statusRaw === s);
            var matchPayment = (r === "all" || r === "" || paymentRaw === r);
            var matchDate = true;

            if (d && o) {
                var startDate = new Date(d);
                var endDate = new Date(o);
                startDate.setHours(0,0,0,0);
                endDate.setHours(23,59,59,999);
                rowDate.setHours(0,0,0,0);

                matchDate = (rowDate >= startDate && rowDate <= endDate);
            }

            return matchStatus && matchPayment && matchDate;
        });
        
        orderList.update();
    };

    // 11. Add / Edit Form Submit
    var count = 2103;
    var forms = document.querySelectorAll(".tablelist-form");

    Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener("submit", function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            e.preventDefault();

            var customerName = customerNameField.value;
            var productName = productNameField.value;
            var dateVal = dateField.value;
            var amountVal = amountField.value;
            var paymentVal = paymentField.value;
            var statusVal = statusField.value;

            if (customerName !== "" && productName !== "" && dateVal !== "" && amountVal !== "" && paymentVal !== "" && !editlist) {
                // ADD NEW
                orderList.add({
                    id: '<a href="apps-ecommerce-order-details.html" class="fw-medium link-primary">#KH' + count + "</a>",
                    customer_name: customerName,
                    product_name: productName,
                    date: dateVal,
                    amount: "$" + amountVal,
                    payment: paymentVal,
                    status: isStatus(statusVal)
                });
                orderList.sort("id", { order: "desc" });
                document.getElementById("close-modal").click();
                refreshCallbacks();
                clearFields();
                count++;
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Order inserted successfully!",
                    showConfirmButton: !1,
                    timer: 2e3,
                    showCloseButton: !0
                });
            } else if (customerName !== "" && productName !== "" && dateVal !== "" && amountVal !== "" && paymentVal !== "" && editlist) {
                // EDIT EXISTING
                var editId = idField.value;
                var item = orderList.get("id", '<a href="apps-ecommerce-order-details.html" class="fw-medium link-primary">' + editId + "</a>");
                
                if(item && item.length > 0) {
                     item[0].values({
                        id: '<a href="apps-ecommerce-order-details.html" class="fw-medium link-primary">' + editId + "</a>",
                        customer_name: customerName,
                        product_name: productName,
                        date: dateVal,
                        amount: amountVal,
                        payment: paymentVal,
                        status: isStatus(statusVal)
                    });
                }

                document.getElementById("close-modal").click();
                clearFields();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Order updated Successfully!",
                    showConfirmButton: !1,
                    timer: 2e3,
                    showCloseButton: !0
                });
            }
        });
        
        if(paymentField) example = new Choices(paymentField, { searchEnabled: false });
    });

    // 12. Helper: Checkbox change event
    function ischeckboxcheck() {
        Array.from(document.querySelectorAll('input[name="checkAll"]')).forEach(function(a) {
            a.addEventListener("change", function(e) {
                if (a.checked) {
                    e.target.closest("tr").classList.add("table-active");
                } else {
                    e.target.closest("tr").classList.remove("table-active");
                }
                
                var checkedCount = document.querySelectorAll('[name="checkAll"]:checked').length;
                var removeBtn = document.getElementById("remove-actions");
                if(removeBtn) removeBtn.style.display = checkedCount > 0 ? "block" : "none";
            });
        });
    }

    // 13. Helper: Refresh Event Listeners (Edit/Delete)
    function refreshCallbacks() {
        // Delete Single
        var removeBtns = document.getElementsByClassName("remove-item-btn");
        Array.from(removeBtns).forEach(function(btn) {
            btn.addEventListener("click", function(e) {
                var tr = e.target.closest("tr");
                var idColumnHTML = tr.querySelector(".id").innerHTML; 
                
                document.getElementById("delete-record").onclick = function() {
                    orderList.remove("id", idColumnHTML);
                    document.getElementById("deleteRecord-close").click();
                };
            });
        });

        // Edit Single
        var editBtns = document.getElementsByClassName("edit-item-btn");
        Array.from(editBtns).forEach(function(btn) {
            btn.addEventListener("click", function(e) {
                var tr = e.target.closest("tr");
                var idHTML = tr.querySelector(".id").innerHTML;
                
                var idText = new DOMParser().parseFromString(idHTML, "text/html").body.textContent;
                var itemData = orderList.get("id", idHTML)[0]._values;

                editlist = true;
                idField.value = idText;
                customerNameField.value = itemData.customer_name;
                amountField.value = itemData.amount;

                // Set Choices
                if (example) example.destroy();
                example = new Choices(paymentField, { searchEnabled: false });
                example.setChoiceByValue(itemData.payment);

                if (productnameVal) productnameVal.destroy();
                productnameVal = new Choices(productNameField, { searchEnabled: false });
                productnameVal.setChoiceByValue(itemData.product_name);

                if (statusVal) statusVal.destroy();
                statusVal = new Choices(statusField, { searchEnabled: false });
                var statusText = new DOMParser().parseFromString(itemData.status, "text/html").body.textContent;
                statusVal.setChoiceByValue(statusText);
                
                // Update Modal Date Picker
                if(datePicker) {
                    var cleanDate = new DOMParser().parseFromString(itemData.date, "text/html").body.textContent;
                    datePicker.setDate(cleanDate);
                }
            });
        });
    }

    function clearFields() {
        customerNameField.value = "";
        productNameField.value = "";
        dateField.value = "";
        amountField.value = "";
        paymentField.value = "";
        
        if(datePicker) datePicker.setDate(new Date());
        
        if (example) { example.destroy(); example = new Choices(paymentField, { searchEnabled: false }); }
        if (productnameVal) { productnameVal.destroy(); productnameVal = new Choices(productNameField, { searchEnabled: false }); }
        if (statusVal) { statusVal.destroy(); statusVal = new Choices(statusField, { searchEnabled: false }); }
    }

    // 14. Delete Multiple Function
    var removeActionsBtn = document.getElementById("remove-actions");
    if (removeActionsBtn) {
        removeActionsBtn.addEventListener("click", function() {
            var ids_array = [];
            var checkboxes = document.querySelectorAll('.form-check-all input[type="checkbox"]:checked');
            
            checkboxes.forEach(function(checkbox) {
                var tr = checkbox.closest("tr");
                if (tr) {
                    var idHTML = tr.querySelector(".id").innerHTML;
                    ids_array.push(idHTML);
                }
            });

            if (ids_array.length > 0) {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "Close",
                    customClass: {
                        confirmButton: "btn btn-primary w-xs me-2 mt-2",
                        cancelButton: "btn btn-danger w-xs mt-2"
                    },
                    buttonsStyling: false,
                    showCloseButton: true
                }).then(function(result) {
                    if (result.value) {
                        ids_array.forEach(function(idHTML) {
                            orderList.remove("id", idHTML);
                        });
                        
                        document.getElementById("remove-actions").style.display = "none";
                        document.getElementById("checkAll").checked = false;
                        
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your data has been deleted.",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-info w-xs mt-2"
                            },
                            buttonsStyling: false
                        });
                    }
                });
            } else {
                Swal.fire({
                    title: "Please select at least one checkbox",
                    icon: "info",
                    customClass: {
                        confirmButton: "btn btn-info"
                    },
                    buttonsStyling: false,
                    showCloseButton: true
                });
            }
        });
    }

    // 15. Pagination Click Listeners
    var nextBtn = document.querySelector(".pagination-next");
    var prevBtn = document.querySelector(".pagination-prev");
    
    if(nextBtn) {
        nextBtn.addEventListener("click", function() {
            var activePage = document.querySelector(".pagination.listjs-pagination .active");
            if(activePage && activePage.nextElementSibling) {
                activePage.nextElementSibling.children[0].click();
            }
        });
    }
    
    if(prevBtn) {
        prevBtn.addEventListener("click", function() {
            var activePage = document.querySelector(".pagination.listjs-pagination .active");
            if(activePage && activePage.previousElementSibling) {
                activePage.previousElementSibling.children[0].click();
            }
        });
    }
});