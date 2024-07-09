import { Province } from "./Province";
import { Stagiaire } from "./Stagiaire";

export type StagiaireConf = {
  id?: number;
  stagiaire?: Stagiaire;
  province?: Province;
  duree?: number;
  centre?: string;
  dateDebut?: string;
  dateFin?: string;
  rapport?: File;
  fileNameRapport?: string;
  fileTypeRapport?: string;
};
