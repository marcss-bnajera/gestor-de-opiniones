// Importamos las dependencias
import User from "./users.model.js";

// --- GET
export const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const filter = {};

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        }

        const skip = (options.page - 1) * options.limit;

        const users = await User.find(filter)
            .limit(options.limit)
            .skip(skip)
            .sort(options.sort);

        const total = await User.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                currentPage: options.page,
                totalPages: Math.ceil(total / options.limit),
                totalRecords: total,
                limit: options.limit,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: error.message
        });
    }
}

// --- GET BY ID ---
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: error.message
        });
    }
}

// --- POST
export const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = new User(userData);
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
}

// --- PUT
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;

        const user = await User.findByIdAndUpdate(id, userData, { new: true });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado para actualizar"
            });
        }

        res.status(200).json({
            success: true,
            message: "Usuario actualizado exitosamente",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el usuario",
            error: error.message
        });
    }
}

// --- DELETE
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado para eliminar"
            });
        }

        res.status(200).json({
            success: true,
            message: "Usuario eliminado exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: error.message
        });
    }
}