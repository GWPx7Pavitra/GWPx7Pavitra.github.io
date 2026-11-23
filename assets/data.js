// Every fact here comes from Pavitra's own repos, READMEs, project folders and his own words.
window.SITE = {
  projects: [
    {
      id: 'raven', name: 'RAVEN', kind: 'bot', featured: true,
      problem: 'Every Discord bot I tried did half of what my server needed.',
      fix: 'So I built one that does all of it: music, moderation, automod, antinuke, tickets, leveling and logs, with a web dashboard to run it.',
      numbers: [['250k+', 'users'], ['400+', 'servers']],
      stack: ['Python', 'py-cord', 'Lavalink', 'SvelteKit', 'Postgres', 'Redis'],
      links: [], note: 'Source is private'
    },
    {
      id: 'campuszone', name: 'CampusZone', kind: 'web',
      problem: "A fixed placement course doesn't care that you only have four months.",
      fix: 'A placement-readiness platform with a college ERP and an events tracker. AI arranges team-reviewed lectures to fit the time a student actually has, with dashboards for seven roles, from student to bus driver.',
      numbers: [['3', 'products in one'], ['7', 'role dashboards']],
      stack: ['React 19', 'Vite', 'GSAP', 'Node', 'TypeScript', 'PostgreSQL'],
      links: [], note: 'Source is private'
    },
    {
      id: 'freemymac', name: 'FreeMyMac', kind: 'app',
      problem: "My Mac's SSD filled up and I couldn't tell with what.",
      fix: 'A native macOS storage manager. It scans once, keeps up with changes live, and frees space in a click or two behind a guard that refuses system folders, keychains and synced drives.',
      numbers: [['v1.1.0', 'shipped'], ['2', 'releases in 3 days']],
      stack: ['Swift', 'SwiftUI', 'CoreServices'],
      links: [['Source', 'https://github.com/GWPx7Pavitra/freemymac'], ['Download', 'https://github.com/GWPx7Pavitra/freemymac/releases/latest']]
    },
    {
      id: 'spectre', name: 'spectre', kind: 'ai',
      problem: 'When a company says your data is deleted, is it really gone?',
      fix: 'Our HackerRank Orchestrate entry: an agent that rebuilds what every system held at audit time from SQL tables, logs, PDFs and screenshots, then gives each deletion request an evidence-cited verdict.',
      numbers: [['94', 'evidence files'], ['42', 'commits']],
      stack: ['Python', 'Gemma', 'Vision OCR', 'SQLite'],
      links: [], note: 'Hackathon team entry'
    },
    {
      id: 'nearfield', name: 'Nearfield', kind: 'web',
      problem: 'I breathed Delhi air every day without knowing how bad it was.',
      fix: "Air quality and groundwater for any Indian PIN code: the official CPCB air index, 27 water chemicals checked against BIS limits, and how many cigarettes today's air equals.",
      numbers: [['27', 'water tests'], ['6', 'pollutants']],
      stack: ['JavaScript', 'Leaflet', 'OpenStreetMap', 'Cloudflare Workers'],
      links: [['Source', 'https://github.com/GWPx7Pavitra/nearfield'], ['Live', 'https://nearfield-preview.campuszzone.workers.dev']]
    },
    {
      id: 'coconutmc', name: 'CoconutMcBot', kind: 'bot',
      problem: 'A Minecraft server needed tickets, bans and live server status in one place.',
      fix: 'A Discord bot for coconutmc.net: ticket panels with HTML transcripts, numbered moderation cases whose tempbans survive restarts, and a live ping of the Minecraft server.',
      numbers: [['4', 'ticket types'], ['11', 'mod actions']],
      stack: ['Python', 'discord.py', 'Components V2', 'SQLAlchemy', 'PostgreSQL'],
      links: [], note: 'Source is private'
    },
    {
      id: 'gwppanel', name: 'GWP Panel', kind: 'ai',
      problem: 'My LLM API key allowed five requests a minute, and I kept hitting the wall.',
      fix: 'A local LLM gateway that queues every chat, counts down to the next free slot, and merges waiting chats into one batched request so the limit goes further.',
      numbers: [['5/min', 'never a 429'], ['1', 'request for many chats']],
      stack: ['TypeScript', 'React', 'Fastify', 'Server-Sent Events'],
      links: [], note: 'Runs on my Mac only'
    },
    {
      id: 'nightshift', name: 'nightshift', kind: 'extension',
      problem: 'I opened YouTube "for five minutes".',
      fix: 'A new-tab page for Chrome and Brave that tracks screen time per site, sets daily limits, and syncs both browsers with end-to-end encryption.',
      numbers: [['2', 'browsers'], ['6', 'clock styles']],
      stack: ['JavaScript', 'Chrome extension', 'GitHub Gists'],
      links: [['Source', 'https://github.com/GWPx7Pavitra/nightshift']]
    },
    {
      id: 'boards', name: 'boards-2027', kind: 'web',
      problem: 'Boards 2027 are coming and my notes were everywhere.',
      fix: 'A study planner with a day-by-day plan, interactive chapter notes, labs, drills and real board questions, plus an Android app.',
      numbers: [['5', 'subjects'], ['1', 'Android app']],
      stack: ['TypeScript', 'React', 'Vite', 'Express', 'Capacitor'],
      links: [['Source', 'https://github.com/GWPx7Pavitra/boards-2027'], ['Live', 'https://study.plagmo.art']]
    },
    {
      id: 'lyrix', name: 'Lyrix', kind: 'app',
      problem: "Spotify's lyrics live in a window I kept switching back to.",
      fix: 'A transparent, always-on-top overlay that shows live-synced lyrics for whatever Spotify is playing, with a karaoke progress bar and a screensaver mode.',
      numbers: [['2', 'platforms'], ['2', 'lyrics sources']],
      stack: ['Electron', 'Python', 'Spotify API', 'LRCLIB'],
      links: [], note: 'Windows and macOS'
    },
    {
      id: 'plagmoverse', name: 'Plagmo-Verse', kind: 'app',
      problem: 'Studying at home, with every distraction one tab away.',
      fix: 'My own suite of tools: a Mac study system with a whitelist-only DNS blocker, focus timer and syllabus tracker, plus a website blocker, a RAM manager and Lyrix.',
      numbers: [['11', 'study views'], ['4', 'tools']],
      stack: ['Node', 'React', 'SQLite', 'WebSockets', 'Kotlin'],
      links: [], note: 'Personal, runs locally'
    },
    {
      id: 'cre8ivize', name: 'Cre8ivize', kind: 'web',
      problem: 'An influencer agency needed one site that speaks to brands and creators.',
      fix: 'The website for Cre8ivize, an influencer marketing agency in India: separate paths for brands and creators, a spam-checked contact form, and accounts.',
      numbers: [['61', 'commits'], ['1', 'month']],
      stack: ['Next.js', 'SQLite', 'Nodemailer'],
      links: [['Live', 'https://cre8ivize.com']]
    },
    {
      id: 'squarebotcogs', name: 'squarebotcogs', kind: 'bot',
      problem: 'My server needed moderation and tickets before RAVEN existed.',
      fix: 'Drop-in Python cogs for automod, mass moderation, mod logs, tickets and music.',
      numbers: [['11', 'cogs']],
      stack: ['Python', 'discord.py'],
      links: [['Source', 'https://github.com/GWPx7Pavitra/squarebotcogs']]
    }
  ],

  timeline: [
    { when: 'Oct 2022', y: 2022, title: 'Joined GitHub', body: 'Started pushing code instead of keeping it on my laptop.' },
    { when: 'Aug 2023', y: 2023, title: 'First look at RAG', body: 'Forked IntelliDocChat, a chat-with-your-PDF app on LangChain and ChromaDB, to see how it works.' },
    { when: 'Dec 2023', y: 2023, title: 'Educational webpage templates', body: 'A set of templates for school web projects.' },
    { when: 'May 2025', y: 2025, title: 'squarebotcogs', body: 'Moderation, ticket and music cogs for Discord.', link: 'https://github.com/GWPx7Pavitra/squarebotcogs' },
    { when: 'Apr 2026', y: 2026, title: 'FocusTrack', body: 'A macOS tracker for every app and website I used, with a study dashboard.' },
    { when: 'Apr 2026', y: 2026, title: 'KrimXon bots', body: 'Modular Discord bots with slash and prefix commands, plus a private staff bot.' },
    { when: 'Jun 2026', y: 2026, title: 'Plagmo-Verse', body: 'My own tool suite: Lyrix, a Mac RAM manager, a website blocker and a study system.', key: true },
    { when: 'Aug 2026', y: 2026, title: 'AetherClean', body: 'My first Mac storage cleaner, in Electron. FreeMyMac, written in Swift, came three months later.' },
    { when: 'Sep 2026', y: 2026, title: 'WorldRegen and DCBotPfire', body: 'A Minecraft 1.21.1 mod with an island-ocean world generator, and a discord.js bot.' },
    { when: 'Oct 2026', y: 2026, title: 'CampusZone', body: 'Placement prep, college ERP and events in one platform. Dashboards for seven roles.', key: true },
    { when: 'Oct 2026', y: 2026, title: 'GWP Panel', body: 'A local LLM gateway that batches chats to stretch a rate limit.' },
    { when: 'Oct 2026', y: 2026, title: 'Nearfield goes live', body: 'Air and groundwater data for any Indian PIN code.', key: true, link: 'https://github.com/GWPx7Pavitra/nearfield' },
    { when: 'Oct 2026', y: 2026, title: 'Cre8ivize', body: 'The website for an influencer marketing agency.', link: 'https://cre8ivize.com' },
    { when: 'Oct 2026', y: 2026, title: 'HackerRank Orchestrate', body: 'Built spectre with my team: an agent that checks whether deleted data is really gone.', key: true },
    { when: 'Oct 2026', y: 2026, title: 'RAVEN, rebuilt', body: 'New codebase: a Python bot on py-cord plus a SvelteKit dashboard. 180+ commits since.' },
    { when: 'Oct 2026', y: 2026, title: 'CoconutMcBot', body: 'Tickets, moderation and live server status for the coconutmc.net Minecraft server.' },
    { when: 'Nov 2026', y: 2026, title: 'nightshift', body: 'A calmer new tab, with screen time that tells the truth.', link: 'https://github.com/GWPx7Pavitra/nightshift' },
    { when: '6 Nov 2026', y: 2026, title: 'FreeMyMac 1.0', body: 'My first native Mac app. Version 1.1 followed two days later.', key: true, link: 'https://github.com/GWPx7Pavitra/freemymac' },
    { when: 'Nov 2026', y: 2026, title: 'boards-2027', body: 'A study planner for my own boards, live with an Android app.', link: 'https://github.com/GWPx7Pavitra/boards-2027' },
    { when: 'Nov 2026', y: 2026, title: 'RAVEN passes 250k users', body: 'In 400+ Discord servers.', key: true },
    { when: 'Nov 2026', y: 2026, title: 'Learning RAG and fine-tuning', body: 'Building small things to understand them. The search on this site is the first.', key: true, link: 'lab.html' },
    { when: '2027', y: 2027, title: 'CBSE Class 12 boards', body: 'The exam the study planner exists for.', next: true, key: true },
    { when: 'After 12th', y: 2027, title: 'SAT and IELTS', body: 'Then university abroad.', next: true, key: true }
  ],

  // The text the "Ask my work" search retrieves from. First person, one idea per chunk.
  // lead: true marks a project's intro chunk, preferred when a question just names the project.
  corpus: [
    { lead: true, src: 'About', text: "I'm Pavitra, a Class 12 student in Delhi, India, on the CBSE board. I build software after school, mostly late at night." },
    { src: 'About', text: "After Class 12 I'm taking the SAT and IELTS, and aiming for university abroad." },
    { src: 'About', text: 'I code best between 11 PM and 3 AM India time, when everyone else is asleep.' },
    { src: 'About', text: 'I started with Python and Discord bots, moved to the web, and now also build native Mac apps in Swift.' },
    { src: 'About', text: "I've been on GitHub since October 2022, and I've built more than a dozen projects since." },
    { src: 'Learning', text: "Right now I'm learning retrieval-augmented generation (RAG) and LLM fine-tuning, by building small things with them." },
    { src: 'Learning', text: 'This search box is my first small RAG: it splits notes about my work into chunks, ranks them with BM25 and answers from the best match, all in your browser.' },
    { lead: true, src: 'RAVEN', text: 'RAVEN is my multipurpose Discord bot. It is in more than 400 servers with over 250,000 users.' },
    { src: 'RAVEN', text: 'RAVEN does music through Lavalink, moderation, automod, security and antinuke, tickets, welcome and roles, leveling, logging, starboard and fun commands.' },
    { src: 'RAVEN', text: "RAVEN's bot is Python on py-cord. Its web dashboard is SvelteKit. Postgres holds the data, and Redis holds sessions, caches and live music state." },
    { lead: true, src: 'CampusZone', text: 'CampusZone is a placement-readiness platform for BTech students, combined with a college ERP and an events and hackathon tracker.' },
    { src: 'CampusZone', text: 'In CampusZone, AI arranges lectures and practice sets the team has reviewed to fit the time a student actually has, and matches students to roles from partner companies.' },
    { src: 'CampusZone', text: 'CampusZone has dashboards for seven roles: student, class 11-12 student, teacher, bus driver, admin, super admin and owner, with attendance, assignments, notices and live bus tracking.' },
    { src: 'CampusZone', text: 'CampusZone is built with React 19, Vite, GSAP and Lenis on the front end, and a Node, TypeScript and PostgreSQL API.' },
    { lead: true, src: 'spectre', text: 'spectre was our team entry for the HackerRank Orchestrate hackathon in October 2026. It checks whether personal data a company said it deleted is really gone.' },
    { src: 'spectre', text: 'spectre reads 94 evidence files: SQL tables, JSON exports, logs, PDFs and screenshots. It uses Gemma for intent and vision, rebuilds each system at audit time, and returns COMPLETE, INCOMPLETE or NOT_APPLICABLE with cited evidence.' },
    { lead: true, src: 'CoconutMcBot', text: 'CoconutMcBot is a Discord bot I built for the coconutmc.net Minecraft server community.' },
    { src: 'CoconutMcBot', text: 'CoconutMcBot has ticket panels with HTML transcripts, numbered moderation cases, tempbans that survive restarts, automod, and a live ping of the Minecraft server. It is Python on discord.py.' },
    { lead: true, src: 'GWP Panel', text: 'GWP Panel is my local LLM gateway. My API key allowed five requests a minute, so it queues chats, shows a countdown to the next free slot, and batches waiting chats into one request.' },
    { lead: true, src: 'Lyrix', text: 'Lyrix is a transparent, always-on-top overlay that shows live-synced lyrics for the song playing on Spotify, on Windows and macOS.' },
    { lead: true, src: 'Plagmo-Verse', text: 'Plagmo-Verse is my own suite of tools: a Mac study system with a whitelist-only DNS blocker, focus timer and syllabus tracker, a website blocker, a RAM manager and Lyrix.' },
    { lead: true, src: 'Cre8ivize', text: 'Cre8ivize.com is the website I built for Cre8ivize, an influencer marketing and creator management agency in India, on Next.js with SQLite.' },
    { src: 'Other projects', text: 'I also made WorldRegen, a Minecraft 1.21.1 mod with an island-ocean world generator, the KrimXon and DCBotPfire Discord bots, and FocusTrack, a macOS app and website tracker.' },
    { lead: true, src: 'FreeMyMac', text: 'FreeMyMac is a native macOS storage manager I wrote in Swift and SwiftUI. It shows where your disk space went and frees it in a click or two.' },
    { src: 'FreeMyMac', text: 'FreeMyMac scans the disk once, then asks macOS which folders changed and re-reads only those, so it opens instantly and stays up to date while it runs.' },
    { src: 'FreeMyMac', text: "To keep it safe, FreeMyMac's safety guard refuses macOS system folders, keychains, SSH keys, Mail, Messages, Photos, iCloud Drive and anything inside an app bundle. Every removal is logged." },
    { src: 'FreeMyMac', text: 'FreeMyMac needs macOS 26 on Apple silicon. Version 1.1.0 is free to download from GitHub releases. Before it I built AetherClean, an earlier Mac cleaner in Electron.' },
    { lead: true, src: 'Nearfield', text: 'Nearfield is a free, open-source site for hyperlocal air quality and groundwater in India. Enter a PIN code and it maps your area on OpenStreetMap.' },
    { src: 'Nearfield', text: 'Nearfield computes the official CPCB air quality index from PM2.5, PM10, NO2, SO2, CO and O3, and turns PM2.5 pollution into how many cigarettes the air equals per day.' },
    { src: 'Nearfield', text: 'Nearfield checks 27 groundwater chemicals, like fluoride, arsenic and nitrate, from Central Ground Water Board lab data against BIS drinking water limits.' },
    { src: 'Nearfield', text: 'Nearfield runs on a Cloudflare Worker, with plain JavaScript and Leaflet in the browser.' },
    { lead: true, src: 'nightshift', text: 'nightshift is a browser extension for Chrome and Brave. It replaces the new tab with a calm startup page and tracks screen time on each website.' },
    { src: 'nightshift', text: 'nightshift has daily limits per site, a weekly report, a command palette, to-dos and notes, and end-to-end encrypted sync between browsers.' },
    { lead: true, src: 'boards-2027', text: 'boards-2027 is my study planner for the Class 12 CBSE boards: a day-by-day plan, interactive chapter notes, labs, drills and real board questions.' },
    { src: 'boards-2027', text: "boards-2027 uses React, Vite and Tailwind on the web, an Express server, and an Android app made with Capacitor. It's live at study.plagmo.art." },
    { lead: true, src: 'squarebotcogs', text: 'squarebotcogs is a set of Python discord.py cogs for automod, mass moderation, mod logs, tickets and music.' },
    { src: 'Stack', text: "I write TypeScript, JavaScript, Python, Swift, Kotlin and a little Java. I've used React, Next.js, SvelteKit, Express, Fastify, Electron, Cloudflare Workers, Postgres, Redis and Docker." },
    { src: 'Contact', text: 'The fastest way to reach me is Discord, where I am x465. Email works too: pavisj@icloud.com. I am xpavilyon on LinkedIn and @xpavilyon on Instagram.' }
  ]
};
