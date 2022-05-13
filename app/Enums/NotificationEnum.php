<?php

namespace App\Enums;

enum NotificationEnum: string
{
    case Read = 'read';
    case Unread = 'unread';
}
