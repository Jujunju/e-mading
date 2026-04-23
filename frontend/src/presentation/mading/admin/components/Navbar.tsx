import { Link } from "react-router-dom";
import {  FileText, LayoutDashboard,  MessageSquare, Users } from 'lucide-react';

export const NavLinks = () => (
  <ul className="nav flex-column gap-2" style={{ listStyle: 'none', padding: 0 }}>
    {[
      { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', exact: true },
      { to: '/admin/kelola-mading', icon: <FileText size={20} />, label: 'Kelola Mading' },
      { to: '/admin/data-siswa', icon: <Users size={20} />, label: 'Data Siswa' },
      { to: '/admin/data-komentar', icon: <MessageSquare size={20} />, label: 'Komentar' },
    ].map((item) => {
      const isActive = item.exact ? location.pathname.endsWith(item.to) : location.pathname.includes(item.to);
      return (
        <li className="nav-item" key={item.to}>
          <Link to={item.to} className={`nav-link d-flex align-items-center gap-3 py-3 px-3 rounded-3 transition-all ${isActive ? 'active-link text-white bg-green-primary' : 'text-secondary hover-bg-light'}`}>
            {item.icon} {item.label}
          </Link>
        </li>
      );
    })}
  </ul>
);
