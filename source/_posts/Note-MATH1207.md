---
title: MATH1207 Probability and Mathematical Statistics
date: 2026-01-16 19:04:56
categories: Exploration
tags:
- SJTU Courses
- Mathematics
- Notes
mathjax: true
---

This is a note of **MATH1207 Probability and Mathematical Statistics** (概率论与数理统计) taught at SJTU. It is originally written in Chinese to keep consistency with lecture language and translated into English later.

The note covers all contents of the course taught in 2025-2026-1 semester, including random events and probability, random variables and their distributions, numerical characteristics of random variables, joint distributions of multiple random variables, random samples and sampling distributions, estimation, and hypothesis testing.

> **Quick Navigation** to check [Common Discrete Random Variables and Their Properties](#Discrete-Random-Variables) and [Common Continuous Random Variables and Their Properties](#Continuous-Random-Variables).

<!-- more -->

## Random Events and Probability

### Random Events

The outcome of a single trial often exhibits *randomness* or *contingency*, but the results appearing in a large number of repeated trials often possess a certain *regularity*. Observations or experiments conducted to study this regularity are called **random experiments**.

- **Sample Space ($\Omega$)**: The set of all possible outcomes of a random experiment $E$.
- **Sample Point / Elementary Event ($\omega$)**: A single element of the sample space, representing a possible outcome of the random experiment.
- **Random Event ($A$, $B$, $\ldots$)**: A subset of the sample space, representing a set of certain possible outcomes of the random experiment.

---

- **Elementary Event**: An event containing only one sample point.
- **Certain Event ($\Omega$)**: An event containing all sample points in the sample space.
- **Impossible Event ($\varnothing$)**: An event containing no sample points.

#### Relationships Between Random Events

- **Inclusion Relation ($A \subset B$)**: The occurrence of event $A$ necessarily leads to the occurrence of event $B$.
- **Equality Relation ($A = B$)**: $A\subset B \land B\subset A$.
- **Sum/Union of Events ($A \cup B$)**: Event $A$ **or** event $B$ occurs.
- **Product/Intersection of Events ($A \cap B$)**: Event $A$ **and** event $B$ occur.
- **Difference of Events ($A - B$)**: Event $A$ occurs **and** event $B$ does **not** occur.
- **Mutually Exclusive / Incompatible Events**: Events $A$ and $B$ are mutually exclusive, meaning events $A$ and $B$ cannot occur simultaneously, i.e., $A \cap B = \varnothing$.
- **Complementary Event ($\bar{A}$)**: Event $A$ does not occur, i.e., $\bar{A} = \Omega - A$.

> The sum of $n$ events $A_1, A_2, \ldots, A_n$ is denoted $\displaystyle \bigcup_{i=1}^n A_i$, and the product is denoted $\displaystyle \bigcap_{i=1}^n A_i$. The sum of a countable sequence of events $A_1, A_2, \ldots$ is denoted $\displaystyle \bigcup_{i=1}^{\infty} A_i$, and the product is denoted $\displaystyle \bigcap_{i=1}^{\infty} A_i$.
>
> For $n$ events $A_1, A_2, \ldots, A_n$ to be pairwise mutually exclusive, it means **any** two events are mutually exclusive, i.e., for $\forall i,j \in \{1,2,\ldots,n\}$ and $i \neq j$, we have $A_i \cap A_j = \varnothing$.
>
> For a countable sequence of events $A_1, A_2, \ldots$ to be mutually exclusive, it means any two events are mutually exclusive, i.e., for $\forall i,j \in \mathbb{N}^+$ and $i \neq j$, we have $A_i \cap A_j = \varnothing$.

#### Operations on Random Events

- Difference Set: $A-B=A\cap \bar{B}$.
- **Duality Laws (De Morgan's Laws)**: $\overline{A \cup B} = \bar{A} \cap \bar{B}$, $\overline{A \cap B} = \bar{A} \cup \bar{B}$.

> Extended to countably infinite events: $\displaystyle \overline{\bigcup_{i=1}^{\infty} A_i} = \bigcap_{i=1}^{\infty} \bar{A}\_i$, $\displaystyle \overline{\bigcap_{i=1}^{\infty} A_i} = \bigcup_{i=1}^{\infty} \bar{A}_i$.

### Probability of Random Events

#### Frequency

**Frequency ($f_n(A)$)**: In $n$ repeated trials, if event $A$ occurs $m$ times, then $\displaystyle f_n(A) = \frac{m}{n}$ is called the frequency of event $A$. Frequency possesses:

- **Non-negativity**: For any event $A$, we have $0 \leq f_n(A) \leq 1$.
- **Normalization**: For the certain event $\Omega$, we have $f_n(\Omega) = 1$.
- **Additivity**: For mutually exclusive events $A_1, A_2, \ldots, A_k$, we have $\displaystyle f_n\left(\bigcup_{i=1}^k A_i\right) = \sum_{i=1}^k f_n(A_i)$.
- **Stability**: As the number of trials $n$ increases, the frequency $f_n(A)$ approaches a certain definite value.

#### Probability

**Probability ($P(A)$)**: A measure of the likelihood of event $A$ occurring.

- **Statistical Definition of Probability**: In $n$ repeated trials under identical conditions, if the frequency of event $A$ stabilizes around a constant $p$, and this tendency increases with $n$, then $p$ is called the probability of event $A$, denoted $P(A) = p$.
- **Axiomatic Definition of Probability**: Let the sample space be $\Omega$. Define a probability measure $P:\mathcal{F}\to[0,1]$ on its $\sigma$-algebra $\mathcal{F}$. For any event $A\in\mathcal{F}$, we have:
  1. **Non-negativity**: $P(A) \geq 0$;
  2. **Normalization**: $P(\Omega) = 1$;
  3. **Countable Additivity**: For pairwise mutually exclusive events $A_1, A_2, \ldots$, we have $\displaystyle P\left(\bigcup_{i=1}^{\infty} A_i\right) = \sum_{i=1}^{\infty} P(A_i)$.

#### Properties of Probability

- $P(B-A)=P(B)-P(A\cap B)$.
- **Addition Theorem**: For any events $A$, $B$, we have $\displaystyle P(A \cup B) = P(A) + P(B) - P(AB)$.

> Generally, for any events $A_1, A_2, \ldots, A_n$, we have $\displaystyle P\left(\bigcup_{i=1}^n A_i\right) = \sum_{i=1}^n P(A_i) - \sum_{1 \leq i < j \leq n} P(A_i \cap A_j) + \ldots + (-1)^{n-1} P\big(\bigcap_{i=1}^n A_i\big)$.

#### Probability Models

**Classical Probability Model**: If the sample space $\Omega$ of a random experiment contains a finite number of sample points, and each sample point is equally likely to occur, then the random experiment is called a classical probability model. For any event $A$ in this model, let $m$ be the number of sample points in $\Omega$ contained in event $A$, and $n$ be the total number of sample points in the sample space $\Omega$. Its probability is $\displaystyle P(A) = \frac{m}{n}$.

**Geometric Probability Model**: If the sample space $\Omega$ of a random experiment is a geometric figure, and each sample point in $\Omega$ is equally likely to occur, then the random experiment is called a geometric probability model. For any event $A$ in this model, let $S_A$ be the area (or length, volume, etc.) of the geometric figure corresponding to event $A$, and $S_\Omega$ be the area (or length, volume, etc.) of the geometric figure corresponding to the sample space $\Omega$. Its probability is $\displaystyle P(A) = \frac{S_A}{S_\Omega}$.

#### Conditional Probability

**Conditional Probability ($P(A|B)$)**: The probability of event $A$ occurring given that event $B$ has occurred. It is defined as $\displaystyle P(A|B) = \frac{P(A\cap B)}{P(B)}$, where $P(B) > 0$.

**Multiplication Formula**: For any events $A$, $B$, we have $\displaystyle P(A\cap B) = P(A|B)P(B)$. Generally, for any events $A_1, A_2, \ldots, A_n$, we have $\displaystyle P\left(\bigcap_{i=1}^n A_i\right) = P(A_1)P(A_2|A_1)P(A_3|A_1\cap A_2) \cdots P(A_n|A_1\cap A_2 \cap \cdots \cap A_{n-1})$.

**Complete Set of Events**: Let events $B_1, B_2, \ldots, B_n$ satisfy $B_i \cap B_j = \varnothing$ when $i \neq j$ and $\displaystyle \bigcup_{i=1}^n B_i = \Omega$. Then the event group $B_1, B_2, \ldots, B_n$ is called a *complete set of events* or a partition of the sample space $\Omega$.
- **Law of Total Probability**: Let events $B_1, B_2, \ldots, B_n$ form a complete set of events for sample space $\Omega$, and for any $i$, we have $P(B_i) > 0$. Then for any event $A$, we have $\displaystyle P(A) = \sum_{i=1}^n P(A|B_i)P(B_i)$.
- **Bayes' Formula**: Let events $B_1, B_2, \ldots, B_n$ form a complete set of events for sample space $\Omega$, and for any $i$, we have $P(B_i) > 0$. Then for any event $A$, we have $\displaystyle P(B_i|A) = \frac{P(A|B_i)P(B_i)}{\sum_{j=1}^n P(A|B_j)P(B_j)}$.

### Independence of Random Events

**Independence of Events**: For events $A$ and $B$, if $\displaystyle P(A\cap B) = P(A)P(B)$ holds, then events $A$ and $B$ are said to be **independent**.

> **Equivalent forms**: $P(A)=P(A|B)$ or $P(B)=P(B|A)$ (provided $P(B)>0$ or $P(A)>0$). Unless in trivial cases (e.g., $P(A)=0$ or $P(B)=0$), two events cannot be both mutually exclusive and independent. Among the four pairs of events $A$, $\bar{A}$ with $B$, $\bar{B}$, if one pair is independent, then the other three pairs are also independent.

**Mutual Independence of Multiple Events**: For events $A_1, A_2, \ldots, A_n$, if for any subset $\{i_1, i_2, \ldots, i_k\} \subset \{1,2,\ldots,n\}$, we have $\displaystyle P(A_{i_1} A_{i_2} \ldots A_{i_k}) = P(A_{i_1}) P(A_{i_2}) \ldots P(A_{i_k})$, then events $A_1, A_2, \ldots, A_n$ are said to be mutually independent.

> $A_1, A_2, \ldots, A_n$ being mutually independent $\Rightarrow$ $A_i$ and $A_j$ are independent.

If we group $n$ mutually independent events $A_1, A_2, \ldots, A_n$ into disjoint index sets, and within each group perform only operations (union, intersection, difference, complement, etc.) belonging to the $\sigma$-algebra generated by the events in that group, then the resulting new events from different groups remain mutually independent.

## Random Variables and Their Distributions

### Random Variables and Distribution Functions

**Random Variable ($X(\omega)$)**: A real-valued function $X: \Omega \to \mathbb{R}$ defined on the sample space $\Omega$, i.e., for each sample point $\omega \in \Omega$, the random variable $X$ corresponds to a real number $X(\omega)$.

**Distribution Function**: For a random variable $X$, define the function $F(x) =F_X(x)= P(X \leq x)$ as the distribution function of the random variable $X$. The distribution function is **right-continuous**.

Due to the right-continuity property of the distribution function, we have:

- $\displaystyle P(a < X \leq b) = F(b) - F(a)$;
- $\displaystyle P(a \leq X \leq b) = F(b) - F(a-0)$;
- $\displaystyle P(a < X < b) = F(b-0) - F(a)$;
- $\displaystyle P(a \leq X < b) = F(b-0) - F(a-0)$.

### Discrete Random Variables

**Discrete Random Variable**: A random variable $X$ is called discrete if it takes a finite or countably infinite number of real values $x_1, x_2, \ldots$, and for each value $x_i$, there is a determined probability $P(X = x_i) = p_i$.

- **Geometric Distribution (Geom)**: Let random variable $X$ represent the number of independent repeated trials needed until event $A$ occurs for the first time, and the probability of event $A$ occurring in each trial is $p$. Then $X$ is said to follow a geometric distribution with parameter $p$, denoted $X \sim G(p)$ (taking values $1,2,\ldots$).
  - **Memoryless Property of Geometric Distribution**: For any $s,t \in \mathbb{N}^+$, we have $\displaystyle P(X > s+t \mid X > s) = P(X > t)$.
- **Bernoulli Distribution**: Let random variable $X$ represent the result of whether a particular event $A$ occurs, with probability $p$ of occurrence. Then $X$ is said to follow a Bernoulli distribution, denoted $X\sim \mathrm{Ber}(p)$ (can also be denoted $B(1,p)$).
- **Binomial Distribution**: Let random variable $X$ represent the number of times event $A$ occurs in $n$ independent repeated trials, with probability $p$ of event $A$ occurring in each trial. Then $X$ is said to follow a binomial distribution with parameters $(n, p)$, denoted $X \sim B(n,p)$.
  - When $(n+1)p$ is an integer, the most probable number of successes for the binomial distribution is $\displaystyle k^* =(n+1)p$ or $(n+1)p - 1$; otherwise, it is $\displaystyle \lfloor (n+1)p \rfloor$.
- **Pascal Distribution (Negative Binomial)**: Let random variable $X$ represent the number of independent repeated trials needed until event $A$ occurs for the $r$-th time, with probability $p$ of event $A$ occurring in each trial. Then $X$ is said to follow a negative binomial distribution with parameters $(r, p)$, denoted $X \sim NB(r, p)$.
- **Poisson Distribution**: Let random variable $X$ represent the number of occurrences of a certain event within a specific time interval (or spatial region), and the average number of occurrences per unit time (or unit space) is $\lambda$. Then $X$ is said to follow a Poisson distribution with parameter $\lambda$, denoted $X \sim \mathrm{P}(\lambda)$.
  - **Poisson Theorem**: Let random variable $X_n$ follow a binomial distribution $B(n, p_n)$ with parameters $(n, p_n)$. If as $n \to \infty$, $np_n \to \lambda$, then for any non-negative integer $k$, we have $\displaystyle \lim_{n\to\infty} P(X_n = k) = \frac{\lambda^k}{k!} e^{-\lambda}$, i.e., the distribution of $X_n$ gradually approaches a Poisson distribution with parameter $\lambda$.

| | Geometric Distribution | Binomial Distribution | Pascal Distribution | Poisson Distribution |
|--|--|--|--|--|
| Notation | $X \sim G(p)$ | $X \sim B(n, p)$ | $X \sim NB(r, p)$ | $X \sim P(\lambda)$ |
| Domain | $k = 1,2,\ldots$ | $k = 0,1,\ldots,n$ | $k = r, r+1, \ldots$ | $k = 0,1,2,\ldots$ |
| Probability Distribution | $\displaystyle P(X = k) = p(1-p)^{k-1}$ | $\displaystyle P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$ | $\displaystyle P(X = k) = \binom{k-1}{r-1} p^r (1-p)^{k-r}$ | $\displaystyle P(X = k) = \frac{\lambda^k}{k!} e^{-\lambda}$ |
| Expectation | $\displaystyle E(X) = \frac{1}{p}$ | $\displaystyle E(X) = np$ | $\displaystyle E(X) = \frac{r}{p}$ | $\displaystyle E(X) = \lambda$ |
| Variance | $\displaystyle D(X) = \frac{1-p}{p^2}$ | $\displaystyle D(X) = np(1-p)$ | $\displaystyle D(X) = \frac{r(1-p)}{p^2}$ | $\displaystyle D(X) = \lambda$ |
| Special Properties | Memoryless | Additivity | Additivity | Additivity |

### Continuous Random Variables

**Probability Density Function of a Continuous Random Variable**: Let the distribution function of random variable $X$ be $F(x)$. If there exists a non-negative function $f(x)$ such that for any real number $x$, we have $\displaystyle F(x) = \int_{-\infty}^{x} f(t)\mathrm{d}t$, then $f(x)$ is called the probability density function of the random variable $X$.

The distribution function of a continuous random variable is continuous.

The probability density function is not unique; it can differ at a finite or countably infinite number of points. The probability density function describes the probability of $X$ taking a value in a unit-length interval near $x$, i.e., $P(x \leq X \leq x + \Delta x) \approx f(x) \Delta x$.

- **Uniform Distribution**: Let random variable $X$ follow a uniform distribution on interval $[a,b]$, denoted $X \sim U(a,b)$.
- **Exponential Distribution**: Let random variable $X$ represent the time interval between occurrences of a certain event, and the average rate of occurrence is $\lambda$. Then $X$ is said to follow an exponential distribution with parameter $\lambda$, denoted $X \sim E(\lambda)$.
  - **Memoryless Property of Exponential Distribution**: For any $s,t \geq 0$, we have $\displaystyle P(X > s+t \mid X > s) = P(X > t)$.
- **Normal Distribution**: Let random variable $X$ follow a normal distribution with parameters $(\mu, \sigma^2)$, denoted $X \sim N(\mu, \sigma^2)$. Its probability density function is $\displaystyle f(x) = \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$.
  - **Linear transformations and linear combinations remain normal**.

| | Uniform Distribution | Exponential Distribution | Normal Distribution |
|--|--|--|--|
| Notation | $ U(a,b)$ | $E(\lambda)$ | $N(\mu, \sigma^2)$ |
| Domain | $[a,b]$ | $[0, +\infty)$ | $(-\infty, +\infty)$ |
| Probability Density Function | $\displaystyle\frac{1}{b-a}$ | $\displaystyle \lambda e^{-\lambda x}$ | $\displaystyle \frac{1}{\sqrt{2\pi}\sigma} \exp{\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)}$ |
| Distribution Function | $\displaystyle \begin{cases} 0, & x < a \\ \frac{x-a}{b-a}, & a \leq x \leq b \\ 1, & x > b \end{cases}$ | $\displaystyle  \begin{cases} 0, & x < 0 \\ 1 - e^{-\lambda x}, & x \geq 0 \end{cases}$ | $\displaystyle \Phi\left(\frac{x-\mu}{\sigma}\right)$ |
| Expectation | $\displaystyle \frac{a+b}{2}$ | $\displaystyle \frac{1}{\lambda}$ | $\displaystyle \mu$ |
| Variance | $\displaystyle \frac{(b-a)^2}{12}$ | $\displaystyle \frac{1}{\lambda^2}$ | $\displaystyle \sigma^2$ |
| Special Properties |   | Memoryless | |

There exist random variables that are neither discrete nor continuous; they are called **mixed-type random variables**.

### Functions of Random Variables and Their Distributions

This section analyzes a specific type of problem: given the distribution of random variable $X$, find the distribution of random variable $Y = g(X)$. The general method is to transform events concerning $Y$ into events concerning $X$.

For discrete random variables, let random variable $X$ take values $x_1, x_2, \ldots$ with corresponding probabilities $p_1, p_2, \ldots$. Given a function $Y=g(X)$, then $\displaystyle P(Y = y_i) = \sum_{k:g(x_k)=y_i}P(X = x_k)$.

For continuous random variables, if the function $Y=g(X)$ is strictly monotonic and differentiable, then the corresponding probability density function is $\displaystyle f_Y(y) = f_X\left[g^{-1}(y)\right] \left|\frac{\mathrm{d}g^{-1}(y)}{\mathrm{d}y}\right|$.

For piecewise strictly monotonic functions $Y=g(X)$, the corresponding probability density function is $\displaystyle f_Y(y) = \sum_{k} f_X\left(g_k^{-1}(y)\right) \left|\frac{\mathrm{d}}{\mathrm{d}y}g_k^{-1}(y)\right|$, where $g_k^{-1}(y)$ is the inverse function of $g(x)$ on the $k$-th segment.

## Multidimensional Random Variables and Their Distributions

**Two-dimensional Random Vector**: Let random variables $X$ and $Y$ be defined on the same probability space. Then the random variable pair $(X, Y)$ is called a two-dimensional random variable or two-dimensional random vector.

- **Joint Distribution Function**: For a two-dimensional random variable $(X, Y)$, define the function $\displaystyle F(x,y) = F_{X,Y}(x,y) = P(X \leq x, Y \leq y)$ as the joint distribution function of $(X, Y)$. The joint function is right-continuous with respect to both $x$ and $y$.
  - The joint distribution function of a two-dimensional random variable must satisfy $(\forall x_1 \leq x_2, y_1 \leq y_2)$, $\displaystyle P(x_1 < X \leq x_2, y_1 < Y \leq y_2) = F(x_2, y_2) - F(x_2, y_1) - F(x_1, y_2) + F(x_1, y_1) \geq 0$.
- **Marginal Distribution Function**: Let the joint distribution function of two-dimensional random variable $(X, Y)$ be $F(x,y)$. Then define $\displaystyle F_X(x) = \lim_{y \to +\infty} F(x,y)$ as the marginal distribution function of $X$, and define $\displaystyle F_Y(y) = \lim_{x \to +\infty} F(x,y)$ as the marginal distribution function of $Y$.
- The joint distribution function determines the marginal distribution functions, but the converse is not true.

---

- **Joint Density Function**: Let the joint distribution function of two-dimensional random variable $(X, Y)$ be $F(x,y)$. If there exists a non-negative function $f(x,y)$ such that for any real numbers $x$, $y$, we have $\displaystyle F(x,y) = \int_{-\infty}^{y} \int_{-\infty}^{x} f(u,v) \mathrm{d}u \mathrm{d}v$, then $f(x,y)$ is called the joint probability density function of $(X, Y)$.
- **Marginal Density Function**: Let the joint probability density function of two-dimensional random variable $(X, Y)$ be $f(x,y)$. Then define $\displaystyle f_X(x) = \int_{-\infty}^{+\infty} f(x,y) \mathrm{d}y$ as the marginal density function of $X$, and define $\displaystyle f_Y(y) = \int_{-\infty}^{+\infty} f(x,y) \mathrm{d}x$ as the marginal density function of $Y$.

---

- **Joint Distribution of Two-dimensional Discrete Random Variables**: Let two-dimensional random variable $(X, Y)$ be discrete, taking values $(x_i, y_j)$. Then define $\displaystyle P(X = x_i, Y = y_j) = p_{ij}$ as the joint distribution of $(X, Y)$. For two-dimensional discrete random variables, the distribution function and distribution law mutually determine each other.
- **Marginal Distribution**: Let the joint distribution of two-dimensional random variable $(X, Y)$ be $p_{ij}$. Then define $\displaystyle P(X = x_i) = \sum_{j} p_{ij}$ as the marginal distribution of $X$, and define $\displaystyle P(Y = y_j) = \sum_{i} p_{ij}$ as the marginal distribution of $Y$.
- The joint distribution determines the marginal distributions, but the converse is not true.

---

- **Joint Distribution Function of Multidimensional Random Variables**: Let random variables $X_1, X_2, \ldots, X_n$ be defined on the same probability space. Then the random variable group $(X_1, X_2, \ldots, X_n)$ is called an $n$-dimensional random variable or $n$-dimensional random vector. Define the function $\displaystyle F(x_1, x_2, \ldots, x_n) = P(X_1 \leq x_1, X_2 \leq x_2, \ldots, X_n \leq x_n)$ as the joint distribution function of the $n$-dimensional random variable $(X_1, X_2, \ldots, X_n)$.
- **Marginal Distribution Function of Multidimensional Random Variables**: Let the joint distribution function of $n$-dimensional random variable $(X_1, X_2, \ldots, X_n)$ be $F(x_1, x_2, \ldots, x_n)$. Then define $\displaystyle F_{X_i}(x_i) = \lim_{x_1 \to +\infty} \ldots \lim_{x_{i-1} \to +\infty} \lim_{x_{i+1} \to +\infty} \ldots \lim_{x_n \to +\infty} F(x_1, x_2, \ldots, x_n)$ as the marginal distribution function of random variable $X_i$.

### Common Two-dimensional Random Variable Distributions

- **Uniform Distribution**: Let two-dimensional random variable $(X, Y)$ follow a uniform distribution over region $S$, denoted $(X, Y) \sim U(S)$.
  - For a uniform distribution over a rectangle with sides parallel to the coordinate axes, the marginal distributions are also uniform.
- **Bivariate Normal Distribution**: Let two-dimensional random variable $(X, Y)$ follow a bivariate normal distribution with parameters $(\mu_X, \mu_Y, \sigma_X^2, \sigma_Y^2, \rho)$, denoted $(X, Y) \sim N_2(\mu_X, \mu_Y, \sigma_X^2, \sigma_Y^2, \rho)$. Its joint probability density function is $\displaystyle f(x,y) = \frac{1}{2\pi \sigma_X \sigma_Y \sqrt{1-\rho^2}} \exp\left\\{-\frac{1}{2(1-\rho^2)}\left[\left(\frac{x-\mu_X}{\sigma_X}\right)^2 - 2\rho \left(\frac{x-\mu_X}{\sigma_X}\right)\left(\frac{y-\mu_Y}{\sigma_Y}\right) + \left(\frac{y-\mu_Y}{\sigma_Y}\right)^2\right]\right\\}$.
  - Define the matrix $C=\begin{pmatrix} \sigma_X^2 & \rho \sigma_X \sigma_Y \\\\ \rho \sigma_X \sigma_Y & \sigma_Y^2 \end{pmatrix}$ as the covariance matrix of the bivariate normal distribution. Then the probability density function can be rewritten as $\displaystyle f(x,y) = \frac{1}{2\pi \sqrt{|C|}} \exp\left\\{-\frac{1}{2} \begin{pmatrix} x - \mu_X & y - \mu_Y \end{pmatrix} C^{-1} \begin{pmatrix} x - \mu_X \\\\ y - \mu_Y \end{pmatrix}\right\\}$.
  - The marginal distributions of a normal distribution are still normal. For the above density function, $X\sim N(\mu_X, \sigma_X^2)$, $Y\sim N(\mu_Y, \sigma_Y^2)$.
  - The conditional distributions of a normal distribution are still normal. For the above density function, $X|Y=y \sim N\left(\mu_X + \rho \frac{\sigma_X}{\sigma_Y}(y - \mu_Y), (1-\rho^2)\sigma_X^2\right)$, $Y|X=x \sim N\left(\mu_Y + \rho \frac{\sigma_Y}{\sigma_X}(x - \mu_X), (1-\rho^2)\sigma_Y^2\right)$.
  - A two-dimensional random variable whose marginal densities are one-dimensional normal is not necessarily bivariate normal. Non-normal distributions can also have normal marginals.

| | Uniform Distribution | Normal Distribution |
|--|--|--|
| Notation | $U(S)$ | $N_2(\mu_X, \mu_Y, \sigma_X^2, \sigma_Y^2, \rho)$ |
| Domain | $\{(x,y) \mid (x,y)\in S\}$ | $(-\infty, +\infty) \times (-\infty, +\infty)$ |
| Joint Probability Density Function | $\displaystyle\frac{1}{\left\vert S\right\vert}$ | $\displaystyle \frac{1}{2\pi \sqrt{\left\vert C\right\vert}} \exp\left\\{-\frac{1}{2} \begin{pmatrix} x - \mu_X & y - \mu_Y \end{pmatrix} C^{-1} \begin{pmatrix} x - \mu_X \\ y - \mu_Y \end{pmatrix}\right\\}$ |

### Conditional Distribution of Two-dimensional Random Variables

For discrete two-dimensional random variables, define the **conditional distribution of $X$ given $Y=y_i$** as $\displaystyle P(X = x_j \mid Y = y_i) = \frac{P(X = x_j, Y = y_i)}{P(Y = y_i)}$. Similarly, define the **conditional distribution of $Y$ given $X=x_i$**.

For continuous two-dimensional random variables, define the **conditional probability density function of $X$ given $Y=y$** as $\displaystyle f_{X|Y}(x|y) = \frac{f_{X,Y}(x,y)}{f_Y(y)}$ (requiring $f_Y(y)>0$), and the **conditional distribution function** as $\displaystyle F_{X|Y}(x|y) = \int_{-\infty}^x f_{X|Y}(t|y)\, \mathrm{d}t$. Similarly, define the **conditional probability density function of $Y$ given $X=x$**, **conditional distribution function** (requiring $f_X(x)>0$).

### Independence of Random Variables

Random variables $X$ and $Y$ are defined to be **independent** if and only if for any real numbers $x$, $y$, we have $\displaystyle P(X \leq x, Y \leq y) = P(X \leq x) P(Y \leq y)$, i.e., $\displaystyle F_{X,Y}(x,y) = F_X(x) F_Y(y)$. In this case, the marginal and joint distribution functions mutually determine each other.

If random variables are independent, then their continuous functions remain independent.

**Necessary and Sufficient Condition for Independence (Density Factorization)**: If $(X,Y)$ has a joint density $f_{X,Y}$, then $X$ and $Y$ are independent if and only if there exist non-negative integrable functions $g(x)$ and $h(y)$ such that $\displaystyle f_{X,Y}(x,y) = g(x)\, h(y)$. Then $\displaystyle f_X(x)=\frac{g(x)}{\int_{-\infty}^{+\infty} g(t)\, dt}$, $\displaystyle f_Y(y)=\frac{h(y)}{\int_{-\infty}^{+\infty} h(t)\, dt}$, and thus $f_{X,Y}(x,y)=f_X(x)f_Y(y)$.

Define $n$-dimensional random variables $X_1, X_2, \ldots, X_n$ to be **mutually independent** if and only if for any real numbers $x_1, x_2, \ldots, x_n$, we have $\displaystyle P(X_1 \leq x_1, X_2 \leq x_2, \ldots, X_n \leq x_n) = \prod_{i=1}^n P(X_i \leq x_i)$, i.e., $\displaystyle F(x_1, x_2, \ldots, x_n) = \prod_{i=1}^n F_{X_i}(x_i)$.

### Distribution of Functions of Multidimensional Random Variables

The basic approach to solving the distribution problem for functions of multidimensional random variables is similar to that for one-dimensional random variable functions, both transforming events concerning the new random variable into events concerning the original random variables.

**Distribution of the Sum of Continuous Random Variables**: Let random variable $Z = aX + bY+c$. Then its probability density function is $\displaystyle f_Z(z) = \frac{1}{\mid b \mid}\int_{-\infty}^{+\infty} f_{X,Y}(x, \frac{z-c-ax}{b}) \mathrm{d}x=\frac{1}{\mid a\mid}\int_{-\infty}^{+\infty} f_{X,Y}(\frac{z-c-by}{a}, y) \mathrm{d}y$.

In particular, for the normal distribution $(X,Y) \sim N_2(\mu_X, \mu_Y, \sigma_X^2, \sigma_Y^2, \rho)$, then $Z = aX + bY + c \sim N(a\mu_X + b\mu_Y + c, a^2 \sigma_X^2 + b^2 \sigma_Y^2 + 2ab\rho \sigma_X \sigma_Y)$.

**Distribution of the Quotient of Continuous Random Variables**: Let random variable $\displaystyle Z = \frac{X}{Y}$. Then its probability density function is $\displaystyle f_Z(z) = \int_{-\infty}^{+\infty} \mid y \mid f_{X,Y}(zy, y) \mathrm{d}y$.

**Distribution of the Sum of Squares of Continuous Random Variables**: Let random variable $\displaystyle Z = X^2 + Y^2$. Then its probability density function is $\displaystyle f_Z(z) = \int_{-\pi}^{\pi} \frac{1}{2}\, f_{X,Y}(\sqrt{z}\cos \theta, \sqrt{z}\sin \theta)\, \mathrm{d}\theta$ (obtained by polar coordinate transformation, $|\mathrm{Jac}|=\tfrac{1}{2}$).

**Distribution of Extremes of Continuous Random Variables**: Let random variable $Z = \max(X, Y)$. Then its distribution function is $\displaystyle F_Z(z) = P(Z \leq z) = P(X \leq z, Y \leq z) = F_{X,Y}(z, z)$. Let $W=\min(X, Y)$. Similarly, $\displaystyle F_{W}(w) = P(W \leq w) = P(\min(X, Y) \leq w) = 1 - P(X > w, Y > w) = 1 - [1 - F_X(w)][1 - F_Y(w)]$.

Extending to $n$-dimensional random variables $(X_1, X_2, \ldots, X_n)$: $\displaystyle F_{\max}(z) = P(\max(X_1, X_2, \ldots, X_n) \leq z) = P(X_1 \leq z, \ldots, X_n \leq z) = F(\underbrace{z,\ldots,z}\_{n\text{ times}})$; $\displaystyle F_{\min}(w) = P(\min(X_1, X_2, \ldots, X_n) \leq w) = 1 - P(X_1 > w, \ldots, X_n > w) = 1 - \prod_{i=1}^n [1 - F_{X_i}(w)]$.

## Numerical Characteristics of Random Variables

### Expectation

- **Expectation**: Define the expectation of a discrete random variable $X$ as $\displaystyle E(X) = \sum_{i} x_i p_i$. Define the expectation of a continuous random variable $X$ as $\displaystyle E(X) = \int_{-\infty}^{+\infty} x f(x) \mathrm{d}x$.
- **Expectation of a Function of a Random Variable**: For a random variable $X$, define the expectation of a discrete random variable $Y = g(X)$ as $\displaystyle E(Y) = \sum_{i} g(x_i) p_i$. Define the expectation of a continuous random variable $Y = g(X)$ as $\displaystyle E(Y) = \int_{-\infty}^{+\infty} g(x) f(x) \mathrm{d}x$.
- **Expectation of a Function of Two-dimensional Random Variables**: For a two-dimensional random variable $(X, Y)$, define the expectation of a discrete random variable $Z = g(X, Y)$ as $\displaystyle E(Z) = \sum_{i} \sum_{j} g(x_i, y_j) p_{ij}$. Define the expectation of a continuous random variable $Z = g(X, Y)$ as $\displaystyle E(Z) = \int_{-\infty}^{+\infty} \int_{-\infty}^{+\infty} g(x,y) f_{X,Y}(x,y) \mathrm{d}x \mathrm{d}y$.

Some properties of expectation:
1. $E(a) = a$, where $a$ is a constant;
2. $E(aX + b) = aE(X) + b$;
3. $E(X + Y) = E(X) + E(Y)$;
4. If random variables $X$ and $Y$ are independent, then $E(XY) = E(X)E(Y)$. **The converse of this proposition is not true.**

### Variance

**Variance**: Define the variance of a random variable $X$ as $\displaystyle D(X) = E[(X - E(X))^2]$.

**Calculation Formula**: $\displaystyle D(X) = E(X^2) - [E(X)]^2$.

Some properties of variance:
1. $D(a) = 0$, where $a$ is a constant;
2. $D(aX + b) = a^2 D(X)$, where $a,b$ are constants;
3. $D(X + Y) = D(X) + D(Y) + 2 \mathrm{cov}(X, Y)$, $D(X- Y)=D(X) + D(Y) - 2 \mathrm{cov}(X, Y)$;
4. If random variables $X$ and $Y$ are independent, then $D(X + Y) = D(X) + D(Y)$. **The converse of this proposition is not true.**

**Standardized Random Variable**: Define the standardized random variable of $X$ as $\displaystyle Z = \frac{X - E(X)}{\sqrt{D(X)}}$. Then $E(Z) = 0$, $D(Z) = 1$.

### Covariance and Correlation Coefficient

**Covariance**: Define the covariance of random variables $X$ and $Y$ as $\displaystyle \mathrm{cov}(X, Y) = E[(X - E(X))(Y - E(Y))]$. For continuous random variables, $\displaystyle \mathrm{cov}(X, Y) = \int_{-\infty}^{+\infty} \int_{-\infty}^{+\infty} (x - E(X))(y - E(Y)) f_{X,Y}(x,y) \mathrm{d}x \mathrm{d}y$.

Calculation formula: $\displaystyle \mathrm{cov}(X, Y) = E(XY) - E(X)E(Y)=\pm\frac{1}{2}[D(X\pm Y) - D(X) - D(Y)]$.

**Correlation Coefficient**: Define the correlation coefficient of random variables $X$ and $Y$ as $\displaystyle \rho_{XY} = \frac{\mathrm{cov}(X, Y)}{\sqrt{D(X)}\sqrt{D(Y)}}$.

$-1 \leq \rho_{XY} \leq 1$. When $\rho_{XY} = 1$, $X$ and $Y$ are said to be completely positively correlated; when $\rho_{XY} = -1$, $X$ and $Y$ are said to be completely negatively correlated. When $\rho_{XY} = 0$, $X$ and $Y$ are said to be uncorrelated.

> If random variables $X$ and $Y$ are independent, then $\rho_{XY} = 0$. **The converse of this proposition is not true.**

Some properties of covariance:
1. $\mathrm{cov}(X, X) = D(X)$;
2. $\mathrm{cov}(X, Y) = \mathrm{cov}(Y, X)$;
3. $\mathrm{cov}(aX , bY) = ab \mathrm{cov}(X, Y)$, where $a,b$ are constants;

**Cauchy-Schwarz Inequality**: For any random variables $X$ and $Y$, $\displaystyle [\mathrm{cov}(X, Y)]^2 \leq D(X) D(Y)$. Equality holds if and only if there exists a constant $t_0$ such that $P(Y-E(Y)=t_0\left(X-E(X)\right)) = 1$.

Equality implies the linear relationship $\displaystyle \frac{Y-E(Y)}{\sqrt{D(Y)}} =\pm \frac{X-E(X)}{\sqrt{D(X)}}$ holds.

### Higher-order Moments of Random Variables

- **$k$-th Moment of a Random Variable**: Define the $k$-th moment of random variable $X$ as $\displaystyle E(X^k)$.
- **$k$-th Central Moment of a Random Variable**: Define the $k$-th central moment of random variable $X$ as $\displaystyle E[(X - E(X))^k]$.
- **$(m+n)$-th Mixed Origin Moment of Random Variables**: Define the $(m+n)$-th mixed origin moment of two-dimensional random variable $(X, Y)$ as $\displaystyle E(X^m Y^n)$.
- **$(m+n)$-th Mixed Central Moment of Random Variables**: Define the $(m+n)$-th mixed central moment of two-dimensional random variable $(X, Y)$ as $\displaystyle E[(X - E(X))^m (Y - E(Y))^n]$. Covariance is the second-order mixed central moment of $(X, Y)$.

**Covariance Matrix**: For an $n$-dimensional random variable $(X_1, X_2, \ldots, X_n)$, define the matrix $C$ as its covariance matrix, with elements $\displaystyle c_{ij} = \mathrm{cov}(X_i, X_j)$, i.e., $\displaystyle C = \begin{pmatrix} D(X_1) & \mathrm{cov}(X_1, X_2) & \cdots & \mathrm{cov}(X_1, X_n) \\\\ \mathrm{cov}(X_2, X_1) & D(X_2) & \cdots & \mathrm{cov}(X_2, X_n) \\\\ \vdots & \vdots & \ddots & \vdots \\\\ \mathrm{cov}(X_n, X_1) & \mathrm{cov}(X_n, X_2) & \cdots & D(X_n) \end{pmatrix}$.

> We can write the probability density function for an $n$-dimensional normal distribution: $\displaystyle f(x_1, x_2, \ldots, x_n) = \frac{1}{(2\pi)^{n/2} \sqrt{|C|}} \exp\left\\{-\frac{1}{2} \begin{pmatrix} x_1 - \mu_1 & x_2 - \mu_2 & \cdots & x_n - \mu_n \end{pmatrix} C^{-1} \begin{pmatrix} x_1 - \mu_1 \\\\ x_2 - \mu_2 \\\\ \vdots \\\\ x_n - \mu_n \end{pmatrix}\right\\}$.

Properties:
1. The covariance matrix is positive semi-definite, i.e., $\displaystyle \forall \mathbf{a} \in \mathbb{R}^n, \mathbf{a}^T C \mathbf{a} \geq 0$;
2. $C$ is positive definite if and only if there is no non-zero vector $\mathbf{a}$ such that $\displaystyle\sum_{i=1}^n a_i X_i$ is constant (i.e., no non-trivial almost-everywhere linear relationship).
3. For any real numbers $a_1, a_2, \ldots, a_n$, we have $\displaystyle D\left(\sum_{i=1}^n a_i X_i\right) = \begin{pmatrix} a_1 & a_2 & \cdots a_n \end{pmatrix} C \begin{pmatrix} a_1 \\ a_2 \\ \vdots \\ a_n \end{pmatrix}$.
4. If random variables $X_1, X_2, \ldots, X_n$ are mutually independent, then their covariance matrix is diagonal.

## Laws of Large Numbers and Central Limit Theorem

### Preliminary Knowledge

**Chebyshev's Inequality**: Let random variable $X$ have finite variance $D(X)$. Then for any $\varepsilon>0$, we have
$\displaystyle P(|X-E(X)|\geq \varepsilon) \leq \frac{D(X)}{\varepsilon^2}$, or $\displaystyle P(|X-E(X)|< \varepsilon) \geq 1-\frac{D(X)}{\varepsilon^2}$.

**Convergence in Probability**: Let a sequence of random variables $\{X_n\}$ and a random variable $X$ be defined on the same probability space. If for any $\varepsilon>0$, we have
$\displaystyle \lim_{n\to\infty} P(|X_n - X|\geq \varepsilon) = 0$ or $\displaystyle \lim_{n\to\infty} P(|X_n -X| \leq \varepsilon) = 1$, then the sequence $\{X_n\}$ is said to **converge in probability** to $X$, denoted $X_n \xrightarrow[n\to\infty]{P} X$.

### Laws of Large Numbers

- **Law of Large Numbers**: A sequence of random variables $\{X_n\}$ is said to obey the law of large numbers if for $\forall \varepsilon>0$, we have $\displaystyle \lim_{n\to\infty} P\left(\left|\frac{1}{n}\sum_{k=1}^{n}X_k - \frac{1}{n}\sum_{k=1}^{n}E(X_k)\right|\geq \varepsilon\right) = 0$, i.e., $\displaystyle \frac{1}{n}\sum_{i=1}^n X_i \xrightarrow[n\to\infty]{P} \frac{1}{n}\sum_{i=1}^n E(X_i)$.
- **Bernoulli's Law of Large Numbers**: Let $n_A$ be the number of times event $A$ occurs in $n$ independent repeated trials, and $p$ be the probability of $A$ occurring in each trial. Then for any $\varepsilon>0$, we have $\displaystyle \lim_{n\to\infty} P\left(\left|\frac{n_A}{n} - p\right|<\varepsilon\right) = 1$ or $\displaystyle \lim_{n\to\infty} P\left(\left|\frac{n_A}{n} - p\right|\geq \varepsilon\right) = 0$, i.e., $\displaystyle\frac{n_A}{n} \xrightarrow[n\to\infty]{P} p$.
  - Bernoulli's law states that in a large number of repeated trials, the frequency $\displaystyle\frac{n_A}{n}$ of event $A$ approaches the probability $p$ of $A$.
- **Chebyshev's Law of Large Numbers**: Let a sequence of random variables $\{X_n\}$ be pairwise uncorrelated, with finite variances that have a common upper bound. Then the sequence obeys the law of large numbers, i.e., for any $\varepsilon>0$, $\displaystyle \lim_{n\to\infty} P\left(\left|\frac{1}{n}\sum_{k=1}^{n}X_k - \frac{1}{n}\sum_{k=1}^{n}E(X_k)\right|\geq \varepsilon\right) = 0$, i.e., $\displaystyle \frac{1}{n}\sum_{i=1}^n X_i \xrightarrow[n\to\infty]{P} \frac{1}{n}\sum_{i=1}^n E(X_i)$.
  - The condition of pairwise uncorrelation can be replaced by the **Markov condition**: $\displaystyle \frac{1}{n^2}D\left(\sum_{k=1}^n X_k\right) \xrightarrow[]{n\to \infty} 0$.
- **Khintchine's Law of Large Numbers**: Let a sequence of random variables $\{X_n\}$ be independent and identically distributed (i.i.d.) with $E(X_i) = \mu$. Then the sequence obeys the law of large numbers, i.e., for any $\varepsilon>0$, $\displaystyle \lim_{n\to\infty} P\left(\left|\frac{1}{n}\sum_{k=1}^{n}X_k - \mu\right|\geq \varepsilon\right) = 0$, i.e., $\displaystyle \frac{1}{n}\sum_{i=1}^n X_i \xrightarrow[n\to\infty]{P} \mu$.
  - Khintchine's law states that the arithmetic mean converges to the expectation; it does not strictly require finite variance.
  - Khintchine's law can be extended to the $k\in \mathbb{N}$-th moment: Let $\{X_n\}$ be i.i.d. with $E(X_i^k) =\mu_k$. Then for any $\varepsilon>0$, $\displaystyle \lim_{n\to\infty} P\left(\left|\frac{1}{n}\sum_{i=1}^{n}X_i^k - \mu_k\right|\geq \varepsilon\right) = 0$, i.e., $\displaystyle \frac{1}{n}\sum_{i=1}^n X_i^k \xrightarrow[n\to\infty]{P} \mu_k$.

---

**Monte Carlo Method** can be used to compute integrals. Let function $f(x)$ be defined and bounded on interval $[a,b]$. If we randomly and uniformly take $n$ points $x_1,\ldots,x_n$ in $[a,b]$ and compute the average $\displaystyle\overline{f} = \frac{1}{n}\sum_{i=1}^n f(x_i)$, then for sufficiently large $n$, $\displaystyle \int_a^b f(x)\mathrm{d}x \approx (b-a)\overline{f}$.

### Central Limit Theorem

- **Central Limit Theorem for i.i.d. Sequences**: Let $\{X_n\}$ be an i.i.d. sequence with $E(X_i) = \mu$, $D(X_i) = \sigma^2 >0$. Then for sufficiently large $n$, the distribution of the standardized sum $\displaystyle Z_n = \frac{\sum_{i=1}^n X_i - n\mu}{\sigma \sqrt{n}}$ is approximately standard normal $N(0,1)$. That is, for any real $x$, $\displaystyle \lim_{n\to\infty} P(Z_n \leq x) = \Phi(x)$, where $\Phi(x)$ is the standard normal distribution function. In short, **the limiting distribution of the standardized sum is standard normal**.
- **DeMoivre-Laplace Central Limit Theorem**: Let random variable $X$ follow a binomial distribution $B(n,p)$. Then for sufficiently large $n$, the distribution of $\displaystyle Z = \frac{X - np}{\sqrt{np(1-p)}}$ is approximately standard normal $N(0,1)$. That is, for any real $x$, $\displaystyle \lim_{n\to\infty} P(Z \leq x) = \Phi(x)$. Consequently, for large $n$, the binomial distribution $B(n,p)$ can be approximated by the normal distribution $N(np, np(1-p))$.

## Fundamental Concepts of Mathematical Statistics

### Basic Concepts

- **Population** is the entire set of objects under study. A population is the totality of a certain (or some) quantitative indicator(s) of the objects, denoted $\mathcal{X}$.
- An **Individual** is a single element of the population, denoted $X_i$. An individual can be viewed as a particular value of the population.
- A **Sample** is a subset of individuals drawn from the population, denoted $\mathcal{X}_n = \\\{X_1, X_2, \ldots, X_n\\\}$, where $X_i$ is the $i$-th individual and $n$ is the *sample size*. The sequentially observed sample values are denoted $x_1, x_2, \ldots, x_n$, called a *sample observation* of size $n$ from population $\mathcal{X}$, or a *realization* of the sample, or simply the *sample values*.
- **Sample Space** is the set of all possible results of the sample observations, denoted $\Omega$.
- **Simple Random Sample**. A sample drawn randomly from the population, where each individual is *independent* and *identically distributed*, is called a **simple random sample**.
- **Statistic**. For a sample $\mathcal{X}_n = \\\{X_1, X_2, \ldots, X_n\\\}$, if a real-valued continuous function $T = T(X_1, X_2, \ldots, X_n)$ depends only on the random variables $X_1, X_2, \ldots, X_n$ and does not depend on unknown parameters of the population, then $T$ is called a **statistic**. *A statistic is itself a random variable.* Common statistics include:
  - **Sample mean** $\displaystyle\bar{X}=\frac{1}{n}\sum_{i=1}^{n}X_i$;
  - **Sample variance** $\displaystyle S^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar{X})^2$;
  - **Sample standard deviation** $\displaystyle S = \sqrt{\frac{1}{n-1}\sum_{i=1}^n (X_i - \bar{X})^2}$;
  - **Sample $k$-th origin moment** $\displaystyle M_k=\frac{1}{n}\sum_{i=1}^n X_i^k$;
  - **Sample $k$-th central moment** $\displaystyle (CM)\_k=\frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^k$.

