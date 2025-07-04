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
        'video_url',
    ];

    public function kategori(): BelongsTo
    {
        return $this->belongsTo(Kategori::class);
    }

    public function guru(): BelongsTo
    {
        return $this->belongsTo(Guru::class);
    }

    public function setVideoUrlAttribute($value)
    {
        if (empty($value)) {
            $this->attributes['video_url'] = null;
            return;
        }

        $this->attributes['video_url'] = $this->convertToEmbedUrl($value);
    }

    public static function convertToEmbedUrl($url)
    {
        if (str_contains($url, 'youtube.com/embed')) {
            return $url;
        }

        $patterns = [
            '/youtube\.com\/watch\?v=([^&]+)/',
            '/youtu\.be\/([^?]+)/',
            '/youtube\.com\/embed\/([^\/]+)/'
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $url, $matches)) {
                return "https://www.youtube.com/embed/{$matches[1]}";
            }
        }

        return $url;
    }
}
