<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Kelas extends Model
{
    protected $fillable = [
        'judul',
        'slug',
        'deskripsi',
        'thumbnail',
        'kategori_id',
        'level',
        'bahasa',
        'berbayar',
        'harga',
        'jumlah_pelajaran',
        'jumlah_video',
        'rating',
        'jumlah_review',
        'jumlah_pendaftar',
        'penyelenggara',
        'guru_id',
    ];

    public function kategori(): BelongsTo
    {
        return $this->belongsTo(Kategori::class);
    }

    public function guru(): BelongsTo
    {
        return $this->belongsTo(Guru::class);
    }
}
