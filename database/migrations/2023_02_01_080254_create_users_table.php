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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('avatar')->nullable();
            $table->string('role');
            $table->string('expertise');
            $table->string('firstName');
            $table->string('lastName');
            $table->string('middleInitial');
            $table->string('contact')->unique();
            $table->string('specify');
            $table->boolean('isSearchable')->default(true);
            $table->string('bio')->nullable();
            $table->uuid('companyId')->nullable();
            $table->timestamp('email_verified_at')->nullable();
           // $table->foreign('companyId')->references('id')->on('companies')->onDelete('cascade')->onUpdate('cascade');
            $table->string('liked')->nullable();
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
        Schema::dropIfExists('users');
    }
};
