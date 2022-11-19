@extends('layouts.main')

@section('content')
    <div class="content container container-full">
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
                    <li class="separator">
                        <i class="flaticon-right-arrow"></i>
                    </li>
                    <li class="nav-item">
                        <a href="#">Archives</a>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="d-flex align-items-center justify-content-between">
                                <h4 class="card-title">Daftar Arsip Debitur</h4>
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
                                            <th>Tanggal Diarsipkan</th>
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
                                            <th>Tanggal Berakhir</th>
                                            <th>Tanggal Diarsipkan</th>
                                            <th>Actions</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        @foreach ($debitors as $debitor)
                                            <tr>
                                                <td> {{ $debitor['name'] }} </td>
                                                <td> {{ $debitor['jenis_pengurusan'] }} </td>
                                                <td> {{ $debitor['data_agunan'] }} </td>
                                                <td> {{ $debitor?->branch?->name }} </td>
                                                <td>
                                                    {{ $debitor?->users[0]?->name }}
                                                </td>
                                                <td> {{ $debitor['nomor'] }} </td>
                                                <td> {{ $debitor['status'] }} </td>
                                                <td> {{ $debitor['alamat'] }} </td>
                                                <td> {{ $debitor['tanggal_penyerahan'] }} </td>
                                                <td> {{ $debitor['tanggal_berakhir'] }} </td>
                                                <td> {{ $debitor['deleted_at']->format('Y-m-d') }} </td>

                                                <td>
                                                    <div class="action-container d-flex justify-content-center">
                                                        <a href="{{ route('debitors-archives-restore', ['archive' => $debitor['id']]) }}"
                                                            data-toggle="tooltip" data-original-title="Kembalikan Arsip"
                                                            class="btn btn-link btn-primary">
                                                            <i class="fas fa-undo"></i>
                                                        </a>
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
            <div class="container-button ml-2" style="margin-top: -15px !important">
                <a href=" {{ route('debitors.index') }} " class="btn btn-warning">
                    <span class="btn-label">
                        <i class="fas fa-angle-double-left"></i>
                    </span>
                    Kembali
                </a>
            </div>
        </div>
    </div>
    @include('layouts.footer')
@endsection
