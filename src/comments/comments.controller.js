import Comment from "./comments.model.js";

// --- GET (Obtener todos los comentarios con paginación)
export const getComments = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const p = parseInt(page);
        const l = parseInt(limit);

        const comments = await Comment.find()
            .populate('user_id', 'name')
            .populate('publication_id', 'title')
            .limit(l)
            .skip((p - 1) * l)
            .sort({ createdAt: -1 });

        const total = await Comment.countDocuments();

        res.status(200).json({
            success: true,
            data: comments,
            pagination: {
                currentPage: p,
                totalPages: Math.ceil(total / l),
                totalRecords: total
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los comentarios",
            error: error.message
        });
    }
}

// --- POST (Crear Comentario)
export const createComment = async (req, res) => {
    try {
        const { comment, user_id, publication_id } = req.body;

        const newComment = new Comment({
            comment,
            user_id,
            publication_id
        });

        await newComment.save();

        res.status(201).json({
            success: true,
            message: 'Comentario publicado con éxito',
            data: newComment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al publicar el comentario',
            error: error.message
        });
    }
}

// --- PUT (Actualizar Comentario)
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { comment, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json({
                success: false,
                message: "Comentario no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Comentario actualizado",
            data: updatedComment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar",
            error: error.message
        });
    }
}

// --- DELETE
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).json({
                success: false,
                message: "No se encontró el comentario"
            });
        }

        res.status(200).json({
            success: true,
            message: "Comentario eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar",
            error: error.message
        });
    }
}