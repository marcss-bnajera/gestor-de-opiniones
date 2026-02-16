// Importamos las dependencias
import { Router } from "express";
import { getComments, createComment, updateComment, deleteComment } from "./comments.controller.js";

const router = Router();

// Rutas GET
router.get("/", getComments);

// Rutas POST
router.post("/", createComment);

// Rutas PUT
router.put("/:id", updateComment);

// Rutas DELETE
router.delete("/:id", deleteComment);

export default router;