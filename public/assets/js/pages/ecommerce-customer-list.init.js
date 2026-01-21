/**
 * Velzon Ecommerce Customer List - Complete Integrated Implementation
 */

// 1. Global Variables & Data
var checkAll = document.getElementById("checkAll");
var perPage = 8;
var editlist = false;
var itemId; 
var customerList;
var statusVal; 

var initialData = [
    { id: "12", customer_name: "Timothy Smith", email: "tim@velzon.com", phone: "973-277-6950", date: "13 Dec, 2021", status: "Active" },
    { id: "11", customer_name: "Herbert Stokes", email: "herbert@velzon.com", phone: "312-944-1448", date: "20 Jul, 2021", status: "Block" },
    { id: "10", customer_name: "Charles Kubik", email: "charles@velzon.com", phone: "231-480-8536", date: "25 Sep, 2021", status: "Block" },
    { id: "09", customer_name: "Glen Matney", email: "glen@velzon.com", phone: "515-395-1069", date: "02 Nov, 2021", status: "Active" },
    { id: "08", customer_name: "Carolyn Jones", email: "carolyn@velzon.com", phone: "414-453-5725", date: "07 Jun, 2021", status: "Active" },
    { id: "07", customer_name: "Kevin Dawson", email: "kevin@velzon.com", phone: "213-741-4294", date: "14 Mar, 2021", status: "Active" },
    { id: "06", customer_name: "Jonas Edward", email: "jonas@velzon.com", phone: "123-456-7890", date: "10 Jan, 2022", status: "Active" },
    { id: "05", customer_name: "Anna Adame", email: "anna@velzon.com", phone: "543-210-9876", date: "22 Feb, 2022", status: "Block" },
    { id: "04", customer_name: "Dora Repreher", email: "dora@velzon.com", phone: "111-222-3333", date: "15 May, 2022", status: "Active" },
    { id: "03", customer_name: "John Doe", email: "john@velzon.com", phone: "444-555-6666", date: "01 Jun, 2022", status: "Active" },
    { id: "02", customer_name: "Mary Smith", email: "mary@velzon.com", phone: "777-888-9999", date: "12 Aug, 2022", status: "Block" },
    { id: "01", customer_name: "Alex Walker", email: "alex@velzon.com", phone: "000-111-2222", date: "30 Dec, 2022", status: "Active" }
];

document.addEventListener("DOMContentLoaded", function () {
    
    // 2. Initialize List.js
    customerList = new List("customerList", {
        valueNames: ["checkbox", "id", "customer_name", "email", "date", "phone", "status", "action"],
        page: perPage,
        pagination: true
    });

    // 3. Load JSON Data
    customerList.clear(); 
    initialData.forEach(function (item) {
        addCustomerRow(item);
    });
    customerList.sort("id", { order: "desc" });

    // 4. Update Event (Pagination & Re-binding)
    customerList.on("updated", function (list) {
        var isFirstPage = list.i == 1;
        var isLastPage = list.i > list.matchingItems.length - list.page;
        
        document.querySelector(".pagination-prev")?.classList.toggle("disabled", isFirstPage);
        document.querySelector(".pagination-next")?.classList.toggle("disabled", isLastPage);

        refreshCallbacks();
        ischeckboxcheck();
    });

    // 5. Header Checkbox Logic
    if (checkAll) {
        checkAll.onclick = function () {
            var checkboxes = document.querySelectorAll('.form-check-all input[type="checkbox"]');
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = checkAll.checked;
                var row = checkbox.closest("tr");
                if (row) {
                    checkbox.checked ? row.classList.add("table-active") : row.classList.remove("table-active");
                }
            });
            updateDeleteBtnVisibility();
        };
    }

    // 6. Choices.js for Status
    var statusField = document.getElementById("status-field");
    if(statusField) statusVal = new Choices(statusField, { searchEnabled: false });

    refreshCallbacks();
    ischeckboxcheck();
});

// Helper to add row
function addCustomerRow(item) {
    customerList.add({
        checkbox: '<div class="form-check"><input class="form-check-input" type="checkbox" name="chk_child" value="' + item.id + '"></div>',
        id: '<a href="javascript:void(0);" class="fw-medium link-primary">#KH' + item.id + '</a>',
        customer_name: item.customer_name,
        email: item.email,
        date: item.date,
        phone: item.phone,
        status: isStatus(item.status),
        action: `<ul class="list-inline hstack gap-2 mb-0">
            <li class="list-inline-item edit"><a href="#showModal" data-bs-toggle="modal" class="text-primary d-inline-block edit-item-btn"><i class="ri-pencil-fill fs-16"></i></a></li>
            <li class="list-inline-item"><a class="text-danger d-inline-block remove-item-btn" data-bs-toggle="modal" href="#deleteRecordModal"><i class="ri-delete-bin-5-fill fs-16"></i></a></li>
        </ul>`
    });
}

