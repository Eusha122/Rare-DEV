'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current, {
                opacity: 0,
                y: 60,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="contact" className="section relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(48,181,166,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6">
                <div
                    ref={contentRef}
                    className="max-w-3xl mx-auto text-center"
                >
                    {/* Header */}
                    <h2 className="section-title mb-6">
                        Let&apos;s Build Something <span className="gradient-text">Extraordinary</span>
                    </h2>
                    <p className="section-subtitle mb-12">
                        Ready to transform your ideas into reality? We&apos;d love to hear from you.
                    </p>

                    {/* Contact Info */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                        <div className="flex items-center gap-3 px-6 py-4 bg-[rgba(255,255,255,0.03)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-2xl">
                            <div className="w-10 h-10 rounded-xl bg-[rgba(48,181,166,0.1)] flex items-center justify-center">
                                <span className="text-[#30B5A6]">✉</span>
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-[rgba(255,255,255,0.5)] uppercase tracking-wider">Email</div>
                                <a href="mailto:contact@raredev.co" className="text-white hover:text-[#30B5A6] transition-colors">
                                    contact@raredev.co
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-6 py-4 bg-[rgba(255,255,255,0.03)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-2xl">
                            <div className="w-10 h-10 rounded-xl bg-[rgba(48,181,166,0.1)] flex items-center justify-center">
                                <span className="text-[#30B5A6]">☎</span>
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-[rgba(255,255,255,0.5)] uppercase tracking-wider">Phone</div>
                                <a href="tel:+8801918331878" className="text-white hover:text-[#30B5A6] transition-colors">
                                    +880 1918331878
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="mailto:contact@raredev.co"
                        className="btn-primary text-lg px-10 py-5 inline-flex items-center gap-3 group"
                    >
                        Get In Touch
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>

                    {/* Decorative text */}
                    <p className="mt-8 text-sm text-[rgba(255,255,255,0.4)]">
                        We typically respond within 24 hours
                    </p>
                </div>
            </div>
        </section>
    );
}
