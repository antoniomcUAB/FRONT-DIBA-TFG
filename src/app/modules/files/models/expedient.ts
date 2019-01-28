import { Professional } from "../../home/models/professional";

/* Expedient */
export class Expedient {
  codi: string;               // Codigo Expediente
  nom: string;                // Nombre del Expediente
  dataCreacio: number;        // Fecha de creación
  dataValidacio: number;      // Fecha de validación
  estat: string;              // Estado
  profesional: Professional;  // Profesional
}

/* Diagnosis */
export class Diagnosis {
  id: number;
  data: number;
  estat: string;
  expedient: string;
  nom: string;
  observacions: string;
  contextualitzacio: Contextualitzacio;
  persona: Persona;
  preguntes: Preguntes;
  professional: Professional;
  totalFamilia: number;
  valoracio: Valoracio;
  versioModel: Model;

}
/* Person */
export class Persona {
  id: string;                 // ID Persona
  sexe: string;               // Sexo/Género
  dataNaixement: string;      // Fecha de nacimiento
  tipusPersona: TipusPersona; // Tipo de Persona
  dataAlta: number;
  dataBaixa: number;
  referencia: boolean;
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
  preguntaEconomica: number;  // Pregunta Economica
}
/* Contextualizacion */
export class Contextualitzacio {
  id: number;                 // ID Contextualización
}
/* Preguntes */
export class Preguntes {
  id: number;                 // ID Preguntas
}
export class Valoracio {
  id: number;                 // ID Valoración
}
