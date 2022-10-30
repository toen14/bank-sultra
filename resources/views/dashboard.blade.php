@extends('layouts.main')

@section('content')
    <div class="container container-full">
        <div class="panel-header bg-primary-gradient">
            <div class="page-inner py-5">
                <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                    <div>
                        <h2 class="text-white pb-2 fw-bold">Dashboard</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-inner mt--5">
            <div class="row mt--2">
                <div class="col-md-8">
                    <div class="card full-height">
                        <div class="card-body">
                            <div class="card-title">Data Pemberkasan</div>
                            <div class="card-category mb-2">
                                Informasi tentang distribusi data
                            </div>
                            <div class="row">
                                <div class="col-sm-6 col-md-6">
                                    <div class="card card-stats card-primary card-round">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-5">
                                                    <div class="icon-big text-center">
                                                        <i class="fas fa-book"></i>
                                                    </div>
                                                </div>
                                                <div class="col-7 col-stats">
                                                    <div class="numbers">
                                                        <p class="card-category">Total Document</p>
                                                        <h4 class="card-title"> {{ $countDebitor }} </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-6">
                                    <div class="card card-stats card-success card-round">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-5">
                                                    <div class="icon-big text-center">
                                                        <i class="fas fa-clipboard-check"></i>
                                                    </div>
                                                </div>
                                                <div class="col-7 col-stats">
                                                    <div class="numbers">
                                                        <p class="card-category">Done</p>
                                                        <h4 class="card-title"> {{ $countDone }} </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-6">
                                    <div class="card card-stats card-warning card-round">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-5">
                                                    <div class="icon-big text-center">
                                                        <i class="fas fa-hourglass-half"></i>
                                                    </div>
                                                </div>
                                                <div class="col-7 col-stats">
                                                    <div class="numbers">
                                                        <p class="card-category">Progress</p>
                                                        <h4 class="card-title"> {{ $countProgress }} </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-6">
                                    <div class="card card-stats card-danger card-round">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-5">
                                                    <div class="icon-big text-center">
                                                        <i class="fas fa-info-circle"></i>
                                                    </div>
                                                </div>
                                                <div class="col-7 col-stats">
                                                    <div class="numbers">
                                                        <p class="card-category">Pending</p>
                                                        <h4 class="card-title"> {{ $countPending }} </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card full-height">
                        <div class="card-body">
                            <div class="card-title">Presentase Data</div>
                            <div class="chart-container my-0">
                                <canvas id="pieChart" style="width: 50%; height: 50%"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-inner mt--5">
            <div class="row row-card-no-pd">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-head-row card-tools-still-right">
                                <h4 class="card-title">Users Geolocation</h4>
                            </div>
                            <p class="card-category">
                                Distribution of users
                            </p>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="table-responsive table-hover table-sales">
                                        <table class="table" id="table-percentage-users">
                                            <thead>
                                                <tr>
                                                    <th style="width: 10%">No</th>
                                                    <th>Kabupatan/Kota</th>
                                                    <th>Total Users</th>
                                                    <th style="width: 10%">Presentase</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th style="width: 10%; height: 35px;">No</th>
                                                    <th style="height: 35px;">Kabupatan/Kota</th>
                                                    <th style="height: 35px;">Total Users</th>
                                                    <th style="width: 10%; height: 35px;">Presentase</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                @php
                                                    $no = 1;
                                                @endphp
                                                @foreach ($kabKota as $kK)
                                                    <tr>
                                                        <td>
                                                            {{ $no }}
                                                        </td>
                                                        <td>{{ $kK->name }}</td>
                                                        @php
                                                            $countUsers = 0;
                                                        @endphp
                                                        @foreach ($kK->branches as $branche)
                                                            @php
                                                                $countUsers += $branche->users->count();
                                                            @endphp
                                                        @endforeach
                                                        <td class="text-right">
                                                            {{ $countUsers }}
                                                        </td>
                                                        <td class="text-right">
                                                            {{ number_format(($countUsers / $totalAllUsers) * 100, 2, ',') . '%' }}
                                                        </td>
                                                    </tr>
                                                    @php
                                                        $no++;
                                                    @endphp
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
        </div>
    </div>
    @include('layouts.footer')
    @include('layouts.script')
    <script>
        // add active class
        const liDashboard = document.getElementById('li-dashboard');
        liDashboard.classList.add('active');

        const pieChart = document.getElementById("pieChart").getContext("2d");
        var myPieChart = new Chart(pieChart, {
            type: "pie",
            data: {
                datasets: [{
                    data: [{{ $countDone }}, {{ $countProgress }}, {{ $countPending }}],
                    backgroundColor: ["#28a745", "#fdaf4b", "#f3545d"],
                    borderWidth: 0,
                }, ],
                labels: ["Done", "Progress", "Pending"],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: "bottom",
                    labels: {
                        fontColor: "rgb(154, 154, 154)",
                        fontSize: 11,
                        usePointStyle: true,
                        padding: 20,
                    },
                },
                pieceLabel: {
                    render: "percentage",
                    fontColor: "white",
                    fontSize: 12,
                },
                tooltips: false,
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                        top: 20,
                        bottom: 20,
                    },
                },
            },
        });

        $('#table-percentage-users').DataTable({
            "pageLength": 5,
            initComplete: function() {
                this.api().columns().every(function() {
                    var column = this;
                    console.log(column);
                    var select = $(
                            '<select class="form-control"><option value=""></option></select>'
                        )
                        .appendTo($(column.footer()).empty())
                        .on('change', function() {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );

                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });

                    column.data().unique().sort().each(function(d, j) {
                        select.append('<option value="' + d + '">' + d + '</option>')
                    });
                });
            }
        });
    </script>
@endsection