> - $\displaystyle (CM)\_2=M_2-\bar{X}^2=\frac{1}{n}\sum_{i=1}^nX_i^2-\bar{X}^2$.
> - $E(\bar{X})=\mu$.
> - $D(\bar{X})=\displaystyle\frac{\sigma^2}{n}$.
> - $E(S^2)=\sigma^2$.
> - $E(CM_2)=\displaystyle\frac{n-1}{n}\sigma^2$.

**Order Statistics**. For a sample $\mathcal{X} = \\\{X_1, X_2, \ldots, X_n\\\}$, arrange the random variables in increasing order: $X_{(1)} \leq X_{(2)} \leq \ldots \leq X_{(n)}$. Then $X_{(1)}, X_{(2)}, \ldots, X_{(n)}$ are called the **order statistics** of the sample, where $X_{(1)}$ is the **sample minimum**, $X_{(n)}$ is the **sample maximum**, and $X_{(k)}$ is the **$k$-th sample quantile**.

We can define:
- **Range** $D_n = X_{(n)} - X_{(1)}$;
- **Median** $\displaystyle\widetilde{x} =x_{(\frac{n+1}{2})}$ (when $n$ is odd) or $\displaystyle \widetilde{x} = \frac{x_{(\frac{n}{2})} + x_{(\frac{n}{2}+1)}}{2}$ (when $n$ is even).

