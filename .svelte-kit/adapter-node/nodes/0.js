

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.B-fngwq6.js","_app/immutable/chunks/ZHYhN_je.js","_app/immutable/chunks/CwI_dlXj.js"];
export const stylesheets = ["_app/immutable/assets/0.BRI-AF0Z.css"];
export const fonts = [];
