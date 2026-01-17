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
    const navRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Magnetic button effect
    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? 'py-4' : 'py-6'}
      `}
        >
            <div className="container mx-auto px-6">
                <div
                    className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500
            ${scrolled
                            ? 'bg-[rgba(255,255,255,0.05)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] shadow-lg'
                            : 'bg-transparent'
                        }
          `}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <Image
                                src="/images/RD logo.svg"
                                alt="Rare Developers"
                                width={160}
                                height={160}
                                className="object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <span className="text-lg font-semibold text-white hidden sm:block">
                            Rare Developers
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[rgba(255,255,255,0.7)] hover:text-white text-sm font-medium transition-colors duration-300 relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#30B5A6] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                        ref={buttonRef}
                        href="#contact"
                        className="btn-primary text-sm px-6 py-2.5"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </nav>
    );
}
