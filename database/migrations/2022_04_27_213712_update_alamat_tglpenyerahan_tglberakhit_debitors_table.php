<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('debitors', function (Blueprint $table) {
            $table->renameColumn('alamat_id', 'alamat');
            $table->string('tanggal_penyerahan')->change();
            $table->string('tanggal_berakhir')->change();
        });

        Schema::table('debitors', function (Blueprint $table) {
            $table->string('alamat')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('debitors', function (Blueprint $table) {
            $table->renameColumn('alamat', 'alamat_id');
            $table->date('tanggal_penyerahan')->change();
            $table->date('tanggal_berakhir')->change();
        });

        Schema::table('debitors', function (Blueprint $table) {
            $table->date('alamat_id')->change();
        });
    }
};
