import React from "react";
import { Button } from "@/components/ui/button";
import {
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiMail,
  FiInstagram,
} from "react-icons/fi";
import { NavLink } from "react-router";

const footerLinks = {
  product: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Browse Developers", href: "/marketplace" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FiGithub, href: "https://github.com", label: "GitHub" },
  { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-linear-to-br from-muted/30 via-background to-muted/30 border-t border-border/50">
      {/* Decorative top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
                DevPalace
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Your trusted marketplace for hiring skilled developers. Connect
                with top talent, build amazing projects, and grow your business.
              </p>
            </div>

            {/* Newsletter signup */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                Subscribe to our newsletter
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  aria-label="Email for newsletter"
                />
                <Button size="sm" className="shrink-0">
                  <FiMail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-foreground mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <NavLink
                  key={social.label}
                  to={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} DevPalace. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <NavLink
                to="/sitemap"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Sitemap
              </NavLink>
              <NavLink
                to="/accessibility"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Accessibility
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