**Upper $\alpha$ Quantile**. Let the distribution function of population $\mathcal{X}$ be $F(x)$. If there exists a unique real number $x_\alpha$ such that $F(x_\alpha) = 1 - \alpha$, then $x_\alpha$ is called the **upper $\alpha$ quantile** of population $\mathcal{X}$.

### Distributions of Several Commonly Used Quantities

#### $\mathcal{X}^2(n)$ Distribution

Let random variables $X_1, X_2, \ldots, X_n$ be independent, each following a standard normal distribution $N(0,1)$. Then the random variable $\displaystyle Y = \sum_{i=1}^n X_i^2$ follows a chi-square distribution with $n$ degrees of freedom, denoted $Y \sim \mathcal{X}^2(n)$.

The density function of the chi-square distribution is:

$$\displaystyle f_{\mathcal{X}^2(n)}(x) = \begin{cases} \frac{1}{2^{\frac{n}{2}}\Gamma\left(\frac{n}{2}\right)} x^{\frac{n}{2}-1} e^{-\frac{x}{2}}, & x>0 \\ 0, & \text{o.w.} \end{cases}$$

- $E(\mathcal{X}^2(n)) = n$;
- $D(\mathcal{X}^2(n)) = 2n$;
- The chi-square distribution is additive.

#### $t(n)$ Distribution

