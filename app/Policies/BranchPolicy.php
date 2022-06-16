<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;

use App\Enums\UserRole;
use App\Models\Branch;
use App\Models\User;

class BranchPolicy
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
     * @return bool
     */
    public function show(User $user, Branch $branch)
    {
        return $user->cabang_id === $branch->id;
    }
}
