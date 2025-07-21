"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Sparkles,
  Facebook,
  Instagram,
  MessageSquare,
} from "lucide-react";

const navLinks = [
  { href: "#home", label: "Inicio" },
  { href: "#products", label: "Productos" },
  { href: "#about", label: "Sobre Nosotros" },
  { href: "#contact", label: "Contacto" },
];

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary text-primary-foreground shadow-md"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Sparkles className="h-6 w-6" />
          <span>Home Clean</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="#">
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">Iniciar Sesión</Button>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 text-primary-foreground/80 hover:text-primary-foreground" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-primary-foreground/80 hover:text-primary-foreground" />
            </Link>
            <Link href="#" aria-label="WhatsApp">
              <MessageSquare className="h-5 w-5 text-primary-foreground/80 hover:text-primary-foreground" />
            </Link>
          </div>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-primary text-primary-foreground">
            <div className="flex flex-col gap-6 p-6">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                <Sparkles className="h-6 w-6" />
                <span>Home Clean</span>
              </Link>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-lg font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t pt-6 flex flex-col gap-4">
                <Link href="#">
                    <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">Iniciar Sesión</Button>
                </Link>
                <div className="flex justify-center gap-6">
                    <Link href="#" aria-label="Facebook">
                        <Facebook className="h-6 w-6 text-primary-foreground/80 hover:text-primary-foreground" />
                    </Link>
                    <Link href="#" aria-label="Instagram">
                        <Instagram className="h-6 w-6 text-primary-foreground/80 hover:text-primary-foreground" />
                    </Link>
                    <Link href="#" aria-label="WhatsApp">
                        <MessageSquare className="h-6 w-6 text-primary-foreground/80 hover:text-primary-foreground" />
                    </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
