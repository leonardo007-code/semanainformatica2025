export type Actividad = {
  titulo: string;
  hora: string;
};

export type Dia = {
  id: number;
  nombre: string;
  tema: string;
  fecha: string;
  hora: string;
  descripcion: string;
  actividades: Actividad[];
  destacado: boolean;
};
