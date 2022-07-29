<?php

namespace App\Enums;

enum DebitorStatus: string
{
    case Done = 'Done';
    case Progress = 'On Progress';
    case Pending = 'Pending';
    case New = 'New';
}
