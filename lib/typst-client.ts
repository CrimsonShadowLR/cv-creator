/**
 * Client-side Typst compiler using WebAssembly.
 * Do NOT import this from server components or API routes.
 *
 * First call downloads ~11 MB (WASM ~7.6 MB + Libertinus Serif fonts ~3 MB)
 * from CDN. The browser caches these automatically on subsequent loads.
 */

// Pinned to match the installed package version.
const COMPILER_WASM_URL =
  "https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler@0.7.0-rc2/pkg/typst_ts_web_compiler_bg.wasm";

type SnippetMod =
  typeof import("@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs");
type InitMod =
  typeof import("@myriaddreamin/typst.ts/dist/esm/options.init.mjs");

let _initPromise: Promise<SnippetMod["$typst"]> | null = null;

/**
 * Lazily loads and initialises the Typst WASM compiler.
 * Safe to call multiple times — returns the same promise after the first call.
 */
function loadTypst(): Promise<SnippetMod["$typst"]> {
  if (!_initPromise) {
    _initPromise = Promise.all([
      import("@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs") as Promise<SnippetMod>,
      import("@myriaddreamin/typst.ts/dist/esm/options.init.mjs") as Promise<InitMod>,
    ]).then(([snippet, init]) => {
      snippet.$typst.setCompilerInitOptions({
        // Tell the runtime where to fetch the WASM binary.
        getModule: () => COMPILER_WASM_URL,
        // Download Libertinus Serif and all standard Typst text fonts from the
        // official Typst assets CDN (jsdelivr). These are cached by the browser.
        beforeBuild: [init.preloadFontAssets()],
      });
      return snippet.$typst;
    });
  }
  return _initPromise;
}

/**
 * Compile a Typst source string to PDF bytes entirely in the browser.
 *
 * @throws if the compiler returns no output or if a network/init error occurs.
 */
export async function compileToPdf(
  typstSource: string,
): Promise<Uint8Array<ArrayBuffer>> {
  const $typst = await loadTypst();

  const result = await $typst.pdf({ mainContent: typstSource });

  if (!result) {
    throw new Error(
      "Typst compiler returned no output — check your template for syntax errors.",
    );
  }

  // The WASM runtime always uses a plain ArrayBuffer (not SharedArrayBuffer),
  // so this cast is safe and resolves the Blob constructor type mismatch.
  return result as Uint8Array<ArrayBuffer>;
}
