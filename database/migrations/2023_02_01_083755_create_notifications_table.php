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
        Schema::create('notifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('userId');
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->boolean('read')->default(false);
            $table->boolean('trash')->default(false);
            $table->string('content');
            $table->string('status')->default('pending');
            $table->string('reason')->default('');
            $table->uuid('companyId')->nullable();
            $table->foreign('companyId')->references('id')->on('companies')->onDelete('cascade')->onUpdate('cascade');
            $table->uuid('senderId');
            $table->foreign('senderId')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->uuid('trainingId')->nullable();
            $table->foreign('trainingId')->references('id')->on('trainings')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('notifications');
    }
};
