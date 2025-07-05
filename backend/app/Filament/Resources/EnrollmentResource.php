<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EnrollmentResource\Pages;
use App\Filament\Resources\EnrollmentResource\RelationManagers;
use App\Models\Enrollment;
use Filament\Tables\Actions\Action;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EnrollmentResource extends Resource
{
    protected static ?string $model = Enrollment::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';
    protected static ?string $navigationLabel = 'Pendaftaran Kursus';
    protected static ?string $pluralModelLabel = 'Pendaftaran Kursus';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Nama Pengguna')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('kelas.judul')
                    ->label('Judul Kursus')
                    ->searchable()
                    ->sortable(),
                BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'approved',
                    ])
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Tanggal Daftar')
                    ->dateTime('d M Y')
                    ->sortable(),
                TextColumn::make('kelas.harga')
                    ->label('Harga Kelas')
                    ->formatStateUsing(fn($state) => $state ? 'Rp ' . number_format($state, 0, ',', '.') : 'Gratis')
                    ->searchable()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                    ])
            ])
            ->actions([
                Action::make('approve')
                    ->label('Setujui')
                    ->icon('heroicon-s-check-circle')
                    ->color('success')
                    ->action(function (Enrollment $record) {
                        $record->status = 'approved';
                        $record->save();
                    })
                    // Tombol ini hanya akan muncul jika statusnya 'pending'
                    ->visible(fn(Enrollment $record): bool => $record->status === 'pending'),

                Tables\Actions\DeleteAction::make()
                    ->modalHeading('Hapus Pendaftaran')
                    ->modalSubheading('Apakah Anda yakin ingin menghapus data pendaftaran ini? Tindakan ini tidak dapat dibatalkan.') 
                    ->modalButton('Ya, Hapus Saja'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEnrollments::route('/'),
            // 'create' => Pages\CreateEnrollment::route('/create'),
            // 'edit' => Pages\EditEnrollment::route('/{record}/edit'),
        ];
    }
}
