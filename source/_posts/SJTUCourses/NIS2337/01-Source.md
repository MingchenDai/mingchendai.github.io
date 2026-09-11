---
title: "NIS2337 Information Theory Notes (1): Source and Information Entropy"
date: 2026-04-24 17:13:45
tags:
- Information Theory
- Notes
- SJTU Courses
mathjax: true
tikzjax: true
---

This section introduces the classification of sources and their mathematical models, and defines basic concepts such as self-information, mutual information, entropy, and relative entropy for both discrete and continuous sources.

<!--more-->

> Other parts of the **NIS2337 Fundamentals of Information Theory** course notes:
> 1. [Source and Information Entropy](/SJTUCourses/NIS2337/01-Source) (this article)
> 2. [Channel and Channel Capacity](/SJTUCourses/NIS2337/02-Channel)
> 3. [Rate-Distortion Function](/SJTUCourses/NIS2337/03-RateDistortion)
> 4. [Source Coding](/SJTUCourses/NIS2337/04-SourceCoding)
> 5. [Channel Coding](/SJTUCourses/NIS2337/05-ChannelCoding)
> 
> Supplementary information can be found in [Beyond 2337](/SJTUCourses/NIS2337/06-Appendix).

## Classification of Sources and Mathematical Models

```tikz
\usetikzlibrary{positioning, arrows.meta}
\begin{document}
\begin{tikzpicture}[
    node distance=1cm and 0.8cm,
    >=Stealth,
    block/.style={rectangle, draw, minimum width=1.2cm, minimum height=1.4cm, align=center}
]
\node[block] (source) {Source};
\node[block, right=of source] (source_enc) {Source\\Encoding};
\node[block, right=of source_enc] (enc) {Encryption};
\node[block, right=of enc] (chan_enc) {Channel\\Encoding};
\node[block, right=of chan_enc] (channel) {Channel};
\node[block, right=of channel] (chan_dec) {Channel\\Decoding};
\node[block, right=of chan_dec] (dec) {Decryption};
\node[block, right=of dec] (source_dec) {Source\\Decoding};
\node[block, right=of source_dec] (sink) {Sink};
\node[block, below=1.2cm of enc] (enc_key) {Encryption\\Key};
\node[block, below=1.2cm of channel, xshift=-0.5cm] (noise) {Noise Source};
\node[block, below=1.2cm of dec] (dec_key) {Decryption\\Key};
\node[below=0.6cm of chan_dec] (eav) {Eavesdropper};
\draw[->] (source) -- (source_enc);
\draw[->] (source_enc) -- (enc);
\draw[->] (enc) -- (chan_enc);
\draw[->] (chan_enc) -- (channel);
\draw[->] (channel) -- (chan_dec);
\draw[->] (chan_dec) -- (dec);
\draw[->] (dec) -- (source_dec);
\draw[->] (source_dec) -- (sink);
\draw[->] (enc_key) -- (enc);
\draw[->] (dec_key) -- (dec);
\draw[->] (noise.north) -- ([xshift=-0.5cm]channel.south);
\draw[->] ([xshift=0.5cm]channel.south) -- ++(0,-0.8cm) -- ++(0.8cm,0);
\end{tikzpicture}
\end{document}
```

A **single-symbol source** refers to a source that outputs one symbol at a time. Those with discrete amplitudes are called **single-symbol discrete sources**, while those with continuous amplitudes are called **single-symbol continuous sources**.

A single-symbol discrete source is typically described by the probability distribution of a random variable $X$, whose sample space is the source's symbol set $A=\\\{a_1,a_2,\ldots,a_n\\\}$.

$$
\left[\begin{matrix}X\\\\P\end{matrix}\right]=\left[\begin{matrix}a_1 & a_2 & \cdots & a_n\\\\P_X(a_1) & P_X(a_2) & \cdots & P_X(a_n)\end{matrix}\right]
$$

where $P_X(a_i)\geq 0$ and $\displaystyle\sum_{i=1}^n P_X(a_i)=1$.

A single-symbol continuous source is described by a probability density function $P_X(x)$, whose sample space is the set of real numbers:

$$
\left[\begin{matrix}X\\\\P\end{matrix}\right]=\left[\begin{matrix}(a,b)\\\\P_X(x)\end{matrix}\right]
$$

where $P_X(x)\geq 0$ and $\displaystyle\int_{-\infty}^{\infty}P_X(x)\mathrm{d}x=\int_a^b P_X(x)\mathrm{d}x=1$.

### Memoryless Symbol-Sequence Sources

A source emits a symbol sequence $\textbf{x}=(x_1,x_2,\ldots,x_n)$ at each instance, where each $x_i$ is a single-symbol source. It is often described by the joint probability density function $P_{\mathbf{X}}(\mathbf{x})$.

