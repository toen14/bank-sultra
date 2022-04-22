<?php

namespace App\Enums;

enum DebitorStatus: string
{
    case Done = 'done';
    case Progress = 'progress';
    case Pending = 'pending';
}
