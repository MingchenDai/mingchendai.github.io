---
title: "NIS2337 Information Theory Notes (3): Rate-Distortion Function"
date: 2026-04-24 17:13:47
tags:
- Information Theory
- Notes
- SJTU Courses
mathjax: true
tikzjax: true
---

In the discussions on the [source](/SJTUCourses/NIS2337/01-Source) and the [channel](/SJTUCourses/NIS2337/02-Channel), we typically consider distortionless communication systems, i.e., systems where the messages produced by the source are transmitted to the receiver without error. However, in practical communication systems, completely distortionless transmission is often infeasible. Therefore, we need to introduce the concept of **distortion** to describe the information loss in communication systems.

Nevertheless, the distortion discussed in this section differs from noise. Noise refers to random interference introduced by the channel, whereas distortion refers to the discrepancy between output and input caused by deliberate compression during encoding or transmission due to excessive message length.

<!--more-->

> **NIS2337 Fundamentals of Information Theory** course notes — other parts:
> 1. [Source and Information Entropy](/SJTUCourses/NIS2337/01-Source)
> 2. [Channel and Channel Capacity](/SJTUCourses/NIS2337/02-Channel)
> 3. [Rate-Distortion Function](/SJTUCourses/NIS2337/03-RateDistortion) (this article)
> 4. [Source Coding](/SJTUCourses/NIS2337/04-SourceCoding)
> 5. [Channel Coding](/SJTUCourses/NIS2337/05-ChannelCoding)
>
> Additional supplementary information can be found in [Beyond 2337](/SJTUCourses/NIS2337/06-Appendix).

## Concepts and Properties

### Distortion Function

**Distortion.** Suppose the source $X$ has symbol set $\\{x_1, x_2, \dots, x_n\\}$ and the channel output symbol set is $\\{y_1, y_2, \dots, y_m\\}$. If the input symbol $x_i$ is encoded as output symbol $y_j$ and $x_i \neq y_j$, then **distortion** exists.

**Distortion function.** Define the distortion function $d(x_i, y_j)$ to measure the degree of distortion between the input symbol $x_i$ and the output symbol $y_j$:
$$d(x_i, y_j) = \begin{cases} 0, & x_i = y_j \\\\ \alpha >0, & x_i \neq y_j \end{cases}$$

**Generalized definition of the distortion function for sequences.** For an input symbol sequence $\vec{X} = (x_1, x_2, \dots, x_L)$ and an output symbol sequence $\vec{Y} = (y_1, y_2, \dots, y_L)$, the distortion function is defined as:
$$d(\vec{X}, \vec{Y}) = \frac{1}{L} \sum_{i=1}^L d(x_i, y_i)$$

**Distortion matrix.** All $d(x_i, y_j)$ are arranged into a matrix, called the **distortion matrix**:

$$\mathbf{d}=\left[\begin{matrix}
    d(x_1, y_1) & d(x_1, y_2) & \cdots & d(x_1, y_m) \\\\
    d(x_2, y_1) & d(x_2, y_2) & \cdots & d(x_2, y_m) \\\\
    \vdots & \vdots & \ddots & \vdots \\\\
    d(x_n, y_1) & d(x_n, y_2) & \cdots & d(x_n, y_m)
\end{matrix}\right]$$

The distortion function is specified manually according to the actual situation, and its functional form can be chosen arbitrarily. Commonly used forms include:
- **Mean-square distortion**: $d(x_i, y_j) = (x_i - y_j)^2$
- **Absolute-value distortion**: $d(x_i, y_j) = |x_i - y_j|$
- **Relative distortion**: $d(x_i, y_j) = \dfrac{|x_i - y_j|}{|x_i|}$
- **Hamming distortion**: $d(x_i, y_j) = \begin{cases} 0, & x_i = y_j \\\\ 1, & x_i \neq y_j \end{cases}$

**Average distortion.** Since the distortion function is a random variable, it is appropriate to analyze it using statistical methods. Define the **average distortion** as:
$$\begin{aligned}
D = \sum_{i=1}^n \sum_{j=1}^m p(x_i, y_j) d(x_i, y_j)= \sum_{i=1}^n \sum_{j=1}^m p(x_i) p(y_j|x_i) d(x_i, y_j)
\end{aligned}$$

