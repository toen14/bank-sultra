<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PDF - DEBITUR</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
        integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
</head>

<body>
    <div>
        <h1>DATA DEBITUR</h1>
    </div>
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
                </tr>
            </thead>
            <tbody>
                @foreach ($debitors as $debitor)
                    <tr>
                        <td> {{ $debitor['name'] }} </td>
                        <td> {{ $debitor['jenis_pengurusan'] }} </td>
                        <td> {{ $debitor['data_agunan'] }} </td>
                        <td> {{ $debitor['cabang_id'] }} </td>
                        <td>
                            @if ($debitor->users->count())
                                @foreach ($debitor->users as $notaris)
                                    <a class="dropdown-item">
                                        {{ $notaris->name }}
                                    </a>
                                @endforeach
                            @endif
                        </td>
                        <td> {{ $debitor['nomor'] }} </td>
                        <td> {{ $debitor['status'] }} </td>
                        <td> {{ $debitor['alamat'] }} </td>
                        <td> {{ $debitor['tanggal_penyerahan'] }} </td>
                        <td> {{ $debitor['tanggal_berakhir'] }} </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>

</html>
