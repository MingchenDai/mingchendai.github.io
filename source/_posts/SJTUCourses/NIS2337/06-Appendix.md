---
title: "NIS2337 Information Theory Notes (6): Beyond 2337"
date: 2026-04-24 17:13:50
tags:
- Information Theory
- Notes
- SJTU Courses
mathjax: true
tikzjax: true
---

Supplementary material on information theory. This document collects the proofs of key theorems and derivation details referenced in the main text, organized into five sections: Mathematical Tools, Channel, Rate-Distortion Function, Source Coding, and Channel Coding. All conclusions marked "see Appendix for proof" in the main text can be found here.

<!--more-->

> **NIS2337 Foundations of Information Theory** course notes — other parts:
> 1. [Source and Information Entropy](/SJTUCourses/NIS2337/01-Source)
> 2. [Channel and Channel Capacity](/SJTUCourses/NIS2337/02-Channel)
> 3. [Rate-Distortion Function](/SJTUCourses/NIS2337/03-RateDistortion)
> 4. [Source Coding](/SJTUCourses/NIS2337/04-SourceCoding)
> 5. [Channel Coding](/SJTUCourses/NIS2337/05-ChannelCoding)

## Mathematical Tools

This section presents two fundamental inequalities repeatedly used in information theory. They underpin a series of core results including the non-negativity of relative entropy, entropy maximization, and the convexity of mutual information.

### Jensen's Inequality

**Convex function.** For any $x_1,x_2\in(a,b)$ and any $\lambda\in[0,1]$, if the following inequality holds:
$$f(\lambda x_1+(1-\lambda)x_2)\leq\lambda f(x_1)+(1-\lambda)f(x_2)$$
then the function $f$ is said to be a **convex function** on the interval $(a,b)$. If the inequality above holds only when $\lambda=0$ or $\lambda=1$, then $f$ is said to be a **strictly convex function** on $(a,b)$.

If a function $f$ has a non-negative (positive) second derivative on an interval, then $f$ is (strictly) convex on that interval.

```tikz
\begin{document}
\begin{tikzpicture}[scale=1.2, >=stealth]
    \draw[->] (-0.3,0) -- (4.8,0) node[below] {$x$};
    \draw[->] (0,-0.2) -- (0,5.5) node[left] {$f(x)$};
    \draw[domain=0.6:4.5, smooth, variable=\x, very thick, blue!60!black]
        plot ({\x}, {0.3*\x*\x}) node[right, blue!60!black] {$f(x)$};
    \draw[dashed, thick, red!50!black] (1, 0.3) -- (4, 4.8);
    \filldraw[blue!60!black] (1, 0.3) circle (2pt)
        node[above left] {$(x_1,f(x_1))$};
    \filldraw[blue!60!black] (4, 4.8) circle (2pt)
        node[below right] {$(x_2,f(x_2))$};
    \draw[dashed, thin, gray] (2.2, 0) -- (2.2, 2.1);
    \node[below] at (2.2, 0) {$x_{\lambda}$};
    \filldraw[green!50!black!80] (2.2, 1.452) circle (2pt)
        node[below right] {$f(x_{\lambda})$};
    \filldraw[red!50!black] (2.2, 2.1) circle (2pt)
        node[above left] {$\lambda f(x_1)+(1-\lambda)f(x_2)$};
    \node[below] at (1, 0) {$x_1$};
    \node[below] at (4, 0) {$x_2$};
\end{tikzpicture}
\end{document}
```

**Jensen's Inequality.** For any convex function $f$ and random variable $X$, we have:
$$f(\mathbb{E}[X])\leq\mathbb{E}[f(X)]$$

Jensen's inequality can be used to prove the non-negativity of relative entropy.

### Log Sum Inequality

**Log sum inequality.** For non-negative numbers $a_1,a_2,\cdots,a_n$ and non-negative numbers $b_1,b_2,\cdots,b_n$, we have:
$$\sum_{i=1}^n a_i\log\dfrac{a_i}{b_i}\geq\left(\sum_{i=1}^n a_i\right)\log\dfrac{\sum_{i=1}^n a_i}{\sum_{i=1}^n b_i}$$

Equality holds if and only if $\dfrac{a_1}{b_1}=\dfrac{a_2}{b_2}=\cdots=\dfrac{a_n}{b_n}$.

## Channel

### The Decomposability Property of Quasi-Symmetric Discrete Memoryless Channels

