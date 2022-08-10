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
        Schema::table('debitors', function (Blueprint $table)
        {
            $table->string('tanggal_penyerahan')->default("")->change();
            $table->string('tanggal_berakhir')->default("")->change();
            $table->bigInteger('nilai_pengikatan')->default(0);
            $table->bigInteger('plafond_kredit')->default(0);
            $table->string('no_surat')->default("");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('debitors', function (Blueprint $table)
        {
            $table->string('tanggal_penyerahan')->change();
            $table->string('tanggal_berakhir')->change();
            $table->dropColumn('nilai_pengikatan');
            $table->dropColumn('plafond_kredit');
            $table->dropColumn('no_surat')->default("");
        });
    }
};
