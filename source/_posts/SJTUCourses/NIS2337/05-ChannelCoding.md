---
title: "NIS2337 Information Theory Notes (5): Channel Coding"
date: 2026-04-24 17:13:49
tags:
- Information Theory
- Notes
- SJTU Courses
mathjax: true
tikzjax: true
---

> -- "What is this all about? Can't we just have coding schemes with no redundancy at all?"
>
> -- "Page after page, this is no different from lossy source coding. We have to account for noise, understand?"

Before delving into channel coding, the author feels it is necessary to clarify the relationship between source coding and channel coding. While reading the material in this section, the author often found it puzzling: the source coding process can be abstracted as a form of generalized transmission, so why must we spare a precious four lecture hours out of an eight-week course to study channel coding? In the preceding chapters, the author painstakingly attempted to remove redundancy from information, yet the purpose of channel coding is precisely to add redundancy?

First, source coding and channel coding do not describe the same thing in information theory -- they actually address two independent problems in the field: leaving aside the channel, how should we compress information? Leaving aside the source, since noise is inevitable in a channel, how should we resist its interference? Source coding achieves a transmission rate close to the entropy of the source by compressing its redundant parts to the utmost; channel coding, on the other hand, introduces redundancy to counteract noise, thereby bringing the transmission rate close to the channel capacity. Thus, source coding and channel coding are two independent areas of research in information theory.

In fact, a unified theory does exist -- joint source-channel coding. However, the Shannon separation theorem shows that, under lossless conditions, source coding and channel coding can be performed separately without any loss of performance. Since theory supports this decoupling, why not consider the two problems independently to achieve greater generality? Engineers working on the H.265 algorithm need not know whether the data stream they encode will be transmitted via optical disc or 5G, and 5G communications engineers need not know whether the data they transmit is a livestream of a SJTU premium course or a popular forum post. Such decoupling makes system development more flexible and efficient.

With that motivation, we arrive at this chapter: **Channel Coding**. In this chapter, we study errors in channel transmission, how to decode in order to minimize the probability of errors, how the channel coding theorem proves the existence of error-free coding schemes under certain conditions, and the construction and performance analysis of several classical linear block codes. In the analysis of linear block codes, we will employ some elegant properties of linear spaces and cyclic polynomials.

<!--more-->

> Other chapters of the **NIS2337 Fundamentals of Information Theory** course notes:
> 1. [Source and Information Entropy](/SJTUCourses/NIS2337/01-Source)
> 2. [Channel and Channel Capacity](/SJTUCourses/NIS2337/02-Channel)
> 3. [Rate-Distortion Function](/SJTUCourses/NIS2337/03-RateDistortion)
> 4. [Source Coding](/SJTUCourses/NIS2337/04-SourceCoding)
> 5. [Channel Coding](/SJTUCourses/NIS2337/05-ChannelCoding) (This article)
> 
> Supplementary materials can be found in [Beyond 2337](/SJTUCourses/NIS2337/06-Appendix).

## Errors and Error Control Systems

Since channel coding exists for the purpose of error correction, it is necessary to discuss errors. An **error symbol**/**symbol error** is caused by an error occurring in a symbol. An **error bit**/**information error** is caused by an error occurring in an information bit.

For binary transmission systems, error symbols and error bits are clearly equivalent. For multi-level (M-ary) systems, since one symbol consists of multiple bits, it is difficult to determine how many bit errors constitute a single symbol error.

**Error pattern**. Consider an $n$-ary transmission system where the transmitted sequence is $\vec{x}=(x_1, x_2, \ldots, x_L)$ and the received sequence is $\vec{y}=(y_1, y_2, \ldots, y_L)$. The error pattern is then $\vec{e}=\vec{x}-\vec{y}=(x_1-y_1, x_2-y_2, \ldots, x_L-y_L)\mod n$. For binary systems, the error pattern is the **XOR** of the transmitted and received sequences at corresponding positions.

**Hamming distance**. For two $n$-ary sequences $\vec{x}$ and $\vec{y}$, their Hamming distance $d(\vec{x}, \vec{y})$ is defined as the number of positions at which the corresponding symbols differ.

