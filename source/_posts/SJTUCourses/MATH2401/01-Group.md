---
title: "MATH2401 Abstract Algebra (1): Group"
date: 2026-09-11 13:43:29
tags:
- Mathematics
- Notes
- SJTU Courses
categories: Exploration
mathjax: true
tikzjax: true
---

This article develops  the basic language of groups, from binary operations and subgroups through cosets, direct products, quotient groups, and the three isomorphism theorems.

<!--more-->

> Collections of **MATH2401 Abstract Algebra** notes:
>
> 1. [*Group*](../01-Group) (this article);
> 2. [*Ring*](../02-Ring);
> 3. [*Module*](../03-Module);
> 4. [*Field*](../04-Field);
> 5. [*Action*](../05-Action);
> 6. [*Galois Theory*](../06-GaloisTheory).

## Laws of composition

**Definition.** A *law of composition*, or *binary operation*, on a set $S$ is a map $S\times S\to S$, written $(a,b)\mapsto a\cdot b$ or simply $ab$. It is *associative* if $(ab)c=a(bc)$ and *commutative* if $ab=ba$ for all $a,b,c\in S$.

**Definition.** An *identity element* is an element $e\in S$ such that $ea=ae=a$ for every $a\in S$. If an identity exists, $a\in S$ is *invertible* if there is $b\in S$ with $ab=ba=e$; then $b$ is denoted $a^{-1}$.

**Example.** Matrix multiplication on $M_n(\mathbb R)$ is associative and, for $n\ge2$, not commutative. Composition in the symmetric group $S_n$ is associative and, for $n\ge3$, not commutative.

## Groups and subgroups

**Definition.** A *group* is a set $G$ with an associative binary operation, an identity $e$, and an inverse for every element. It is *abelian* if its operation is commutative. The *order* $|G|$ is the cardinality of $G$.

**Example.** The general linear group $GL_n(\mathbb R)$ consists of the invertible real $n\times n$ matrices. It is nonabelian for $n\ge2$. The special linear group

$$
SL_n(\mathbb R)=\\\{A\in GL_n(\mathbb R):\det A=1\\\}
$$

is a subgroup of $GL_n(\mathbb R)$.

**Definition.** A subset $H\subseteq G$ is a *subgroup*, written $H\le G$, if it is a group under the operation inherited from $G$.

**Theorem.** **Subgroup criterion.** A nonempty subset $H$ of a group $G$ is a subgroup if and only if $ab^{-1}\in H$ for all $a,b\in H$.

**Proposition.** An arbitrary intersection of subgroups of $G$ is a subgroup. The union of two subgroups $H,K\le G$ is a subgroup if and only if $H\subseteq K$ or $K\subseteq H$.

## Subgroups of the integers

We write the additive group of integers simply as $(\mathbb Z,+)$.

**Theorem.** Every subgroup of $(\mathbb Z,+)$ has the form $n\mathbb Z$ for a unique integer $n\ge0$.

## Cyclic groups

**Definition.** A group is *cyclic* if $G=\langle g\rangle$ for some $g\in G$. The *order* $|g|$ of $g$ is the least positive $n$ such that $g^n=e$, if one exists, and is infinite otherwise.

**Theorem.** **Classification of cyclic groups.** Every finite cyclic group of order $n$ is isomorphic to $\mathbb Z/n\mathbb Z$, and every infinite cyclic group is isomorphic to $\mathbb Z$. In particular, every cyclic group is abelian.

*Proof.* The required isomorphisms are

$$
\mathbb Z/n\mathbb Z\longrightarrow G,\quad \bar k\longmapsto g^k
 \qquad(|g|=n),
$$

and

$$
\mathbb Z\longrightarrow G,\quad k\longmapsto g^k
 \qquad(|g|=\infty).
$$

 ◻

**Theorem.** For every prime $p$, the multiplicative group $(\mathbb Z/p\mathbb Z)^\times$ is cyclic.

*Proof.* Let $G=(\mathbb Z/p\mathbb Z)^\times$ and choose $a\in G$ of maximal order $m$. We first show that $|b|\mid m$ for every $b\in G$. Otherwise some prime $q$ occurs to a larger power in $|b|$ than in $m$. Write $m=q^rs$ and $|b|=q^tu$ with $q\nmid su$ and $t>r$. Then $a^{q^r}$ has order $s$, while $b^u$ has order $q^t$. These elements commute and have coprime orders, so their product has order $sq^t>m$, a contradiction. Thus every element of $G$ is a root of $x^m-1$. A polynomial of degree $m$ over the field $\mathbb Z/p\mathbb Z$ has at most $m$ roots, so $|G|\le m$. Since $m\le |G|$, equality holds and $G=\langle a\rangle$. ◻

