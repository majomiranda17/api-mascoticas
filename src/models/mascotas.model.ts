import fs from "fs/promises";
import path from "path";

const dataPath = path.join(__dirname, "../../data/mascotas.json");

type Mascota = {
  id: number;
  nombre: string;
  tipo: string;
  edad: number;
  createdAt: string;
};

export const listar = async (): Promise<Mascota[]> => {
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data);
};

export const agregar = async (nuevaMascota: Partial<Mascota>): Promise<Mascota> => {
  const mascotas = await listar();
  const nueva: Mascota = {
    id: mascotas.length ? Math.max(...mascotas.map(m => m.id)) + 1 : 1,
    nombre: nuevaMascota.nombre || "Sin nombre",
    tipo: nuevaMascota.tipo || "Desconocido",
    edad: nuevaMascota.edad || 0,
    createdAt: new Date().toISOString()
  };
  mascotas.push(nueva);
  await fs.writeFile(dataPath, JSON.stringify(mascotas, null, 2));
  return nueva;
};
export const buscarPorId = async (id: number) => {
  const mascotas = await listar();
  return mascotas.find(m => m.id === id);
};

export const actualizar = async (id: number, data: any) => {
  const mascotas = await listar();
  const index = mascotas.findIndex(m => m.id === id);
  if (index === -1) return null;
  mascotas[index] = { ...mascotas[index], ...data };
  await fs.writeFile(dataPath, JSON.stringify(mascotas, null, 2));
  return mascotas[index];
};

export const eliminar = async (id: number) => {
  const mascotas = await listar();
  const filtradas = mascotas.filter(m => m.id !== id);
  if (filtradas.length === mascotas.length) return false;
  await fs.writeFile(dataPath, JSON.stringify(filtradas, null, 2));
  return true;
};

export const buscarPorNombre = async (nombre: string) => {
  const mascotas = await listar();
  return mascotas.filter(m => m.nombre.toLowerCase() === nombre.toLowerCase());
};

