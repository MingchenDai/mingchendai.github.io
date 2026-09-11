---
title: "NIS2337 Information Theory Notes (4): Source Coding"
date: 2026-04-24 17:13:48
tags:
- Information Theory
- Notes
- SJTU Courses
mathjax: true
tikzjax: true
---

> "Information has three great desires: compression rate, efficiency, and accuracy. Among these three desires, compression rate satisfies the need for compression survival, so the pursuit of compression rate takes the highest priority. If effective compression can be achieved during transmission, it also makes channel transmission extremely efficient. In real life, there exist codes that persistently pursue such efficiency. We usually refer to this type of code as an optimal code, and the encoder is specifically tailored for those channels weary of transmission distortion, providing source coding that matches their channel capacity."

The role of source coding can be summarized as follows:
- **Symbol Transformation**: To match the output symbols of the source with the input symbols of the channel;
- **Information Matching**: To match the information output by the source with the transmission capability of the channel;
- **Redundancy Compression**: To reduce redundant information in the source output, thereby improving transmission efficiency.

<!--more-->

> **NIS2337 Foundations of Information Theory** course notes — other chapters:
> 1. [Source and Information Entropy](/SJTUCourses/NIS2337/01-Source)
> 2. [Channel and Channel Capacity](/SJTUCourses/NIS2337/02-Channel)
> 3. [Rate-Distortion Function](/SJTUCourses/NIS2337/03-RateDistortion)
> 4. [Source Coding](/SJTUCourses/NIS2337/04-SourceCoding) (this article)
> 5. [Channel Coding](/SJTUCourses/NIS2337/05-ChannelCoding)
>
> Supplementary information can be found in [Beyond 2337](/SJTUCourses/NIS2337/06-Appendix).

## Coding

```tikz
\usetikzlibrary{trees, arrows.meta}
\begin{document}
\begin{tikzpicture}[
    edge from parent,
    child anchor=west,
    parent anchor=east,
    grow=right,
    level distance=4cm,
    edge from parent path={(\tikzparentnode.east) -- +(0.4,0) |- (\tikzchildnode.west)},
    >=Stealth
]
\node {Code}
    child {node {Block}
        child {node {Non-singular}
            child {node {Uniquely Decodable}
                child {node {Instantaneous}}
                child {node {Non-instantaneous}}
            }
            child {node {Non-uniquely Decodable}}
        }
        child {node {Singular}}
    }
    child {node {Non-block}};

\end{tikzpicture}
\end{document}
```

**Block Codes**. The source messages are divided into groups (or symbol sequences) $\vec{x}\_i=(x_{i1}, x_{i2}, \ldots, x_{il})$, where $l$ is the length of each group. Each group of messages is encoded into a codeword $\vec{y}_i$ of length $k$. The encoding function for block codes is $f: \vec{x}_i \mapsto \vec{y}_i$.

Block codes are memoryless; therefore, only block codes have a corresponding code table, whereas non-block codes do not.

**Fixed-Length Codes**. A fixed-length code is one in which every codeword has the same length, i.e., $k$ is constant. Conversely, **Variable-Length Codes** can be defined.

**Singular Codes**. If there exist two distinct messages $\vec{x}_i$ and $\vec{x}_j$ such that they are encoded into the same codeword $\vec{y}$, the code is said to be singular. Otherwise, the code is said to be **Non-singular**.

**Uniquely Decodable Codes**. If any two different message sequences are encoded into different codeword sequences, the code is said to be uniquely decodable. Singular codes are not uniquely decodable; non-singular codes are not necessarily uniquely decodable, since there may exist multiple ways to parse the sequence.

Uniquely decodable codes can be divided into **Instantaneous Codes** and **Non-instantaneous Codes**. In an instantaneous code, as soon as a symbol is received, the codeword is known to be complete and can be decoded immediately. A uniquely decodable code is said to be instantaneous if no codeword is a prefix of any other codeword. Otherwise, the code is said to be non-instantaneous.

> Instantaneous codes are also called **Undelayed Codes** or **Prefix Codes** — no codeword is a prefix of any other codeword.

A tree diagram can be used to represent instantaneous codes. In the tree diagram, terminal nodes represent codewords, and the labels on the edges represent the symbols of the codewords.

