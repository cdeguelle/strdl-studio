import { useEffect, RefObject } from 'react';

export function useCanvasSetup(editorAreaRef: RefObject<HTMLDivElement | null>) {
    // Ensure #test-canvas exists, is correctly sized, and stays at the top of body
    useEffect(() => {
        const pr = window.devicePixelRatio;
        const ensureCanvas = () => {
            let canvas = document.querySelector('#test-canvas') as HTMLCanvasElement | null;
            if (!canvas) {
                canvas = document.createElement('canvas');
                canvas.id = 'test-canvas';
                canvas.style.cssText =
                    'pointer-events:none;width:100%;height:100%;position:fixed;top:0;left:0;z-index:999';
                document.body.prepend(canvas);
            }
            if (canvas.width !== window.innerWidth * pr || canvas.height !== window.innerHeight * pr) {
                canvas.width = window.innerWidth * pr;
                canvas.height = window.innerHeight * pr;
            }
            if (document.body.firstChild !== canvas) document.body.prepend(canvas);
        };

        ensureCanvas();

        let resizeTimeout: ReturnType<typeof setTimeout>;
        const onResize = () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(ensureCanvas, 200); };
        window.addEventListener('resize', onResize);

        const onReplStart = () => ensureCanvas();
        document.addEventListener('start-repl', onReplStart);

        const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                for (const node of m.removedNodes) {
                    if (node instanceof HTMLCanvasElement && node.id === 'test-canvas') {
                        ensureCanvas();
                        return;
                    }
                }
            }
        });
        observer.observe(document.body, { childList: true });

        return () => {
            window.removeEventListener('resize', onResize);
            document.removeEventListener('start-repl', onReplStart);
            observer.disconnect();
            document.querySelector('#test-canvas')?.remove();
        };
    }, []);

    // Intercept #hydra-canvas added to document.body and move it into the editor area
    useEffect(() => {
        const attach = () => {
            const canvas = document.getElementById('hydra-canvas') as HTMLCanvasElement | null;
            if (canvas && canvas.parentElement === document.body && editorAreaRef.current) {
                editorAreaRef.current.appendChild(canvas);
                canvas.style.cssText =
                    'position:absolute;inset:0;z-index:2;pointer-events:none;width:100%;height:100%;mix-blend-mode:screen;opacity:0.75';
            }
        };
        const observer = new MutationObserver(attach);
        observer.observe(document.body, { childList: true });
        return () => observer.disconnect();
    }, [editorAreaRef]);
}
