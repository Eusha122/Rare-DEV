'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Reviews', href: '#reviews' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Animate navbar and logo
        gsap.set(logoRef.current, { opacity: 0, x: -30 });
        gsap.set(navRef.current, { opacity: 0, y: -30 });

        const tl = gsap.timeline({ delay: 2 });

        tl.to(logoRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
        })
            .to(navRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
            }, '-=0.5');
    }, []);

    return (
        <>
            {/* === FLOATING LOGO (MUCH BIGGER - 200px) === */}
            <div
                ref={logoRef}
                className="fixed top-2 left-10 z-[60]"
            >
                <Link href="/" className="block group">
                    <div className="relative w-[200px] h-[200px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src="/images/RD logo.svg"
                            alt="Rare Developers"
                            width={200}
                            height={200}
                            className="object-contain drop-shadow-[0_0_20px_rgba(48,181,166,0.3)]"
                            priority
                        />
                    </div>
                </Link>
            </div>

            {/* === APPLE LIQUID GLASS NAVBAR === */}
            <nav
                ref={navRef}
                className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${isScrolled ? 'scale-[0.98]' : 'scale-100'
                    }`}
                style={{
                    borderRadius: '24px',
                    /* Apple Liquid Glass Effect */
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.08) 100%)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow: `
            0 8px 32px rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.2),
            inset 0 -1px 0 rgba(255,255,255,0.05),
            0 0 0 1px rgba(255,255,255,0.05)
          `,
                }}
            >
                {/* Inner glossy highlight */}
                <div
                    className="absolute inset-0 rounded-[24px] pointer-events-none"
                    style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
                        borderRadius: '24px',
                    }}
                />

                <div className="relative flex items-center gap-1 px-5 py-3.5">
                    {/* Navigation Links */}
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative px-5 py-2.5 text-sm font-medium text-[rgba(255,255,255,0.85)] hover:text-white transition-all duration-300 rounded-xl hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Contact Button - Glossy Teal */}
                    <Link
                        href="#contact"
                        className="relative ml-3 px-7 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgba(48,181,166,0.4)]"
                        style={{
                            background: 'linear-gradient(135deg, #3dd4c3 0%, #30B5A6 50%, #28a090 100%)',
                            boxShadow: `
                0 4px 15px rgba(48,181,166,0.3),
                inset 0 1px 0 rgba(255,255,255,0.3),
                inset 0 -1px 0 rgba(0,0,0,0.1)
              `,
                        }}
                    >
                        <span className="relative z-10">Contact Us</span>
                        {/* Glossy shine overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
                            }}
                        />
                    </Link>
                </div>
            </nav>
        </>
    );
}
