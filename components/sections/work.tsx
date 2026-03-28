import { getExperience } from "@/lib/portfolio-config"
import { TechBadge } from "@/components/ui/tech-icon"

export function Work() {
  const experience = getExperience()
  const firstYear = experience[experience.length - 1]?.year || "2019"
  const currentYear = new Date().getFullYear()

  return (
    <section id="work" className="min-h-screen py-16 sm:py-32 opacity-0">
      <div className="space-y-12 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">Selected Work</h2>
          <div className="text-sm text-muted-foreground font-mono">
            {firstYear} — {currentYear}
          </div>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {experience.map((job) => (
            <div
              key={`${job.company}-${job.year}`}
              className="group grid sm:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
            >
              {/* On mobile: year is shown inline with role/company */}
              <div className="hidden sm:block sm:col-span-2">
                <div className="text-sm font-mono sm:text-2xl sm:font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                  {job.year}
                </div>
              </div>

              <div className="sm:col-span-7 space-y-3">
                <div>
                  <div className="flex items-baseline justify-between sm:block">
                    <h3 className="text-lg sm:text-xl font-medium">
                      {job.role}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground sm:hidden">
                      {job.year}
                    </span>
                  </div>
                  <div className="text-muted-foreground">{job.company}</div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg">
                  {job.description}
                </p>
              </div>

              <div className="sm:col-span-3 flex flex-wrap gap-2 sm:justify-end mt-2 sm:mt-0">
                {job.technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                  >
                    <TechBadge
                      name={tech.name}
                      iconType={tech.iconType}
                      iconSlug={tech.iconSlug}
                    />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
