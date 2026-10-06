
import { useState } from "react";
import { Button } from "@/components/ui/button";

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      name: "Heritage Blazer",
      price: "$850",
      description: "Timeless elegance meets modern tailoring",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop",
      category: "Outerwear"
    },
    {
      id: 2,
      name: "Silk Essence Dress",
      price: "$1,200",
      description: "Fluid grace in pure Italian silk",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop",
      category: "Dresses"
    },
    {
      id: 3,
      name: "Cashmere Coat",
      price: "$1,800",
      description: "Luxurious warmth, impeccable style",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop",
      category: "Outerwear"
    },
    {
      id: 4,
      name: "Classic Trouser",
      price: "$480",
      description: "Perfect fit, endless possibilities",
      image: "https://images.unsplash.com/photo-1506629905844-f19e00b6c3b2?w=500&h=600&fit=crop",
      category: "Bottoms"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-luxury-bold text-4xl md:text-5xl text-foreground mb-6 animate-slide-up">
            Featured Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Discover our most coveted pieces, where traditional craftsmanship 
            meets contemporary design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {hoveredProduct === product.id && (
                    <div className="absolute inset-0 bg-cj-black/40 flex items-center justify-center animate-fade-in">
                      <Button 
                        className="bg-cj-gold text-cj-black hover:bg-cj-gold/90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      >
                        View Details
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="text-sm text-cj-gold font-medium mb-2">
                    {product.category}
                  </div>
                  <h3 className="font-luxury-bold text-xl text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-luxury-bold text-lg text-foreground">
                      {product.price}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-cj-gold/20 group-hover:bg-cj-gold transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            size="lg" 
            variant="outline"
            className="border-cj-gold text-cj-gold hover:bg-cj-gold/10 px-8 py-3 animate-scale-in"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