$$\left[\begin{matrix}\mathbf{X}\\\ P\end{matrix}\right]=
\left[\begin{matrix}(
    a_1,a_1,\ldots,a_1) &(a_1,a_1,\ldots,a_2) & \cdots & (a_n,a_n,\ldots,a_n)\\\\
    P_{\mathbf{X}}(a_1,a_1,\ldots,a_1) &P_{\mathbf{X}}(a_1,a_1,\ldots,a_2) & \cdots & P_{\mathbf{X}}(a_n,a_n,\ldots,a_n)\end{matrix}\right]$$

**Memoryless**. That is, for any $n$, $\displaystyle P_{\mathbf{X}}(\mathbf{x})=\prod_{i=1}^n P(x_i)$.

**Stationary**. The statistical properties of the sequence emitted by the source do not change with the shift of time.
- **Strictly stationary**: The joint probability distribution of the source output at any dimension does not vary with time. That is, for any $n$, $P(x_i=a_1,x_{i+1}=a_2,\ldots,x_{i+n-1}=a_n)=P(x_1=a_1,x_2=a_2,\ldots,x_n=a_n)$.
- **Weakly stationary**: The mean of the source output sequence is independent of the starting time; the covariance function depends only on the time interval and not on the starting time.

In a discrete memoryless source, if each symbol output by the source is statistically independent and shares the same probability space, then the source is called a discrete stationary memoryless source, also known as an **independent and identically distributed (i.i.d.) source**.

$$P_X(x_1)=P_X(x_2)=\cdots=P_X(x_n)$$
$$P(x_1,x_2,\ldots,x_n)=P_X(x_1)P_X(x_2)\cdots P_X(x_n)=[P(x)]^n$$

### Memory Symbol-Sequence Sources

Dependencies exist among symbols within a symbol sequence, but the sequences themselves are mutually independent.

$$
P(x_1,x_2,\ldots,x_n)= P_X(x_1)P_X(x_2|x_1)\cdots P_X(x_n|x_1,x_2,\ldots,x_{n-1})
$$

### Markov Sources

**Markov source**. When the memory length of a source is $m$, the symbol emitted at a given instant is correlated with at most $m$ preceding symbols and is independent of symbols further back. This is called an $m$-th order **Markov source**.

**Homogeneous Markov source**. For a first-order Markov source, we have $P(x_1,x_2,\ldots,x_n)=P_X(x_1)P_X(x_2|x_1)\cdots P_X(x_n|x_{n-1})$. If the above conditional transition probabilities are independent of the time origin, the source is called a **homogeneous Markov source**.

**State**. For an $m$-th order Markov source, the state $s_i$ is defined as the combination of the $m$ symbols preceding the $i$-th time instant, i.e., $s_i=(x_{i-m},\ldots,x_{i-1})$. The state space of an $m$-th order Markov source is $S=\\\{s_1,s_2,\ldots,s_{n^m}\\\}$.

#### State Transition Probabilities

For a general Markov source, the **state transition probability** from state $s_i$ at time $m$ to state $s_j$ at time $n$ is defined as:

$$
P_{ij}(m,n)=P(S_n=s_j|S_m=s_i)
$$

Typically, we are more concerned with the case $n=m+1$, and thus define the **one-step transition probability** or **basic transition probability** as:

$$
P_{ij}(m)=P(S_{m+1}=s_j|S_m=s_i)
$$

For a homogeneous Markov chain, the state transition probability depends only on the current state and is independent of time, i.e., $P_{ij}(m)=P_{ij}$. Clearly, $P_{ij}$ satisfies non-negativity and normalization.

Similarly, the **$k$-step transition probability** can be defined as:

$$
P_{ij}^{(k)}(m)=P(S_{m+k}=s_j|S_m=s_i)=P_{ij}^{(k)}
$$

More generally, for a homogeneous Markov source, the **Chapman-Kolmogorov equation** holds:

$$
P_{ij}^{(k)}=\sum_{r=1}^{n^m} P_{ir}^{(k-l)}P_{rj}^{(l)}
$$

> It should be clarified that **stationarity** means the probability distribution of the source output is independent of time; the probability distribution of the source output is identical regardless of the sampling time. In contrast, **homogeneous** means the transition probability distribution of the source is independent of time, but the probability distribution of the source output at different time instants may differ due to different preceding conditions. Therefore, homogeneity does not necessarily imply stationarity.
>
> For a stationary Markov source, since its output probability distribution is independent of time, its transition probability distribution is also independent of time. Hence, a stationary Markov source is necessarily homogeneous.

For an $m$-th order Markov source, the **state transition matrix** is an $n^m\times n^m$ matrix, where the element in the $i$-th row and $j$-th column is the transition probability from state $s_i$ to state $s_j$:

$$
\textbf{P}=\left[\begin{matrix}P_{11} & P_{12} & \cdots & P_{1n^m}\\\\
P_{21} & P_{22} & \cdots & P_{2n^m}\\\\
\vdots & \vdots & \ddots & \vdots\\\\
P_{n^m1} & P_{n^m2} & \cdots & P_{n^mn^m}\end{matrix}\right]
$$

