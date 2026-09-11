---
title: "MATH2401 Abstract Algebra (6): Galois Theory"
date: 2026-09-11 17:32:34
tags:
- Mathematics
- Notes
- SJTU Courses
categories: Exploration
mathjax: true
tikzjax: true
---

This article connects field extensions with groups of automorphisms. It develops fixed fields and the Galois correspondence before applying them to cubic and quartic equations, roots of unity, Kummer extensions, and solvability by radicals.

> Collections of **MATH2401 Abstract Algebra** notes:
>
> 1. [*Group*](../01-Group);
> 2. [*Ring*](../02-Ring);
> 3. [*Module*](../03-Module);
> 4. [*Field*](../04-Field);
> 5. [*Action*](../05-Action);
> 6. [*Galois Theory*](../06-GaloisTheory) (this article).

## Symmetric polynomials

Let $R$ be a commutative ring. The symmetric group permutes the variables in $R[u_1,\dots,u_n]$. A polynomial fixed by all permutations is *symmetric*. The elementary symmetric polynomials are

$$
e_k=\sum_{1\le i_1<\cdots<i_k\le n}u_{i_1}\cdots u_{i_k}
\quad(1\le k\le n).
$$

**Theorem.** **Fundamental theorem of symmetric polynomials.** Every symmetric polynomial has a unique expression as a polynomial in $e_1,\dots,e_n$ with coefficients in $R$:

$$
R[u_1,\dots,u_n]^{S_n}=R[e_1,\dots,e_n].
$$

Thus the $e_i$ are algebraically independent generators, not a module basis.

*Proof outline.* Order monomials lexicographically. Symmetry makes the exponents of the leading monomial arrange as $a_1\ge\cdots\ge a_n$. The product $e_1^{a_1-a_2}e_2^{a_2-a_3}\cdots e_n^{a_n}$ has that same leading monomial. Subtracting its appropriate multiple lowers the leading term; induction terminates and proves existence. The distinct leading monomials of these products also show that no nonzero polynomial relation among the $e_i$ exists, which proves uniqueness. ◻

If

$$
f(x)=\prod_{i=1}^n(x-\alpha_i)
=x^n-e_1(\alpha)x^{n-1}+\cdots+(-1)^ne_n(\alpha),
$$

Viète's formulas identify its coefficients with the elementary symmetric functions of its roots. Consequently every symmetric polynomial in the roots is a polynomial in the coefficients. This does *not* assert that every permutation of the roots extends to an automorphism of their splitting field.

## The discriminant

Define the Vandermonde product and discriminant by

$$
V(f)=\prod_{i<j}(\alpha_i-\alpha_j),
\qquad\operatorname{disc}(f)=V(f)^2.
$$

For a permutation $\sigma\in S_n$, let $\sigma$ act by permuting the roots (equivalently, the subscripts of the variables). A polynomial $P(u_1,\dots,u_n)$ is alternating if $\sigma P=\operatorname{sgn}(\sigma)P$. Thus $V(f)$ is alternating and its square is symmetric.

**Proposition.** The discriminant is a polynomial in the coefficients of $f$, belongs to the base field, and is nonzero exactly when $f$ has no repeated root. If $f$ is separable, $\operatorname{char}F\ne2$, $L$ is its splitting field, and $G=\operatorname{Gal}(L/F)\le S_n$, then

$$
G\le A_n\quad\Longleftrightarrow\quad V(f)\in F
\quad\Longleftrightarrow\quad\operatorname{disc}(f)\in(F^\times)^2.
$$

*Proof.* $V(f)^2$ is symmetric, hence belongs to $F$, and it is nonzero exactly when the roots are distinct. Moreover,

$$
G\le A_n
 \iff \sigma(V(f))=V(f)\quad(\sigma\in G)
 \iff V(f)\in L^G=F.
$$

This implies that $\operatorname{disc}(f)=V(f)^2$ is a square in $F$. Conversely, if $V(f)^2=c^2$ for $c\in F^\times$, then $(V(f)-c)(V(f)+c)=0$, so $V(f)=\pm c\in F$. Here $\operatorname{char}F\ne2$ is needed for the sign to distinguish odd permutations. ◻

## Fixed fields

For a group $H\le\operatorname{Aut}(K)$, its fixed field is