The channel capacity of a Symmetric Discrete Memoryless Channel (Symmetric DMC) can be solved very elegantly. However, for a Quasi-Symmetric Discrete Memoryless Channel (Quasi-Symmetric DMC), must we resort exclusively to the Lagrange multiplier method for solving the nonlinear optimization problem?

In fact, by cleverly applying the algebraic properties of matrix partitioning, this nonlinear optimization problem can be transformed into an extremal problem involving probability grouping and conditional entropy. This is a lemma from the textbook, but unfortunately the textbook does not provide a proof.

#### Prerequisites

First, it is unfortunate that the definition of quasi-symmetric DMC in the information theory textbook used at SJTU Information Security is not rigorous. In fact, the probability transition matrix of a quasi-symmetric DMC as defined in the textbook is not necessarily decomposable. For example, the following matrix conforms to the textbook's definition of a quasi-symmetric DMC, yet it cannot be decomposed:

$$P = \begin{bmatrix} 0.6 & 0.3 & 0.1 \\\\ 0.6 & 0.1 & 0.3 \\\\ 0.3 & 0.6 & 0.1 \end{bmatrix}$$

In the rigorous information theory definition, the decomposability of the probability transition matrix is written into the definition of a quasi-symmetric DMC. Therefore, there is no need to dwell on whether the matrix can be decomposed -- this is a prerequisite and not a lemma that concerns us.

Let the channel input be $X \in \\\{x_1, \dots, x_n\\\}$, the output be $Y \in \\\{y_1, \dots, y_m\\\}$, and the transition probability matrix be $P = [p_{ij}]_{n \times m}$.

Assume that the columns of the probability transition matrix can be partitioned into $r$ mutually disjoint submatrices $P_1, P_2, \dots, P_r$. In the $k$-th submatrix $P_k$ (of dimension $n \times m_k$), the sum of elements in each row is a constant, denoted by $N_k$; the sum of elements in each column is a constant, denoted by $M_k$.

Based on the conservation of the total sum of matrix elements, summing all elements of any submatrix $P_k$ yields an identity:
$$n \cdot N_k = m_k \cdot M_k \implies m_k = \frac{n \cdot N_k}{M_k}$$

#### Conditional Entropy

The mutual information is computed as $I(X;Y) = H(Y) - H(Y|X)$. Since each row of the matrix contains exactly the same probability elements, merely in a different order, the conditional entropy for any given input $x_i$ is a constant independent of the input distribution:
$$H(Y|X) = \sum_{i=1}^n p(x_i) H(Y|x_i) = H(Y|x_1) = H(\text{row})$$
This is a conclusion from the textbook. Since $H(Y|X)$ is fixed, to maximize the channel capacity $C = \max I(X;Y)$, our sole objective is to maximize the output entropy $H(Y)$.

#### Theoretical Upper Bound

Introduce a random variable $K \in \\\{1, 2, \dots, r\\\}$ indicating that the channel output $Y$ falls into the $k$-th submatrix $P_k$. Regardless of how the input distribution $P(x_i)$ varies, the probability $P(K=k)$ that the output falls into the $k$-th submatrix is constant:
$$P(K=k) = \sum_{j \in P_k} P(y_j) = \sum_{i=1}^n P(x_i) \left( \sum_{j \in P_k} p_{ij} \right)$$

Since in the submatrix $P_k$ the row sum is constant $N_k$, i.e., $\sum_{j \in P_k} p_{ij} = N_k$, substituting into the above expression yields:
$$P(K=k) = \sum_{i=1}^n P(x_i) N_k = N_k \sum_{i=1}^n P(x_i) = N_k$$

Since the probability distribution of $K$ is completely fixed (i.e., $N_k$), we can expand $H(Y)$ using the chain rule:
$$H(Y) = H(K, Y) = H(K) + H(Y|K)$$
$$H(Y) = -\sum_{k=1}^r N_k \log N_k + \sum_{k=1}^r N_k \cdot H(Y|K=k)$$

To maximize $H(Y)$, the conditional entropy $H(Y|K=k)$ must be maximized. Given that the output falls into the $k$-th submatrix (with $m_k$ possible outputs), the entropy is maximized when these $m_k$ outputs are equally likely, yielding a maximum value of $\log m_k$.

