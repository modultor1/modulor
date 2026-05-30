export type UserRole = "etudiant" | "formateur" | "cadre" | "autre";

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
}

export interface Formation {
  id: string;
  titre: string;
  description: string;
  domaine: string;
  filiere?: string;
  specialite?: string;
  theme?: string;
  prix: number;
  note: number;
  nbAvis?: number;
  nb_avis?: number;
  image: string;
  formatore?: string;
  formateur?: string;
  teacher_name?: string;
  teacher_photo?: string;
  duree?: string;
  nivel?: string;
  niveau?: string;
  createdAt?: string;
  objectifs?: string[];
  programme?: Array<{ titre: string; desc: string }>;
  formateurs?: Array<{ nom: string; photo: string }>;
  avis?: Array<{ nom: string; role: string; photo: string; texte: string }>;
}

export interface CartItem {
  formation: Formation;
  quantite: number;
}

export interface Transaction {
  id: string;
  type: "achat" | "rechargement" | "remboursement";
  montant: number;
  description: string;
  date: string;
  statut: "success" | "pending" | "failed";
}

export interface Portefeuille {
  soldePrincipal: number;
  soldeRecu: number;
  soldeAchat: number;
  transactions: Transaction[];
}

export interface Progression {
  formationId: string;
  pourcentage: number;
  termine: boolean;
  dernierAcces: string;
}
