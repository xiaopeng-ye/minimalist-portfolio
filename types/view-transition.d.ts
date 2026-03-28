interface ViewTransition {
  finished: Promise<void>
  ready: Promise<void>
  skipTransition: () => void
  updateCallbackDone: Promise<void>
}

interface Document {
  startViewTransition?: (
    updateCallback: () => void | Promise<void>
  ) => ViewTransition
}
