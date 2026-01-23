"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const slides = [
  {
    title: "Handcrafted Crochet with Love",
    description: "Discover unique, handmade pieces that bring warmth and style to your life. From cozy blankets to adorable amigurumi, find your perfect match.",
    primaryAction: { label: "Shop Now", href: "/shop" },
    secondaryAction: { label: "Our Story", href: "/about" },
    image: "/images/home-slider/banner-1.png",
  },
  {
    title: "Cozy Up with Our Blankets",
    description: "Experience the ultimate comfort with our hand-knitted blankets, perfect for those chilly evenings.",
    primaryAction: { label: "View Blankets", href: "/shop?category=blankets" },
    secondaryAction: null,
    image: "/images/home-slider/banner-2.png",
  },
  {
    title: "Adorable Amigurumi Toys",
    description: "Safe, soft, and full of character. Our amigurumi toys make the perfect gift for little ones.",
    primaryAction: { label: "Shop Toys", href: "/shop?category=toys" },
    secondaryAction: null,
    image: "/images/home-slider/banner-3.png",
  }
];

export function HomeBannerSlider() {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full relative group"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent className="h-full">
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="h-full">
            <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden flex items-center justify-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white drop-shadow-md">
                        {slide.title}
                      </h1>
                      <p className="mx-auto max-w-[700px] text-white/90 md:text-xl font-medium drop-shadow-sm">
                        {slide.description}
                      </p>
                    </div>
                    <div className="space-x-4 pt-4">
                      <Link href={slide.primaryAction.href}>
                        <Button size="lg" className="bg-background text-primary hover:bg-background/90 group">
                          {slide.primaryAction.label}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      {slide.secondaryAction && (
                        <Link href={slide.secondaryAction.href}>
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black bg-transparent">
                            {slide.secondaryAction.label}
                            </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 hidden md:flex" />
      <CarouselNext className="right-4 hidden md:flex" />
    </Carousel>
  );
}
