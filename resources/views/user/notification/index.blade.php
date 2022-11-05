@extends('layouts.main')

@section('content')
    <div class="container container-full">
        <div class="page-inner page-inner-fill">
            <div class="mail-wrapper bg-white">
                <div class="page-content mail-content">
                    <div class="inbox-head d-lg-flex d-block">
                        <h2>Notifications</h2>
                        <form action="#" class="ml-auto">
                            <div class="input-group">
                                <input type="text" placeholder="Search Email" class="form-control">
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="fa fa-search search-icon"></i>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="inbox-body">
                        <div class="mail-option">
                            <div class="email-filters-left">
                                <div class="btn-group">
                                    <button data-toggle="dropdown" type="button"
                                        class="btn btn-secondary btn-border dropdown-toggle"> Order by </button>
                                    <div role="menu" class="dropdown-menu">
                                        <a href="#" class="dropdown-item">Date</a>
                                        <a href="#" class="dropdown-item">From</a>
                                        <a href="#" class="dropdown-item">Subject</a>
                                    </div>
                                </div>
                            </div>

                            <div class="email-filters-right ml-auto">
                                {{ $notifications->links() }}
                            </div>
                        </div>

                        <div class="email-list">
                            @foreach ($notifications as $notification)
                                @php
                                    $url = "route('user-debitors.status', ['user' => $notification->user_id, 'debitor' => $notification->note->debitor_id])";
                                @endphp
                                <div
                                    class="email-list-item {{ $notification->status === \App\Enums\NotificationEnum::Read->value ? '' : 'unread' }}">
                                    <div class="email-list-detail">
                                        <span class="date float-right">
                                            {{ $notification->created_at->diffForHumans() }}
                                        </span>
                                        <span class="from">
                                            {{ $notification->note->user->name }} - {{ $notification->note->user->role }}
                                        </span>
                                        <p class="msg"> {{ $notification->note->description }} </p>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('layouts.footer')
@endsection
