/* Diagnosis */
import { Professional } from "../../home/models/professional";
import {Evaluacions} from "../../files";

/* Diagnosis */
export class Diagnosis {
  id: number;                   // ID Diagnostico
  data: number;                 // Fecha de creación
  ambit: Ambit[] = [];          // Ambit
  observacions: string;         // Observaciones
  professional: Professional;   // Profesional
  valoracio: Valoracio = new Valoracio();         // Valoración
}
export class Valoracio {
  data: string;
  confirmat: boolean;
  evaluacions: Evaluacions [] = [];
  id: number;
  factors: number;
  total: number;
}

/* Ambit */
export class Ambit {
  id: number;
  descripcio: string;
  ambit: DescripcioAmbit;
  contextualitzacio: Contextualitzacio [] = [];
  entorn: Entorn [] = [];
  risc: number;
  valAltrisc: number;
  valRisc: number;
  valVulnerabilitat: number ;
  vulnerabilitat: number;
}
export class DescripcioAmbit {
  id: number;
  descripcio: string;
}
/* Entorn */
export class Entorn {
  id: number;
  descripcio: string;
  pregunta: Preguntas [] = [];
}

/* Contextualizacion */
export class Contextualitzacio {
  constructor(descripcio: string , id: number) {
    this.factor.descripcio = descripcio;
    this.factor.id = id;
  }
  id: number;                 // ID Contextualización
  factor: Factor = new Factor();
  membreUnic: boolean;
  mesUc: boolean;
  persona: Persona;
}
/* Factor */
export class Factor {
  id: number;
  descripcio: string;
  gravetat:Gravetat;
}

export class Preguntas {
  constructor(social: string , id: number) {
    this.situacioSocial.social = social;
    this.situacioSocial.id = id;
  }
  id: number; // ID Preguntas
  factorEconomic: FactorEconomic;
  entorn: Entorn;
  frequencia: Frequencia;
  gravetat: Gravetat;
  persona: Persona ;
  risc: Risc;
  factor: Factor;
  situacioSocial: SituacionSocial = new SituacionSocial();
  unitatFamiliar: boolean;
}
/* Person */
export class Persona {
  id: string;                 // ID Persona
  sexe: string;               // Sexo/Género
  dataNaixement: string;      // Fecha de nacimiento
  tipusPersona: TipusPersona = new TipusPersona(); // Tipo de Persona
  dataAlta: number;           // Fecha de Alta
  dataBaixa: number;          // Fecha de Baja
  referencia: boolean;        // Es persona de referencia
}

/* Person Type */
export class TipusPersona {
  id: number;                 // ID TipusPersona
  descripcio: string;         // Descripción
}

export class Gravetat {
  id: number;                 // ID TipusPersona
  descripcio: string;         // Descripción
  value: number;
}

export class Frequencia {
  id: number;                 // ID TipusPersona
  descripcio: string;         // Descripción
  value: number;
}

export class FactorEconomic {
  id: number;                 // ID TipusPersona
  descripcio: string;         // Descripción
}

export class Risc {
  id: number;                 // ID TipusPersona
  descripcio: string;         // Descripción
  value: number;
}

export class SituacionSocial {
  id: number;                 // ID TipusPersona
  social: string;
}

