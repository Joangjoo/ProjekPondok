<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    public function store(Request $request, Kelas $kelas)
    {
        $userId = Auth::id();
        $user = User::find($userId);

        if ($user->kelas()->where('kelas_id', $kelas->id)->exists()) {
            return response()->json(['message' => 'Anda sudah terdaftar atau sedang menunggu konfirmasi untuk kursus ini.'], 409);
        }

        if ($kelas->berbayar) {
            $user->kelas()->attach($kelas->id, ['status' => 'pending']);
            return response()->json(['message' => 'Pendaftaran Anda sedang diproses. Mohon tunggu konfirmasi dari Admin.'], 201);
        } else {
            $user->kelas()->attach($kelas->id, ['status' => 'approved']);
            return response()->json(['message' => 'Selamat, Anda berhasil mendaftar di kursus gratis ini!'], 201);
        }
    }
}
