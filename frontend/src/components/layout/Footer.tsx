import React from 'react';
import { Link } from 'react-router-dom';
import {  Mail, MapPin, Phone, Building, UserCircle, GraduationCap, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-800 to-blue-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-5">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-lg shadow-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold font-serif">Yayasan Budi Mulya</span>
            </div>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Lembaga pendidikan berkualitas yang membentuk generasi berilmu dan berakhlak mulia.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'instagram', 'youtube'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-9 h-9 rounded-full bg-blue-700 hover:bg-blue-600 flex items-center justify-center transition-colors"
                  aria-label={social}
                >
                  <div className="w-5 h-5 text-white">
                    {/* Ikon media sosial bisa ditambahkan sesuai kebutuhan */}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-amber-400 border-b border-amber-400 pb-2 inline-block">
              Navigasi Cepat
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Beranda', path: '/' },
                { name: 'Program Pendidikan', path: '/courses' },
                { name: 'Tentang Kami', path: '/about' },
                { name: 'Staf Pengajar', path: '/teachers' },
                { name: 'Kontak', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-blue-100 hover:text-amber-300 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Program Unggulan */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-amber-400 border-b border-amber-400 pb-2 inline-block">
              Lembaga Kami
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Yayasan Shalahuddin Budi Mulia', icon: <Building className="w-5 h-5 mr-2" /> },
                { name: 'Laboratorium Dakwah', icon: <GraduationCap className="w-5 h-5 mr-2" /> },
                { name: 'KB & TK Budi Mulia 1', icon: <UserCircle className="w-5 h-5 mr-2" /> }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to="#" 
                    className="text-blue-100 hover:text-amber-300 transition-colors flex items-center"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-amber-400 border-b border-amber-400 pb-2 inline-block">
              Hubungi Kami
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-700 p-2 rounded-lg mr-3">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <address className="text-blue-100 not-italic">
                  Jl. Kaliurang Km 8, Perum Banteng 3, Jl. Argopuro 48,<br />
                  RT 05/RW 02, Dukuh Tryasan,<br />
                  Kel. Condongcatur, Kec. Depok,<br />
                  Kab. Sleman, DIY
                </address>
              </li>
              <li className="flex items-center">
                <div className="bg-blue-700 p-2 rounded-lg mr-3">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <a href="https://wa.me/6281234578484" className="text-blue-100 hover:text-amber-300 transition-colors">
                  0812-3457-8484
                </a>
              </li>
              <li className="flex items-center">
                <div className="bg-blue-700 p-2 rounded-lg mr-3">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <a href="mailto:muliatv.media@gmail.com" className="text-blue-100 hover:text-amber-300 transition-colors">
                  muliatv.media@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-blue-300 text-center md:text-left mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Yayasan Budi Mulya. Seluruh hak dilindungi.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-blue-300 hover:text-amber-300 transition-colors">
                Kebijakan Privasi
              </Link>
              <Link to="/terms" className="text-sm text-blue-300 hover:text-amber-300 transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link to="/faq" className="text-sm text-blue-300 hover:text-amber-300 transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;