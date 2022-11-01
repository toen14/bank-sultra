@extends('layouts.main')

@php
    $user = auth()->user();
@endphp

@section('content')
    <div class="container container-full">
        <div class="page-inner">
            <h4 class="page-title">User Profile</h4>
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-with-nav">
                        <div class="card-header">
                            <div class="row row-nav-line">
                                <ul class="nav nav-tabs nav-line nav-color-secondary w-100 pl-4" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active show" href="{{ route('profile.index') }}">Profile</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="{{ route('change-password.index') }}">Change Password</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="{{ route('profile.update', ['profile' => $user->id]) }}" method="post">
                                @method('PATCH')
                                @csrf
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <div class="form-group form-group-default">
                                            <label>Name</label>
                                            <input type="text" class="form-control" name="name" placeholder="Name"
                                                value="{{ $user->name }}">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group form-group-default">
                                            <label>Email</label>
                                            <input type="email" class="form-control" name="email" placeholder="Name"
                                                value="{{ $user->email }}">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-{{ $user->cabang_id ? 4 : 6 }}">
                                        <div class="form-group form-group-default">
                                            <label>Role</label>
                                            <input type="text" class="form-control" value="{{ $user->role }}"
                                                name="role" placeholder="Role" disabled
                                                style="background-color: white !important; color: black !important;">
                                        </div>
                                    </div>
                                    @if ($user->cabang_id)
                                        <div class="col-md-4">
                                            <div class="form-group form-group-default">
                                                <label>Branch</label>
                                                <input type="text" class="form-control" value="{{ $user->branch->name }}"
                                                    placeholder="Branch" disabled
                                                    style="background-color: white !important; color: black;">
                                            </div>
                                        </div>
                                    @endif
                                    <div class="col-md-{{ $user->cabang_id ? 4 : 6 }}">
                                        <div class="form-group form-group-default">
                                            <label>Status</label>
                                            <input type="text" class="form-control" value="{{ $user->status }}"
                                                placeholder="Status"
                                                style="background-color: white !important; color: black;" disabled>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12">
                                        <div class="form-group form-group-default">
                                            <label>Address</label>
                                            <input type="text" class="form-control" value="{{ $user->alamat }}"
                                                name="alamat" placeholder="Address">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12">
                                        <div class="form-group form-group-default">
                                            <label>Joined</label>
                                            <input type="text" class="form-control"
                                                value="{{ $user->created_at }}  ---  {{ $user->created_at->diffForHumans() }}"
                                                name="joined" placeholder="Joined" disabled
                                                style="background-color: white !important; color: black !important;">
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right mt-3 mb-3">
                                    <button type="submit" class="btn btn-success">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('layouts.footer')
@endsection
