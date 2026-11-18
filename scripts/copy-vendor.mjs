// Copies the browser libraries into public/vendor so the site loads nothing from CDNs.
import fs from 'node:fs';
const nm = new URL('../node_modules/', import.meta.url);
const out = new URL('../public/vendor/', import.meta.url);
const files = [
  ['onnxruntime-web/dist/ort.wasm.min.mjs', 'ort/ort.wasm.min.mjs'],
  ['onnxruntime-web/dist/ort-wasm-simd-threaded.mjs', 'ort/ort-wasm-simd-threaded.mjs'],
  ['onnxruntime-web/dist/ort-wasm-simd-threaded.wasm', 'ort/ort-wasm-simd-threaded.wasm'],
  ['onnxruntime-web/dist/ort.webgpu.min.mjs', 'ort/ort.webgpu.min.mjs'],
  ['onnxruntime-web/dist/ort-wasm-simd-threaded.jsep.mjs', 'ort/ort-wasm-simd-threaded.jsep.mjs'],
  ['onnxruntime-web/dist/ort-wasm-simd-threaded.jsep.wasm', 'ort/ort-wasm-simd-threaded.jsep.wasm'],
  ['onnxruntime-web/README.md', 'ort/README.md'], // MIT (see README)
  ['pdfjs-dist/build/pdf.min.mjs', 'pdfjs/pdf.min.mjs'],
  ['pdfjs-dist/build/pdf.worker.min.mjs', 'pdfjs/pdf.worker.min.mjs'],
  ['pdfjs-dist/LICENSE', 'pdfjs/LICENSE'],
  ['mammoth/mammoth.browser.min.js', 'mammoth/mammoth.browser.min.js'],
  ['mammoth/LICENSE', 'mammoth/LICENSE'],
];
for (const [src, dst] of files) {
  const d = new URL(dst, out);
  fs.mkdirSync(new URL('.', d), { recursive: true });
  fs.copyFileSync(new URL(src, nm), d);
  console.log(dst, fs.statSync(d).size);
}
