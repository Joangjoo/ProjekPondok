<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use Illuminate\Http\Request;

class KelasController extends Controller
{
    public function index()
    {
        // Ambil semua data Kelas beserta relasi Kategori dan Guru
        // Menggunakan select untuk memilih kolom yang relevan dan menghindari data sensitif
        $kelas = Kelas::with(['kategori:id,nama', 'guru:id,nama'])
                      ->select(
                          'id',
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
                          'guru_id'
                      )
                      ->get();

        return response()->json($kelas);
    }

    public function show($slug)
    {
        // Temukan Kelas tertentu berdasarkan slug beserta relasi Kategori dan Guru
        $kelas = Kelas::where('slug', $slug)
                      ->with(['kategori:id,nama', 'guru:id,nama'])
                      ->select(
                          'id',
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
                          'guru_id'
                      )
                      ->first();

        if (!$kelas) {
            return response()->json(['message' => 'Kelas not found'], 404);
        }

        return response()->json($kelas);
    }
}