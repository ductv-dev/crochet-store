import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/categories";
import { Card, CardContent } from "@workspace/ui/components/card";

export const CategoryShowcase = () => {
  return (
    <section className="py-12 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {CATEGORIES.map((category) => (
                    <Link key={category.id} href={`/shop?categoryId=${category.id}`} className="group block">
                        <Card className="overflow-hidden border-none shadow-none bg-transparent">
                             <div className="relative aspect-square overflow-hidden rounded-full border-4 border-background shadow-md transition-transform group-hover:scale-105 group-hover:border-primary/20">
                                 <Image
                                    src={category.imageUrl}
                                    alt={category.name}
                                    fill
                                    className="object-cover"
                                 />
                             </div>
                             <CardContent className="text-center pt-4">
                                 <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{category.name}</h3>
                             </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  );
};
