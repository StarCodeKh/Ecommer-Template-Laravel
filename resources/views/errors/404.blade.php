@extends('layouts.error')
@section('title', '404 Error')
@section('content')
    <div class="row justify-content-center">
        <div class="col-xl-7 col-lg-8">
            <div class="text-center">
                <img src="{{ asset('assets/images/error400-cover.png') }}" alt="error img" class="img-fluid">
                <div class="mt-3">
                    <h3 class="text-uppercase">Sorry, Page not Found 😭</h3>
                    <p class="text-muted mb-4">The page you are looking for not available!</p>
                    <a href="{{ route('home') }}" class="btn btn-success"><i class="mdi mdi-home me-1"></i>Back to home</a>
                </div>
            </div>
        </div><!-- end col -->
    </div>
@endsection
