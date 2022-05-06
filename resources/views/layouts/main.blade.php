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
    </div>
    <!-- End Content -->

    <footer class="footer">
      <div class="container-fluid">
        <div class="copyright ml-auto">
          2020, made with <i class="fa fa-heart heart text-danger"></i> by
          <a href="">ThemeKita</a>
        </div>
      </div>
    </footer>
  </div>
</body>

</html>