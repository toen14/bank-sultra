@extends('layouts.main')

@section('content')
    <div class="content container container-full">
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
                            <form action=" {{ route('debitors.update', $debitor->id) }} " method="POST" id="form-debior">
                                @csrf
                                @method('PATCH')
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="name">Nama</label>
                                            <input type="text" class="form-control" name="name" id="name"
                                                placeholder="Masukan nama" value=" {{ $debitor->name }} ">
                                        </div>
                                        <div class="form-group">
                                            <label for="alamat">Alamat Jaminan</label>
                                            <input type="text" name="alamat" class="form-control" id="alamat"
                                                placeholder="Masukan alamat jaminan" value=" {{ $debitor->alamat }} ">
                                        </div>
                                        <div class="form-group">
                                            <label for="jenis_pengurusan">Jenis Pengikatan</label>
                                            <input type="text" class="form-control" name="jenis_pengurusan"
                                                id="jenis_pengurusan" placeholder="Masukan jenis pengikatan"
                                                value=" {{ $debitor->jenis_pengurusan }} ">
                                        </div>
                                        <div class="form-group">
                                            <label for="nilai_pengikatan">Nilai Pengikatan</label>
                                            <input type="text" value="{{ $debitor->nilai_pengikatan }}"
                                                class="form-control nilai_pengikatan" name="nilai_pengikatan"
                                                id="nilai_pengikatan" placeholder="Masukan nilai pengikatan">
                                        </div>
                                        <div class="form-group">
                                            <label for="plafond_kredit">Plafound Kredit</label>
                                            <input type="text" value="{{ $debitor->plafond_kredit }}"
                                                class="form-control plafond_kredit" name="plafond_kredit"
                                                id="plafond_kredit" placeholder="Masukan plafound kredit">
                                        </div>
                                        <div class="form-group">
                                            <label for="status">Status Debitur</label>
                                            <select class="form-control" id="status" name="status" required
                                                style="height: 39.4px !important;">
                                                @foreach ($debitorStatus as $status)
                                                    <option value="{{ $status->value }}"
                                                        {{ $status->value === $debitor->status ? 'selected' : '' }}>
                                                        {{ $status->name }}
                                                    </option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="data_agunan">Data Agunan</label>
                                            <input type="text" class="form-control" name="data_agunan" id="data_agunan"
                                                placeholder="Masukan agunan" value=" {{ $debitor->data_agunan }} ">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="no_surat">Nomor Surat Agunan</label>
                                            <input type="text" class="form-control" value="{{ $debitor->no_surat }}"
                                                name="no_surat" id="no_surat" placeholder="Masukan nomor surat">
                                        </div>
                                        <div class="form-group">
                                            <label for="cabang_id">Cabang</label>
                                            <select class="form-control" id="cabang_id" name="cabang_id" required
                                                onchange="getNotaries(this)" style="height: 39.4px !important;">
                                                <option value="" disabled selected> Pilih cabang </option>
                                                @foreach ($branches as $branch)
                                                    @if ($branch->id === $debitor->cabang_id)
                                                        <option value=" {{ $branch->id }} " selected>
                                                            {{ $branch->name }}
                                                        </option>
                                                    @else
                                                        <option value=" {{ $branch->id }} "> {{ $branch->name }}
                                                        </option>
                                                    @endif
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="notaris_id">Notaris</label>
                                            <select class="form-control" id="notaris_id" name="notaris_id[]" required
                                                style="height: 39.4px !important;">
                                                <option value="" disabled selected> Pilih notaris </option>
                                                @foreach ($notaries as $notaris)
                                                    @if ($selectedNotaris === $notaris->id)
                                                        <option value="{{ $notaris->id }}" selected>
                                                            {{ $notaris->name }}
                                                        </option>
                                                    @else
                                                        <option value="{{ $notaris->id }}"> {{ $notaris->name }}
                                                        </option>
                                                    @endif
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="nomor">Nomor Covernote</label>
                                            <input type="text" class="form-control" name="nomor" id="nomor"
                                                placeholder="Masukan nomor covernote" value=" {{ $debitor->nomor }} ">
                                        </div>
                                        <div class="form-group">
                                            <label for="tanggal_akad">Tanggal Akad</label>
                                            <div class="input-group">
                                                <input type="date" name="tanggal_akad" class="form-control"
                                                    id="tanggal_akad" placeholder="Masukan tanggal akad"
                                                    value="{{ $debitor->tanggal_akad ? \Carbon\Carbon::createFromFormat('Y-m-d', $debitor->tanggal_akad)->format('Y-m-d') : $debitor->tanggal_akad }}"
                                                    min="1945-01-01" max="3000-12-28">
                                                <div class="input-group-append">
                                                    <span class="input-group-text">
                                                        <i class="fa fa-calendar-check"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="tanggal_penyerahan">Tanggal Order</label>
                                            <div class="input-group">
                                                <input type="date" name="tanggal_penyerahan" class="form-control"
                                                    id="tanggal_penyerahan" placeholder="Masukan tanggal order"
                                                    value="{{ $debitor->tanggal_penyerahan ? \Carbon\Carbon::createFromFormat('Y-m-d', $debitor->tanggal_penyerahan)->format('Y-m-d') : $debitor->tanggal_penyerahan }}"
                                                    min="1945-01-01" max="3000-12-28">
                                                <div class="input-group-append">
                                                    <span class="input-group-text">
                                                        <i class="fa fa-calendar-check"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="tanggal_berakhir">Tanggal Berakhir Covernote</label>
                                            <div class="input-group">
                                                <input type="date" name="tanggal_berakhir" class="form-control"
                                                    id="tanggal_berakhir"
                                                    placeholder="Masukan tanggal berakhir cover note"
                                                    value="{{ $debitor->tanggal_berakhir ? \Carbon\Carbon::createFromFormat('Y-m-d', $debitor->tanggal_berakhir)->format('Y-m-d') : $debitor->tanggal_berakhir }}">
                                                <div class="input-group-append">
                                                    <span class="input-group-text">
                                                        <i class="fa fa-calendar-check"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container-button ml-2 mt-3">
                                    <button type="submit" class="btn btn-success">
                                        <span class="btn-label">
                                            <i class="far fa-edit"></i>
                                        </span>
                                        Simpan
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

            const url = "{{ env('APP_URL') }}";

            fetch(`${url}/api/branches/${ctx.value}/notaris`, {
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

        new Cleave('.nilai_pengikatan', {
            numeral: true,
            numeralDecimalMark: ',',
            delimiter: '.'
        })
        new Cleave('.plafond_kredit', {
            numeral: true,
            numeralDecimalMark: ',',
            delimiter: '.'
        })

        document.getElementById("form-debior").addEventListener("submit", (e) => {
            e.preventDefault();

            const nilaiPengikatan = document.getElementById("nilai_pengikatan");
            const plafondKredit = document.getElementById("plafond_kredit");

            nilaiPengikatan.value = +nilaiPengikatan.value
                .replaceAll(".", "")
                .replaceAll(",", ".");
            plafondKredit.value = +plafondKredit.value
                .replaceAll(".", "")
                .replaceAll(",", ".");

            e.currentTarget.submit()
        });
    </script>
@endsection
