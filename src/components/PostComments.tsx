"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { PostComment } from "@/lib/posts";

type Props = {
  postId: string;
  initialComments: PostComment[];
};

const defaultAvatarUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYuxj4s7L6KfVLpdpRCT2OwwphbNJAEzLbh3yPOua0RA&s=10";
const visitorKey = "dallfi-comment-visitor";
const guestProfileKey = "dallfi-comment-guest";
const likesKey = "dallfi-comment-likes";

function formatDate(value: string) {
  try {
    const date = new Date(value);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    return `${day}/${month}/${date.getUTCFullYear()}`;
  } catch {
    return value;
  }
}

function hueFromSeed(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return [12, 32, 52, 92, 132, 168, 196, 212, 228, 258, 292, 328][hash % 12];
}

function getVisitorId() {
  try {
    const existing = localStorage.getItem(visitorKey);
    if (existing && /^[a-zA-Z0-9_-]{8,80}$/.test(existing)) return existing;
    const next = crypto.randomUUID().replace(/-/g, "");
    localStorage.setItem(visitorKey, next);
    return next;
  } catch {
    return `guest${Date.now().toString(36)}`;
  }
}

function readGuestProfile() {
  try {
    const raw = JSON.parse(localStorage.getItem(guestProfileKey) ?? "{}") as {
      name?: string;
      email?: string;
    };
    return {
      name: typeof raw.name === "string" ? raw.name : "",
      email: typeof raw.email === "string" ? raw.email : "",
    };
  } catch {
    return { name: "", email: "" };
  }
}

function writeGuestProfile(name: string, email: string) {
  try {
    localStorage.setItem(guestProfileKey, JSON.stringify({ name, email }));
  } catch {
    /* Ignore quota errors. */
  }
}

function readLocalLikes() {
  try {
    const raw = JSON.parse(localStorage.getItem(likesKey) ?? "{}") as Record<string, boolean>;
    return raw && typeof raw === "object" ? raw : {};
  } catch {
    return {};
  }
}

function writeLocalLikes(value: Record<string, boolean>) {
  try {
    localStorage.setItem(likesKey, JSON.stringify(value));
  } catch {
    /* Ignore quota errors. */
  }
}

type ExtendedComment = PostComment & {
  avatarUrl?: string;
  likeCount?: number;
};

