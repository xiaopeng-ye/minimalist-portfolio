// Named imports for only the icons used in portfolio-config.
// Avoids bundling the entire simple-icons library (~3000 icons).
// When adding a new "simple" type icon to portfolio-config, add the import here too.
import {
  siD3,
  siFastapi,
  siLangchain,
  siRedux,
  siGooglesearchconsole,
} from "simple-icons"

export type SimpleIconData = { svg: string; hex: string }

export const SIMPLE_ICON_REGISTRY: Record<string, SimpleIconData | undefined> =
  {
    d3: siD3,
    fastapi: siFastapi,
    langchain: siLangchain,
    redux: siRedux,
    googlesearchconsole: siGooglesearchconsole,
  }
