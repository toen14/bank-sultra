<div class="main-header">
    <!-- Logo Header -->
    <div class="logo-header" data-background-color="blue">
        <a class="logo">
            <!-- <img src="../assets/img/logo.svg" alt="navbar brand" class="navbar-brand"> -->
            <div class="text-light">BANK SULTRA</div>
        </a>
        <button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse"
            data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">
                <i class="icon-menu">AAAaaaaa</i>
            </span>
        </button>
        <button class="topbar-toggler more">
            <i class="icon-options-vertical"></i>
        </button>
        <div class="nav-toggle">
            <button class="btn btn-toggle toggle-sidebar">
                <i class="icon-menu"></i>
            </button>
        </div>
    </div>
    <!-- End Logo Header -->

    <!-- Navbar Header -->
    <nav class="navbar navbar-header navbar-expand-lg" data-background-color="blue2">
        <div class="container-fluid">
            <div class="collapse" id="search-nav">
                <form class="navbar-left navbar-form nav-search mr-md-3">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <button type="submit" class="btn btn-search pr-1">
                                <i class="fa fa-search search-icon"></i>
                            </button>
                        </div>
                        <input type="text" placeholder="Search ..." class="form-control" />
                    </div>
                </form>
            </div>
            <ul class="navbar-nav topbar-nav ml-md-auto align-items-center">
                <li class="nav-item toggle-nav-search hidden-caret">
                    <a class="nav-link" data-toggle="collapse" href="#search-nav" role="button"
                        aria-expanded="false" aria-controls="search-nav">
                        <i class="fa fa-search"></i>
                    </a>
                </li>
                <li class="nav-item dropdown hidden-caret">
                    <a class="nav-link dropdown-toggle" href="#" id="notifDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-bell"></i>
                        {{-- <span class="notification" id="notification-count">4</span> --}}
                    </a>
                    <ul class="dropdown-menu notif-box animated fadeIn" aria-labelledby="notifDropdown"
                        style="height: 435px; overflow: scroll;" id="notifDropdown" onscroll="loadNotificaions(this)">
                        <li>
                            <div class="dropdown-title">Daftar notification</div>
                        </li>
                        <li>
                            <div class="notif-center">
                                @foreach (App\Models\Notification::with('note.user')->where('user_id', auth()->user()->id)->orderBy('id', 'DESC')->get() as $notif)
                                    <a href="">
                                        <div class="notif-icon notif-primary"> <i class="fas fa-pen-alt"></i> </div>
                                        <div class="notif-content">
                                            <span class="block">
                                                {{ $notif->note->user->name }} membuat note
                                            </span>
                                            <span class="time">{{ $notif->created_at->diffForHumans() }}</span>
                                        </div>
                                    </a>
                                @endforeach
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <form class="ml-md-auto" action="{{ route('logout') }}" method="post">
                        @csrf
                        <button class="btn btn-danger">
                            <span class="btn-label">
                                <i class="icon-logout"></i>
                            </span>
                            Logout
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    </nav>
    <!-- End Navbar -->
</div>
<script>
    const loadNotificaions = (ctx) => {
        if (ctx.scrollHeight - ctx.scrollTop === ctx.clientHeight) {}
    }
</script>
