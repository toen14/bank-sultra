@extends('layouts.main')
@section('content')
    <style>
        @media only screen and (min-width: 576px) {
            #note-container {
                height: 40vh;
                overflow: scroll;
            }
        }
    </style>
    <div class="content">
        <div class="page-inner">
            <div class="page-header">
                <h4 class="page-title">Detail Pengguna</h4>
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
                                <h4 class="card-title">Detail Pengguna</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="d-flex flex-column justify-content-center">
                                <div class="flex-grow-1">
                                    <div class="form-group">
                                        <label for="name">Nama</label>
                                        <input style="background-color:#FFF !important;" type="text" class="form-control" name="name" id="name"
                                            placeholder="Masukan nama" disabled value=" {{ $user->name }} ">
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input style="background-color:#FFF !important;" type="email" class="form-control" name="email" id="email"
                                            placeholder="Masukan email" disabled value=" {{ $user->email }} ">
                                    </div>
                                    <div class="form-group">
                                        <label for="cabang">Cabang</label>
                                        <input style="background-color:#FFF !important;" type="text" class="form-control" name="cabang" disabled id="cabang"
                                            value=" {{ $user->branch?->name }} ">
                                    </div>
                                    <div class="form-group">
                                        <label for="alamat">Alamat</label>
                                        <input style="background-color:#FFF !important;" type="text" name="alamat" class="form-control" id="alamat"
                                            placeholder="Masukan alamat" disabled value=" {{ $user->alamat }} ">
                                    </div>
                                    <hr>
                                </div>
                                <h4>Daftar note</h4>
                                <div class="flex-grow-1" id="note-container">
                                    @php $no = 1;@endphp
                                    @foreach ($notes as $note)
                                        <div class="accordion accordion-secondary">
                                            <div class="card">
                                                <div class="card-header collapsed" id="heading" data-toggle="collapse"
                                                    data-target="#collapse{{ $no }}" aria-expanded="false"
                                                    aria-controls="collapse">
                                                    <div class="span-icon">
                                                        <div class="flaticon-box-1"></div>
                                                    </div>
                                                    <div class="span-title">
                                                        Note ke debitur {{ $note[0]->debitor->id }} atas nama
                                                        {{ $note[0]->debitor->name }}
                                                    </div>
                                                    <div class="span-mode"></div>
                                                </div>
                                                <div id="collapse{{ $no }}" class="collapse"
                                                    aria-labelledby="heading" data-parent="#accordion">
                                                    @foreach ($note as $item)
                                                        <div class="card-body d-flex flex-row justify-content-between">
                                                            <textarea style="background-color:#FFF !important;" rows="5" disabled class="form-control">{{ $item->description }}</textarea>
                                                            <p>{{ $item->created_at }}</p>
                                                        </div>
                                                    @endforeach
                                                </div>
                                            </div>
                                        </div>
                                        @php $no++; @endphp
                                    @endforeach
                                </div>
                            </div>

                            <div class="container-button ml-2">
                                <a href=" {{  url()->previous() }} " class="btn btn-warning">
                                    <span class="btn-label">
                                        <i class="fas fa-angle-double-left"></i>
                                    </span>
                                    Kembali
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('layouts.footer')
@endsection
