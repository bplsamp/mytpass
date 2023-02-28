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
            $table->dateTime('completionDate')->nullable();;
            $table->dateTime('expiryDate')->nullable();
            $table->string('result')->nullable();;
            $table->string('feedback')->nullable();;
            $table->uuid('inputtedBy');
            $table->string('inputtedName');
            $table->string('certificate')->nullable();;
            $table->string('status');
            $table->string('venueUrl')->nullable();
            $table->string('type');
            $table->string('category');
            $table->boolean('isScheduled')->default(false);
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