**Average distortion for continuous random variables.** Define the average distortion for continuous random variables $X$ and $Y$ as:
$$D = \iint p(x,y) d(x,y) \, \mathrm{d}x \mathrm{d}y = \iint p(x) p(y|x) d(x,y) \, \mathrm{d}x \mathrm{d}y$$

### Rate-Distortion Function $R(D)$

The purpose of source coding is compression, i.e., reducing the information transmission rate $R$. However, a lower information transmission rate increases the distortion level $D$. Hence, there exists a trade-off between the information transmission rate and the distortion level. The **rate-distortion function** describes the minimum information transmission rate $R$ under a given distortion level $D$.

If we map this problem onto a channel, the rate-distortion function describes the minimum mutual information $I(X;Y)$ under a given average distortion level $D_0$, where the distortion introduced by compression can be regarded as noise introduced into the channel. Consequently, the problem of selecting a source coding scheme can be reduced to the problem of selecting a channel. Let $X$ be a discrete source; the **rate-distortion function** is defined as:
$$R(D) = \min_{p(y_j|x_i): D \leq D_0} I(X;Y)$$

For a discrete memoryless channel, $\displaystyle R(D) = \min_{p(y_j|x_i): D \leq D_0} \sum_{i=1}^n \sum_{j=1}^m p(x_i) p(y_j|x_i) \log \frac{p(y_j|x_i)}{p(y_j)}$.

#### Domain

Let the domain be $[D_\text{min}, D_\text{max}]$.

The lower bound of $D_\text{min}$ is 0, which corresponds to a noiseless channel. For a discrete source, if each row of the distortion matrix contains at least one zero and each column contains at most one zero, then $R(D_\text{min}) = H(X)$; otherwise, $R(D_\text{min}) < H(X)$, meaning that some symbols can be compressed and merged without introducing any distortion.

For a continuous source, its entropy is meaningful only under relative conditions. Therefore, the lower bound of $R(D_\text{min})$ is infinite, i.e., $\displaystyle R(D_\text{min}) = \lim_{D \to 0} R(D) = +\infty$. Clearly, in practice, infinite channel capacity does not exist. Thus, transmission is possible only when some distortion is allowed (i.e., $R(D)$ is finite).

$D_\text{max}$ can be infinite, in which case $R=0$, meaning that no information needs to be transmitted, but this is obviously meaningless. Therefore, we choose the smallest $D_\text{max}$ such that $R(D_\text{max})=0$.

When $D=D_\text{max}$, $I(X;Y)=R=0$, i.e., $X$ and $Y$ are independent, and $p(y_j|x_i) = p(y_j)$. Therefore,
$$D_\text{max} = \min \sum_{j=1}^m p(y_j) \sum_{i=1}^n p(x_i) d(x_i, y_j)=\min_{j\in 1,2,\ldots,m} \sum_{i=1}^n p(x_i) d(x_i, y_j)$$

That is, to construct $p(y_j)$ corresponding to $D_\text{max}$, we only need to find a $j$ that minimizes $\displaystyle \sum_{i=1}^n p(x_i) d(x_i, y_j)$, set $p(y_j)=1$, and set the other $p(y_k)=0$ ($k \neq j$).

#### Convexity and Continuity

The rate-distortion function $R(D)$ is a convex function of $D$, i.e., for any $D_1, D_2 \in [D_\text{min}, D_\text{max}]$ and $\lambda \in [0,1]$, we have:
$$R(\lambda D_1 + (1-\lambda) D_2) \leq \lambda R(D_1) + (1-\lambda) R(D_2)$$

Furthermore, $R(D)$ is continuous, i.e., for any $D_0 \in [D_\text{min}, D_\text{max}]$, we have $\displaystyle \lim_{D \to D_0} R(D) = R(D_0)$.

#### Monotonicity

