import { Product } from '@/types/store';

// Generated editorial assets
import categoryEveningGown from '@/assets/images/category_evening_gowns_1791277473510.jpg';
import categoryTailoredBlazer from '@/assets/images/category_tailored_blazers_1791277482580.jpg';
import categorySilkDress from '@/assets/images/category_silk_dresses_1791277492612.jpg';
import heroFashionEditorial from '@/assets/images/hero_fashion_editorial_1791277461414.jpg';
import lookbookCoutureAtelier from '@/assets/images/lookbook_couture_atelier_1791277502272.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'ct-01',
    name: 'Aurelia Sculpted Evening Gown',
    tagline: 'Architectural column silhouette with delicate hand-finished draping',
    price: 1450,
    originalPrice: 1650,
    category: 'Evening Wear',
    description:
      'The Aurelia gown embodies effortless majesty. Cut on the bias from heavy Italian silk crepe, it features a sculptural asymmetric neckline and an elongated column skirt that cascades with fluid grace. Hand-finished by master artisans in our atelier.',
    details: [
      'Sculptural asymmetric shoulder with interior boning support',
      'Floor-sweeping column silhouette with subtle train',
      'Concealed invisible side zipper with silk-covered buttons',
      'Fully lined in 100% Mulberry silk habotai'
    ],
    fabric: '100% Heavy Italian Silk Crepe',
    care: 'Specialist dry clean only. Store in bespoke garment bag provided.',
    images: [
      categoryEveningGown,
      'https://images.unsplash.com/photo-1566479179817-c1b8e7b7b08b?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Noir Onyx', hex: '#111111' },
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Ivory Crème', hex: '#F8F6F0' }
    ],
    stockStatus: 'low-stock',
    stockCount: 3,
    isNew: true,
    isBestSeller: true,
    completeTheLookIds: ['ct-02', 'ct-06'],
    relatedProductIds: ['ct-03', 'ct-05']
  },
  {
    id: 'ct-02',
    name: 'Sovereign Tailored Wool Blazer',
    tagline: 'Sharp peaked lapels cut from double-faced virgin wool',
    price: 890,
    category: 'Blazers & Suiting',
    description:
      'A masterclass in modern tailoring. The Sovereign blazer pairs commanding sartorial structure with an effortless oversized drape. Featuring hand-sewn buttonholes and natural horn buttons sourced from sustainable heritage workshops.',
    details: [
      'Structured padded shoulders with relaxed tailored silhouette',
      'High-stance double-breasted closure',
      'Dual jet flap pockets and interior welt ticket pocket',
      'Cupro jacquard monogrammed lining'
    ],
    fabric: '100% Super 140s Virgin Wool',
    care: 'Dry clean only. Steam gently.',
    images: [
      categoryTailoredBlazer,
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506629905844-f19e00b6c3b2?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Alabaster Ivory', hex: '#F2EFE9' },
      { name: 'Sable Charcoal', hex: '#262626' },
      { name: 'Camel Tan', hex: '#C19A6B' }
    ],
    stockStatus: 'in-stock',
    stockCount: 8,
    isNew: true,
    isBestSeller: true,
    completeTheLookIds: ['ct-04', 'ct-01'],
    relatedProductIds: ['ct-07', 'ct-08']
  },
  {
    id: 'ct-03',
    name: 'Lysandra Bias-Cut Silk Slip Dress',
    tagline: 'Liquid drape with delicate cowl neckline and low back',
    price: 760,
    category: 'Silk & Satin',
    description:
      'The quintessential luxury staple. The Lysandra dress skims the silhouette effortlessly. Woven from 22-momme pure Mulberry silk with subtle sand-washed texture that feels like a second skin.',
    details: [
      'Classic 90s-inspired bias cut for organic movement',
      'Adjustable spaghetti cross-back straps with gold hardware',
      'French seams throughout for invisible interior finishes',
      'Calf-skimming midi length with delicate side slit'
    ],
    fabric: '100% Sand-Washed Mulberry Silk (22-Momme)',
    care: 'Hand wash cold with silk detergent or dry clean.',
    images: [
      categorySilkDress,
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Desert Sand', hex: '#E3DAC9' },
      { name: 'Midnight Black', hex: '#141414' },
      { name: 'Sage Celadon', hex: '#9CAF88' }
    ],
    stockStatus: 'in-stock',
    stockCount: 12,
    isNew: false,
    isBestSeller: true,
    completeTheLookIds: ['ct-02', 'ct-05'],
    relatedProductIds: ['ct-01', 'ct-06']
  },
  {
    id: 'ct-04',
    name: 'Atelier Wide-Leg Wool Trousers',
    tagline: 'High-waisted pleated trousers tailored for statuesque posture',
    price: 540,
    category: 'Blazers & Suiting',
    description:
      'Engineered with deep front knife pleats and an elongated pooling hemline. Designed to create a clean vertical line from natural waist to floor.',
    details: [
      'High-rise waist with tailored curtain waistband',
      'Double forward pleats and clean back welt pockets',
      'Blind-stitched hem with generous turn-up allowance',
      'Pocket lining in soft breathable organic cotton'
    ],
    fabric: '98% Virgin Wool, 2% Elastane for structured comfort',
    care: 'Dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1506629905844-f19e00b6c3b2?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Alabaster Ivory', hex: '#F2EFE9' },
      { name: 'Sable Charcoal', hex: '#262626' }
    ],
    stockStatus: 'in-stock',
    stockCount: 10,
    isNew: false,
    isBestSeller: false,
    completeTheLookIds: ['ct-02', 'ct-07'],
    relatedProductIds: ['ct-02', 'ct-08']
  },
  {
    id: 'ct-05',
    name: 'Palais Double-Faced Cashmere Coat',
    tagline: 'Cocoon wrap silhouette in buttery double-faced mongolian cashmere',
    price: 2150,
    originalPrice: 2400,
    category: 'Outerwear',
    description:
      'The crown jewel of winter tailoring. Crafted from double-faced unlined Mongolian cashmere, split and hand-sewn along every edge. Includes a self-tie sash belt for effortless cinching.',
    details: [
      'Unlined double-face technique with hand-rolled seams',
      'Generous shawl collar that can be styled upright',
      'Drop shoulders with kimono-inspired wide sleeves',
      'Deep inseam hand pockets'
    ],
    fabric: '100% Grade-A Mongolian Cashmere',
    care: 'Specialist dry clean. Brush gently with cashmere comb.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&auto=format&fit=crop&q=80',
      heroFashionEditorial,
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Warm Camel', hex: '#B58D5D' },
      { name: 'Black Velvet', hex: '#121212' },
      { name: 'Oatmeal Heather', hex: '#E2DBD2' }
    ],
    stockStatus: 'low-stock',
    stockCount: 2,
    isNew: true,
    isBestSeller: true,
    completeTheLookIds: ['ct-03', 'ct-07'],
    relatedProductIds: ['ct-01', 'ct-02']
  },
  {
    id: 'ct-06',
    name: 'Seraphina Pleated Chiffon Cape Gown',
    tagline: 'Ethereal micro-pleated cape with dramatic movement',
    price: 1780,
    category: 'Evening Wear',
    description:
      'Created for gala evenings and red carpet entrances. Sunburst accordian pleating radiates from a high halter neckline into an enveloping silk chiffon capelet that moves like smoke with every step.',
    details: [
      'Bespoke accordion sunburst pleating by Parisian artisans',
      'Keyhole neck closure with hand-cast 18k gold-dipped button',
      'Built-in structured silk corset bodice',
      'Floor length with trailing cape overlay'
    ],
    fabric: '100% Silk Chiffon with Silk Satin lining',
    care: 'Specialist couture dry clean only.',
    images: [
      lookbookCoutureAtelier,
      categoryEveningGown,
      'https://images.unsplash.com/photo-1566479179817-c1b8e7b7b08b?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne Luster', hex: '#E6D7B9' },
      { name: 'Onyx Noir', hex: '#0D0D0D' }
    ],
    stockStatus: 'made-to-order',
    stockCount: 4,
    isNew: true,
    isBestSeller: false,
    completeTheLookIds: ['ct-01', 'ct-05'],
    relatedProductIds: ['ct-01', 'ct-03']
  },
  {
    id: 'ct-07',
    name: 'Celeste Ribbed Cashmere Turtleneck',
    tagline: 'Featherlight 16-gauge knit with elongated thumbhole cuffs',
    price: 490,
    category: 'Knitwear & Tops',
    description:
      'A refined second skin crafted from ultra-fine 16-gauge combed cashmere yarn. Designed with a clean raw-edge funnel neck and elongated cuffs tailored to peek out under blazers.',
    details: [
      'Ultra-fine 16-gauge seamless circular knit',
      'Refined funnel neck that holds shape without constricting',
      'Subtle ribbed stitch texture with natural stretch',
      'Pre-washed for cloud-like touch that resists pilling'
    ],
    fabric: '100% Fine Combed Cashmere',
    care: 'Hand wash cold or gentle dry clean. Lay flat to dry.',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Off-White Crème', hex: '#F9F8F5' },
      { name: 'Graphite', hex: '#333333' },
      { name: 'Mocha Taupe', hex: '#7A6B5D' }
    ],
    stockStatus: 'in-stock',
    stockCount: 15,
    isNew: false,
    isBestSeller: true,
    completeTheLookIds: ['ct-02', 'ct-04'],
    relatedProductIds: ['ct-03', 'ct-08']
  },
  {
    id: 'ct-08',
    name: 'Helena Silk Organza Trench Duster',
    tagline: 'Semi-sheer sculptural trench duster with storm flaps',
    price: 1120,
    category: 'Outerwear',
    description:
      'A breathtaking fusion of outerwear architecture and gossamer transparency. Cut from crisp Italian silk organza with exaggerated lapels, storm flaps, and horn buckles.',
    details: [
      'Structured sheer silk organza holds dramatic sculptural volume',
      'Deep back storm shield with central box pleat',
      'Matching fabric belt with leather-covered buckle',
      'French seams and silk-bound interior edges'
    ],
    fabric: '100% Crisp Italian Silk Organza',
    care: 'Dry clean only.',
    images: [
      heroFashionEditorial,
      categoryTailoredBlazer,
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Smoky Amber', hex: '#8C6239' },
      { name: 'Pure Noir', hex: '#0F0F0F' }
    ],
    stockStatus: 'low-stock',
    stockCount: 3,
    isNew: true,
    isBestSeller: false,
    completeTheLookIds: ['ct-03', 'ct-04'],
    relatedProductIds: ['ct-02', 'ct-05']
  }
];

