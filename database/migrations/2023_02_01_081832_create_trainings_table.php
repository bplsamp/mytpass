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
        Schema::create('trainings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('speaker');
            $table->string('provider');
            $table->dateTime('completionDate');
            $table->dateTime('expiryDate');
            $table->string('result');
            $table->string('feedback');
            $table->string('inputtedBy');
            $table->string('certificate');
            $table->string('status');
            $table->string('venueUrl')->nullable();
            $table->string('type');
            $table->string('category');
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
        Schema::dropIfExists('trainings');
    }
};
