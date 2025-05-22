export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.s5OBpNzg.js",app:"_app/immutable/entry/app.D9vXo55x.js",imports:["_app/immutable/entry/start.s5OBpNzg.js","_app/immutable/chunks/DyIg2TUW.js","_app/immutable/chunks/CwI_dlXj.js","_app/immutable/chunks/B6YrKGiG.js","_app/immutable/entry/app.D9vXo55x.js","_app/immutable/chunks/CwI_dlXj.js","_app/immutable/chunks/CH2YOhPB.js","_app/immutable/chunks/ZHYhN_je.js","_app/immutable/chunks/B6YrKGiG.js","_app/immutable/chunks/BBzHVVsp.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/flashcards",
				pattern: /^\/flashcards\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";