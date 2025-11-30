---
title: 'LeetCode Log'
date: 2025-09-20 18:17:21
categories: Exploration
tags:
- CS DIY
mathjax:  true
---

This post is aimed to record some interesting LeetCode problems.

<!-- more -->

## Algorithms

### 6. Zigzag Conversion

> [LeetCode Source](https://leetcode.com/problems/zigzag-conversion)

An $O(n)$ solution:

```C++
class Solution {
public:
    string convert(string s, int row) {
        if (row == 1 || row > s.length())
            return s;
        // Corner case should be considered.
        bool asc = true;
        int curr_row = 1;
        vector<string> result_arr(row);
        for (auto it = s.begin(); it != s.end(); it++) {
            result_arr[curr_row-1] += *it;
            if (curr_row == 1)
                asc = true;
            else if (curr_row == row)
                asc = false;
            curr_row += (asc) ? 1 : -1;
        }
        string result = "";
        for (auto it = result_arr.begin(); it != result_arr.end(); it++) {
            result += *it;
        }
        return result;
    }
};
```

### 3539. Find Sum of Array Product of Magical Sequences

> [LeetCode Source](https://leetcode.com/problems/find-sum-of-array-product-of-magical-sequences/)

```C++
static constexpr int MOD = 1e9 + 7;
static int C[31][31]={{0}};
static int dp[31][31][50][31];
class Solution {
    int m,n,k;
    void Pascal{
        if(C[0][0]=0)return;
        for(int i=0;i<=30;i++){
            C[i][0]=1;
            for(int j=1;j<=i;j++){
                C[i][j]=(C[i-1][j-1]+C[i-1][j])%MOD;
            }
        }
    }
}
```

## Graph

### 133. Clone Graph

> Medium | [LeetCode Source](https://leetcode.com/problems/clone-graph)

Basic and classic deep first search (DFS) problem. Duplicate node should be considered.

```C++
class Solution {
public:
  Node *dfs(Node *cur, unordered_map<Node *, Node *> &map) {
    vector<Node *> neighbour;
    Node *clone = new Node(cur->val);
    map[cur] = clone;
    for (auto it : cur->neighbors) {
      if (map.find(it) != map.end()) {
        neighbour.push_back(map[it]);
      } else
        neighbour.push_back(dfs(it, map));
    }
    clone->neighbors = neighbour;
    return clone;
  }
  Node *cloneGraph(Node *node) {
    if (node == nullptr)
      return nullptr;
    if (node->neighbors.size() == 0)
      return new Node(node->val);
    unordered_map<Node *, Node *> map;
    return dfs(node, map);
  }
};
```
