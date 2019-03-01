import { Professional } from "../../home/models/professional";

/* Expedient */
export class Expedient {
  id: string;                 // ID del Expediente
  codi: string;               // Codigo Expediente
  dataCreacio: number;        // Fecha de creación
  dataValidacio: number;      // Fecha de validación
  totalFamilia: number;       // Nº Nucleo Familiar
  persona: Persona[];         // Nucleo Familiar
  estat: Estado;              // Estado
  professional: Professional; // Profesional
  diagnostic: Diagnosis[];    // Diagnostico
  observacions: string;       // Observaciones
}

/* Diagnosis */
export class Diagnosis {
  id: number;                   // ID Diagnostico
  data: number;                 // Fecha de creación
  estat: Estado;                // Estado
  ambit: Ambit;                 // Ambit
  observacions: string;         // Observaciones
  professional: Professional;   // Profesional
  valoracio: Valoracio;         // Valoración
  versioModel: Model;           // Versión del Modelo
}

/* Person */
export class Persona {
  id: string;                 // ID Persona
  sexe: string;               // Sexo/Género
  dataNaixement: string;      // Fecha de nacimiento
  tipusPersona: TipusPersona; // Tipo de Persona
  dataAlta: number;           // Fecha de Alta
  dataBaixa: number;          // Fecha de Baja
  referencia: boolean;        // Es persona de referencia
}

/* Person Type */
export class TipusPersona {
  id: number;               // ID TipusPersona
  descripcio: string;       // Descripción
}

/* Estado */
export class Estado {
  id: number;               // ID Estado
  descripcio: string;       // Descripción
}

/* Model */
export class Model {
  id: number;                // ID Model
  versio: string;            // Versión
  data: number;              // Fecha
  preguntaEconomica: number; // Pregunta Economica
}

/* Ambit */
export class Ambit {
  id: number;
  descripcio: string;
  contextualitzacio: Contextualitzacio;
  entorn: Entorn;
  ambit: AmbitObs;
  observacions: string;
  factors_contetxt: FactorsCcontext;
  risc: number;
  valAltrisc: number;
  valRisc: number;
  valVulnerabilitat: number ;
  vulnerabilitat: number;
}

/* Ambit */
export class AmbitObs {
  id: number;
  descripcio: string;
}

/* Entorn */
export class Entorn {
  id: number;
  descripcio: string;
  pregunta: Preguntas;
}

/* Valoracio */
export class Valoracio {
  data: string;
  evaluacions: Evaluacions = new Evaluacions();
  id: number;
  factors: number;
  total: number;
}

/* Evaluacions */
export class Evaluacions {
  ambit: Ambit;
  id: number;
  justificacion: string;
  risc: Risc;
  riscProfesional: Risc = new Risc();
}

/* Contextualizacion */
export class Contextualitzacio {
  id: number;                 // ID Contextualización
  factor: Factor;
  membreUnic: boolean;
  mesUc: boolean;
  persona: Persona;
}

/* Factor */
export class Factor {
  id: number;
  descripcio: string;
}

/* Preguntes */
export class Preguntas {
  id: number;                           // ID Preguntas
  definicio: string;
  altRisc: number;
  unitatFamiliar: boolean;
  risc: Risc;
  factor: Factor;
  persona: Persona;
  selectors: Selectors;
  social: string;
  vulnerabilitat: number;
}

/* Selectors */
export class Selectors {
  id: number;
  evidencia: string;
  frequencia: SelectorFrequencia;
  gravetat: Gravetat;
}

/* Selector Frequencia */
export class SelectorFrequencia {
  evidencia: string;
  frequencia: Frequencia;
  id: number;
  risc: Risc;
}

/* Factors de Context */
export class FactorsCcontext {
  descripcio: string;
  fc1m: number;
  fctots: number;
  gravetat: Gravetat;
  id: number;
  infants: boolean;
}

/* Gravetat */
export class Gravetat {
  id: number;                 // ID TipusPersona
  descripcio: string;         // Descripción
  value: number;              // Valor
}

/* Frequencia */
export class Frequencia {
  id: number;                 // ID TipusPersona
  descripcio: string;         // Descripción
  value: number;              // Valor
}

/* Risc */
export class Risc {
  id: number;                 // ID TipusPersona
  descripcio: string;         // Descripción
  value: number;              // Valor
}
