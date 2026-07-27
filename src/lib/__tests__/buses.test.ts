import { describe, test, expect, vi } from 'vitest';
import { onBurst, burstRain } from '../rain-bus';
import { onToast, toast } from '../toast-bus';
import { filterCommands, COMMANDS } from '../commands';

describe('rain bus', () => {
  test('burstRain notifies every subscriber', () => {
    const a = vi.fn();
    const b = vi.fn();
    const offA = onBurst(a);
    const offB = onBurst(b);

    burstRain();

    expect(a).toHaveBeenCalledOnce();
    expect(b).toHaveBeenCalledOnce();
    offA();
    offB();
  });

  test('unsubscribing stops delivery', () => {
    const listener = vi.fn();
    const off = onBurst(listener);
    off();

    burstRain();

    expect(listener).not.toHaveBeenCalled();
  });
});

describe('toast bus', () => {
  test('delivers the message to subscribers', () => {
    const listener = vi.fn();
    const off = onToast(listener);

    toast('> copied');

    expect(listener).toHaveBeenCalledWith('> copied');
    off();
  });
});

describe('command filtering', () => {
  test('matches on the label', () => {
    const ids = filterCommands('project').map((c) => c.id);
    expect(ids).toContain('projects');
  });

  test('matches on keywords the label does not contain', () => {
    // "clipboard" appears only in the keywords of the copy-email command.
    const ids = filterCommands('clipboard').map((c) => c.id);
    expect(ids).toEqual(['email']);
  });

  test('eggs stay hidden until the query is at least three characters', () => {
    expect(filterCommands('sp').map((c) => c.id)).not.toContain('spoon');
    expect(filterCommands('spo').map((c) => c.id)).toContain('spoon');
    expect(filterCommands('rabbit').map((c) => c.id)).toContain('rabbit');
  });

  test('an empty query lists everything except the eggs', () => {
    const shown = filterCommands('');
    const hiddenCount = COMMANDS.filter((c) => c.hidden).length;

    expect(hiddenCount).toBeGreaterThan(0);
    expect(shown).toHaveLength(COMMANDS.length - hiddenCount);
    expect(shown.every((c) => !c.hidden)).toBe(true);
  });

  test('a query that matches nothing returns nothing', () => {
    expect(filterCommands('zzzzzz')).toEqual([]);
  });

  test('every command has a unique id', () => {
    const ids = COMMANDS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