Let random variable $X$ follow a standard normal distribution $N(0,1)$, and random variable $Y$ follow a chi-square distribution $\mathcal{X}^2(n)$ with $n$ degrees of freedom, and let $X$ and $Y$ be independent. Then the random variable $\displaystyle T = \frac{X}{\sqrt{Y/n}}$ follows a $t$-distribution with $n$ degrees of freedom, denoted $T \sim t(n)$.

The $t$-distribution limits to the standard normal distribution. When $n=1$, the $t(1)$ distribution is the Cauchy distribution, whose expectation does not exist.

#### $F(n_1, n_2)$ Distribution

Let random variable $X$ follow a chi-square distribution $\mathcal{X}^2(n_1)$ with $n_1$ degrees of freedom, and random variable $Y$ follow a chi-square distribution $\mathcal{X}^2(n_2)$ with $n_2$ degrees of freedom, and let $X$ and $Y$ be independent. Then the random variable $\displaystyle F = \frac{(X/n_1)}{(Y/n_2)}$ follows an $F$-distribution with degrees of freedom $(n_1, n_2)$, denoted $F \sim F(n_1, n_2)$. $n_1$, $n_2$ are the first and second degrees of freedom, respectively.

$\displaystyle F_{1-\alpha}(n_1, n_2)=\frac{1}{F_\alpha(n_2, n_1)}$ denotes the upper $\alpha$ quantile of the $F$-distribution.

