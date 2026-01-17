'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
    {
        name: 'Basic',
        price: '$150',
        description: 'Perfect for small projects and startups',
        features: [
            'Single page website',
            'Responsive design',
            'Basic SEO setup',
            '1 revision round',
            'Source files included',
        ],
        featured: false,
    },
    {
        name: 'Standard',
        price: '$300',
        description: 'Great for growing businesses',
        features: [
            'Multi-page website (up to 5)',
            'Responsive design',
            'Advanced SEO setup',
            '3 revision rounds',
            'CMS integration',
            '30-day support',
        ],
        featured: false,
    },
    {
        name: 'Premium',
        price: '$500',
        description: 'Complete solution for established businesses',
        features: [
            'Multi-page website (up to 10)',
            'Custom animations',
            'Full SEO optimization',
            'Unlimited revisions',
            'CMS integration',
            'E-commerce ready',
            '90-day support',
        ],
        featured: true,
    },
    {
        name: 'Custom',
        price: 'Quote',
        description: 'Enterprise-grade solutions',
        features: [
            'Fully custom solution',
            'API development',
            'Complex integrations',
            'Dedicated team',
            'Priority support',
            'Maintenance plan',
        ],
        featured: false,
    },
];

export default function PricingSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered card animations
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.from(card, {
                    opacity: 0,
                    y: 60,
                    duration: 0.8,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="pricing" className="section relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(48,181,166,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="section-title">
                        Simple <span className="gradient-text">Pricing</span>
                    </h2>
                    <p className="section-subtitle">
                        Transparent pricing for every stage of your journey. No hidden fees, just value.
                    </p>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={plan.name}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className={`relative p-6 rounded-3xl transition-all duration-500 group cursor-pointer
                ${plan.featured
                                    ? 'bg-gradient-to-b from-[rgba(48,181,166,0.15)] to-[rgba(48,181,166,0.05)] border-2 border-[#30B5A6] shadow-[0_0_40px_rgba(48,181,166,0.2)]'
                                    : 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)]'
                                }
              `}
                        >
                            {/* Featured Badge */}
                            {plan.featured && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#30B5A6] rounded-full text-xs font-semibold text-[#11151a]">
                                    Most Popular
                                </div>
                            )}

                            {/* Plan Name */}
                            <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>

                            {/* Price */}
                            <div className="mb-4">
                                <span className={`text-4xl font-bold ${plan.featured ? 'text-[#30B5A6]' : 'text-white'}`}>
                                    {plan.price}
                                </span>
                                {plan.price !== 'Quote' && (
                                    <span className="text-[rgba(255,255,255,0.5)] text-sm ml-1">/project</span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-[rgba(255,255,255,0.5)] mb-6">{plan.description}</p>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2 text-sm text-[rgba(255,255,255,0.7)]">
                                        <span className="text-[#30B5A6] mt-0.5">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link
                                href="#contact"
                                className={`block text-center py-3 rounded-full text-sm font-medium transition-all duration-300
                  ${plan.featured
                                        ? 'bg-[#30B5A6] text-[#11151a] hover:bg-[#3dd4c3]'
                                        : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.1)]'
                                    }
                `}
                            >
                                {plan.price === 'Quote' ? 'Get a Quote' : 'Get Started'}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