Error patterns can be classified as **random errors** and **burst errors**. Random errors refer to the case where error symbols are randomly distributed in time during transmission, and the value at each position of the error pattern is independent of time and position. Burst errors always appear in clusters with temporal correlation; they begin with an erroneous code symbol and end with an erroneous code symbol, though not every symbol between the beginning and end is necessarily erroneous -- rather, the probability of error within this interval exceeds some preset threshold.

An **error-correcting code** is a code capable of correcting errors. Its classification is roughly as follows:
- By function: error-detecting codes, error-correcting codes;
- By processing of the information sequence: block codes, convolutional codes;
- By relationship between code symbols and original information bits: linear codes, nonlinear codes;
- By error type: random error-correcting codes, burst error-correcting codes, and hybrid error-correcting codes that fall somewhere in between;
- By construction theory: algebraic codes, geometric codes, combinatorial codes, probabilistic codes, etc.

**Error control systems** can be broadly classified into three categories: **forward error correction**, **automatic repeat request**, and **hybrid error correction**.
- **Forward Error Correction (FEC)** refers to encoding the information at the transmitter so that the receiver can correct a certain number of errors through decoding without requiring retransmission from the transmitter.
- **Automatic Repeat reQuest (ARQ)** refers to the receiver sending a retransmission request to the transmitter when an error is detected, asking the transmitter to resend the erroneous code symbols.
- **Hybrid Error Correction (HEC)** refers to a mechanism that combines forward error correction and automatic repeat request: encoding is performed at the transmitter to resist a certain number of errors, while the receiver can also send retransmission requests to the transmitter when errors are detected.

## Decoding Methods

**Decoding** is the process of recovering the original information from corrupted data as accurately as possible. In the decoding task, the only information actually known is the received codeword sequence $\vec{y}$, the encoding algorithm used by the transmitter together with the code set $\mathcal{C}$ it produces, and the channel model together with its parameters.

The goal of decoding, i.e., **optimal decoding**, is to find, given a received word $\vec{r}$, a codeword $\hat{\vec{c}}$ that is the **maximum a posteriori probability (MAP)** codeword for $\vec{r}$, i.e.,

$$\hat{\vec{c}} = \arg\max\_{\vec{c}\in \mathcal{C}} P(\vec{c}|\vec{r})= \arg\max\_{\vec{c}\in \mathcal{C}} \frac{P(\vec{c}\_i)P(\vec{r}|\vec{c}\_i)}{P(\vec{r})}$$

Since $P(\vec{r})$ is a constant for a particular received word $\vec{r}$, this can be simplified to:

$$\hat{\vec{c}} = \arg\max\_{\vec{c}\in \mathcal{C}} P(\vec{c}\_i)P(\vec{r}|\vec{c}\_i)$$

In practical communication systems, it is usually assumed that the transmitted codewords $\vec{c}$ are equally likely, i.e., $\displaystyle P(\vec{c}\_i) = \frac{1}{|\mathcal{C}|}$, which can be further simplified to:

$$\hat{\vec{c}} = \arg\max_{\vec{c}\in \mathcal{C}} P(\vec{r}|\vec{c}_i)$$

This is **Maximum Likelihood Decoding (MLD)**. The goal of maximum likelihood decoding is to find a codeword $\hat{\vec{c}}$ that maximizes the probability of receiving $\vec{r}$ given that $\hat{\vec{c}}$ was transmitted. For a memoryless channel,

$$P(\vec{r}|\vec{c}\_i) = \prod\_{j=1}^n P(r\_j|c\_{ij})$$

From the analysis of the BSC channel, we can observe a connection between MLD and Minimum Hamming Distance Decoding (MHDD). Let the crossover probability of the BSC be denoted by $p$. Then, for a specific received word $\vec{r}$, the probability of receiving $\vec{r}$ given that $\vec{c}_i$ was transmitted is:

$$P(\vec{r}|\vec{c}\_i) = \prod\_{j=1}^n P(r\_j|c_{ij}) = p^{d(\vec{r}, \vec{c}_i)} (1-p)^{n-d(\vec{r}, \vec{c}_i)}$$

where $d(\vec{r}, \vec{c}\_i)$ is the Hamming distance between $\vec{r}$ and $\vec{c}\_i$. Since $p<\dfrac{1}{2}$, $P(\vec{r}|\vec{c}_i)$ decreases as $d(\vec{r}, \vec{c}\_i)$ increases, so maximum likelihood decoding is equivalent to minimum Hamming distance decoding, i.e.,

