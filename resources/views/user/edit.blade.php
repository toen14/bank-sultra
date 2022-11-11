@extends('layouts.main')

@section('content')
    <div class="content container container-full">
        <div class="page-inner">
            <div class="page-header">
                <h4 class="page-title">Edit Pengguna</h4>
                <ul class="breadcrumbs">
                    <li class="nav-home">
                        <a href="#">
                            <i class="flaticon-home"></i>
                        </a>
                    </li>
                    <li class="separator">
                        <i class="flaticon-right-arrow"></i>
                    </li>
                    <li class="nav-item">
                        <a href="#">Master Data</a>
                    </li>
                    <li class="separator">
                        <i class="flaticon-right-arrow"></i>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div class="col-md-12">
                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <p><strong>Opps Something went wrong</strong></p>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                    <div class="card">
                        <div class="card-header">
                            <div class="d-flex align-items-center justify-content-between">
                                <h4 class="card-title">List Pengguna</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action=" {{ route('users.update', $user->id) }} " method="POST">
                                @csrf
                                @method('PATCH')
                                <div class="form-group">
                                    <label for="name">Nama</label>
                                    <input type="text" class="form-control" name="name" id="name"
                                        placeholder="Masukan nama" value=" {{ $user->name }} ">
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" name="email" id="email"
                                        placeholder="Masukan email" value=" {{ $user->email }} ">
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" name="password" class="form-control" id="password"
                                        placeholder="Kosongkan bila tidak mengubah password">
                                </div>
                                <div class="form-group">
                                    <label for="cabang_id">Cabang</label>
                                    <select class="form-control" id="cabang_id" name="cabang_id" required>
                                        <option value="" disabled> Pilih cabang </option>
                                        @foreach ($branches as $branch)
                                            @if ($branch->id === $user->cabang_id)
                                                <option value=" {{ $branch->id }} " selected> {{ $branch->name }}
                                                </option>
                                            @else
                                                <option value=" {{ $branch->id }} "> {{ $branch->name }} </option>
                                            @endif
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="status">Status</label>
                                    <select class="form-control" id="status" name="status">
                                        <option value="" disabled> Pilih status </option>
                                        <option value="Aktif" {{ $user->status === 'Aktif' ? 'selected' : '' }}> Aktif
                                        </option>
                                        <option value="Non Aktif" {{ $user->status === 'Non Aktif' ? 'selected' : '' }}> Non
                                            Aktif </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="role">Role</label>
                                    <select class="form-control" id="role" name="role" required
                                        onchange="getRole(this)">
                                        <option value="" disabled> Pilih role </option>
                                        @foreach ($roles as $role)
                                            @if ($role['value'] === $user->role)
                                                <option value="{{ $role['value'] }}" selected> {{ $role['name'] }}
                                                </option>
                                            @else
                                                <option value="{{ $role['value'] }}"> {{ $role['name'] }} </option>
                                            @endif
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group" style="display: none" id="c_tanggal_berakhir">
                                    <label for="tanggal_berakhir">Tanggal Notaris Berakhir</label>
                                    <input required type="date" name="tanggal_berakhir" class="form-control"
                                        id="tanggal_berakhir" placeholder="Tanggal notaris berakhir">
                                </div>
                                <div class="form-group">
                                    <label for="alamat">Alamat</label>
                                    <input type="text" name="alamat" class="form-control" id="alamat"
                                        placeholder="Masukan alamat" value=" {{ $user->alamat }} ">
                                </div>
                                <div class="container-button ml-2">
                                    <button type="submit" class="btn btn-success">
                                        <span class="btn-label">
                                            <i class="far fa-edit"></i>
                                        </span>
                                        Simpan
                                    </button>
                                    <a href=" {{ route('users.index') }} " class="btn btn-warning">
                                        <span class="btn-label">
                                            <i class="fas fa-angle-double-left"></i>
                                        </span>
                                        Kembali
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('layouts.footer')
    <script defer>
        $("#users-datatables").DataTable({
            pageLength: 5,
        });

        const dataMasterContainer = document.getElementById('data-master').parentElement;
        dataMasterContainer.classList.add('active');

        const cTanggalBerakhir = document.getElementById("c_tanggal_berakhir");
        const tanggalBerakhir = document.getElementById('tanggal_berakhir');
        const role = document.getElementById('role');

        const user = {{ Js::from($user) }}
        const notaris = "Notaris/PPAT";

        tanggalBerakhir.valueAsDate = new Date();

        if (user.role === notaris) {
            cTanggalBerakhir.style.display = "";
            tanggalBerakhir.required = true;
            tanggalBerakhir.valueAsDate = new Date(user.notaris.tanggal_berakhir);
        }

        function getRole(ctx) {
            if (ctx.value !== notaris) {
                cTanggalBerakhir.style.display = "none";
                tanggalBerakhir.required = false;
                return;
            }

            cTanggalBerakhir.style.display = "";
            tanggalBerakhir.required = true;
        }
    </script>
@endsection
