<?php

use App\Models\SubscriptionContent;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Http\Controllers\AuthController;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscription_contents', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("type");
            $table->string("desc")->nullable();
            $table->float("price");
            $table->string("style")->nullable();
            $table->string("button")->nullable();
            $table->timestamps();
        });

        SubscriptionContent::create([
            "type" => "basic",
            "desc" => "Up to 30 employees for your company!",
            "price" => 0,
            "style" => "bg-[#D9D9D9]",
            "button" => "FREE",
        ]);

         SubscriptionContent::create([
            "type" => "premium",
            "desc" => "Up to 100 employees for your company!",
            "price" => 2999,
            "style" => "bg-[#BBD6F4]",
            "button" => "SUBSCRIBE",
        ]);

         SubscriptionContent::create([
            "type" => "platinum",
            "desc" => "Up to 1000 employees for your company!",
            "price" => 4999,
            "style" => "bg-[#FF8E25]",
            "button" => "SUBSCRIBE",
        ]);

        AuthController::createDefaultUsers();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subscription_content');
    }
};
