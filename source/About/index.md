---
title: About
date: 2025-06-23 22:12:52
---

## Dimethyl

- Undergraduate of Information Security
- School of Computer Science, [Shanghai Jiao Tong University](https://www.sjtu.edu.cn/) (SJTU)

## Blog

### Update Log

<script>
  async function fetchCommits() {
    const username = "YOUR_USERNAME";
    const repo = "YOUR_REPO_NAME";
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      const commits = await response.json();
      const listElement = document.getElementById("commit-history");

      // Clear "Loading..." text
      listElement.innerHTML = "";

      // Get the latest 5 commits
      commits.slice(0, 5).forEach(commit => {
        const li = document.createElement("li");
        const message = commit.commit.message.split('\n')[0]; // Get first line of message
        const date = new Date(commit.commit.author.date).toLocaleDateString();
        const commitLink = document.createElement("a");

        commitLink.href = commit.html_url;
        commitLink.target = "_blank";
        commitLink.textContent = message;

        li.appendChild(commitLink);
        li.append(` - ${date}`);
        listElement.appendChild(li);
      });

    } catch (error) {
      const listElement = document.getElementById("commit-history");
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
