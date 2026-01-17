'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        title: 'Innovation First',
        description: 'We pioneer cutting-edge solutions that set new industry standards.',
        icon: '✦',
    },
    {
        title: 'Quality Driven',
        description: 'Every line of code is crafted with precision and attention to detail.',
        icon: '◈',
    },
    {
        title: 'Client Focused',
        description: 'Your success is our priority. We build partnerships, not just projects.',
        icon: '◇',
    },
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section title
            gsap.from('.about-title', {
                opacity: 0,
                y: 50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Staggered card animations
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.from(card, {
                    opacity: 0,
                    y: 60,
                    duration: 0.8,
                    delay: i * 0.15,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="section relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(48,181,166,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none -translate-y-1/2" />

            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="about-title text-center mb-16">
                    <h2 className="section-title">
                        Who We <span className="gradient-text">Are</span>
                    </h2>
                    <p className="section-subtitle">
                        A team of passionate developers and designers dedicated to creating
                        exceptional digital experiences that transform businesses.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className="glass-card group cursor-pointer"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl bg-[rgba(48,181,166,0.1)] border border-[rgba(48,181,166,0.2)] flex items-center justify-center mb-6 group-hover:bg-[rgba(48,181,166,0.2)] transition-colors duration-300">
                                <span className="text-2xl text-[#30B5A6]">{feature.icon}</span>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-white mb-3 relative inline-block">
                                {feature.title}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#30B5A6] group-hover:w-full transition-all duration-500" />
                            </h3>
                            <p className="text-[rgba(255,255,255,0.6)] leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-[rgba(255,255,255,0.05)]">
                    {[
                        { value: '50+', label: 'Projects Delivered' },
                        { value: '30+', label: 'Happy Clients' },
                        { value: '5+', label: 'Years Experience' },
                        { value: '99%', label: 'Client Satisfaction' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-[#30B5A6] mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-[rgba(255,255,255,0.5)]">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
