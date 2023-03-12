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
        Schema::disableForeignKeyConstraints();
        Schema::create('training_users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('trainingId');
            $table->foreign('trainingId')->references('id')->on('trainings')->onDelete('cascade')->onUpdate('cascade');
            $table->uuid('userId');
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->uuid('companyId')->nullable();
            $table->foreign('companyId')->references('id')->on('company')->onDelete('set null')->onUpdate('cascade');
            $table->string('userName');
            $table->timestamps();
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('training_user');
    }
};
