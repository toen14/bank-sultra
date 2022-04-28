<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
