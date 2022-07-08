<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Note
 *
 * @property int $id
 * @property int $user_id
 * @property int $debitor_id
 * @property string $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Debitor|null $debitor
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|Note newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Note newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Note query()
 * @method static \Illuminate\Database\Eloquent\Builder|Note whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Note whereDebitorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Note whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Note whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Note whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Note whereUserId($value)
 * @mixin \Eloquent
 */
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
        return $this->belongsTo(User::class, 'user_id')->select(['id', 'name', 'role']);
    }

    /**
     * The debitor that belong to the debitor.
     */
    public function debitor()
    {
        return $this->belongsTo(Debitor::class, 'debitor_id');
    }
}
