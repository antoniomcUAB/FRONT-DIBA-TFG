

/* Diagnosis */
export class Diagnosis {
  id: number;                           // ID Diagnostico
  data: number;                         // Fecha de creación
  observacions: string;                 // Observaciones
  estat: Estado;                        // Estado
  versioModel: Model;                   // Versión del Modelo
  contextualitzacio: Contextualitzacio; // Contextualización
  valoracio: Valoracio;                 // Valoración
  preguntes: Preguntes [] = [];                 // Preguntas
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
  id: number;                 // ID TipusPersona
  descripcio: string;         // Descripción
}

/* Estado */
export class Estado {
  id: number;                 // ID Estado
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
  factor: Factor;
  membreUnic: boolean;
  mesUc: boolean;
  persona: Persona;
}


/* Preguntes */
export class Preguntes {
  constructor(social: string , id: number) {
    this.situacioSocial.social = social;
    this.situacioSocial.id = id;
  }
  id: number; // ID Preguntas
  factorEconomic: FactorEconomic;
  entorn: Entorn;
  frequencia: Frequencia = new Frequencia();
  gravetat: Gravetat = new Gravetat();
  persona: Persona [] = [];
  risc: Risc;
  factor: Factor = new Factor();
  situacioSocial: SituacionSocial = new SituacionSocial();
  unitatFamiliar: boolean;
}

export class Valoracio {
  data: string;
  evaluacions: Evaluacions [] = [];
  id: number;
  factors: number;
  total: number;
}

export class Evaluacions {
  ambit: Ambit;
  id: number;
  risc: Risc;
  riscProfesional: Risc;
}



export class Factor {
  descripcio: string;
  fc1m: number;
  fctots: number;
  gravetat: Gravetat;
  id: number;
  infants: boolean;
  ambit:Ambit;
}
export class Ambit {
  id:number;
  descripcio:string;
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

export class FrequenciaResp {
  id: number;                 // ID TipusPersona
  evidencia: string;         // Descripción
  frequencia: Frequencia;
  risc: Risc;
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
export class Entorn {
  id: number;                 // ID TipusPersona
  descripcio: string;
}

export class Items {
  id: number;                 // ID TipusPersona
  frequencia: FrequenciaResp;
  evidencia: string;
  gravetat: Gravetat;
}

