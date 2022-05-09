#### Create a new user

on terminal insert: <strong> php artisan tinker </strong>
```php
$user = new App\Models\User
$user->name = 'Admin'
$user->role = 'admin pusat' ('admin pusat', 'apraisal', 'notaris', 'administrator')
$user->alamat = 'Kendari'
$user->email = 'admin@admin.com'
$user->password = Hash::make('12345678')
$user->save()
```