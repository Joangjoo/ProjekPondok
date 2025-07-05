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
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class KelasResource extends Resource
{
    protected static ?string $model = Kelas::class;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';

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
                        'Profesional' => 'Profesional',
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
                TextInput::make('video_url')
                    ->label('URL Video YouTube')
                    ->placeholder('https://www.youtube.com/watch?v=...')
                    ->helperText('Masukkan link YouTube biasa, akan otomatis dikonversi ke format embed')
                    ->afterStateUpdated(function ($state, $set) {
                        $embedUrl = (new Kelas())->convertToEmbedUrl($state);
                        $set('video_url', $embedUrl);
                    }),
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
                ImageColumn::make('thumbnail')
                    ->disk('public')
                    ->size(50)
                    ->circular(),
                TextColumn::make('video_url')
                    ->label('Video URL')
                    ->searchable(),
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
