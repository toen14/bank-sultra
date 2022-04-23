<?php

namespace App\Enums;

enum NoteUserStatus: string
{
    case Read = 'read';
    case Unread = 'unread';
}
