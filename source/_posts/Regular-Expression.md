---
title: 'Regular Expression'
date: 2025-07-31 18:33:35
categories: Exploration
tags:
- SQL
mathjax:
---

> Reference: [Regular Expressions Tutorial](https://www.regular-expressions.info/tutorial.html)

**Regular expressions** is a sequence of characters that forms a _search pattern_ and own common shortands **regex** or **regexp**.

**Engines** are programs that can process regular expressions, trying to match the pattern to the given string. Different engines may have different syntax and features.

## Literal Characters and Special Characters

### Literal Characters

Most basic regular expression consists of literal characters that match the first occurrence of the characters in the string. The engine will search for the next occurrence of the characters only if you tell it to do so.

Regular expressions are case-sensitive by default.

### Special Characters

There are 12 special characters in regular expressions: backslash `\`, caret `^`, dollar sign `$`, dot `.`, asterisk `*`, plus sign `+`, question mark `?`, opening parentheses `(`, closing parentheses `)`, opening square brackets `[`, opening curly braces `{`, pipe `|`. If you want to use these characters literally, you need to escape them with a backslash `\`.

All other characters should not be escaped with a backslash because backslash with non-special characters may have special meanings.

```regex
1\+1=2 # Literally matches "1+1=2"
```

> Most regular expression engines treat the brace `{` as a literal character unless it is part of a repetition operator. Some engines support the `\Q...\E` escape sequence and all characters between `\Q` and `\E` are treated as literal characters. In some engines `\E` may be omitted.
>
> ```regex
> \Q1+1=2\E # Literally matches "1+1=2"
> ```

If you use regular expressions in a programming, you may need to escape the special charaters of the programming language as well so the final expression may seem a bit complicated. For example in Python you should write `\\\\` to match a single backslash `\`.

## Non-Printable Characters

You can use special characters to match non-printable characters in you regular expression. 

> In some engines `\v` represents a vertical tab (ASCII 11) while in other engines it is a shortand for any vertical whitespace character including vertical tab, form feed and all line breaks.
>
> Many regex engine support control tokens `\cA` to `\cZ` to match control characters from ASCII 1 to ASCII 26. In this case `\cA` indicates Control+A and `\cZ` indicates Control+Z. They are equal to `\x01` and `\x1A` respectively.
>
> It is not suggested to use characters other than letters after `\c` expressions because the behaviour is inconsistent across different engines. Some may take the last 5 bits that character index in the code page of its Unicode code point to form an ASCII control character while some just flip bit 0x40. Some engines treat `\c` expression with other characters as error.

`\uFFFF` or `\x{FFFF}` can be used to match a Unicode character if the engine supports Unicode.

If the engine works with 8-bit code pages instead of Unicode, any character can be includes in regular expressions if its position in the code page is known. For example, `\x09` matches the character at position 9 in the code page (the 0 is required!).

### Line Breaks

`\R` is a special escape that matches any line break sequence including Unicode line breaks. It will match the whole CRLF pair instead of just matches the `\r`.

However, the `\r\R` pair can match a whole CRLF pair and this behaviour is consistent.

> **LF** (Line Feed) is a single character `\n` used as the line-ending character on Unix-based systems like Linux and macOS.
>
> **CRLF** (Carriage Return + Line Feed) is a two-character sequence `\r\n` used as the line-ending character on Windows.
>
> Modern tools can be configured to automatically convert the line endings to prevent issues in cross-platform projects.

### Octal Escapes

Many engines support octal escapes like `\0`, `\0255`, `\377` and so on. The first digit can be omitted if it is 0. The octal escape will match the character at the position of the octal number in the code page.

There are huge variations in the support of octal escapes accross different engines on whether a introductory 0 is required or not, whether the `\0` without additional digits is allowed, and whether the octal escape can be used in character classes. So octal escapes are not recommended in regular expressions.

> Some engines support `\o{1}` for octal escapes.

## Regular Expression Engines

There are basically two kinds of regular expression engines: text-directed engines and regex-directed engines. Most modern use regex-directed engines because some special features.

