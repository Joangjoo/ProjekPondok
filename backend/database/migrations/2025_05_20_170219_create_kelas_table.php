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
        Schema::create('kelas', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('slug')->unique();
            $table->text('deskripsi')->nullable();
            $table->string('thumbnail')->nullable();
            $table->foreignId('kategori_id')->constrained('kategoris');
            $table->enum('level', ['Pemula', 'Menengah', 'Semua Level']);
            $table->string('bahasa')->default('Indonesia');
            $table->boolean('berbayar')->default(false);
            $table->integer('harga')->nullable();
            $table->integer('jumlah_pelajaran')->default(0);
            $table->integer('jumlah_video')->default(0);
            $table->float('rating')->default(0);
            $table->integer('jumlah_review')->default(0);
            $table->integer('jumlah_pendaftar')->default(0);
            $table->string('penyelenggara')->nullable();
            $table->foreignId('guru_id')->constrained('gurus');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelas');
    }
};
