<!-- Sidebar -->
<div class="sidebar sidebar-style-2">
    <div class="sidebar-wrapper scrollbar scrollbar-inner">
        <div class="sidebar-content">
            <div class="user">
                <div class="info">
                    <a class="ml-2" data-toggle="collapse" href="#collapseExample" aria-expanded="true">
                        <span>
                            {{ auth()->user()->name }}
                            <span class="user-level">{{ auth()->user()->role }}</span>
                        </span>
                    </a>
                    <div class="clearfix"></div>
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
                                <a href=" {{ route('debitors.index') }} ">
                                    <span class="sub-item">Data Debitur</span>
                                </a>
                            </li>
                            <li class="">
                                <a href=" {{ route('users.index') }} ">
                                    <span class="sub-item">Data Pengguna</span>
                                </a>
                            </li>
                            <li class="">
                                <a href=" {{ route('branches.index') }} ">
                                    <span class="sub-item">Data Cabang</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item submenu" id="daftar-note">
                    <a href="{{ route('user-debitors.index', ['user' => auth()->user()->id]) }}" aria-expanded="true">
                        <i class="far fa-paper-plane"></i>
                        <p>Daftar Catatan</p>
                    </a>
                </li>
                @if (Auth::user()->role === 'Administrator')
                    <li class="nav-item  submenu">
                        <a data-toggle="collapse" href="#administrasi">
                            <i class="fas fa-cogs"></i>
                            <p>Administrasi</p>
                            <span class="caret"></span>
                        </a>
                        <div class="collapse" id="administrasi">
                            <ul class="nav nav-collapse">
                                <li class="">
                                    <a href="{{ route('backup.index') }}">
                                        <span class="sub-item">Backups</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                @endif
            </ul>
        </div>
    </div>
</div>
<!-- End Sidebar -->