// 7. Refreshing Callbacks (Edit/Delete)
function refreshCallbacks() {
    // Edit
    document.querySelectorAll(".edit-item-btn").forEach(btn => {
        btn.onclick = function (e) {
            editlist = true;
            document.getElementById("exampleModalLabel").innerText = "Edit Customer";
            var row = e.target.closest("tr"); 
            itemId = row.querySelector(".id").innerHTML; // Get exact HTML for matching
            var itemData = customerList.get("id", itemId)[0].values();

            document.getElementById("customername-field").value = itemData.customer_name;
            document.getElementById("email-field").value = itemData.email;
            document.getElementById("phone-field").value = itemData.phone;
            document.getElementById("date-field").value = itemData.date;

            var textStatus = new DOMParser().parseFromString(itemData.status, 'text/html').body.textContent.trim();
            if(statusVal) statusVal.setChoiceByValue(textStatus);
            document.getElementById("add-btn").innerText = "Update";
        };
    });

    // Single Delete
    document.querySelectorAll(".remove-item-btn").forEach(btn => {
        btn.onclick = function (e) {
            var row = e.target.closest("tr");
            var idToRemove = row.querySelector(".id").innerHTML; // Capture exact HTML
            
            document.getElementById("delete-record").onclick = function() {
                customerList.remove("id", idToRemove);
                document.getElementById("deleteRecord-close").click();
                customerList.update();
                if (checkAll) checkAll.checked = false;
                updateDeleteBtnVisibility();
            };
        };
    });
}

// 8. Bulk Delete Logic
function deleteMultiple() {
    ids_array = [];
    var e, t = document.getElementsByName("chk_child");
    for (i = 0; i < t.length; i++) 1 == t[i].checked && (e = t[i].parentNode.parentNode.parentNode.querySelector("td a").innerHTML, ids_array.push(e));
    "undefined" != typeof ids_array && 0 < ids_array.length ? Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        customClass: {
            confirmButton: "btn btn-primary w-xs me-2 mt-2",
            cancelButton: "btn btn-danger w-xs mt-2"
        },
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: !1,
        showCloseButton: !0
    }).then(function(e) {
        if (e.value) {
            for (i = 0; i < ids_array.length; i++) customerList.remove("id", `<a href="javascript:void(0);" class="fw-medium link-primary">${ids_array[i]}</a>`);
            document.getElementById("remove-actions").style.display = "none", document.getElementById("checkAll").checked = !1, Swal.fire({
                title: "Deleted!",
                text: "Your data has been deleted.",
                icon: "success",
                customClass: {
                    confirmButton: "btn btn-info w-xs mt-2"
                },
                buttonsStyling: !1
            })
        }
    }) : Swal.fire({
        title: "Please select at least one checkbox",
        customClass: {
            confirmButton: "btn btn-info"
        },
        buttonsStyling: !1,
        showCloseButton: !0
    })
}

// 9. Utility Helpers
function isStatus(val) {
    if (val.includes("Active")) return '<span class="badge bg-success-subtle text-success text-uppercase">Active</span>';
    if (val.includes("Block")) return '<span class="badge bg-danger-subtle text-danger text-uppercase">Block</span>';
    return `<span class="badge bg-success-subtle text-success text-uppercase">${val}</span>`;
}

function ischeckboxcheck() {
    document.getElementsByName("chk_child").forEach(function (checkbox) {
        checkbox.onclick = function () {
            var row = checkbox.closest("tr");
            checkbox.checked ? row.classList.add("table-active") : row.classList.remove("table-active");
            
            var total = document.getElementsByName("chk_child").length;
            var checked = document.querySelectorAll('input[name="chk_child"]:checked').length;
            if (checkAll) checkAll.checked = (total === checked && total > 0);
            
            updateDeleteBtnVisibility();
        };
    });
}

function updateDeleteBtnVisibility() {
    var checkedCount = document.querySelectorAll('input[name="chk_child"]:checked').length;
    var removeActions = document.getElementById("remove-actions");
    if (removeActions) removeActions.style.display = (checkedCount > 0) ? "block" : "none";
}

// 10. Form Submission (Add/Update)
document.querySelector(".tablelist-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("customername-field").value;
    var email = document.getElementById("email-field").value;
    var date = document.getElementById("date-field").value;
    var phone = document.getElementById("phone-field").value;
    var status = document.getElementById("status-field").value;

    if (!editlist) {
        addCustomerRow({
            id: Math.floor(Math.random() * 100).toString(),
            customer_name: name, email: email, date: date, phone: phone, status: status
        });
    } else {
        var item = customerList.get("id", itemId)[0];
        item.values({ 
            customer_name: name, email: email, date: date, phone: phone, status: isStatus(status) 
        });
        editlist = false;
    }
    document.getElementById("close-modal").click();
    customerList.update();
    e.target.reset();
});

// 11. Flatpickr for Date Range
document.addEventListener("DOMContentLoaded", () => {
  window.flatpickrInstance = flatpickr("#datepicker-range", {
    mode: "range",
    dateFormat: "Y-m-d",
    onClose: SearchData,
  });
});

// 12. Choices.js for Status Filter
document.addEventListener("DOMContentLoaded", () => {
  window.statusChoice = new Choices('#idStatus', {
    searchEnabled: false,
    shouldSort: false,
  });
});

// 13. Status Filter
function SearchData() {
    const statusFilter = window.statusChoice.getValue(true);
    customerList.filter(item => {
        const textStatus = new DOMParser().parseFromString(item.values().status, 'text/html').body.textContent.trim();
        return statusFilter === "all" || textStatus === statusFilter;
    });
    customerList.update();
}