### Sampling Distributions for Normal Populations

Let population $\mathcal{X}$ follow a normal distribution $N(\mu, \sigma^2)$. Draw a simple random sample $\mathcal{X}_n = \{X_1, X_2, \ldots, X_n\}$ of size $n$. Then:

- The sample mean $\bar{X}$ follows a normal distribution $\displaystyle N\left(\mu, \frac{\sigma^2}{n}\right)$.
- The random variable $\displaystyle \frac{(n-1)S^2}{\sigma^2}$ follows a chi-square distribution $\mathcal{X}^2(n-1)$ with $n-1$ degrees of freedom.
- The random variable $\displaystyle T = \frac{\bar{X} - \mu}{S/\sqrt{n}}$ follows a $t$-distribution $t(n-1)$ with $n-1$ degrees of freedom.
- The random variable $\displaystyle F = \frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}$ follows an $F$-distribution $F(n_1-1, n_2-1)$ with degrees of freedom $(n_1-1, n_2-1)$, where $S_1^2$, $S_2^2$ are the sample variances from two independent samples drawn from normal populations $N(\mu_1, \sigma_1^2)$ and $N(\mu_2, \sigma_2^2)$, respectively.

For *two normal sampling populations*:

- $\bar{X}$, $\bar{Y}$, $S_1^2$, $S_2^2$ are mutually independent.
- $\bar{X}-\bar{Y}$ follows a normal distribution $\displaystyle N\left(\mu_1 - \mu_2, \sigma_1^2/n_1 + \sigma_2^2/n_2\right)$.
- Assuming both populations have the same variance $\sigma^2$, then the random variable $\displaystyle \frac{(\bar{X}-\bar{Y})-(\mu_1-\mu_2)}{\sqrt{\tfrac{1}{n_1}+\tfrac{1}{n_2}}\,\sqrt{\tfrac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}}}$ follows a $t$-distribution $t(k)$ with degrees of freedom $k=n_1+n_2-2$.
- The random variable $\displaystyle F = \frac{S_1^2}{S_2^2}$ follows an $F$-distribution $F(n_1-1, n_2-1)$ with degrees of freedom $(n_1-1, n_2-1)$.

