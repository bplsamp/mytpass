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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('type')->default('basic');
            $table->dateTime('expiryDate')->nullable();
            $table->dateTime('startDate')->nullable();
            $table->uuid('companyId');
            $table->foreign('companyId')->references('id')->on('companies')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('maxEmployee')->default(30);
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
        Schema::dropIfExists('subscriptions');
    }
};
