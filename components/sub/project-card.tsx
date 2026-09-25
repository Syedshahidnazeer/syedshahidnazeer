import Link from "next/link";
import type { CSSProperties } from "react";

import styles from "./project-card.module.css";

type ProjectCardProps = {
  title: string;
  category: string;
  tech: string;
  description: string;
  accent: string;
  link: string;
};

export const ProjectCard = ({
  title,
  category,
  tech,
  description,
  accent,
  link,
}: ProjectCardProps) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${title} — ${category}. View project`}
      className={styles.card}
      style={{ "--_accent": accent } as CSSProperties}
    >
      <div className={styles.notes} aria-hidden>
        ✦ ✦ ✦
      </div>
      <div className={styles.notes} aria-hidden>
        ✦ ✦
      </div>
      <div className={styles.notes} aria-hidden>
        ✦ ✦ ✦
      </div>

      <div className={styles.header}>
        {category}
        <div className={styles.symbol} aria-hidden>
          ✁
        </div>
      </div>

      <div className={styles.body}>
        <span className={styles.bodyTitle}>{title}</span>
        <span className={styles.bodyDescription}>{description}</span>
      </div>

      <div className={styles.footer}>
        <div className={styles.number}>
          Stack <span className={styles.bold}>{tech}</span>
        </div>
        <div className={styles.barcode} aria-hidden />
        <div className={styles.viewHint}>View project ↗</div>
      </div>

      <div className={`${styles.bg} ${styles.holographic}`} aria-hidden />
    </Link>
  );
};
