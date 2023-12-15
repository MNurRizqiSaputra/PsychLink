// Content.js
import React from 'react';
import BerandaPsikolog from './Beranda';
import JadwalKonsultasiPsikolog from './JadwalKonsultasi';
import RiwayatKonsultasiPsikolog from './RiwayatKonsultasi';
import ProfilPsikolog from './Profil';
import BantuanPsikolog from './Bantuan';


const Content = ({ selectedMenu }) => {
    let renderedContent = null;

    switch (selectedMenu) {
        case 'Beranda':
            renderedContent = <BerandaPsikolog />;
            break;
        case 'Jadwal Konsultasi':
            renderedContent = <JadwalKonsultasiPsikolog />;
            break;
        case 'Riwayat Konsultasi':
            renderedContent = <RiwayatKonsultasiPsikolog />;
            break;
        case 'Profil':
            renderedContent = <ProfilPsikolog />;
            break;
        case 'Bantuan':
            renderedContent = <BantuanPsikolog />;
            break;

        default:
            renderedContent =
                <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">

                    <div className="max-w-xl mb-5 md:mx-auto sm:text-center lg:max-w-2xl">
                        <div className="mb-4">

                            <h1 className='text-3xl font-bold text-white bg-red-500 text-center'>Selamat Datang</h1>
                            <h1 className='text-3xl font-bold text-red-500 text-center'>Psikolog</h1>
                        </div>

                    </div>

                </div>
            break;
    }

    return <div className="content">{renderedContent}</div>;
};

export default Content;