---
title: "I built a tiny RAG for my portfolio. Here's what broke."
date: 2026-11-23
summary: "The search on my Lab page answers questions about my work with no AI service at all. How it works, and the four bugs it had on day one."
featured: true
draft: true
---

The Lab page on this site has a search box. Ask it "did you do any hackathon?" and it answers with the right sentence about the HackerRank Orchestrate entry I built with my team. There is no model behind it and nothing leaves your browser. It's about 120 lines of JavaScript, and it's my first real step into RAG.

## Why start without a model

RAG has two halves: **retrieve** the right text, then **generate** an answer from it. Most tutorials rush to the second half. I wanted to understand the first half properly, because if retrieval hands the model the wrong text, the answer is wrong no matter how good the model is.

So version one only retrieves, then quotes. A quote can't invent anything about me.

## How it works

### 1. Chunks

Everything the search knows is a list of short chunks, one idea each, written in first person. "RAVEN does music through Lavalink, moderation, automod…" is one chunk. Right now there are 38.

### 2. Tokens

Your question becomes tokens: lower-cased, filler words like *what*, *is* and *the* dropped, endings trimmed so *servers* matches *server*. A small synonym list adds words people use for the same thing, so *pollution* also searches for *air*.

### 3. BM25

Every chunk gets a score with BM25, the ranking formula search engines used long before embeddings. Two ideas carry most of it:

- A word that appears in few chunks counts for more than a common one.
- A match in a short chunk counts for more than the same match in a long one.

### 4. Answer or refuse

The best chunk is the answer, with matching words highlighted. If even the best score is below a threshold, it says the answer isn't in my notes instead of guessing.

## What broke on day one

I tested it with real questions before shipping. Four of them failed:

1. **"What is FreeMyMac?"** returned the system requirements, not the intro. Every FreeMyMac chunk contains the word *FreeMyMac*, and BM25 prefers the shortest one. Fix: mark each project's intro chunk and give it a small bonus.
2. **"Is FreeMyMac safe?"** missed the chunk about the safety guard, because the word *safe* wasn't in it. Fix: a synonym, *safe* → *safety*, *guard*.
3. **"What's your favourite food?"** answered with something about Express. The apostrophe split *what's* into *what* and *s*, and *s* matched *it's* in a random chunk. Fix: strip contractions before tokenizing, and ignore one-letter tokens.
4. **"Tell me about coconutmc"** found nothing, because *coconutmc.net* had been squashed into one word. Fix: split on dots between letters.

Every one of these is a retrieval bug. A bigger model wouldn't have fixed any of them.

## What's next

- Swap BM25 for embeddings and see which of these questions each one gets right.
- Hand the top chunks to a small model and make it cite them.
- Then fine-tuning, to see if it beats retrieval alone.

You can try the search on the [Lab page](lab.html).
