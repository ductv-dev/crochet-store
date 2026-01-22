import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";
import { CategoryShowcase } from "@/components/feature/home/category-showcase";
import { FeaturedProducts } from "@/components/feature/home/featured-products";

export const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-br from-primary/90 via-primary/70 to-background">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary-foreground drop-shadow-md">
                Handcrafted Crochet with Love
              </h1>
              <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl font-medium drop-shadow-sm">
                Discover unique, handmade pieces that bring warmth and style to your life. 
                From cozy blankets to adorable amigurumi, find your perfect match.
              </p>
            </div>
            <div className="space-x-4 pt-4">
              <Link href="/shop">
                <Button size="lg" className="bg-background text-primary hover:bg-background/90 group">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Circles/Shapes for background interest */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[30rem] h-[30rem] bg-secondary/30 rounded-full blur-3xl" />
      </section>

      <CategoryShowcase />
      
      <FeaturedProducts />

      {/* Featured/Intro Section */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Quality Materials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Made with the Finest Wool & Cotton
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                We believe that great crochet starts with great yarn. That's why we source only the softest, most durable materials for our creations.
              </p>
            </div>
            <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                    Handmade with Love
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Every Stitch Counts
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Our artisans pour their heart and soul into every piece, ensuring that you receive a product that is unique and special.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Mock) */}
      <section className="w-full py-12 md:py-24 bg-background">
          <div className="container max-w-7xl mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">What Our Customers Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { name: "Alice M.", text: "The amigurumi bear I bought is absolutely adorable! The quality is amazing." },
                      { name: "John D.", text: "Fast shipping and the blanket is so soft. Highly recommend Crocket Store!" },
                      { name: "Sarah K.", text: "I love my new cardigan. Fits perfectly and looks exactly like the photos." }
                  ].map((t, i) => (
                      <div key={i} className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg shadow-sm bg-card">
                          <p className="italic text-muted-foreground">"{t.text}"</p>
                          <p className="font-semibold">- {t.name}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>
    </div>
  );
};
