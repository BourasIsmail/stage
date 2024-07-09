import { Province } from "./Province";

export type Stagiaire = {
  id?: number | null;
  // Personnel
  nomAr?: string | null;
  prenomAr?: string | null;
  nomFr?: string | null;
  prenomFr?: string | null;
  sexe?: string | null;
  adresse?: string | null;
  dateNaissance?: string | null;
  situationFamilial?: string | null;
  cin?: string | null;
  email?: string | null;
  telephone?: string | null;
  // Academic
  nomUniversite?: string | null;
  niveauEtude?: string | null;
  specialite?: string | null;
  // Formation
  dureeStage?: number | null;
  dateDebut1?: string | null;
  dateDebut2?: string | null;
  dateDebut3?: string | null;
  dateFin1?: string | null;
  dateFin2?: string | null;
  dateFin3?: string | null;
  province1?: Province | null;
  province2?: Province | null;
  province3?: Province | null;
  demande?: File | null; // File
  fileNameDemande?: string | null;
  fileTypeDemande?: string | null;
};
