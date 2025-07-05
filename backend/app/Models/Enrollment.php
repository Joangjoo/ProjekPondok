<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enrollment extends Model
{
    protected $table = 'kelas_user';
    protected $fillable = [
        'user_id',
        'kelas_id',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    
    public function kelas(): BelongsTo
    {
        return $this->belongsTo(Kelas::class);
    }
}
