<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KabupatenKota
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|KabupatenKota newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KabupatenKota newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KabupatenKota query()
 * @method static \Illuminate\Database\Eloquent\Builder|KabupatenKota whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KabupatenKota whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KabupatenKota whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KabupatenKota whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class KabupatenKota extends Model
{
    use HasFactory, HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'kabupaten_kota';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
    ];

    /**
     * Get the branches record associated.
     */
    public function branches()
    {
        return $this->hasMany(Branch::class, 'kabupaten_kota_id');
    }
}
