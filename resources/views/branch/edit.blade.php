@extends('layouts.main')

@section('content')
    <div class="content container container-full">
        <div class="page-inner">
            <div class="page-header">
                <h4 class="page-title">Edit Cabang</h4>
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
                                <h4 class="card-title">List Cabang</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action=" {{ route('branches.update', $branch->id) }} " method="POST">
                                @csrf
                                @method('PATCH')
                                <div class="form-group">
                                    <label for="name">Nama</label>
                                    <input type="text" class="form-control" name="name" id="name"
                                        placeholder="Masukan nama" value=" {{ $branch->name }} ">
                                </div>
                                <div class="form-group">
                                    <label for="kabupaten_kota_id">Cabang</label>
                                    <select class="form-control" id="kabupaten_kota_id" name="kabupaten_kota_id" required>
                                        <option value="" disabled> Pilih cabang </option>
                                        @foreach ($kabupatenKota as $kabKot)
                                            @if ($kabKot->id === $branch->kabupaten_kota_id)
                                                <option value=" {{ $kabKot->id }} " selected> {{ $kabKot->name }}
                                                </option>
                                            @else
                                                <option value=" {{ $kabKot->id }} "> {{ $kabKot->name }} </option>
                                            @endif
                                        @endforeach
                                    </select>
                                </div>
                                <div class="container-button ml-2">
                                    <button type="submit" class="btn btn-success">
                                        <span class="btn-label">
                                            <i class="far fa-edit"></i>
                                        </span>
                                        Edit Data
                                    </button>
                                    <a href=" {{ route('branches.index') }} " class="btn btn-warning">
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
        $("#branches-datatables").DataTable({
            pageLength: 5,
        });

        const dataMasterContainer = document.getElementById('data-master').parentElement;
        dataMasterContainer.classList.add('active')
    </script>
@endsection
