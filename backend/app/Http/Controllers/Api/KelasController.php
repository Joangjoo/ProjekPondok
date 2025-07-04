<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use Illuminate\Http\Request;

class KelasController extends Controller
{
    public function index()
    {
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
                'video_url',
                'guru_id'
            )
            ->get();

        return response()->json($kelas);
    }

    public function show($id)
    {
        $kelas = Kelas::where('id', $id)
            ->with(['kategori:id,nama', 'guru:id,nama,bio'])
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
                'video_url',
                'guru_id'
            )
            ->find($id);

        if (!$kelas) {
            return response()->json(['message' => 'Kelas not found'], 404);
        }

        return response()->json($kelas);
    }
}
