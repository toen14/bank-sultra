@extends('layouts.main')

@section('content')
    <div class="content container container-full">
        <div class="page-inner">
            <div class="page-header">
                <h4 class="page-title">Data Pengguna</h4>
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
                        <a href="#">Data Pengguna</a>
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
                                    <a href=" {{ route('pdf-users') }} " class="btn btn-success" target="__blank">
                                        <span class="btn-label">
                                            <i class="fas fa-file-pdf"></i>
                                        </span>
                                        PDF
                                    </a>
                                    <a href=" {{ route('users.create') }} " class="btn btn-primary">
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
                                <table id="users-datatables" class="display table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nama</th>
                                            <th>Role</th>
                                            <th>Cabang</th>
                                            <th style="width: 10%">Actions</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Nama</th>
                                            <th>Role</th>
                                            <th>Cabang</th>
                                            <th>Actions</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        @foreach ($users as $user)
                                            <tr>
                                                <td> {{ $user['name'] }} </td>
                                                <td> {{ $user['role'] }} </td>
                                                <td> {{ $user->branch?->name }} </td>
                                                <td>
                                                    <div class="action-container d-flex justify-content-center">
                                                        <a href=" {{ route('users.edit', $user->id) }} "
                                                            class="btn btn-info mr-1">Edit</a>
                                                        <form action=" {{ route('users.destroy', $user->id) }} "
                                                            method="post">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button onclick="deleteUser(this)" type="button"
                                                                class="btn btn-danger ml-1">Delete
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
        $("#users-datatables").DataTable({
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
        dataMasterUl.children[1].classList.add('active');

        function deleteUser(contex) {
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
