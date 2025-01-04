import React from 'react';

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="#4CAF50"/>
        <path d="M24 12C24 12 18 18 18 24C18 27.3137 20.6863 30 24 30C27.3137 30 30 27.3137 30 24C30 18 24 12 24 12Z" fill="#81C784"/>
      </svg>
    ),
    title: "Eco-Friendly",
    description: "All our products are made with sustainable materials and eco-friendly processes."
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 4L6 12V22C6 32.0545 13.7455 41.3636 24 44C34.2545 41.3636 42 32.0545 42 22V12L24 4Z" fill="#FFC107"/>
        <path d="M21.1716 29.8284L15.1716 23.8284L17.8284 21.1716L21.1716 24.5147L30.1716 15.5147L32.8284 18.1716L21.1716 29.8284Z" fill="#FFECB3"/>
      </svg>
    ),
    title: "High Quality",
    description: "We ensure the highest quality standards in all our products."
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="#2196F3"/>
        <path d="M24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36C30.6274 36 36 30.6274 36 24C36 17.3726 30.6274 12 24 12ZM33.6 24C33.6 29.3019 29.3019 33.6 24 33.6C18.6981 33.6 14.4 29.3019 14.4 24C14.4 18.6981 18.6981 14.4 24 14.4C29.3019 14.4 33.6 18.6981 33.6 24Z" fill="#90CAF9"/>
      </svg>
    ),
    title: "Global Reach",
    description: "Serving customers worldwide with fast and reliable shipping."
  }
]; 