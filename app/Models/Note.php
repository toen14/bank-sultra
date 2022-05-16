<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'debitor_id',
        'description',
    ];

    /**
     * The user that belong to the user.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * The debitor that belong to the debitor.
     */
    public function debitor()
    {
        return $this->belongsTo(Debitor::class, 'debitor_id');
    }
}
