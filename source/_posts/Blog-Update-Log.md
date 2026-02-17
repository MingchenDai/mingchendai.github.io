---
title: Dimethyl Blog Update Log
date: 2026-02-02 13:24:56
tags:
  - Blog
categories:
  - [Post]
  - [Updating]
---

This blog, run by GitHub Actions and Hexo, is regularly updated. Although git commit messages provide some insight into the changes made, this log offers a more detailed overview of significant updates and modifications.

Root repository of this blog locates at [Github - MingchenDai/mingchendai.github.io](https://github.com/MingchenDai/mingchendai.github.io). You can check the changes there directly, or refer to this log for a summarized view of the updates in reverse chronological order.

Update logs are edited manually since February 2nd, 2026. Normal update of this post (including adding new update message and modifying existing commit ids) and [About](/about/) page will not be recorded here.

<!-- more -->

## Update Log

### Latest Update

| Date | Version | Commit |
|----------|-------------|------------|
| 2026-02-02 | 1.0.1 | [Latest Commit](https://github.com/MingchenDai/mingchendai.github.io/commit/main) |

In **framework**, 
- `hexo-generator-i18n` package is deprecated and removed. 
- For table of contents in sidebar, wrapping is enabled for long titles, and instead of displaying current section title, all level headings are shown. 
- `Powered by Hexo & NexT` footer is added. 
- Post editing is disabled now, since the feature is not used frequently. 
- WaveDrom diagrams are supported in consideration of future posts about digital logic design.
- Page generator of NexT theme is modified to support user content display on functional pages such as [Categories](/categories/) and [Tags](/tags/).

**New posts** are:
- [Microsoft Windows Issues and Fixes](/2026/02/02/Windows-Issues/): A collection of issues encountered while using Windows 11 on a Lenovo laptop, along with their solutions.
- [Dimethyl Blog Update Log](/2026/02/02/Blog-Update-Log/): This post, documenting the updates and modifications made to the Dimethyl blog.
- [Arch Linux Installation Guide](/2026/01/15/Arch-Linux-Installation/): A comprehensive guide on installing dual-booting Arch Linux with Windows 11 on a Lenovo laptop.
- [CS2501 Discrete Mathematics](/2026/01/16/Note-CS2501/): Notes and materials related to the CS2501 Discrete Mathematics course.
- [CS3321 Database System Technology](/2026/02/13/Note-CS3321/): Notes and materials related to the CS3321 Database System Technology course.

In **modified content**,
- $\LaTeX$ formula display bugs caused by escapes in [MATH1207 Probability and Mathematical Statistics](/2026/01/16/Note-MATH1207/) are fixed.
- The commit history in `about` page is removed accordingly due to addition of this post, and a link to this post is added.

In **Collections** part,
- Picture link problem in Masonry part is fixed.
- Link to developing page is removed.