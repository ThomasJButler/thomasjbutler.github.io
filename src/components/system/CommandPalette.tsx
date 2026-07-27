import { useEffect, useMemo, useRef, useState } from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { filterCommands, type CommandContext } from '@/lib/commands';
import { cn } from '@/lib/utils';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ctx: CommandContext;
}

/**
 * The ⌘K palette.
 *
 * Built on the existing base-ui Dialog rather than hand-rolled, so the focus trap,
 * focus restore, aria-modal, scroll lock and Esc all come for free — a bare div
 * overlay (what the prototype uses) leaves the page behind it reachable by Tab and
 * by a screen reader's virtual cursor.
 *
 * The list uses the APG combobox+listbox pattern: focus stays in the input and the
 * active option is conveyed by aria-activedescendant. Options are <li>, not
 * <button> — focusable children inside a listbox trip axe's nested-interactive rule
 * and buy nothing, since we never want to Tab between them.
 */
export function CommandPalette({ open, onOpenChange, ctx }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo(() => filterCommands(query), [query]);

  // Any change to the query invalidates the old cursor position.
  useEffect(() => setSelected(0), [query]);

  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  // Keep the active option in view without smooth-scrolling the list around.
  useEffect(() => {
    const active = listRef.current?.children[selected] as HTMLElement | undefined;
    active?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  const run = (index: number) => {
    const command = commands[index];
    if (!command) return;
    onOpenChange(false);
    command.run(ctx);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => (commands.length ? (s + 1) % commands.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => (commands.length ? (s - 1 + commands.length) % commands.length : 0));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSelected(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSelected(Math.max(0, commands.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(selected);
    }
  };

  const activeId = commands[selected] ? `cmd-${commands[selected].id}` : undefined;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fx-pal-backdrop" />
        {/* initialFocus puts the caret straight in the input rather than on the
            dialog container, and does it without the prototype's setTimeout(30),
            which is flaky under StrictMode's double effect. */}
        <DialogPrimitive.Popup className="fx-pal" initialFocus={inputRef}>
          <DialogPrimitive.Title className="sr-only">Command palette</DialogPrimitive.Title>

          <div className="fx-pal__bar">
            <span className="fx-dots">
              <i className="r" />
              <i className="y" />
              <i className="g" />
            </span>
            <span className="fx-console__path">tom@matrix: palette</span>
          </div>

          <div className="fx-pal__inputrow">
            <span className="p" aria-hidden="true">
              &gt;
            </span>
            <input
              ref={inputRef}
              className="fx-pal__input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="type a command..."
              spellCheck={false}
              autoComplete="off"
              aria-label="Command"
              role="combobox"
              aria-expanded
              aria-controls="fx-pal-list"
              aria-autocomplete="list"
              aria-activedescendant={activeId}
            />
          </div>

          {commands.length > 0 ? (
            <ul id="fx-pal-list" ref={listRef} role="listbox" aria-label="Commands" className="fx-pal__list">
              {commands.map((command, i) => (
                <li
                  key={command.id}
                  id={`cmd-${command.id}`}
                  role="option"
                  aria-selected={i === selected}
                  className={cn('fx-pal__item', i === selected && 'is-selected')}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => run(i)}
                >
                  <span className="cara" aria-hidden="true">
                    {i === selected ? '▸' : ' '}
                  </span>
                  {command.dot && (
                    <span
                      className="pill"
                      aria-hidden="true"
                      style={{ background: command.dot, boxShadow: `0 0 8px ${command.dot}` }}
                    />
                  )}
                  <span className="lab">{command.label}</span>
                  <span className="typ">{command.type}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="fx-pal__empty">no match. there is no spoon.</p>
          )}

          <div className="fx-pal__hint">↑↓ navigate · ↵ run · esc close</div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
