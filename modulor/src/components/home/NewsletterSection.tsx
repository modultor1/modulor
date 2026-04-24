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
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Carte avec shape.png comme fond */}
        <div className="relative rounded-3xl overflow-hidden min-h-[200px] flex items-center justify-center">

          {/* Fond : shape (dégradé bleu → vert, bord bas courbe) */}
          <Image
            src="/images/shape.png"
            alt=""
            fill
            className="object-fill"
            aria-hidden
          />

          {/* Pattern texture blanche par-dessus */}
          <Image
            src="/images/pattern-in-shape.png"
            alt=""
            fill
            className="object-fill opacity-30"
            aria-hidden
          />

          {/* Contenu */}
          <div className="relative z-10 flex flex-col items-center text-center gap-5 px-6 py-12 sm:px-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug max-w-lg">
              Abonnez-vous à notre newsletter
            </h2>
            <p className="text-white/80 text-sm max-w-md leading-relaxed">
              Recevez en avant-première nos nouvelles formations, actualités
              et conseils directement dans votre boîte mail.
            </p>

            {sent ? (
              <p className="text-white font-bold bg-white/20 rounded-full px-6 py-3">
                Merci, vous êtes bien inscrit(e) !
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
                  className="flex-1 rounded-full px-5 py-3 text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-accent min-w-0"
                />
                <Button
                  type="submit"
                  size="md"
                  className="shrink-0 bg-white! text-primary! hover:bg-white/90! font-bold"
                >
                  S&apos;abonner
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