$$
\hat{\vec{c}} = \arg\max_{\vec{c}\in \mathcal{C}} P(\vec{r}|\vec{c}\_i) = \arg\min_{\vec{c}\in \mathcal{C}} d(\vec{r}, \vec{c}_i)
$$

**Fano's inequality**. The error probability $P_e$ of the channel and the channel equivocation $H(X|Y)$ satisfy the following inequality:
$$H(X|Y)\le p_e\log(n-1)+H(p_e)$$
where $n$ is the number of channel input symbols, $p_e$ is the channel error probability, and $H(p_e)$ is the binary entropy function. Fano's inequality states that the maximum possible entropy in the entire guessing process must be greater than the true uncertainty remaining in the system.

## Channel Coding Theorem

Why another coding theorem?

Nevertheless, the channel coding theorem answers a question similar to that addressed by the source coding theorem: given the channel conditions, does there exist a coding scheme that achieves a zero error probability? If so, what is the minimum information transmission rate of such a scheme?

### Random Coding and the Channel Coding Theorem

Engineers today have invented many sophisticated techniques for constructing error-correcting codes, such as Hamming codes, linear block codes, and so on. However, when Shannon proved the channel coding theorem, he put forward a provocative idea: why bother constructing elaborate algebraic structures? Just ** guess it.

Suppose there are $k$ bits of information to be transmitted, encoded into $n$-bit codewords. Then there are $2^k$ distinct information sequences and $2^n$ distinct codewords. The idea of random coding is to randomly select $2^k$ codewords from the $2^n$ possible codewords to form the code space $\mathcal{C}$, and then map each information sequence to a unique codeword.

Note that different information sequences to be encoded may be mapped to the same codeword. Consequently, there can be $q^{nq^k}$ different code sets, which cannot be counted using combinations. Thus, the probability that the $m$-th code set $\mathcal{c}\_m$ is selected is $\dfrac{1}{q^{nq^k}}$, and let the corresponding conditional error probability for this code set be $P_{em}$. Hence, the average error probability over all code sets is:

$$
\begin{aligned}\bar{P}\_e = &\sum\_{m=1}^{q^{nq^k}} \frac{1}{q^{nq^k}} P\_{em} \\\\
= &\frac{1}{q^{nq^k}} \sum\_{m=1}^{q^{nq^k}} P\_{em} \end{aligned}
$$

That is, if $\bar{P}\_e\rightarrow 0$, then there must exist a family of code sets for which $P\_{em}\rightarrow 0$, thereby proving the existence of a coding scheme achieving arbitrarily small error probability.

The means to make $\bar{P}_e\rightarrow 0$ is simple: let $n-k\rightarrow\infty$, i.e., increase the redundancy. On average, the distribution of codewords becomes sparser and the space between codewords becomes larger, thereby reducing the error probability. But does $\bar{P}_e$ converge to zero? Gallager proved that $\bar{P}_e$ has an upper bound that converges exponentially, i.e.,

$$\bar{P}_e \leq 2^{-nE\(R\)}$$

where $E\(R\)$ is the **reliability function** or **error exponent**, and $R=\dfrac{k\log q}{n}$ is the code rate, which is the amount of information carried per code symbol.

The reliability function is a straight line with slope $-1$ in the interval $[0,R_0]$, and gradually converges to $0$ in the interval $[R_0,C]$, where $R_0$ is the **critical rate** and $C$ is the channel capacity. That is, as long as $R<C$, there exists a channel code and its corresponding decoder that, for a sufficiently long code length $n$, can achieve reliable communication with an arbitrarily small error probability; if $R>C$, then no matter what coding scheme is adopted, the error probability cannot be reduced to an acceptably low level.

However, Shannon only proved the existence of an optimal scheme. He gave no guidance on how to construct a practically feasible coding scheme to achieve this. In fact, to date, no practically feasible coding scheme has been found that can achieve channel capacity under all channel conditions; there are almost no practical information systems that use random coding, for reasons similar to the advantages of linear block codes: random coding requires storing the entire code space, resulting in extremely high computational complexity and making implementation infeasible.

### Joint Source-Channel Coding