## Parameter Estimation

Drawing a sample from a population, we construct functions of the sample in some way to estimate unknown parameters of the population.

### Point Estimation

Let the distribution of population $\mathcal{X}$ be determined by an unknown parameter $\theta$, where $\theta$ is a parameter of the population. Let sample $\mathcal{X}_n = \{X_1, X_2, \ldots, X_n\}$. If a statistic $\hat{\theta} = \hat{\theta}(X_1, X_2, \ldots, X_n)$ is used to estimate the population parameter $\theta$, then $\hat{\theta}$ is called a **point estimator** of parameter $\theta$, and its value $\hat{\theta} = \hat{\theta}(x_1, x_2, \ldots, x_n)$ is called the **point estimate**.

#### Method of Moments

Let the distribution of population $\mathcal{X}$ be determined by unknown parameter $\theta$, and suppose the $k$-th moment $E(X^k)$ of the population exists. Let sample $\mathcal{X}\_n = \\\{X_1, X_2, \ldots, X_n\\\}$. Then the $k$-th moment of the population can be estimated by the sample $k$-th origin moment $\displaystyle M_k = \frac{1}{n}\sum_{i=1}^n X_i^k$. 

By equating the first $m$ sample origin moments to the corresponding population moments, we solve for the estimator $\hat{\theta}$ of parameter $\theta$, called the **method of moments estimator**.

