import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog-posts')
        if (!res.ok) throw new Error('Failed to fetch blog posts')
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <>
    <Helmet>
      <title>Immigration Blog | Future Point Immigration</title>
      <meta name="description" content="Stay updated with the latest visa policies, immigration news, and expert tips to help you succeed in your global journey." />
      <meta property="og:title" content="Immigration Blog | Future Point Immigration" />
      <meta property="og:description" content="Stay updated with the latest visa policies, immigration news, and expert tips to help you succeed in your global journey." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://futurepoint.com/og-image.jpg" />
    </Helmet>
    <div className="bg-slate-50 py-16 md:py-24 min-h-screen">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Immigration Insights</h1>
          <p className="text-lg text-slate-600">
            Stay updated with the latest visa policies, immigration news, and expert tips to help you succeed in your global journey.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-slate-500 py-12">Loading posts...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-slate-500 py-12">No blog posts found. Check back later!</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <Link to={`/blog/${post.slug}`} className="block overflow-hidden relative pt-[60%] bg-slate-200">
                  {post.coverImage ? (
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">No Image</div>
                  )}
                </Link>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> 
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 hover:text-primary-600 transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-slate-600 mb-6 line-clamp-3 flex-grow">{post.excerpt}</p>
                  
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800 mt-auto">
                    Read Article <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  )
}
