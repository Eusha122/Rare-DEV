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
        <footer className="relative py-16 border-t border-[rgba(255,255,255,0.1)]">
            {/* Glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#30B5A6] to-transparent opacity-50" />

            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <Image
                                src="/images/RD logo.svg"
                                alt="Rare Developers"
                                width={160}
                                height={160}
                                className="object-contain"
                            />
                            <span className="text-xl font-semibold text-white">
                                Rare Developers
                            </span>
                        </Link>
                        <p className="text-[rgba(255,255,255,0.6)] text-sm max-w-sm">
                            Developing beyond ordinary. We craft innovative digital solutions
                            that push the boundaries of what&apos;s possible.
                        </p>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-[rgba(255,255,255,0.6)] hover:text-[#30B5A6] text-sm transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <ul className="space-y-3">
                            {footerLinks.social.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[rgba(255,255,255,0.6)] hover:text-[#30B5A6] text-sm transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-[rgba(255,255,255,0.05)]">
                    <p className="text-[rgba(255,255,255,0.5)] text-sm">
                        © {new Date().getFullYear()} Rare Developers. All rights reserved.
                    </p>
                    <p className="text-[rgba(255,255,255,0.4)] text-xs mt-2 sm:mt-0">
                        Crafted with precision ✦
                    </p>
                </div>
            </div>
        </footer>
    );
}
