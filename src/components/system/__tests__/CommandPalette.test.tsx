import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CommandPalette } from '../CommandPalette';
import type { CommandContext } from '@/lib/commands';

expect.extend(toHaveNoViolations);

function makeCtx(): CommandContext {
  return {
    navigate: vi.fn(),
    toggleTheme: vi.fn(),
    toggleFx: vi.fn(),
    toggleMorph: vi.fn(),
    setAccent: vi.fn(),
    replayIntro: vi.fn(),
    showSpoon: vi.fn(),
    releaseRabbit: vi.fn(),
  };
}

function renderPalette(ctx = makeCtx(), onOpenChange = vi.fn()) {
  render(<CommandPalette open onOpenChange={onOpenChange} ctx={ctx} />);
  return { ctx, onOpenChange, user: userEvent.setup() };
}

const activeOption = () =>
  screen.getByRole('combobox').getAttribute('aria-activedescendant');

describe('CommandPalette', () => {
  beforeEach(() => vi.clearAllMocks());

  test('opens as a dialog with the caret in the input', async () => {
    renderPalette();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    // A dialog with no accessible name is an axe violation.
    expect(screen.getByRole('dialog')).toHaveAccessibleName(/command palette/i);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // base-ui moves focus in an effect, so wait rather than assert synchronously.
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveFocus());
  });

  test('arrow keys move the active option and wrap at both ends', async () => {
    const { user } = renderPalette();
    const options = screen.getAllByRole('option');

    expect(activeOption()).toBe('cmd-home');

    await user.keyboard('{ArrowDown}');
    // The palette follows the header's order.
    expect(activeOption()).toBe('cmd-projects');

    // Up from the first entry wraps to the last.
    await user.keyboard('{ArrowUp}{ArrowUp}');
    expect(activeOption()).toBe(`cmd-${options[options.length - 1].id.replace('cmd-', '')}`);

    // And down again comes back round to the first.
    await user.keyboard('{ArrowDown}');
    expect(activeOption()).toBe('cmd-home');
  });

  test('Enter runs the active command and closes', async () => {
    const { ctx, onOpenChange, user } = renderPalette();

    await user.type(screen.getByRole('combobox'), 'contact');
    await user.keyboard('{Enter}');

    expect(ctx.navigate).toHaveBeenCalledWith('/contact');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test('the blue pill sets the accent', async () => {
    const { ctx, user } = renderPalette();

    await user.type(screen.getByRole('combobox'), 'blue pill');
    await user.keyboard('{Enter}');

    expect(ctx.setAccent).toHaveBeenCalledWith('#2563eb');
  });

  test('eggs stay out of the list until the query is deliberate', async () => {
    const { user } = renderPalette();
    const input = screen.getByRole('combobox');

    // Note: assert on the option, not on the text. The empty state reads
    // "no match. there is no spoon." — matching on text alone would find that.
    await user.type(input, 'sp');
    expect(screen.queryByRole('option', { name: /there is no spoon/i })).toBeNull();

    await user.type(input, 'o');
    expect(screen.getByRole('option', { name: /there is no spoon/i })).toBeInTheDocument();
  });

  test('a query that matches nothing shows the empty state', async () => {
    const { user } = renderPalette();

    await user.type(screen.getByRole('combobox'), 'zzzzz');

    expect(screen.queryByRole('listbox')).toBeNull();
    expect(screen.getByText('no match. there is no spoon.')).toBeInTheDocument();
  });

  test('exactly one option is selected at a time', async () => {
    const { user } = renderPalette();
    await user.keyboard('{ArrowDown}');

    const selected = screen.getAllByRole('option').filter(
      (o) => o.getAttribute('aria-selected') === 'true'
    );
    expect(selected).toHaveLength(1);
  });

  test('the open palette has no accessibility violations', async () => {
    renderPalette();
    // Scan the portalled dialog, not the (empty) render container.
    const dialog = screen.getByRole('dialog');

    const results = await axe(dialog, {
      // No layout in jsdom, so colour rules can only return "incomplete".
      rules: { 'color-contrast': { enabled: false } },
    });

    expect(results).toHaveNoViolations();
  });
});
