"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { NAV_LINKS, PROFILE, SOCIALS } from "@/constants";

type PaletteAction = {
  id: string;
  label: string;
  hint: string;
  keywords?: string;
  keepOpen?: boolean;
  perform: () => void;
};

function scrollToSection(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const github = SOCIALS.find((s) => s.name === "GitHub")?.link;
  const linkedin = SOCIALS.find((s) => s.name === "LinkedIn")?.link;

  const actions = useMemo<PaletteAction[]>(() => {
    const list: PaletteAction[] = NAV_LINKS.map((link) => ({
      id: `nav-${link.title}`,
      label: link.title,
      hint: "Jump to section",
      perform: () => scrollToSection(link.link),
    }));

    if (github) {
      list.push({
        id: "github",
        label: "Open GitHub",
        hint: "External link",
        perform: () => window.open(github, "_blank", "noopener,noreferrer"),
      });
    }
    if (linkedin) {
      list.push({
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "External link",
        perform: () => window.open(linkedin, "_blank", "noopener,noreferrer"),
      });
    }

    list.push({
      id: "email",
      label: copied ? "Copied!" : "Copy email address",
      hint: PROFILE.email,
      keywords: "contact mail",
      keepOpen: true,
      perform: () => {
        navigator.clipboard?.writeText(PROFILE.email).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      },
    });

    return list;
  }, [github, linkedin, copied]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) =>
      `${a.label} ${a.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [actions, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const runAction = useCallback(
    (action: PaletteAction) => {
      action.perform();
      if (!action.keepOpen) close();
    },
    [close]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (v) return false;
          setActiveIndex(0);
          return true;
        });
      } else if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [open]);

  const onQueryChange = (value: string) => {
    setQuery(value);
    setActiveIndex(0);
  };

  const onInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const action = filtered[activeIndex];
      if (action) runAction(action);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-lg rounded-2xl border border-[rgba(112,66,248,0.35)] bg-[#0b0518] shadow-[0_0_60px_rgba(112,66,248,0.25)] overflow-hidden"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[rgba(112,66,248,0.25)] px-4 py-3">
              <span className="text-[#a084ff] text-sm">⌘K</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Jump to a section, open a link…"
                className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none text-sm sm:text-base"
                aria-label="Search commands"
              />
              <kbd className="hidden sm:inline text-[11px] text-gray-500 border border-gray-700 rounded px-1.5 py-0.5">
                Esc
              </kbd>
            </div>

            <ul className="max-h-[50vh] overflow-y-auto py-2" role="listbox">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-gray-500">
                  Nothing matches &ldquo;{query}&rdquo;
                </li>
              )}
              {filtered.map((action, i) => (
                <li key={action.id} role="option" aria-selected={i === activeIndex}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => runAction(action)}
                    className={`w-full flex items-center justify-between gap-4 px-4 py-2.5 text-left text-sm transition-colors ${
                      i === activeIndex
                        ? "bg-[rgba(112,66,248,0.18)] text-white"
                        : "text-gray-300"
                    }`}
                  >
                    <span>{action.label}</span>
                    <span className="text-xs text-gray-500">{action.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
