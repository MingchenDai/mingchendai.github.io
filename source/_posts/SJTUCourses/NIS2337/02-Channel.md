---
title: "NIS2337 Information Theory Notes (2): Channel and Channel Capacity"
date: 2026-04-24 17:13:46
tags:
- Information Theory
- Notes
- SJTU Courses
mathjax: true
tikzjax: true
---

The concept and properties of channels, and channel capacity.

<!--more-->

> **NIS2337 Foundations of Information Theory** course notes — other chapters:
> 1. [Source and Information Entropy](/SJTUCourses/NIS2337/01-Source)
> 2. [Channel and Channel Capacity](/SJTUCourses/NIS2337/02-Channel) (this article)
> 3. [Rate-Distortion Function](/SJTUCourses/NIS2337/03-RateDistortion)
> 4. [Source Coding](/SJTUCourses/NIS2337/04-SourceCoding)
> 5. [Channel Coding](/SJTUCourses/NIS2337/05-ChannelCoding)
> 
> Some supplementary materials can be found in [Beyond 2337](/SJTUCourses/NIS2337/06-Appendix).

## Basic Concepts of Channels

### Mathematical Model of a Channel

- Channel input: $\vec{X} = (x_1, x_2, \dots, x_i, \dots)$, where $x_i \in A = \\{a_1, a_2, \dots, a_n\\}$
- Channel output: $\vec{Y} = (y_1, y_2, \dots, y_j, \dots)$, where $y_j \in B = \\{b_1, b_2, \dots, b_m\\}$

The dependence between input and output is usually described by the conditional probability (transition probability) $P(\vec{Y}|\vec{X})$.

#### Noiseless Channel

$\vec{Y} = f(\vec{X})$; knowing the input $\vec{X}$ uniquely determines the output $\vec{Y}$.

$$P(\vec{Y}|\vec{X}) = 
\begin{cases} 
1, & \vec{Y} = f(\vec{X}) \\\\ 
0, & \vec{Y} \neq f(\vec{X}) 
\end{cases}$$

#### Discrete Memoryless Channel with Interference

There is no deterministic relationship between channel output and input, but the transition probability satisfies $P(\vec{Y}|\vec{X}) = p(y_1|x_1)p(y_2|x_2)\dots p(y_i|x_i)$. This simplifies the problem: it suffices to analyze the single-symbol transition probability $p(y_j|x_i)$.

##### Binary Symmetric Channel

The Binary Symmetric Channel (BSC) is the simplest discrete memoryless channel model, where both input and output are binary symbols.

```tikz
\begin{document}
\begin{tikzpicture}[>=latex]
    \node (in0) at (0, 3) {0};
    \node (in1) at (0, 0) {1};
    \node (out0) at (3.5, 3) {0};
    \node (out1) at (3.5, 0) {1};
    \node at (0, 1.5) {$X$};
    \node at (3.5, 1.5) {$Y$};
    \draw[->] (in0) -- (out0) node[midway, above] {$1-p$};
    \draw[->] (in1) -- (out1) node[midway, below] {$1-p$};
    \draw[->] (in0) -- (out1) node[pos=0.18, below left=1pt] {$p$};
    \draw[->] (in1) -- (out0) node[pos=0.18, above left=1pt] {$p$};
\end{tikzpicture}
\end{document}
```

- Channel input: $X \in A = \\{0, 1\\}$
- Channel output: $Y \in B = \\{0, 1\\}$

Here, $P(Y=0|X=1) = P(Y=1|X=0) = p$, i.e., the error probability; $P(Y=1|X=1) = P(Y=0|X=0) = 1-p$. The transition probability matrix is readily obtained as:

$$P = \begin{bmatrix} 1-p & p \\\\ p & 1-p \end{bmatrix}$$

##### Discrete Memoryless Channel

A Discrete Memoryless Channel (DMC) refers to a memoryless channel whose input and output alphabets each have more than two symbols but are finite. The BSC is a special case of the DMC.

```tikz
\begin{document}
\begin{tikzpicture}[>=stealth, node distance=3cm, auto]
  \node (a1) at (0, 2.5) {$a_1$};
  \node (a2) at (0, 1.0) {$a_2$};
  \node (ai) at (0, -0.5) {$\vdots$};
  \node (an) at (0, -2.5) {$a_n$};
  \node (b1) at (3.5, 2.5) {$b_1$};
  \node (b2) at (3.5, 1.0) {$b_2$};
  \node (bj) at (3.5, -1.0) {$\vdots$};
  \node (bm) at (3.5, -2.5) {$b_m$};
  \draw[->] (a1) -> (b1) ;
  \draw[->] (a1) -> (b2);
  \draw[->, densely dotted] (a1) -> (bm);
  \draw[->] (a2) -> (b1);
  \draw[->] (a2) -> (b2);
  \draw[->, densely dotted] (a2) -> (bm);
  \draw[->, densely dotted] (an) -> (b1);
  \draw[->, densely dotted] (an) -> (b2);
  \draw[->] (an) -> (bm) node[midway, below, xshift=2pt] {$p(b_m|a_n)$};
  \node at (-0.8, 0) {$X$};
  \node at (4.3, 0) {$Y$};
\end{tikzpicture}
\end{document}
```

