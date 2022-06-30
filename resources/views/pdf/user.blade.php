<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PDF- PENGGUNA</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
        integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
</head>

<body>
    <div>
        <h1>DATA PENGGUNA</h1>
    </div>
    <div class="table-responsive">
        <table id="users-datatables" class="display table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Role</th>
                    <th>Cabang</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($users as $user)
                    <tr>
                        <td> {{ $user['name'] }} </td>
                        <td> {{ $user['role'] }} </td>
                        <td> {{ $user->branch?->name }} </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>

</html>
