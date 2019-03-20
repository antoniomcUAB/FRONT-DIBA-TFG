/* Professional */
export class Professional {
  id: number;           // ID Professional
  nom: string ;         // Name Professional
  cognom1: string;      // Lastname Proffesional
  cognom2: string;      // Lastname Proffesional
  nomComplet: string;   // Full Name
  username: string;     // Username
  password: string;     // Pasword
  municipi: Municipi;   // Municipal
  rol: Rol;
}

  /* Municipal */
  export class Municipi {
  id: number;           // ID Municipal
  descripcio: string;   // Description Municipal
  }

  /* Role */
  export class Rol {
  id: number;           // ID Role
  descripcio: string;   // Description Role
  }