**Theorem.** **Primitive root theorem.** The group $(\mathbb Z/n\mathbb Z)^\times$ is cyclic exactly when

$$
n=1,\ 2,\ 4,\ q^k,\ \text{or }2q^k,
$$

where $q$ is an odd prime and $k\ge1$.

The converse statement "$(\mathbb Z/n\mathbb Z)^\times$ cyclic implies $n$ prime" is false. For example, the group is cyclic for $n=4$.

**Example.** The smallest noncyclic group has order $4$: the Klein four-group

$$
V_4=\left\\\{\begin{pmatrix}\varepsilon_1&0\\\\0&\varepsilon_2\end{pmatrix}
 :\varepsilon_1,\varepsilon_2\in\{1,-1\}\right\\\}.
$$

## Homomorphisms

**Definition.** A *homomorphism* $\phi:G\to H$ satisfies $\phi(ab)=\phi(a)\phi(b)$. Its kernel and image are

$$
\ker\phi=\\\{g\in G:\phi(g)=e_H\\\},\qquad
 \operatorname{im}\phi=\\\{\phi(g):g\in G\\\}.
$$

A bijective homomorphism is an *isomorphism*; an isomorphism $G\to G$ is an *automorphism*.

**Proposition.** If $\phi:G\to H$ is a homomorphism, then

1.  $\phi(e_G)=e_H$ and $\phi(g^{-1})=\phi(g)^{-1}$;

2.  $\ker\phi\trianglelefteq G$ and $\operatorname{im}\phi\le H$;

3.  $|\phi(g)|$ divides $|g|$ when $|g|<\infty$; equality holds if and only if $\phi$ is injective on $\langle g\rangle$;

4.  $\phi$ is injective if and only if $\ker\phi=\\\{e_G\\\}$.

**Theorem.** **Cayley.** Every group $G$ is isomorphic to a subgroup of the symmetric group $\operatorname{Sym}(G)$. If $|G|=n<\infty$, then $G$ is isomorphic to a subgroup of $S_n$.

*Proof.* The embedding is

$$
G\longrightarrow\operatorname{Sym}(G),\qquad
g\longmapsto L_g,\quad L_g(x)=gx.
$$

 ◻

For $g\in G$, *conjugation by $g$* is the automorphism $c_g(x)=gxg^{-1}$.

## Equivalence relations and partitions

**Definition.** An *equivalence relation* $\sim$ on $S$ is reflexive, symmetric, and transitive. The equivalence class of $a$ is $[a]=\\\{x\in S:x\sim a\\\}$; any element of a class is a representative.

**Theorem.** The equivalence classes of an equivalence relation form a partition of $S$. Conversely, every partition of $S$ defines an equivalence relation by declaring two elements equivalent exactly when they lie in the same part.

Every map $f:S\to T$ therefore defines an equivalence relation on $S$ by $a\sim b$ if and only if $f(a)=f(b)$.

## Cosets and Lagrange's theorem

**Definition.** For $H\le G$, the *left coset* and *right coset* determined by $g\in G$ are

$$
gH=\{gh:h\in H\},\qquad Hg=\{hg:h\in H\}.
$$

The sets of left and right cosets are denoted $G/H$ and $H\backslash G$, respectively. The *index* $[G:H]$ is the number of left cosets.

**Proposition.** Left cosets partition $G$, every left coset is in bijection with $H$, and

$$
aH=bH\quad\Longleftrightarrow\quad a^{-1}b\in H.
$$

Similarly, $Ha=Hb$ if and only if $ab^{-1}\in H$.

**Theorem.** **Lagrange.** If $G$ is finite and $H\le G$, then $|G|=[G:H]|H|$. In particular, $|H|$ divides $|G|$.

**Corollary.** If $G$ is finite, the order of every $g\in G$ divides $|G|$. Consequently, a group of prime order is cyclic, generated by any nonidentity element.

**Definition.** A subgroup $N\le G$ is *normal*, written $N\trianglelefteq G$, if $gNg^{-1}=N$ for every $g\in G$.

**Proposition.** For $N\le G$, the following are equivalent:

1.  $N\trianglelefteq G$;

2.  $gN=Ng$ for every $g\in G$;

3.  every left coset of $N$ is also a right coset of $N$.