Therefore, the theoretical upper bound of $H(Y)$ is:
$$
H(Y)\_{max} = -\sum\_{k=1}^r N\_k \log N\_k + \sum\_{k=1}^r N\_k \log m\_k = \sum\_{k=1}^r N\_k \log \left( \frac{m\_k}{N\_k} \right)
$$

Substituting the identity $\displaystyle \frac{m_k}{N_k} = \frac{n}{M_k}$ derived earlier:
$$
H(Y)\_{max} = \sum_{k=1}^r N_k \log \left( \frac{n}{M_k} \right) = \sum_{k=1}^r N_k (\log n - \log M_k)
$$

Since $\sum_{k=1}^r N_k = 1$ (the probabilities in an entire row sum to 1), expanding gives:
$$
H(Y)\_{max} = \log n - \sum_{k=1}^r N_k \log M_k
$$

Thus,
$$
C=\max I(X;Y) = \max H(Y) - H(Y|X) = \log n - \sum_{k=1}^r N_k \log M_k - H(\text{row})
$$

#### Conditions for Achieving the Maximum

The theoretical upper bound has been obtained. According to the KKT conditions, the input distribution that attains the theoretical maximum channel capacity is not unique. We prove below that the uniform input distribution is one such input distribution satisfying the KKT conditions.

Consider the $k$-th submatrix. We have:
$$
p(y_i)=\sum_{j=1}^n p(x_j) p(y_i|x_j)=\sum_{j=1}^n p(x_j) p_{ji}=\frac{N_k}{m_k}=\frac{M_k}{n}, \quad \forall i \in P_k
$$
which satisfies the condition for achieving the theoretical upper bound discussed above.

#### Other Cases

For asymmetric DMCs, the solution is obtained via the KKT conditions and the Blahut-Arimoto algorithm.

## Rate-Distortion Function

This section proves two fundamental analytical properties of $R(D)$: convexity and monotonicity, which form the theoretical basis for understanding the shape of the rate-distortion function curve.

### Convexity of the Distortion Function

To prove that $R(D)$ is a convex function, we need to show that for any two admissible distortions $D_1 \ge 0$ and $D_2 \ge 0$, and any real number $\lambda \in [0, 1]$, the following inequality holds:
$$R(\lambda D_1 + (1-\lambda)D_2) \le \lambda R(D_1) + (1-\lambda)R(D_2)$$

By the definition of $R(D)$, it is the minimum mutual information subject to a distortion constraint. Suppose that for distortion $D_1$, there exists an optimal conditional probability distribution $p_1(\hat{x}|x)$ that exactly attains the minimum of the rate-distortion function, i.e.:
$$I_{p_1}(X; \hat{X}) = R(D_1)$$

and it satisfies the distortion constraint: $\displaystyle \sum_{x, \hat{x}} p(x)p_1(\hat{x}|x)d(x, \hat{x}) \le D_1$. Similarly, for distortion $D_2$, there exists an optimal conditional probability distribution $p_2(\hat{x}|x)$ such that:
$$I_{p_2}(X; \hat{X}) = R(D_2)$$

and it satisfies the distortion constraint: $\displaystyle \sum_{x, \hat{x}} p(x)p_2(\hat{x}|x)d(x, \hat{x}) \le D_2$

Using the parameter $\lambda$, we mix these two distributions to construct a new conditional probability distribution $p_\lambda(\hat{x}|x)$:
$$p_\lambda(\hat{x}|x) = \lambda p_1(\hat{x}|x) + (1-\lambda)p_2(\hat{x}|x)$$

Since $p_1$ and $p_2$ are both valid probability distributions and $\lambda \in [0, 1]$, their convex combination $p_\lambda$ is clearly also a valid probability distribution. Substituting $p_\lambda$ into the formula for the expected distortion:

$$
\mathbb{E}\_{p_\lambda}[d(X, \hat{X})] = \sum_{x, \hat{x}} p(x) \left[ \lambda p_1(\hat{x}|x) + (1-\lambda)p_2(\hat{x}|x) \right] d(x, \hat{x})
$$

Expanding this and using the previous constraint conditions:
$$= \lambda \sum_{x, \hat{x}} p(x)p_1(\hat{x}|x)d(x, \hat{x}) + (1-\lambda) \sum_{x, \hat{x}} p(x)p_2(\hat{x}|x)d(x, \hat{x})$$
$$\le \lambda D_1 + (1-\lambda)D_2$$

This shows that: **the mixed distribution $p_\lambda(\hat{x}|x)$ lies exactly within the feasible region for distortion $\lambda D_1 + (1-\lambda)D_2$.**

