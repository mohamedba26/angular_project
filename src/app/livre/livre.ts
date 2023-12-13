import { Auteur } from "../auteur/auteur";
import { Editeur } from "../editeur/editeur";
import { Specialite } from "../specialite/specialite";

export class Livre {
  editeurId: Editeur;
  auteursId: Auteur;
  auteurs:Auteur;
  _id: object;
  isbn: string;
  titre: string;
  annedition: number;
  prix: number;
  qtestock: number;
  couverture: string;
  speId: Specialite;
  specialite: Specialite;
  maised: Editeur;
  quantity: number;
  existingLivre: boolean;
  
}