Generally, regardless of the population distribution, as long as the population expectation $\mu$ and variance $\sigma^2$ exist, their method of moments estimators are $\displaystyle \hat\mu=\frac{1}{n}\sum_{i=1}^n X_i$ and $\displaystyle \hat\sigma^2_{\mathrm{MME}} = \frac{1}{n}\sum_{i=1}^n (X_i - \bar{X})^2$ (note the difference from the unbiased sample variance $\displaystyle S^2=\frac{1}{n-1}\sum (X_i-\bar X)^2$).

> Method of moments estimators for **lower-order** moments are usually good; for higher-order moments, they are often not as good.

#### Maximum Likelihood Estimation

Let the distribution of population $\mathcal{X}$ be determined by unknown parameter $\theta$. The joint probability density function (or probability mass function) of sample $\mathcal{X}\_n = \\\{X_1, X_2, \ldots, X_n\\\}$ is $f(x_1, x_2, \ldots, x_n; \theta)$. Then the function $L(\theta) = f(x_1, x_2, \ldots, x_n; \theta)$ is called the *likelihood function* for the sample observations $x_1, x_2, \ldots, x_n$.

By solving the equation $\displaystyle \frac{\partial L(\theta)}{\partial \theta} = 0$ (or $\displaystyle \frac{\partial \ln L(\theta)}{\partial \theta} = 0$), we obtain the estimator $\hat{\theta}$ of parameter $\theta$, called the **maximum likelihood estimator**.

For a continuous population, the likelihood function is $\displaystyle L(\theta) = \prod_{i=1}^n f(x_i; \theta)$, i.e., the product of the probability density functions.

> The idea of maximum likelihood estimation is to choose, among all possible parameter values, the one that maximizes the probability (likelihood) of the observed sample values.

Maximum likelihood estimators may not be unique.

**Invariance Principle of Maximum Likelihood Estimation**: Let $\hat{\theta}$ be the maximum likelihood estimator of parameter $\theta$, and let $g(\theta)$ be an invertible function of $\theta$. Then $g(\hat{\theta})$ is the maximum likelihood estimator of $g(\theta)$. However, **the method of moments generally does not possess invariance**.

### Criteria for Evaluating Point Estimators

Let the distribution of population $\mathcal{X}$ be determined by unknown parameter $\theta$, and let sample $\mathcal{X}\_n = \left\\{X_1, X_2, \ldots, X_n\right\\}$.

**Unbiasedness**. If a point estimator $\hat{\theta}$ of parameter $\theta$ satisfies $E(\hat{\theta}) = \theta$, then $\hat{\theta}$ is called an *unbiased estimator* of $\theta$; if $E(\hat{\theta}) \neq \theta$, then $\hat{\theta}$ is called a *biased estimator*.

Under the i.i.d. assumption, the sample origin moment $M_k$ is an unbiased estimator of the population $k$-th origin moment $E(X^k)$.

**Efficiency**. If there exist two unbiased estimators $\hat{\theta}_1$, $\hat{\theta}_2$ for $\theta$, then when $D(\hat{\theta}_1) < D(\hat{\theta}_2)$, estimator $\hat{\theta}_1$ is said to be *more efficient* than $\hat{\theta}_2$, or $\hat{\theta}_1$ *dominates* $\hat{\theta}_2$.

*Rao-Cramér Inequality*: Suppose the following conditions hold:

1. For any possible value of $\theta$, the probability density function $f(x;\theta)$ exists and is differentiable with respect to $\theta$;
2. For any $\theta$, $\displaystyle \int_{-\infty}^{+\infty} \frac{\partial f(x;\theta)}{\partial \theta} \mathrm{d}x = \frac{\partial}{\partial \theta} \int_{-\infty}^{+\infty} f(x;\theta) \mathrm{d}x = 0$;
3. There exists a function $I(\theta)$ (Fisher information) such that $\displaystyle E\left(\frac{\partial \ln f(X;\theta)}{\partial \theta}\right)^2 = I(\theta)$.
4. Let there exist an unbiased estimator $\hat{\theta}$ for $\theta$, with $E(\hat{\theta}) = \theta$.

Then $\displaystyle D(\hat{\theta}) \geq \frac{1}{I(\theta)}$ (for independent samples, $I(\theta)$ accumulates linearly with sample size).

**Consistency**. If a point estimator $\hat{\theta}_n$ for $\theta$ satisfies $\displaystyle \hat{\theta}_n \xrightarrow[n\to\infty]{P} \theta$, then $\hat{\theta}_n$ is called a *consistent estimator* of $\theta$. Consistency does not require the estimator to be unbiased.

If a point estimator $\hat{\theta}\_n$ for $\theta$ satisfies $\displaystyle \lim_{n\to\infty} E(\hat{\theta}\_n) = \theta$ and $\displaystyle \lim_{n\to\infty} D(\hat{\theta}\_n) = 0$, then $\hat{\theta}_n$ is a **consistent estimator** of $\theta$.

### Interval Estimation

Let the distribution of population $\mathcal{X}$ be determined by unknown parameter $\theta$, and let sample $\mathcal{X}\_n = \\\{X_1, X_2, \ldots, X_n\\\}$.

**Confidence Interval**. If random variables $L = L(X_1, X_2, \ldots, X_n)$ and $U = U(X_1, X_2, \ldots, X_n)$ satisfy $P(L < \theta < U) = 1 - \alpha$, then the interval $(L, U)$ is called a **confidence interval** for parameter $\theta$, where $1 - \alpha$ is the **confidence level** and $\alpha$ is the **significance level**.

Confidence intervals are not unique; typically we choose the one with the shortest length. Reliability is ensured first, then precision. For symmetric probability distribution curves, symmetric confidence intervals are usually chosen.

**Pivotal Quantity**. A random variable $Q = Q(X_1, X_2, \ldots, X_n; \theta)$ is called a **pivotal quantity** for parameter $\theta$ if:

1. The distribution of $Q$ does not depend on the unknown parameter $\theta$;
2. $Q$ is strictly monotonic (increasing or decreasing) with respect to $\theta$.

---

> In the following tables, $z_\alpha$ denotes the upper $\alpha$ quantile of the standard normal distribution $N(0,1)$ (i.e., $P(Z>z_\alpha)=\alpha$); $t_\alpha(\nu)$ denotes the upper $\alpha$ quantile of the $t$-distribution with $\nu$ degrees of freedom; $\chi^2_\alpha(\nu)$ and $F_\alpha(\nu_1,\nu_2)$ denote the upper $\alpha$ quantiles of the respective chi-square and $F$ distributions.
>
> Also, CI is abbreviated for confidence interval for brevity.

For a normal population $\mathcal{X} \sim N(\mu, \sigma^2)$, we have:

| | $\sigma^2$ known, CI for $\mu$ | $\sigma^2$ unknown, CI for $\mu$ | $\mu$ known, CI for $\sigma^2$ | $\mu$ unknown, CI for $\sigma^2$ |
|---|:---:|:---:|:---:|:---:|
| **Pivotal Quantity** | $\displaystyle Z = \frac{\bar{X} - \mu}{\sigma/\sqrt{n}}$ | $\displaystyle T = \frac{\bar{X} - \mu}{S/\sqrt{n}}$ | $\displaystyle \frac{\sum_{i=1}^n (X_i - \mu)^2}{\sigma^2}$ | $\displaystyle \frac{(n-1)S^2}{\sigma^2}$ |
| **Distribution** | $N(0,1)$ | $t(n-1)$ | $\mathcal{X}^2(n)$ | $\mathcal{X}^2(n-1)$ |
| **Confidence Interval** | $\displaystyle \left(\bar{X} - z_{\frac{\alpha}{2}}\frac{\sigma}{\sqrt{n}}, \bar{X} + z_{\frac{\alpha}{2}}\frac{\sigma}{\sqrt{n}}\right)$ | $\displaystyle \left(\bar{X} - t_{\frac{\alpha}{2}}(n-1)\frac{S}{\sqrt{n}}, \bar{X} + t_{\frac{\alpha}{2}}(n-1)\frac{S}{\sqrt{n}}\right)$ | $\displaystyle \left(\frac{\sum_{i=1}^n (X_i - \mu)^2}{\chi^2_{\frac{\alpha}{2}}(n)}, \frac{\sum_{i=1}^n (X_i - \mu)^2}{\chi^2_{1-\frac{\alpha}{2}}(n)}\right)$ | $\displaystyle \left(\frac{(n-1)S^2}{\chi^2_{\frac{\alpha}{2}}(n-1)}, \frac{(n-1)S^2}{\chi^2_{1-\frac{\alpha}{2}}(n-1)}\right)$ |

---

**One-sided Confidence Interval**. For a given $\alpha$, if there exists a random variable $L = L(X_1, X_2, \ldots, X_n)$ such that $P(L < \theta) = 1 - \alpha$, then the interval $(L, +\infty)$ is called a **lower one-sided confidence interval** for $\theta$; if there exists a random variable $U = U(X_1, X_2, \ldots, X_n)$ such that $P(\theta < U) = 1 - \alpha$, then the interval $(-\infty, U)$ is called an **upper one-sided confidence interval** for $\theta$.

## Hypothesis Testing

### Basic Concepts

Let the distribution of population $\mathcal{X}$ be determined by unknown parameter $\theta$, and let sample $\mathcal{X}_n = \\\{X_1, X_2, \ldots, X_n\\\}$.

