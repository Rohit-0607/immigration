import mongoose from 'mongoose'

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  coverImage: { type: String },
  published: { type: Boolean, default: false },
  publishedAt: { type: Date }
}, { timestamps: true })

export default mongoose.model('BlogPost', blogPostSchema)
