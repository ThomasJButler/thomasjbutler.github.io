import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { throttle, debounce, rafThrottle } from '../throttle';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('limits function calls to specified interval', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    // Call multiple times rapidly
    throttled(1);
    throttled(2);
    throttled(3);
    throttled(4);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);

    // Advance time and call again
    vi.advanceTimersByTime(100);
    throttled(5);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith(5);
  });

  it('preserves this context', () => {
    const context = { value: 42 };
    const fn = vi.fn(function(this: any) {
      return this.value;
    });
    const throttled = throttle(fn, 100);

    throttled.call(context);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn.mock.instances[0]).toBe(context);
  });

  it('passes all arguments', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled('a', 'b', 'c');
    expect(fn).toHaveBeenCalledWith('a', 'b', 'c');
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('delays function execution', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('resets timer on subsequent calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced(1);
    vi.advanceTimersByTime(50);
    debounced(2);
    vi.advanceTimersByTime(50);
    debounced(3);
    
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
  });

  it('supports immediate execution', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100, true);

    debounced(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);

    debounced(2);
    expect(fn).toHaveBeenCalledTimes(1); // Still only called once

    vi.advanceTimersByTime(100);
    debounced(3);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith(3);
  });

  it('preserves this context', () => {
    const context = { value: 42 };
    const fn = vi.fn(function(this: any) {
      return this.value;
    });
    const debounced = debounce(fn, 100);

    debounced.call(context);
    vi.advanceTimersByTime(100);
    
    expect(fn.mock.instances[0]).toBe(context);
  });
});

describe('rafThrottle', () => {
  let rafSpy: any;
  let cancelRafSpy: any;
  let originalRaf: any;
  let originalCancelRaf: any;

  beforeEach(() => {
    originalRaf = global.requestAnimationFrame;
    originalCancelRaf = global.cancelAnimationFrame;
    
    let rafId = 0;
    const callbacks = new Map();

    global.requestAnimationFrame = vi.fn((callback) => {
      const id = ++rafId;
      callbacks.set(id, callback);
      setTimeout(() => {
        const cb = callbacks.get(id);
        if (cb) {
          callbacks.delete(id);
          cb(performance.now());
        }
      }, 16); // Simulate ~60fps
      return id;
    });

    global.cancelAnimationFrame = vi.fn((id) => {
      callbacks.delete(id);
    });

    rafSpy = global.requestAnimationFrame;
    cancelRafSpy = global.cancelAnimationFrame;
    vi.useFakeTimers();
  });

  afterEach(() => {
    global.requestAnimationFrame = originalRaf;
    global.cancelAnimationFrame = originalCancelRaf;
    vi.restoreAllMocks();
  });

  it('throttles function calls using RAF', () => {
    const fn = vi.fn();
    const throttled = rafThrottle(fn);

    throttled(1);
    throttled(2);
    throttled(3);

    expect(fn).not.toHaveBeenCalled();
    expect(rafSpy).toHaveBeenCalledTimes(1);

    // Simulate RAF callback
    vi.advanceTimersByTime(16);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3); // Uses last args
  });

  it('handles multiple RAF cycles', () => {
    const fn = vi.fn();
    const throttled = rafThrottle(fn);

    throttled(1);
    vi.advanceTimersByTime(16);
    expect(fn).toHaveBeenCalledWith(1);

    throttled(2);
    vi.advanceTimersByTime(16);
    expect(fn).toHaveBeenCalledWith(2);

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('provides cancel method', () => {
    const fn = vi.fn();
    const throttled = rafThrottle(fn) as any;

    throttled(1);
    expect(rafSpy).toHaveBeenCalled();

    throttled.cancel();
    expect(cancelRafSpy).toHaveBeenCalled();

    vi.advanceTimersByTime(16);
    expect(fn).not.toHaveBeenCalled();
  });

  it('preserves this context', () => {
    const context = { value: 42 };
    const fn = vi.fn(function(this: any) {
      return this.value;
    });
    const throttled = rafThrottle(fn);

    throttled.call(context, 'arg');
    vi.advanceTimersByTime(16);
    
    expect(fn.mock.instances[0]).toBe(context);
    expect(fn).toHaveBeenCalledWith('arg');
  });
});