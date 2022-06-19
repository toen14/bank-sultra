<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PDF- CABANG</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
        integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
</head>

<body>
    <div>
        <h1>DATA CABANG</h1>
    </div>
    <div class="table-responsive">
        <table id="branchs-datatables" class="display table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Kabupaten / Kota</th>
                    <th>Dibuat / Didaftarkan</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($branches as $branch)
                    <tr>
                        <td> {{ $branch['name'] }} </td>
                        <td> {{ $branch->kabupatenKota->name }} </td>
                        <td> {{ $branch->created_at }} </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>

</html>
