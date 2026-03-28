import { getThoughts } from "@/lib/portfolio-config"

// Static JSX hoisted outside component — never changes between renders
const ArrowIcon = (
  <svg
    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
)

export function Thoughts() {
  const thoughts = getThoughts()

  if (thoughts.length === 0) {
    return null
  }

  return (
    <section id="thoughts" className="min-h-screen py-16 sm:py-32 opacity-0">
      <div className="space-y-12 sm:space-y-16">
        <h2 className="text-3xl sm:text-4xl font-light">Recent Thoughts</h2>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {thoughts.map((post) => (
            <article
              key={post.title}
              className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-[border-color,box-shadow] duration-500 hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  <span>Read more</span>
                  {ArrowIcon}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
