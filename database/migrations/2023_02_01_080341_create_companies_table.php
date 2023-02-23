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
        Schema::create('companies', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('companyName');
            $table->string('address');
            $table->string('icon');
            $table->string('dtiNumber');
            $table->string('companyEmail');
            $table->string('companyContact');
            $table->string('companyStatus')->default('pending'); //Pending / Active / Deactivated / Requested Deactivation
            $table->string('reason')->nullable();
            $table->uuid('ownerId');
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
        Schema::dropIfExists('companies');
    }
};
