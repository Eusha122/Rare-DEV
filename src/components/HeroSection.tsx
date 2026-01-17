'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const orb1Ref = useRef<HTMLDivElement>(null);
    const orb2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial animation
            const tl = gsap.timeline({ delay: 2 });

            tl.from(titleRef.current, {
                opacity: 0,
                y: 60,
                duration: 1,
                ease: 'power3.out',
            })
                .from(subtitleRef.current, {
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    ease: 'power3.out',
                }, '-=0.5')
                .from(ctaRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    ease: 'power3.out',
                }, '-=0.4');

            // Parallax orbs on scroll
            gsap.to(orb1Ref.current, {
                y: 200,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            });

            gsap.to(orb2Ref.current, {
                y: 150,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
        >
            {/* Gradient Orbs */}
            <div
                ref={orb1Ref}
                className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(48,181,166,0.4)_0%,transparent_70%)] blur-3xl pointer-events-none"
            />
            <div
                ref={orb2Ref}
                className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(48,181,166,0.3)_0%,transparent_70%)] blur-3xl pointer-events-none"
            />

            {/* Content */}
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1
                    ref={titleRef}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.05] tracking-tight"
                >
                    <span className="text-white">Developing</span>
                    <br />
                    <span className="gradient-text">Beyond Ordinary</span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-lg sm:text-xl text-[rgba(255,255,255,0.7)] max-w-2xl mx-auto mb-10"
                >
                    We craft innovative digital solutions that push the boundaries of what&apos;s possible.
                    Premium software development for the modern era.
                </p>

                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="#products" className="btn-primary text-base px-8 py-4">
                        Explore Our Work
                    </Link>
                    <Link href="#about" className="btn-glass text-base px-8 py-4">
                        Learn More
                    </Link>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                <span className="text-xs text-[rgba(255,255,255,0.5)] uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-[rgba(255,255,255,0.5)] to-transparent" />
            </div>
        </section>
    );
}