$$
K^H=\\\{a\in K:\sigma(a)=a\text{ for all }\sigma\in H\\\}.
$$

It is a subfield, and $H\le\operatorname{Gal}(K/K^H)$.

If $H$ is finite and $\beta\in K$, the orbit polynomial

$$
p_{H,\beta}(x)=\prod_{\gamma\in H\cdot\beta}(x-\gamma)
$$

has coefficients in $K^H$. Once the fixed-field theorem below is applied, it is the minimal polynomial of $\beta$ over $K^H$, so $[K^H(\beta):K^H]=|H\cdot\beta|=|H:H_\beta|$.

An infinite algebraic extension contains finite subextensions of arbitrarily large degree. If the extension is separable, it therefore contains elements of arbitrarily large degree. The separability qualification is essential for the second statement.

**Theorem.** **Artin's fixed-field theorem.** If $H$ is a finite group of automorphisms of $K$, then

$$
[K:K^H]=|H|\qquad\text{and}\qquad\operatorname{Gal}(K/K^H)=H.
$$

In particular, $K/K^H$ is Galois.

*Proof outline.* Dedekind's independence lemma says distinct field homomorphisms are linearly independent as functions. Applied to the $|H|$ automorphisms, it gives $|H|\le[K:K^H]$. In the other direction, for any $|H|+1$ elements of $K$, the homogeneous system obtained by applying every $\sigma\in H$ has a nontrivial solution; choose one of minimal support and compare it with its transforms to show that its coefficient ratios lie in $K^H$. Hence those elements are $K^H$-dependent and $[K:K^H]\le|H|$. Equality follows, and the usual automorphism bound leaves no automorphisms beyond $H$. ◻

## Galois extensions

**Theorem.** **Transport of splitting fields.** Let $\phi:F\to F'$ be an isomorphism, let $f\in F[x]$, and apply $\phi$ to its coefficients to obtain $f^\phi\in F'[x]$. If $M$ and $M'$ are splitting fields of $f$ and $f^\phi$, then $\phi$ extends to an isomorphism $M\to M'$.

**Proposition.** If $K/F$ is finite separable and $\Omega$ is an algebraic closure containing an image of $K$, there are exactly $[K:F]$ distinct $F$-embeddings $K\hookrightarrow\Omega$.

*Proof.* By the primitive element theorem write $K=F(\alpha)$. Each embedding is determined by the image of $\alpha$, and every root in $\Omega$ of the minimal polynomial gives one. Separability supplies exactly $\deg m_{\alpha,F}=[K:F]$ distinct roots. ◻

**Definition.** A finite extension $K/F$ is *Galois* if $|\operatorname{Gal}(K/F)|=[K:F]$.

**Proposition.** For every finite extension, $|\operatorname{Gal}(K/F)|$ divides $[K:F]$. A field is Galois over the fixed field of any finite group of automorphisms.

*Proof.* Put $H=\operatorname{Gal}(K/F)$. Since $F\subseteq K^H$, the tower law and Artin's theorem give $[K:F]=|H|[K^H:F]$. The second assertion is exactly Artin's theorem. ◻

**Theorem.** **Characterizations of Galois extensions.** For a finite extension $K/F$, the following are equivalent:

1.  $K/F$ is Galois;

2.  $K^{\operatorname{Gal}(K/F)}=F$;

3.  $K/F$ is normal and separable;

4.  $K$ is the splitting field over $F$ of a separable polynomial.

*Proof outline.* The number of $F$-embeddings of $K$ into an algebraic closure is $[K:F]$ exactly when $K/F$ is separable; all of them have image $K$ exactly when the extension is normal. Hence (1) is equivalent to (3). A finite extension is normal exactly when it is a splitting field, and adjoining the product of the minimal polynomials of a basis gives a separable splitting polynomial, proving (3)$\Leftrightarrow$(4). Artin's fixed-field theorem applied to $\operatorname{Gal}(K/F)$ gives $[K:K^G]=|G|$, so the tower law makes (1) equivalent to (2). ◻

**Proposition.** Every finite separable extension is contained in a finite Galois extension (its normal closure). If $K/F$ is Galois and $F\subseteq L\subseteq K$, then $K/L$ is Galois and $\operatorname{Gal}(K/L)\le\operatorname{Gal}(K/F)$.