The rate-distortion function $R(D)$ is a monotonically non-increasing function of $D$. [Proof...](/SJTUCourses/NIS2337/06-Appendix#Monotonicity-Properties-of-the-Distortion-Function)

```tikz
\usetikzlibrary{decorations.pathreplacing}
\begin{document}
\begin{tikzpicture}[>=latex, scale=1.2]
  \draw[->, thick] (-0.3, 0) -- (5.5, 0)
    node[right] {$D$};
  \draw[->, thick] (0, -0.3) -- (0, 4.2)
    node[above] {$R(D)$};
  \draw (0, 0)   node[below left] {$0$};
  \draw (4.5, 0) node[below] {$D_{max}$};
  \draw (0, 3.5) node[left]  {$R(0)=H(X)$};
  \draw[dashed, gray] (0, 3.5) -- (4.5, 0);
  \draw[dashed, thin] (4.5, 0) -- (4.5, -0.1);
  \draw[dashed, thin] (0, 3.5) -- (-0.1, 3.5);
  \draw[blue!60, very thick, domain=0:4.5, samples=100]
    plot (\x, {3.5 * (1 - \x/4.5)^(2.6)});
  \filldraw[red] (0, 3.5) circle (1.5pt);
  \filldraw[red] (4.5, 0) circle (1.5pt);
\end{tikzpicture}
\end{document}
```

| | Channel Capacity | Rate-Distortion Function |
|-|-|-|
| Definition | Maximum information transmission rate under distortionless conditions | Minimum information transmission rate under a given distortion level |
| Objective | Maximize $I(X;Y)$ | Minimize $I(X;Y)$ |
| Constraint | $p(y_j\|x_i)$ satisfies channel transition probabilities | $p(y_j\|x_i)$ satisfies average distortion $D \leq D_0$ |
| Given conditions | Channel transition probabilities $p(y_j\|x_i)$ | Input distribution $p(x_i)$ and distortion function $d(x_i, y_j)$ |
| Choice parameter | Input distribution $p(x_i)$ | Conditional probabilities $p(y_j\|x_i)$ |
| Object of study | Channel | Source coding |

## Parametric Representation Solution

Obtaining a closed-form expression for $R(D)$ is rather difficult. Therefore, a parametric representation is commonly adopted, using the Lagrange multiplier $\lambda$ as a parameter to derive expressions for $R(\lambda)$ and $D(\lambda)$, thereby obtaining a numerical solution for $R(D)$.

Let the input sequence of the discrete source be:
$$\left[\begin{matrix}
    X\\\\ P
\end{matrix}\right]=\left[\begin{matrix}
    x_1 & x_2 & \cdots & x_n \\\\
    p(x_1) & p(x_2) & \cdots & p(x_n)
\end{matrix}\right]$$

and the output sequence be:
$$\left[\begin{matrix}
    Y\\\\ P
\end{matrix}\right]=\left[\begin{matrix}
    y_1 & y_2 & \cdots & y_m \\\\
    p(y_1) & p(y_2) & \cdots & p(y_m)
\end{matrix}\right]$$

Denote $d_{ij} = d(x_i, y_j)$, $p_i = p(x_i)$, $q_j = p(y_j)$, $p_{ij} = p(y_j|x_i)$. Note that $q_j$ is not an independent variable; it is determined by $q_j = \sum_{i=1}^n p_i p_{ij}$.

Then the problem of solving for $R(D)$ can be formulated as:

$$\begin{aligned}
R(D) = \min_{p_{ij}} \quad & \sum_{i=1}^n \sum_{j=1}^m p_i p_{ij} \ln \frac{p_{ij}}{q_j} \\\\
\text{s.t.} \quad & \sum_{i=1}^n \sum_{j=1}^m p_i p_{ij} d_{ij} \leq D \\\\
& \sum_{j=1}^m p_{ij} = 1, \quad i = 1,2,\dots,n \\\\
& p_{ij} \geq 0, \quad i = 1,2,\dots,n;\ j = 1,2,\dots,m
\end{aligned}$$

Introduce the Lagrange multiplier $\lambda \geq 0$ and $\mu_i\ (i=1,2,\dots,n)$, and construct the Lagrangian function:

$$\begin{aligned}
\mathcal{L}(p_{ij}, \lambda, \mu_i) = \sum_{i=1}^n \sum_{j=1}^m p_i p_{ij} \ln \frac{p_{ij}}{q_j}  - \lambda \left( \sum_{i=1}^n \sum_{j=1}^m p_i p_{ij} d_{ij} - D \right) - \sum_{i=1}^n \mu_i \left( \sum_{j=1}^m p_{ij} - 1 \right)
\end{aligned}$$

Taking the partial derivative with respect to $p_{ij}$ (ignoring the constant terms $\lambda D$ and $\mu_i$, and expanding $\frac{\partial}{\partial p_{ij}} (p_i p_{ij} \ln p_{ij})$ to obtain $p_i(\ln p_{ij} + 1)$, where the constant $p_i$ is absorbed into $\mu_i$):

$$\frac{\partial \mathcal{L}}{\partial p_{ij}} = p_i \ln\frac{p_{ij}}{q_j} - \lambda p_i d_{ij} - \mu_i = 0$$

Rearranging yields the parametric representation of $p_{ij}$:

$$p_{ij} = q_j \exp(\lambda d_{ij}) \exp\left(\frac{\mu_i}{p_i}\right) \tag{1}$$

From the normalization condition $\sum_{j=1}^m p_{ij} = 1$, sum both sides of $(1)$ over $j$:

$$\sum_{j=1}^m q_j \exp(\lambda d_{ij}) \exp\left(\frac{\mu_i}{p_i}\right) = 1$$

$$\Rightarrow \quad \exp\left(\frac{\mu_i}{p_i}\right) = \frac{1}{\sum_{j=1}^m q_j \exp(\lambda d_{ij})} \tag{2}$$

Then from $q_j = \sum_{i=1}^n p_i p_{ij}$, substitute $(1)$:

$$\begin{aligned}
q_j &= \sum_{i=1}^n p_i \, q_j \exp(\lambda d_{ij}) \exp\left(\frac{\mu_i}{p_i}\right) \\\\
    &= \sum_{i=1}^n p_i \, q_j \exp(\lambda d_{ij}) \cdot \frac{1}{\sum_{k=1}^m q_k \exp(\lambda d_{ik})}
\end{aligned}$$

Canceling $q_j$ on both sides (assuming $q_j > 0$), we obtain the system of equations for $q_j$:

$$1 = \sum_{i=1}^n \frac{p_i \exp(\lambda d_{ij})}{\sum_{k=1}^m q_k \exp(\lambda d_{ik})}, \quad j = 1,2,\dots,m \tag{3}$$

From $(3)$, we can solve for $q_j(\lambda)$ parameterized by $\lambda$. Substituting into $(2)$ gives $\exp(\mu_i/p_i)$, and then substituting into $(1)$ yields the complete parametric representation of $p_{ij}$.

Substituting $p_{ij}$ back into the definition of average distortion yields the average distortion $D(\lambda)$ parameterized by $\lambda$:

$$\begin{aligned}
D(\lambda) &= \sum_{i=1}^n \sum_{j=1}^m p_i p_{ij} d_{ij} \\\\
           &= \sum_{i=1}^n \sum_{j=1}^m p_i q_j \exp(\lambda d_{ij}) \exp\left(\frac{\mu_i}{p_i}\right) d_{ij}
\end{aligned}$$

Substituting $p_{ij}$ back into the definition of mutual information yields the information transmission rate $R(\lambda)$ parameterized by $\lambda$. Using $\ln(p_{ij}/q_j) = \lambda d_{ij} + \mu_i/p_i$ from $(1)$:

$$\begin{aligned}
R(\lambda) &= \sum_{i=1}^n \sum_{j=1}^m p_i p_{ij} \ln \frac{p_{ij}}{q_j} \\\\
           &= \sum_{i=1}^n \sum_{j=1}^m p_i p_{ij} \left( \lambda d_{ij} + \frac{\mu_i}{p_i} \right) \\\\
           &= \lambda \sum_{i=1}^n \sum_{j=1}^m p_i p_{ij} d_{ij} + \sum_{i=1}^n \mu_i \sum_{j=1}^m p_{ij} \\\\
           &= \lambda D + \sum_{i=1}^n \mu_i
\end{aligned}$$

In general, a closed-form explicit expression for $R(D)$ cannot be obtained. However, through the parametric representation, we can use $\lambda$ as an intermediate parameter to obtain the parametric curve of $R(\lambda)$–$D(\lambda)$, i.e., the numerical solution of $R(D)$.

Furthermore, it can be shown that $\lambda$ is exactly the slope of the $R(D)$ curve:

$$\frac{\mathrm{d}R}{\mathrm{d}D} = \lambda$$

The above derivation uses natural logarithms. To convert the result to bits, simply divide by $\ln 2$.
