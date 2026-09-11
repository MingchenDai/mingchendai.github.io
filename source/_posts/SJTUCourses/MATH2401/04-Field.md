---
title: "MATH2401 Abstract Algebra (4): Field"
date: 2026-09-11 17:26:33
tags:
- Mathematics
- Notes
- SJTU Courses
categories: Exploration
mathjax: true
tikzjax: true
---

This article studies how fields grow when elements and roots are adjoined, with particular attention to minimal polynomials, extension degrees, splitting fields, finite fields, Frobenius, and primitive elements.

<!--more-->

> Collections of **MATH2401 Abstract Algebra** notes:
>
> 1. [*Group*](../01-Group);
> 2. [*Ring*](../02-Ring);
> 3. [*Module*](../03-Module);
> 4. [*Field*](../04-Field) (this article);
> 5. [*Action*](../05-Action);
> 6. [*Galois Theory*](../06-GaloisTheory).

## Extensions and generated fields

**Definition.** If $F\subseteq K$ are fields, $K/F$ is a *field extension*. Its degree is $[K:F]=\dim_FK$, the dimension of $K$ as a vector space over $F$. The extension is finite if this dimension is finite and algebraic if every element of $K$ is algebraic over $F$.

**Definition.** The *prime subfield* of a field $F$ is its smallest subfield, equivalently the intersection of all subfields of $F$.

**Proposition.** Every field $F$ contains a unique prime subfield. It is isomorphic to $\mathbb Q$ when $\operatorname{char} F=0$ and to $\mathbb F_p$ when $\operatorname{char} F=p>0$.

For $\alpha_1,\dots,\alpha_n\in K$, distinguish

$$
F[\alpha_1,\dots,\alpha_n]
=\\\{f(\alpha_1,\dots,\alpha_n):f\in F[x_1,\dots,x_n]\\\}
$$

from the smallest subfield $F(\alpha_1,\dots,\alpha_n)$, whose elements are rational expressions with nonzero denominator.

**Definition.** An extension $K/F$ is *simple* if $K=F(\alpha)$ for some $\alpha\in K$. Such an element $\alpha$ is called a *primitive element* of the extension.

## Algebraic and transcendental elements

**Definition.** An element $\alpha\in K$ is *algebraic over $F$* if $f(\alpha)=0$ for some nonzero $f\in F[x]$; otherwise it is *transcendental*. The evaluation homomorphism is

$$
\operatorname{ev}_\alpha:F[x]\longrightarrow K,\qquad
f(x)\longmapsto f(\alpha).
$$

If $\alpha$ is algebraic, the kernel is a nonzero principal ideal; its monic generator $m_{\alpha,F}$ is the *minimal polynomial* of $\alpha$ over $F$. Every other generator differs by a nonzero scalar, so the monic normalization ensures uniqueness.

**Proposition.** **Minimal-polynomial properties.** If $\alpha$ is algebraic over $F$, then $m_{\alpha,F}$ is irreducible, $f(\alpha)=0$ exactly when $m_{\alpha,F}\mid f$, and

$$
F[\alpha]=F(\alpha)\cong F[x]/(m_{\alpha,F}).
$$

If $\alpha$ is transcendental, then $F[\alpha]\cong F[x]$ and $F(\alpha)\cong F(x)$.

*Proof.* Write $m=m_{\alpha,F}$. First, if $m=uv$ with both factors nonconstant, then $u(\alpha)v(\alpha)=0$ forces a polynomial of smaller degree to vanish at $\alpha$. Thus $m$ is irreducible and $(m)$ is maximal. Second,

$$
F[\alpha]\cong F[x]/(m)
$$

is therefore a field. Third, by the definition of the generated field, $F[\alpha]=F(\alpha)$. Moreover,

$$
f(\alpha)=0\iff f\in\ker(\operatorname{ev}_\alpha)=(m)
 \iff m\mid f.
$$

If $\alpha$ is transcendental, evaluation is injective, giving $F[\alpha]\cong F[x]$ and, on fraction fields, $F(\alpha)\cong F(x)$. ◻

**Corollary.** If $\deg m_{\alpha,F}=n$, then $1,\alpha,\dots,\alpha^{n-1}$ is an $F$-basis of $F(\alpha)$, and $[F(\alpha):F]=n$.

*Proof.* For every $g\in F[x]$, polynomial division gives

$$
g(x)=m_{\alpha,F}(x)q(x)+r(x),\qquad \deg r<n.
$$

Hence $g(\alpha)=r(\alpha)$, giving spanning. If $r(\alpha)=0$, minimality forces $r=0$, giving linear independence. ◻

