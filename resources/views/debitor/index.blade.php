@extends('layouts.main')

@section('content')
    <div class="content">
        <div class="page-inner">
            <div class="page-header">
                <h4 class="page-title">Data Debitur</h4>
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
                    <li class="nav-item">
                        <a href="#">Data Debitur</a>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="d-flex align-items-center justify-content-between">
                                <h4 class="card-title">List Debitur</h4>

                                <div class="container-button">
                                    <button class="btn btn-success">
                                        <span class="btn-label">
                                            <i class="fas fa-file-pdf"></i>
                                        </span>
                                        PDF
                                    </button>
                                    <a href=" {{ route('debitors.create') }} " class="btn btn-primary">
                                        <span class="btn-label">
                                            <i class="fa fa-plus"></i>
                                        </span>
                                        Tambah Data
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table id="debitors-datatables" class="display table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nama</th>
                                            <th>Jenis Pengurusan</th>
                                            <th>Data Agunan</th>
                                            <th>Cabang</th>
                                            <th>Notaris</th>
                                            <th>Nomor</th>
                                            <th>Status</th>
                                            <th>Alamat</th>
                                            <th>Tanggal Penyerahan</th>
                                            <th>Tanggal Berakhir</th>
                                            <th style="width: 10%">Actions</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Nama</th>
                                            <th>Jenis Pengurusan</th>
                                            <th>Data Agunan</th>
                                            <th>Cabang</th>
                                            <th>Notaris</th>
                                            <th>Nomor</th>
                                            <th>Status</th>
                                            <th>Alamat</th>
                                            <th>Tanggal Penyerahan</th>
                                            <th>Tanggal Penyerahan</th>
                                            <th>Actions</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        @foreach ($debitors as $debitor)
                                            <tr>
                                                <td> {{ $debitor['name'] }} </td>
                                                <td> {{ $debitor['jenis_pengurusan'] }} </td>
                                                <td> {{ $debitor['data_agunan'] }} </td>
                                                <td> {{ $debitor['cabang_id'] }} </td>
                                                <td>
                                                    @if ($debitor->users->count())
                                                        <div class="btn-group">
                                                            <button class="btn btn-secondary btn-sm dropdown-toggle"
                                                                type="button" data-toggle="dropdown" aria-haspopup="true"
                                                                aria-expanded="false">
                                                                Daftar notaris
                                                            </button>
                                                            <div class="dropdown-menu">
                                                                @foreach ($debitor->users as $notaris)
                                                                    <a class="dropdown-item">
                                                                        {{ $notaris->name }}
                                                                    </a>
                                                                @endforeach
                                                            </div>
                                                        </div>
                                                    @endif
                                                </td>
                                                <td> {{ $debitor['nomor'] }} </td>
                                                <td> {{ $debitor['status'] }} </td>
                                                <td> {{ $debitor['alamat'] }} </td>
                                                <td> {{ $debitor['tanggal_penyerahan'] }} </td>
                                                <td> {{ $debitor['tanggal_berakhir'] }} </td>

                                                <td>
                                                    <div class="action-container d-flex justify-content-center">
                                                        <a href=" {{ route('debitors.edit', $debitor->id) }} " class="btn btn-info mr-1">edit</a>
                                                        <form method="post">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button onclick="deleteDebitor(this)" type="button"
                                                                class="btn btn-danger ml-1">delete
                                                            </button>
                                                        </form>
                                                    </div>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
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
        // set caret icon to up (^) position
        dataMasterContainer.children[0].setAttribute('aria-expanded', true);

        const dataMaster = document.getElementById('data-master');
        // expanse ul list
        dataMaster.classList.add('show');

        const dataMasterUl = document.getElementById('data-master').children[0];
        // activete li current page
        dataMasterUl.children[0].classList.add('active');

        function deleteDebitor(contex) {
            swal({
                    title: "Apakah Anda Yakin?",
                    text: "Data akan terhapus!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        contex.parentElement.submit();
                    } else {
                        swal("Batal menghapus data!");
                    }
                });
        }
    </script>
@endsection
