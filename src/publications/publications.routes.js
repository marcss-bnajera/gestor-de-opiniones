// Importamos las dependencias
import { Router } from "express";
import { getPublications, getPublicationById, createPublication, updatePublication, deletePublication } from "./publications.controller.js";

const router = Router();

// Rutas GET
router.get("/", getPublications);

// Rutas GET BY ID
router.get("/:id", getPublicationById);

// Rutas POST
router.post("/", createPublication);

// Rutas PUT
router.put("/:id", updatePublication);

// Rutas DELETE
router.delete("/:id", deletePublication);

export default router;