**Kraft's Inequality**. For a set of codewords $\\\{\vec{y}\_1, \vec{y}\_2, \cdots, \vec{y}\_M\\\}$, if an instantaneous code exists such that every codeword in this set belongs to the code, then Kraft's inequality must be satisfied:
$$\sum_{i=1}^M r^{-l_i} \leq 1$$
where $r$ is the number of code symbols and $l_i$ is the length of codeword $\vec{y}_i$.

Kraft's inequality is a necessary and sufficient condition for the existence of a uniquely decodable code. If the inequality is satisfied, then a uniquely decodable code with these codeword lengths must exist; however, this does **not** imply that every code satisfying the inequality is uniquely decodable. Therefore, this inequality is a necessary and sufficient condition for the **existence** of a uniquely decodable code, but not a necessary and sufficient condition for determining whether a particular code **is** uniquely decodable.

**Follower Sets** are used to determine the unique decodability of a code.
- Examine all codewords in code $C$. If $W_i, W_j \in C$ and $W_i$ is a prefix of $W_j$, place the corresponding suffix into the follower set $F_0$.
- Examine all codewords in $F_i \cup C$. If $W_i, W_j \in F_i \cup C$ and $W_i$ is a prefix of $W_j$, place the corresponding suffix into the follower set $F_{i+1}$.
- Continue this process until $F_k$ no longer changes. If $\displaystyle \bigcup_{i=0}^k F_i$ contains a codeword from $C$, then the code is not uniquely decodable; otherwise, it is uniquely decodable.

## Noiseless Source Coding Theorem

Suppose the input message sequence of the source is $X=(X_1, X_2, \ldots, X_L)$, with alphabet $\\\{a_1, a_2, \ldots, a_n\\\}$, and each symbol has probability $p(x_i)$. Let the encoded codeword sequence be $Y=(Y_1, Y_2, \ldots, Y_{K_L})$, with code alphabet $\\\{b_1, b_2, \ldots, b_m\\\}$, and each code symbol has probability $q(y_j)$.

We seek an ideal coding scheme that minimizes both the distortion and the information rate required to transmit $Y$ during the encoding and decoding processes.

### Fixed-Length Coding

In **fixed-length coding**, the output codewords have a total of $m^K$ possible combinations, and the input messages have a total of $n^L$ possible combinations. To ensure that each input message can be uniquely encoded, we must satisfy $m^K \geq n^L$, i.e.,
$$R = \frac{K}{L} \geq \frac{\log n}{\log m}$$

The information transmission efficiency of fixed-length coding is extremely low.

**Fixed-Length Coding Theorem**. Under the condition of noiseless coding (or arbitrarily small error probability), the minimum required codeword length $K$ satisfies:
$$\bar{K}=\frac{K \log m}{L} \ge H_L(X)$$

This can also be expressed as:
$$K\log m > L \cdot H_L(X)=H(X)$$
That is, if the amount of information that the codeword can carry exceeds the amount of information output by the source sequence, then nearly noiseless transmission can be achieved.

For fixed-length coding to achieve nearly noiseless coding, the source length $L$ must satisfy:
$$L \geq \frac{\sigma^2(\vec{X})}{\varepsilon^2\delta}$$

where $\sigma^2(\vec{X})=\mathbb{E}\\{[I(x_i)-H(\vec{X})]^2\\}$ is the variance of the source sequence $\vec{X}$, $\varepsilon=\bar{K}-H_L(X)$ is the allowable distortion level, and $\delta$ is the allowable distortion probability.

**Coding Efficiency**. Define the coding efficiency as $\eta = \dfrac{H_L(X)}{\bar{K}}$, the ratio of the average information per source sequence to the average codeword length.

The efficiency of noiseless coding is always less than 1. When $L$ is finite, it is impossible for fixed-length coding to achieve both high coding efficiency and low error rate simultaneously.

### Variable-Length Coding

In variable-length coding, the codeword length $K_i$ varies. The average codeword length for an $m$-ary code is $\displaystyle \bar{K}=\sum_i p(a_i)K_i$.

