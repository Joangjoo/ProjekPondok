<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $kelas = Kelas::with(['kategori:id,nama', 'guru:id,nama,bio'])->findOrFail($id);
        $kelas->enrollment_status = null;
        if (Auth::guard('sanctum')->check()) {
            $userId = Auth::guard('sanctum')->id();
            $user = User::find($userId);
            $enrollment = $user->kelas()->where('kelas_id', $kelas->id)->first();
            if ($enrollment) {
                $kelas->enrollment_status = $enrollment->pivot->status;
            }
        }
        return response()->json($kelas);
    }
}
