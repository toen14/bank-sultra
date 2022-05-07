<!-- Sidebar -->
<div class="sidebar sidebar-style-2">
  <div class="sidebar-wrapper scrollbar scrollbar-inner">
    <div class="sidebar-content">
      <div class="user">
        <div class="avatar-sm float-left mr-2">
          <img src="../assets/img/profile.jpg" alt="..." class="avatar-img rounded-circle" />
        </div>
        <div class="info">
          <a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
            <span>
              Hizrian
              <span class="user-level">Administrator</span>
            </span>
          </a>
          <div class="clearfix"></div>

          <div class="collapse in" id="collapseExample">
            <ul class="nav">
              <li>
                <a href="#profile">
                  <span class="link-collapse">My Profile</span>
                </a>
              </li>
              <li>
                <a href="#edit">
                  <span class="link-collapse">Edit Profile</span>
                </a>
              </li>
              <li>
                <a href="#settings">
                  <span class="link-collapse">Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ul class="nav nav-primary">
        <li class="nav-item" id="li-dashboard">
          <a href=" {{ route('dashboard') }} " class="collapsed" aria-expanded="false">
            <i class="fas fa-home"></i>
            <p>Dashboard</p>
          </a>
        </li>
        <li class="nav-section">
          <span class="sidebar-mini-icon">
            <i class="fa fa-ellipsis-h"></i>
          </span>
          <h4 class="text-section">Components</h4>
        </li>
        <li class="nav-item  submenu">
          <a data-toggle="collapse" href="#data-master">
            <i class="fas fa-layer-group"></i>
            <p>Data Master</p>
            <span class="caret"></span>
          </a>
          <div class="collapse" id="data-master">
            <ul class="nav nav-collapse">
              <li class="">
                <a href="tables/datatables-debitor.html">
                  <span class="sub-item">Data Debitur</span>
                </a>
              </li>
              <li class="">
                <a href=" {{ route('users.index') }} ">
                  <span class="sub-item">Data Pengguna</span>
                </a>
              </li>
              <li class="">
                <a href="#">
                  <span class="sub-item">Data Cabang</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item  submenu">
          <a data-toggle="collapse" href="#administrasi">
            <i class="fas fa-cogs"></i>
            <p>Administrasi</p>
            <span class="caret"></span>
          </a>
          <div class="collapse" id="administrasi">
            <ul class="nav nav-collapse">
              <li class="">
                <a href="#">
                  <span class="sub-item">History Logs</span>
                </a>
              </li>
              <li class="">
                <a href="#">
                  <span class="sub-item">Backups</span>
                </a>
              </li>
              <li class="">
                <a href="#">
                  <span class="sub-item">Restore</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
<!-- End Sidebar -->