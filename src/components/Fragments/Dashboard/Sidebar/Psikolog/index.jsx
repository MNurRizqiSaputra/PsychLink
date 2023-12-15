import React from 'react';

function SidebarPsikolog({ onMenuClick }) {
  const menuItems = [
    { label: 'Beranda', icon: 'fas fa-home' },
    { label: 'Jadwal Konsultasi', icon: 'fas fa-calendar' },
    { label: 'Riwayat Konsultasi', icon: 'fas fa-history' },
    { label: 'Profil', icon: 'fas fa-user' },
    { label: 'Bantuan', icon: 'fas fa-question-circle' },
  ];

  return (
    <nav aria-label="alternative nav">
      <div className="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center">
        <div className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
          <ul className="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
            {menuItems.map((item, index) => (
              <li key={index} className="mr-3 flex-1" onClick={() => onMenuClick(item.label)}>
                <a
                  className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500"
                >
                  <i className={`${item.icon} mr-2`} /> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SidebarPsikolog;