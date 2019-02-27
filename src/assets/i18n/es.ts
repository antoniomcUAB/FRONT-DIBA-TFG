export let TRANSLATION = {
  /* Title */
  'TITLE': {
    'home-h2': 'Llistat d\'expedients per municipi',
    'file-h2': 'Fitxa d\'expedient'
  },
  /*  Table */
  'TABLE': {
    'evaluate'             : 'Valoració',
    'files'                : 'Expedient',
    'createDate'           : 'Data creació',
    'owner'                : 'Professional',
    'updateDate'           : 'Data última valoració',
    'actions'              : 'Accions',
    'apl'                  : 'Aplica',
    'aplMas'               : 'Mes d\'una persona UC',
    'aplUna'               : '1 membre UC/si',
    'person'               : 'Persona',
    'severity'             : 'Gravetat',
    'frequency'            : 'Freqüència',
    'riskFactors'          : 'Factors de risc',
    'types'                : 'Tipus',
    'basicSocialSituation' : 'Situació social bàsica',
    'contextFactor'        : 'Factor de contextualització',
    'expedient'            : 'Estat expedient',
    'relation'             : 'Relació',
    'sex'                  : 'Sexe',
    'birthday'             : 'Data naixement',
    'register'             : 'Alta',
    'toRegister'           : 'Donar d\'alta',
    'dataRegister'         : 'Data d\'alta',
    'unsubscribe'          : 'Baixa',
    'toUnsubscribe'        : 'Donar de Baixa',
    'dataUnsubscribe'      : 'Data de baixa',
    'newMember'            : 'Afegir nou membre',
    'isPersonRef'          : 'És persona de referència',
    'newRef'           : 'Nova persona de referència'
  },
  'OBSTABLE': {
    'obs'           : 'Valoracions realitzades'
  },
  /*Tabs*/
  'TAB': {
    'tabAutonomia'  : 'Àmbit d\'autonomia'
  },
  'TABTITLE': {
    'titleAutonomia': 'Evidències i necessitats en l\'àmbit',
    'titleGloablitat': 'Factors de context en la'
  },
  /* Form */
  'FORM': {
    'fileId'        : 'Nº expedient',
    'fileName'      : 'Nom expedient',
    'fileOwner'     : 'Nom professional',
    'fileDate'      : 'Data',
    'fileUFamily'   : 'Unitat familiar',
    'filePeopleRef' : 'Persona de referència',
    'fileObs'       : 'Observacions i comentaris',
    'fileValuate'   : 'Valoracions realitzades',
    'son'           : 'Fill',
    'daughter'      : 'Filla',
    'father'        : 'Pare',
    'mother'        : 'Mare',
    'other'         : 'Altres',
    'save'          : 'Guardar',
    'newDiagnosis'  : 'Crear nou diagnòstic',
    'newFile'       : 'Crear nou expedient',
    'create'        : 'Crear',
    'cancel'        : 'Cancel·lar',
    'delete'        : 'Esborrar',
    'typeCode'      : 'Tipus de codificació ',
    'hestia'        : 'HÈSTIA',
    'otherType'     : 'Un altre tipus',
    'codeFile'      : 'Codi d\'expedient',
    'newRef'        : 'Qui serà la nova persona de refèrencia',
    'totalFamilia'  : 'Nombre de persones que componen la unitat familiar',
    'expExists'     : 'El codi de l\'expedient ja existeix',
    'validation'    : 'validar',
    'go-back'       : 'Tornar'
  },
  /* Search */
  'SEARCH': {
    'search'        : 'Cercar',
    'model'         : 'Consultar Model',
  },
  'ORDER_BY'        : 'Ordenar per',
  'TAGS'            : 'Etiquetes',
  /* Resumen */
  'RESUMEN' : {
    'pdf'           : 'Generar PDF'
  },
  /* Tabs */
  'TABS' : {
  },
  /* Observations */
  'OBS': {
    'resum'         : 'Resum valoració DSDIBA-',
    'ssocial'       : 'Situació social',
    'person'        : 'Persona',
    'type'          : 'Tipus',
    'risc'          : 'Risc',
    'no-social'     : 'No hi ha Situació social per',
    'risc-auto'     : 'Risc automàtic segons situació',
    'risc-pro'      : 'Risc segons professional',
    'factor'        : 'Factor Contextualització',
    'no-factor'     : 'No hi ha Factor de contextualització',
    'goback'        : 'Tornar'
  },

  'EMERGENTS':{
    'Ambitautonomia': 'Estat permanent en el que es troben les persones què per raons derivades de: l’edat, la malaltia o la discapacitat; i vinculades a la manca d’autonomia física, mental, intel·lectual o sensorial; requereixen de l’atenció d’altres persones o d’ajudes importants per a realitzar les activitats bàsiques de la vida diària o d’altres recursos instrumentals per a mantenir la seva autonomia personal',
    'Àmbit material i instrumental': 'Situacions de necessitat què tenen una expressió de tipus material, vinculades amb la subsistència i la capacitat de les persones per assolir-la de forma autònoma.',
    'Àmbit Relacional':'Situacions de necessitat derivades dels vincles socials, tant en l’entorn familiar com en el comunitari. En aquesta categoria s’hi inclouen totes les situacions de necessitat en les que el dèficit de relacions socials, la manca de relacions i/o l’existència d’unes relacions disfuncionals suposa un risc per al desenvolupament psicosocial de la persona',
    'Gravetat':'Són les evidències presents en cada situació social que ens permeten discriminar l’existència o no de risc i, en el seu cas, la seva gravetat, en base a les conseqüències o danys que provoca en la persona o unitat familiar.\n' +
      '\n' +
      'La gravetat es divideix en un màxim de quatre nivells: sense gravetat, gravetat baixa, moderada o alta. Aquest nivells es presenten ordenats de menor a major risc. Per a algunes situacions no es considera la gravetat baixa.',
   'Freqüència':'Són les evidències presents en cada situació social que ens permeten determinar la periodicitat amb què es donen els indicadors de risc, en termes de freqüència, en base a la seva repetició reiterada i a intervals de la situació.\n' +
     '\n' +
     'Tenint en compte la periodicitat o el nombre de repeticions amb què es presenta un indicador de risc, la freqüència es divideix en tres nivells: ocasional/puntual, freqüent/reiterada o continua.',
    'Factors de context':'Són aquelles característiques de l’individu i/o la seva unitat familiar i/o del seu entorn relacionades amb el cas i de la seva consciència, motivació i acceptació del problema/necessitat i de la intervenció, i que poden augmentar, inhibir, reduir o atenuar el risc en l’àmbit i/o en la situació social global. Poden ser, per tant, de risc o protecció. S’han definit un total de 41 factors de context.\n' +
      '\n' +
      'Una part d’ells són ponderats en funció del nombre de membres de la unitat familiar en els quals es dóna cada factor del context.'


  }

};
