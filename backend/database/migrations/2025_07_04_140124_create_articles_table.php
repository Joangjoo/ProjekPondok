<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('external_url')->unique();
            $table->text('excerpt')->nullable();
            $table->string('author')->default('Admin Yayasan Budi Mulya');
            $table->date('date');
            $table->string('read_time')->nullable();
            $table->string('category');
            $table->integer('views')->default(0);
            $table->integer('likes')->default(0);
            $table->string('image')->nullable();
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
