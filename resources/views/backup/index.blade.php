@extends('layouts.main')

@section('content')
    <div class="content">
        <div class="page-inner">
            <div class="page-header">
                <h4 class="page-title">Backup</h4>
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
                        <a href="#">Administrasi</a>
                    </li>
                    <li class="separator">
                        <i class="flaticon-right-arrow"></i>
                    </li>
                    <li class="nav-item">
                        <a href="#">Backup</a>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="d-flex align-items-center justify-content-between">
                                <h4 class="card-title">List Pengguna</h4>

                                <div class="container-button">
                                    <form action=" {{ route('backup.store') }} " method="post">
                                        @csrf
                                        @method('POST')
                                        <button type="submit" class="btn btn-primary ml-1">
                                            <span class="btn-label">
                                                <i class="fa fa-plus"></i>
                                            </span>
                                            Backup Data
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table id="users-datatables" class="display table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Tanggal Backup</th>
                                            <th style="width: 10%">Actions</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>No</th>
                                            <th>Tanggal Backup</th>
                                            <th>Actions</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        @php $no = 1; @endphp
                                        @foreach ($filenames as $filename)
                                            <tr>
                                                <td> {{ $no }} </td>
                                                <td> {{ $filename }} </td>
                                                <td>
                                                    <div class="action-container d-flex justify-content-center">
                                                        <form action=" {{ route('backup.destroy', $filename) }} "
                                                            method="post">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button onclick="deleteBackup(this)" type="button"
                                                                class="btn btn-danger ml-1">delete
                                                            </button>
                                                        </form>
                                                    </div>
                                                </td>
                                            </tr>
                                            @php $no++; @endphp
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
        $("#users-datatables").DataTable({
            pageLength: 5,
        });

        const dataMasterContainer = document.getElementById('administrasi').parentElement;
        dataMasterContainer.classList.add('active')
        // set caret icon to up (^) position
        dataMasterContainer.children[0].setAttribute('aria-expanded', true);

        const dataMaster = document.getElementById('administrasi');
        // expanse ul list
        dataMaster.classList.add('show');

        const dataMasterUl = document.getElementById('administrasi').children[0];
        // activete li current page
        dataMasterUl.children[0].classList.add('active');

        function deleteBackup(contex) {
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
