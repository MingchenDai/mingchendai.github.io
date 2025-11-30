---
title: About
date: 2025-06-23 22:12:52
---

## Dimethyl

Information Security Undergraduate @ SCS [SJTU](https://www.sjtu.edu.cn/)

### GitHub Activity

![GitHub Contributions](https://ghchart.rshah.org/0d6aae/MingchenDai)

## Blog

### Update Log

Below are the latest 10 commits to this blog's repository. For more details, visit the [root repository](https://github.com/MingchenDai/mingchendai.github.io).

<ul id="commit-history">
  <li>Loading commit history...</li>
</ul>

<script>
  async function fetchCommits() {
    const username = "MingchenDai";
    const repo = "mingchendai.github.io";
    
    const url = `https://api.github.com/repos/${username}/${repo}/commits?per_page=10`;
    const listElement = document.getElementById("commit-history");

    if (!listElement) {
      console.error("Error: Element with ID 'commit-history' not found.");
      return;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const commits = await response.json();
      listElement.innerHTML = "";

      commits.forEach(commit => {
        const li = document.createElement("li");

        const dateStr = new Date(commit.commit.author.date);
        const year = dateStr.getFullYear();
        const month = String(dateStr.getMonth() + 1).padStart(2, '0');
        const day = String(dateStr.getDate()).padStart(2, '0');
        const hours = String(dateStr.getHours()).padStart(2, '0');
        const minutes = String(dateStr.getMinutes()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
        li.append(`${formattedDate} - @`);

        if (commit.author && commit.author.login) {
          const committerLink = document.createElement("a");
          committerLink.href = commit.author.html_url;
          committerLink.target = "_blank";
          committerLink.rel = "noopener noreferrer";
          committerLink.textContent = `${commit.author.login}`;
          li.appendChild(committerLink);
        } else {
          li.append(document.createTextNode(commit.commit.author.name));
        }

        li.append(" : ");

        const message = commit.commit.message.split('\n')[0];
        const commitLink = document.createElement("a");
        commitLink.href = commit.html_url;
        commitLink.target = "_blank";
        commitLink.rel = "noopener noreferrer";
        commitLink.textContent = message;
        li.appendChild(commitLink);
        
        listElement.appendChild(li);
      });

    } catch (error) {
      listElement.innerHTML = "<li>Could not load commit history.</li>";
      console.error(error);
    }
  }

  // Run the function
  fetchCommits();
</script>

### To Do List

- [ ] Implement Python program to automatically synchronize notes, see [MingchenDai/notes-deployer](https://github.com/MingchenDai/notes-deployer)
- [ ] Update Marsion
