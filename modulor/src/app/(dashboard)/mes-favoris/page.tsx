"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart, Loader2, ChevronRight, Star } from "lucide-react";
import { formatCFA } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";

interface Favorite {
  id: string;
  formation_id: string;
  created_at: string;
  formation: {
    id: string;
    titre: string;
    image: string;
    prix: number;
    note: number;
  };
}

export default function MesFavorisPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/favorites");
      const data = await res.json();
      setFavorites(data.favorites ?? []);
      setLoading(false);
    }
    load();
  }, []);

  async function removeFavorite(formationId: string) {
    await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formationId }),
    });
    setFavorites((prev) => prev.filter((f) => f.formation_id !== formationId));
  }

  return (
    <section className="bg-white min-h-[80vh] py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Mes favoris</h1>
          <p className="text-sm text-muted-foreground">
            {favorites.length === 0
              ? "Vous n'avez pas encore d'favoris"
              : `Vous avez ${favorites.length} formation(s) en favoris`}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="text-primary animate-spin" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center gap-5 py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Heart size={40} className="text-border" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground mb-2">Aucun favori pour le moment</p>
              <p className="text-sm text-muted-foreground mb-6">
                Découvrez les formations et ajoutez-les à vos favoris
              </p>
              <Link href="/formations">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                  Parcourir les formations <ChevronRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav) => {
              const f = fav.formation;
              return (
                <div key={fav.id} className="rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden bg-muted">
                    <Image src={f.image} alt={f.titre} fill className="object-cover hover:scale-110 transition-transform" />
                  </div>

                  {/* Contenu */}
                  <div className="p-4 flex flex-col gap-3">
                    <p className="text-xs font-bold text-primary">Formation</p>
                    <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2">{f.titre}</h3>

                    <div className="flex items-center justify-between">
                      <StarRating rating={f.note} size={12} />
                      <span className="text-xs text-muted-foreground">{f.note.toFixed(1)}</span>
                    </div>

                    <div className="border-t border-border pt-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-foreground">{formatCFA(f.prix)}</span>
                      <button onClick={() => removeFavorite(f.id)}
                        className="text-xs font-bold text-red-500 hover:text-red-600">
                        Retirer
                      </button>
                    </div>

                    <Link href={`/formations/${f.id}`} className="mt-2">
                      <span className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-white text-xs hover:opacity-90 transition-opacity cursor-pointer"
                        style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                        Voir la formation
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