**Single-Symbol Variable-Length Coding Theorem**. For a discrete memoryless source with entropy $H(X)$, there exists a variable-length code such that the average codeword length $\bar{K}$ satisfies:
$$\frac{H(X)}{\log m} \leq \bar{K} < \dfrac{H(X)}{\log m} + 1$$

For a discrete stationary memoryless sequence, we have:
$$H_L(X) \leq \bar{K} < H_L(X) + \frac{\log m}{L}$$

where $\displaystyle \bar{K}=\dfrac{\bar{K_L}}{L}\log m$. As $L$ tends to infinity, $\bar{K}$ tends to $H(X)$. The symbol length $L$ required to achieve a relatively high coding efficiency using variable-length coding is generally much smaller than that required for fixed-length coding.

A lower bound on the efficiency of variable-length coding:
$$\eta = \frac{H_L(X)}{\bar{K}} > \frac{H_L(X)}{H_L(X) + \dfrac{\log m}{L}}$$

Define the **redundancy** of a code:
$$\gamma = 1-\eta = 1 - \frac{H_L(X)}{\bar{K}}$$

For a given source and a given code alphabet, if there exists a uniquely decodable code whose average length is less than that of all other uniquely decodable codes, then this code is called an **optimal code** or a **compact code**.

**Shannon Coding**. Shannon's first theorem states that each codeword length $K_i$ must satisfy $K_i =\left\lceil \log_m\dfrac{1}{p(x_i)}\right\rceil$.

- Arrange the source symbols in descending order of their probabilities of occurrence;
- Determine the integer codeword lengths $K_i$;
- Compute the cumulative probability for the $i$-th message;
- Convert the cumulative probability into an $m$-ary fraction, and take its first $K_i$ digits as the codeword for the $i$-th message (progressively pruning the tree diagram).

## Source Coding with a Fidelity Criterion

Noiseless source coding is **entropy-preserving**: during the encoding process, the input and output codeword sets are in one-to-one correspondence, so the information transmission rate $R$ through the channel equals the source entropy $H(X)$.

Mathematically, noiselessness is well understood; however, in practical applications, it is a very stringent requirement or necessity. In many applications, entropy preservation is neither required nor always possible, and lowering the information rate also facilitates information processing and transmission. Therefore, we can relax the requirement of noiselessness and allow a certain degree of distortion in exchange for a lower information rate.

**Source Coding with a Fidelity Criterion Theorem**. Encoding methods exist that can make the information rate arbitrarily close to $R(D)$ within the distortion limit, i.e., $R(D) \le \overline{K} < R(D) + \varepsilon$. However, if the information rate is made smaller than $R(D)$, the average distortion will necessarily exceed the distortion limit $D$.

The source coding with a fidelity criterion theorem only demonstrates the existence of optimal codes, but provides no insight into the specific construction of encoding methods. In fact, to date, no suitable implementable encoding method can approach the bound $R(D)$.

## Common Source Coding Methods

See data structures and discrete mathematics. Omitted.

### Fano Coding

- Arrange the source symbols in descending order of their probabilities of occurrence;
- Partition the sequentially arranged source symbols into two groups based on their probability values, such that the sums of the probabilities of the two groups are as close as possible, and assign a binary code symbol 0 and 1 to each group;
- Further divide each large group of source symbols into two subgroups, again making the sums of the probabilities of the two subgroups as close as possible, and assign a binary code symbol 0 and 1 to each subgroup.
- Repeat this process until each group contains only one source symbol.
- The codewords corresponding to the source symbols constitute the Fano code.

Fano coding is well-suited for sources where the probabilities of each partition are very close, especially when encoding a source where the probabilities of each partition are exactly equal, achieving ideal coding efficiency.

This coding method is still a way of constructing a code tree, so it is an instantaneous code. Since the probabilities of each partition are approximately equal, the average codeword length of Fano coding is relatively short, and the coding efficiency is relatively high. However, the Fano coding method does not necessarily make full use of short codewords.

### Arithmetic Coding

For block codes, the probability characteristics of the source must be accurately measured. If these characteristics change slightly, the code table must be replaced. Moreover, for binary sources, it is often necessary to combine multiple symbols jointly to improve coding efficiency, which requires constructing a huge code table, increasing coding complexity. Therefore, it is necessary to study a non-block coding method, namely arithmetic coding.

