'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const productCardRef = useRef<HTMLDivElement>(null);
    const orb1Ref = useRef<HTMLDivElement>(null);
    const orb2Ref = useRef<HTMLDivElement>(null);
    const orb3Ref = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered entry animation sequence (after logo animation)
            const tl = gsap.timeline({ delay: 2.2 });

            // Headline slides up + fades in
            tl.from(headlineRef.current, {
                opacity: 0,
                y: 80,
                duration: 1.2,
                ease: 'power4.out',
            })
                // Subtext fades in after 0.2s
                .from(subtitleRef.current, {
                    opacity: 0,
                    y: 40,
                    duration: 0.9,
                    ease: 'power3.out',
                }, '-=0.7')
                // Buttons scale up softly
                .from(ctaRef.current?.children || [], {
                    opacity: 0,
                    y: 30,
                    scale: 0.9,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'back.out(1.7)',
                }, '-=0.5')
                // Product card floats in from right
                .from(productCardRef.current, {
                    opacity: 0,
                    x: 100,
                    rotateY: -15,
                    duration: 1,
                    ease: 'power3.out',
                }, '-=0.8')
                // Scroll indicator fades in
                .from(scrollIndicatorRef.current, {
                    opacity: 0,
                    y: -20,
                    duration: 0.6,
                    ease: 'power2.out',
                }, '-=0.3');

            // Background orbs start floating animation
            gsap.to(orb1Ref.current, {
                y: -30,
                x: 20,
                duration: 4,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: 2.5,
            });

            gsap.to(orb2Ref.current, {
                y: 25,
                x: -15,
                duration: 5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: 2.7,
            });

            gsap.to(orb3Ref.current, {
                y: -20,
                x: -25,
                duration: 6,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: 3,
            });

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
                    scrub: 1.5,
                },
            });

            // Product card floating animation
            gsap.to(productCardRef.current, {
                y: -15,
                duration: 3,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: 3.5,
            });

            // Scroll indicator bounce
            const scrollArrow = scrollIndicatorRef.current?.querySelector('.scroll-arrow');
            if (scrollArrow) {
                gsap.to(scrollArrow, {
                    y: 8,
                    duration: 1.2,
                    ease: 'power2.inOut',
                    repeat: -1,
                    yoyo: true,
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Magnetic button effect
    useEffect(() => {
        const buttons = document.querySelectorAll('.magnetic-btn');

        buttons.forEach((button) => {
            const handleMouseMove = (e: Event) => {
                const mouseEvent = e as MouseEvent;
                const rect = (button as HTMLElement).getBoundingClientRect();
                const x = mouseEvent.clientX - rect.left - rect.width / 2;
                const y = mouseEvent.clientY - rect.top - rect.height / 2;

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
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden pt-24"
        >
            {/* === MULTI-LAYER BACKGROUND === */}

            {/* Layer 1: Base gradient (already in body) */}

            {/* Layer 2: Noise grain overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Layer 3: Light bloom spots */}
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#30B5A6] opacity-[0.08] blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-[#30B5A6] opacity-[0.06] blur-[100px] pointer-events-none" />

            {/* Gradient Orbs with floating animation */}
            <div
                ref={orb1Ref}
                className="absolute -top-20 right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(48,181,166,0.35)_0%,transparent_70%)] blur-3xl pointer-events-none"
            />
            <div
                ref={orb2Ref}
                className="absolute bottom-[10%] -left-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(48,181,166,0.25)_0%,transparent_70%)] blur-3xl pointer-events-none"
            />
            <div
                ref={orb3Ref}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(48,181,166,0.1)_0%,transparent_60%)] blur-3xl pointer-events-none"
            />

            {/* === HERO CONTENT - TWO COLUMN LAYOUT === */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* LEFT COLUMN: Text Content */}
                    <div className="text-center lg:text-left">
                        <h1
                            ref={headlineRef}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold mb-6 leading-[1.05] tracking-tight"
                        >
                            <span className="text-white">Developing</span>
                            <br />
                            <span className="gradient-text-animated">Beyond Ordinary</span>
                        </h1>

                        <p
                            ref={subtitleRef}
                            className="text-lg sm:text-xl text-[rgba(255,255,255,0.7)] max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                        >
                            We craft innovative digital solutions that push the boundaries of what&apos;s possible.
                            Premium software development for the modern era.
                        </p>

                        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                            <Link
                                href="#products"
                                className="magnetic-btn btn-primary-glow text-base px-8 py-4 relative overflow-hidden group"
                            >
                                <span className="relative z-10">Explore Our Work</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </Link>
                            <Link
                                href="#about"
                                className="magnetic-btn btn-glass text-base px-8 py-4"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Floating Product Card */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div
                            ref={productCardRef}
                            className="relative w-full max-w-md perspective-1000"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Product Card */}
                            <div className="relative bg-[rgba(255,255,255,0.03)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] rounded-3xl p-6 shadow-2xl transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-500">
                                {/* Card Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex gap-1.5">
                                        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                                    </div>
                                    <span className="text-xs text-[rgba(255,255,255,0.4)] ml-2">safeshare.co</span>
                                </div>

                                {/* Product Preview */}
                                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-[rgba(48,181,166,0.1)] to-transparent">
                                    <Image
                                        src="/images/safeshare.png"
                                        alt="SafeShare Preview"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    {/* Overlay glow */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,21,26,0.8)] via-transparent to-transparent" />
                                </div>

                                {/* Product Info */}
                                <div className="mt-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-[#30B5A6] animate-pulse" />
                                        <span className="text-xs text-[#30B5A6] font-medium">FEATURED PRODUCT</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-1">SafeShare</h3>
                                    <p className="text-sm text-[rgba(255,255,255,0.5)]">Zero-knowledge encrypted file sharing</p>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-[#30B5A6] opacity-20 blur-2xl" />
                                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-[#30B5A6] opacity-15 blur-xl" />
                            </div>

                            {/* Floating decorative elements */}
                            <div className="absolute -z-10 top-8 -right-8 w-20 h-20 rounded-2xl bg-[rgba(48,181,166,0.1)] border border-[rgba(48,181,166,0.2)] backdrop-blur-sm transform rotate-12" />
                            <div className="absolute -z-10 -bottom-6 -left-6 w-16 h-16 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] backdrop-blur-sm transform -rotate-12" />
                        </div>
                    </div>
                </div>
            </div>

            {/* === SCROLL INDICATOR === */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
                <span className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-[0.2em] font-medium">Scroll</span>
                <div className="scroll-arrow flex flex-col items-center">
                    <div className="w-[1px] h-6 bg-gradient-to-b from-[rgba(255,255,255,0.5)] to-transparent" />
                    <svg
                        className="w-4 h-4 text-[rgba(255,255,255,0.5)] mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>

            {/* CSS for gradient text animation */}
            <style jsx>{`
        .gradient-text-animated {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #30B5A6 25%,
            #3dd4c3 50%,
            #30B5A6 75%,
            #ffffff 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 4s ease-in-out infinite;
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% center;
          }
          50% {
            background-position: 200% center;
          }
        }

        .btn-primary-glow {
          background: linear-gradient(135deg, #30B5A6 0%, #3dd4c3 100%);
          color: #11151a;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          box-shadow: 0 4px 20px rgba(48, 181, 166, 0.4);
          animation: pulse-glow 3s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 4px 20px rgba(48, 181, 166, 0.4);
          }
          50% {
            box-shadow: 0 4px 40px rgba(48, 181, 166, 0.6);
          }
        }

        .btn-primary-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 40px rgba(48, 181, 166, 0.6);
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .rotate-y-\\[-5deg\\] {
          transform: rotateY(-5deg) rotateX(5deg);
        }
      `}</style>
        </section>
    );
}