- Channel input: $X \in \\{a_1, a_2, \dots, a_n\\}$;
- Channel output: $Y \in \\{b_1, b_2, \dots, b_m\\}$.

The transition probability matrix is readily obtained as:

$$P = [p(b\_j|a\_i)] = [p\_{ij}]\_{n \times m} = \begin{bmatrix} p\_{11} & p\_{12} & \dots & p\_{1m} \\\\ \vdots & \vdots & \ddots & \vdots \\\\ p\_{n1} & p\_{n2} & \dots & p\_{nm} \end{bmatrix}$$

where, from the normalization condition of probabilities, $\displaystyle \sum_{j=1}^{m} p(b_j|a_i) = 1, \quad i = 1, 2, \dots, n$.

##### Discrete-Input, Continuous-Output Channels

Suppose the channel input symbols are chosen from a finite discrete input alphabet, while the channel output is unquantized and can take any value on the real axis. Such a channel is defined as a **discrete-time memoryless channel**. Its characteristics are described by the discrete input $X$, the continuous output $Y$, and a family of conditional probability density functions $p_Y(y|a_i)$.

The most important channel of this type is the Additive White Gaussian Noise Channel (AWGN), whose mathematical expression is $Y = X + G$, where $G$ is white Gaussian noise satisfying $G \sim \mathcal{N}(0, \sigma^2)$. When $X=a_i$ is given, $Y\sim \mathcal{N}(a_i, \sigma^2)$.

$$
p_Y(y|a_i) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left[-\frac{(y-a_i)^2}{2\sigma^2}\right]
$$

##### Waveform Channels

When both the input and output of a channel are random processes $\\{x(t)\\}$ and $\\{y(t)\\}$, the channel is called a **waveform channel**. Real-world channels are all waveform channels.

We cannot directly perform probabilistic analysis on continuous-time channels. However, under practical conditions **the channel bandwidth is limited**, so within a finite sampling interval $t_0$, the stationary random process channel can be discretized into $L=2ft_0$ time-discrete, stationary random sequences $\vec{X}=(x_1,x_2,\dots,x_L)$ and $\vec{Y}=(y_1,y_2,\dots,y_L)$, thereby converting the waveform channel into a multi-dimensional continuous channel.

The channel transition probability density function is:

$$p_Y(\vec{y}|\vec{x}) = p_Y(y_1, y_2, \dots, y_L | x_1, x_2, \dots, x_L)$$

The normalization condition is:
$$\int_R p_Y(\vec{y}|\vec{x}) \, \mathrm{d}\vec{y} = 1$$

A **continuous memoryless channel** is a multi-dimensional continuous channel that satisfies $\displaystyle p_Y(\vec{y}|\vec{x}) = \prod_{i=1}^L p_Y(y_i|x_i)$, meaning the output variable at any given time depends only on the corresponding input variable and is independent of past inputs and outputs. If this condition is not satisfied, it is called a **continuous channel with memory**.

Based on how noise affects the signal in the channel, noise can be divided into two types: **additive** and **multiplicative**, i.e., noise is added to or multiplied with the input signal. We focus on single-symbol channels with additive noise, $y(t) = x(t) + n(t)$. Since $n$ is independent of $x$:

$$p_{X,Y}(x,y) = p_{X,n}(x,n) = p_X(x)p_n(n)$$

$$p_Y(y|x) = \frac{p_{X,Y}(x,y)}{p_X(x)} = \frac{p_{X,n}(x,n)}{p_X(x)} = p_n(n)$$

The channel transition probability density function equals the probability density function of the noise. Now consider the conditional entropy $H_c(Y|X)$, also called the **noise entropy**:

$$\begin{aligned}
H_c(Y|X) &= -\iint_R p_{X,Y}(x,y) \log p_Y(y|x) \, \mathrm{d}x \mathrm{d}y \\\\
&= -\int_R p_X(x) \, \mathrm{d}x \int_R p_Y(y|x) \log p_Y(y|x) \, \mathrm{d}y \\\\
&= -\int_R p_n(n) \log p_n(n) \, \mathrm{d}n \\\\
&= H_c(n)
\end{aligned}$$