The rate-distortion function $R(\lambda D_1 + (1-\lambda)D_2)$ seeks the **minimum** mutual information among all distributions satisfying the constraint $\lambda D_1 + (1-\lambda)D_2$.
Since $p_\lambda$ is merely **one** candidate distribution in this feasible region, the true minimum $R$ must be less than or equal to the mutual information produced by $p_\lambda$:
$$R(\lambda D_1 + (1-\lambda)D_2) \le I_{p_\lambda}(X; \hat{X})$$

However, **the mutual information $I(X; \hat{X})$ is convex in $p(\hat{x}|x)$**.
Therefore, the mutual information of the mixed distribution is always less than or equal to the mixture of the mutual informations of the original distributions:
$$I_{p_\lambda}(X; \hat{X}) \le \lambda I_{p_1}(X; \hat{X}) + (1-\lambda) I_{p_2}(X; \hat{X})$$

Finally, substituting the results from the second step ($I_{p_1} = R(D_1)$ and $I_{p_2} = R(D_2)$) into the above expression and connecting these two inequalities:
$$R(\lambda D_1 + (1-\lambda)D_2) \le \lambda R(D_1) + (1-\lambda)R(D_2)$$

### Monotonicity of the Distortion Function

For a given source $X$ and distortion measure $d(x, \hat{x})$, the rate-distortion function $R(D)$ is defined as the minimum of the mutual information $I(X; \hat{X})$ over all conditional probability distributions (i.e., test channels) $p(\hat{x}|x)$ that satisfy an average distortion not exceeding $D$:

$$R(D) = \min_{p(\hat{x}|x) \in S_D} I(X; \hat{X})$$

where $S_D$ is the set of all conditional probability distributions satisfying the distortion constraint (i.e., the **feasible region**):

$$
S_D = \left\\\{ p(\hat{x}|x) \mid \sum_{x} \sum_{\hat{x}} p(x)p(\hat{x}|x)d(x, \hat{x}) \le D \right\\\}
$$

#### Proof of Non-Increasing Property

Suppose we have two given admissible distortion levels $D_1$ and $D_2$, satisfying:
$$D_1 \le D_2$$

Consider the distortion-constrained sets $S_{D_1}$ and $S_{D_2}$.
If a conditional probability distribution $p^*(\hat{x}|x)$ belongs to $S_{D_1}$, this means it satisfies:
$$\mathbb{E}[d(x, \hat{x})] \le D_1 \le D_2$$

This implies that $p^*(\hat{x}|x)$ also satisfies the distortion constraint for $D_2$, and therefore also belongs to $S_{D_2}$.
In set-theoretic terms, this means $S_{D_1}$ is a **subset** of $S_{D_2}$:
$$S_{D_1} \subseteq S_{D_2}$$

$R(D)$ is defined as the **minimum** of $I(X; \hat{X})$ over the feasible region. Mathematically, **taking the minimum over a larger set always yields a result less than or equal to the minimum over a smaller subset**.

Therefore, we can directly conclude:
$$\min_{p(\hat{x}|x) \in S_{D_2}} I(X; \hat{X}) \le \min_{p(\hat{x}|x) \in S_{D_1}} I(X; \hat{X})$$

That is:
$$R(D_2) \le R(D_1)$$

This completes the mathematical proof. Since whenever $D_1 \le D_2$, we have $R(D_1) \ge R(D_2)$, $R(D)$ is a monotonically non-increasing function of $D$.

#### Strictly Decreasing Property for $D<D_\text{max}$

The proof of this property requires the convexity of $R(D)$. Suppose there exist two distortion values $D_1$ and $D_2$ satisfying $0 \le D_1 < D_2 < D_\text{max}$; we need to prove $R(D_1) > R(D_2)$.

Since $D_1 < D_2 < D_\text{max}$, there must exist a constant $\lambda =\dfrac{D_\text{max} - D_2}{D_\text{max} - D_1}\in (0, 1)$ such that:

$$D_2 = \lambda D_1 + (1-\lambda) D_\text{max}$$

By the convexity of $R(D)$, substituting the above convex combination into $R(D)$ yields:

$$
\begin{aligned}
R(D_2) &\le R(\lambda D_1 + (1-\lambda) D_\text{max}) \\\\
&\le \lambda R(D_1) + (1-\lambda) R(D_\text{max})\\\\
&\le \lambda R(D_1)\\\\
&< R(D_1)
\end{aligned}
$$