Clearly, the sum of the elements in the $i$-th row equals 1, i.e., $\displaystyle\sum_{j=1}^{n^m} P_{ij}=1$; the sum of the elements in the $j$-th column does not necessarily equal 1.

Furthermore, the $k$-step transition probability matrix is the $k$-th power of the state transition matrix, i.e., $P^{(k)}=P^k$. Therefore, for a homogeneous Markov source, the $k$-step transition probabilities depend only on the single-step state transition matrix.

#### Stationary Distribution

Introducing the initial probability $p_{0i}=P(S_0=s_i)$, we have $p_j=\displaystyle\sum_{i}p_{0i}p_{ij}^{(k)}$. If $\displaystyle\lim_{k\rightarrow +\infty}P_{ij}^{(k)}=w_j$ exists, it is called the **stationary distribution**. At this point, the source reaches a steady state, where the probability distribution of all states is $w_j$ and is independent of the initial state.

Solving for $w_j$ directly from the definition is typically difficult. The stationary distribution is generally obtained by solving a system of $n^m+1$ equations derived from the limiting condition of state transitions:

$$
\begin{cases}
w_j=\displaystyle\sum_{i=1}^{n^m} w_i P_{ij} & j=1,2,\ldots,n^m\\\\
\displaystyle\sum_{j=1}^{n^m} w_j=1
\end{cases}
$$

In fact, the existence of a non-trivial solution to the above equations does not guarantee the existence of a stationary distribution. A stationary distribution requires the following conditions:

- The system of equations above has a solution;
- **Irreducible**: For any states $s_i$ and $s_j$, there exists a positive integer $k$ such that $P_{ij}^{(k)}>0$;
- **Aperiodic**: For any state $s_i$, among all positive integers $k$ such that $P_{ii}^{(k)}>0$, there is no common divisor greater than 1.

## Discrete Source Entropy and Mutual Information

### Self-Information

The **self-information** carried by a symbol $x_i$ with probability $p(x_i)$ is defined as:

$$
I(x_i)=-\log p(x_i)=\log\dfrac{1}{p(x_i)}
$$

> The unit of information depends on the base of the logarithm. Common units include bits (base 2) and nats (base $e$, natural logarithm).

Self-information is additive. Let two symbols $x_i,y_i$ occur jointly with probability $p(x_i,y_i)$:
- If $x_i$ and $y_i$ are independent, then $I(x_i,y_i)=I(x_i)+I(y_i)$.
- If $x_i$ and $y_i$ are dependent, define the **conditional self-information** $I(x_i|y_i)=-\log p(x_i|y_i)$. Then $I(x_i,y_i)=I(x_i|y_i)+I(y_i)=I(y_i|x_i)+I(x_i)<I(x_i)+I(y_i)$.

### Entropy

The **entropy** of a discrete source $X$ is defined as the average self-information of the source symbols:

$$H(X)=E[I(X)]=-\sum_{i=1}^n p(x_i)\log p(x_i)=\sum_{i=1}^n p(x_i)\log\dfrac{1}{p(x_i)}$$

- Entropy is non-negative.
- By convention, when $p(x_i)=0$, we set $p(x_i)\log p(x_i)=0$; for a **deterministic source**, i.e., $p(x_i)=1$, the entropy is $0$.

**Conditional entropy**. Let $X$ and $Y$ be two discrete sources. Conditional entropy is defined as the average self-information of $X$ given knowledge of $Y$:

$$H(X|Y)=-\sum_{i=1}^n\sum_{j=1}^m p(x_i,y_j)\log \dfrac{1}{p(x_i|y_j)}$$

**Joint entropy**. Let $X$ and $Y$ be two discrete sources. Joint entropy is defined as:

$$H(X,Y)=-\sum_{i=1}^n\sum_{j=1}^m p(x_i,y_j)\log \dfrac{1}{p(x_i,y_j)}$$

It is easy to see that $H(X,Y)=H(X)+H(Y|X)=H(Y)+H(X|Y)$.

### Mutual Information

**Mutual information**. Let $X$ and $Y$ be two discrete sources. The single-symbol mutual information is defined as:

$$I(x_i;y_j)=I(x_i)-I(x_i|y_j)=\log\dfrac{p(x_i|y_j)}{p(x_i)}$$

Single-symbol mutual information can be positive or negative. The **average mutual information** is defined as:

$$I(X;Y)=\sum_{i=1}^n\sum_{j=1}^m p(x_i,y_j)\log\dfrac{p(x_i|y_j)}{p(x_i)}=H(X)-H(X|Y)=H(Y)-H(Y|X)$$

Average mutual information can be viewed as a distance measure between the prior probability distribution $p(x_i)$ and the posterior probability distribution $p(x_i|y_j)$. If the posterior distribution exactly matches the prior, the information gained through this "verification" is zero; if they are completely different, then all information about $X$ is obtained through this "verification", i.e., $I(X;Y)=H(X)$.

