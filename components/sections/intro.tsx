import { getPersonalInfo, getSkills } from "@/lib/portfolio-config"
import { TechBadge } from "@/components/ui/tech-icon"
import StarOnGithub from "@/components/ui/button-github"

const HIGHLIGHT_WORDS = ["design", "technology", "user experience"]

// Pre-computed once at module level — bio text is static config data
const personal = getPersonalInfo()
const skills = getSkills()
const bioWords = personal.bio.split(" ").map((word, i) => {
  const isHighlight = HIGHLIGHT_WORDS.some((hw) =>
    word.toLowerCase().includes(hw.toLowerCase())
  )
  return isHighlight ? (
    <span key={i} className="text-foreground">
      {" "}
      {word}
    </span>
  ) : (
    <span key={i}> {word}</span>
  )
})

export function Intro() {
  return (
    <header
      id="intro"
      className="min-h-screen flex items-center animate-fade-in-up pt-16 md:pt-0"
    >
      <div className="grid md:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 w-full">
        <div className="md:col-span-3 space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-2">
            <div className="text-sm text-muted-foreground font-mono tracking-wider">
              PORTFOLIO / 2026
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
              {personal.firstName}
              <br />
              <span className="text-muted-foreground">{personal.lastName}</span>
            </h1>
          </div>

          <div className="space-y-6 max-w-md">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {bioWords}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full animate-pulse relative z-10"
                    style={{
                      boxShadow:
                        "0 0 10px #4ade80, 0 0 20px #4ade80, 0 0 30px #4ade80, 0 0 40px #22c55e",
                    }}
                  ></div>
                </div>
                {personal.availability}
              </div>
              <div>{personal.location}</div>
            </div>

            <div className="pt-4 flex items-center md:justify-start justify-center">
              <StarOnGithub href="https://github.com/xiaopeng-ye/minimalist-portfolio" />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 md:mt-0">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">
              CURRENTLY
            </div>
            <div className="space-y-2">
              <div className="text-foreground">
                {personal.currentRole.title}
              </div>
              <div className="text-muted-foreground">
                @ {personal.currentRole.company}
              </div>
              <div className="text-xs text-muted-foreground">
                {personal.currentRole.startYear} — Present
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                >
                  <TechBadge
                    name={skill.name}
                    iconType={skill.iconType}
                    iconSlug={skill.iconSlug}
                    loading="eager"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
