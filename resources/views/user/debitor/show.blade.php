@extends('layouts.main')
<style>
    .hidden-before:before {
        border: none !important;
    }

    .option-done {
        color: #31ce36 !important;
    }

    .option-pending {
        color: #f25961 !important;
    }

    .option-on-progress {
        color: #ffad46 !important;
    }
</style>
@section('content')
    <div class="container container-full">
        <div class="page-wrapper has-sidebar">
            <div class="page-inner page-inner-fill">
                <div class="conversations">
                    <div class="message-header">
                        <div class="message-title">
                            <a class="btn btn-light"
                                href="{{ route('user-debitors.index', ['user' => auth()->user()->id]) }}">
                                <i class="fa fa-flip-horizontal fa-share"></i>
                            </a>
                            <div class="user ml-2">
                                <div class="info-user ml-2">
                                    <span class="name">{{ $debitor->name }}</span>
                                    <span
                                        class="status text-{{ (\App\Enums\DebitorStatus::Done->value === $debitor->status ? 'success' : \App\Enums\DebitorStatus::Pending->value === $debitor->status) ? 'danger' : 'warning' }}"
                                        style="font-size: 11px">{{ $debitor->status }}</span>
                                </div>
                            </div>
                            <div class="list-group-item-figure ml-auto">
                                <div class="dropdown">
                                    <button class="btn-dropdown btn btn-light" data-toggle="dropdown">
                                        <i class="icon-options-vertical"></i>
                                    </button>
                                    <div class="dropdown-arrow"></div>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <form
                                            action="{{ route('user-debitors.status', ['user' => auth()->user()->id, 'debitor' => $debitor->id]) }}"
                                            method="POST" style="margin: 0px">
                                            @method('PATCH')
                                            @csrf
                                            <input type="hidden" name="status"
                                                value="{{ \App\Enums\DebitorStatus::Done->value }}">
                                            <button
                                                class="dropdown-item text-success {{ \App\Enums\DebitorStatus::Done->value === $debitor->status ? 'd-none' : '' }}"
                                                type="submit">
                                                Buat done
                                            </button>
                                        </form>

                                        <form
                                            action="{{ route('user-debitors.status', ['user' => auth()->user()->id, 'debitor' => $debitor->id]) }}"
                                            method="POST" style="margin: 0px">
                                            @method('PATCH')
                                            @csrf
                                            <input type="hidden" name="status"
                                                value="{{ \App\Enums\DebitorStatus::Progress->value }}">
                                            <button
                                                class="dropdown-item text-warning {{ \App\Enums\DebitorStatus::Progress->value === $debitor->status ? 'd-none' : '' }}"
                                                type="submit">
                                                Buat on progress
                                            </button>
                                        </form>
                                        <form
                                            action="{{ route('user-debitors.status', ['user' => auth()->user()->id, 'debitor' => $debitor->id]) }}"
                                            method="POST" style="margin: 0px">
                                            @method('PATCH')
                                            @csrf
                                            <input type="hidden" name="status"
                                                value="{{ \App\Enums\DebitorStatus::Pending->value }}">
                                            <button
                                                class="dropdown-item text-danger {{ \App\Enums\DebitorStatus::Pending->value === $debitor->status ? 'd-none' : '' }}"
                                                type="submit">
                                                Buat pending
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="conversations-body">
                        <div class="conversations-content bg-white">
                            @php $user =  auth()->user(); @endphp
                            @foreach ($debitor->notes as $note)
                                @if ($note->user_id == $user->id &&
                                    isset($debitor->notes[$loop->index - 1]) &&
                                    $debitor->notes[$loop->index - 1]->user_id == $note->user_id)
                                    <div class="message-content-wrapper">
                                        <div class="message message-out">
                                            <div class="message-body"
                                                style="display: flex; flex-direction: column; align-items: flex-end">
                                                <div class="message-content hidden-before" style="after">
                                                    <div class="content">
                                                        {{ $note->description }}
                                                    </div>
                                                </div>
                                                <div class="date">{{ $note->created_at }}</div>
                                            </div>
                                        </div>
                                    </div>
                                @elseif($note->user_id == $user->id)
                                    <div class="message-content-wrapper">
                                        <div class="message message-out">
                                            <div class="message-body"
                                                style="display: flex; flex-direction: column; align-items: flex-end">
                                                <div class="message-content" style="after">
                                                    <div class="content">
                                                        {{ $note->description }}
                                                    </div>
                                                </div>
                                                <div class="date">{{ $note->created_at }}</div>
                                            </div>
                                        </div>
                                    </div>
                                @elseif($note->user_id != $user->id &&
                                    isset($debitor->notes[$loop->index - 1]) &&
                                    $debitor->notes[$loop->index - 1]->user_id == $note->user_id)
                                    <div class="message-content-wrapper">
                                        <div class="message message-in">
                                            <div class="avatar avatar-sm">
                                            </div>
                                            <div class="message-body">
                                                <div class="message-content hidden-before">
                                                    <div class="name">
                                                        {{ $note->user->name }} - {{ $note->user->role }}
                                                    </div>
                                                    <div class="content">
                                                        {{ $note->description }}
                                                    </div>
                                                </div>
                                                <div class="date">{{ $note->created_at }}</div>
                                            </div>
                                        </div>
                                    </div>
                                @else
                                    <div class="message-content-wrapper">
                                        <div class="message message-in">
                                            <div class="rounded-circle border d-flex justify-content-center align-items-center"
                                                style="width:40px;height:40px">
                                                {{ iconName($note->user->name) }}
                                            </div>
                                            <div class="message-body">
                                                <div class="message-content">
                                                    <div class="name">{{ $note->user->name }} - {{ $note->user->role }}
                                                    </div>
                                                    <div class="content">
                                                        {{ $note->description }}
                                                    </div>
                                                </div>
                                                <div class="date">{{ $note->created_at }}</div>
                                            </div>
                                        </div>
                                    </div>
                                @endif
                            @endforeach
                        </div>
                    </div>
                    <form action="{{ route('note.store', ['user' => $user->id]) }}" method="post">
                        @csrf
                        <input type="hidden" name="user_id" value="{{ $user->id }}">
                        <input type="hidden" name="debitor_id" value="{{ $debitor->id }}">
                        <div class="messages-form d-flex align-items-center justify-content-between">
                            <div class="messages-form-control flex-1">
                                <textarea type="text" placeholder="Type here" name="description" required
                                    class="form-control input-pill input-solid message-input" rows="6"> 
                                </textarea>
                            </div>
                            <div class="messages-form-tool">
                                <button type="submit" class="btn btn-outline-secondary attachment">
                                    <i class="flaticon-file"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="page-sidebar">
                <div class="card-header bg-light">
                    <div class="card-title mb-1 name">Detail Debitur</div>
                </div>
                <div class="form-group">
                    <label for="name">Nama Debitur</label>
                    <p class="form-control">{{ $debitor->name }}</p>
                </div>
                <div class="form-check">
                    <label>Status Berkas</label><br />
                    <label class="form-radio-label ml-1">
                        <input
                            class="form-radio-input option-{{ (\App\Enums\DebitorStatus::Done->value === $debitor->status ? 'done' : \App\Enums\DebitorStatus::Pending->value === $debitor->status) ? 'pending' : 'on-progress' }}"
                            type="radio" name="optionsRadios" value="done" checked>
                        <span class="form-radio-sign">{{ $debitor->status }}</span>
                    </label>
                </div>
                <div class="form-group">
                    <label for="jenis-pengikatan">Jenis Pengikatan</label>
                    <p name="jenis-pengikatan" class="form-control">{{ $debitor->jenis_pengurusan }}</p>
                </div>
                <div class="form-group">
                    <label for="nilai-pengikatan">Nilai Pengikatan</label>
                    <p class="form-control" name="nilai-pengikatan">{{ $debitor->nilai_pengikatan }}</p>
                </div>
                <div class="form-group">
                    <label for="plafound-kredit">Plafound Kredit</label>
                    <p class="form-control" name="plafound-kredit">{{ $debitor->plafond_kredit }}</p>
                </div>
                <div class="form-group">
                    <label for="data-agunan">Data Agunan</label>
                    <p class="form-control" name="data-agunan">{{ $debitor->data_agunan }}</p>
                </div>
                <div class="form-group">
                    <label for="nomor-surat">No Surat</label>
                    <p name="nomor-surat" class="form-control">{{ $debitor->no_surat }}</p>
                </div>
                <div class="form-group">
                    <label for="no-covernote">Nomor Covernote</label>
                    <p class="form-control" name="no-covernote">{{ $debitor->nomor }}</p>
                </div>
                <div class="form-group">
                    <label for="cabang">Cabang</label>
                    <p class="form-control" name="cabang">{{ $debitor->branch->name }}</p>
                </div>
                <div class="form-group">
                    <label for="notaris">Notaris</label>
                    <p class="form-control" name="notaris">{{ $debitor->users[0]->name }}</p>
                </div>
                <div class="form-group">
                    <label for="alamat-jaminan">Alamat Jaminan</label>
                    <p class="form-control" name="alamat-jaminan">{{ $debitor->alamat }}</p>
                </div>
                <div class="form-group">
                    <label for="tanggal-order">Tanggal Order</label>
                    <p class="form-control" name="tanggal-order">{{ $debitor->tanggal_penyerahan }}</p>
                </div>
                <div class="form-group">
                    <label for="tanggal-berakhir-cover-note">Tanggal Berakhir Cover Note</label>
                    <p class="form-control" name="tanggal-berakhir-cover-note">{{ $debitor->tanggal_berakhir }}</p>
                </div>
            </div>
        </div>
    </div>
    @include('layouts.footer')
    <script>
        const dataMasterContainer = document.getElementById('daftar-note');
        dataMasterContainer.classList.add('active')
    </script>
@endsection