*Proof.* For $(3)\Rightarrow(2)$, given $g\in G$, condition (3) gives $gN=Nh$ for some $h\in G$. Since $g\in Nh$, write $g=nh$ with $n\in N$. Then $h=n^{-1}g$, so $Nh=Nn^{-1}g=Ng$, and hence $gN=Ng$. ◻

## Modular arithmetic

For $n>0$, define $a\equiv b\pmod n$ when $n\mid(a-b)$. Its equivalence classes are the congruence classes modulo $n$. The number of units of $\mathbb Z/n\mathbb Z$ is Euler's totient

$$
\varphi(n)=| (\mathbb Z/n\mathbb Z)^\times |
 =|\\\{1\le k\le n:\gcd(k,n)=1\\\}|.
$$

## The correspondence theorem

**Theorem.** **Correspondence theorem for groups.** Let $\phi:G\to G'$ be a homomorphism. The map $H\mapsto\phi(H)$ is an inclusion-preserving bijection between the subgroups of $G$ containing $\ker\phi$ and the subgroups of $\operatorname{im}\phi$. Its inverse sends $K\le\operatorname{im}\phi$ to $\phi^{-1}(K)$. Normal subgroups correspond to normal subgroups, and

$$
[H:\ker\phi]=|\phi(H)|
$$

whenever these quantities are finite.

*Proof.* The mutually inverse correspondences are

$$
H\longmapsto\phi(H),\qquad K\longmapsto\phi^{-1}(K),
$$

with $\phi^{-1}(\phi(H))=H$ and $\phi(\phi^{-1}(K))=K$ on the stated domains. This is a lattice isomorphism between subgroup lattices, not in general a group isomorphism $H\cong\phi(H)$; rather, $H/\ker\phi\cong\phi(H)$. ◻

## Product groups

**Definition.** The *direct product* $G\times H$ has componentwise multiplication:

$$
(g_1,h_1)(g_2,h_2)=(g_1g_2,h_1h_2).
$$

**Theorem.** **Internal direct product criterion.** Suppose $H_1,\dots,H_n\trianglelefteq G$, the subgroups generate $G$, and

$$
H_i\cap\prod_{j\ne i}H_j=\\\{e\\\}\qquad(1\le i\le n).
$$

Then the multiplication map

$$
H_1\times\cdots\times H_n\longrightarrow G,
 \qquad(h_1,\dots,h_n)\longmapsto h_1\cdots h_n
$$

is an isomorphism. In this situation $G$ is the internal direct product of the $H_i$.

*Proof.* Let $i\ne j$, $h_i\in H_i$, and $h_j\in H_j$. Normality of both factors gives

$$
[h_i,h_j]=h_ih_jh_i^{-1}h_j^{-1}\in H_i\cap H_j
 \subseteq H_i\cap\prod_{k\ne i}H_k=\\\{e\\\}.
$$

Therefore $h_ih_j=h_jh_i$: elements belonging to distinct factors commute. ◻

## Quotient groups and isomorphism theorems

**Definition.** If $N\trianglelefteq G$, the *quotient group* $G/N$ is the set of cosets with multiplication $(aN)(bN)=abN$. Normality is precisely what makes this operation well-defined. The natural projection $\pi:G\to G/N$, $g\mapsto gN$, is surjective with kernel $N$.

**Theorem.** **First isomorphism theorem.** For a homomorphism $\phi:G\to G'$,

$$
G/\ker\phi\cong\operatorname{im}\phi.
$$

*Proof.* The isomorphism is

$$
\bar\phi:G/\ker\phi\longrightarrow\operatorname{im}\phi,\qquad
g\ker\phi\longmapsto\phi(g).
$$

 ◻

**Theorem.** **Second isomorphism theorem.** If $H\le G$ and $N\trianglelefteq G$, then $HN\le G$, $H\cap N\trianglelefteq H$, and

$$
H/(H\cap N)\cong HN/N.
$$

*Proof.* The homomorphism and its induced isomorphism are

$$
H\longrightarrow HN/N,\qquad h\longmapsto hN,
$$



$$
H/(H\cap N)\longrightarrow HN/N,\qquad h(H\cap N)\longmapsto hN.
$$

 ◻

**Theorem.** **Third isomorphism theorem.** If $N\trianglelefteq G$, $H\trianglelefteq G$, and $N\le H$, then $H/N\trianglelefteq G/N$ and

$$
(G/N)/(H/N)\cong G/H.
$$

*Proof.* The required homomorphism and its induced isomorphism are

$$
G/N\longrightarrow G/H,\qquad gN\longmapsto gH,
$$



$$
(G/N)/(H/N)\longrightarrow G/H,\qquad (gN)(H/N)\longmapsto gH.
$$

 ◻
