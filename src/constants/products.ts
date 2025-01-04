import { Product } from '../types';

export const categories = [
  'Kitchen & Dining',
  'Personal Care',
  'Outdoor',
  'Home & Living',
  'Accessories',
  'All'
] as const;

export const products: Product[] = [
  {
    id: 1,
    name: "Eco-Friendly Water Bottle",
    description: "Sustainable and reusable water bottle made from recycled materials.",
    price: 29.99,
    image: "/products/bottle.jpg",
    badge: "New",
    color: "#2EA043",
    category: "Accessories",
    tags: ["drinks", "reusable", "recycled"]
  },
  {
    id: 2,
    name: "Bamboo Cutlery Set",
    description: "100% biodegradable bamboo cutlery set for eco-conscious dining.",
    price: 19.99,
    image: "/products/cutlery.jpg",
    color: "#8B5E3C",
    category: "Kitchen & Dining",
    tags: ["kitchen", "bamboo", "dining"]
  },
  {
    id: 3,
    name: "Organic Cotton Tote",
    description: "Stylish and sustainable tote bag made from organic cotton.",
    price: 24.99,
    image: "/products/tote.jpg",
    badge: "Best Seller",
    color: "#E5C07B",
    category: "Accessories",
    tags: ["bags", "cotton", "shopping"]
  },
  {
    id: 4,
    name: "Recycled Glass Vase",
    description: "Beautiful vase crafted from recycled glass with unique patterns.",
    price: 39.99,
    image: "/products/vase.jpg",
    color: "#61AFEF",
    category: "Home & Living",
    tags: ["decor", "recycled", "glass"]
  },
  {
    id: 5,
    name: "Bamboo Toothbrush Set",
    description: "Pack of 4 biodegradable bamboo toothbrushes with charcoal bristles.",
    price: 15.99,
    image: "/products/toothbrush.jpg",
    badge: "Popular",
    color: "#98C379",
    category: "Personal Care",
    tags: ["bathroom", "bamboo", "hygiene"]
  },
  {
    id: 6,
    name: "Hemp Yoga Mat",
    description: "Natural hemp yoga mat with non-slip surface and carrying strap.",
    price: 49.99,
    image: "/products/yoga-mat.jpg",
    color: "#C678DD",
    category: "Outdoor",
    tags: ["exercise", "hemp", "yoga"]
  },
  {
    id: 7,
    name: "Reusable Produce Bags",
    description: "Set of 5 mesh bags for plastic-free grocery shopping.",
    price: 16.99,
    image: "/products/produce-bags.jpg",
    badge: "Eco Choice",
    color: "#56B6C2",
    category: "Kitchen & Dining",
    tags: ["kitchen", "shopping", "reusable"]
  },
  {
    id: 8,
    name: "Solar-Powered Lantern",
    description: "Collapsible solar lantern perfect for camping and emergencies.",
    price: 34.99,
    image: "/products/lantern.jpg",
    color: "#E5C07B",
    category: "Outdoor",
    tags: ["lighting", "solar", "camping"]
  },
  {
    id: 9,
    name: "Compost Bin",
    description: "Stylish kitchen compost bin with charcoal filter.",
    price: 45.99,
    image: "/products/compost.jpg",
    color: "#98C379",
    category: "Kitchen & Dining",
    tags: ["kitchen", "composting", "waste"]
  }
]; 