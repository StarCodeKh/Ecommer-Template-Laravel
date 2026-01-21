<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InvoicesController extends Controller
{
    // Display a listing of the resource.
    public function list()
    {
        return view('apps.invoices.list');
    }

    // Show the form for creating a new resource.
    public function details()
    {
        return view('apps.invoices.details');
    }

    // Show the form for creating a new resource.
    public function create()
    {
        return view('apps.invoices.create');
    }
}
