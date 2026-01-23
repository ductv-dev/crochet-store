import { CategoryShowcase } from "@/components/feature/home/category-showcase";
import { FeaturedProducts } from "@/components/feature/home/featured-products";
import { HomeBannerSlider } from "@/components/feature/home/home-banner-slider";

export const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeBannerSlider />

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
