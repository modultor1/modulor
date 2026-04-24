"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSent(true);
  }

  return (
    <section className="relative overflow-hidden bg-dark-green py-16">
      {/* Pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <Image
          src="/images/pattern-newsletter.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Abonnez-vous à notre newsletter
        </h2>
        <p className="text-white/70 text-sm max-w-md">
          Recevez en avant-première nos nouvelles formations, actualités et conseils
          directement dans votre boîte mail.
        </p>

        {sent ? (
          <p className="text-accent font-bold text-lg">
            Merci ! Vous êtes bien inscrit(e) 🎉
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              className="flex-1 rounded-full px-5 py-3 text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button type="submit" variant="secondary" size="md">
              S&apos;abonner
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
