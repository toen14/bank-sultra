<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;

use App\Enums\UserRole;
use App\Models\Debitor;
use App\Models\User;

class DebitorPolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     *
     * @param  \App\Models\User  $user
     * @param  string  $ability
     * @return void|bool
     */
    public function before(User $user)
    {
        if ($user->role === UserRole::AdminPusat->value) {
            return true;
        }
    }

    /**
     * Determine if the given post can be updated by the user.
     * 
     * @param  \App\Models\Debitor  $notification
     * @return bool
     */
    public function updateStatus(User $user, Debitor $debitor)
    {
        return $debitor->users[0]->role == UserRole::Notaris->value && $debitor->users[0]->id == $user->id;
    }
}