In a multi-dimensional continuous additive channel, $\vec{Y} = \vec{X} + \vec{n}$. Similarly, $p_{\vec{Y}}(\vec{y}|\vec{x}) = p_n(\vec{n})$ and $H_c(\vec{Y}|\vec{X}) = H_c(\vec{n})$.

### Definition of Channel Capacity

**Information Transmission Rate per Symbol**. The **information transmission rate** $R$ of a channel is defined as the amount of information transmitted per symbol on average:

$$R = I(X;Y) = H(X) - H(X|Y) = H(Y) - H(Y|X) \quad (\text{bit/symbol})$$

**Information Transmission Rate per Unit Time**. Let $T$ be the average transmission time per symbol; define the **information transmission rate per unit time** as:

$$R_t = \frac{R}{T} = \frac{I(X;Y)}{T} \quad (\text{bit/s})$$

**Channel Capacity**. $I(X;Y)$ is a function of the input symbol probability distribution $p(a_i)$ and the channel transition probabilities $p(b_j|a_i)$. For a given channel, $p(b_j|a_i)$ is fixed, and $I(X;Y)$ is a convex-cap function of $p(a_i)$. Therefore, one can find a probability distribution $p(a_i)$ that maximizes $I(X;Y)$. This maximum value is the **channel capacity**:

$$C = \max_{p(a_i)} I(X;Y) \quad (\text{bit/symbol})$$

> If the symbol transmission period is $T$, the **channel capacity per unit time** is $C_t = C/T \ (\text{bit/s})$.

For a fixed-parameter channel, the channel capacity is a constant. Whether the maximum transmission capability can be achieved in practice depends on the probability distribution at the input. For time-varying channel parameters, the channel characteristics change over time and cannot be represented by a fixed value. In such cases, **average capacity** and **outage capacity** are commonly used.

**Redundancy**. Absolute channel redundancy: $C - I(X;Y)$; relative redundancy: $\displaystyle 1 - \frac{I(X;Y)}{C}$

## Discrete Single-Symbol Channels and Their Capacity

### Noiseless Discrete Channels

Assume channel input $X \in \\{a_1, a_2, \dots, a_n\\}$ and channel output $Y \in \\{b_1, b_2, \dots, b_m\\}$.

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.2]
    \tikzstyle{node} = [circle, fill, inner sep=1.8pt]
    \tikzstyle{edge_label} = [midway, above, font=\small, shift={(0,1pt)}]
    \node (X) at (0, 3.5) {$X$};
    \node (Y) at (3, 3.5) {$Y$};
    \node[node] (x1) at (0, 3) {};
    \node[node] (y1) at (3, 3) {};
    \node[node] (x2) at (0, 2) {};
    \node[node] (y2) at (3, 2) {};
    \node[node] (x3) at (0, 0) {};
    \node[node] (y3) at (3, 0) {};
    \draw (x1) -- (y1) node[edge_label] {$1$};
    \draw (x2) -- (y2) node[edge_label] {$1$};
    \draw (x3) -- (y3) node[edge_label] {$1$};
    \node at (0, 1.1) {\vdots};
    \node at (1.5, 1.1) {\vdots};
    \node at (3, 1.1) {\vdots};
\end{tikzpicture}
\end{document}
```

- **Noiseless and Lossless Channel**: $X$ and $Y$ are in one-to-one correspondence, as shown in the figure above. In this case, the conditional probability matrix is the **identity matrix**, so $H(Y|X) = H(X|Y) = 0$ and $I(X;Y) = H(X) = H(Y)$. When the input symbols are equally likely, $I(X;Y)$ is maximized:

$$C = \max_{p(a_i)} I(X;Y) = \max_{p(a_i)} H(X) = \log n$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.2]
    \tikzstyle{node} = [circle, fill, inner sep=1.8pt]
    \tikzstyle{edge_label} = [pos=0.4, above, font=\small, inner sep=1pt, shift={(0,1pt)}]
    \node (X) at (0, 3.5) {$X$};
    \node (Y) at (3, 3.5) {$Y$};
    \node[node] (x1_1) at (0, 3) {};
    \node[node] (x1_2) at (0, 2.5) {};
    \node[node] (x1_3) at (0, 2) {};
    \node[node] (y1) at (3, 2.5) {};
    \draw (x1_1) -- (y1) node[edge_label] {$1$};
    \draw (x1_2) -- (y1) node[edge_label] {$1$};
    \draw (x1_3) -- (y1) node[edge_label] {$1$};
    \node[node] (x2_1) at (0, 1) {};
    \node[node] (x2_2) at (0, 0.5) {};
    \node[node] (y2) at (3, 0.75) {};
    \draw (x2_1) -- (y2) node[edge_label] {$1$};
    \draw (x2_2) -- (y2) node[edge_label] {$1$};
\end{tikzpicture}
\end{document}
```