## Source Coding

This section provides a complete proof of the Kraft inequality (necessary and sufficient condition for the existence of instantaneous codes) and the derivation of the upper and lower bounds of Shannon's first theorem (lossless source coding theorem).

### Kraft Inequality

For any **$k$-ary prefix code** with $n$ codewords, let the set of codeword lengths be $\{l_1, l_2, \dots, l_n\}$. Then it must satisfy:
$$\sum_{i=1}^{n} k^{-l_i} \le 1$$
Conversely, if a set of positive integers satisfies this inequality, then there necessarily exists a $k$-ary prefix code with these codeword lengths.

#### Necessity

Assume a $k$-ary prefix code exists with codeword lengths $l_1, l_2, \dots, l_n$. Consider an infinite-depth full $k$-ary tree, where the root node is at level $0$ and each node has $k$ branches. The $l$-th level of the tree has $k^l$ nodes in total.

Map each codeword of the prefix code to a node on the tree. A codeword of length $l_i$ corresponds to a specific node at level $l_i$ of the tree. Since the code is a prefix code, **no node corresponding to any codeword is an ancestor of a node corresponding to another codeword**.

Let the maximum codeword length be $l_{max} = \max\\\{l_1, l_2, \dots, l_n\\\}$. Consider the $l_{max}$-th level of the tree, which has $k^{l_{max}}$ nodes.

For any codeword node at level $l_i$, the subtree rooted at that node extends to $k^{l_{max} - l_i}$ leaf nodes at level $l_{max}$. Since no codeword is a prefix of another, the $n$ subtrees generated by these $n$ codewords at level $l_{max}$ are **mutually disjoint**.

This means that the total number of leaf nodes "covered" by these $n$ codewords at level $l_{max}$ cannot exceed the total number of nodes at that level. Therefore we have:
$$\sum_{i=1}^{n} k^{l_{max} - l_i} \le k^{l_{max}}$$

Dividing both sides of the inequality by $k^{l_{max}}$, we obtain:
$$\sum_{i=1}^{n} k^{-l_i} \le 1$$

#### Sufficiency

Given a set of positive integers $l_1 \le l_2 \le \dots \le l_n$ (sorted in non-decreasing order without loss of generality) satisfying $\displaystyle \sum_{i=1}^{n} k^{-l_i} \le 1$.

This is a constructive proof. We aim to show that on a full $k$-ary tree, we can always sequentially find nodes satisfying the prefix condition for these $n$ codewords.

Step 1: For the first codeword of length $l_1$, we choose any node at level $l_1$. Since level $l_1$ has $k^{l_1}$ nodes, clearly $1 \le k^{l_1}$, so this step is always feasible.

Step $m$: Assume we have successfully assigned the first $m-1$ codewords ($1 < m \le n$). We now need to assign a node for the $m$-th codeword (of length $l_m$).

To ensure the prefix condition is satisfied, the $m$-th codeword must not lie within any subtree generated by the first $m-1$ codewords. Since $l_1 \le l_2 \le \dots \le l_m$, the total number of nodes "consumed" at level $l_m$ by the first $m-1$ assigned codewords is:
$$S_\text{consumed} = \sum_{i=1}^{m-1} k^{l_m - l_i}$$

By the given condition, all codeword lengths satisfy the Kraft inequality, and all terms are positive. Therefore, the partial sum of the first $m-1$ terms is strictly less than 1 (since $m \le n$ and the final term $k^{-l_n} > 0$):
$$\sum_{i=1}^{m-1} k^{-l_i} < \sum_{i=1}^{n} k^{-l_i} \le 1$$

Multiplying both sides of the above inequality by $k^{l_m}$ yields:
$$\sum_{i=1}^{m-1} k^{l_m - l_i} < k^{l_m}$$

That is, $S_\text{consumed} < k^{l_m}$.

The left-hand side is the number of nodes covered by the first $m-1$ codewords (an integer), and the right-hand side is the total number of nodes at level $l_m$. Since the number of covered nodes is strictly less than the total number of nodes, this proves that at level $l_m$ **there exists at least one node** not yet covered by any previous codeword.

We can safely choose this free node as the $m$-th codeword without violating the prefix rule. By mathematical induction, this process can proceed all the way to the $n$-th codeword. Sufficiency is thus proved.

### Proof of Shannon's First Theorem

