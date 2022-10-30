<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Branch
 *
 * @property int $id
 * @property string $name
 * @property int $kabupaten_kota_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\KabupatenKota|null $kabupatenKota
 * @method static \Illuminate\Database\Eloquent\Builder|Branch newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Branch newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Branch query()
 * @method static \Illuminate\Database\Eloquent\Builder|Branch whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Branch whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Branch whereKabupatenKotaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Branch whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Branch whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Branch extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'kabupaten_kota_id',
    ];

    /**
     * The branch has one kabupatenKota.
     */
    public function kabupatenKota()
    {
        return $this->belongsTo(KabupatenKota::class, 'kabupaten_kota_id');
    }

    /**
     * The branch has many users.
     */
    public function users()
    {
        return $this->hasMany(User::class, 'cabang_id');
    }
}
