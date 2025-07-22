import PostAdForm from "@/components/post-ad-form"

export default function PostAdPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Post Your Ad</h1>
        <p className="text-slate-600">Sell your vehicle quickly and easily</p>
      </div>
      <PostAdForm />
    </div>
  )
}
