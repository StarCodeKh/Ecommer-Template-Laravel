<?php

return [
    'menu' => [
        [
            'title'  => 'Dashboards',
            'icon'   => 'ri-dashboard-2-line',
            'id'     => 'sidebarDashboards',
            'key'    => 't-dashboards',
            'active' => ['home', 'dashboard*'], 
            'submenu' => [
                ['route' => 'home', 'label' => 'Ecommerce', 'key' => 't-ecommerce']
            ]
        ],
        [
            'title'  => 'Apps',
            'icon'   => 'ri-apps-2-line',
            'id'     => 'sidebarApps',
            'key'    => 't-apps',
            'active' => ['apps-ecommerce*', 'apps-invoices*'],
            'submenu' => [
                [
                    'title'  => 'Ecommerce',
                    'id'     => 'sidebarEcommerce',
                    'key'    => 't-ecommerce',
                    'active' => ['apps-ecommerce*'],
                    'items'  => [
                        ['route' => 'apps-ecommerce/products',        'label' => 'Products',        'key' => 't-products'],
                        ['route' => 'apps-ecommerce/product-details', 'label' => 'Product Details', 'key' => 't-product-details'],
                        ['route' => 'apps-ecommerce/add-product',     'label' => 'Create Product',  'key' => 't-create-product'],
                        ['route' => 'apps-ecommerce/orders',          'label' => 'Orders',          'key' => 't-orders'],
                        ['route' => 'apps-ecommerce/order-details',   'label' => 'Order Details',   'key' => 't-order-details'],
                        ['route' => 'apps-ecommerce/customers',       'label' => 'Customers',       'key' => 't-customers'],
                        ['route' => 'apps-ecommerce/cart',            'label' => 'Shopping Cart',   'key' => 't-shopping-cart'],
                        ['route' => 'apps-ecommerce/checkout',        'label' => 'Checkout',        'key' => 't-checkout'],
                        ['route' => 'apps-ecommerce/sellers',         'label' => 'Sellers',         'key' => 't-sellers'],
                        ['route' => 'apps-ecommerce/seller-details',  'label' => 'Seller Details',  'key' => 't-sellers-details'],
                    ]
                ],
                [
                    'title'  => 'Invoices',
                    'id'     => 'sidebarInvoices',
                    'key'    => 't-invoices',
                    'active' => ['apps-invoices*'],
                    'items'  => [
                        ['route' => 'apps-invoices/list',    'label' => 'List View',      'key' => 't-list-view'],
                        ['route' => 'apps-invoices/details', 'label' => 'Details',        'key' => 't-details'],
                        ['route' => 'apps-invoices/create',  'label' => 'Create Invoice', 'key' => 't-create-invoice'],
                    ]
                ]
            ]
        ],
        [
            'title'  => 'Pages',
            'icon'   => 'ri-pages-line',
            'id'     => 'sidebarPages',
            'key'    => 't-pages', // Added key
            'active' => ['pages*'],
            'submenu' => [
                [
                    'title'  => 'Profile',
                    'id'     => 'sidebarProfile',
                    'key'    => 't-profile',
                    'active' => ['pages/*'],
                    'items'  => [
                        ['route' => 'pages/profile', 'label' => 'Simple Page', 'key' => 't-simple-page'],
                        ['route' => 'pages/settings', 'label' => 'Settings',   'key' => 't-settings'],
                    ]
                ],
                ['route' => 'pages/faqs', 'label' => 'FAQs', 'key' => 't-faqs']
            ]
        ]
    ]
];