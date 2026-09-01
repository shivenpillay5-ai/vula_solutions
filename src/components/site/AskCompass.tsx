import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { analytics } from "@/lib/analytics";
import { Link } from "@tanstack/react-router";
import { BotMessageSquare, Compass, Loader2, SendHorizonal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  ASK_COMPASS_QUICK_REPLIES,
  getAskCompassReply,
  getAskCompassWelcome,
  type AskCompassReference,
} from "@/lib/ask-compass";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  suggestions?: string[];
  references?: AskCompassReference[];
};

function createMessage(
  role: ChatMessage["role"],
  content: string,
  suggestions?: string[],
  references?: AskCompassReference[],
) {
  return {
    id: `${role}-${crypto.randomUUID()}`,
    role,
    content,
    suggestions,
    references,
  } satisfies ChatMessage;
}

export function AskCompass() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasOpened, setHasOpened] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const latestMsgRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!open || hasOpened) return;

    const welcome = getAskCompassWelcome();
    setMessages([
      createMessage("assistant", welcome.content, welcome.suggestions, welcome.references),
    ]);
    setHasOpened(true);
  }, [hasOpened, open]);

  useEffect(() => {
    if (!open) return;

    const timeout = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    if (latestMsgRef.current) {
      const msgRect = latestMsgRef.current.getBoundingClientRect();
      const viewRect = viewport.getBoundingClientRect();
      const relativeTop = msgRect.top - viewRect.top + viewport.scrollTop;
      viewport.scrollTo({ top: relativeTop - 12, behavior: "smooth" });
    } else {
      viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
    }
  }, [loading, messages]);

  const quickReplies = useMemo(() => {
    const latestAssistant = [...messages].reverse().find((message) => message.role === "assistant");
    return latestAssistant?.suggestions?.length ? latestAssistant.suggestions : ASK_COMPASS_QUICK_REPLIES;
  }, [messages]);

  async function sendMessage(rawInput: string) {
    const content = rawInput.trim();
    if (!content || loading) return;

    setError(null);
    setDraft("");
    setMessages((current) => [...current, createMessage("user", content)]);
    setLoading(true);
    analytics.askCompassMessage();

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 420));
      const reply = getAskCompassReply(content);
      setMessages((current) => [
        ...current,
        createMessage("assistant", reply.content, reply.suggestions, reply.references),
      ]);
    } catch {
      setError("Ask Compass™ could not respond just now. Please try again, or start with Compass™.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(draft);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(draft);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="print:hidden fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-white/10 bg-navy-deep px-3 py-2 text-xs font-medium text-white shadow-[0_20px_40px_-20px_rgba(15,23,42,0.55)] transition duration-200 hover:-translate-y-0.5 hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6"
        aria-label="Open Ask Compass™ chat"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-electric text-white">
          <BotMessageSquare className="h-3.5 w-3.5" />
        </span>
        <span className="hidden sm:inline">Ask Compass™</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="left-3 right-3 top-auto bottom-3 w-auto max-w-none translate-x-0 translate-y-0 gap-0 overflow-hidden rounded-[1.6rem] border-border bg-background p-0 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.45)] sm:left-auto sm:right-6 sm:bottom-6 sm:w-[26rem] sm:max-w-[26rem] [&>button]:hidden">
          <DialogHeader className="border-b border-border bg-navy-deep px-5 py-4 text-left">
            <div className="flex items-center justify-between gap-3 pr-0">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-electric text-white shadow-[0_12px_32px_-16px_rgba(1,161,183,0.8)]">
                  <Compass className="h-5 w-5" />
                </span>
                <div>
                  <DialogTitle className="font-display text-[1.1rem] text-white">Ask Compass™</DialogTitle>
                  <DialogDescription className="mt-1 text-sm text-white/65">
                    Calm guidance for the right next step.
                  </DialogDescription>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/78 transition hover:bg-white/12 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                aria-label="Close Ask Compass chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </DialogHeader>

          <div className="flex h-[min(78vh,42rem)] flex-col sm:h-[38rem]">
            <div
              ref={viewportRef}
              className="flex-1 space-y-4 overflow-y-auto bg-[linear-gradient(180deg,rgba(248,250,252,0.92),rgba(255,255,255,1))] px-4 py-4 sm:px-5"
            >
              <div className="rounded-2xl border border-electric/15 bg-electric/5 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                <strong className="font-semibold text-foreground">Ask Compass™</strong> uses curated website guidance and stays within VULA's published positioning.
              </div>

              {messages.map((message, index) => (
                <div
                  key={message.id}
                  ref={index === messages.length - 1 ? latestMsgRef : null}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                      message.role === "user"
                        ? "rounded-br-md bg-navy-deep text-white"
                        : "rounded-bl-md border border-border bg-white text-foreground",
                    )}
                  >
                    <p>{message.content}</p>

                    {message.role === "assistant" && message.references?.length ? (
                      <div className="mt-3 space-y-2 border-t border-border/70 pt-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          Relevant reading
                        </p>
                        {message.references.map((reference) => (
                          <Link
                            key={reference.to}
                            to={reference.to}
                            className="block rounded-xl border border-border bg-secondary/40 px-3 py-2 transition hover:border-electric/25 hover:bg-accent/50"
                          >
                            <p className="text-xs font-semibold text-foreground">{reference.title}</p>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-electric">
                              {reference.sectionTitle}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              {reference.snippet}
                            </p>
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-border bg-white px-4 py-3 text-sm text-muted-foreground shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-electric" />
                    Thinking through that.
                  </div>
                </div>
              )}

              {!loading && quickReplies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => void sendMessage(reply)}
                      className="rounded-full border border-border bg-white px-3 py-2 text-left text-xs font-medium text-foreground transition hover:border-electric/30 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-border bg-background px-4 py-4 sm:px-5">
              {error && (
                <div className="mb-3 rounded-2xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <label htmlFor="ask-compass-input" className="sr-only">
                  Ask Compass a question
                </label>
                <Textarea
                  id="ask-compass-input"
                  ref={inputRef}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={3}
                  maxLength={500}
                  placeholder="Ask a practical question about where to start."
                  className="min-h-[88px] resize-none rounded-2xl border-border bg-secondary/40 px-4 py-3 text-sm"
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground">
                    Not sure? Compass™ is usually the right first step.
                  </p>
                  <Button
                    type="submit"
                    disabled={loading || draft.trim().length === 0}
                    className="h-10 rounded-full px-4"
                  >
                    Send
                    <SendHorizonal className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
                <span>Guidance only. No pricing or promises.</span>
                <Link to="/contact" onClick={() => analytics.bookCompassClick("ask_compass")} className="font-medium text-electric hover:underline">
                  Start with Compass™
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
