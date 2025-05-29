<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        // Mengkonfigurasi pembatasan laju (rate limiting) untuk API
        $this->configureRateLimiting();

        // Mendefinisikan rute-rute aplikasi
        $this->routes(function () {
            // Rute API:
            // Rute-rute ini berada dalam grup middleware 'api'
            // dan memiliki prefiks URL 'api' (misalnya, /api/kelas)
            Route::middleware('api')
                ->prefix('api') // Ini penting: 'api' sebagai prefiks untuk semua rute di api.php
                ->group(base_path('routes/api.php')); // Memuat file routes/api.php

            // Rute Web:
            // Rute-rute ini berada dalam grup middleware 'web'
            // yang menyediakan fitur seperti state sesi dan perlindungan CSRF.
            Route::middleware('web')
                ->group(base_path('routes/web.php')); // Memuat file routes/web.php
        });
    }

    /**
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting(): void
    {
        // Contoh pembatasan laju untuk API, 60 permintaan per menit per IP
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        // Anda bisa menambahkan pembatasan laju lainnya di sini jika diperlukan
    }
}
