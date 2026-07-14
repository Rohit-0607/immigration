import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, Sparkles } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/blog-posts')
      .then(r => { if (!r.ok) throw new Error('Failed to fetch'); return r.json() })
      .then(setPosts)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Helmet>
        <title>Immigration Blog | Future Point Immigration</title>
        <meta name="description" content="Stay updated with the latest visa policies, immigration news, and expert tips." />
        <meta property="og:title" content="Immigration Blog | Future Point Immigration" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero */}
      <section className="page-hero-dark py-24">
        <div className="glow-orb w-80 h-80 -top-20 -left-20" style={{ background: 'rgba(124,58,237,0.2)' }} />
        <div className="glow-orb w-64 h-64 bottom-0 right-0" style={{ background: 'rgba(6,182,212,0.15)' }} />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <div className="pill-label-dark mx-auto w-fit mb-6">
            <Sparkles className="w-4 h-4" /> Immigration Insights
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Latest <span className="gradient-text">News & Blog</span>
          </h1>
          <p className="text-slate-300 text-xl">
            Stay updated with the latest visa policies, immigration news, and expert tips to help you succeed in your global journey.
          </p>
        </div>
      </section>

      <div className="bg-slate-50 py-16 min-h-screen">
        <div className="container-custom">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-white border border-slate-100">
                  <div className="shimmer h-48" />
                  <div className="p-6 space-y-3">
                    <div className="shimmer h-4 rounded w-1/3" />
                    <div className="shimmer h-6 rounded" />
                    <div className="shimmer h-4 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">No posts yet</h3>
              <p className="text-slate-500">Check back soon for the latest immigration insights!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post._id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-violet-200 hover:shadow-xl transition-all duration-300 group flex flex-col">
                  <Link to={`/blog/${post.slug}`}
                    className="block overflow-hidden relative bg-slate-100" style={{ paddingTop: '58%' }}>
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center gradient-bg">
                        <span className="text-white/50 text-4xl font-black" style={{ fontFamily: 'Outfit, sans-serif' }}>FP</span>
                      </div>
                    )}
                  </Link>

                  <div className="p-7 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h2 className="text-lg font-black text-slate-900 mb-3 leading-snug group-hover:gradient-text transition-colors flex-shrink-0"
                      style={{ fontFamily: 'Outfit, sans-serif' }}>
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold mt-auto transition-all duration-200"
                      style={{ color: 'var(--clr-purple)' }}>
                      Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
