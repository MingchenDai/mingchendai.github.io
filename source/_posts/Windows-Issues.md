---
title: Microsoft Windows Issues and Fixes
date: 2026-02-02 00:02:34
tags:
  - OS
  - Windows
categories: 
  - [Exploration]
  - [Updating]
---

Counted by a VSCode plugin, the platform I spent the most time on is Debian via SSH remote connection from MacOS. However, Windows is still an important platform I use frequently, especially for some specific software that only runs on Windows or have requirements for a powerful GPU. This post records some issues I encountered when using Windows 11 on my Lenovo laptop, and their solutions.

As my computer is a dual-booting system with Arch Linux, some issues are related to dual-booting systems. These issues and their solutions will not appear in this post - please check [Arch Linux - Windows Dual-Booting System Installation Guide](/2026/01/15/Arch-Linux-Installation/) for details.

<!--more-->

## Set PowerShell 7 As Default Terminal

By default, Windows Terminal uses PowerShell 5.1 as the default shell. However, PowerShell 7 has many new features and improvements over the older version.

To set PowerShell 7 as the default terminal in Windows Terminal, open Windows Terminal, goto Settings > Startup > Default profile and select `PowerShell` (the one with version 7.x.x). Remember to save the settings and restart Windows Terminal for the changes to take effect.

## Virtual Machines

VMware Workstation Pro is the virtualization software I use.

### 