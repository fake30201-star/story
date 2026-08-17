export type SizeOption = {
  size: "S" | "M" | "L" | "XL" | "XXL";
  stock: number;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: "رجالي" | "حريمي" | "أطفال" | "إكسسوارات";
  brand: string;
  price: number;
  previousPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  badge?: string;
  colors: string[];
  sizes: SizeOption[];
  description: string;
  specs: Record<string, string>;
  care: string[];
  stock: number;
  isFeatured?: boolean;
};

export const categories = [
  { name: "رجالي", slug: "men" },
  { name: "حريمي", slug: "women" },
  { name: "أطفال", slug: "kids" },
  { name: "إكسسوارات", slug: "accessories" },
];

export const brands = ["Luna", "North Peak", "Monarch", "Breezy", "Kiddie", "Velora"];

export const products: Product[] = [
  {
    id: 1,
    slug: "jackets-royal-overshirt",
    name: "جاكت رويال أوفرشيرت",
    category: "رجالي",
    brand: "North Peak",
    price: 389,
    previousPrice: 499,
    rating: 4.8,
    reviews: 184,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    ],
    badge: "الأكثر مبيعاً",
    colors: ["أسود", "كحلي", "رمل"],
    sizes: [
      { size: "S", stock: 7 },
      { size: "M", stock: 12 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 5 },
    ],
    description:
      "جاكت أنيق من قماش صلب ومرن، مصمم للستايليت العصري مع طبقة داخلية دافئة ومناسب للارتداء اليومي أو في رحلات نهاية الأسبوع.",
    specs: {
      الخامة: "بوليستر/قطن",
      بلد_المنشأ: "تركيا",
      العناية: "غسيل يدوي مناسب",
    },
    care: ["غسل يدوي أو دورة خفيفة", "عدم استخدام المبيض", "تجفيف بعيداً عن أشعة الشمس المباشرة"],
    stock: 34,
    isFeatured: true,
  },
  {
    id: 2,
    slug: "silk-dress-luna-elegance",
    name: "فستان لونا إيلجانس",
    category: "حريمي",
    brand: "Luna",
    price: 279,
    previousPrice: 349,
    rating: 4.9,
    reviews: 265,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    ],
    badge: "جديد",
    colors: ["وردي", "أبيض", "أسود"],
    sizes: [
      { size: "S", stock: 9 },
      { size: "M", stock: 15 },
      { size: "L", stock: 13 },
      { size: "XL", stock: 7 },
    ],
    description:
      "فستان حريري أنيق مزين بخياطة دقيقة، يعمل بكفاءة للتجمعات الرسمية واليوميات الراقية مع إطلالة متوازنة وناعمة.",
    specs: {
      الخامة: "حرير صناعي",
      بلد_المنشأ: "إيطاليا",
      العناية: "غسيل جاف فقط",
    },
    care: ["غسيل جاف موصى به", "تجنب الحرارة العالية", "خزن في كيس نايلون معقم"],
    stock: 44,
    isFeatured: true,
  },
  {
    id: 3,
    slug: "classic-tshirt-heritage",
    name: "تيشيرت هيريتاج كلاسيك",
    category: "رجالي",
    brand: "Monarch",
    price: 149,
    rating: 4.7,
    reviews: 132,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    ],
    colors: ["أسود", "أبيض", "أزرق داكن"],
    sizes: [
      { size: "S", stock: 18 },
      { size: "M", stock: 22 },
      { size: "L", stock: 25 },
      { size: "XL", stock: 17 },
      { size: "XXL", stock: 9 },
    ],
    description:
      "قصةً بسيطة وعملية، تيشيرت كاجوال مصمم بتفاصيل دقيقة مع خياطة متينة وقصة ممتازة للارتداء اليومي.",
    specs: {
      الخامة: "قطن 100%",
      بلد_المنشأ: "المغرب",
      العناية: "غسيل آلي دافئ",
    },
    care: ["استخدم غسالة دافئة", "تجنب التجفيف المفرط", "استخدم مكوى دافئ"],
    stock: 91,
    isFeatured: false,
  },
  {
    id: 4,
    slug: "mini-backpack-skyline",
    name: "حقيبة ظهر سكايل لاين",
    category: "إكسسوارات",
    brand: "Velora",
    price: 199,
    rating: 4.6,
    reviews: 94,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
    ],
    colors: ["أسود", "بني", "رمادي"],
    sizes: [{ size: "M", stock: 11 }],
    description:
      "حقيبة عملية ومريحة مع تفاصيل أنيقة، مناسبة للمدرسة أو السفر اليومي مع مساحة تخزين جيدة وراحة في الحمل.",
    specs: {
      الخامة: "قماش مقاوم للماء",
      بلد_المنشأ: "كوريا الجنوبية",
      العناية: "مسح جاف",
    },
    care: ["تنظيف جاف", "حفظ بعيداً عن الرطوبة", "تجنب الضغط الثقيل"],
    stock: 22,
    isFeatured: true,
  },
  {
    id: 5,
    slug: "denim-set-breezy-kids",
    name: "طقم دينم بريزي للأطفال",
    category: "أطفال",
    brand: "Breezy",
    price: 219,
    previousPrice: 279,
    rating: 4.8,
    reviews: 88,
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80",
    ],
    colors: ["أزرق", "كريمي", "رمادي"],
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 12 },
      { size: "L", stock: 9 },
    ],
    description:
      "طقم مريح وقيم، مناسب للأنشطة اليومية مع قماش خفيف ومتان ومظهر مرن يليق بأطفال اليوم.",
    specs: {
      الخامة: "دينم خفيف",
      بلد_المنشأ: "تشيكيا",
      العناية: "غسيل آلي معتدل",
    },
    care: ["غسيل آلي خفيف", "تجنب المبيض", "جفف بشكل أفقي"],
    stock: 29,
    isFeatured: true,
  },
  {
    id: 6,
    slug: "coastal-knit-dress",
    name: "فستان كروشيه كواتل",
    category: "حريمي",
    brand: "Luna",
    price: 249,
    rating: 4.7,
    reviews: 146,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    ],
    colors: ["أخضر", "وردي", "بيج"],
    sizes: [
      { size: "S", stock: 7 },
      { size: "M", stock: 10 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 4 },
    ],
    description:
      "فستان خفيف ينساب مع لمسات كروشيه أنيقة، مناسب للبرود الخفيف والارتداء مع الجوارب والرّداءات الفاخرة.",
    specs: {
      الخامة: "صوف خفيف",
      بلد_المنشأ: "السويد",
      العناية: "غسيل يدوي فقط",
    },
    care: ["غسل يدوي", "تجنب التمديد", "تجفيف بعيداً عن الحرارة"],
    stock: 29,
    isFeatured: false,
  },
  {
    id: 7,
    slug: "urban-leather-belt",
    name: "حزام أوربان جلدي",
    category: "إكسسوارات",
    brand: "Monarch",
    price: 129,
    rating: 4.5,
    reviews: 72,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
    ],
    colors: ["أسود", "بني"],
    sizes: [{ size: "M", stock: 15 }],
    description:
      "حزام أنيق من الجلد الصناعي الناعم، يضيف لمسة فاخرة لأي إطلالة مع تفاصيل سينمائية وتخطيط عملي.",
    specs: {
      الخامة: "جلد صناعي",
      بلد_المنشأ: "فرنسا",
      العناية: "مسح جاف",
    },
    care: ["مسح جاف", "تجنب البلل", "حفظ بعيداً عن أشعة الشمس"],
    stock: 51,
    isFeatured: false,
  },
  {
    id: 8,
    slug: "adventure-sneaker-pro",
    name: "حذاء أدفنتشر برو",
    category: "رجالي",
    brand: "North Peak",
    price: 329,
    previousPrice: 399,
    rating: 4.9,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
    ],
    colors: ["أسود", "أخضر داكن", "رمادي"],
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 14 },
      { size: "L", stock: 11 },
      { size: "XL", stock: 8 },
    ],
    description:
      "حذاء رياضي متين بقمّة دعم قابل للارتداء في الح walks اليومية أو رحلات المشي الطويلة مع بندى أحذية مرتكز.",
    specs: {
      الخامة: "شبك + جلدة",
      بلد_المنشأ: "الولايات المتحدة",
      العناية: "تنظيف جاف",
    },
    care: ["تنظيف جاف", "تجنب الماء لفترات طويلة", "تمشيط النسيج بلطف"],
    stock: 39,
    isFeatured: true,
  },
  {
    id: 9,
    slug: "signature-watch-ember",
    name: "ساعة إمبر سيجنتشر",
    category: "إكسسوارات",
    brand: "Velora",
    price: 449,
    previousPrice: 589,
    rating: 4.8,
    reviews: 110,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=80",
    ],
    colors: ["فضي", "أسود"],
    sizes: [{ size: "M", stock: 10 }],
    description:
      "ساعة أنيقة بتصميم كلاسيكي مع شاشة نضيفة وواجهة أنيقة للعناية اليومية ومناسبات العمل.",
    specs: {
      الخامة: "فولاذ مقاوم",
      بلد_المنشأ: "اليابان",
      العناية: "مسح جاف",
    },
    care: ["مسح جاف", "تجنب التعرض للماء", "حفظ في علبة ساعة"],
    stock: 18,
    isFeatured: false,
  },
];

export const customerOrders = [
  {
    id: "#1042",
    date: "15 مايو 2026",
    total: 764,
    status: "تم التسليم",
    payment: "بطاقة ائتمان",
  },
  {
    id: "#1049",
    date: "22 مايو 2026",
    total: 420,
    status: "قيد الشحن",
    payment: "PayPal",
  },
  {
    id: "#1064",
    date: "30 يونيو 2026",
    total: 1230,
    status: "قيد التجهيز",
    payment: "الدفع عند الاستلام",
  },
];

export const wishlist = [
  products[1],
  products[4],
  products[7],
];

export const reviews = [
  {
    customer: "سارة م.",
    rating: 5,
    comment: "التجربة ممتازة، الجودة تجاوزت التوقعات والخدمة سريعة جدًا.",
  },
  {
    customer: "عبدالله ه.",
    rating: 4,
    comment: "التصميم أنيق والقماش ناعم. سأعيد الطلب بالتأكيد.",
  },
  {
    customer: "ريم ج.",
    rating: 5,
    comment: "اللون جميل جدًا، المقاس مناسب تمامًا، والألوان مطابقة للصور.",
  },
];
