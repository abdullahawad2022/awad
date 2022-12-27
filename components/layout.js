import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from '../public/assets/logo.png';

export default function Layout({ children }) {
    return (
        <main className='relative h-screen'>
            <div className='relative z-0'>
                {children}
            </div>
            <div className='absolute flex-row  inset-0 z-20 flex justify-between w-full h-screen gap-2 overflow-hidden pointer-events-none md:gap-8 '>
                <div className='relative z-10 py-6 pl-4 md:flex-shrink-0'>
                    <div className="md:h-screen h-[50vw]">
                        <Image src={Logo} alt="" className='object-cover' />
                    </div>
                </div>
                <div className='relative z-20 py-6 pr-4 md:flex-shrink-0'>
                    <Link href="#" className="text-[#F0E6CC] transform rotate-90 flex w-[1vw]">
                        info@xxxxxx.com
                    </Link>
                </div>
            </div>
        </main>
    )
}
