---
title: "Notes on Git"
date: 2025-06-25
categories: Exploration
tags: 
- Git
mathjax: true
---

One of explorations in winter holiday is learning the usage of git by [Learn Git Branching](https://learngitbranching.js.org/), which provides a visualized way to learn.

### Introduction to git commits

#### Commits

A commit in a git repository records a snapshot of all the (tracked) files in your directory. It compresses the changes in your files, from the previous version of the repository to the next.

If you want to make changes to the repository and save them as a commit, try `git commit`.

#### Branches

Branches are simply lightweight pointers to a specific commit. Because there is no storage / memory overhead with making many branches, it's easier to logically divide up your work than have big beefy branches.

Just remember, a branch essentially says "I want to include the work of this commit and all parent commits."

To creat a new branch named `newBranch`, you can try `git branch newBranch`.

However, creating a new branch does not mean you are on the new branch. To switch to the branch you created, try `git checkout newBranch` or `git swith newBranch`.

> Git is consider replacing `checkout` with `switch` because the former is somewhat overloaded. However, `switch` is still experimental and its syntax may change before its formal release.

If you want to create a new branch and check it out at the same time, you can simply type `git checkout -b [yourbranchname]`.

#### Merge

To combine work that we will examine, try `git merge`, and git creates a special commit that has two unique parents. A commit with two parents essentially means "I want to include all the work from this parent over here and this one over here, and the set of all their parents."

#### Rebase

By `git rebase`, you can directly move your work of a branch onto another branch.

### Moving Around in Git

#### HEAD

HEAD is the symbolic name for the currently checked out commit -- it's essentially what commit you're working on top of. HEAD always points to the most recent commit which is reflected in the working tree. Most git commands which make changes to the working tree will start by changing HEAD. Normally HEAD points to a branch name (like bugFix). When you commit, the status of bugFix is altered and this change is visible through HEAD.

Detaching HEAD by `git checkout <currentCommit>` just means attaching it to a commit instead of a branch.

#### Relative Refs

Git only requires you to specify enough characters of the hash until it uniquely identifies the commit.

You can move upwards one commit at a time with `git checkout main^` or `git checkout HEAD^`, telling Git to find the parent of the specified commit. You can also move upwards a number of times with `~<num>`.

By `git branch -f main HEAD~3`, you can move (by force) the main branch to three parents behind HEAD. However, in a real git environment `git branch -f command` is not allowed for your current branch.

#### Reversing Changes

There are two primary ways to undo changes in Git -- one is using `git reset` and the other is using `git revert`.

`git reset` reverses changes by moving a branch reference backwards in time to an older commit. In this sense you can think of it as "rewriting history;" `git reset` will move a branch backwards as if the commit had never been made in the first place.

While resetting works great for local branches on your own machine, its method of "rewriting history" doesn't work for remote branches that others are using. In order to reverse changes and share those reversed changes with others, we need to use `git revert`, and a new commit plops down below the commit we wanted to reverse, introducing changes that exactly reverses the previous commit.

### Moving Work Around

#### Git Cherry-pick

`git cherry-pick <Commit1> <Commit2> <...>` is a very straightforward way of saying that you would like to copy a series of commits below your current location (`HEAD`).

#### Git Interactive Rebase

All interactive rebase means is that Git is using the `rebase` command with the `-i` option.

If you include this option, git will open up a UI to show you which commits are about to be copied below the target of the rebase. It also shows their commit hashes and messages, which is great for getting a bearing on what's what.

### Locally stacked commits

#### Tags

Git tags permanently mark certain commits as "milestones" that you can then reference like a branch. More importantly though, they never move as more commits are created. You can't "check out" a tag and then complete work on that tag -- tags exist as anchors in the commit tree that designate certain spots.

```git
git tag v1 C1
```

#### Git Describe

Git describe takes the form of:

```git
git describe <ref>
```

Where `<ref>` is anything git can resolve into a commit. If you don't specify a ref, git just uses where you're checked out right now (HEAD).

The output of the command looks like:

`<tag>_<numCommits>_g<hash>`

Where tag is the closest ancestor tag in history, numCommits is how many commits away that tag is, and `<hash>` is the hash of the commit being described.

#### Specifying Parents

Like the `~` modifier, the `^` modifier also accepts an optional number after it.

Rather than specifying the number of generations to go back (what `~` takes), the modifier on `^` specifies which parent reference to follow from a merge commit. Remember that merge commits have multiple parents, so the path to choose is ambiguous.

Git will normally follow the "first" parent upwards from a merge commit, but specifying a number with `^` changes this default behavior.

These modifiers can be chained together.

### Git Remotes

#### Git Clone

By `git clone`, we can create local copies of remote repositories (from github for example).

The new branch appeared in our local repository is called a **remote branch**.

Remote branches reflect the state of remote repositories (since you last talked to those remote repositories). They help you understand the difference between your local work and what work is public -- a critical step to take before sharing your work with others.

Remote branches have the special property that when you check them out, you are put into detached `HEAD` mode. Git does this on purpose because you can't work on these branches directly; you have to work elsewhere and then share your work with the remote (after which your remote branches will be updated).

To be clear: Remote branches are on your local repository, not on the remote repository.

Remote branches also have a (required) naming convention -- they are displayed in the format of `<remote name>/<branch name>`. Git actually sets up your remote to be named `origin` when you `git clone` a repository.

#### Git Fetch

By `git fetch`, we can fetch data from a remote repository.

When performing `git fetch`, commits that the remote has but are missing from our local repository are downloaded first, and then where our remote branches point is updated.

`git fetch` essentially brings our local representation of the remote repository into synchronization with what the actual remote repository looks like (right now). It usually talks to the remote repository through the Internet (via a protocol like `http://` or `git://`).

However, `git fetch` does not change anything about your local state.

#### Git Pull

`git pull` is essentially shorthand for a `git fetch` followed by a merge of whatever branch was just fetched.

#### Git Push

`git push` is responsible for uploading your changes to a specified remote and updating that remote to incorporate your new commits. Once `git push` completes, all your friends can then download your work from the remote.

> The behavior of `git push` with no arguments varies depending on one of git's settings called `push.default`. The default value for this setting depends on the version of git you're using, but we are going to use the `upstream` value in our lessons. This isn't a huge deal, but it's worth checking your settings before pushing in your own projects.

#### Remote Rejected -- Feature Branches

If you work on a large collaborative team it's likely that main is locked and requires some Pull Request process to merge changes. If you commit directly to main locally and try pushing you will be greeted with a error message.

The remote rejected the push of commits directly to main because of the policy on main requiring **pull requests** to instead be used.

Create another branch called feature and push that to the remote. Also reset your main back to be in sync with the remote otherwise you may have issues next time you do a pull and someone else's commit conflicts with yours.

#### Push Arguments

`git push` can optionally take arguments in the form of: `git push <remote> <place>`.

In order to specify both the source and the destination of `<place>`, simply join the two together with a colon: `git push origin <source>:<destination>`.

#### Fetch Arguments

If you specify a place with git fetch like in the following command: `git fetch origin foo`, Git will go to the `foo` branch on the remote, grab all the commits that aren't present locally, and then plop them down onto the `o/foo` branch locally.

#### Oddities of `<source>`

Git abuses the `<source>` parameter in two weird ways. These two abuses come from the fact that you can technically specify "nothing" as a valid `source` for both `git push` and `git fetch`. The way you specify nothing is via an empty argument:

```git
git push origin :side
git fetch origin :bugFix
```
