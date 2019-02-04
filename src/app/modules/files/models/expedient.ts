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
    id: number;                           // ID Diagnostico
    data: number;                         // Fecha de creación
    observacions: string;                 // Observaciones
    estat: Estado;                        // Estado
    versioModel: Model;                   // Versión del Modelo
    contextualitzacio: Contextualitzacio; // Contextualización
    valoracio: Valoracio;                 // Valoración
    preguntes: Preguntes;                 // Preguntas
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
  id: number; // ID Preguntas
  factor: FactorValue;
  factorEconomic: FactorEconomic;
  frequencia: Frequencia;
  gravetat: Gravetat;
  persona: Persona;
  risc: Risc;
  situacioSocial: SituacionSocial;
  unitatFamiliar: boolean;
}

export class Valoracio {
  data: string;
  evaluacions: Evaluacions;
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

export class Ambit {
  Factors_Context: Factor;
  items: Items2; /*Hay que cambiarle el nombre*/
  descripcio: string;
  id: number;
  risc: number;
  valAltrisc: number;
  valRisc: number;
  valVulnerabilitat: number ;
  vulnerabilitat: number;
}

export class Items2 /*Hay que cambiarle el nombre*/ {
  descripcio: string;
  id: number;
  SituacionSocial: SituacionSocial;
}

export class FactorValue {
  id: number;                 // ID TipusPersona
  descripcio: string;         // Descripción
  value: number;
}

export class Factor {
    descripcio: string;
    fc1m: number;
    fctots: number;
    gravetat: Gravetat;
    id: number;
    infants: boolean;
}

export class Gravetat {
  id: number;                 // ID TipusPersona
  descripcio: string;         // Descripción
}

export class Frequencia {
  id: number;                 // ID TipusPersona
  descripcio: string;         // Descripción
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
  items: Items;
  value: number;
  altRisc: number;
  definicio: string;
  risc: number;
  social: string;
  vulnerabilitat: number;
}

export class Items {
  id: number;                 // ID TipusPersona
  frequencia: FrequenciaResp;
  evidencia: string;
  gravetat: Gravetat;
}
