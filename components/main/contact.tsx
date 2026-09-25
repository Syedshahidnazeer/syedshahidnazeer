"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type FormEvent,
} from "react";

import BorderGlow from "@/components/ui/border-glow";
import { PROFILE } from "@/constants";

import styles from "./contact.module.css";

const TOPICS = [
  "Job opportunity",
  "Freelance project",
  "Collaboration",
  "Speaking / content",
  "Just saying hi",
] as const;

/** Card elements the focus highlight can snap to. */
type FieldRef = "email" | "name" | "topic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [focusStyle, setFocusStyle] = useState<CSSProperties | null>(null);
  const [touched, setTouched] = useState(false);

  // Card elements that the highlight measures against. Kept as separate refs
  // (rather than an object of refs) so nothing dereferences a ref during render.
  const emailRef = useRef<HTMLLabelElement | null>(null);
  const nameRef = useRef<HTMLLabelElement | null>(null);
  const topicRef = useRef<HTMLDivElement | null>(null);

  const isInputFocused = useRef(false);
  const sealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Don't leave a timer running if the section unmounts mid-animation.
  useEffect(
    () => () => {
      if (sealTimer.current) clearTimeout(sealTimer.current);
    },
    []
  );

  const focusInput = useCallback((e: FocusEvent<HTMLElement>) => {
    const key = e.currentTarget.dataset.ref as FieldRef | undefined;
    if (!key) return;

    const target =
      key === "email"
        ? emailRef.current
        : key === "name"
          ? nameRef.current
          : topicRef.current;
    if (!target) return;

    isInputFocused.current = true;
    setFocusStyle({
      width: `${target.offsetWidth}px`,
      height: `${target.offsetHeight}px`,
      transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`,
    });
  }, []);

  const blurInput = useCallback(() => {
    isInputFocused.current = false;
    setTimeout(() => {
      if (!isInputFocused.current) setFocusStyle(null);
    }, 300);
  }, []);

  const emailInvalid = touched && email.length > 0 && !EMAIL_PATTERN.test(email);
  const canSubmit =
    name.trim().length > 0 &&
    EMAIL_PATTERN.test(email) &&
    message.trim().length > 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit || status !== "idle") return;

    // No backend on this site — hand off to the visitor's mail client.
    const subject = encodeURIComponent(
      `${topic || "Portfolio enquiry"} — from ${name.trim()}`
    );
    const body = encodeURIComponent(
      `${message.trim()}\n\n—\n${name.trim()}\n${email.trim()}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setStatus("sent");
      return;
    }

    // Flip to the message side, then let the CSS seal it into the envelope.
    setStatus("sending");
    setFocusStyle(null);
    setIsCardFlipped(true);
    sealTimer.current = setTimeout(() => setStatus("sent"), 1700);
  };

  const handleReset = () => {
    if (sealTimer.current) clearTimeout(sealTimer.current);
    setStatus("idle");
    setIsCardFlipped(false);
    setTouched(false);
    // Keep name and email - it is the same person writing again.
    setMessage("");
    setTopic("");
  };

  /** Renders each character in its own span so it animates in as you type. */
  const chars = (value: string) =>
    Array.from(value).map((char, i) => (
      <span key={`${i}-${char}`} className={styles.charItem}>
        {char === " " ? " " : char}
      </span>
    ));

  return (
    <section id="contact" className={styles.section}>
      <h2 className={styles.title}>Let&apos;s build something</h2>
      <p className={styles.subtitle}>
        Open to roles, freelance work and collaborations in applied AI. Fill this
        in and it&apos;ll open in your mail app, already written.
      </p>

      <div
        className={`${styles.cardForm} ${
          status === "idle" ? "" : styles.sending
        }`}
      >
        {/* ---------- live preview card ---------- */}
        <div className={styles.cardList}>
          <div
            className={`${styles.cardItem} ${
              isCardFlipped ? styles.flipped : ""
            }`}
          >
            {/* front */}
            <div className={`${styles.cardItemSide} ${styles.front}`}>
              <div
                className={`${styles.cardItemFocus} ${
                  focusStyle ? styles.focusActive : ""
                }`}
                style={focusStyle ?? undefined}
                aria-hidden
              />
              <div className={styles.cardItemCover} aria-hidden />

              <div className={styles.cardItemWrapper}>
                <div className={styles.cardItemTop}>
                  <div className={styles.chip} aria-hidden />
                  <div className={styles.brand}>{PROFILE.title}</div>
                </div>

                <label
                  htmlFor="contactEmail"
                  className={`${styles.cardItemValue} ${
                    email ? "" : styles.placeholder
                  }`}
                  ref={emailRef}
                >
                  {email ? chars(email) : "your@email.com"}
                </label>

                <div className={styles.cardItemContent}>
                  <label
                    htmlFor="contactName"
                    className={styles.cardItemInfo}
                    ref={nameRef}
                  >
                    <div className={styles.cardItemLabel}>From</div>
                    <div
                      className={`${styles.cardItemName} ${
                        name ? "" : styles.placeholder
                      }`}
                    >
                      {name ? chars(name) : "Your Name"}
                    </div>
                  </label>

                  <div className={styles.cardItemTopic} ref={topicRef}>
                    <div className={styles.cardItemLabel}>About</div>
                    <div
                      className={`${styles.cardItemTopicValue} ${
                        topic ? "" : styles.placeholder
                      }`}
                    >
                      {topic || "Topic"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* back */}
            <div className={`${styles.cardItemSide} ${styles.back}`}>
              <div className={styles.cardItemCover} aria-hidden />
              <div className={styles.cardItemBand} aria-hidden />
              <div className={styles.cardItemMessage}>
                <div className={styles.cardItemMessageTitle}>Message</div>
                <div
                  className={`${styles.cardItemMessageBand} ${
                    message ? "" : styles.placeholder
                  }`}
                >
                  {message || "Your message will appear here…"}
                </div>
              </div>
            </div>
          </div>

          {/* envelope the card seals itself into */}
          <div
            className={`${styles.envelope} ${styles.envelopeBack}`}
            aria-hidden
          />
          <div
            className={`${styles.envelope} ${styles.envelopeFront}`}
            aria-hidden
          />
        </div>

        {/* ---------- the form ---------- */}
        <BorderGlow
          className={styles.glowWrap}
          backgroundColor="#0b0518"
          glowColor="260 90 70"
          colors={["#a855f7", "#7042f8", "#22d3ee"]}
          borderRadius={16}
          glowRadius={40}
          edgeSensitivity={26}
          coneSpread={25}
        >
        {status === "sent" ? (
          <div
            className={styles.confirmation}
            role="status"
            aria-live="polite"
          >
            <h3 className={styles.confirmationTitle}>Sealed and sent</h3>
            <p className={styles.confirmationBody}>
              Your message is waiting in your mail app, already written. If it
              didn&apos;t open, mail me directly at{" "}
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>.
            </p>
            <button
              type="button"
              className={styles.resetButton}
              onClick={handleReset}
            >
              Write another
            </button>
          </div>
        ) : (
        <form className={styles.cardFormInner} onSubmit={handleSubmit} noValidate>
          <div className={styles.formBody}>
          <div className={styles.cardInput}>
            <label htmlFor="contactName" className={styles.cardInputLabel}>
              Your name
            </label>
            <input
              id="contactName"
              type="text"
              className={styles.cardInputField}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={focusInput}
              onBlur={blurInput}
              data-ref="name"
              autoComplete="name"
              placeholder="Ada Lovelace"
            />
          </div>

          <div className={styles.cardInput}>
            <label htmlFor="contactEmail" className={styles.cardInputLabel}>
              Your email
            </label>
            <input
              id="contactEmail"
              type="email"
              className={`${styles.cardInputField} ${
                emailInvalid ? styles.invalid : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={focusInput}
              onBlur={blurInput}
              data-ref="email"
              autoComplete="email"
              placeholder="you@company.com"
              aria-invalid={emailInvalid}
              aria-describedby={emailInvalid ? "contactEmailError" : undefined}
            />
            {emailInvalid && (
              <p id="contactEmailError" className={styles.error}>
                That doesn&apos;t look like a valid email address.
              </p>
            )}
          </div>

          <div className={styles.cardInput}>
            <label htmlFor="contactTopic" className={styles.cardInputLabel}>
              What&apos;s it about?
            </label>
            <select
              id="contactTopic"
              className={`${styles.cardInputField} ${styles.select}`}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onFocus={focusInput}
              onBlur={blurInput}
              data-ref="topic"
            >
              <option value="">Choose a topic</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.cardInput}>
            <label htmlFor="contactMessage" className={styles.cardInputLabel}>
              Message
            </label>
            <textarea
              id="contactMessage"
              className={styles.cardInputField}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              // Focusing the message flips the card, the way CVV does on a real one.
              onFocus={() => {
                setFocusStyle(null);
                setIsCardFlipped(true);
              }}
              onBlur={() => setIsCardFlipped(false)}
              placeholder="Tell me what you're working on…"
              rows={5}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={!canSubmit || status !== "idle"}
          >
            Send message
          </button>

          <p className={styles.hint}>
            Opens in your mail app — nothing is sent from this page. Prefer
            direct?{" "}
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          </p>
          </div>
        </form>
        )}
        </BorderGlow>
      </div>
    </section>
  );
};
