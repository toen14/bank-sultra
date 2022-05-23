<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\Note;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
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
        if ($user->role === UserRole::Administrator->value) {
            return true;
        }
    }

    /**
     * Determine if the given post can be updated by the user.
     * 
     * @param  \App\Models\UpdateUserRequest  $post
     * @return bool
     */
    public function show(User $user, User $userAccess)
    {
        return $user->id === $userAccess->id;
    }
}