*Proof.* The splitting field of the product of the minimal polynomials of finitely many separable generators is a finite Galois extension containing $K$. For the second claim, a separable polynomial over $F$ that splits in $K$ remains a separable polynomial over $L$ with the same splitting field; the Galois characterization applies. Fixing $L$ implies fixing $F$, giving the subgroup. ◻

## Fundamental theorem of Galois theory

**Theorem.** **Fundamental theorem of Galois theory.** Let $K/F$ be finite Galois and $G=\operatorname{Gal}(K/F)$. The maps

$$
H\longmapsto K^H,
\qquad L\longmapsto\operatorname{Gal}(K/L)
$$

are mutually inverse, inclusion-reversing bijections between subgroups $H\le G$ and intermediate fields $F\subseteq L\subseteq K$. Moreover,

$$
[K:K^H]=|H|,\qquad[K^H:F]=[G:H].
$$

For $L=K^H$, the extension $L/F$ is Galois if and only if $H\trianglelefteq G$; in that case restriction gives

$$
\begin{aligned}
\operatorname{res}_L:G&\longrightarrow\operatorname{Gal}(L/F),
&\sigma&\longmapsto\sigma|_L,\\
G/H&\xrightarrow{\ \sim\ }\operatorname{Gal}(L/F),
&\sigma H&\longmapsto\sigma|_L.
\end{aligned}
$$

*Proof outline.* For $H\le G$, Artin's theorem gives $\operatorname{Gal}(K/K^H)=H$. For an intermediate $L$, the extension $K/L$ is Galois, so its fixed field is $L$. Thus the two maps are inverse and reverse inclusions. Artin and the tower law give the degree formulas. Conjugation satisfies $\sigma\operatorname{Gal}(K/L)\sigma^{-1}=\operatorname{Gal}(K/\sigma L)$; hence $H$ is normal exactly when every $\sigma$ preserves $L$. In that case restriction $G\to\operatorname{Gal}(L/F)$ has kernel $H$ and is surjective by extension of embeddings, so the first isomorphism theorem gives $G/H$. ◻

## Cubic and quartic equations

Assume in this subsection that $\operatorname{char} F\ne2,3$. Translation by $-a_2/3$ changes a cubic $x^3+a_2x^2+a_1x+a_0$ into $x^3+px+q$.

**Proposition.** **Irreducible cubic.** Let $f=x^3+px+q$ be irreducible and separable. Its Galois group is $A_3$ or $S_3$, and

$$
\operatorname{Gal}(f/F)\cong A_3
\quad\Longleftrightarrow\quad
-4p^3-27q^2\text{ is a square in }F.
$$

Otherwise the group is $S_3$.

*Proof.* Irreducibility makes the action on three roots transitive, so the group is $A_3$ or $S_3$. The Vandermonde product is fixed exactly by the even permutations. Its square is the cubic discriminant $-4p^3-27q^2$, so the discriminant criterion distinguishes the two groups. ◻

**Proposition.** **Quartic resolvent.** An irreducible quartic can be translated to $f=x^4+px^2+qx+r$. Its transitive Galois group is, up to conjugacy, one of $S_4,A_4,D_4,C_4,V_4$.

Set

$$
\theta_1=\alpha_1\alpha_2+\alpha_3\alpha_4,
\quad\theta_2=\alpha_1\alpha_3+\alpha_2\alpha_4,
\quad\theta_3=\alpha_1\alpha_4+\alpha_2\alpha_3.
$$

The action of $S_4$ on these three pairings has kernel $V_4$. Their resolvent cubic is

$$
g(y)=\prod_{i=1}^3(y-\theta_i)
=y^3-py^2-4ry+(4pr-q^2).
$$

If $K$ is the splitting field of $f$, $G=\operatorname{Gal}(K/F)$, and $M$ is the splitting field of $g$ inside $K$, then

$$
\operatorname{Gal}(M/F)\cong G/(G\cap V_4).
$$