export default function PostComments({ postId, initialComments }: Props) {
  const t = useTranslations("Blog");
  const [comments, setComments] = useState<ExtendedComment[]>(
    initialComments.map((c) => ({ ...c, likeCount: 0 }))
  );
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [liking, setLiking] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<ExtendedComment | null>(null);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const storageKey = `dallfi-local-comments-${postId}`;

  useEffect(() => {
    setLiked(readLocalLikes());
    const profile = readGuestProfile();
    if (profile.name) setAuthor(profile.name);
    if (profile.email) setEmail(profile.email);
    
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "[]") as ExtendedComment[];
      if (saved.length) {
        setComments((current) => [
          ...current,
          ...saved.filter((savedComment) => 
            !current.some((comment) => comment.id === savedComment.id)
          ),
        ]);
      }
    } catch {
      /* Ignore malformed local data. */
    }
  }, [storageKey]);

  function save(comment: ExtendedComment, local: boolean) {
    setComments((current) => [
      ...current,
      {
        ...comment,
        likeCount: comment.likeCount ?? 0,
        avatarUrl: comment.avatarUrl || defaultAvatarUrl,
      },
    ]);
    
    if (local) {
      try {
        const existing = JSON.parse(localStorage.getItem(storageKey) ?? "[]") as ExtendedComment[];
        localStorage.setItem(storageKey, JSON.stringify([...existing, comment]));
      } catch {
        /* The in-memory comment remains visible. */
      }
    }
    
    setContent("");
    setReplyingTo(null);
    setStatus(local ? "Saved locally" : t("commentSaved"));
    setTimeout(() => setStatus(""), 5000);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = author.replace(/\s+/g, " ").trim();
    const mail = email.replace(/\s+/g, " ").trim().toLowerCase();
    
    if (!name || name.length < 2) {
      setStatus("Enter your name (at least 2 characters).");
      return;
    }
    if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      setStatus("Enter a valid email address.");
      return;
    }
    if (!content.trim() || submitting) return;

    setSubmitting(true);
    setStatus(t("commentSending"));
    writeGuestProfile(name, mail);

    const parentId = replyingTo?.id;

    try {
      const response = await fetch(`/api/comments/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: name, email: mail, content, parentId }),
      });

      if (response.ok) {
        save(await response.json(), false);
      } else {
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        if (response.status === 400 || response.status === 429) {
          setStatus(result.error || t("commentError"));
        } else {
          save(
            {
              id: crypto.randomUUID(),
              author: name,
              content,
              parentId,
              createdAt: new Date().toISOString(),
              avatarUrl: defaultAvatarUrl,
              likeCount: 0,
            },
            true
          );
        }
      }
    } catch {
      setStatus(t("commentError"));
    }

    setSubmitting(false);
  }

  async function toggleLike(comment: ExtendedComment) {
    if (liking) return;
    setLiking(comment.id);
    
    const wasLiked = Boolean(liked[comment.id]);
    const previousCount = Math.max(0, comment.likeCount ?? 0);
    const nextLiked = !wasLiked;
    const nextCount = Math.max(0, previousCount + (nextLiked ? 1 : -1));

    setLiked((current) => {
      const next = { ...current, [comment.id]: nextLiked };
      writeLocalLikes(next);
      return next;
    });

    setComments((current) =>
      current.map((item) => (item.id === comment.id ? { ...item, likeCount: nextCount } : item))
    );

    try {
      const response = await fetch("/api/comments/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentId: comment.id,
          visitorId: getVisitorId(),
        }),
      });

      if (response.ok) {
        const result = (await response.json()) as { liked?: boolean; likeCount?: number };
        setLiked((current) => {
          const next = { ...current, [comment.id]: Boolean(result.liked) };
          writeLocalLikes(next);
          return next;
        });
        setComments((current) =>
          current.map((item) =>
            item.id === comment.id
              ? { ...item, likeCount: Math.max(0, Number(result.likeCount) || 0) }
              : item
          )
        );
      } else {
        if (response.status !== 503) {
          setLiked((current) => {
            const next = { ...current, [comment.id]: wasLiked };
            writeLocalLikes(next);
            return next;
          });
          setComments((current) =>
            current.map((item) => (item.id === comment.id ? { ...item, likeCount: previousCount } : item))
          );
        }
      }
    } catch {
      /* Local optimistic state already applied. */
    } finally {
      setLiking("");
    }
  }

  const roots = comments.filter((comment) => !comment.parentId);
  const replies = (id: string) => comments.filter((comment) => comment.parentId === id);

  const renderComment = (comment: ExtendedComment, reply = false) => {
    const isLiked = Boolean(liked[comment.id]);
    const count = Math.max(0, comment.likeCount ?? 0);
    const avatarUrl = comment.avatarUrl || defaultAvatarUrl;
    const usesDefault = !comment.avatarUrl || avatarUrl === defaultAvatarUrl;

    return (
      <article className={reply ? "comment-reply" : ""} key={comment.id} style={{ display: "flex", gap: "12px", paddingBottom: "1rem", borderBottom: reply ? "none" : "1px solid #f3f3f3" }}>
        <span
          className="comment-avatar"
          style={{
            width: "32px",
            height: "32px",
            flexShrink: 0,
            borderRadius: "50%",
            overflow: "hidden",
            ...(usesDefault ? {
              filter: "grayscale(100%) brightness(0.4) contrast(1.2) sepia(100%) hue-rotate(345deg) saturate(5)",
            } : {
              filter: "grayscale(50%) contrast(1.1)",
            })
          }}
          aria-hidden="true"
        >
          <Image src={avatarUrl} alt="" width={32} height={32} unoptimized />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div>
            <strong style={{ fontSize: "0.85rem", color: "#242424" }}>{comment.author}</strong>
            <time dateTime={comment.createdAt} style={{ marginLeft: "8px", fontSize: "0.75rem", color: "#999" }}>
              {formatDate(comment.createdAt)}
            </time>
          </div>
          <p style={{ margin: "0.35rem 0 0.5rem", color: "#444", fontSize: "0.95rem" }}>{comment.content}</p>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button
              type="button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                border: "none",
                background: "transparent",
                padding: "4px 8px",
                cursor: "pointer",
                fontSize: "0.75rem",
                color: isLiked ? "#fc0000" : "#666",
              }}
              disabled={liking === comment.id}
              onClick={() => void toggleLike(comment)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: "16px", height: "16px" }}>
                <path
                  d="M7 11v10H4.5A1.5 1.5 0 0 1 3 19.5v-6A1.5 1.5 0 0 1 4.5 12H7Zm0 0 3.2-6.4A2.2 2.2 0 0 1 12.2 3.5h.3A2.5 2.5 0 0 1 15 6v3.5h4.2a2.3 2.3 0 0 1 2.3 2.7l-1.1 7.2A2.5 2.5 0 0 1 17.9 22H7"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{count > 0 ? count : "Like"}</span>
            </button>
            <button
              type="button"
              style={{
                border: "none",
                background: "transparent",
                padding: "4px 8px",
                cursor: "pointer",
                fontSize: "0.75rem",
                color: "#666",
              }}
              onClick={() => setReplyingTo(comment)}
            >
              Reply
            </button>
          </div>
          {replies(comment.id).length > 0 && (
            <div style={{ marginTop: "1rem", paddingLeft: "1rem", borderLeft: "2px solid #f0f0f0" }}>
              {replies(comment.id).map((child) => renderComment(child, true))}
            </div>
          )}
        </div>
      </article>
    );
  };

  return (
    <section className="post-comments">
      <div className="post-comments-head">
        <h2>{t("comments")}</h2>
        <span>{comments.length}</span>
      </div>

      {comments.length === 0 ? (
        <p className="post-comments-empty">{t("commentsEmpty")}</p>
      ) : (
        <div style={{ display: "grid", gap: "0.85rem", marginTop: "1rem" }}>
          {roots.map((comment) => renderComment(comment))}
        </div>
      )}

      <form onSubmit={submit} className="post-comments-form" style={{ marginTop: "2rem" }}>
        {replyingTo && (
          <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "8px", padding: "8px", background: "#f9f9f9", borderRadius: "4px" }}>
            <span style={{ fontSize: "0.85rem", color: "#666" }}>Replying to <strong>{replyingTo.author}</strong></span>
            <button
              type="button"
              onClick={() => setReplyingTo(null)}
              style={{ marginLeft: "auto", border: "none", background: "transparent", cursor: "pointer", fontSize: "0.75rem", color: "#fc0000" }}
            >
              Cancel
            </button>
          </div>
        )}
        <label>
          <span>{t("commentName")}</span>
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            maxLength={80}
            required
            autoComplete="name"
          />
        </label>
        <label>
          <span>{t("commentEmail")}</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            maxLength={254}
            required
            autoComplete="email"
          />
        </label>
        <label className="is-full">
          <span>{t("commentBody")}</span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={3}
            maxLength={6000}
            required
          />
        </label>
        <div className="post-comments-actions">
          <button type="submit" disabled={submitting}>
            {submitting ? t("commentSending") : replyingTo ? "Reply" : t("commentSubmit")}
          </button>
          {status ? <p>{status}</p> : null}
        </div>
      </form>
    </section>
  );
}
