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
  filiere: string;
  specialite?: string;
  theme?: string;
  prix: number;
  note: number;
  nbAvis: number;
  image: string;
  formateur: string;
  duree?: string;
  niveau?: string;
  createdAt: string;
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
