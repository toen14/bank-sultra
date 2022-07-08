<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Notification
 *
 * @property int $id
 * @property int $user_id
 * @property int $note_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Note|null $note
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|Notification newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Notification newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Notification query()
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereNoteId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Notification whereUserId($value)
 * @mixin \Eloquent
 */
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
