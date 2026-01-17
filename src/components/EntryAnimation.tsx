'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function EntryAnimation({ onComplete }: { onComplete: () => void }) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        const overlay = overlayRef.current;
        const logo = logoRef.current;
        if (!overlay || !logo) return;

        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
                onComplete();
            },
        });

        // Entry animation sequence
        tl.set(logo, { opacity: 0, scale: 0.8 })
            .to(logo, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
            })
            .to(logo, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.inOut',
            })
            .to(logo, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
            })
            .to(logo, {
                y: -window.innerHeight / 2 + 60,
                scale: 0.5,
                duration: 0.8,
                ease: 'power3.inOut',
                delay: 0.3,
            })
            .to(overlay, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
            }, '-=0.3');

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    if (!isAnimating) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#152624] to-[#11151a]"
        >
            {/* Gradient orbs */}
            <div className="gradient-orb gradient-orb-1" />
            <div className="gradient-orb gradient-orb-2" />

            {/* Logo */}
            <div ref={logoRef} className="relative">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <Image
                        src="/images/RD logo.svg"
                        alt="Rare Developers"
                        width={120}
                        height={120}
                        className="object-contain"
                        priority
                    />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-32 h-32 rounded-full bg-[#30B5A6] blur-3xl opacity-30" />
            </div>
        </div>
    );
}
