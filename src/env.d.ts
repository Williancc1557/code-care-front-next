/** Vite-style `import.meta.env` keys used by `src/config/env.ts`. */
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
