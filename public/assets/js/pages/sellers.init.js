// 1. Helper for theme colors (Velzon Standard)
function getChartColorsArray(e) {
    if (null !== document.getElementById(e)) {
        var t = "data-colors" + ("-" + document.documentElement.getAttribute("data-theme") ?? ""),
            t = document.getElementById(e).getAttribute(t) ?? document.getElementById(e).getAttribute("data-colors");
        if (t) return (t = JSON.parse(t)).map(function(e) {
            var t = e.replace(" ", "");
            return -1 === t.indexOf(",") ? getComputedStyle(document.documentElement).getPropertyValue(t) || t : 2 == (e = e.split(",")).length ? "rgba(" + getComputedStyle(document.documentElement).getPropertyValue(e[0]) + "," + e[1] + ")" : t
        });
    }
}

// 2. Chart initialization
function loadCharts() {
    var chartIds = ["chart-seller1", "chart-seller2", "chart-seller3", "chart-seller4", "chart-seller5", "chart-seller6", "chart-seller7", "chart-seller8"];
    var chartData = [
        [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
        [12, 14, 2, 47, 42, 15, 35, 75, 20, 67, 89],
        [45, 20, 8, 42, 30, 5, 35, 79, 22, 54, 64],
        [26, 15, 48, 12, 47, 19, 35, 19, 85, 68, 50],
        [60, 67, 12, 49, 6, 78, 63, 51, 33, 8, 16],
        [78, 63, 51, 33, 8, 16, 60, 67, 12, 49],
        [15, 35, 75, 20, 67, 8, 42, 30, 5, 35],
        [45, 32, 68, 55, 36, 10, 48, 25, 74, 54]
    ];

    chartIds.forEach(function(id, index) {
        var colors = getChartColorsArray(id);
        if (colors) {
            var options = {
                series: [{ data: chartData[index] }],
                chart: { type: "area", height: 50, sparkline: { enabled: !0 } },
                fill: { type: "gradient", gradient: { shadeIntensity: 1, inverseColors: !1, opacityFrom: .45, opacityTo: .05, stops: [20, 100, 100, 100] } },
                stroke: { curve: "smooth", width: 2 },
                colors: colors,
                tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, y: { title: { formatter: function(e) { return "" } } }, marker: { show: !1 } }
            };
            var chartContainer = document.querySelector("#" + id);
            if (chartContainer) {
                chartContainer.innerHTML = ''; // Clear existing
                new ApexCharts(chartContainer, options).render();
            }
        }
    });
}

// 3. Full Data Array with Laravel Asset URL Support
var assetUrl = window.ASSET_URL || "";

var sellerListData = [
    { "id": 1, "trending": true, "shop": [{ "name": "Force Medicines", "img": assetUrl + "assets/images/companies/img-1.png" }], "seller": "David Marshall", "stock": "452", "wallet_balance": "$45,415", "chartColor": "--vz-success", "category": "Health" },
    { "id": 2, "trending": false, "shop": [{ "name": "Micro Design", "img": assetUrl + "assets/images/companies/img-2.png" }], "seller": "Nancy Martino", "stock": "125", "wallet_balance": "$12,112", "chartColor": "--vz-danger", "category": "Design" },
    { "id": 3, "trending": false, "shop": [{ "name": "Swift Softwares", "img": assetUrl + "assets/images/companies/img-3.png" }], "seller": "Alexis Enos", "stock": "348", "wallet_balance": "$24,796", "chartColor": "--vz-success", "category": "Software" },
    { "id": 4, "trending": true, "shop": [{ "name": "iTest Factory", "img": assetUrl + "assets/images/companies/img-4.png" }], "seller": "James Price", "stock": "159", "wallet_balance": "$15,478", "chartColor": "--vz-success", "category": "Manufacturing" },
    { "id": 5, "trending": false, "shop": [{ "name": "Full Brackets", "img": assetUrl + "assets/images/companies/img-5.png" }], "seller": "Gerry Sutherland", "stock": "212", "wallet_balance": "$18,245", "chartColor": "--vz-danger", "category": "Software" },
    { "id": 6, "trending": false, "shop": [{ "name": "Digi Royal", "img": assetUrl + "assets/images/companies/img-6.png" }], "seller": "Emma Smith", "stock": "632", "wallet_balance": "$35,124", "chartColor": "--vz-success", "category": "Merchandising" },
    { "id": 7, "trending": true, "shop": [{ "name": "Zoetic Fashion", "img": assetUrl + "assets/images/companies/img-7.png" }], "seller": "William Brown", "stock": "425", "wallet_balance": "$21,452", "chartColor": "--vz-success", "category": "Fashion" },
    { "id": 8, "trending": false, "shop": [{ "name": "Star Dust", "img": assetUrl + "assets/images/companies/img-8.png" }], "seller": "Linda Rice", "stock": "184", "wallet_balance": "$14,520", "chartColor": "--vz-danger", "category": "Merchandising" }
];

