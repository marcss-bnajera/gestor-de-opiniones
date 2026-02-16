'use strict';

import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

//Indices para optimizar la busqueda
publicationSchema.index({ title: 1 });

export default mongoose.model('Publication', publicationSchema);

