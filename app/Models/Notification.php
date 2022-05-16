<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'note_id',
        'status',
    ];

    /**
     * The user that belong to the note.
     */
    public function note()
    {
        return $this->belongsTo(Note::class, 'note_id');
    }

    /**
     * The user that belong to the user.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