Traditional communication systems treat source coding and channel coding separately, each considering only the statistical characteristics of its own object. Considering them jointly can yield better performance. For example, less important information can be compressed more efficiently, while important information is given stronger protection; or source coding and channel coding can be jointly designed so that the coding scheme simultaneously satisfies the requirements of source compression and channel error correction.

**Source-Channel Coding Theorem**. If the limit entropy $H(S)$ of a source $S$ is less than the capacity $C$ of a channel $C$, then there exists a joint source-channel coding scheme such that the error probability approaches zero; conversely, if $H(S)>C$, then no matter what coding scheme is adopted, the error probability cannot be reduced to an acceptably low level.

In other words, if $H<C$, we can always find an $R$ such that $H<R<C$, first use a source coding scheme to compress the information to rate $R$, and then use a channel coding scheme to raise the transmission rate to $C$, thereby achieving reliable communication.

## Linear Block Codes

**Block coding** refers to encoding an information sequence of length $k$ into a codeword of length $n$, where $n>k$. The task is to select $q^k$ out of the $q^n$ possible elements in the $n$-dimensional vector space of $n$-tuples to form the **code space** for encoding, and to determine the mapping from the $k$-dimensional space of $k$-tuples to the $k$-dimensional space of $n$-tuples. Different choices of code space and different mapping algorithms together constitute different block codes.

Here, the multiplicity $n$ of the space indicates that each element in the space consists of $n$ independent code symbols, while the dimension is the number of basis vectors (each an $n$-tuple) that span the linear space.

The $q^k$ vectors selected for a $k$-dimensional linear block code form a subspace. This is motivated by the favorable mathematical properties of subspaces, which allow optimization of encoding and decoding algorithms in terms of storage, checking, and performance evaluation. Compared to nonlinear block codes, a linear block code requires storing only the $k$ basis vectors, and computing other codewords is simply a matter of matrix multiplication. Moreover, with the help of the null space, checking a linear block code can be implemented via matrix multiplication with high efficiency. Finally, computing the minimum Hamming distance for a nonlinear block code requires traversing every codeword in the code space, with a time complexity of $O(2^{2k})$; by exploiting the subspace structure of linear block codes, the Hamming distance $c$ between two codewords $c_1$ and $c_2$ is itself a codeword in the same linear block code subspace, so computing the minimum Hamming distance only requires traversing the code space once, with a time complexity of $O(2^k)$, greatly simplifying the computation.

### Construction of Linear Block Codes

From the definition, the code set of a linear block code is essentially a $k$-dimensional subspace of an $n$-tuple linear space. Therefore, selecting $k$ basis vectors $g_1, g_2, \ldots, g_k$ of this subspace, every codeword in the space can be written as a linear combination of these $k$ basis vectors. Hence, the generator matrix $G$ of the linear block code can be formed from these $k$ basis vectors, i.e.,
$$G = \begin{bmatrix}g_1 \\\\
g_2 \\\\
\vdots \\\\
g_k\end{bmatrix}$$
It is easy to see that $\text{rank}(G)=k$. A codeword $c$ can be expressed as the product of the information sequence $u$ and the generator matrix $G$, i.e.,
$$c = uG$$

Since the basis of a subspace is not unique, $G$ is also not unique. The same linear block code can have multiple different generator matrices. Different bases may generate the same code set; however, since coding involves both the code set and the mapping, codes with the same code set but different mappings cannot be considered the same code.

From linear algebra, any generator matrix $G$ of an $(n,k)$ block code can be reduced to the systematic form $G_s$ through row operations and column permutations, while still retaining the basis form. In this case, $G$ and $G_s$ are said to be equivalent. That is,
$$G_s = \begin{bmatrix}I_k & P\end{bmatrix}=\begin{bmatrix}g_1' \\\\
g_2' \\\\
\vdots \\\\
g_k'\end{bmatrix}$$
where $I_k$ is the $k$-dimensional identity matrix and $P$ is a $k \times (n-k)$ matrix.

The systematic form of the generator matrix makes encoding simpler: the first $k$ bits of the information sequence $u$ directly become the first $k$ bits of the codeword; the remaining $n-k$ bits, defined as the redundancy bits or parity-check bits, are obtained by multiplying the first $k$ bits of the information sequence by the matrix $P$. This type of error-correcting code is called a **systematic code**. If $G$ is not in systematic form, it is called a **nonsystematic code**.

