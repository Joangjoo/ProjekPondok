import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Layout from '../../components/layout/Layout';

const ContactPage: React.FC = () => {
    return (
        <>
            <Layout >
                <div className="bg-gray-900 text-white">
                    {/* Hero Section */}
                    <div className="relative bg-blue-950/70">
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-10"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558225227-3d9a48214246?q=80&w=2070&auto=format&fit=crop')" }}
                        ></div>
                        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                Hubungi <span className="text-yellow-400">Kami</span>
                            </h1>
                            <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-100/80">
                                Kami siap mendengarkan pertanyaan, saran, atau kolaborasi dari Anda.
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
                        <div className="divide-y-2 divide-gray-700 lg:grid lg:grid-cols-3 lg:divide-y-0 lg:divide-x-2 lg:divide-gray-700">

                            {/* Contact Information */}
                            <div className="py-8 lg:py-0 lg:pr-8">
                                <h2 className="text-2xl font-bold mb-6 text-yellow-400">Informasi Kontak</h2>
                                <div className="space-y-6 text-gray-300">
                                    <div className="flex items-start">
                                        <MapPin className="flex-shrink-0 h-6 w-6 text-blue-400 mt-1" />
                                        <div className="ml-4">
                                            <p className="font-semibold text-white">Alamat</p>
                                            <p>Jl. Jendral Sudirman No. 123, Magelang, Jawa Tengah, Indonesia</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Phone className="flex-shrink-0 h-6 w-6 text-blue-400 mt-1" />
                                        <div className="ml-4">
                                            <p className="font-semibold text-white">Telepon</p>
                                            <p>+62 293 123 456</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Mail className="flex-shrink-0 h-6 w-6 text-blue-400 mt-1" />
                                        <div className="ml-4">
                                            <p className="font-semibold text-white">Email</p>
                                            <p>kontak@yayasanbudimulya.id</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <form action="#" method="POST" className="py-8 lg:py-0 lg:px-8 col-span-2">
                                <h2 className="text-2xl font-bold mb-6 text-yellow-400">Kirim Pesan</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="full-name" className="sr-only">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            name="full-name"
                                            id="full-name"
                                            autoComplete="name"
                                            className="block w-full shadow-sm py-3 px-4 placeholder-gray-400 bg-gray-800/50 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Nama Lengkap"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full shadow-sm py-3 px-4 placeholder-gray-400 bg-gray-800/50 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Alamat Email"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="sr-only">Pesan</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            className="block w-full shadow-sm py-3 px-4 placeholder-gray-400 bg-gray-800/50 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Tuliskan pesan Anda..."
                                            defaultValue={''}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
                                        >
                                            <Send className="h-5 w-5 mr-2" />
                                            Kirim Pesan
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Embedded Map */}
                    <div className="w-full h-[450px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63328.92476856087!2d110.18093952179834!3d-7.472143922896578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a8fde6344c143%3A0x4027a76e352e490!2sMagelang%2C%20Kota%20Magelang%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1720042457853!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default ContactPage;