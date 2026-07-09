import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, X } from 'lucide-react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function BlogManager() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState(null) // null = not editing, {} = new post, {id} = existing
  const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', coverImage: '', published: false })
  const [saving, setSaving] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }))
    }
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (editor && editingPost) {
      editor.commands.setContent(formData.content || '')
    }
  }, [editingPost, editor])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog-posts', { credentials: 'include' })
      const data = await res.json()
      setPosts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage || '',
      published: post.published
    })
    setEditingPost(post)
  }

  const handleAddNew = () => {
    setFormData({ title: '', excerpt: '', content: '', coverImage: '', published: false })
    setEditingPost({})
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    try {
      await fetch(`/api/admin/blog-posts/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      fetchPosts()
    } catch (err) {
      console.error(err)
    }
  }

  const handleSave = async () => {
    if (!formData.title || !formData.content) return alert('Title and content are required')
    setSaving(true)
    try {
      const isNew = !editingPost._id
      const url = isNew ? '/api/admin/blog-posts' : `/api/admin/blog-posts/${editingPost._id}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setEditingPost(null)
        fetchPosts()
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to save post')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Blog Posts</h1>
        <button onClick={handleAddNew} className="btn-primary flex items-center gap-2 py-2 px-4">
          <Plus className="w-5 h-5" /> New Post
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date Published</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map(post => (
                <tr key={post._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{post.title}</td>
                  <td className="px-6 py-4">
                    {post.published ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        <XCircle className="w-3.5 h-3.5" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(post)} className="text-blue-600 hover:text-blue-900 mr-4 font-medium">
                      <Edit2 className="w-4 h-4 inline-block" />
                    </button>
                    <button onClick={() => handleDelete(post._id)} className="text-red-600 hover:text-red-900 font-medium">
                      <Trash2 className="w-4 h-4 inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">No blog posts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col my-8">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                {editingPost._id ? 'Edit Post' : 'New Post'}
              </h2>
              <button onClick={() => setEditingPost(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
                <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary-500">
                  {/* Basic Toolbar */}
                  <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
                    <button onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 rounded text-sm font-bold ${editor?.isActive('bold') ? 'bg-slate-200' : 'hover:bg-slate-200'}`}>B</button>
                    <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 rounded text-sm italic ${editor?.isActive('italic') ? 'bg-slate-200' : 'hover:bg-slate-200'}`}>I</button>
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 rounded text-sm font-medium ${editor?.isActive('heading', { level: 2 }) ? 'bg-slate-200' : 'hover:bg-slate-200'}`}>H2</button>
                    <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1 rounded text-sm font-medium ${editor?.isActive('bulletList') ? 'bg-slate-200' : 'hover:bg-slate-200'}`}>List</button>
                  </div>
                  <EditorContent editor={editor} className="p-4 min-h-[300px] prose max-w-none focus:outline-none" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="published" className="text-sm font-medium text-slate-700">
                  Publish this post immediately
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
              <button onClick={() => setEditingPost(null)} className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="btn-primary py-2 px-6">
                {saving ? 'Saving...' : 'Save Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Basic styles for tiptap editor */}
      <style dangerouslySetInnerHTML={{__html: `
        .ProseMirror:focus { outline: none; }
        .ProseMirror p { margin-bottom: 1em; }
        .ProseMirror h2 { font-size: 1.5em; font-weight: bold; margin-top: 1em; margin-bottom: 0.5em; }
        .ProseMirror ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1em; }
      `}} />
    </div>
  )
}
