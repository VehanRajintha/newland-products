import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

interface SocialLink {
  name: string;
  url: string;
  icon: JSX.Element;
}

interface FooterLink {
  name: string;
  url: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: <FaFacebook size={20} />
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: <FaTwitter size={20} />
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: <FaInstagram size={20} />
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: <FaLinkedin size={20} />
  }
];

const footerLinks: FooterSection[] = [
  {
    title: 'Products',
    links: [
      { name: 'Tea Sets', url: '/products/tea-sets' },
      { name: 'Accessories', url: '/products/accessories' },
      { name: 'Collections', url: '/products/collections' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', url: '/about' },
      { name: 'Sustainability', url: '/sustainability' },
      { name: 'Blog', url: '/blog' }
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'Contact', url: '/contact' },
      { name: 'FAQs', url: '/faqs' },
      { name: 'Shipping', url: '/shipping' }
    ]
  }
];

const Footer = () => {
  return (
    <footer className="footer-bg relative">
      <div className="footer-wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>

      <div className="footer-content py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="footer-card"
            >
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <img src="/logo.svg" alt="Newland Products" className="h-8 w-8" />
                <span className="text-xl font-bold text-white">Newland Products</span>
              </Link>
              <p className="text-white/80 mb-6">
                Creating sustainable products for a better tomorrow.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="footer-card"
              >
                <h3 className="text-lg font-bold text-white mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.url}
                        className="footer-link"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="footer-divider"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="footer-link text-sm">
                © {new Date().getFullYear()} Newland Products. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/privacy" className="footer-link text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="footer-link text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 