*Proof.* Transitivity leaves precisely the five listed conjugacy classes of subgroups of $S_4$. A direct permutation check shows that the action on the three pairings has kernel $V_4$. Viète's formulas expand the symmetric product $\prod(y-\theta_i)$ to the displayed polynomial in $F[y]$. Its splitting field is fixed by $G\cap V_4$, so restriction and the first isomorphism theorem give the quotient. The orbit sizes of the $\theta_i$ give the three factorization patterns in the table; parity and the action over $F(V(f))$ separate the remaining pairs. ◻

For an irreducible quartic, the practical classification is:

| Factorization of $g$ | $G$ | Additional test |
|---|---|---|
| irreducible | $S_4$ or $A_4$ | discriminant nonsquare/square |
| three linear factors | $V_4$ | --- |
| linear $\times$ irreducible quadratic | $D_4$ or $C_4$ | $f$ stays irreducible/factors over $F(V(f))$ |

## Roots of unity

Let $\zeta_n$ be a primitive $n$th root of unity. The cyclotomic polynomial $\Phi_n$ is irreducible over $\mathbb Q$, has degree $\varphi(n)$, and $\mathbb Q(\zeta_n)$ is the splitting field of $x^n-1$.

**Theorem.** **Cyclotomic Galois group.** The map

$$
\operatorname{Gal}(\mathbb Q(\zeta_n)/\mathbb Q)\longrightarrow
(\mathbb Z/n\mathbb Z)^\times,
\qquad \sigma\longmapsto k\quad\text{when }\sigma(\zeta_n)=\zeta_n^k,
$$

is an isomorphism. Thus cyclotomic extensions of $\mathbb Q$ are abelian.

**Theorem.** **Kronecker--Weber.** Every finite abelian Galois extension of $\mathbb Q$ is contained in $\mathbb Q(\zeta_n)$ for some $n$.

## Kummer extensions

**Proposition.** **Basic Kummer extension.** Suppose $\operatorname{char} F\nmid n$ and $F$ contains all $n$th roots of unity. If $x^n-a$ is irreducible and $\alpha^n=a$, then $F(\alpha)/F$ is cyclic Galois of degree $n$, with automorphisms $\alpha\mapsto\zeta_n^i\alpha$.

*Proof.* The roots of $x^n-a$ are $\zeta_n^i\alpha$, all lying in $F(\alpha)$, and they are distinct because $\operatorname{char} F\nmid n$. Thus $F(\alpha)$ is a splitting field and is Galois. Irreducibility gives degree $n$; sending $\alpha$ to any of the $n$ roots gives all automorphisms, which form the cyclic group of $n$th roots of unity. ◻

For the prime-degree converse, fix a prime $p$, assume $\operatorname{char} F=0$, and assume that $F$ contains a primitive $p$th root of unity $\zeta_p$.

**Proposition.** **Prime Kummer dichotomy.** For every $b\in F^\times$, the polynomial $x^p-b$ is either irreducible over $F$ or splits completely over $F$.

*Proof.* Let $\alpha^p=b$. Because $\zeta_p\in F$, every root $\zeta_p^j\alpha$ lies in $F(\alpha)$; hence $F(\alpha)$ is the splitting field of the separable polynomial $x^p-b$. Restriction to $\alpha$ embeds its Galois group into the cyclic group $\\\{\alpha\mapsto\zeta_p^j\alpha\\\}$ of order $p$. Thus $[F(\alpha):F]$ divides $p$. If the degree is $1$, then $\alpha\in F$ and all roots lie in $F$. Otherwise the degree is $p$, so the degree-$p$ polynomial $x^p-b$ is the minimal polynomial of $\alpha$ and is irreducible. ◻

**Theorem.** **Prime-degree Kummer converse.** If $K/F$ is cyclic Galois of degree $p$, then $K=F(\alpha)$ for some $\alpha\in K$ such that $\alpha^p\in F$.

*Proof.* Let $\sigma$ generate $\operatorname{Gal}(K/F)$. By the linear independence of distinct field automorphisms, the $F$-linear operator

$$
T=\sum_{j=0}^{p-1}\zeta_p^{-j}\sigma^j
$$

is not zero. Choose $u\in K$ with $\alpha=T(u)\ne0$. Reindexing the sum gives $\sigma(\alpha)=\zeta_p\alpha$, so $\sigma(\alpha^p)=\alpha^p$ and therefore $\alpha^p\in F$. Since $\alpha$ is not fixed by $\sigma$, it is not in $F$. The intermediate degree $[F(\alpha):F]$ divides the prime $p$ and is greater than $1$, hence equals $p$; consequently $K=F(\alpha)$. ◻

