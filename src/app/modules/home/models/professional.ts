/* Professional */
export interface Professional {
  id: number;             // ID Professional
  nom: string ;          // Name Professional
  cognom1: string;      // Lastname Proffesional
  cognom2: string;      // Lastname Proffesional
  municipi: Municipi;   // Municipal
  rol: Rol;
}
/* Municipal */
export interface Municipi {
  id: number;             // ID Municipal
  descripcio: string;    // Description Municipal
}
/* Role */
export interface Rol {
  id: number;             // ID Role
  descripcio: string;    // Description Role
}



