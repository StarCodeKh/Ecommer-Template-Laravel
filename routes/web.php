<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('auth.login');
});

Route::group(['middleware'=>'auth'],function()
{
    Route::get('home',function()
    {
        return view('dashboard.home');
    });
    Route::get('home',function()
    {
        return view('dashboard.home');
    });
});

Auth::routes();

Route::group(['namespace' => 'App\Http\Controllers\Auth'],function()
{
    // ----------------------------- login ------------------------------------//
    Route::controller(LoginController::class)->group(function () {
        Route::get('/login', 'login')->name('login');
        Route::post('/login', 'authenticate');
        Route::get('/logout', 'logout')->name('logout');
        Route::get('logout/page', 'logoutPage')->name('logout/page');
    });

    // ----------------------------- register -------------------------------//
    Route::controller(RegisterController::class)->group(function () {
        Route::get('/register', 'register')->name('register');
        Route::post('/register','storeUser')->name('register');    
    });

    // ----------------------------- Forget Password --------------------------//
    Route::controller(ForgotPasswordController::class)->group(function () {
        Route::get('forget-password', 'showLinkRequestForm')->name('forget-password');    
        Route::post('forget-password', 'sendResetLinkEmail')->name('forget-password');    
    });

    // ---------------------------- Reset Password ----------------------------//
    Route::controller(ResetPasswordController::class)->group(function () {
        Route::get('reset-password/{token}', 'getPassword');
        Route::post('reset-password', 'updatePassword')->name('reset-password');    
    });

    // Lock the screen
    Route::get('/lock', function () {
        session(['locked' => true]);
        return redirect()->route('lockscreen')->with('success', 'Locked successfully!');
    })->name('lock-activate');

    Route::controller(LockScreenController::class)->group(function () {
        // ---------------------------- Lock Screen ---------------------------//
        Route::get('lockscreen', 'lockscreen')->name('lockscreen');
        Route::post('unlock',  'unlock')->name('unlock-screen');
    });

});

Route::group(['namespace' => 'App\Http\Controllers'],function()
{
    Route::middleware('auth')->group(function () {
        // --------------------- dashboard ------------------//
        Route::controller(HomeController::class)->group(function () {
            Route::get('home', 'index')->name('home');
        });
    });

    Route::middleware('auth')->group(function () {
        // --------------------- Pages ------------------//
        Route::prefix('pages')->group(function () {
            Route::controller(PagesController::class)->group(function () {
                Route::get('profile', 'profile')->name('pages/profile');
                Route::get('settings', 'settings')->name('pages/settings');
                Route::get('faqs', 'faqs')->name('pages/faqs');
            });
        });
    });

    Route::middleware('auth')->group(function () {
        // --------------------- Ecommerce ------------------//
        Route::prefix('apps-ecommerce')->group(function () {
            Route::controller(EcommerceController::class)->group(function () {
                Route::get('products', 'products')->name('apps-ecommerce/products');
                Route::get('product-details', 'productDetails')->name('apps-ecommerce/product-details');
                Route::get('add-product', 'addProduct')->name('apps-ecommerce/add-product');
                Route::get('orders', 'orders')->name('apps-ecommerce/orders');
                Route::get('order-details', 'orderDetails')->name('apps-ecommerce/order-details');
                Route::get('customers', 'customers')->name('apps-ecommerce/customers');
                Route::get('cart', 'cart')->name('apps-ecommerce/cart');
                Route::get('checkout', 'checkout')->name('apps-ecommerce/checkout');
                Route::get('seller-details', 'sellerDetails')->name('apps-ecommerce/seller-details');
                Route::get('sellers', 'sellers')->name('apps-ecommerce/sellers');
            });
        });
    });

    Route::middleware('auth')->group(function () {
        // --------------------- Invoices ------------------//
        Route::prefix('apps-invoices')->group(function () {
            Route::controller(InvoicesController::class)->group(function () {
                Route::get('list', 'list')->name('apps-invoices/list');
                Route::get('create', 'create')->name('apps-invoices/create');
                Route::get('details', 'details')->name('apps-invoices/details');
            });
        });
    });

});
