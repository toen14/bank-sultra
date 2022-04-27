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
        Schema::table('debitors', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('debitors', function (Blueprint $table) {
            $table->enum('status', [
                DebitorStatus::Done->value,
                DebitorStatus::Progress->value,
                DebitorStatus::Pending->value,
                DebitorStatus::New->value,
            ])->default(DebitorStatus::New->value);
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
            $table->dropColumn('status');
        });

        Schema::table('debitors', function (Blueprint $table) {
            $table->enum('status', [
                DebitorStatus::Done->value,
                DebitorStatus::Progress->value,
                DebitorStatus::Pending->value,
            ]);
        });
    }
};
