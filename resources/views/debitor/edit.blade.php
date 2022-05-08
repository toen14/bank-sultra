@extends('layouts.main')

@section('content')
    <div class="content">
        <div class="page-inner">
            <div class="page-header">
                <h4 class="page-title">Edit Debitur</h4>
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
                            <form action=" {{ route('debitors.update', $debitor->id) }} " method="POST">
                                @csrf
                                @method('PATCH')
                                <div class="form-group">
                                    <label for="name">Nama</label>
                                    <input type="text" class="form-control" name="name" id="name"
                                        placeholder="Masukan nama" value=" {{ $debitor->name }} ">
                                </div>
                                <div class="form-group">
                                    <label for="jenis_pengurusan">Jenis pengurusan</label>
                                    <input type="text" class="form-control" name="jenis_pengurusan" id="jenis_pengurusan"
                                        placeholder="Masukan jenis pengurusan" value=" {{ $debitor->jenis_pengurusan }} ">
                                </div>
                                <div class="form-group">
                                    <label for="data_agunan">Data agunan</label>
                                    <input type="text" class="form-control" name="data_agunan" id="data_agunan"
                                        placeholder="Masukan agunan" value=" {{ $debitor->data_agunan }} ">
                                </div>
                                <div class="form-group">
                                    <label for="nomor">Nomor</label>
                                    <input type="text" class="form-control" name="nomor" id="nomor"
                                        placeholder="Masukan nomor" value=" {{ $debitor->nomor }} ">
                                </div>
                                <div class="form-group">
                                    <label for="cabang_id">Cabang</label>
                                    <select class="form-control" id="cabang_id" name="cabang_id" required>
                                        <option value="" disabled selected> Pilih cabang </option>
                                        @foreach ($branches as $branch)
                                            @if ($branch->id === $debitor->cabang_id)
                                                <option value=" {{ $branch->id }} " selected> {{ $branch->name }}
                                                </option>
                                            @else
                                                <option value=" {{ $branch->id }} "> {{ $branch->name }} </option>
                                            @endif
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="notaris_id">Notaris</label>
                                    <select class="form-control" id="notaris_id" name="notaris_id[]" required multiple>
                                        @foreach ($notaries as $notaris)
                                            @foreach ($debitor->users as $user_notaris)
                                                @if ($user_notaris->id === $notaris->id)
                                                    <option value="{{ $notaris->id }}" selected> {{ $notaris->name }}
                                                    </option>
                                                @else
                                                    <option value="{{ $notaris->id }}"> {{ $notaris->name }} </option>
                                                @endif
                                                @break
                                            @endforeach
                                        @endforeach
                                    </select>
                                </div>
                            <div class="form-group">
                                <label for="alamat">Alamat</label>
                                <input type="text" name="alamat" class="form-control" id="alamat"
                                    placeholder="Masukan alamat" value=" {{ $debitor->alamat }} ">
                            </div>
                            <div class="form-group">
                                <label for="tanggal_penyerahan">Tanggal penyerahan</label>
                                <input type="date" name="tanggal_penyerahan" class="form-control"
                                    id="tanggal_penyerahan" placeholder="Masukan tanggal penyerahan"
                                    value="{{ $debitor->tanggal_penyerahan }}" min="1945-01-01" max="3000-12-28">
                            </div>
                            <div class="form-group">
                                <label for="tanggal_berakhir">Tanggal berakhir</label>
                                <input type="date" name="tanggal_berakhir" class="form-control" id="tanggal_berakhir"
                                    placeholder="Masukan tanggal berakhir" value="{{ $debitor->tanggal_berakhir }}">
                            </div>
                            <div class="container-button ml-2">
                                <button type="submit" class="btn btn-success">
                                    <span class="btn-label">
                                        <i class="far fa-edit"></i>
                                    </span>
                                    Edit Data
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
