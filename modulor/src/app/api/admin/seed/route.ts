import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Admin-only seed endpoint
export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // Formation
    const { error: formError } = await supabase
      .from("formations")
      .insert({
        id: "a1b2c3d4-e5f6-4710-9010-b1c2d3e4f506",
        titre: "Contrôle Nourriture et Boisson",
        description: `Cette playlist regroupe une série de capsules pédagogiques consacrées au Contrôle Nourriture et Boisson (CNB) dans le secteur de la restauration.

L'objectif est de vous permettre de comprendre les principes fondamentaux du CNB, son rôle dans la gestion des établissements de restauration et son importance dans l'amélioration de la rentabilité, à travers la maîtrise des coûts, le contrôle des consommations et l'optimisation des pratiques professionnelles.

Ces capsules s'adressent principalement aux apprenants en formation professionnelle, aux étudiants, ainsi qu'aux professionnels souhaitant renforcer leurs connaissances en gestion restauration.

📩 Pour toute question ou échange pédagogique, vous pouvez me contacter à l'adresse suivante :
icholadaniel13@gmail.com`,
        domaine: "Gestion et Restauration",
        prix: 9800,
        image:
          "https://aridzamllujmpupcdwnw.supabase.co/storage/v1/object/public/formations/cnb/thumbnail.png",
        note: 4.8,
        duree: "64 min",
        actif: true,
        teacher_name: "Ichola Daniel",
        teacher_photo: null,
      })
      .select();

    if (formError && !formError.message.includes("duplicate")) {
      return NextResponse.json({ error: formError.message }, { status: 500 });
    }

    // Videos
    const videos = [
      {
        id: "b2c3d4e5-f6a7-4810-a1b2-c3d4e5f6a7b1",
        formation_id: "a1b2c3d4-e5f6-4710-9010-b1c2d3e4f506",
        module_index: 0,
        titre: "Introduction - Le rôle clé du CNB",
        description:
          "Découvrez les fondamentaux du Contrôle Nourriture et Boisson et son importance cruciale dans la gestion d'un établissement de restauration.",
        duration: 1511,
        file_url:
          "https://aridzamllujmpupcdwnw.supabase.co/storage/v1/object/public/videos/cnb/capsule-1-introduction.mp4",
        ordre: 0,
      },
      {
        id: "c3d4e5f6-a7b8-4910-b2c3-d4e5f6a7b8c2",
        formation_id: "a1b2c3d4-e5f6-4710-9010-b1c2d3e4f506",
        module_index: 1,
        titre: "Coûts de Production - Définition et types",
        description:
          "Comprenez les différents types de coûts de production et leur classification en restauration.",
        duration: 407,
        file_url:
          "https://aridzamllujmpupcdwnw.supabase.co/storage/v1/object/public/videos/cnb/capsule-2-couts-production.mp4",
        ordre: 0,
      },
      {
        id: "d4e5f6a7-b8c9-4a10-c3d4-e5f6a7b8c9d3",
        formation_id: "a1b2c3d4-e5f6-4710-9010-b1c2d3e4f506",
        module_index: 2,
        titre: "Coûts Directs - Explications détaillées",
        description:
          "Explorez en détail les coûts directs et apprenez à les identifier et calculer correctement.",
        duration: 1130,
        file_url:
          "https://aridzamllujmpupcdwnw.supabase.co/storage/v1/object/public/videos/cnb/capsule-3-couts-directs.mp4",
        ordre: 0,
      },
    ];

    const { error: vidError } = await supabase
      .from("videos")
      .insert(videos)
      .select();

    if (vidError && !vidError.message.includes("duplicate")) {
      return NextResponse.json({ error: vidError.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "CNB course seeded successfully",
      formation_id: "a1b2c3d4-e5f6-4710-9010-b1c2d3e4f506",
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