**Proposition.** If $\alpha_1,\dots,\alpha_n$ are algebraic over $F$, then

$$
F[\alpha_1,\dots,\alpha_n]=F(\alpha_1,\dots,\alpha_n)
$$

and this is a finite extension of $F$. Conversely, if the finitely generated $F$-algebra on the left is a field, every $\alpha_i$ is algebraic over $F$.

*Proof.* Adjoin the algebraic elements one at a time; each step is finite and is already a field, so the composite is finite and equals the generated field. The converse is Zariski's lemma: a field finitely generated as an algebra over a field is finite algebraic over it. ◻

**Proposition.** For algebraic elements $\alpha$ and $\beta$ over $F$, there is an $F$-isomorphism $F(\alpha)\to F(\beta)$ sending $\alpha$ to $\beta$ if and only if $m_{\alpha,F}=m_{\beta,F}$; when it exists, it is unique.

*Proof.* An $F$-isomorphism carrying $\alpha$ to $\beta$ carries every polynomial relation of one to the other, so the monic minimal polynomials agree. Conversely, identify both fields with $F[x]/(m)$; the resulting isomorphism sends the class of $x$, hence $\alpha$, to $\beta$. This requirement determines the image of every rational expression, proving uniqueness. ◻

**Theorem.** **Eisenstein's criterion.** If $f=a_nx^n+\cdots+a_0\in\mathbb Z[x]$ and a prime $p$ satisfies

$$
p\nmid a_n,\qquad p\mid a_i\ (i<n),\qquad p^2\nmid a_0,
$$

then $f$ is irreducible over $\mathbb Q$.

## Degrees and towers

**Proposition.** Every finite extension is algebraic. A simple extension has

$$
[F(\alpha):F]=\deg m_{\alpha,F}
$$

when $\alpha$ is algebraic and has infinite degree when $\alpha$ is transcendental.

*Proof.* In a finite extension, $1,\alpha,\alpha^2,\dots$ are linearly dependent, so every $\alpha$ is algebraic. The algebraic degree formula follows from the simple-extension degree corollary above; if $\alpha$ is transcendental, its powers are linearly independent, so $[F(\alpha):F]=\infty$. ◻

**Theorem.** **Tower law.** For fields $F\subseteq K\subseteq L$,

$$
[L:F]=[L:K][K:F]
$$

with cardinal multiplication in general. In particular, if both degrees on the right are finite their product is the ordinary integer product; if either is infinite, then $[L:F]$ is infinite.

*Proof.* Let $(u_i)_{i\in I}$ be an $F$-basis of $K$ and $(v_j)_{j\in J}$ a $K$-basis of $L$. For $z\in L$,

$$
z=\sum_j k_jv_j=\sum_{i,j}a_{ij}u_iv_j,\qquad a_{ij}\in F.
$$

Moreover,

$$
\sum_{i,j}a_{ij}u_iv_j=0
 \Longrightarrow \sum_i a_{ij}u_i=0\ (j\in J)
 \Longrightarrow a_{ij}=0.
$$

Thus $(u_iv_j)_{(i,j)\in I\times J}$ is an $F$-basis of $L$, and $[L:F]=|I\times J|=[L:K][K:F]$. ◻

**Definition.** The *relative algebraic closure* of $F$ in $K$ is

$$
K_{\mathrm{alg}}=\\\{a\in K:a\text{ is algebraic over }F\\\}.
$$

This is a subfield of $K$, and $K_{\mathrm{alg}}/F$ is algebraic. Indeed, if $a,b$ are algebraic, the finite extension $F(a,b)/F$ contains $a\pm b$, $ab$, and $a/b$ when $b\ne0$; every element of a finite extension is algebraic.

## Adjoining roots and splitting fields

**Theorem.** **Kronecker.** Every nonconstant $f\in F[x]$ has a root in some field extension of $F$.

**Theorem.** **Existence and uniqueness of splitting fields.** Every nonconstant $f\in F[x]$ has a splitting field over $F$, unique up to an $F$-isomorphism.

*Proof outline.* Existence follows by adjoining roots successively. For uniqueness, if $\alpha_1$ and $\alpha_2$ are roots in two extensions of the same irreducible $p\in F[x]$, then

$$
F(\alpha_1)\cong F[x]/(p)\cong F(\alpha_2),
 \qquad \alpha_1\longmapsto\bar x\longmapsto\alpha_2.
$$

Starting with this isomorphism and adjoining the remaining roots one at a time extends it inductively. Since each splitting field is generated by all the roots, the final $F$-embedding is surjective and hence an $F$-isomorphism. ◻

