"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, Save, Tag, Calendar, Search, Sparkles, Trash2, Eye } from "lucide-react";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { format, formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AUTOSAVE_DELAY = 2000;

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  mood?: number;
}

const sampleEntries: JournalEntry[] = [
  {
    id: "1",
    title: "A Moment of Clarity",
    content: "Today I had an unexpected moment of peace during my morning walk. The sun was warm, the air crisp, and for a few minutes, my mind was completely quiet.\n\n## What I noticed\n\nI've been carrying a lot of **tension** lately — work deadlines, social obligations, and the usual mental chatter. But this morning felt different.\n\n> \"The present moment is the only moment available to us, and it is the door to all moments.\" — Thich Nhat Hanh\n\n## Gratitude\n- The smell of fresh coffee\n- My morning walk\n- A kind message from an old friend",
    tags: ["mindfulness", "gratitude", "morning"],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    mood: 8,
  },
  {
    id: "2",
    title: "Processing Anxiety",
    content: "Had a difficult day. The presentation didn't go as planned and I spent most of the afternoon overthinking every word I said.\n\n## What helped\n\nBreathing exercises and a 20-minute walk. Also calling my sister — she always knows what to say.\n\n## Tomorrow's intention\nBe kinder to myself. One imperfect presentation doesn't define me.",
    tags: ["anxiety", "work", "growth"],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    mood: 5,
  },
  {
    id: "3",
    title: "Weekend Reset",
    content: "Spent the weekend completely offline. No notifications, no news, just books, cooking, and long walks.\n\n## Reflections\n\nI realize I needed this more than I knew. The constant connectivity was draining me in ways I hadn't consciously registered.\n\n## Plans going forward\n1. Digital detox every Sunday\n2. Morning journaling before checking phone\n3. Weekly therapy sessions",
    tags: ["self-care", "digital detox", "planning"],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    mood: 9,
  },
];

const suggestedPrompts = [
  "What am I grateful for today?",
  "What challenge am I facing, and how can I reframe it?",
  "Describe a moment this week that made you smile.",
  "What emotion dominated my day and why?",
  "What would I tell a friend going through what I'm experiencing?",
];

