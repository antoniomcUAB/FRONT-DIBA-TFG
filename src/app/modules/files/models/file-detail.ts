import { Valuations } from "../../diagnosis/models/diagnosis";

/* File Detail */
export interface FileDetail {
  id: string;               // Nº Expediente
  name: string;              // Nombre Expediente
  createDate: string;       // Fecha Creación
  updateDate: string;       // Fecha Actualización
  familyUnity: number;      // Unidad Familiar
  owner: string;            // Nombre Profesional
  date: string;             // Fecha
  refPeople: RefPeople[];   // Personas de Referencia
  observation: string;      // Observaciones
  valuations: Valuations[]; // Evaluaciones
}

export interface RefPeople {
  famType: string;          // Familiar (Tipo)
  date: string;             // Fecha de Nacimiento
}