It is easy to see that the systematic transformation of the generator matrix does not change the code set (the subspace is not altered) but only modifies the mapping rule (the basis has been changed). This modification is motivated by engineering considerations: if the first $k$ information bits have not suffered any error, they can be decoded directly; the remaining $n-k$ redundancy bits can then be used to check whether errors have occurred in the first $k$ information bits. This greatly simplifies circuit design.

### Checking of Linear Block Codes

As mentioned in the overview, linear block codes are easy to check because they only use $k$ dimensions of the $n$-tuple space, and the remaining $(n-k)$ dimensions constitute its null space. This means that if a vector $\vec{r}$ lies in the code space, it must satisfy $\vec{r}\cdot \vec{h} = 0$ for every vector $\vec{h}$ in the null space; conversely, if $\vec{r}$ does not lie in the code space, then there exists some vector $\vec{h}$ in the null space such that $\vec{r}\cdot \vec{h} \neq 0$.

By definition, $GH=0$, and therefore:
$$H=[-P^T\quad I_{n-k}]$$

For a binary channel,
$$H=[P^T\quad I_{n-k}]$$

### Syndrome and Standard Array Decoding

This section discusses the binary channel case. Suppose the transmitted codeword is $\mathcal{C}=(c_{n-1},\cdots,c_0)$ and the received word is $\mathcal{R}=(r_{n-1},\cdots,r_0)$; then the error pattern is $\mathcal{E}=\mathcal{C}- \mathcal{R}$. However, under the assumed binary channel conditions, we have $\mathcal{E}=\mathcal{C}+ \mathcal{R}$ and $\mathcal{R}=\mathcal{C}+ \mathcal{E}$.

From the definition of the parity-check matrix, $\mathcal{C}H^\top=0$. Therefore, $\mathcal{E}H^\top=\mathcal{R}H^\top+\mathcal{C}H^\top=\mathcal{R}H^\top$. That is, for a fixed parity-check matrix, $\mathcal{R}H^\top$ depends only on the error pattern and is independent of the transmitted codeword $\mathcal{C}$. This leads to the definition of the **syndrome**: $\mathcal{S}=\mathcal{R}H^\top=\mathcal{E}H^\top$.

> $\mathcal{E}$ is an $n$-tuple vector, while $\mathcal{S}$ is an $(n-k)$-tuple vector. The syndrome $\mathcal{S}$ is the projection of the error pattern $\mathcal{E}$ onto the null space; therefore, different error patterns may correspond to the same syndrome.

Thus, given a syndrome, it follows from the properties of linear systems of equations or linear spaces that it corresponds to $2^k$ possible error patterns. **Probabilistic decoding** selects among these error patterns the one with the smallest weight as the estimate $\hat{\mathcal{E}}$ of $\mathcal{E}$, and then obtains $\hat{\mathcal{C}}=\mathcal{R}-\hat{\mathcal{E}}$. This method is conceptually simple but computationally extremely inefficient.

**Standard array decoding** places the $2^k$ codewords as the first row of the standard array, with $\mathcal{C}_0=(0,\cdots,0)$ at the leftmost position. Among the remaining $2^n-2^k$ vectors, the vector $\mathcal{E}_1$ with the smallest weight is selected as the first element of the second row, and $\mathcal{E}_1+\mathcal{C}_i$ is placed as the $i$-th element of the second row. Then, all vectors in the second row are removed from the $2^n-2^k$ vectors.

This process continues until all $2^n-2^k$ vectors have been assigned to the standard array. For each syndrome $\mathcal{S}$, the corresponding $\mathcal{E}_i$ is found in the standard array, and then $\hat{\mathcal{E}}=\mathcal{E}_i$, yielding $\hat{\mathcal{C}}=\mathcal{R}-\hat{\mathcal{E}}$.

It can be shown that standard array decoding is valid but not unique. The standard array has $2^{n-k}$ rows, each called a **coset**, and the first element of each coset is called the **coset leader**. Elements in the same coset share the same syndrome because they have the same error pattern. The standard array has $2^k$ columns, each called a **subset**, and the first element of each column is called the **subset header**.

### Code Distance, Error-Correction Capability, MDC, and Weight Spectrum

