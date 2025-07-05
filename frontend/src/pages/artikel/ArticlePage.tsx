import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, ArrowRight, Eye, Heart } from 'lucide-react';
import Layout from '../../components/layout/Layout';

interface Article {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    views: number;
    likes: number;
    image: string | null;
    featured: boolean;
    url: string;
}

const ArtikelPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [sortBy, setSortBy] = useState('terbaru');
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const categories = ['Semua', 'Pendidikan', 'Keagamaan', 'Sosial', 'Komunitas', 'Berita'];

    const colors = {
        primary: '#2B6CB0',      
        secondary: '#38A169',    
        accent: '#D69E2E',       
        lightBg: '#F7FAFC',      
        darkText: '#1A202C',     
        lightText: '#4A5568',    
        white: '#FFFFFF',
        cardBg: '#FFFFFF',
        cardHover: '#EBF8FF'     
    };

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:8000/api/articles');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: Article[] = await response.json();
                setArticles(data);
            } catch (err: unknown) {
                console.error("Failed to fetch articles:", err);
                if (err instanceof Error) {
                    setError(err.message || "Gagal memuat artikel. Silakan coba lagi.");
                } else {
                    setError("Gagal memuat artikel. Silakan coba lagi.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Semua' || article.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const sortedArticles = [...filteredArticles].sort((a, b) => {
        if (sortBy === 'terbaru') {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortBy === 'populer') {
            return b.views - a.views;
        } else if (sortBy === 'terlama') {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return 0;
    });

    const featuredArticles = sortedArticles.filter(article => article.featured);
    const regularArticles = sortedArticles.filter(article => !article.featured);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 font-inter" style={{ backgroundColor: colors.lightBg }}>
                <header className="py-16 px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Artikel <span style={{ color: colors.primary }}>Pendidikan</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Temukan wawasan dan inspirasi melalui artikel-artikel berkualitas tentang pendidikan, keagamaan, dan sosial kemasyarakatan.
                    </p>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Search and Filter Section */}
                    <div className="mb-8 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                            <div className="relative flex-1 max-w-md w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Cari artikel..."
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                                <select
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm appearance-none pr-8"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm appearance-none pr-8"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="terbaru">Terbaru</option>
                                    <option value="populer">Populer</option>
                                    <option value="terlama">Terlama</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Loading and Error States */}
                    {loading && (
                        <div className="text-center text-gray-600 text-lg mt-8 animate-pulse">Memuat artikel...</div>
                    )}
                    {error && (
                        <div className="text-center text-red-500 text-lg mt-8">Error: {error}</div>
                    )}
                    {!loading && !error && articles.length === 0 && (
                        <div className="text-center text-gray-600 text-lg mt-8">Tidak ada artikel ditemukan.</div>
                    )}

                    {/* Featured Articles */}
                    {!loading && !error && featuredArticles.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span style={{ color: colors.accent }}>⭐</span>
                                Artikel Unggulan
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredArticles.map(article => (
                                    <div 
                                        key={article.id} 
                                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group"
                                        style={{ 
                                            backgroundColor: colors.cardBg,
                                            border: '1px solid #E2E8F0',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                        }}
                                    >
                                        <div className="relative">
                                            <img
                                                src={article.image || `https://placehold.co/400x250/F7FAFC/${colors.primary.replace('#', '')}?text=No+Image`} 
                                                alt={article.title}
                                                className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300"
                                                onError={(e) => { e.currentTarget.src = `https://placehold.co/400x250/F7FAFC/${colors.primary.replace('#', '')}?text=No+Image`; }} 
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span 
                                                    className="px-3 py-1 rounded-full text-sm font-medium shadow-md"
                                                    style={{ 
                                                        backgroundColor: colors.accent,
                                                        color: '#1A202C'
                                                    }}
                                                >
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 
                                                className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors"
                                                style={{ color: colors.darkText }}
                                            >
                                                {article.title}
                                            </h3>
                                            <p 
                                                className="mb-4 line-clamp-3"
                                                style={{ color: colors.lightText }}
                                            >
                                                {article.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-sm mb-4" style={{ color: colors.lightText }}>
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-4 h-4" />
                                                        {article.author}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(article.date)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4" style={{ color: colors.lightText }}>
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="w-4 h-4" />
                                                        {article.views}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Heart className="w-4 h-4" />
                                                        {article.likes}
                                                    </span>
                                                </div>
                                                <a
                                                    href={article.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="flex items-center gap-1 font-semibold transition-colors"
                                                    style={{ color: colors.primary }}
                                                >
                                                    Baca Selengkapnya
                                                    <ArrowRight className="w-4 h-4 ml-1" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Regular Articles */}
                    {!loading && !error && regularArticles.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Semua Artikel
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {regularArticles.map(article => (
                                    <div 
                                        key={article.id} 
                                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group"
                                        style={{ 
                                            backgroundColor: colors.cardBg,
                                            border: '1px solid #E2E8F0'
                                        }}
                                    >
                                        <div className="relative">
                                            <img
                                                src={article.image || `https://placehold.co/400x250/F7FAFC/${colors.primary.replace('#', '')}?text=No+Image`} 
                                                alt={article.title}
                                                className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300"
                                                onError={(e) => { e.currentTarget.src = `https://placehold.co/400x250/F7FAFC/${colors.primary.replace('#', '')}?text=No+Image`; }} 
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span 
                                                    className="px-3 py-1 rounded-full text-sm font-medium shadow-md"
                                                    style={{ 
                                                        backgroundColor: colors.secondary,
                                                        color: 'white'
                                                    }}
                                                >
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 
                                                className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors"
                                                style={{ color: colors.darkText }}
                                            >
                                                {article.title}
                                            </h3>
                                            <p 
                                                className="mb-4 line-clamp-3"
                                                style={{ color: colors.lightText }}
                                            >
                                                {article.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-sm mb-4" style={{ color: colors.lightText }}>
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-4 h-4" />
                                                        {article.author}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(article.date)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4" style={{ color: colors.lightText }}>
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="w-4 h-4" />
                                                        {article.views}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Heart className="w-4 h-4" />
                                                        {article.likes}
                                                    </span>
                                                </div>
                                                <a
                                                    href={article.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="flex items-center gap-1 font-semibold transition-colors"
                                                    style={{ color: colors.primary }}
                                                >
                                                    Baca Selengkapnya
                                                    <ArrowRight className="w-4 h-4 ml-1" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Load More Button */}
                    {!loading && !error && (filteredArticles.length > 0 || articles.length > 0) && (
                        <div className="text-center mt-8">
                            <button 
                                className="px-8 py-3 rounded-lg font-semibold transition-colors shadow-md"
                                style={{ 
                                    backgroundColor: colors.primary,
                                    color: 'white'
                                }}
                            >
                                Muat Lebih Banyak
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </Layout>
    );
};

export default ArtikelPage;