Consider a source alphabet $\\\{a_1, a_2, \ldots, a_n\\\}$, where each symbol has probability $p(a_i)$. Partition the interval $[0,1)$ into $n$ subintervals, each subinterval having a length equal to the probability of the corresponding symbol.

Define the cumulative probability of the $r$-th symbol as $\displaystyle P_r=\sum_{i=1}^{r-1} p(a_i)$. For a message sequence $S$, if a source symbol $a_k$ is appended, the cumulative probability becomes $P(S, a_k)=P(S) + p(S)P_k$. Meanwhile, the recurrence relation for the sequence $p(S,r)=p(S)p_r$ is obvious.

Thus, for a message sequence $S$, we delineate a subinterval $[P(S), P(S)+p(S))$ within the interval $[0,1)$. For a message sequence $S$ of length $L$, the corresponding interval length is $p(S)=\prod_{i=1}^L p(a_i)$.

Therefore, the arithmetic coding process is as follows:
- Set up two registers $A$ and $C$; $A$ stores the lower bound of the current interval, and $C$ stores the length of the current interval. Initially, $A=0$, $C=1$.
- For each symbol $a_k$ in the message sequence $S$, update the values of $A$ and $C$:
$$A \leftarrow A + C \cdot P_k$$
$$C \leftarrow C \cdot p_k$$
- Determine the codeword length by $L=\lceil -\log_2 C \rceil$, convert $A$ into a binary number, and take its first $L$ bits as the codeword for the message sequence $S$. If there is a remainder, carry to the $L$-th bit.

The decoding process recursively determines the interval containing the value, removes the cumulative probability, and scales the interval, gradually recovering the message sequence $S$.

### LZ Coding

For stationary sources with precisely known statistical characteristics, reliable algorithms (such as Huffman coding or arithmetic coding) already exist that can make the average codeword length approach the average entropy per symbol of the source, with relatively low implementation complexity.

However, in practical applications (such as file compression), the statistical characteristics of the source are often unknown, or they are so complex that accurate measurement is difficult. In such cases, we need a **model-free coding** method that does not rely on the statistical characteristics of the source to construct the code. This section uses the LZ78 algorithm as an example.

Suppose the source alphabet is $\\\{a_1, a_2, \ldots, a_n\\\}$, with each symbol having probability $p(a_i)$. The encoding process of the LZ78 algorithm is as follows:
- Initialize an empty dictionary $D$ and an empty current string $S$.
- Read symbols one by one from the input message sequence until a string $S_i$ not already in the dictionary $D$ is formed.
- Add the string $S_i$ to the dictionary $D$, and output an encoded pair $(\text{index}, \text{symbol})$, where $\text{index}$ is the first $\lceil \log i \rceil$ bits of the index of the prefix of $S_i$ in the dictionary, and $\text{symbol}$ is the last symbol of $S_i$.
- Repeat the above process until the entire message sequence has been processed.

For decoding, the dictionary is built on the fly while decoding.

### Run-Length Encoding

In practical signal transmission (e.g., fax, telephone), there are often repeated symbols such as pauses and blanks occurring consecutively. For such cases, run-length encoding (RLE) is a very effective coding method.

For a binary channel, the basic idea of run-length encoding is to represent consecutive repeated symbols as a symbol and a count. For example, for the input sequence $S=0001110000$, we can encode it as $334$, meaning the symbol 0 appears 3 times consecutively, followed by the symbol 1 appearing 3 times consecutively, followed by the symbol 0 appearing 4 times consecutively. Therefore, run-length encoding is a multi-symbol coding scheme, and each run can be further compressed using Huffman coding or other methods.

The most commonly used run-length encoding scheme is **Modified Huffman (MH) Coding**, which combines the advantages of run-length encoding and Huffman coding and is suitable for binary channels. MH coding divides consecutive symbols into two categories: short runs (length not exceeding 64) and long runs (length exceeding 64). For short runs, Huffman coding is used directly; for long runs, the run is decomposed into an integer multiple of 64 short runs plus a remaining short run, and each is encoded separately.

At the same time, it is stipulated that each line starts with a white run; if the first run of the current line is a black run, a white run of length 0 is added at the beginning of the line. Each line ends with an end-of-line code.
