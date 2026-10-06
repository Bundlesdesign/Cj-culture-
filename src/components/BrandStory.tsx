
const BrandStory = () => {
  return (
    <section className="py-24 bg-cj-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-up">
            <h2 className="font-luxury-bold text-4xl md:text-5xl text-cj-black mb-8">
              The Art of
              <span className="block text-cj-gold">Timeless Design</span>
            </h2>
            <div className="space-y-6 text-lg text-cj-charcoal leading-relaxed">
              <p>
                Born from a passion for exceptional craftsmanship, CJ represents 
                the perfect marriage of traditional techniques and contemporary vision. 
                Each piece in our collection tells a story of dedication, artistry, 
                and unwavering commitment to quality.
              </p>
              <p>
                Our journey began with a simple belief: that clothing should be more 
                than mere fabric. It should be an extension of one's character, a 
                testament to personal style, and a celebration of life's most 
                precious moments.
              </p>
              <p>
                From the finest Italian silks to the most luxurious cashmere, 
                every material is carefully selected, every stitch deliberately placed, 
                every detail meticulously considered.
              </p>
            </div>
            <div className="mt-8">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="font-luxury-bold text-3xl text-cj-gold mb-2">50+</div>
                  <div className="text-sm text-cj-charcoal">Years of Heritage</div>
                </div>
                <div className="text-center">
                  <div className="font-luxury-bold text-3xl text-cj-gold mb-2">200+</div>
                  <div className="text-sm text-cj-charcoal">Artisan Partners</div>
                </div>
                <div className="text-center">
                  <div className="font-luxury-bold text-3xl text-cj-gold mb-2">15</div>
                  <div className="text-sm text-cj-charcoal">Countries</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=400&fit=crop"
                  alt="Craftsmanship detail"
                  className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
                <img
                  src="https://images.unsplash.com/photo-1559563458-527cdd2b4272?w=300&h=300&fit=crop"
                  alt="Fabric texture"
                  className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=300&fit=crop"
                  alt="Atelier workspace"
                  className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
                <img
                  src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=400&fit=crop"
                  alt="Designer sketching"
                  className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-cj-gold/20 rounded-full animate-float" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-cj-gold/30 rounded-full animate-float animation-delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
