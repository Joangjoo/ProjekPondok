<?php

namespace App\Filament\Resources;

use App\Filament\Resources\KelasResource\Pages;
use App\Filament\Resources\KelasResource\RelationManagers;
use App\Models\Kelas;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\BooleanColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class KelasResource extends Resource
{
    protected static ?string $model = Kelas::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('judul')->required()->maxLength(255),
                TextInput::make('slug')->required()->maxLength(255),
                Textarea::make('deskripsi')->nullable(),
                FileUpload::make('thumbnail')->directory('thumbnails')->image(),
                Select::make('kategori_id')
                    ->relationship('kategori', 'nama')
                    ->required(),
                Select::make('level')
                    ->options([
                        'Pemula' => 'Pemula',
                        'Menengah' => 'Menengah',
                        'Semua Level' => 'Semua Level',
                    ])
                    ->required(),
                TextInput::make('bahasa')->default('Indonesia'),
                Toggle::make('berbayar')->label('Apakah Berbayar?'),
                TextInput::make('harga')->numeric()->nullable(),
                TextInput::make('jumlah_pelajaran')->numeric()->default(0),
                TextInput::make('jumlah_video')->numeric()->default(0),
                TextInput::make('rating')->numeric()->default(0),
                TextInput::make('jumlah_review')->numeric()->default(0),
                TextInput::make('jumlah_pendaftar')->numeric()->default(0),
                TextInput::make('penyelenggara')->nullable(),
                Select::make('guru_id')
                    ->relationship('guru', 'nama')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('judul')->searchable()->sortable(),
                TextColumn::make('kategori.nama'),
                TextColumn::make('guru.nama'),
                TextColumn::make('level'),
                BooleanColumn::make('berbayar')
                    ->label('Active')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('harga')->money('IDR'),
                TextColumn::make('created_at')->dateTime(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListKelas::route('/'),
            'create' => Pages\CreateKelas::route('/create'),
            'edit' => Pages\EditKelas::route('/{record}/edit'),
        ];
    }
}
