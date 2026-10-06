import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  ChevronRight,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { ProductCard } from '@/components/ProductCard';
import { AtelierBreadcrumb } from '@/components/AtelierBreadcrumb';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === id);

  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    setIsCartOpen,
    openWhatsAppConcierge
  } = useShop();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'S');
      setSelectedColor(product.colors[0]?.name || 'Noir');
      setSelectedImageIdx(0);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center pt-32">
        <h1 className="font-playfair text-3xl font-bold text-neutral-900 mb-2">
          Piece Not Found
        </h1>
        <p className="text-sm text-neutral-500 mb-6">
          The requested creation may have retired or moved to the private archive.
        </p>
        <Link
          to="/shop"
          className="bg-[#0A0A0A] text-white py-3 px-6 text-xs uppercase tracking-widest font-semibold"
        >
          Return to Collection
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCartOpen(true);
  };

  // Complete the look
  const completeLookProducts = (product.completeTheLookIds || [])
    .map((cid) => PRODUCTS.find((p) => p.id === cid))
    .filter(Boolean) as typeof PRODUCTS;

  // You may also like
  const relatedProducts = (product.relatedProductIds || [])
    .map((rid) => PRODUCTS.find((p) => p.id === rid))
    .filter(Boolean) as typeof PRODUCTS;

  // Schema.org Product structured data
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'CT Collections'
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability:
        product.stockStatus === 'low-stock' || product.stockStatus === 'in-stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      itemCondition: 'https://schema.org/NewCondition'
    }
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/shop' },
    { label: product.category, href: `/shop?category=${encodeURIComponent(product.category)}` },
    { label: product.name }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Product Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-100">
        <AtelierBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Main PDP Grid: Gallery Left, Sticky Purchase Module Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Gallery Column (7 Cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Column */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible flex-shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-16 h-20 md:w-20 md:h-26 overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImageIdx === idx
                      ? 'border-[#0A0A0A] shadow-xs'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Active Image with Zoom */}
            <div
              className="relative aspect-[3/4] flex-1 overflow-hidden bg-[#FAF8F5] cursor-crosshair border border-neutral-100"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-200"
                style={
                  isZoomed
                    ? {
                        transform: 'scale(2.2)',
                        transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                      }
                    : {}
                }
              />
              <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-wider bg-black/60 text-white px-2 py-1 pointer-events-none font-mono">
                {isZoomed ? 'Zoom Active' : 'Hover to Zoom'}
              </span>
            </div>
          </div>

          {/* Contiguous Purchase Module (5 Cols on desktop, sticky) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="sticky top-28 space-y-6">
              {/* Category & Stock Status */}
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-neutral-500">
                <span>{product.category}</span>
                {product.stockStatus === 'low-stock' ? (
                  <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 border border-amber-200">
                    Only {product.stockCount} Available
                  </span>
                ) : product.stockStatus === 'made-to-order' ? (
                  <span className="text-neutral-800 font-semibold bg-neutral-100 px-2 py-0.5">
                    Made-to-Order Atelier
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold">In Stock & Ready for Courier</span>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="font-playfair text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs text-neutral-500 mt-1 font-light italic">
                  {product.tagline}
                </p>
              </div>

              {/* Price in Tabular Numerals */}
              <div className="flex items-baseline gap-3 tabular-nums border-b border-neutral-100 pb-5">
                <span className="font-playfair text-2xl font-bold text-neutral-900">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-[11px] text-neutral-500 font-light ml-auto">
                  Taxes & white-glove packaging included
                </span>
              </div>

              {/* Narrative description */}
              <p className="text-xs text-neutral-700 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Color Selection */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="uppercase tracking-wider font-semibold text-neutral-700 text-[11px]">
                    Shade: <strong className="text-neutral-950 font-medium">{selectedColor}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 border text-xs transition-all ${
                        selectedColor === c.name
                          ? 'border-neutral-950 bg-neutral-50 font-semibold text-neutral-950 shadow-xs'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection & Sizing Guide */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="uppercase tracking-wider font-semibold text-neutral-700 text-[11px]">
                    Select Size:
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-medium"
                  >
                    <Ruler size={13} />
                    <span>Atelier Size Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 text-xs font-mono font-medium border text-center transition-all ${
                        selectedSize === size
                          ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-xs'
                          : 'border-neutral-200 text-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart Controls */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-neutral-200">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-3 text-neutral-500 hover:text-neutral-900"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-medium text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3.5 py-3 text-neutral-500 hover:text-neutral-900"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-white py-3.5 px-6 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg"
                  >
                    <ShoppingBag size={16} />
                    <span>Add to Shopping Bag</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 border transition-colors ${
                      wishlisted
                        ? 'border-red-200 bg-red-50 text-red-500'
                        : 'border-neutral-200 text-neutral-600 hover:text-neutral-900'
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* WhatsApp Bespoke Consultation trigger */}
                <button
                  onClick={() =>
                    openWhatsAppConcierge(
                      `Hello CT Collections! I am inquiring about the ${product.name} in size ${selectedSize} (${selectedColor}). Can we review bespoke measurements?`
                    )
                  }
                  className="w-full border border-neutral-300 hover:border-neutral-900 text-neutral-800 text-xs py-2.5 px-4 font-medium transition-colors text-center"
                >
                  Consult Stylist on WhatsApp for Custom Fit
                </button>
              </div>

              {/* Guarantees */}
              <div className="border-t border-neutral-100 pt-5 space-y-3 text-xs text-neutral-500">
                <div className="flex items-center gap-2.5">
                  <Truck size={15} className="text-[#D4AF37]" />
                  <span>Complimentary White-Glove delivery on orders over $500</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={15} className="text-[#D4AF37]" />
                  <span>Numbered certificate of atelier authenticity included</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw size={15} className="text-[#D4AF37]" />
                  <span>30-Day complimentary exchanges & returns</span>
                </div>
              </div>

              {/* Specifications Accordion / Lists */}
              <div className="border-t border-neutral-100 pt-5 space-y-4 text-xs">
                <div>
                  <h4 className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px] mb-2">
                    Fabric Composition & Care
                  </h4>
                  <p className="text-neutral-600"><strong>Fabric:</strong> {product.fabric}</p>
                  <p className="text-neutral-600 mt-1"><strong>Care:</strong> {product.care}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px] mb-2">
                    Atelier Construction Details
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-neutral-600">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complete the Look Section */}
        {completeLookProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-neutral-200">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2">
              <Sparkles size={14} />
              <span>Styling Recommendation</span>
            </div>
            <h2 className="font-playfair text-3xl font-normal text-neutral-900 tracking-tight mb-8">
              Complete the Atelier Look
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {completeLookProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-neutral-200">
            <h2 className="font-playfair text-3xl font-normal text-neutral-900 tracking-tight mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Buy Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-3 flex items-center justify-between gap-3 shadow-2xl">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-neutral-900 truncate">{product.name}</p>
          <p className="font-mono text-xs font-bold text-neutral-900 tabular-nums">${product.price}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-[#0A0A0A] text-white px-5 py-2.5 text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 flex-shrink-0"
        >
          <ShoppingBag size={14} />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