In our analysis of the error-correction capability of linear block codes, we have referred to the minimum Hamming distance $d_\text{min}$ without giving a formal definition. **Code Distance** refers to the Hamming distance between any two distinct codewords in the code space. **Minimum Code Distance (MDC)** refers to the minimum Hamming distance between any two distinct codewords in the code space.

For any linear block code with minimum distance $d$, its error-detection capability is $d-1$ and its error-correction capability is $\displaystyle \lfloor \frac{d-1}{2} \rfloor$. Therefore, the larger the minimum code distance, the stronger the error-correction capability of the linear block code.

**Hamming weight** is the number of nonzero elements in a codeword. **Weight Spectrum** refers to the count of codewords with different Hamming weights in the code space. The weight spectrum can be used to analyze the performance of linear block codes, especially under high signal-to-noise ratio conditions, where the minimum distance and weight spectrum are of great importance for evaluating the bit error rate. For binary linear block codes,
$$
d(x,y)=w(x\oplus y)
$$
where $w(\cdot)$ is the Hamming weight function and $\oplus$ denotes the XOR operation.

In an $(n,k)$ linear block code, since the distance between any two codewords $x$ and $y$ is also a codeword, when the minimum distance is $d$, the minimum Hamming weight of the codewords is also $d$. Therefore, any set of $d$ or more column vectors in $H$ must be linearly dependent, while any set of fewer than $d$ column vectors must be linearly independent.

Since at most $n-k$ linearly independent column vectors can be selected from $H$, the minimum code distance $d_\text{min}$ satisfies $1 \leq d_{min} \leq n-k+1$. When $d_{min}=n-k+1$, the linear block code is called a **Maximum Distance Separable (MDS) code**. MDS codes have optimal error-correction capability, but their construction is relatively complex and they are rarely used in practice.

### Perfect Codes

**Hamming bound**. From abstract algebra, it can be shown that for the entire set of channel codewords, $\langle \mathcal{C} \rangle$ is one of its cosets. Therefore, the number of distinct syndromes is $2^{n-k}$.

Suppose the error-correction capability of this code is $t$. Then for each syndrome $\mathcal{S}$, the corresponding error pattern $\mathcal{E}$ must have a Hamming weight not exceeding $t$. Therefore, the number of syndromes satisfies:
$$2^{n-k} \geq \sum_{i=0}^t \binom{n}{i}$$

In other words, if we view the error-correction range of each codeword as a Hamming ball of radius $t$, these Hamming balls must cover the entire code space.

If a linear block code satisfies the above inequality with equality, it is called a **perfect code**. The existence of perfect codes is an important research problem; to date, no general construction method for perfect codes has been found.

**Hamming code**. Hamming codes are a family of codes with error-correction capability $t=1$, and their definition is not limited to binary. In a binary channel, the parameters of a Hamming code satisfy $n=2^m-1$, $k=2^m-1-m$, and $d_{min}=3$. Therefore, the Hamming code has an error-correction capability of $t=1$ and an error-detection capability of $d_{min}-1=2$. The Hamming code is a perfect code.

The column vectors of the parity-check matrix $H$ of a Hamming code are the binary representations of the numbers $1$ through $n$. Since each column vector is unique, any two column vectors are linearly independent, and any three column vectors are linearly dependent, thus satisfying the condition for a perfect code.

**Golay code**. The Golay code is a family of codes with error-correction capability $t=3$. In a binary channel, the parameters of the Golay code satisfy $n=23$, $k=12$, and $d_{min}=7$. Therefore, the Golay code has an error-correction capability of $t=3$ and an error-detection capability of $d_{min}-1=6$. The Golay code is a perfect code.

Suppose the information to be transmitted is $m(x)$. First, shift it left by 11 bits to obtain $m(x)x^{11}$, then divide it by the generator polynomial $g(x)$ to obtain the quotient $q(x)$ and remainder $r(x)$. The codeword is then $c(x)=m(x)x^{11}+r(x)$, where the generator polynomials are $g_1(x)=x^{11}+x^9+x^7+x^6+x^5+x+1$ and $g_2(x)=x^{11}+x^{10}+x^6+x^5+x^4+x^2+1$.

By appending one parity bit, the Golay code can be extended to a $(24,12)$ linear block code, called the **extended Golay code**. The parameters of the extended Golay code satisfy $n=24$, $k=12$, $d_{min}=8$, and every codeword has even weight. Therefore, the extended Golay code has an error-correction capability of $t=3$ and an error-detection capability of $d_{min}-1=7$. The extended Golay code is not a perfect code.

