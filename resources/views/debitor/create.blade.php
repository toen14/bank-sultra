@extends('layouts.main')

@section('content')
    <div class="content">
        <div class="page-inner">
            <div class="page-header">
                <h4 class="page-title">Tambah Debitur</h4>
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
                                <h4 class="card-title">Tambah Debitur</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action=" {{ route('debitors.store') }} " method="POST">
                                @csrf
                                <div class="form-group">
                                    <label for="name">Nama</label>
                                    <input type="text" class="form-control" name="name" id="name"
                                        placeholder="Masukan nama">
                                </div>
                                <div class="form-group">
                                    <label for="jenis_pengurusan">Jenis pengurusan</label>
                                    <input type="text" class="form-control" name="jenis_pengurusan" id="jenis_pengurusan"
                                        placeholder="Masukan jenis pengurusan">
                                </div>
                                <div class="form-group">
                                    <label for="data_agunan">Data agunan</label>
                                    <input type="text" class="form-control" name="data_agunan" id="data_agunan"
                                        placeholder="Masukan agunan">
                                </div>
                                <div class="form-group">
                                    <label for="nomor">Nomor</label>
                                    <input type="text" class="form-control" name="nomor" id="nomor"
                                        placeholder="Masukan nomor">
                                </div>
                                <div class="form-group">
                                    <label for="cabang_id">Cabang</label>
                                    <select class="form-control" id="cabang_id" name="cabang_id" required>
                                        <option value="" disabled selected> Pilih cabang </option>
                                        @foreach ($branches as $branch)
                                            <option value=" {{ $branch->id }} "> {{ $branch->name }} </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="notaris_id">Notaris</label>
                                    <select class="form-control" id="notaris_id" name="notaris_id[]" required multiple>
                                        <option value="" disabled selected> Pilih notaris </option>
                                        @foreach ($notaries as $notaris)
                                            <option value=" {{ $notaris->id }} "> {{ $notaris->name }} </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="alamat">Alamat</label>
                                    <input type="text" name="alamat" class="form-control" id="alamat"
                                        placeholder="Masukan alamat">
                                </div>
                                <div class="form-group">
                                    <label for="tanggal_penyerahan">Tanggal penyerahan</label>
                                    <input type="date" name="tanggal_penyerahan" class="form-control" id="tanggal_penyerahan"
                                        placeholder="Masukan tanggal penyerahan">
                                </div>
                                <div class="form-group">
                                    <label for="tanggal_berakhir">Tanggal berakhir</label>
                                    <input type="date" name="tanggal_berakhir" class="form-control" id="tanggal_berakhir"
                                        placeholder="Masukan tanggal berakhir">
                                </div>
                                <div class="container-button ml-2">
                                    <button type="submit" class="btn btn-success">
                                        <span class="btn-label">
                                            <i class="fa fa-plus"></i>
                                        </span>
                                        Tambah Data
                                    </button>
                                    <a href=" {{ route('debitors.index') }} " class="btn btn-warning">
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
    <script>
        $("#debitors-datatables").DataTable({
            pageLength: 5,
        });

        const dataMasterContainer = document.getElementById('data-master').parentElement;
        dataMasterContainer.classList.add('active')
    </script>
@endsection
