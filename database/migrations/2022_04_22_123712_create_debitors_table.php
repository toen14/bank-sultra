<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Enums\DebitorStatus;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('debitors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('jenis_pengurusan');
            $table->string('data_agunan');
            $table->bigInteger('cabang_id');
            $table->string('nomor');
            $table->enum('status', [
                DebitorStatus::Done->value,
                DebitorStatus::Progress->value,
                DebitorStatus::Pending->value,
            ]);
            $table->bigInteger('alamat_id');
            $table->bigInteger('notaris_id');
            $table->date('tanggal_penyerahan');
            $table->date('tanggal_berakhir');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('debitors');
    }
};
