<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

use App\Models\KabupatenKota;

class KabupatenKotaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        $now = Carbon::now()->toDateTimeString();
        $daftar_kabupaten_kota = [
            [
                'name' => 'Bombana',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Buton',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Buton Selatan',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Buton Tengah',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Buton Utara',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Kolaka',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Kolaka Timur',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Kolaka Utara',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Konawe',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Konawe Kepulauan',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Konawe Selatan',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Konawe Utara',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Muna',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Muna Barat',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Wakatobi',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Baubau',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'Kendari',
                'created_at' => $now,
                'updated_at' => $now
            ],
        ];

        KabupatenKota::insert($daftar_kabupaten_kota);
    }
}
