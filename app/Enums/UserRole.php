<?php

namespace App\Enums;

enum UserRole: string
{
    case AdminPusat = 'Admin Pusat';
    case Apraisal = 'Apraisal';
    case Notaris = 'Notaris';
    case Administrator = 'Administrator';
}
