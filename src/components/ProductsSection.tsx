'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const ctx = gsap.context(() => {
            // Scroll animation
            gsap.from(card, {
                opacity: 0,
                y: 80,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, sectionRef);

        // Tilt effect on hover
        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 1000,
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out',
            });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            ctx.revert();
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section ref={sectionRef} id="products" className="section relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(48,181,166,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="section-title">
                        Our <span className="gradient-text">Products</span>
                    </h2>
                    <p className="section-subtitle">
                        Innovative solutions designed to solve real-world problems with elegance and efficiency.
                    </p>
                </div>

                {/* SafeShare Product Card */}
                <div
                    ref={cardRef}
                    className="max-w-5xl mx-auto bg-[rgba(255,255,255,0.03)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-3xl overflow-hidden"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Content */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(48,181,166,0.1)] border border-[rgba(48,181,166,0.2)] rounded-full text-sm text-[#30B5A6] mb-6 w-fit">
                                <span className="w-2 h-2 rounded-full bg-[#30B5A6] animate-pulse" />
                                Featured Product
                            </div>

                            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                SafeShare
                            </h3>

                            <p className="text-[rgba(255,255,255,0.6)] leading-relaxed mb-6">
                                A zero-knowledge encrypted file sharing platform that prioritizes your privacy.
                                Share sensitive files securely with end-to-end encryption, auto-expiring links,
                                and complete anonymity.
                            </p>

                            <ul className="space-y-3 mb-8">
                                {[
                                    'End-to-end encryption',
                                    'Zero-knowledge architecture',
                                    'Auto-expiring rooms',
                                    'Burn after read mode',
                                ].map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-[rgba(255,255,255,0.7)]">
                                        <span className="w-5 h-5 rounded-full bg-[rgba(48,181,166,0.2)] flex items-center justify-center">
                                            <span className="text-[#30B5A6] text-xs">✓</span>
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link href="https://safeshare.raredev.co" target="_blank" className="btn-primary w-fit">
                                Visit SafeShare
                            </Link>
                        </div>

                        {/* Image */}
                        <div className="relative h-[300px] lg:h-auto bg-gradient-to-br from-[rgba(48,181,166,0.1)] to-transparent flex items-center justify-center p-8">
                            <div className="relative w-full h-full max-w-md">
                                <Image
                                    src="/images/safeshare.png"
                                    alt="SafeShare Application"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                />
                            </div>
                            {/* Glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(48,181,166,0.15)_0%,transparent_70%)]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