- **Noiseless but Lossy Channel**: Multiple inputs map to a single output, as shown in the figure above. Under this condition, the noise entropy $H(Y|X)=0$, but the equivocation $H(X|Y) \neq 0$. Consequently, $H(X)\geq H(Y)$.
$I(X;Y) = H(X) - H(X|Y) = H(Y) - H(Y|X) = H(Y)$

$$C = \max_{p(a_i)} I(X;Y) = \max_{p(a_i)} H(Y) = \log m$$

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.2]
    \tikzstyle{node} = [circle, fill, inner sep=1.8pt]
    \tikzstyle{edge_label} = [pos=0.6, above, font=\small, inner sep=1pt, shift={(0,1pt)}]
    \node (X) at (0, 3.5) {$X$};
    \node (Y) at (3, 3.5) {$Y$};
    \node[node] (x1) at (0, 2.5) {};
    \node[node] (y1_1) at (3, 3) {};
    \node[node] (y1_2) at (3, 2.5) {};
    \node[node] (y1_3) at (3, 2) {};
    \draw (x1) -- (y1_1) node[edge_label] {$1$};
    \draw (x1) -- (y1_2) node[edge_label] {$1$};
    \draw (x1) -- (y1_3) node[edge_label] {$1$};
    \node[node] (x2) at (0, 0.75) {};
    \node[node] (y2_1) at (3, 1) {};
    \node[node] (y2_2) at (3, 0.5) {};
    \draw (x2) -- (y2_1) node[edge_label] {$1$};
    \draw (x2) -- (y2_2) node[edge_label] {$1$};
\end{tikzpicture}
\end{document}
```

- **Noisy but Lossless Channel**: A single input maps to multiple outputs. Under this condition, the equivocation $H(X|Y) = 0$, but the noise entropy $H(Y|X) \neq 0$. Consequently, $H(X)\leq H(Y)$.

$$C = \max_{p(a_i)} I(X;Y) = \max_{p(a_i)} H(X) = \log n$$

### Symmetric Discrete Memoryless Channels

The simplest type of DMC is the **symmetric channel**. For a transition probability matrix $\mathbf{P}$:
- If every row is a permutation of the first row, the matrix is said to be **input-symmetric**;
- If every column is a permutation of the first column, the matrix is said to be **output-symmetric**;
- If it is both input-symmetric and output-symmetric, the matrix is said to be **input-output symmetric**, and the corresponding channel is called a **symmetric DMC channel**.

Due to symmetry:

$$\begin{aligned}
H(Y|X) &= -\sum_{i,j} p(a_i) p(b_j|a_i) \log p(b_j|a_i) \\\\
&= -\sum_i p(a_i) \sum_j p(b_j|a_i) \log p(b_j|a_i) \\\\
&= -\sum_j p(b_j|a_i) \log p(b_j|a_i) = H(Y|a_i) \quad (i=1, 2, \dots, n)
\end{aligned}$$

That is, the conditional entropy of a symmetric discrete memoryless channel is independent of the input probability distribution of the source.

$$C = \max_{p(a_i)} I(X;Y) = \max_{p(a_i)} [H(Y) - H(Y|a_i)] = \max_{p(a_i)} H(Y) - H(Y|a_i)$$

If the input symbols are equally likely, i.e., $p(a_i) = 1/n$, then $p(b_j) = 1/m$ (equally likely), and $H(Y)$ attains its maximum value $\log m$.

$$C = \log m - H(Y|a_i)$$

**Discrete memoryless additive modulo-$K$ channel**, as shown in the figure below. The input symbol set $X$ and output symbol set $Y$ of this channel are both residue classes modulo $K$, and they satisfy $Y = (X + Z) \mod K$, where $Z$ is a noise variable independent of $X$ and follows some probability distribution.

```tikz
\begin{document}
\begin{tikzpicture}[>=latex]
  \node (X) at (0,0) {$X$};
  \node[draw, circle, inner sep=1pt, minimum size=0.5cm] (adder) at (1.5,0) {$+$};
  \node (Y) at (3,0) {$Y$};
  \node (Z) at (1.5,1.5) {$Z$};
  \draw[->] (X) -- (adder);
  \draw[->] (Z) -- (adder);
  \draw[->] (adder) -- (Y);
