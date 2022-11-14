@extends('layouts.main')

@section('content')
    <div class="container container-full">
        <div class="page-inner">
            <div class="row">
                <div class="col-md-12">
                    <div class="d-flex justify-content-between">
                        <div class="d-md-inline-block">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-white">
                                        <i class="fa fa-search search-icon"></i>
                                    </span>
                                </div>
                                <input type="text" class="form-control" aria-label="Text input with dropdown button">
                                <div class="input-group-append">
                                    <button class="btn btn-secondary" type="button">Filter</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section class="card mt-4">
                        @php $user =  auth()->user(); @endphp
                        @foreach ($debitors as $debitor)
                            <div class="list-group list-group-messages list-group-flush">
                                <div class="list-group-item">
                                    <div class="list-group-item-body pl-3 pl-md-4">
                                        <div class="row">
                                            <div class="col-12 col-lg-10">
                                                <h4 class="list-group-item-title">
                                                    <a
                                                        href="{{ route('user-debitors.show', ['user' => $user->id, 'debitor' => $debitor->id]) }}">{{ $debitor->name }}</a>
                                                </h4>
                                                <p class="list-group-item-text text-truncate">
                                                    {{ $debitor->branch->name }}
                                                </p>
                                            </div>
                                            <div class="col-12 col-lg-2 text-lg-right">
                                                @if (\App\Enums\DebitorStatus::Pending->value === $debitor->status)
                                                    <span
                                                        class="badge badge-pill badge-danger">{{ $debitor->status }}</span>
                                                @elseif(\App\Enums\DebitorStatus::Done->value === $debitor->status)
                                                    <span
                                                        class="badge badge-pill badge-success">{{ $debitor->status }}</span>
                                                @else
                                                    <span
                                                        class="badge badge-pill badge-warning">{{ $debitor->status }}</span>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                    <div class="list-group-item-figure">
                                        <div class="dropdown">
                                            <button class="btn-dropdown" data-toggle="dropdown">
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
                                                        Set as done
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
                                                        Set as on progress
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
                                                        Set as pending
                                                    </button>
                                                </form>
                                                <a href="{{ route('user-debitors.show', ['user' => $user->id, 'debitor' => $debitor->id]) }}"
                                                    class="dropdown-item text-secondary">Detail</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </section>
                    {{ $debitors->links() }}
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
