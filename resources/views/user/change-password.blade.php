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
                                        <a class="nav-link" href="{{ route('profile.index') }}">Profile</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link active show" href="{{ route('change-password.index') }}">
                                            Change Password
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="{{ route('change-password.update', ['change_password' => $user->id]) }}"
                                method="post">
                                @method('PATCH')
                                @csrf
                                <div class="row mt-3">
                                    <div class="col-md-12">
                                        <div class="form-group form-group-default">
                                            <label>Old Password</label>
                                            <input type="password" class="form-control" name="old_password"
                                                placeholder="Old Password">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12">
                                        <div class="form-group form-group-default">
                                            <label>New Password</label>
                                            <input type="password" class="form-control" name="new_password"
                                                placeholder="New Password">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12">
                                        <div class="form-group form-group-default">
                                            <label>Re New Password</label>
                                            <input type="password" class="form-control" name="re_new_password"
                                                placeholder="Re New Password">
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
