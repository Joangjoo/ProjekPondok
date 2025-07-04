<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArticleResource\Pages;
use App\Filament\Resources\ArticleResource\RelationManagers;
use App\Models\Article;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class ArticleResource extends Resource
{
    protected static ?string $model = Article::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                TextInput::make('external_url')
                    ->label('Link Artikel Asli (URL Lengkap)')
                    ->required()
                    ->url()
                    ->maxLength(255)
                    ->unique(Article::class, 'external_url', ignoreRecord: true),
                Textarea::make('excerpt')
                    ->label('Cuplikan Singkat')
                    ->maxLength(65535)
                    ->rows(3)
                    ->columnSpanFull(),
                TextInput::make('author')
                    ->maxLength(255)
                    ->default('Admin Yayasan'),
                DatePicker::make('date')
                    ->required()
                    ->default(now()),
                TextInput::make('read_time')
                    ->maxLength(255)
                    ->nullable(),
                Select::make('category')
                    ->options([
                        'Pendidikan' => 'Pendidikan',
                        'Keagamaan' => 'Keagamaan',
                        'Sosial' => 'Sosial',
                        'Komunitas' => 'Komunitas',
                        'Berita' => 'Berita',
                    ])
                    ->required(),
                TextInput::make('views')
                    ->numeric()
                    ->default(0),
                TextInput::make('likes')
                    ->numeric()
                    ->default(0),
                FileUpload::make('image')
                    ->image()
                    ->directory('articles')
                    ->nullable(),
                Toggle::make('featured')
                    ->label('Artikel Unggulan')
                    ->default(false),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->square(),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('category')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('author')
                    ->searchable(),
                TextColumn::make('date')
                    ->date()
                    ->sortable(),
                TextColumn::make('external_url')
                    ->label('Link Asli')
                    ->url(fn($record) => $record->external_url)
                    ->openUrlInNewTab(),
                IconColumn::make('featured')
                    ->boolean()
                    ->label('Unggulan'),
                TextColumn::make('views')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('likes')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
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
            'index' => Pages\ListArticles::route('/'),
            'create' => Pages\CreateArticle::route('/create'),
            'edit' => Pages\EditArticle::route('/{record}/edit'),
        ];
    }
}
