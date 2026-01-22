import { Button } from "@workspace/ui/components/button";

export const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-4xl hover:text-6xl duration-300 font-bold tracking-tighter">
          Welcome to Crocket Store
        </h1>
        <p className="max-w-[600px] text-muted-foreground text-lg">
          Discover our exclusive collection of handcrafted crochet items. Made with love, for you.
        </p>
        <div className="flex gap-4">
             <Button size="lg">Shop Now</Button>
             <Button variant="outline" size="lg">Learn More</Button>
        </div>
      </div>
    </div>
  );
};
