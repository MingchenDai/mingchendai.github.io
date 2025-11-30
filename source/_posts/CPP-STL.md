---
title: CPP-STL
date: 2025-09-20 18:30:57
tags: 
- CS DIY
- Program Language
- C++
categories: Exploration
mathjax: true
---

Some notes on C++ STL.

<!-- more -->

## `std::vector`

> <https://en.cppreference.com/w/cpp/container/vector>

```C++
template<
    class T,
    class Allocator = std::allocator<T>
> class vector;
```

(construtor) :

`push_back()`: Add an element to the end.

## `std::unordered_map`

> <https://en.cppreference.com/w/cpp/container/unordered_map>

```C++
template<
    class Key,
    class T,
    class Hash = std::hash<Key>,
    class KeyEqual = std::equal_to<Key>,
    class Allocator = std::allocator<std::pair<const Key, T>>
> class unordered_map;
```

`find()`: Returns an iterator to the element if found, otherwise it returns `end()`.
