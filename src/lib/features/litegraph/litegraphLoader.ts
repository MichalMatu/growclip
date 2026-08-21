import liteGraphUrl from './vendor/litegraph.js?url';

type LiteGraphWindow = Window & {
	LiteGraph?: unknown;
	LGraph?: unknown;
	LGraphCanvas?: unknown;
};

let loadPromise: Promise<void> | null = null;

function runtimeAvailable(win: LiteGraphWindow): boolean {
	return Boolean(win.LiteGraph && win.LGraph && win.LGraphCanvas);
}

export function loadLiteGraphClassic(): Promise<void> {
	if (typeof window === 'undefined') {
		return Promise.reject(new Error('LiteGraph can only be loaded in the browser'));
	}

	const win = window as LiteGraphWindow;
	if (runtimeAvailable(win)) {
		return Promise.resolve();
	}

	if (loadPromise) {
		return loadPromise;
	}

	loadPromise = new Promise<void>((resolve, reject) => {
		const existing = document.querySelector<HTMLScriptElement>('script[data-growclip-litegraph]');
		const script = existing ?? document.createElement('script');

		const finish = () => {
			if (runtimeAvailable(win)) {
				resolve();
				return;
			}
			reject(new Error('LiteGraph script loaded, but the browser runtime was not exposed'));
		};

		const fail = () => {
			reject(new Error('Failed to load the LiteGraph browser library'));
		};

		script.addEventListener('load', finish, { once: true });
		script.addEventListener('error', fail, { once: true });

		if (!existing) {
			script.src = liteGraphUrl;
			script.async = true;
			script.dataset.growclipLitegraph = 'true';
			document.head.appendChild(script);
		} else if (runtimeAvailable(win)) {
			finish();
		}
	}).catch((error) => {
		loadPromise = null;
		throw error;
	});

	return loadPromise;
}
