<?php

namespace App\Enums;

enum UserRole: string
{
    case AdminPusat = 'Admin Pusat';
    case Apraisal = 'Admin Cabang';
    case Notaris = 'Notaris/PPAT';
    case Administrator = 'Administrator';
}
