<?php /*
@include('../layouts.header')
<!-- Font Awesome -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
<!-- MDB -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/4.2.0/mdb.min.css" rel="stylesheet" />
<section class="vh-100" style="background-color: #508bfc;">
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card shadow-2-strong" style="border-radius: 1rem;">
                    <div class="card-body p-5 text-center">

                        <h3 class="mb-5">Sign in</h3>

                        <form method="POST" action="{{ route('login') }}">
                            @csrf
                            @if ($errors->any())
                                <div class="alert alert-danger">
                                    <ul>
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                            <div class="form-outline mb-4">
                                <input type="email" required name="email" id="typeEmailX-2"
                                    class="form-control form-control-lg" />
                                <label class="form-label active" for="typeEmailX-2">Email</label>
                            </div>

                            <div class="form-outline mb-4">
                                <input type="password" required name="password" id="typePasswordX-2"
                                    class="form-control form-control-lg" />
                                <label class="form-label" for="typePasswordX-2">Password</label>
                            </div>

                            <button class="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                        </form>

                        <hr class="my-4">

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- MDB -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/4.2.0/mdb.min.js"></script>

*/
?>

@include('../layouts.header')

<div class="login">
    <div class="wrapper wrapper-login wrapper-login-full p-0">
        <div
            class="login-aside w-50 d-flex flex-column align-items-center justify-content-center text-center bg-secondary-gradient">
            <h1 class="title fw-bold text-white mb-3">SISTEM E-MITRA BANK SULTRA</h1>
        </div>
        <div class="login-aside w-50 d-flex align-items-center justify-content-center bg-white">
            <div class="container container-login container-transparent animated fadeIn">
                <h3 class="text-center">Sign In To Admin</h3>
                @if ($errors->any())
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li> <label class="error"> {{ $error }} </label> </li>
                        @endforeach
                    </ul>
                @endif
                <form action="{{ route('login') }}" method="post" class="login-form">
                    @csrf
                    <div class="form-group">
                        <label for="email" class="placeholder"><b>Email</b></label>
                        <input id="email" name="email" type="text" class="form-control" required
                            value="{{ old('email') }}">
                    </div>
                    <div class="form-group">
                        <label for="password" class="placeholder"><b>Password</b></label>
                        {{-- <a href="#" class="link float-right">Forget Password ?</a> --}}
                        <div class="position-relative">
                            <input id="password" name="password" type="password" class="form-control" required
                                value="{{ old('password') }}">
                            <div class="show-password">
                                <i class="icon-eye" id="icon_eye_password"></i>
                            </div>
                        </div>
                    </div>
                    <div class="form-group form-action-d-flex mb-3">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="rememberme">
                            <label class="custom-control-label m-0" for="rememberme">Remember Me</label>
                        </div>
                        <button type="submit" class="btn btn-secondary col-md-5 float-right mt-3 mt-sm-0 fw-bold">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@include('../layouts.script')
<script>
    const iconEyePassword = document.getElementById('icon_eye_password');
    const password = document.getElementById('password');

    iconEyePassword.addEventListener("click", () => {
        const isTypePassword = password.type === "text";

        if (isTypePassword) {
            password.setAttribute("type", "text");
        } else {
            password.setAttribute("type", "password");
        }
    });
</script>
