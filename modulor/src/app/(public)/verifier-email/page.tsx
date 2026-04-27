import Link from "next/link";
import { Mail, CheckCircle } from "lucide-react";

export default function VerifierEmailPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email = searchParams.email ?? "votre adresse email";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full flex flex-col items-center gap-6 text-center">

        {/* Icône */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
            <Mail size={36} className="text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent flex items-center justify-center">
            <CheckCircle size={16} className="text-dark-green" />
          </div>
        </div>

        {/* Titre */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Vérifiez votre email
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Nous avons envoyé un lien de confirmation à{" "}
            <span className="font-bold text-primary">{email}</span>
          </p>
        </div>

        {/* Étapes */}
        <div className="w-full rounded-2xl border border-border bg-muted/30 p-5 flex flex-col gap-3 text-left">
          {[
            { step: "1", text: "Ouvrez votre boîte mail (Gmail, Yahoo, etc.)" },
            { step: "2", text: 'Cherchez un email de "Modulor" ou "noreply@supabase.io"' },
            { step: "3", text: "Cliquez sur le bouton « Confirmer mon adresse »" },
            { step: "4", text: "Vous serez automatiquement connecté à votre espace" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
                {item.step}
              </span>
              <p className="text-sm text-foreground">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Avertissement spam */}
        <p className="text-xs text-muted-foreground">
          Vous ne trouvez pas l&apos;email ? Vérifiez vos{" "}
          <strong>spams / courriers indésirables</strong>.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link href="/connexion" className="flex-1">
            <span className="w-full inline-flex justify-center items-center py-3 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity cursor-pointer"
              style={{ background: "linear-gradient(to right, #2934f2, #57f27d)" }}>
              Aller à la connexion
            </span>
          </Link>
          <Link href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="flex-1">
            <span className="w-full inline-flex justify-center items-center py-3 rounded-full font-bold text-primary text-sm border-2 border-primary hover:bg-primary/5 transition-colors cursor-pointer">
              Ouvrir Gmail
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
