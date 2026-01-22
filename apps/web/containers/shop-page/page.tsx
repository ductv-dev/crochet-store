import { Button } from "@workspace/ui/components/button";

export const ShopPage = () => {
  const PRODUCTS = [
    { id: 1, name: "Crochet Bear", price: "$25.00", image: "https://placehold.co/400x400?text=Bear" },
    { id: 2, name: "Handmade Scarf", price: "$45.00", image: "https://placehold.co/400x400?text=Scarf" },
    { id: 3, name: "Woolen Hat", price: "$20.00", image: "https://placehold.co/400x400?text=Hat" },
    { id: 4, name: "Baby Blanket", price: "$60.00", image: "https://placehold.co/400x400?text=Blanket" },
    { id: 5, name: "Crochet Bag", price: "$35.00", image: "https://placehold.co/400x400?text=Bag" },
    { id: 6, name: "Amigurumi Cat", price: "$30.00", image: "https://placehold.co/400x400?text=Cat" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop Our Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
             <div className="aspect-square relative overflow-hidden bg-muted">
                {/* Placeholder Image - in real app would use next/image */}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
             </div>
             <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-muted-foreground">{product.price}</p>
                <div className="mt-4">
                    <Button className="w-full">Add to Cart</Button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