var prevButton = document.getElementById("page-prev"),
    nextButton = document.getElementById("page-next"),
    currentPage = 1,
    itemsPerPage = 8;

// 4. Render Logic
function loadSellerList(e, t) {
    var r = Math.ceil(e.length / itemsPerPage);
    if (r < (t = t < 1 ? 1 : t)) t = r;
    
    var listContainer = document.getElementById("seller-list");
    if(listContainer) {
        listContainer.innerHTML = "";
        for (var n = (t - 1) * itemsPerPage; n < t * itemsPerPage && n < e.length; n++) {
            if (e[n]) {
                var a = e[n].trending ? '<div class="ribbon ribbon-info ribbon-shape trending-ribbon"><i class="ri-flashlight-fill text-white align-bottom"></i> <span class="trending-ribbon-text">Trending</span></div>' : "";
                listContainer.innerHTML += '<div class="col-xl-3 col-lg-6"><div class="card ribbon-box right overflow-hidden"><div class="card-body text-center p-4">' + a + '<img src="' + e[n].shop[0].img + '" alt="" height="45"><h5 class="mb-1 mt-4"><a href="apps-ecommerce-seller-details.html" class="link-primary">' + e[n].shop[0].name + '</a></h5><p class="text-muted mb-4">' + e[n].seller + '</p><div class="row justify-content-center"><div class="col-lg-8"><div id="chart-seller' + e[n].id + '" data-colors=\'["' + e[n].chartColor + '"]\'></div></div></div><div class="row mt-4"><div class="col-lg-6 border-end-dashed border-end"><h5>' + e[n].stock + '</h5><span class="text-muted">Item Stock</span></div><div class="col-lg-6"><h5>' + e[n].wallet_balance + '</h5><span class="text-muted">Wallet Balance</span></div></div><div class="mt-4"><a href="apps-ecommerce-seller-details.html" class="btn btn-light w-100">View Details</a></div></div></div></div>';
            }
        }
    }
    pageEvent(e);
    loadCharts();
}

function pageEvent(e) {
    var r = Math.ceil(e.length / itemsPerPage);
    var paginationElement = document.getElementById("pagination-element");
    if (paginationElement) paginationElement.style.display = e.length == 0 ? "none" : "flex";
    
    var noResult = document.getElementById("noresult");
    if (noResult) noResult.classList.toggle("d-none", e.length > 0);
    
    var t = document.getElementById("page-num");
    if (t) {
        t.innerHTML = "";
        for (var a = 1; a <= r; a++) t.innerHTML += "<div class='page-item " + (a == currentPage ? "active" : "") + "'><a class='page-link clickPageNumber' href='javascript:void(0);'>" + a + "</a></div>";
    }
}

// 5. Initialize
loadSellerList(sellerListData, currentPage);

// 6. Search and Filters
var searchInput = document.getElementById("searchResultList");
if (searchInput) {
    searchInput.addEventListener("keyup", function() {
        var val = this.value.toLowerCase();
        loadSellerList(sellerListData.filter(e => e.shop[0].name.toLowerCase().includes(val) || e.seller.toLowerCase().includes(val)), 1);
    });
}

var categorySelect = document.getElementById("category-select");
if (categorySelect) {
    var categoryInput = new Choices(categorySelect, { searchEnabled: false });
    categoryInput.passedElement.element.addEventListener("change", function(e) {
        loadSellerList(e.detail.value !== "All" ? sellerListData.filter(i => i.category == e.detail.value) : sellerListData, 1);
    }, false);
}