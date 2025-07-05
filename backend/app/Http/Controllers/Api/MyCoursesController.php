<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class MyCoursesController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id();
        $user = User::find($userId);

        $enrolledCourses = $user->kelas()
            ->withPivot('status', 'created_at')
            ->orderBy('pivot_created_at', 'desc') 
            ->get();

        return response()->json($enrolledCourses);
    }
}