\end{tikzpicture}
\end{document}
```

Thus, for this channel, we have:

$$
\begin{align*}
C &=I(X;Y)=H(Y)-H(Y|X)\\\\
&= H(Y)-\sum_{i}p(x)p(y|x)\log p(y|x)\\\\
&= H(Y)-\sum_{i}p(x)p(z)\log p(z)\\\\
&= \log K -H(Z)
\end{align*}
$$

### Quasi-Symmetric Discrete Memoryless Channels

A **quasi-symmetric discrete memoryless channel** is a discrete memoryless channel whose transition probability matrix is input-symmetric but not output-symmetric. Since it is input-symmetric, $H(Y|X) = H(Y|a_i)$ still holds. Because the columns contain different elements, the input and output probability distributions may differ, so $H(Y) \le \log m$.

$$C \le \log m - H(Y|a_i)$$

**Matrix Decomposition Method**. When the transition matrix can be decomposed into several symmetric sub-matrices, it can be shown that channel capacity is achieved when the input is uniformly distributed:

$$C = \log n - H(p_1', p_2', \dots, p_m') - \sum_{k=1}^r N_k \log M_k$$

where $n$ is the number of input symbols, $\\{p_j'\\}$ are the elements of one row, $N_k$ is the sum of row elements in the $k$-th sub-matrix, $M_k$ is the sum of column elements in the $k$-th sub-matrix, and $r$ is the number of sub-matrices.

### General Discrete Memoryless Channels

**Blahut-Arimoto Algorithm**. The necessary and sufficient conditions (**KKT conditions**) for maximizing $I(X;Y)$ with respect to the input symbol probability set $\\{p(a_i)\\}$ are:
- For all $p(a_i) > 0$, $I(a_i;Y) = C$
- For all $p(a_i) = 0$, $I(a_i;Y) \le C$

where $\displaystyle I(a_i; Y) = \sum_j p(b_j|a_i) \log \frac{p(b_j|a_i)}{p(b_j)}$.

That is, if a symbol $a_i$ provides more than the average mutual information about $Y$, we can more fully utilize this symbol (increase its probability of occurrence) to increase $I(X;Y)$. However, doing so also changes the input distribution, reducing the average mutual information of that symbol while increasing that of other symbols. Through continuous adjustment, the outcome is that each symbol that actually occurs eventually provides the same amount of average mutual information.

The algorithm only establishes the existence of $C$ but does not provide a specific path to approach this limit. Moreover, the optimal distribution may not be unique; it need only satisfy the above conditions.

## Discrete Sequence Channels and Their Capacity

- Input symbol sequence: $\vec{X} = (X_1, X_2, \dots, X_L)$
- Output symbol sequence: $\vec{Y} = (Y_1, Y_2, \dots, Y_L)$

The transition probability of a memoryless discrete sequence channel depends only on the current input. That is:

$$p(\vec{y}|\vec{x}) = \prod_{i=1}^L p(y_i|x_i)$$

If the channel is stationary, then $\displaystyle p(\vec{y}|\vec{x}) = p^L(y|x)$.

- If the channel is memoryless, then $\displaystyle I(\vec{X};\vec{Y}) \le \sum_{i=1}^L I(X_i;Y_i)$
- If the input vector components are independent, then $\displaystyle I(\vec{X};\vec{Y}) \ge \sum_{i=1}^L I(X_i;Y_i)$

If the input components are independent and the channel is memoryless, the above two properties become equalities. When the input vector achieves the optimal distribution, the channel capacity is maximized:

$$C_L = \max_{p(x)} I(\vec{X};\vec{Y}) = \sum_{i=1}^L C_i$$

When the channel is stationary, $C_L = L C_1$.

If $L$ channels are connected in parallel, with each channel output $Y_l$ depending only on its corresponding input $X_l$, we have:

$$I(\vec{X};\vec{Y}) \leq \sum_{l=1}^L I(X_l;Y_l)$$

Only when the input vector components are mutually independent and the channel is memoryless do we have $\displaystyle C = \sum_{l=1}^L C_l$.

## Continuous Channels and Their Capacity

### Continuous Single-Symbol Additive Channel

```tikz
\begin{document}
\begin{tikzpicture}[>=latex]
  \node[draw, rectangle, minimum width=1.5cm, minimum height=1cm] (channel) at (3,0) {Channel};
  \node[above=0.1cm] at (channel.north) {$p(y|x)$};
  \draw[->] (0.5,0) -- (channel.west);
  \node[above] at (1,0) {$x(x \in \mathbf{R})$};
  \draw[->] (channel.east) -- (5.5,0);
  \node[above] at (5,0) {$y(y \in \mathbf{R})$};
  \draw[->] (3,-1.5) -- (channel.south);
  \node[right] at (3,-1.2) {$n$};
