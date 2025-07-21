
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/products", label: "Productos" },
  { href: "/#about", label: "Sobre Nosotros" },
  { href: "/#contact", label: "Contacto" },
];

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappNumber = "8296919556";
  const message = encodeURIComponent("¡Hola! Vengo desde su página web y estoy interesado en sus productos.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary text-primary-foreground shadow-md"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/">
          <Image 
            src="/images/logoweb.png" 
            alt="Home Clean Logo" 
            width={140} 
            height={40} 
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="https://homecleanrd.netlify.app" target="_blank">
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">Iniciar Sesión</Button>
          </Link>
          <div className="flex items-center gap-4">
             <Link href="https://web.facebook.com/profile.php?id=100063748722913" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-primary-foreground hover:opacity-80">
                <Image src="/images/face.png" alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="https://www.instagram.com/homeclean_rd/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-primary-foreground hover:opacity-80">
                <Image src="/images/ig.png" alt="Instagram" width={24} height={24} className="hover:opacity-80" />
              </Link>
              <Link href={whatsappUrl} target="_blank" aria-label="WhatsApp" className="text-primary-foreground hover:opacity-80">
                <Image src="/images/wa.png" alt="WhatsApp" width={24} height={24} className="hover:opacity-80" />
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
          <SheetContent side="left" className="bg-card text-card-foreground">
            <div className="flex flex-col gap-6 p-6">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image 
                  src="/images/logoweb.png" 
                  alt="Home Clean Logo" 
                  width={140} 
                  height={40}
                />
              </Link>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t pt-6 flex flex-col gap-4">
                <Link href="https://homecleanrd.netlify.app" target="_blank">
                    <Button className="w-full">Iniciar Sesión</Button>
                </Link>
                <div className="flex justify-center gap-6">
                    <Link href="https://web.facebook.com/profile.php?id=100063748722913" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                       <Image src="/images/face.png" alt="Facebook" width={24} height={24} />
                    </Link>
                    <Link href="https://www.instagram.com/homeclean_rd/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                       <Image src="/images/ig.png" alt="Instagram" width={24} height={24} />
                    </Link>
                    <Link href={whatsappUrl} target="_blank" aria-label="WhatsApp">
                        <Image src="/images/wa.png" alt="WhatsApp" width={24} height={24} />
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
