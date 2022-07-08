<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Debitor
 *
 * @property int $id
 * @property string $name
 * @property string $jenis_pengurusan
 * @property string $data_agunan
 * @property int $cabang_id
 * @property string $nomor
 * @property string $alamat
 * @property string $tanggal_penyerahan
 * @property string $tanggal_berakhir
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $status
 * @property-read \App\Models\Branch|null $branch
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Note[] $notes
 * @property-read int|null $notes_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor query()
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor whereAlamat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor whereCabangId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor whereDataAgunan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor whereJenisPengurusan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor whereNomor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor whereTanggalBerakhir($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor whereTanggalPenyerahan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Debitor whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Debitor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'jenis_pengurusan',
        'data_agunan',
        'cabang_id',
        'nomor',
        'status',
        'alamat',
        'tanggal_penyerahan',
        'tanggal_berakhir'
    ];

    /**
     * The users that belong to the user.
     */
    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    /**
     * The Debitor has many notes.
     */
    public function notes()
    {
        return $this->hasMany(Note::class, 'debitor_id');
    }

    /**
     * The debitor that belong to the branch.
     */
    public function branch()
    {
        return $this->belongsTo(Branch::class, 'cabang_id');
    }
}