\end{tikzpicture}
\end{document}
```

The most common continuous channel is the **continuous single-symbol channel with continuous amplitude**, as shown in the figure above. Both the input and output are one-dimensional random variables taking continuous values, with additive noise $n\sim \mathcal{N}(0, \sigma^2)$, i.e., $Y = X + n$. From the definition of differential entropy, the noise entropy can be computed as $H_c(n) = \dfrac{1}{2} \log (2\pi e \sigma^2)$.

$$C = \max_{p(x)} [H_c(Y) - H_c(Y|X)] = \max_{p(x)} [H_c(Y)] - \frac{1}{2}\log(2\pi e \sigma^2)$$

To maximize $H_c(Y)$, $Y$ must be Gaussian. Since $Y = X + n$ and the noise power is $\sigma^2$, with the average power of the input signal $X$ being $S$, the total power of $Y$ is $P_Y = S + \sigma^2$.
When the channel input $X$ is Gaussian with zero mean and variance $S$, the information transmission rate is maximized:

$$C = \frac{1}{2} \log (2\pi e (S+\sigma^2)) - \frac{1}{2} \log (2\pi e \sigma^2) = \frac{1}{2} \log \left(1 + \frac{S}{\sigma^2}\right) \quad (\text{bit/symbol})$$

Here, $S$ is the average power of the input signal and $\sigma^2$ is the average power of the noise. Therefore, we can define the **signal-to-noise ratio** $\text{SNR} = \dfrac{S}{\sigma^2}$, and the above formula simplifies to:
$$C = \frac{1}{2} \log (1 + \text{SNR}) \quad (\text{bit/symbol})$$

As mentioned in the previous section, the reason for focusing on Gaussian noise in channel analysis is that, under the constraint of average power limitation, the Gaussian distribution has the highest entropy. It is therefore commonly used as a worst-case noise model. Thus, for additive noise channels with non-Gaussian noise, the upper and lower bounds of channel capacity are:
$$\frac{1}{2} \log \left(1 + \frac{S}{\sigma^2}\right) \le C \le \frac{1}{2} \log \left[2\pi \mathrm{e}(S+\sigma^2)\right]-H_c(n)$$

### Multi-Dimensional Memoryless Additive Continuous Channel

```tikz
\begin{document}
\begin{tikzpicture}[>=latex]
  \node[draw, rectangle, minimum width=1.5cm, minimum height=1cm] (channel) at (3,0) {Channel};
  \draw[->] (0.5,0) -- (channel.west);
  \node[above] at (0,0) {$\vec{x}=(x_1, x_2, \dots, x_L)$};
  \draw[->] (channel.east) -- (5.5,0);
  \node[above] at (6,0) {$\vec{y}=(y_1, y_2, \dots, y_L)$};
  \draw[->] (3,-1.5) -- (channel.south);
  \node[right] at (3,-1.2) {$\vec{n}=(n_1, n_2, \dots, n_L)$};
