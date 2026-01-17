'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
    {
        name: 'Sarah Johnson',
        role: 'CEO, TechStart',
        content: 'Rare Developers transformed our vision into reality. Their attention to detail and technical expertise is unmatched.',
        avatar: 'SJ',
    },
    {
        name: 'Michael Chen',
        role: 'Founder, DataFlow',
        content: 'Working with Rare Developers was a game-changer. They delivered a product that exceeded our expectations.',
        avatar: 'MC',
    },
    {
        name: 'Emily Rodriguez',
        role: 'CTO, CloudNine',
        content: 'The team\'s professionalism and innovative approach made our collaboration seamless and highly productive.',
        avatar: 'ER',
    },
    {
        name: 'David Kim',
        role: 'Director, InnovateLab',
        content: 'Exceptional quality and lightning-fast delivery. Rare Developers is our go-to partner for all development needs.',
        avatar: 'DK',
    },
    {
        name: 'Lisa Thompson',
        role: 'VP Engineering, ScaleUp',
        content: 'Their technical prowess and creative solutions helped us scale our platform to millions of users.',
        avatar: 'LT',
    },
    {
        name: 'Alex Martinez',
        role: 'Product Lead, NextGen',
        content: 'The best development team we\'ve worked with. They truly understand modern software architecture.',
        avatar: 'AM',
    },
];

export default function ReviewsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Infinite scroll animation
        const totalWidth = track.scrollWidth / 2;

        const animation = gsap.to(track, {
            x: -totalWidth,
            duration: 30,
            ease: 'none',
            repeat: -1,
        });

        // Pause on hover
        track.addEventListener('mouseenter', () => animation.pause());
        track.addEventListener('mouseleave', () => animation.resume());

        return () => {
            animation.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} id="reviews" className="section relative overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                {/* Header */}
                <div className="text-center">
                    <h2 className="section-title">
                        Client <span className="gradient-text">Reviews</span>
                    </h2>
                    <p className="section-subtitle">
                        Don&apos;t just take our word for it. Here&apos;s what our clients have to say.
                    </p>
                </div>
            </div>

            {/* Carousel */}
            <div className="relative w-full overflow-hidden">
                {/* Gradient masks */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#11151a] to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#11151a] to-transparent z-10 pointer-events-none" />

                {/* Track */}
                <div ref={trackRef} className="flex gap-6 py-4" style={{ width: 'max-content' }}>
                    {/* Double the reviews for seamless loop */}
                    {[...reviews, ...reviews].map((review, index) => (
                        <div
                            key={`${review.name}-${index}`}
                            className="w-[350px] flex-shrink-0 p-6 bg-[rgba(255,255,255,0.03)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-2xl hover:border-[rgba(255,255,255,0.15)] transition-all duration-300 group"
                        >
                            {/* Quote */}
                            <p className="text-[rgba(255,255,255,0.7)] leading-relaxed mb-6 text-sm">
                                &quot;{review.content}&quot;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#30B5A6] to-[#1a7a71] flex items-center justify-center text-sm font-semibold text-white">
                                    {review.avatar}
                                </div>
                                <div>
                                    <div className="text-white font-medium text-sm">{review.name}</div>
                                    <div className="text-[rgba(255,255,255,0.5)] text-xs">{review.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
