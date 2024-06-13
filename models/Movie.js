import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "por favor ingrese el título amigooo"]
    },

    plot: {
        type: String,
        required: [true, "por favor ingrese la descripcion de la peli amigooo"]
    }
})

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema)