import posthog from "posthog-js"

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

if (projectToken && apiHost) {
  posthog.init(projectToken, {
    api_host: apiHost,
    capture_pageview: false,
    defaults: "2026-01-30",
    opt_out_capturing_by_default: true,
    persistence: "memory",
  })
}
