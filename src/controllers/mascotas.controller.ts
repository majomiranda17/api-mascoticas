import { Request, Response, NextFunction } from "express";
import * as mascotaService from "../services/mascotas.service";

export const getMascotas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mascotas = await mascotaService.obtenerMascotas();
    res.json(mascotas);
  } catch (error) {
    next(error);
  }
};

export const getMascotaById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mascota = await mascotaService.obtenerMascotaPorId(Number(req.params.id));
    if (!mascota) return res.status(404).json({ error: "Mascota no encontrada" });
    res.json(mascota);
  } catch (error) {
    next(error);
  }
};

export const addMascota = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevaMascota = await mascotaService.crearMascota(req.body);
    res.status(201).json(nuevaMascota);
  } catch (error) {
    next(error);
  }
};

export const updateMascota = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mascotaActualizada = await mascotaService.actualizarMascota(Number(req.params.id), req.body);
    if (!mascotaActualizada) return res.status(404).json({ error: "Mascota no encontrada" });
    res.json(mascotaActualizada);
  } catch (error) {
    next(error);
  }
};

export const deleteMascota = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eliminada = await mascotaService.eliminarMascota(Number(req.params.id));
    if (!eliminada) return res.status(404).json({ error: "Mascota no encontrada" });
    res.json({ mensaje: "Mascota eliminada" });
  } catch (error) {
    next(error);
  }
};