\end{tikzpicture}
\end{document}
```

The mathematical model of a **multi-dimensional memoryless additive continuous channel** is shown in the figure above. Both the input and output are $L$-dimensional random vectors taking continuous values, with $L$-dimensional additive noise $\vec{n} \sim \mathcal{N}(\vec{0}, \Sigma)$, i.e., $\vec{Y} = \vec{X} + \vec{n}$.

Since the components are all statistically independent, a multi-dimensional memoryless Gaussian additive continuous channel is equivalent to $L$ one-dimensional memoryless Gaussian additive continuous channels in parallel. Let the input power of the $i$-th one-dimensional channel be $P_i$ and the noise power be $\sigma_i^2$; then the capacity of the $i$-th one-dimensional channel is $C_i = \dfrac{1}{2} \log \left(1 + \dfrac{P_i}{\sigma_i^2}\right)$. Therefore, the capacity of the multi-dimensional memoryless additive continuous channel is:

$$C = \max_{p(x)} I(\vec{X};\vec{Y}) = \sum_{i=1}^L \frac{1}{2} \log \left(1 + \frac{P_i}{\sigma_i^2}\right) \quad (\text{bit/L-dimension serial})$$

```tikz
\begin{document}
\usetikzlibrary{patterns,decorations.pathmorphing}
\begin{tikzpicture}[>=latex, scale=1.0]
  \def\num{3.2}            % water level
  \def\chw{1.0}           % channel width
  \def\chgap{0.0}         % gap between channels
  \def\totalH{4.5}        % total height
  % Noise floor (sigma_i^2) for each channel
  \def\sigmaA{0.4}
  \def\sigmaB{1.0}
  \def\sigmaC{1.8}
  \def\sigmaD{3.6}        % above water level → no power allocated
  \def\sigmaE{2.4}

  % x-positions of left edges
  \def\xA{0}
  \def\xB{\xA + \chw + \chgap}
  \def\xC{\xB + \chw + \chgap}
  \def\xD{\xC + \chw + \chgap}
  \def\xE{\xD + \chw + \chgap}
  \def\xEnd{\xE + \chw}

  % --- Noise region (hatched bottom) ---
  \fill[pattern=north east lines, pattern color=black!40]
    (\xA,0) rectangle (\xA+\chw,\sigmaA)
    (\xB,0) rectangle (\xB+\chw,\sigmaB)
    (\xC,0) rectangle (\xC+\chw,\sigmaC)
    (\xD,0) rectangle (\xD+\chw,\sigmaD)
    (\xE,0) rectangle (\xE+\chw,\sigmaE);

  % --- Water region (power P_i) ---
  \fill[blue!25]
    (\xA,\sigmaA) rectangle (\xA+\chw,\num)
    (\xB,\sigmaB) rectangle (\xB+\chw,\num)
    (\xC,\sigmaC) rectangle (\xC+\chw,\num)
    (\xE,\sigmaE) rectangle (\xE+\chw,\num);

  % --- Water surface (wavy line) ---
  \draw[blue!60, thick, decorate, decoration={snake, amplitude=0.4mm, segment length=3mm}]
    (\xA,\num) -- (\xA+\chw,\num)
    (\xB,\num) -- (\xB+\chw,\num)
    (\xC,\num) -- (\xC+\chw,\num)
    (\xE,\num) -- (\xE+\chw,\num);

  % --- Channel dividers ---
  \foreach \x in {\xA,\xB,\xC,\xD,\xE,\xEnd} {
    \draw[thick] (\x,0) -- (\x,\totalH);
  }
  \draw[thick] (\xA,0) -- (\xEnd,0);

  % --- Water-level line (ν) ---
  \draw[dashed, thick, red!70]
    (\xA-0.6,\num) -- (\xEnd+0.6,\num)
    node[right, red!70] {$\nu$};

  % --- Height annotations ---
  % sigma_i^2 labels (centered in noise region)
  \node[font=\footnotesize] at (\xA+\chw/2, \sigmaA/2) {$\sigma_1^2$};
  \node[font=\footnotesize] at (\xB+\chw/2, \sigmaB/2) {$\sigma_2^2$};
  \node[font=\footnotesize] at (\xC+\chw/2, \sigmaC/2) {$\sigma_3^2$};
  \node[font=\footnotesize] at (\xD+\chw/2, \sigmaD/2) {$\sigma_4^2$};
  \node[font=\footnotesize] at (\xE+\chw/2, \sigmaE/2) {$\sigma_5^2$};

  % P_i labels (centered in water region)
  \node[font=\footnotesize] at (\xA+\chw/2, {(\sigmaA+\num)/2}) {$P_1$};
  \node[font=\footnotesize] at (\xB+\chw/2, {(\sigmaB+\num)/2}) {$P_2$};
  \node[font=\footnotesize] at (\xC+\chw/2, {(\sigmaC+\num)/2}) {$P_3$};
  \node[font=\footnotesize] at (\xE+\chw/2, {(\sigmaE+\num)/2}) {$P_5$};

  % --- P_i = 0 annotation for channel 4 ---
  \node[font=\footnotesize] at (\xD+\chw/2, {\sigmaD+0.35}) {$P_4{=}0$};

  % --- Channel index labels ---
  \node at (\xA+\chw/2, -0.35) {$1$};
  \node at (\xB+\chw/2, -0.35) {$2$};
  \node at (\xC+\chw/2, -0.35) {$3$};
  \node at (\xD+\chw/2, -0.35) {$4$};
  \node at (\xE+\chw/2, -0.35) {$5$};
  \node at ({\xA+\chw/2}, -0.7) {Channel $i$};

  % --- Braces showing P_i = ν - σ_i^2 ---
  \draw[<->, thin] (\xE+\chw+0.15, \sigmaE) -- (\xE+\chw+0.15, \num);
  \node[right, font=\footnotesize] at (\xE+\chw+0.25, {(\sigmaE+\num)/2})
    {\small $P_i = \nu - \sigma_i^2$};

  % --- Legend ---
  \fill[blue!25] (\xEnd+0.5, 4) rectangle (\xEnd+0.9, 4.3);
  \draw[thick] (\xEnd+0.5, 4) rectangle (\xEnd+0.9, 4.3);
  \node[right, font=\footnotesize] at (\xEnd+0.9, 4.15) {Power $P_i$};

  \fill[pattern=north east lines, pattern color=black!40]
    (\xEnd+0.5, 3.2) rectangle (\xEnd+0.9, 3.5);
  \draw[thick] (\xEnd+0.5, 3.4) rectangle (\xEnd+0.9, 3.7);
  \node[right, font=\footnotesize] at (\xEnd+0.9, 3.55) {Noise $\sigma_i^2$};
