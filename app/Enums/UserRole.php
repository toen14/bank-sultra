<?php

namespace App\Enums;

enum UserRole: string
{
    case AdminPusat = 'admin pusat';
    case Apraisal = 'apraisal';
    case Notaris = 'notaris';
    case Administrator = 'administrator';
}