**Proposition.** **Multiple-root criterion.** An element $\alpha$ is a multiple root of $f$ if and only if $f(\alpha)=f'(\alpha)=0$. An irreducible $f\in F[x]$ has a multiple root in a splitting field if and only if $f'=0$. Thus irreducible polynomials over a field of characteristic $0$ have distinct roots.

## Finite fields and Frobenius

Every finite field has characteristic $p$ and is a finite-dimensional vector space over $\mathbb F_p$; dimension $n$ gives order $p^n$.

**Theorem.** **Classification of finite fields.** For every prime power $q=p^n$ there is a field $\mathbb F_q$ of order $q$, unique up to isomorphism. Its multiplicative group $\mathbb F_q^\times$ is cyclic; a generator is called a primitive element of the finite field.

*Proof outline.* The roots of $x^{p^n}-x$ in an algebraic closure form a field: Frobenius makes them closed under addition, subtraction, multiplication, and inversion. The derivative is $-1$, so there are exactly $p^n$ distinct roots. Any field of that order consists of these roots, proving uniqueness. Cyclicity of the multiplicative group follows from the root-count argument proved in the cyclic groups section. ◻

**Proposition.** **Frobenius.** In characteristic $p$, $\operatorname{Fr}:F\to F$, $a\mapsto a^p$, is an injective field endomorphism. It is an automorphism when $F$ is finite. For $F=\mathbb F_{p^n}$ it has order $n$ and fixed field $\mathbb F_p$.

*Proof.* The binomial coefficients between the endpoints are divisible by $p$, giving $(a+b)^p=a^p+b^p$; multiplicativity is clear. A field homomorphism is injective, and on a finite set it is therefore surjective. Fermat's little theorem gives $c^p=c$ for every $c\in\mathbb F_p$; since $x^p-x$ has at most $p$ roots, these are precisely the fixed points. Since every $a\in\mathbb F_{p^n}$ obeys $a^{p^n}=a$, the order divides $n$; a smaller order would give at most $p^d$ fixed elements, so the order is exactly $n$. ◻

**Theorem.** **Subfields of finite fields.** The subfields of $\mathbb F_{p^r}$ are precisely the unique fields $\mathbb F_{p^s}$ for divisors $s\mid r$.

*Proof.* A subfield of order $p^s$ makes $\mathbb F_{p^r}$ a vector space over it, so $s\mid r$ by the tower law. For $s\mid r$, the roots of $x^{p^s}-x$ inside $\mathbb F_{p^r}$ form the required field. They are uniquely determined as the fixed field of the $s$-th power of Frobenius. ◻

**Theorem.** **Factorization of $x^{p^n}-x$.** Over $\mathbb F_p$, the polynomial $x^{p^n}-x$ is the product, without repetition, of all monic irreducible polynomials whose degrees divide $n$.

## Primitive elements and Bézout identity

Do not confuse a generator of $\mathbb F_q^\times$ with a primitive element of an extension $K/F$, meaning an element $\theta$ with $K=F(\theta)$.

**Theorem.** **Primitive element theorem.** Every finite separable extension $K/F$ is simple. In particular, every finite extension in characteristic $0$, and every finite extension of a finite field, has a primitive element.

*Proof outline.* If $F$ is finite, then $K$ is finite and a generator of $K^\times$ generates $K$ as a field. Suppose $F$ is infinite. By induction it is enough to treat $K=F(\alpha,\beta)$. Let $\alpha_i$ and $\beta_j$ be the distinct conjugates of $\alpha$ and $\beta$ (distinct by separability). Choose $c\in F^\times$ outside the finite set for which

$$
\alpha_i+c\beta_j=\alpha+c\beta
 \qquad\text{for some }(i,j)\ne(1,1),
$$

and put $\gamma=\alpha+c\beta$. If $f$ and $g$ are the minimal polynomials of $\alpha$ and $\beta$, then in $F(\gamma)[x]$ the polynomials

$$
f(\gamma-cx)\quad\text{and}\quad g(x)
$$

have the unique common root $\beta$. Their monic gcd is therefore $x-\beta$, so $\beta\in F(\gamma)$ and then $\alpha=\gamma-c\beta\in F(\gamma)$. Thus $K=F(\gamma)$. Induction handles finitely many generators. ◻

Since $F[x]$ is a Euclidean domain, nonzero $f,g\in F[x]$ have a unique monic greatest common divisor $d$, and there are $a,b\in F[x]$ such that $af+bg=d$. This is Bézout's identity; the Chinese remainder theorem is the related quotient-ring statement obtained when $d=1$.
