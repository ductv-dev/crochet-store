import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/categories";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";

export const CategoryShowcase = () => {
  return (
    <section className="py-12 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-center mb-8">Shop by Category</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {CATEGORIES.map((category) => (
                        <CarouselItem key={category.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
                            <Link href={`/shop?categoryId=${category.id}`} className="group block">
                                <Card className="overflow-hidden border-none shadow-none bg-transparent">
                                     <div className="relative aspect-square overflow-hidden rounded-full border-4 border-background shadow-md transition-transform group-hover:scale-105 group-hover:border-primary/20">
                                         <Image
                                            src={category.imageUrl}
                                            alt={category.name}
                                            fill
                                            className="object-cover"
                                         />
                                     </div>
                                     <CardContent className="text-center pt-2 md:pt-4">
                                         <h3 className="font-semibold text-sm md:text-lg group-hover:text-primary transition-colors">{category.name}</h3>
                                     </CardContent>
                                </Card>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12" />
                <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
        </div>
    </section>
  );
};
