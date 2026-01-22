"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Heart, Sparkles, Leaf, Users } from "lucide-react";

export const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-muted/30 overflow-hidden">
        <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Weaving Stories, One Stitch at a Time
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From humble beginnings to your home, Crocket Store brings you handcrafted warmth and timeless designs made with passion and care.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500">
               {/* Placeholder for Our Story Image */}
               <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                   <Image 
                    src="https://images.unsplash.com/photo-1615486511484-92e10534b73c?q=80&w=2670&auto=format&fit=crop" 
                    alt="Crafting Process" 
                    fill 
                    className="object-cover"
                   />
               </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  It all started with a single ball of yarn and a desire to create something tangible in a digital world. What began as a weekend hobby quickly blossomed into a profound passion for the art of crochet.
                </p>
                <p>
                  At Crocket Store, we believe that every loop and knot tells a story. Our team of dedicated artisans pours their heart into every creation, ensuring that each piece is not just a product, but a work of art that carries the warmth of human touch.
                </p>
                <p>
                  Today, we are proud to share our creations with crochet lovers around the world, bringing a touch of handmade charm to modern living spaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
             <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
             <p className="text-muted-foreground">
               We stand by our commitment to quality, community, and sustainability in everything we create.
             </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background border-none shadow-md">
              <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Handmade with Love</h3>
                <p className="text-muted-foreground">Every item is crafted by hand, ensuring uniqueness and attention to detail that machines simply cannot replicate.</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-none shadow-md">
              <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                   <Leaf className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Sustainable Materials</h3>
                <p className="text-muted-foreground">We carefully select eco-friendly yarns and materials to minimize our environmental footprint.</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-none shadow-md">
              <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                   <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold">Community Driven</h3>
                <p className="text-muted-foreground">We support local artisans and foster a community of creators who share our passion for the craft.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="container max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to find your perfect piece?</h2>
          <p className="text-xl text-muted-foreground">Explore our collection today and bring home something special.</p>
          <div className="flex justify-center gap-4">
            <Link href="/shop">
               <Button size="lg" className="px-8">Shop Collection</Button>
            </Link>
            <Link href="/contact">
               <Button size="lg" variant="outline" className="px-8">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
