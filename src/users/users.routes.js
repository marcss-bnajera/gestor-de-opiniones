// Importamos las dependencias
import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "./users.controller.js";

const router = Router();

// Rutas GET
router.get("/", getUsers);

// Rutas GET BY ID
router.get("/:id", getUserById);

// Rutas POST
router.post("/", createUser);

// Rutas PUT
router.put("/:id", updateUser);

// Rutas DELETE
router.delete("/:id", deleteUser);

export default router;