```tikz
\begin{document}
\begin{tikzpicture}[font=\sffamily]
  \draw[thick] 
    (0, 2) % Top-left of H(X)
    .. controls (2, 2) and (3, 2.5) .. (3, 3.5) % Top outer curve
    -- (4, 3.5) % Top opening of H(X|Y)
    .. controls (4, 2.5) and (3.5, 1.5) .. (3, 1) % Top inner curve (split)
    -- (8, 1) % Top straight edge of H(Y)
    -- (8, -1) % Right opening of H(Y)
    .. controls (6, -1) and (5, -1.5) .. (5, -2.5) % Bottom outer curve
    -- (4, -2.5) % Bottom opening of H(Y|X)
    .. controls (4, -1.5) and (4.5, -0.5) .. (5, 0) % Bottom inner curve (merge)
    -- (0, 0) % Bottom straight edge of H(X)
    -- cycle; % Left opening of H(X)
  \node[left] at (0, 1) {$H(X)$};
  \node[right] at (8, 0) {$H(Y)$};
  \node[above] at (3.5, 3.5) {$H(X|Y)$ Equivocation};
  \node[below] at (4.5, -2.5) {$H(Y|X)$ Noise Entropy};
  \node[fill=white, inner sep=2pt] at (4, 0.5) {$I(X;Y)$};
  \draw[->, thick, dashed] (0.5, 0.5) -- (7.5, 0.5);
  \draw[->, thick, dashed] (0.5, 1.5) .. controls (2.5, 1.5) and (3.5, 2.5) .. (3.5, 3.2);
  
  % 3. Noise entropy flow (branches in from bottom -> bottom half of Y)
  \draw[->, thick, dashed] (4.5, -2.2) .. controls (4.5, -1) and (6.5, -0.5) .. (7.5, -0.5);

\end{tikzpicture}
\end{document}
```

The figure above illustrates the relationships among entropy, conditional entropy, and mutual information. Through the channel, the information we learn about $X$ is $I(X;Y)$, but at the same time, the noise $H(Y|X)$ in the channel is also introduced. Only $I(X;Y)$ of the total information in $X$ is transmitted through the channel; the remaining $H(X|Y)$ is the information that cannot be transmitted due to channel limitations, and is called the **equivocation**.

We now introduce **conditional mutual information**, which is the mutual information between $X$ and $Y$ given $Z$, defined as:

$$I(X;Y|Z)=\sum_{i=1}^n\sum_{j=1}^m\sum_{k=1}^l p(x_i,y_j,z_k)\log\dfrac{p(x_i|y_j,z_k)}{p(x_i|z_k)}=H(X|Z)-H(X|Y,Z)$$

Thus, the average mutual information on a three-dimensional joint set $H(X,Y,Z)$ can be defined as:

$$I(X;Y,Z)=I(X;Y)+I(X;Z|Y)$$
$$I(Y,Z;X)=I(Y;X)+I(Z;X|Y)$$

