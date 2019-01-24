import { Professional } from "../../home/models/professional";

/* Expedient */
export class Expedient {
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
export class Persona {
  id: string;                 // ID Persona
  sexe: string;               // Sexo/Género
  dataNaixement: string;      // Fecha de nacimiento
  tipusPersona: TipusPersona; // Tipo de Persona
}

/* Person Type */
export class TipusPersona {
  id: number;                 // ID TipusPersona
  descripcio: string;         // Descripción
}

/* Model */
export class Model {
  id: number;                 // ID Model
  versio: string;             // Versión
  data: number;               // Fecha
}

/* Contextualizacion */
export class Diagnostic {
  id: number;                 // ID Diagnostic
}

/* Contextualizacion */
export class Contextualitzacio {
  id: number;                 // ID Contextualización
}
