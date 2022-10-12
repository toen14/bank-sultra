<!DOCTYPE html>
<html lang="en">
<!-- Header -->
@include('layouts.header')
<!-- End Header -->

<!-- scripts -->
@include('layouts.script')

<body>
    <div class="wrapper">
        <!-- Navbar -->
        @include('layouts.navbar')
        <!-- End Navbar -->

        <!-- Sidebar -->
        @include('layouts.sidebar')
        <!-- End Sidebar -->

        <!-- Content -->
        <div class="main-panel">
            @yield('content')

            @include('layouts.notification')
        </div>
        <!-- End Content -->
    </div>
</body>

</html>