const moodEmojis: Record<number, string> = {
  1: "😢", 2: "😞", 3: "😕", 4: "😐", 5: "🙂",
  6: "😊", 7: "😄", 8: "😁", 9: "🌟", 10: "🤩",
};

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(sampleEntries);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredEntries = entries.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Auto-save when content changes
  useEffect(() => {
    if (!isEditing || (!content && !title)) return;

    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    setAutoSaved(false);

    autosaveTimer.current = setTimeout(() => {
      setAutoSaved(true);
    }, AUTOSAVE_DELAY);

    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [content, title, isEditing]);

  const handleNewEntry = () => {
    setSelectedEntry(null);
    setIsEditing(true);
    setTitle("");
    setContent("");
    setTags([]);
    setPreviewMode(false);
    setAutoSaved(false);
  };

  const handleSelectEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setIsEditing(false);
    setTitle(entry.title);
    setContent(entry.content);
    setTags(entry.tags);
    setPreviewMode(true);
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast({ title: "Please add a title and content", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));

    if (selectedEntry) {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === selectedEntry.id
            ? { ...e, title, content, tags, updatedAt: new Date() }
            : e
        )
      );
    } else {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title,
        content,
        tags,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setEntries((prev) => [newEntry, ...prev]);
    }

    setIsSaving(false);
    setIsEditing(false);
    setPreviewMode(true);
    toast({ title: "Journal saved! ✨", description: "Your reflection has been stored securely." });
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags((prev) => [...new Set([...prev, tagInput.trim().toLowerCase()])]);
      setTagInput("");
    }
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
      setIsEditing(false);
    }
    toast({ title: "Entry deleted", variant: "default" });
  };

  return (
    <PageWrapper title="Journal" subtitle="Your private reflection space">
      <div className="flex gap-6 h-[calc(100vh-8rem)]">
        {/* Sidebar: entry list */}
        <div className="w-72 flex-shrink-0 flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              <Input
                id="journal-search"
                placeholder="Search entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9 text-sm"
                aria-label="Search journal entries"
              />
            </div>
            <Button id="journal-new-entry" variant="gradient" size="icon" onClick={handleNewEntry} aria-label="Create new journal entry">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto scrollbar-thin">
            {filteredEntries.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p>No entries found</p>
              </div>
            )}
            {filteredEntries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => handleSelectEntry(entry)}
                className={cn(
                  "w-full text-left p-3 rounded-xl border transition-all duration-150",
                  selectedEntry?.id === entry.id
                    ? "bg-primary/10 border-primary/30"
                    : "glass-card hover:border-primary/20"
                )}
                aria-pressed={selectedEntry?.id === entry.id}
                aria-label={`Open journal entry: ${entry.title}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="font-medium text-sm text-foreground truncate leading-tight">{entry.title}</p>
                  {entry.mood && (
                    <span className="text-base flex-shrink-0">{moodEmojis[entry.mood]}</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                  {entry.content.replace(/[#*>`\[\]]/g, "").slice(0, 100)}...
                </p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">
                    {formatDistanceToNow(entry.updatedAt, { addSuffix: true })}
                  </span>
                </div>
                {entry.tags.length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {entry.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main editor / viewer area */}
        <div className="flex-1 min-w-0">
          {(!selectedEntry && !isEditing) ? (
            <Card glass className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center mx-auto animate-float">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-outfit text-foreground mb-2">Your Safe Space</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Select an entry to read, or start writing a new reflection.
                  </p>
                </div>
                <div className="space-y-2 text-left max-w-xs">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-primary" /> Writing Prompts
                  </p>
                  {suggestedPrompts.slice(0, 3).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        setIsEditing(true);
                        setContent(`> ${prompt}\n\n`);
                        setTitle("");
                        setTags([]);
                        setSelectedEntry(null);
                      }}
                      className="w-full text-left text-xs px-3 py-2 rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors duration-150 border border-border/50 hover:border-primary/30"
                      aria-label={`Use writing prompt: ${prompt}`}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <Button id="journal-start-writing" variant="gradient" onClick={handleNewEntry}>
                  <Plus className="h-4 w-4" />
                  Start Writing
                </Button>
              </div>
            </Card>
          ) : (
            <Card glass className="h-full flex flex-col overflow-hidden">
              {/* Editor toolbar */}
              <div className="flex items-center gap-3 px-6 py-3 border-b border-border/50">
                <div className="flex-1 flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs text-muted-foreground">
                        {autoSaved ? "Auto-saved" : "Editing..."}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {selectedEntry && format(selectedEntry.updatedAt, "MMMM do, yyyy")}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {(isEditing || selectedEntry) && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setPreviewMode(!previewMode)}
                      aria-label={previewMode ? "Edit mode" : "Preview mode"}
                      title={previewMode ? "Switch to edit" : "Preview markdown"}
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  {selectedEntry && !isEditing && (
                    <>
                      <Button variant="ghost" size="sm" className="text-xs" onClick={() => setIsEditing(true)}>
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteEntry(selectedEntry.id)}
                        aria-label="Delete this journal entry"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </>
                  )}
                  {isEditing && (
                    <Button
                      id="journal-save"
                      variant="gradient"
                      size="sm"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white"
                        />
                      ) : (
                        <Save className="h-3.5 w-3.5" />
                      )}
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                  )}
                </div>
              </div>

              {/* Content area */}
              <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-4">
                {/* Title */}
                {isEditing ? (
                  <input
                    id="journal-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Entry title..."
                    className="w-full text-2xl font-bold font-outfit bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50"
                    aria-label="Journal entry title"
                  />
                ) : (
                  <h2 className="text-2xl font-bold font-outfit text-foreground">{title}</h2>
                )}

                {/* Content */}
                <AnimatePresence mode="wait">
                  {(!isEditing || previewMode) ? (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="prose prose-sm dark:prose-invert max-w-none"
                      style={{
                        "--tw-prose-body": "hsl(var(--foreground))",
                        "--tw-prose-headings": "hsl(var(--foreground))",
                        "--tw-prose-links": "hsl(var(--primary))",
                        "--tw-prose-quotes": "hsl(var(--muted-foreground))",
                        "--tw-prose-code": "hsl(var(--primary))",
                      } as React.CSSProperties}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content || "*Start writing your thoughts...*"}
                      </ReactMarkdown>
                    </motion.div>
                  ) : (
                    <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <Textarea
                        id="journal-content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your thoughts here... Supports **Markdown** formatting."
                        className="min-h-[400px] text-sm font-mono resize-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                        aria-label="Journal entry content in Markdown format"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tags */}
                {isEditing && (
                  <div className="space-y-2 pt-4 border-t border-border/50">
                    <Label htmlFor="journal-tags" className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Tag className="h-3 w-3" /> Tags
                    </Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
                          className="px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors duration-150"
                          aria-label={`Remove tag: ${tag}`}
                        >
                          #{tag} ×
                        </button>
                      ))}
                    </div>
                    <Input
                      id="journal-tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Add tags (press Enter)..."
                      className="h-8 text-xs"
                      aria-label="Add tags to this journal entry"
                    />
                  </div>
                )}

                {!isEditing && tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap pt-2 border-t border-border/50">
                    {tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
