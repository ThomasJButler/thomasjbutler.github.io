/**
 * Toast channel. Same shape as rain-bus: a module emitter so any module (command
 * palette, easter eggs, newsletter strip) can raise a toast without threading a
 * callback through the tree. <Toaster /> is the single subscriber.
 */
type ToastListener = (message: string) => void;

const listeners = new Set<ToastListener>();

export function onToast(listener: ToastListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function toast(message: string): void {
  listeners.forEach((listener) => listener(message));
}
