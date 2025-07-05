<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GuruResource\Pages;
use App\Filament\Resources\GuruResource\RelationManagers;
use App\Models\Guru;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class GuruResource extends Resource
{
    protected static ?string $model = Guru::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('nama')
                    ->label('Nama')
                    ->required()
                    ->maxLength(255),

                FileUpload::make('foto')
                    ->label('Foto')
                    ->image()
                    ->imageEditor()
                    ->directory('guru'),

                Textarea::make('bio')
                    ->label('Biografi')
                    ->maxLength(1000)
                    ->rows(5),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                TextColumn::make('nama')
                    ->label('Nama')
                    ->sortable()
                    ->searchable(),

                ImageColumn::make('foto')
                    ->label('Image')
                    ->width(100)
                    ->height(100)
                    ->disk('public')
                    ->url(fn($record) => asset('storage/' . $record->foto)),


                TextColumn::make('bio')
                    ->label('Biografi')
                    ->limit(50)
                    ->sortable()
                    ->searchable(),
            ])->filters([
                //
            ])->headerActions([
                Tables\Actions\CreateAction::make(),
            ])->actions([
                Tables\Actions\EditAction::make(),
            ])->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
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
            'index' => Pages\ListGurus::route('/'),
            'create' => Pages\CreateGuru::route('/create'),
            'edit' => Pages\EditGuru::route('/{record}/edit'),
        ];
    }
}
