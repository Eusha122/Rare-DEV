'use client';

import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
    company: [
        { name: 'About', href: '#about' },
        { name: 'Products', href: '#products' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Contact', href: '#contact' },
    ],
    social: [
        { name: 'Facebook', href: 'https://www.facebook.com/raredev' },
        { name: 'Instagram', href: 'https://www.instagram.com/the_rare_developers' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/company/111490268' },
        { name: 'SafeShare', href: 'https://www.safeshare.co' },
    ],
};

export default function Footer() {
    return (
        <footer className="relative py-16 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(21,38,36,0.5)]">
            {/* Glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#30B5A6] to-transparent opacity-40" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center gap-10">

                    {/* Logo Only - BIGGER (200px) */}
                    <Link href="/" className="group">
                        <div className="relative w-[200px] h-[200px] transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/images/RD logo.svg"
                                alt="Rare Developers"
                                width={200}
                                height={200}
                                className="object-contain drop-shadow-[0_0_20px_rgba(48,181,166,0.3)]"
                            />
                        </div>
                    </Link>

                    {/* Quick Links */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {footerLinks.company.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm text-[rgba(255,255,255,0.6)] hover:text-[#30B5A6] transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <span className="text-[rgba(255,255,255,0.2)]">|</span>
                        {footerLinks.social.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[rgba(255,255,255,0.6)] hover:text-[#30B5A6] transition-colors duration-300"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-[rgba(255,255,255,0.4)] text-sm">
                        © {new Date().getFullYear()} Rare Developers. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
