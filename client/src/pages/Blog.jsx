import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'

// Mock Data for Blogs
export const blogPosts = [
  {
    id: 1,
    slug: 'canada-express-entry-draw-2026',
    title: 'Canada Express Entry Draw Updates for 2026',
    excerpt: 'IRCC has announced new category-based draws focusing on healthcare, STEM, and trades. Find out if you qualify.',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&h=400&fit=crop',
    date: 'July 1, 2026',
    author: 'Immigration Team',
    content: 'Full content goes here. The Canadian government continues to prioritize targeted draws to address specific labor shortages in the country. In this comprehensive guide, we explore the new point system and how you can boost your Comprehensive Ranking System (CRS) score to secure an Invitation to Apply (ITA) in 2026...'
  },
  {
    id: 2,
    slug: 'australia-student-visa-changes',
    title: 'New Financial Requirements for Australian Student Visas',
    excerpt: 'The Australian government has increased the proof of funds required for international students. Here is what you need to know.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=400&fit=crop',
    date: 'June 28, 2026',
    author: 'Study Abroad Expert',
    content: 'Studying in Australia remains highly popular, but recent policy shifts mean prospective students must show stronger financial backing. The new minimum savings threshold ensures students can comfortably support themselves without relying entirely on part-time work...'
  },
  {
    id: 3,
    slug: 'uk-skilled-worker-visa-guide',
    title: 'How to Secure a UK Skilled Worker Visa',
    excerpt: 'A complete step-by-step guide to finding an approved sponsor and successfully navigating the UK immigration system.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop',
    date: 'June 15, 2026',
    author: 'Corporate Immigration',
    content: 'The UK Skilled Worker route requires a confirmed job offer from a Home Office approved sponsor. In this article, we break down the salary thresholds, English language requirements, and how to verify if your prospective employer holds the correct license...'
  }
]

export default function Blog() {
  return (
    <div className="bg-slate-50 py-16 md:py-24 min-h-screen">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Immigration Insights</h1>
          <p className="text-lg text-slate-600">
            Stay updated with the latest visa policies, immigration news, and expert tips to help you succeed in your global journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <Link to={`/blog/${post.slug}`} className="block overflow-hidden relative pt-[60%]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
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
      </div>
    </div>
  )
}