\end{tikzpicture}
\end{document}
```

If the total signal power is constrained by $\sum_{i=1}^L P_i = P$, how should power be allocated across channels to maximize channel capacity? Using the Lagrange multiplier method, capacity is maximized when $P_i + \sigma_i^2 = \nu$ (a constant), where $\nu=\dfrac{P+\sum_{j=1}^L \sigma_j^2}{L}$. In this case, the channel capacity is $\displaystyle C=\dfrac{1}{2}\sum_{i=1}^L \log_2 \left(\dfrac{P+\sum_{j=1}^L \sigma_j^2}{L\sigma_i^2} \right)$. If $\sigma_i^2$ is too large (greater than $\nu$), then the allocated power is $P_i = 0$, and power is reallocated among the remaining channels. This is known as the **water-filling algorithm**.

It follows that sub-channels with lower noise receive larger input power, typically have higher SNR, exhibit stronger noise immunity, can transmit more bits, and require higher-order modulation schemes to improve bandwidth efficiency.

### Band-Limited, Time-Limited, and Power-Limited Additive White Gaussian Noise Channel

By the sampling theorem, under time-limited and band-limited conditions, the input process $x(t)$ and output process $y(t)$ of a waveform channel can be transformed into a multi-dimensional continuous channel for analysis via $\mathbf{X}=(X_1, X_2, \ldots, X_n)$ and $\mathbf{Y}=(Y_1, Y_2, \ldots, Y_m)$.

$$
\begin{align*}
I[x(t);y(t)] &= I(\mathbf{X};\mathbf{Y}) \\\\
&= H(\mathbf{Y}) - H(\mathbf{Y}|\mathbf{X}) \\\\
\end{align*}
$$

Assume the power spectral density of the additive white Gaussian noise $n(t)$ is $N_0/2$, and the low-pass band-limited system has frequency bandwidth $W$. Therefore, the average noise power is $N_0 W$. Based on the capacity formula for the multi-dimensional memoryless additive continuous channel from the previous section, the capacity of a time-limited and band-limited AWGN channel with bandwidth $W$ is:

$$C=\dfrac{1}{2}\sum_{i=1}^{L}\log\left(1+\dfrac{P_l}{\sigma_l^2}\right)$$

where $\sigma_l^2=\dfrac{N_0W}{2W}=\dfrac{N_0}{2}$ is the noise power per dimension, and $P_l=\dfrac{P}{2W}$ is the input power allocated per dimension. Assuming the average signal power per dimension is limited to $P_s$, substituting these parameters into the capacity formula yields:

$$
\begin{align*}
C&=\dfrac{L}{2}\log\left(1+\dfrac{P_s}{2W}/\dfrac{N_0}{2}\right)= Wt_B\log\left(1+\dfrac{P_s}{N_0 W}\right)\\\\ 
C_t &=\lim_{t_B\to\infty}\dfrac{C}{t_B}=W\log\left(1+\dfrac{P_s}{N_0 W}\right)
\end{align*}
$$

In the above expression, $P_s$ represents the average signal power, and $N_0W$ represents the average noise power within bandwidth $W$. Therefore, $\dfrac{P_s}{N_0 W}$ is the signal-to-noise ratio $\text{SNR}$. This is **Shannon's formula**.

Since Gaussian noise is the worst-case noise model, the channel capacity given by Shannon's formula is the lower bound on the capacity of all additive noise channels with bandwidth $W$ and signal-to-noise ratio $\text{SNR}$.

## Source-Channel Matching

Source-channel matching is reflected in two main aspects: **symbol matching** and **information matching**.
- **Symbol matching** requires that the symbols emitted by the source must be symbols that the channel can transmit, i.e., the source alphabet is a subset of the channel input alphabet;
- **Information matching** requires that the information transmission rate of the source must be less than or equal to the channel capacity, i.e., $R \le C$.

Define **absolute channel redundancy** $\Delta = C - R$ and **relative channel redundancy** $\delta = 1 - \dfrac{R}{C}$.
