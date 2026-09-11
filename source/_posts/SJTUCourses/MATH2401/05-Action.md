---
title: "MATH2401 Abstract Algebra (5): Group Actions"
date: 2026-09-11 17:28:56
tags:
- Mathematics
- Notes
- SJTU Courses
categories: Exploration
mathjax: true
tikzjax: true
---

This article turns group elements into symmetries of sets. Orbits and stabilizers lead to counting formulas, conjugacy and the class equation, permutation representations, and the classification of finite rotation groups.

<!--more-->

> Collections of **MATH2401 Abstract Algebra** notes:
>
> 1. [*Group*](../01-Group);
> 2. [*Ring*](../02-Ring);
> 3. [*Module*](../03-Module);
> 4. [*Field*](../04-Field);
> 5. [*Action*](../05-Action) (this article);
> 6. [*Galois Theory*](../06-GaloisTheory).

**Definition.** An *action* of a group $G$ on a set $S$ is a map $G\times S\to S$, $(g,s)\mapsto g\cdot s$, such that

$$
e\cdot s=s,\qquad(gh)\cdot s=g\cdot(h\cdot s).
$$

Then $S$ is a $G$-set. The orbit and stabilizer of $s$ are

$$
O_s=\\\{g\cdot s:g\in G\\\},
\qquad G_s=\\\{g\in G:g\cdot s=s\\\}.
$$

The action is *transitive* if it has only one orbit.

**Proposition.** The relation $s\sim t$ when $t=g\cdot s$ for some $g\in G$ is an equivalence relation; its classes are the orbits. Every stabilizer $G_s$ is a subgroup.

**Theorem.** **Orbit as a coset space.** For every action of $G$ on $S$ and every $s\in S$, the map

$$
G/G_s\longrightarrow O_s,\qquad gG_s\longmapsto g\cdot s
$$

is a well-defined $G$-equivariant bijection.

*Proof.* If $gG_s=hG_s$, then $h^{-1}g\in G_s$, so $g\cdot s=h\cdot s$. The reverse implication gives injectivity, the definition of $O_s$ gives surjectivity, and $a\cdot(g\cdot s)=(ag)\cdot s$ gives equivariance. ◻

## Actions on cosets

For $H\le G$, the set $G/H$ of left cosets need not be a group, but it is a $G$-set under $g\cdot(aH)=gaH$. This action is transitive and the stabilizer of $H$ is $H$.

## Orbit--stabilizer and counting

**Theorem.** **Orbit--stabilizer.** For every action and $s\in S$,

$$
|O_s|=[G:G_s].
$$

If $G$ is finite, this equals $|G|/|G_s|$.

**Corollary.** **Orbit counting by representatives.** If $S$ is finite and $A$ contains one representative from each orbit, then

$$
|S|=\sum_{s\in A}|O_s|
=\sum_{s\in A}[G:G_s].
$$

When $G$ is finite, the final summand is $|G|/|G_s|$.

## Actions on subsets and normalizers

An action on $S$ induces an action on its power set by $g\cdot A=\\\{g\cdot a:a\in A\\\}$. In particular, $G$ acts by conjugation on its set of subgroups.

**Definition.** The *normalizer* of $H\le G$ is

$$
N_G(H)=\\\{g\in G:gHg^{-1}=H\\\}.
$$

It is the stabilizer of $H$ in the conjugation action.

**Proposition.** $N_G(H)$ is a subgroup, $H\trianglelefteq N_G(H)$, and it is the largest subgroup of $G$ in which $H$ is normal. The number of conjugates of $H$ is $[G:N_G(H)]$.

## Conjugacy and the class equation

For the conjugation action of $G$ on itself, the orbit of $x$ is its conjugacy class and its stabilizer is the centralizer

$$
C_G(x)=\\\{g\in G:gx=xg\\\}.
$$

**Definition.** The *center* of $G$ is

$$
\begin{aligned}
Z(G)&=\\\{x\in G:xg=gx\text{ for every }g\in G\\\}\\
     &=\\\{x\in G:C_G(x)=G\\\}\\
     &=\bigcap_{x\in G}C_G(x).
 \end{aligned}
$$

**Theorem.** **Class equation.** If $G$ is finite and $A$ contains one representative of each noncentral conjugacy class, then

$$
|G|=|Z(G)|+\sum_{x\in A}[G:C_G(x)].
$$

**Corollary.** Every nontrivial finite $p$-group has nontrivial center.

*Proof.* Every noncentral class size $[G:C_G(x)]$ is a power of $p$ greater than $1$. The class equation therefore gives $|Z(G)|\equiv|G|\equiv0\pmod p$. Since $e\in Z(G)$, its center has at least $p$ elements. ◻

## Permutation representations

**Theorem.** Actions of $G$ on $S$ correspond bijectively to homomorphisms $\rho:G\to\operatorname{Sym}(S)$, by $\rho(g)(s)=g\cdot s$. The kernel is

$$
\ker\rho=\\\{g:g\cdot s=s\text{ for every }s\in S\\\}
=\bigcap_{s\in S}G_s,
$$

and is normal in $G$.

Taking $S=G$ with left multiplication recovers [Cayley's theorem](../01-Group#Homomorphisms).

## Finite subgroups of $SO_3$

**Theorem.** **Classification of finite rotation groups.** Every finite subgroup of $SO_3$ is isomorphic to one of the following types (with the usual low-order coincidences understood):

1.  a cyclic group $C_n$ of rotations about one axis;

2.  a rotation dihedral group $D_n$ of order $2n$, consisting of rotations preserving a regular $n$-gon (the noncyclic elements are half-turns about axes in the polygon's plane, not plane reflections);

3.  the tetrahedral group $T\cong A_4$ of order $12$;

4.  the octahedral group $O\cong S_4$ of order $24$;

5.  the icosahedral group $I\cong A_5$ of order $60$.

*Proof outline.* The trivial group is $C_1$, so assume that $G$ is nontrivial. For a nonidentity rotation, mark the two poles of its axis and let $P$ be the set of all such poles. Double-count pairs $(g,p)$ with $g\ne e$ fixing $p$. If $p_1,\dots,p_k$ represent the pole orbits and $m_i=|G_{p_i}|$, the count yields

$$
2-\frac{2}{|G|}=\sum_{i=1}^k\left(1-\frac1{m_i}\right).
$$

Because $m_i\ge2$, this forces $k=2$ or $3$. The two-orbit case gives a common axis and hence $C_n$. In the three-orbit case, ordering $2\le m_1\le m_2\le
m_3$ leaves only

$$
(2,2,n),\quad(2,3,3),\quad(2,3,4),\quad(2,3,5).
$$

The corresponding presentations and orders identify respectively the rotation groups $D_n$, $A_4$, $S_4$, and $A_5$, realized by the regular polygon, tetrahedron, cube/octahedron, and dodecahedron/icosahedron. ◻