- **Hypothesis Testing**.  The process of testing a hypothesis about the population parameter $\theta$ based on the sample observations $x_1, x_2, \ldots, x_n$ is called **hypothesis testing**.
- **Null Hypothesis and Alternative Hypothesis**. In hypothesis testing, the hypothesis to be tested is usually called the **null hypothesis**, denoted $H_0$; the hypothesis opposite to the null is called the **alternative hypothesis**, denoted $H_1$.
- **Test Statistic**. If a real-valued continuous function $T = T(X_1, X_2, \ldots, X_n)$ depends only on the random variables $X_1, X_2, \ldots, X_n$ and not on unknown parameters of the population, then $T$ is called a **test statistic**.
- **Level of Test**. In hypothesis testing, if under the assumption that $H_0$ is true, the probability of rejecting $H_0$ is $\alpha$, then $\alpha$ is called the **level of the test** or **significance level**.
- **Rejection Region/Acceptance Region**. In hypothesis testing, if we reject/accept the null hypothesis $H_0$ when the test statistic $T$ falls in a certain region $W$, then region $W$ is called the **rejection/acceptance region**.
- **Type I Error**. In hypothesis testing, if the null hypothesis $H_0$ is true but we erroneously reject $H_0$, this error is called a **Type I error**.
- **Type II Error**. In hypothesis testing, if the null hypothesis $H_0$ is false but we erroneously accept $H_0$, this error is called a **Type II error**.

### Hypothesis Testing for Parameters of a Single Normal Population

**Z-test (known $\sigma^2$)**: When $\sigma^2$ is known, to test the mean $\mu$ of a normal population $N(\mu, \sigma^2)$, the test statistic is $\displaystyle U = \frac{\bar{X} - \mu_0}{\sigma/\sqrt{n}}$, which follows a standard normal distribution $N(0,1)$.

| Null Hypothesis $H_0$ | Alternative Hypothesis $H_1$ | Rejection Region |
|---|---|---|
| $\mu = \mu_0$ | $\mu \neq \mu_0$ | $\{\left\vert U \right\vert > z_{\frac{\alpha}{2}}\}$ |
| $\mu \leq \mu_0$ | $\mu > \mu_0$ | $\{U > z_{\alpha}\}$ |
| $\mu \geq \mu_0$ | $\mu < \mu_0$ | $\{U < -z_{\alpha}\}$ |

**T-test (unknown $\sigma^2$)**: When $\sigma^2$ is unknown, to test the mean $\mu$ of a normal population $N(\mu, \sigma^2)$, the test statistic is $\displaystyle T = \frac{\bar{X} - \mu_0}{S/\sqrt{n}}$, which follows a $t$-distribution $t(n-1)$ with $n-1$ degrees of freedom.

| Null Hypothesis $H_0$ | Alternative Hypothesis $H_1$ | Rejection Region |
|---|---|---|
| $\mu = \mu_0$ | $\mu \neq \mu_0$ | $\{\left\vert T \right\vert > t_{\frac{\alpha}{2}}(n-1)\}$ |
| $\mu \leq \mu_0$ | $\mu > \mu_0$ | $\{T > t_{\alpha}(n-1)\}$ |
| $\mu \geq \mu_0$ | $\mu < \mu_0$ | $\{T < -t_{\alpha}(n-1)\}$ |

**$\mathcal{X}^2$-test**: When $\mu$ is known, to test the variance $\sigma^2$ of a normal population $N(\mu, \sigma^2)$, the test statistic is $\displaystyle \chi^2 = \frac{\sum_{i=1}^n (X_i - \mu)^2}{\sigma_0^2}$, which follows a chi-square distribution $\mathcal{X}^2(n)$ with $n$ degrees of freedom.

| Null Hypothesis $H_0$ | Alternative Hypothesis $H_1$ | Rejection Region |
|---|---|---|
| $\sigma^2 = \sigma_0^2$ | $\sigma^2 \neq \sigma_0^2$ | $\{\chi^2 < \chi^2_{1-\frac{\alpha}{2}}(n) \lor \chi^2 > \chi^2_{\frac{\alpha}{2}}(n)\}$ |
| $\sigma^2 \leq \sigma_0^2$ | $\sigma^2 > \sigma_0^2$ | $\{\chi^2 > \chi^2_{\alpha}(n)\}$ |
| $\sigma^2 \geq \sigma_0^2$ | $\sigma^2 < \sigma_0^2$ | $\{\chi^2 < \chi^2_{1-\alpha}(n)\}$ |

When $\mu$ is unknown, to test the variance $\sigma^2$ of a normal population $N(\mu, \sigma^2)$, the test statistic is $\displaystyle \chi^2 = \frac{(n-1)S^2}{\sigma_0^2}$, which follows a chi-square distribution $\mathcal{X}^2(n-1)$ with $n-1$ degrees of freedom.

| Null Hypothesis $H_0$ | Alternative Hypothesis $H_1$ | Rejection Region |
|---|---|---|
| $\sigma^2 = \sigma_0^2$ | $\sigma^2 \neq \sigma_0^2$ | $\{\chi^2 < \chi^2_{1-\frac{\alpha}{2}}(n-1) \lor \chi^2 > \chi^2_{\frac{\alpha}{2}}(n-1)\}$ |
| $\sigma^2 \leq \sigma_0^2$ | $\sigma^2 > \sigma_0^2$ | $\{\chi^2 > \chi^2_{\alpha}(n-1)\}$ |
| $\sigma^2 \geq \sigma_0^2$ | $\sigma^2 < \sigma_0^2$ | $\{\chi^2 < \chi^2_{1-\alpha}(n-1)\}$ |

**$p$-value Method**: In hypothesis testing, if the observed value of test statistic $T$ is $t$, then the $p$-value is defined as the probability, under the assumption that $H_0$ is true, that $T$ takes a value "as extreme or more extreme" than $t$.

### Hypothesis Testing for Parameters of Two Normal Populations

**Z-test (two population means, variances known)**: When $\sigma_1^2$, $\sigma_2^2$ are both known, to test the difference $\mu_1-\mu_2$ of means of two normal populations $N(\mu_1, \sigma_1^2)$, $N(\mu_2, \sigma_2^2)$, the test statistic is $\displaystyle U = \frac{(\bar{X} - \bar{Y}) - (\mu_1 - \mu_2)}{\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}}$, which follows a standard normal distribution $N(0,1)$.

| Null Hypothesis $H_0$ | Alternative Hypothesis $H_1$ | Rejection Region |
|---|---|---|
| $\mu_1 - \mu_2 = \Delta_0$ | $\mu_1 - \mu_2 \neq \Delta_0$ | $\{\left\vert U \right\vert > z_{\frac{\alpha}{2}}\}$ |
| $\mu_1 - \mu_2 \leq \Delta_0$ | $\mu_1 - \mu_2 > \Delta_0$ | $\{U > z_{\alpha}\}$ |
| $\mu_1 - \mu_2 \geq \Delta_0$ | $\mu_1 - \mu_2 < \Delta_0$ | $\{U < -z_{\alpha}\}$ |

**T-test (two population means, variances unknown)**: When $\sigma_1^2$, $\sigma_2^2$ are both unknown, to test the difference $\mu_1-\mu_2$ of means of two normal populations, the test statistic is $\displaystyle T = \frac{(\bar{X} - \bar{Y}) - (\mu_1 - \mu_2)}{\sqrt{\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}\left(\frac{1}{n_1}+\frac{1}{n_2}\right)}}$, which follows a $t$-distribution with $n_1+n_2-2$ degrees of freedom.

| Null Hypothesis $H_0$ | Alternative Hypothesis $H_1$ | Rejection Region |
|---|---|---|
| $\mu_1 - \mu_2 = \Delta_0$ | $\mu_1 - \mu_2 \neq \Delta_0$ | $\{\left\vert T \right\vert > t_{\frac{\alpha}{2}}(n_1+n_2-2)\}$ |
| $\mu_1 - \mu_2 \leq \Delta_0$ | $\mu_1 - \mu_2 > \Delta_0$ | $\{T > t_{\alpha}(n_1+n_2-2)\}$ |
| $\mu_1 - \mu_2 \geq \Delta_0$ | $\mu_1 - \mu_2 < \Delta_0$ | $\{T < -t_{\alpha}(n_1+n_2-2)\}$ |

**F-test**: To test the variances $\sigma_1^2$, $\sigma_2^2$ of two normal populations $N(\mu_1, \sigma_1^2)$, $N(\mu_2, \sigma_2^2)$, the test statistic is $\displaystyle F = \frac{S_1^2}{S_2^2}$, which follows an $F$-distribution $F(n_1-1, n_2-1)$ with degrees of freedom $(n_1-1, n_2-1)$.

| Null Hypothesis $H_0$ | Alternative Hypothesis $H_1$ | Rejection Region |
|---|---|---|
| $\sigma_1^2 = \sigma_2^2$ | $\sigma_1^2 \neq \sigma_2^2$ | $\{F < F_{1-\frac{\alpha}{2}}(n_1-1, n_2-1) \lor F > F_{\frac{\alpha}{2}}(n_1-1, n_2-1)\}$ |
| $\sigma_1^2 \leq \sigma_2^2$ | $\sigma_1^2 > \sigma_2^2$ | $\{F > F_{\alpha}(n_1-1, n_2-1)\}$ |
| $\sigma_1^2 \geq \sigma_2^2$ | $\sigma_1^2 < \sigma_2^2$ | $\{F < F_{1-\alpha}(n_1-1, n_2-1)\}$ |

### Hypothesis Testing for Parameters of Non-normal Populations

For testing population proportions (non-normal population, large sample size), we can approximate the sample mean as the frequency of a binomial distribution: when $n$ is sufficiently large, $\displaystyle U=\frac{\bar{X}-p_0}{\sqrt{p_0(1-p_0)/n}}$ approximately follows $N(0,1)$.