> With the introduction of three-variable mutual information, the notation for mutual information becomes somewhat confusing. When symbols such as $;$, $|$, and $,$ are mixed, the priority of the conditioning symbol $|$ is set to the highest, the comma $,$ to the second highest, and the semicolon $;$ to the lowest. That is, $I(X;Y,Z)$ denotes the mutual information between $X$ and $Y$ given $Z$; while $I(Y,Z;X)$ denotes the mutual information between $Y$ and $Z$ given $X$.

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.2, >=stealth]
    \tikzset{
        circ/.style={draw, very thick, fill=#1, fill opacity=0.3, text opacity=1}
    }
    \draw[circ=blue!30]   ( 0,  0)   circle (2) node[left=2.3]  {$H(X)$};
    \draw[circ=red!30]    ( 2.2, 1.5) circle (2) node[above=2.3] {$H(Y)$};
    \draw[circ=green!30]  ( 2.2,-1.5) circle (2) node[below=2.3] {$H(Z)$};
    \node at (-1.2, 0)    {$a_1$};
    \node at (3.0, 2.5)   {$a_2$};
    \node at (3.0, -2.5)  {$a_3$};
    \node at (0.8, 1.2)   {$a_4$};
    \node at (0.8, -1.2)  {$a_5$};
    \node at (2.6, 0)     {$a_6$};
    \node at (1.3, 0)     {$a_7$};
\end{tikzpicture}
\end{document}
```

In the figure, $a_1$ denotes $H(X|Y,Z)$; $a_2$ denotes $H(Y|X,Z)$; $a_3$ denotes $H(Z|X,Y)$; $a_4$ denotes $I(X;Y|Z)$; $a_5$ denotes $I(X;Z|Y)$; $a_6$ denotes $I(Y;Z|X)$; $a_7$ denotes $I(X;Y;Z)$.

### Changes in Information during Data Processing

#### Multi-stage Processing: Information Does Not Increase

Suppose the original information $X$ undergoes two stages of processing satisfying the Markov condition, ultimately yielding $Z$, i.e., $X\rightarrow Y\rightarrow Z$. Then:

$$
\begin{align*}
I(X;Y,Z) &= I(X;Y)+I(X;Z|Y) = I(X;Z)+I(X;Y|Z) \\\\
&\Rightarrow I(X;Z) = I(X;Y)+I(X;Z|Y)-I(X;Y|Z) \\\\
\end{align*}
$$

Since this processing forms a Markov chain, $X$ and $Z$ are conditionally independent given $Y$, i.e., $I(X;Z|Y)=0$. Therefore:

$$I(X;Z) = I(X;Y)-I(X;Y|Z)\leq I(X;Y)$$

That is, processing of information does not increase the amount of information.

> On the conditional independence of $X$ and $Z$ given $Y$:
>
> $$
> p(x,z|y)=\dfrac{p(x,y,z)}{p(y)}=\dfrac{p(z|x,y)p(x|y)p(y)}{p(y)}=p(z|x,y)p(x|y)=p(z|y)p(x|y)
> $$

Therefore, we can obtain some extended conclusions.

- If $X_1\to X_2\to \cdots X_n$ forms a Markov chain, then $X_n\to X_{n-1}\to \cdots X_1$ also forms a Markov chain, and $(X_1\to \cdots \to X_i)\to X_{i+1}\to \cdots \to X_n$ also forms a Markov chain.

```tikz
\begin{document}
\begin{tikzpicture}[x=1.2cm, y=1.2cm, very thick]
  \draw (-4.5, 0) -- (4.5, 0);
  \draw (-2.5, 0) -- (-1, 3) -- (0.5, 0);
  \draw (-1.5, 0) -- (0, 3) -- (1.5, 0);
  \draw (-0.5, 0) -- (1, 3) -- (2.5, 0);
  \node[above=0.1cm] at (-1, 3.2) {$X$};
  \node[above=0.1cm] at (0, 3.2) {$Y$};
  \node[above=0.1cm] at (1, 3.2) {$Z$};
  \node at (-1.5, 1.2) {$a_1$};
  \node at (-0.5, 1.2) {$a_2$};
  \node at (0, 0.4) {$a_3$};
  \node at (0, 1.8) {$a_4$};
  \node at (0.5, 1.2) {$a_5$};
  \node at (1.5, 1.2) {$a_6$};
\end{tikzpicture}
\end{document}
```

The information diagram of the Markov chain is shown above.

#### Multi-stage Observation: Information Does Not Decrease

Suppose the original information $X$ is observed $n$ times, yielding $Y_1,Y_2,\cdots,Y_n$. Then:

$$I(X;Y_1,Y_2,\cdots,Y_n)=I(X;Y_1)+I(X;Y_2|Y_1)+\cdots+I(X;Y_n|Y_1,Y_2,\cdots,Y_{n-1})\geq I(X;Y_1)$$

### Relative Entropy and Mutual Information

Relative entropy measures the dissimilarity between a random variable with true distribution $p(x)$ and a random variable with assumed distribution $q(x)$. The **relative entropy** (also known as the Kullback-Leibler divergence) between two probability density functions $p(x)$ and $q(x)$ is defined as:

$$D_{KL}(p\|q)=\sum_{x\in\mathcal{X}}p(x)\log\frac{p(x)}{q(x)}$$

In the above definition, we adopt the conventions $0\log\dfrac{0}{q(x)}=0$ and $p(x)\log\dfrac{p(x)}{0}=\infty$.

Relative entropy is **asymmetric**; its computation essentially treats $p(x)$ as the true distribution and uses it as the weight to compute a distance measure between $p(x)$ and $q(x)$.

For joint probability density functions $p(x,y)$ and $q(x,y)$, the **conditional relative entropy** $D_{KL}(p(y|x)\|q(y|x))$ is defined as:

$$D_{KL}(p(y|x)\|q(y|x))=\sum_{x\in\mathcal{X}}p(x,y)\log\frac{p(y|x)}{q(y|x)}$$

The non-negativity of relative entropy, i.e., $D_{KL}(p\|q)\geq 0$, with equality if and only if $p=q$, can be proved using Jensen's inequality.

By introducing relative entropy, we can reinterpret the definition of mutual information. For two discrete sources $X$ and $Y$, we can view their prior distribution as $p(x)p(y)$, i.e., assuming they are independent by default, and the learned posterior distribution as $p(x,y)$. Then the mutual information $I(X;Y)$ can be seen as the relative entropy from the default independent distribution to the learned dependent distribution, i.e.:

$$I(X;Y)=D_{KL}(p(x,y)\|p(x)p(y))$$

## Properties of Entropy

**Non-negativity**, **determinism**, and **symmetry** are obvious.

**Shannon's auxiliary theorem**. For any probability vectors $\mathbf{P}$ and $\mathbf{Q}$:

$$
\sum_{i=1}^n p_i\log\frac{1}{p_i}\leq\sum_{i=1}^n p_i\log\frac{1}{q_i}
$$

This verifies the non-negativity of relative entropy. It also shows that if we need to encode a source with probability distribution $\mathbf{P}$, the optimal coding scheme is based on the probability distribution $\mathbf{P}$, rather than on the probability distribution $\mathbf{Q}$.

**Maximum entropy principle**. For any probability vector $\mathbf{P}$:

$$H(X)\leq\log n$$

**Expansibility**. For any probability vector $\mathbf{P}$:

$$\lim_{\varepsilon\to 0}H(p_1,p_2,\cdots,p_{n-1},p_n-\varepsilon,\varepsilon)=H(p_1,p_2,\cdots,p_{n-1},p_n)$$

Although a source may have many possible values, if the probabilities corresponding to these values are very small (close to 0), the entropy of the source remains unchanged. That is, although low-probability events carry more information to the receiver, in terms of the mathematical expectation of information, the contribution of these events ultimately converges to 0 as the probability decreases.

**Additivity (Incrementality)**. For any probability vector $\mathbf{P}$:

$$H(p_1,p_2,\cdots,p_{n-1},q_1, q_2, \cdots, q_n)=H(p_1,p_2,\cdots,p_{n-1},p_n)+p_nH_m(\dfrac{q_1}{p_n}, \dfrac{q_2}{p_n}, \cdots, \dfrac{q_n}{p_n})$$

This property indicates that if one element in the original source is split into multiple elements, the entropy increases.

### Chain Rules

**Chain rule for entropy**. For any random variables $X_1,X_2,\cdots,X_n$ jointly distributed according to $p(x_1,x_2,\cdots,x_n)$:

$$H(X_1,X_2,\cdots,X_n)=\sum_{i=1}^n H(X_i|X_1,X_2,\cdots,X_{i-1})$$

**Chain rule for mutual information**. For any random variables $X_1,X_2,\cdots,X_n$ and $Y$ jointly distributed according to $p(x_1,x_2,\cdots,x_n,y)$:

$$I(X_1,X_2,\cdots,X_n;Y)=\sum_{i=1}^n I(X_i;Y|X_1,X_2,\cdots,X_{i-1})$$

**Chain rule for relative entropy**. For any random variables $X_1,X_2,\cdots,X_n$ and $Y$ jointly distributed according to $p(x_1,x_2,\cdots,x_n,y)$:

$$D_{KL}(p(x_1,x_2,\cdots,x_n,y)\|q(x_1,x_2,\cdots,x_n,y))=\sum_{i=1}^n D_{KL}(p(x_i|X_1,X_2,\cdots,X_{i-1},Y)\|q(x_i|X_1,X_2,\cdots,X_{i-1},Y))$$

### Convexity of Relative Entropy, Entropy, and Mutual Information

**Convexity of relative entropy**. For any probability vectors $\mathbf{P}$ and $\mathbf{Q}$, and any $\lambda\in[0,1]$:

$$
D\_{KL}(\lambda\mathbf{P}\_1+(1-\lambda)\mathbf{P}\_2\|\lambda\mathbf{Q}\_1+(1-\lambda)\mathbf{Q}\_2)\leq\lambda D\_{KL}(\mathbf{P}\_1\|\mathbf{Q}\_1)+(1-\lambda)D\_{KL}(\mathbf{P}\_2\|\mathbf{Q}\_2)
$$

> This can be proved using the log-sum inequality, by setting $a_1=\lambda p_1(x)$, $a_2=(1-\lambda)p_2(x)$, $b_1=\lambda q_1(y)$, $b_2=(1-\lambda)q_2(y)$.

**Concavity of entropy**. $H(p)$ is a concave function of the probability distribution $p$.

> This can be proved via the relative entropy between $p$ and the uniform distribution.

**Convexity/concavity of mutual information**. For any probability distributions $p(x)$ and $p(y|x)$, $I(X;Y)$ is a concave function of $p(x)$; for any probability distributions $p(x,y)$ and $p(x)p(y)$, $I(X;Y)$ is a convex function of $p(x|y)$.

### Fano's Inequality

For any estimator $\hat{X}$ satisfying $X\to Y\to \hat{X}$:

$$H(X|Y)\leq H(X|\hat{X}) \leq H(p_e)+p_e\log (|\mathcal{X}|-1)$$

where $p_e$ is the probability of estimation error and $\mathcal{X}$ is the alphabet of $X$.

Furthermore, the above inequality can be weakened to $H(X|Y)\leq 1+p_e\log |\mathcal{X}|$.

Corollary: For any two random variables $X$ and $Y$:

$$H(X|Y)\leq H(p_e)+p_e\log |\mathcal{X}|$$

where $p_e$ is the error probability between $X$ and $Y$, i.e., $p_e=P(X\neq Y)$.

If $X$ and $Y$ are independent and identically distributed random variables:

$$P(X=Y)=\sum_i p(x_i)^2=\sum_i p(x_i)2^{\log p(x_i)}\geq 2^{-H(X)}$$

If they are not independent and identically distributed, let the symbol distributions of $X$ and $Y$ be $p(x)$ and $r(y)$, respectively:

$$P(X=Y)\geq 2^{-H\(p\)-D(p\|r)} \quad P(X=Y)\geq 2^{-H\(r\)-D(r\|p)}$$

## Entropy of Discrete Sequence Sources

### Entropy of Discrete Memoryless Sources

Assume the random sequence output by the source is $\mathbf{X}=(X_1,X_2,\cdots,X_L)$, where each single-symbol variable in the sequence $X_i\in\\\{x_1,x_2,\cdots,x_n\\\}$. The sequence entropy of the source is defined as:

$$H(\mathbf{X})=-\sum_{i=1}^L\sum_{j=1}^L\cdots\sum_{k=1}^L P(x_i,x_j,\cdots,x_k)\log P(x_i,x_j,\cdots,x_k)=-p(\vec{x}_i)\log p(\vec{x}_i)$$

where $\vec{x}_i$ denotes the $i$-th possible value of the sequence $\mathbf{X}$, i.e., $i\in\\\{1,2,\cdots,n^L\\\}$.

When the sequence satisfies the memoryless condition, $\displaystyle H(\mathbf{X})=\sum_{i=1}^L H(X_i)$. When the sequence is stationary, $\displaystyle H(\mathbf{X})=L\cdot H(X)$; in this case, the average entropy per symbol is $H_L(\mathbf{X})=H(X)$.

### Entropy of Discrete Sources with Memory

For discrete sources with memory, the concept of conditional entropy must be introduced, and meaningful conclusions can only be drawn in some special cases.

If the source outputs a symbol sequence $\mathbf{X}=(X_1,X_2,\cdots,X_L)$ of length $L$, its entropy is:

$$H(\mathbf{X})=H(X_1)+H(X_2|X_1)+\cdots+H(X_L|X_1,X_2,\cdots,X_{L-1})=LH_L(\mathbf{X})$$

Concerning $H_L(\mathbf{X})$, there are some interesting conclusions. In the following derivations, denote a symbol sequence of length $L$ as $X^L$.

- **$H(X_L|X^{L-1})$ is monotonically non-increasing**: $H(X_L|X^{L-1})=H(X_L|X_1,X_2,\cdots,X_{L-1})\leq H(X_L|X_2,\cdots,X_{L-1})=H(X_{L-1}|X_1,X_2,\cdots,X_{L-2})=H(X_{L-1}|X^{L-2})$;
- **$H_L(\mathbf{X})$ is monotonically non-increasing**: $H_L(\mathbf{X})=\dfrac{1}{L}\left[H(X_L|X^{L-1})+H(X^{L-1})\right]=\dfrac{1}{L}\left[H(X_L|X^{L-1})+(L-1)H_{L-1}(X^{L-1})\right]\leq \dfrac{L-1}{L}H_{L-1}(X^{L-1})\leq H_{L-1}(X^{L-1})$.

That is, for a sequence source with memory, the longer the message sequence length $L$, the smaller the incremental entropy, and the smaller the average entropy per symbol. Therefore, the **entropy rate** is defined as:

$$H_\infty(\mathbf{X})=\lim_{L\to\infty} H_L(\mathbf{X})=\lim_{L\to\infty} H(X_L|X^{L-1})$$

For a finite-length sequence source with memory, the sequence entropy $H(\mathbf{X})$ and the average entropy per symbol $H_L(\mathbf{X})$ only account for the correlation among the $L$ symbols, while the correlation between symbol sequences is neglected. This is clearly inadequate for practical applications.

In reality, considering that the source continuously emits signals, the statistical dependencies among symbols extend infinitely far. Hence, the entropy rate $H_\infty(\mathbf{X})$ is the true entropy of a source with memory.

However, solving the probability distribution in infinite dimensions is a rather difficult task. When the above source satisfies the $m$-th order Markov property, we have:

$$\begin{align*}
H_\infty(\mathbf{X})&=\lim_{L\to\infty} H(X_L|X^{L-1})\\\\ 
&=\lim_{L\to\infty}H(X_L|X_{L-1},X_{L-2},\cdots,X_1)\\\\
&=\lim_{L\to\infty} H(X_L|X_{L-1}, X_{L-2}, \cdots, X_{L-m})\\\\
&=H(X_{m+1}|X_m,\cdots,X_1)
\end{align*}$$

That is, the entropy rate of an $m$-th order Markov source equals its conditional entropy, which is very useful in engineering.

The average symbol entropy of a Markov source is:

$$H(X)=\sum_{i=1}^{n^m} p(s_i) H(X|S=s_i)$$

## Entropy of Continuous Sources

The entropy of a continuous source, i.e., the **differential entropy**, is defined as:

$$H(X)=-\int_{-\infty}^{\infty} p(x)\log p(x) \mathrm{d}x$$

The physical meaning of the entropy of a continuous source is different from that of a discrete source. The uncertainty of a continuous source should be infinite; however, the definition of **differential entropy** takes into account that practical problems often involve the difference between the entropies of different continuous sources (mutual information). Therefore, the infinite term in the definition cancels out in the difference calculation.

Consequently, the entropy of a continuous source is **relative** -- the physical meaning of information (such as non-negativity) only emerges when taking the difference between two entropies.

The definitions of **joint differential entropy** and **conditional differential entropy** are given below:

$$H(X,Y)=-\int_{-\infty}^{\infty}\int_{-\infty}^{\infty} p(x,y)\log p(x,y) \mathrm{d}x\mathrm{d}y$$
$$H(X|Y)=-\int_{-\infty}^{\infty}\int_{-\infty}^{\infty} p(x,y)\log p(x|y) \mathrm{d}x\mathrm{d}y$$

It can be shown that the relationship between joint differential entropy and conditional differential entropy is analogous to that in the discrete case:

$$H(X,Y)=H(X)+H(Y|X)$$

Thus, the **mutual information for continuous sources** can be defined as:

$$I(X;Y)=H(X)-H(X|Y)$$

### Entropy of Waveform Sources

In practical systems, the input and output are often not continuous single-symbol sources, but rather waveforms that are continuous in amplitude, time, and frequency. Stationary random processes $x(t)$ and $y(t)$ can be used to describe the input and output.

For a stationary random process, through sampling (refer to the relevant content on the sampling theorem in [Signals and Systems: Applications of Fourier Transform](/SJTUCourses/ICE2501/06-FT-Applications)), it can be transformed into a stationary random sequence that is discrete in time or frequency but continuous in amplitude (i.e., a mapping from a discrete set to a continuous interval), describing the input and output.

Let the stationary random vectors $\mathbf{X}=(X_1,X_2,\cdots,X_n)$ and $\mathbf{Y}=(Y_1,Y_2,\cdots,Y_n)$ be the input and output random sequences, respectively. Their continuous entropy and continuous conditional entropy are defined as:

$$H(\mathbf{X})=H(X_1,X_2,\cdots,X_n)=-\int_{\mathbf{R}^n} p(\vec{x})\log p(\vec{x}) \mathrm{d}\vec{x}$$
$$H(X|Y)=H(X_1,X_2,\cdots,X_n|Y_1,Y_2,\cdots,Y_n)=-\int_{\mathbf{R}^n} \int_{\mathbf{R}^n} p(\vec{x},\vec{y})\log p(\vec{x}|\vec{y}) \mathrm{d}\vec{x}\mathrm{d}\vec{y}$$

For random waveform sources, the definitions of entropy and conditional entropy can be introduced by taking the limit of the above definitions:

$$H(x(t))=\lim_{n\to\infty} H(\mathbf{X})$$
$$H(y(t)|x(t))=\lim_{n\to\infty} H(\mathbf{Y}|\mathbf{X})$$

According to the sampling theorem, for a signal with bandwidth $f_m$ and duration $t_B$, a $2f_m t_B$-dimensional vector can be used for representation. This converts a continuous-time process with both limited bandwidth and limited duration into a finite-dimensional, time-discrete stationary random sequence, whose entropy and conditional entropy can be determined using the definitions from the preceding sections.

### Maximum Entropy Theorems

A continuous source has different maximum entropies under different constraints. For example, without any constraints, the entropy is infinite. In practical applications, certain constraints are typically imposed, such as **peak-power-limited source output** (i.e., peak amplitude constraint) or **average-power-limited source output** (i.e., average power constraint).

Under the peak-power constraint, the **maximum entropy theorem for peak-power-limited sources** states: among continuous sources satisfying a peak-power constraint, the probability density function that achieves maximum entropy is the **uniform distribution**.

Under the average-power constraint, the **maximum entropy theorem for average-power-limited sources** states: among continuous sources satisfying an average-power constraint, the probability density function that achieves maximum entropy is the **Gaussian distribution**.

## Source Redundancy

Let the entropy rate of a general stationary source be $H_\infty(\mathbf{X})$. Its redundancy is defined as:

$$R=1-\frac{H_\infty(\mathbf{X})}{H_\text{max}(\mathbf{X})}$$

where $H_{max}(\mathbf{X})$ is the maximum possible entropy of the source.

That is, under ideal conditions (i.e., infinitely long messages), the channel only needs to transmit information at a rate of $H_\infty(\mathbf{X})$. However, because the probability distribution of the information cannot be fully known or is too complex, the actual transmission capacity needs to reach $H_\text{max}(\mathbf{X})$.

The subsequent chapters on **Source Coding** and **Channel Coding** are closely related to redundancy. Source coding aims to improve coding schemes to eliminate redundancy, while channel coding aims to improve coding schemes to exploit redundancy for resisting channel noise.
