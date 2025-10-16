import * as mascotaModel from "../models/mascotas.model";

export const obtenerMascotas = async () => mascotaModel.listar();
export const obtenerMascotaPorId = async (id: number) => mascotaModel.buscarPorId(id);
export const crearMascota = async (data: any) => mascotaModel.agregar(data);
export const actualizarMascota = async (id: number, data: any) => mascotaModel.actualizar(id, data);
export const eliminarMascota = async (id: number) => mascotaModel.eliminar(id);
