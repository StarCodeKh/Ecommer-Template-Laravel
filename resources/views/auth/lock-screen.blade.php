@extends('layouts.app')
@section('title', 'Lock Screen')
@section('content')
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="text-center mt-sm-5 mb-4 text-white-50">
                    <div>
                        <a href="{{ route('home') }}" class="d-inline-block auth-logo">
                            <img src="{{ asset('assets/images/logo-light.png') }}" alt="" height="20">
                        </a>
                    </div>
                    <p class="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                </div>
            </div>
        </div>
        <!-- end row -->

        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-5">
                <div class="card mt-4 card-bg-fill">
                    <div class="card-body p-4">
                        <div class="text-center mt-2">
                            <h5 class="text-primary">Lock Screen</h5>
                            <p class="text-muted">Enter your password to unlock the screen!</p>
                        </div>
                        <div class="user-thumb text-center">
                            <img src="{{ asset('assets/images/avatar-1.jpg') }}" class="rounded-circle img-thumbnail avatar-lg material-shadow" alt="thumbnail">
                            <h5 class="font-size-15 mt-3">StarCode Kh</h5>
                        </div>
                        <div class="p-2 mt-4">
                            <form action="{{ route('unlock-screen') }}" method="POST">
                                @csrf
                                <div class="mb-3">
                                    <label class="form-label" for="userpassword">Password</label>
                                    <input type="password" class="form-control @error('password') is-invalid @enderror" id="userpassword" name="password" placeholder="Enter password">
                                </div>
                                <div class="mb-2 mt-4">
                                    <button class="btn btn-success w-100" type="submit">Unlock</button>
                                </div>
                            </form><!-- end form -->

                        </div>
                    </div>
                    <!-- end card body -->
                </div>
                <!-- end card -->

                <div class="mt-4 text-center">
                    <p class="mb-0">Not you ? return <a href="{{ route('login') }}" class="fw-semibold text-primary text-decoration-underline"> Signin </a> </p>
                </div>

            </div>
        </div>
        <!-- end row -->
    </div>
    <!-- end container -->
@endsection