### Cyclic Codes

If for a linear block code $(n,k)$, every codeword $c=(c_0, c_1, \ldots, c_{n-1})$ satisfies the property that its cyclic right-shifted sequence $(c_{n-1}, c_0, c_1, \ldots, c_{n-2})$ is also a codeword, then this linear block code is called a **cyclic code**. The codewords of a cyclic code form a subspace of the $n$-tuple vector space that possesses the cyclic property.

Describing such a cyclic linear space using matrices is rather complicated. Therefore, we introduce polynomials modulo $x^n-1$ to describe cyclic codes. Representing an $n$-tuple vector $c=(c_0, c_1, \ldots, c_{n-1})$ as a polynomial $c(x)=c_0+c_1x+c_2x^2+\cdots+c_{n-1}x^{n-1}$, a cyclic right shift is equivalent to multiplying this polynomial by $x$ and taking the result modulo $x^n-1$, i.e.,
$$\begin{aligned}c'(x) &= xc(x) \mod (x^n-1) \\\\
&= c_{n-1} + c_0x + c_1x^2 + \cdots + c_{n-2}x^{n-1}\end{aligned}$$
Furthermore, from abstract algebra, polynomials with integer coefficients possess the structure of a linear space, so the set of codewords of a cyclic code is also a linear space. However, while any cyclic shift of a codeword is still a codeword, not every codeword can be obtained by cyclically shifting a single codeword.

**Generator polynomial**. If $\mathcal{C}$ is an $(n,k)$ cyclic code, then there exists one or more monic polynomials $g(x)$ such that $g(x)|x^n-1$, $\deg(g)=n-k$, and $\mathcal{C}=\\{c(x)=m(x)g(x): m(x)\in \mathbb{F}_q[x], \deg(m)<k\\}$. Here, $g(x)$ is called the generator polynomial of the cyclic code. However, such encoding does not produce a systematic code.

**Generator matrix**. Once the generator polynomial $g(x)=g_0+g_1x+\cdots+g_{n-k}x^{n-k}$ is determined, the generator matrix $G$ is also determined. The $i$-th row of $G$ consists of the coefficients of the polynomial obtained by cyclically right-shifting $g(x)$ by $i-1$ positions. That is,
$$G = \begin{bmatrix}g_0 & g_1 & \cdots & g_{n-k} & 0 & \cdots & 0 \\\\
0 & g_0 & g_1 & \cdots & g_{n-k} & 0 & 0 \\\\
\vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots \\\\
0 & \cdots & 0 & g_0 & g_1 & \cdots & g_{n-k} \end{bmatrix}$$

The generator matrix obtained in this way is not in systematic form. To convert it to systematic form, consider the following encoding method:
1. Multiply the message polynomial $m(x)$ by $x^{n-k}$, i.e., left-shift by $(n-k)$ bits;
2. Divide $x^{n-k}m(x)$ by $g(x)$ to obtain the remainder $r(x)$;
3. Obtain the code polynomial of the systematic cyclic code: $c(x)=x^{n-k}m(x)+r(x)$;
4. Convert the code polynomial to a codeword.

Assuming $x^{n-k}m(x)=q(x)g(x)+r(x)$, then the constructed polynomial $\displaystyle c(x)=x^{n-k}m(x)+r(x)=x^{n-k}m(x)+q(x)g(x)+x^{n-k}m(x)=q(x)g(x)$ satisfies the definition of a cyclic code.

The $i$-th row of the generator matrix $G_s$ of a systematic cyclic code consists of the coefficients of the remainder $r_i(x)$ obtained by dividing $x^{n-k}m(x)$ (with $m(x)=x^{k-i}$) by $g(x)$, together with the coefficients of the message polynomial $m(x)$. That is,
$$G_s = \begin{bmatrix}1 & 0 & \cdots & 0 & r_1 & r_2 & \cdots & r_{n-k} \\\\
0 & 1 & \cdots & 0 & r_1' & r_2' & \cdots & r_{n-k}' \\\\
\vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots \\\\
0 & 0 & \cdots & 1 & r_1^{(k)} & r_2^{(k)} & \cdots & r_{n-k}^{(k)} \end{bmatrix}$$

