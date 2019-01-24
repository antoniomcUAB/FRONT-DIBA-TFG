import { Diagnostic } from "../../diagnosis/models/diagnosis";
import { Professional } from "../../home/models/professional";

/* Expedient */
export interface Expedient {
  id: string;                             // ID Expediente
  expedient: string;                      // Codigo Expediente
  nom: string;                            // Nombre del Expediente
  data: number;                           // Fecha de creación
  estat: string;                          // Estado
  totalFamilia: number;                   // Unidad Familiar Total
  persona: Persona[];                     // Unidad Familiar
  versioModel: Model[];                   // Modelo
  profesional: Professional;              // Profesional
  diagnostic: Diagnostic[];               // Evaluaciones
  contextualitzacio: Contextualitzacio[]; // Contextualizaciones
  valoracio: number;                      // Valoracion
  observacions: string;                   // Observaciones
}

/* Person */
export interface Persona {
  id: string;                 // ID Persona
  sexe: string;               // Sexo/Género
  dataNaixement: string;      // Fecha de nacimiento
  tipusPersona: TipusPersona; // Tipo de Persona
}

/* Person Type */
export interface TipusPersona {
  id: number;           // ID TipusPersona
  descripcio: string;   // Descripción
}

/* Model */
export interface Model {
  id: number;       // ID Model
  versio: string;   // Versión
  data: number;     // Fecha
}

/* Contextualizacion */
export interface Contextualitzacio {
  id: number;       // ID Contextualización
}