#### Proof of the Lower Bound

Compute the difference between the information entropy and the average code length:

$$
\begin{align*}
H(X) - \bar{L} &= \left( -\sum_{i=1}^{n} p_i \log_2 p_i \right) - \sum_{i=1}^{n} p_i l_i \\\\
&= \sum_{i=1}^{n} p_i \log_2 \frac{1}{p_i} + \sum_{i=1}^{n} p_i \log_2 2^{-l_i}\\\\
&= \sum_{i=1}^{n} p_i \log_2 \frac{2^{-l_i}}{p_i}\\\\
&= \frac{1}{\ln 2} \sum_{i=1}^{n} p_i \ln \frac{2^{-l_i}}{p_i}\\\\
&\le \frac{1}{\ln 2} \sum_{i=1}^{n} p_i \left( \frac{2^{-l_i}}{p_i} - 1 \right)\\\\
&= \frac{1}{\ln 2} \left( \sum_{i=1}^{n} 2^{-l_i} - \sum_{i=1}^{n} p_i \right)\\\\
&\le \frac{1}{\ln 2} \left(1 - 1\right)=0\tag{Kraft Inequality}
\end{align*}
$$

#### Proof of the Upper Bound

To prove the upper bound, we only need to construct a prefix code whose average code length is less than $H(X) + 1$.

For each symbol $x_i$ of the source with probability $p_i$, we can always find a unique integer code length $l_i$ that falls precisely within the following interval:
$$-\log_m p_i \le l_i < -\log_m p_i + 1$$

It can be shown that since this length assignment satisfies the Kraft inequality, it can be realized by a prefix code:
$$
\begin{aligned}
\sum_{i=1}^{n} 2^{-l_i}\le \sum_{i=1}^{n} 2^{\log_m p_i} \le \sum_{i=1}^{n} 2^{\log_2 p_i}= \sum_{i=1}^{n} p_i = 1
\end{aligned}
$$

Therefore,
$$\begin{align*}
-\log_m p_i & \le l_i < -\log_m p_i + 1\\\\
-p_i \log_m p_i & \le p_i l_i < -p_i \log_m p_i + p_i\\\\
-\sum_{i=1}^{n} p_i \log_m p_i & \le \sum_{i=1}^{n} p_i l_i < -\sum_{i=1}^{n} p_i \log_m p_i + \sum_{i=1}^{n} p_i\\\\
\frac{H(X)}{\log m} & \le \bar{L} < \frac{H(X)}{\log m} + 1\tag{Definition of $H(X)$}
\end{align*}$$

## Channel Coding

This section proves Fano's inequality, which relates the channel equivocation to the decoding error probability, serving as a key tool in the analysis of the channel coding theorem.

### Proof of Fano's Inequality

$$
\begin{align*}
H(p_e)+p_e\log (n-1)&=p_e\log\frac{1}{p_e}+(1-p_e)\log\frac{1}{1-p_e}+p_e\log (n-1)\\\\
&=p_e\log\frac{n-1}{p_e}+(1-p_e)\log\frac{1}{1-p_e}\\\\
&=\sum_{Y,X-X^\*}p(x,y)\log\frac{n-1}{p_e}+\sum_{Y,X^\*}p(x,y)\log\frac{1}{1-p_e}\\\\
H(X|Y)-H(p_e)-p_e\log(n-1)&=\sum_{Y,X-X^\*}p(x,y)\log\frac{1}{p(x|y)}+\sum_{Y,X^\*}p(x,y)\log\frac{1}{p(x|y)}-p_e\log\frac{1}{p_e}-p_e\log(n-1)\\\\
&=\sum_{Y,X-X^\*}p(x,y)\log\frac{p_e}{(n-1)p(x|y)}+\sum_{Y,X^\*}p(x,y)\log\frac{1-p_e}{p(x|y)}\\\\
&\le \sum_{Y,X-X^\*}p(x,y)\left[\frac{p_e}{(n-1)p(x|y)}-1\right]+\sum_{Y,X^\*}p(x,y)\left[\frac{1-p_e}{p(x|y)}-1\right]\\\\
&=\frac{p_e}{n-1}\sum_{Y,X-X^\*}p(y)-\sum_{Y,X-X^\*}p(x,y)+(1-p_e)\sum_{Y,X^\*}p(y)-\sum_{Y,X^\*}p(x,y)\\\\
&=0
\end{align*}
$$
