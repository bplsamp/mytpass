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
        Schema::create('attendances', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('userId');
            $table->string('userFullname');
            $table->string('contact');
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->uuid('trainingId');
            $table->foreign('trainingId')->references('id')->on('trainings')->onDelete('cascade')->onUpdate('cascade');
            $table->uuid('companyId');
            $table->foreign('companyId')->references('id')->on('companies')->onDelete('cascade')->onUpdate('cascade');
            $table->boolean('isPresent')->default(false);
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
        Schema::dropIfExists('attendances');
    }
};
