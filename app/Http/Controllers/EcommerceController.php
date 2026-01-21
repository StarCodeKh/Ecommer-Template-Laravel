<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EcommerceController extends Controller
{
    public function products()
    {
        return view('apps.ecommerce.products');
    }

    public function productDetails()
    {
        return view('apps.ecommerce.product-details');
    }

    public function addProduct()
    {
        return view('apps.ecommerce.add-product');
    }

    public function orders()
    {
        return view('apps.ecommerce.orders');
    }

    public function orderDetails()
    {
        return view('apps.ecommerce.order-details');
    }

    public function customers()
    {
        return view('apps.ecommerce.customers');
    }

    public function cart()
    {
        return view('apps.ecommerce.cart');
    }

    public function checkout()
    {
        return view('apps.ecommerce.checkout');
    }

    public function sellerDetails()
    {
        return view('apps.ecommerce.seller-details');
    }

    public function sellers()
    {
        return view('apps.ecommerce.sellers');
    }
}