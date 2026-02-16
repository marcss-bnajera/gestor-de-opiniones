// Importamos el modelo de Publicaciones
import Publication from "./publications.model.js";

// --- GET (Obtener todas con paginación)
export const getPublications = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const p = parseInt(page);
        const l = parseInt(limit);

        const publications = await Publication.find()
            .populate('user_id', 'name email')
            .limit(l)
            .skip((p - 1) * l)
            .sort({ createdAt: -1 });

        const total = await Publication.countDocuments();

        res.status(200).json({
            success: true,
            data: publications,
            pagination: {
                currentPage: p,
                totalPages: Math.ceil(total / l),
                totalRecords: total,
                limit: l
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error: error.message
        });
    }
}

// --- GET BY ID
export const getPublicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findById(id).populate('user_id', 'name email');

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }

        res.status(200).json({
            success: true,
            data: publication
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener la publicación",
            error: error.message
        });
    }
}

// --- POST (Crear Publicación)
export const createPublication = async (req, res) => {
    try {
        const { title, content, user_id } = req.body;

        const newPublication = new Publication({
            title,
            content,
            user_id
        });

        await newPublication.save();

        res.status(201).json({
            success: true,
            message: 'Publicación creada exitosamente',
            data: newPublication,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear la publicación',
            error: error.message
        });
    }
}

// --- PUT (Actualizar)
export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        updateData.updatedAt = Date.now();

        const publication = await Publication.findByIdAndUpdate(id, updateData, { new: true });

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada para actualizar"
            });
        }

        res.status(200).json({
            success: true,
            message: "Publicación actualizada exitosamente",
            data: publication
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar la publicación",
            error: error.message
        });
    }
}

// --- DELETE
export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;

        const publication = await Publication.findByIdAndDelete(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada para eliminar"
            });
        }

        res.status(200).json({
            success: true,
            message: "Publicación eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar la publicación",
            error: error.message
        });
    }
}