export const CATEGORIES_DATA = [
  {
    name: 'Evening Wear',
    subtitle: 'Haute Couture & Gala Silhouettes',
    image: categoryEveningGown,
    count: '6 Atelier Pieces',
    categoryFilter: 'Evening Wear'
  },
  {
    name: 'Tailored Blazers',
    subtitle: 'Sharp Sculpted Architecture',
    image: categoryTailoredBlazer,
    count: '8 Tailored Styles',
    categoryFilter: 'Blazers & Suiting'
  },
  {
    name: 'Silk & Satin',
    subtitle: '22-Momme Italian Mulberry Silk',
    image: categorySilkDress,
    count: '12 Flowing Silhouettes',
    categoryFilter: 'Silk & Satin'
  },
  {
    name: 'The Atelier Edit',
    subtitle: 'Handmade Limited Commissions',
    image: lookbookCoutureAtelier,
    count: 'Limited Editions',
    categoryFilter: 'Outerwear'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    quote:
      'CT Collections redefines modern luxury. The draping of the Aurelia gown is worthy of Parisian haute couture houses, yet it feels weightless to wear.',
    author: 'Clara Vance',
    role: 'Fashion Editor, Vogue Scandinavia',
    location: 'Stockholm'
  },
  {
    id: 't-2',
    quote:
      'Finding tailoring that commands presence without sacrificing feminine fluidity is rare. The Sovereign blazer has become my undisputed uniform for international summits.',
    author: 'Elena Rostova',
    role: 'Creative Director & Discerning Collector',
    location: 'London'
  },
  {
    id: 't-3',
    quote:
      'The silk organza duster arrived in custom archival packaging. The French seams and fabric density surpassed my expectations. Pure craftsmanship.',
    author: 'Amina Diop',
    role: 'Architect & Patron of the Arts',
    location: 'Lagos & Paris'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: categoryEveningGown,
    tag: '@ctcollections #AureliaGown',
    likes: '1,420',
    title: 'Gala Night in Paris'
  },
  {
    id: 'ig-2',
    image: categoryTailoredBlazer,
    tag: '@ctcollections #SovereignBlazer',
    likes: '2,180',
    title: 'Tailoring in the City'
  },
  {
    id: 'ig-3',
    image: categorySilkDress,
    tag: '@ctcollections #LysandraSlip',
    likes: '980',
    title: 'Sunset in Lake Como'
  },
  {
    id: 'ig-4',
    image: lookbookCoutureAtelier,
    tag: '@ctcollections #CoutureFitting',
    likes: '3,450',
    title: 'Atelier Fitting Diaries'
  },
  {
    id: 'ig-5',
    image: heroFashionEditorial,
    tag: '@ctcollections #AW26Campaign',
    likes: '4,120',
    title: 'Editorial Campaign'
  }
];
