import { Router } from "express";
import {
  getMascotas,
  addMascota,
  updateMascota,
  deleteMascota,
  getMascotaById
} from "../controllers/mascotas.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getMascotas);
router.get("/:id", getMascotaById);

router.post("/", addMascota);

router.put("/:id", updateMascota);

router.delete("/:id", deleteMascota);

export default router;
