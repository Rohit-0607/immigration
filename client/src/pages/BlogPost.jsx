import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog-posts/${slug}`)
        if (!res.ok) throw new Error('Post not found')
        const data = await res.json()
        setPost(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return <div className="container-custom py-32 text-center min-h-[60vh] text-slate-500">Loading...</div>
  }

  if (error || !post) {
    return (
      <div className="container-custom py-32 text-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Post Not Found</h1>
        <p className="text-slate-600 mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link to="/blog" className="btn-primary">Return to Blog</Link>
      </div>
    )
  }

  return (
    <>
    <Helmet>
      <title>{post.title} | Future Point Immigration</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:title" content={`${post.title} | Future Point Immigration`} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={post.coverImage || "https://futurepoint.com/og-image.jpg"} />
    </Helmet>
    <article className="bg-white py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-500 mb-10 pb-10 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
                <User className="w-5 h-5" />
              </div>
              <span className="font-medium text-slate-700">Immigration Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {post.coverImage && (
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-auto rounded-2xl mb-12 shadow-md object-cover max-h-[500px]"
            />
          )}

          <div 
            className="prose prose-lg prose-slate max-w-none prose-a:text-primary-600 hover:prose-a:text-primary-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 pt-10 border-t border-slate-100 bg-slate-50 p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Need help with your application?</h3>
            <p className="text-slate-600 mb-6">Our experts are here to evaluate your profile and guide you through the process.</p>
            <Link to="/book-consultation" className="btn-primary py-3 px-8">Book a Consultation</Link>
          </div>
        </div>
      </div>
    </article>
    </>
  )
}