**Corollary.** **Prime radical towers.** Suppose all required roots of unity have first been adjoined. In a tower

$$
\begin{gathered}
F=E_0\subseteq E_1\subseteq\cdots\subseteq E_m,\\
E_i=E_{i-1}(\alpha_i),\qquad \alpha_i^{p_i}\in E_{i-1},
 \end{gathered}
$$

where every $p_i$ is prime, each nontrivial layer is cyclic Galois of degree $p_i$. In particular, the degree of the tower is a product of the primes occurring in its nontrivial layers; if every $p_i=p$, it is a power of $p$.

*Proof.* Apply the prime Kummer dichotomy to $x^{p_i}-\alpha_i^{p_i}$ over $E_{i-1}$. The layer is either trivial or, by the basic Kummer proposition, cyclic Galois of degree $p_i$. The tower law multiplies these layer degrees. ◻

## Solvability by radicals

A polynomial $f\in F[x]$ with splitting field $K$ is *solvable by radicals* if there is a field $E\supseteq K$ and a tower

$$
\begin{gathered}
F=E_0\subseteq E_1\subseteq\cdots\subseteq E_m=E,\\
E_i=E_{i-1}(\alpha_i),\qquad
 \alpha_i^{n_i}\in E_{i-1},\quad n_i\ge2.
 \end{gathered}
$$

A finite group $G$ is *solvable* if it has a subnormal series

$$
\\\{1\\\}=G_0\triangleleft G_1\triangleleft\cdots\triangleleft G_m=G
$$

whose factors $G_{i+1}/G_i$ are abelian.

**Proposition.** **Refinement of a solvable series.** A finite group is solvable if and only if it has a subnormal series whose factors are cyclic groups of prime order.

*Proof.* A series with cyclic factors has abelian factors, so one implication is immediate. Conversely, suppose the factors in a solvable series are finite abelian. Every finite abelian group has a composition series with prime-order cyclic factors: choose an element of prime order, quotient by the subgroup it generates, and argue by induction on the order. Insert the inverse images of these composition series between each consecutive pair $G_i\triangleleft G_{i+1}$. The resulting refinement has the required prime-order cyclic factors. ◻

**Theorem.** **Galois criterion for solvability.** Let $F$ have characteristic $0$, let $f\in F[x]$, and let $K$ be its splitting field. Then $f$ is solvable by radicals if and only if $\operatorname{Gal}(K/F)$ is a solvable group.

*Proof outline.* First replace arbitrary radical exponents by prime exponents, and adjoin the finitely many roots of unity required by the resulting tower. In a normal closure, adjoin at each stage all conjugates of the next prime radical. The prime Kummer proposition shows that the corresponding Galois group embeds in a product of cyclic groups of prime order and is therefore abelian. Repeated use of the restriction exact sequence shows that the full Galois group is solvable. Subgroups and quotients of solvable groups are solvable, so $\operatorname{Gal}(K/F)$ is solvable.

Conversely, suppose $G=\operatorname{Gal}(K/F)$ is solvable. First adjoin the finitely many roots of unity needed below; this cyclotomic extension is itself radical. After this base change, the Galois group of the compositum with $K$ is a subgroup of $G$ and hence remains solvable. Refine a solvable series to cyclic prime-order factors. The fundamental theorem of Galois theory turns it into a tower of cyclic prime-degree extensions. The prime-degree Kummer converse writes every layer as the adjunction of a prime radical. Thus the roots of $f$ lie in a radical extension of $F$. ◻

**Corollary.** **Symmetric-group obstruction.** If a polynomial has Galois group $S_n$ with $n\ge5$, it is not solvable by radicals. In particular, the generic degree-$n$ polynomial is not solvable by radicals for $n\ge5$.

*Proof.* For $n\ge5$, the subgroup $A_n$ is nonabelian simple. If $S_n$ were solvable, its subgroup $A_n$ would be solvable; but a nontrivial simple solvable group must be cyclic of prime order, a contradiction. Apply the Galois criterion. The polynomial with algebraically independent generic coefficients has Galois group $S_n$. ◻
