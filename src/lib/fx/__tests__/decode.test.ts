import { describe, test, expect } from 'vitest';
import { charStateAt, decodeDuration, splitText, SCRAMBLE } from '../decode';

const timing = { delay: 100, step: 40, window: 320 };

describe('charStateAt', () => {
  test('a character is pending until its turn comes round', () => {
    expect(charStateAt(0, 99, timing)).toBe('pending');
    expect(charStateAt(0, 100, timing)).toBe('scramble');

    // Character 3 starts at delay + 3*step = 220ms.
    expect(charStateAt(3, 219, timing)).toBe('pending');
    expect(charStateAt(3, 220, timing)).toBe('scramble');
  });

  test('it locks exactly one window after it starts', () => {
    expect(charStateAt(0, 419, timing)).toBe('scramble'); // 100 + 320 - 1
    expect(charStateAt(0, 420, timing)).toBe('locked');
  });

  test('the sweep runs left to right', () => {
    // At a moment when the first character has locked, a later one is still scrambling.
    const t = 460;
    expect(charStateAt(0, t, timing)).toBe('locked');
    expect(charStateAt(5, t, timing)).toBe('scramble');
    expect(charStateAt(20, t, timing)).toBe('pending');
  });
});

describe('decodeDuration', () => {
  test('covers the last character locking', () => {
    // 10 chars: last starts at 100 + 9*40 = 460, locks at 780.
    expect(decodeDuration(10, timing)).toBe(780);
    expect(charStateAt(9, decodeDuration(10, timing), timing)).toBe('locked');
  });

  test('handles a single character without going negative', () => {
    expect(decodeDuration(1, timing)).toBe(420);
  });
});

describe('splitText', () => {
  test('groups characters into words, keeping the spaces in the char list', () => {
    const { chars, words } = splitText('ab cd');
    expect(chars).toEqual(['a', 'b', ' ', 'c', 'd']);
    expect(words).toEqual([
      [0, 2],
      [3, 5],
    ]);
  });

  test('survives multiple and trailing spaces', () => {
    const { words } = splitText('a  b ');
    expect(words).toEqual([
      [0, 1],
      [3, 4],
    ]);
  });

  test('splits by code point, not by UTF-16 unit', () => {
    // split('') would tear a surrogate pair in half and corrupt the character.
    const { chars } = splitText('a😀b');
    expect(chars).toEqual(['a', '😀', 'b']);
  });

  test('the word list reconstructs the original text', () => {
    const text = "Hey, I'm Tom";
    const { chars, words } = splitText(text);
    expect(words.map(([a, b]) => chars.slice(a, b).join('')).join(' ')).toBe(text);
  });
});

describe('scramble alphabet', () => {
  test('is non-empty and single characters', () => {
    expect(SCRAMBLE.length).toBeGreaterThan(10);
    expect(SCRAMBLE.every((c) => [...c].length === 1)).toBe(true);
  });
});
