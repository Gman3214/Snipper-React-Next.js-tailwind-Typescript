import mongoose from 'mongoose';

const bundleScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        description: {
            type: String,
        },
        ownerid: {
            type: String,
            require: true,
            immutable: true
        },
        snippetids: {
            type: [String]
        },
        likes: {
            type: Number,
            default: 0
        }
    }
)

export const Bundle = mongoose.models.Bundle || mongoose.model("Bundle", bundleScheme)
