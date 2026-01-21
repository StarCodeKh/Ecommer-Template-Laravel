
@extends('layouts.error')
@section('title', '500 Error')
@section('content')
    <style>
        html, body {
            min-height: 100%;
            overflow: hidden;
        }
    </style>
    <div class="row justify-content-center">
        <div class="col-xl-4 text-center">
            <div class="error-500 position-relative">
                <img src="{{ asset('assets/images/error500.png') }}" alt="" class="img-fluid error-500-img error-img">
                <h1 class="title text-muted">500</h1>
            </div>
            <div>
                <h4>Internal Server Error!</h4>
                <p class="text-muted w-75 mx-auto">Server Error 500. We're not exactly sure what happened, but our servers say something is wrong.</p>
                <a href="{{ route('home') }}" class="btn btn-success"><i class="mdi mdi-home me-1"></i>Back to home</a>
            </div>
        </div><!-- end col-->
    </div> 
@endsection
