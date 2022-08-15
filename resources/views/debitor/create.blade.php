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
                                    <label for="jenis_pengurusan">Jenis pengikatan</label>
                                    <input type="text" class="form-control" name="jenis_pengurusan" id="jenis_pengurusan"
                                        placeholder="Masukan jenis pengikatan">
                                </div>
                                <div class="form-group">
                                    <label for="nilai_pengikatan">Nilai pengikatan</label>
                                    <input type="number" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"  class="form-control" name="nilai_pengikatan" id="nilai_pengikatan"
                                        placeholder="Masukan nilai pengikatan">
                                </div>
                                <div class="form-group">
                                    <label for="plafond_kredit">Plafound kredit</label>
                                    <input type="number" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"  class="form-control" name="plafond_kredit" id="plafond_kredit"
                                        placeholder="Masukan plafound_kredit">
                                </div>
                                <div class="form-group">
                                    <label for="data_agunan">Data agunan</label>
                                    <input type="text" class="form-control" name="data_agunan" id="data_agunan"
                                        placeholder="Masukan agunan">
                                </div>
                                <div class="form-group">
                                    <label for="no_surat">Nomor surat</label>
                                    <input type="text" class="form-control" name="no_surat" id="no_surat"
                                        placeholder="Masukan nomor surat">
                                </div>
                                <div class="form-group">
                                    <label for="nomor">Nomor</label>
                                    <input type="text" class="form-control" name="nomor" id="nomor"
                                        placeholder="Masukan nomor">
                                </div>
                                <div class="form-group">
                                    <label for="cabang_id">Cabang</label>
                                    <select class="form-control" id="cabang_id" name="cabang_id" onchange="getNotaries(this)" required>
                                        <option value="2" selected> Pilih cabang </option>
                                        @foreach ($branches as $branch)
                                            <option value="{{ $branch->id }}"> {{ $branch->name }} </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="notaris_id">Notaris</label>
                                    <select class="form-control" id="notaris_id" name="notaris_id[]" disabled required>
                                        <option value="" disabled selected> Pilih notaris </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="alamat">Alamat jaminan</label>
                                    <input type="text" name="alamat" class="form-control" id="alamat"
                                        placeholder="Masukan alamat jaminan">
                                </div>
                                <div class="form-group">
                                    <label for="tanggal_penyerahan">Tanggal order</label>
                                    <input type="date" name="tanggal_penyerahan" class="form-control"
                                        id="tanggal_penyerahan" placeholder="Masukan tanggal order">
                                </div>
                                <div class="form-group">
                                    <label for="tanggal_berakhir">Tanggal berakhir cover note</label>
                                    <input type="date" name="tanggal_berakhir" class="form-control" id="tanggal_berakhir"
                                        placeholder="Masukan tanggal berakhir cover note">
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
        const notaris = document.getElementById('notaris_id');
        dataMasterContainer.classList.add('active')
        
        const token = {{ Js::from(Session::get('token')) }}

        function getNotaries(ctx) {
            notaris.disabled = true;

            // remove current notaries
            let child = notaris.lastElementChild; 
            while (child) {
                if (notaris.length === 1) {
                    break;
                }

                notaris.removeChild(child);
                child = notaris.lastElementChild;
            }

            fetch(`http://localhost:8001/api/branches/${ctx.value}/notaris`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then((e) => {
                e.data.forEach((n) => {
                    const opt = document.createElement('option');
                    opt.value = n.id;
                    opt.innerHTML = n.name;
                    opt.selected = false;
                    notaris.appendChild(opt);
                });
                notaris.disabled = false;
            })
            .catch(e => console.log(e))
        }
    </script>
@endsection
