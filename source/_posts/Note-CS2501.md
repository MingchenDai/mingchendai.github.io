---
title: CS2501 Discrete Mathematics
date: 2026-01-16 07:54:32
tags:
  - Mathematics
  - SJTU Courses
  - Notes
Categories: Exploration
mathjax: true
---

This is a note for **CS2501 Discrete Mathematics** (离散数学) for information security major in SJTU. It is originally written in Chinese to keep consistency with the course language, and later translated to English.

Discrete mathematics mainly contains 3 parts: **graph theory**, **logic**, and **set theory**. Graph theory introduces basic concept of graphs, eulerian and hamiltonian paths and circuits, trees and spanning trees. Logic part introduces propositional logic and predicate logic, including syntax, semantics, equivalence, and inference. Set theory part introduces basic set concepts, relations, functions, and combinatorics.

<!--more-->

## Graph Theory

When reading this part, take note of [<del>CS2501 Data Structure</del>](/404) (Not available yet) for reference, especially for algebraic representation of graphs, trees and minimum spanning trees.

### Concept of Graphs

The ordered pair $(V(G),E(G))$ is called a **graph**, where:

- $V(G)$ is a **non-empty** set called the *vertex set*;
- $E(G)$ is the set of edges between the vertices.

$G=(V,E)$ is a common representation.

Graphs can be divided into **finite graphs** and **infinite graphs**. This course only discusses finite graphs.

---

**Loop**: An edge associated with only one node.

**Multiple edge**: Multiple edges existing between the same pair of nodes.

**Degree**: $d(v)$, the number of edges associated with a node.

- **Out-degree**: $d^+(v)$, the number of edges for which the current node is the starting point.
- **In-degree**: $d^-(v)$, the number of edges for which the current node is the endpoint.
- **Isolated vertex**: A vertex with degree 0.
- **Pendant vertex**/**Pendant edge**: A vertex with degree 1 / The edge associated with a pendant vertex.
- **Odd vertex/Even vertex**: A vertex with odd/even degree.
- **Regular graph**: A graph where all vertices have the same degree, denoted as a $k$-regular graph.

Clearly, $d(v)=d^+(v)+d^-(v)$.

---

- **Simple graph**: An undirected graph where there is at most one edge between any two nodes and no loops.
- **Empty graph**: A simple graph with no edges.
- **Trivial graph**: An empty graph with only one vertex.
- **Complete graph**: $K_n$, a simple graph where there is an edge between any two nodes. Clearly, every node in $K_n$ has degree $n-1$.

---

- **Weighted graph**: A graph where each edge is assigned a real number as its weight.
- **Positive weight graph**: A weighted graph where the weight of each edge is a positive real number.

---

**Subgraph**: Given $G(V,E)$, a graph $G'(V',E')$ satisfying $V'\subseteq V$ and $E'\subseteq E$.

- **Spanning subgraph**: A subgraph satisfying $V'=V$.
- **Induced subgraph**: $E'$ contains all edges of $G$ between the vertex subset $V'$.
- **Trivial subgraph**: $G$ itself and the empty graph.

---

Given two graphs $G_1=(V_1,E_1)$ and $G_2=(V_2,E_2)$, we can define the following operations:

- **Union**: $G_1\cup G_2=(V_1\cup V_2,E_1\cup E_2)$
- **Intersection**: $G_1\cap G_2=(V_1\cap V_2,E_1\cap E_2)$
- **Symmetric difference**: $G_1\oplus G_2=(V_1\cup V_2,E_1\oplus E_2)$, where $A\oplus B=(A\cup B)-(A\cap B)$.

---

**Complement graph**: The complement of $G$ is $K_n-G$.

---

**Out-neighborhood set**/**Immediate successor set**: $\Gamma^+(v)=\{u|(v,u)\in E\}$.

**In-neighborhood set**/**Immediate predecessor set**: $\Gamma^-(v)=\{u|(u,v)\in E\}$.

#### Basic Properties of Graphs

1. $\displaystyle \sum_{v\in V(G)}d(v)=2m$, where $m$ is the number of edges in the graph.
2. (Easily derived from Property 1) The number of vertices with odd degree in $G$ must be even.
3. In a directed graph $G$, the sum of out-degrees equals the sum of in-degrees.
4. The number of edges in $K_n$ is $\displaystyle \frac{1}{2}n(n-1)$.
5. (Derived from degree range and Pigeonhole principle) In a non-empty simple graph $G$, there must exist vertices with the same degree.

#### Graph Isomorphism

Given two graphs $G_1=(V_1,E_1)$ and $G_2=(V_2,E_2)$, if there exists a bijection $f$ between $V_1$ and $V_2$ such that $(u,v)\in E_1$ if and only if $(f(u),f(v))\in E_2$, then these two graphs are said to be **isomorphic**, denoted as $G_1\cong G_2$.

Currently, there is no effective algorithm for determining graph isomorphism. The following are necessary conditions for graph isomorphism, used only to determine non-isomorphism:

- $|V(G_1)|=|V(G_2)|$ and $|E(G_1)|=|E(G_2)|$.
- The non-increasing sequences of vertex degrees of $G_1$ and $G_2$ are the same.
- There exist isomorphic induced subgraphs.

### Algebraic Representation of Graphs

#### Adjacency Matrix

In a directed unweighted graph, if there is a directed edge from vertex $i$ to vertex $j$, then $A[i,j]=1$. If the edge is assigned with a weight $w$, then $A[i,j]=w$.

In an undirected unweighted graph, if there is an edge between vertex $i$ and vertex $j$, then $A[i,j]=A[j,i]=1$.

Adjacency matrix can represent loops but cannot represent multiple edges.

#### Incidence Matrix

Let $G=(V,E)$, then the incidence matrix is an $n\times m$ matrix. Incidence matrix can represent multiple edges, but cannot represent loops.

In a directed graph:
- $B[i,j]=1$ means $v_i$ is the starting point of edge $e_j$.
- $B[i,j]=-1$ means $v_i$ is the endpoint of edge $e_j$.
- $B[i,j]=0$ means $v_i$ is not incident with edge $e_j$.

In an undirected graph:
- $B[i,j]=1$ means $v_i$ is incident with edge $e_j$.
- $B[i,j]=0$ means $v_i$ is not incident with edge $e_j$.

#### Adjacency List

Storing a graph in the form of linked lists. Adjacency lists can represent loops and multiple edges.

### Walks and Circuits

#### Basic Definitions

**Directed walk**: In a directed graph $G=(V,E)$, if an edge sequence $P=(e_{i1},e_{i2},\cdots,e_{iq})$ satisfies that in $e(v_i,v_j)$, $v_i$ is the endpoint of $e_{i(k-1)}$ and $v_j$ is the starting point of $e_{i(k+1)}$, then $P$ is called a directed walk in $G$.

Similarly, undirected walks are defined by alternating vertex-edge sequences.

**Directed circuit**: A directed walk whose endpoint and starting point are the same.

**Simple directed walk**/**Simple directed circuit**: A walk/circuit with no repeated edges.

**Elementary directed walk**/**Elementary directed circuit**: A simple directed walk/circuit with no repeated vertices.

The definitions of simple undirected walk/simple undirected circuit/elementary undirected walk/elementary undirected circuit can be understood similarly.

---

**Connected graph**: In an undirected graph, there exists a walk between any two vertices. For directed graphs, their direction is not considered. A disconnected graph is the opposite.

**Maximal connected subgraph**/**Connected component**: A connected subgraph that is not a proper subgraph of any connected subgraph of the graph. Each connected component of a graph is an induced subgraph of it.

**Strongly connected vertices**: In a directed graph, there exist paths between two vertices that reach each other.

**Strongly connected graph**: Every two vertices of a directed graph are strongly connected.

**Strongly connected component**: A maximal strongly connected subgraph of a directed non-strongly connected graph.

---

**Chord**: An edge whose two endpoints are both in an elementary circuit but are not adjacent in that elementary circuit.

**Maximal elementary walk**: An elementary walk whose two endpoints are not adjacent to vertices outside the elementary walk itself.

Any elementary walk, if not a maximal elementary walk, has at least one endpoint adjacent to a vertex outside the elementary walk itself. To create a maximal elementary walk, simply extend the elementary walk by including that vertex, repeat this process until it becomes a maximal elementary walk.

---

**Bipartite graph**: If the vertex set of a graph can be partitioned into two disjoint non-empty subsets such that the two endpoints of every edge of the graph lie in different subsets, then the graph is called a bipartite graph, denoted as $G=<V_1,V_2>$. The bipartition subsets of a bipartite graph may not be unique.

**Complete bipartite graph**: A bipartite graph where every vertex in one subset is adjacent to every vertex in the other subset, denoted as $K_{m,n}$, where $|V_1|=m$, $|V_2|=n$.

A graph containing a $K_3$ subgraph must not be bipartite.

#### Eulerian Walks and Eulerian Circuits

**Eulerian circuit/walk**: A simple circuit/walk in an undirected connected graph that traverses every edge.

A necessary and sufficient condition for an undirected connected graph to have an Eulerian circuit is that **the degree of each vertex in the graph is even**.

Proof of necessity is trivial, and proof of sufficiency can be done recursively since there must exist an elementary circuit in the graph.

If **there are only 2 vertices with odd degree in an undirected connected graph**, then the graph contains an Eulerian walk. This theorm can be proved by adding an edge between the two odd-degree vertices to make all degrees even, then removing that edge after finding the Eulerian circuit.

#### Hamiltonian Walks and Circuits

**Hamiltonian circuit/walk**: An elementary circuit/walk in an undirected graph that visits all vertices. H-circuit/walk problems generally refer to simple graphs.

---

**Sufficiency Theorem 1**: If the sum of the degrees of any two vertices in a simple graph is greater than or equal to $n-1$, then the graph contains a Hamiltonian walk.

*Corollary*: If the sum of the degrees of any two vertices in a simple graph is greater than or equal to the number of vertices, then the graph contains a Hamiltonian circuit.

---

*Closure of a graph*: If $v_i$ and $v_j$ are non-adjacent vertices in $G$ satisfying $d(v_i)+d(v_j)\geq n$, then let $G'=G+(v_i,v_j)$. The final graph obtained is the closure of $G$, denoted as $C(G)$.

> The closure of a simple graph $G$ is unique.
>
> If there exist two non-adjacent vertices $v_i$ and $v_j$ in a simple graph $G$ satisfying $d(v_i)+d(v_j)\geq n$, then a necessary and sufficient condition for $G$ to have an H-circuit is that $G+(v_i,v_j)$ has an H-circuit.

**Sufficiency Theorem 2**: A necessary and sufficient condition for a simple graph $G$ to have a Hamiltonian circuit is that its closure has a Hamiltonian circuit.

**Necessity Theorem**: If $G$ is a Hamiltonian graph, then for every non-empty proper subset $S$ of $V$, we have $W(G-S)\leq|S|$, where $W(G-S)$ is the number of connected components of $G-S$.

> Proof: Let $C$ be the Hamiltonian circuit, then $W(G-S)<W(C-S)\leq|S|$.

*Corollary*: Hamiltonian graphs have no cut vertices.

If a Hamiltonian graph alternately labels each vertex, the numbers of the two types of points are the same. Graphs that cannot be labeled (e.g., $K_3$) cannot be judged.

---

A graph that has only a Hamiltonian walk and no Hamiltonian circuit is not a Hamiltonian graph.

There is currently no necessary and sufficient criterion for determining Hamiltonian graphs; judgment for graphs with few vertices relies on experience.

### Trees

#### Definition

*Forest*: A graph containing no circuits.

*Tree*: A forest with only one connected component, i.e., a connected graph containing no circuits.

*Leaf*: A vertex of degree 1.

*Cut edge*: An edge that does not belong to any circuit. Every edge of a tree is a cut edge.

*Spanning tree*: A tree that is a spanning subgraph of a graph.

> Any undirected connected graph has a spanning tree. Spanning trees are not unique.

*Cospanning tree*: The subgraph formed by removing the spanning tree from the graph.

> The cospanning tree is not necessarily connected, not necessarily circuit-free, therefore it is not necessarily a tree, let alone a spanning tree.

#### Properties of Trees

The following properties are equivalent:

- A tree is connected and circuitless.
- A tree is connected and every edge is a cut edge.
- A tree is connected and has exactly $n-1$ edges.
- There is a unique walk between any two vertices in a tree.
- A tree has no circuits, but adding any edge between two vertices creates exactly one circuit.

> A tree is a minimally connected graph and also a maximally circuitless connected graph.

There must exist leaf vertices in a tree.

#### Binary Trees, Huffman Trees

Data structure content, omitted.

#### Minimum Spanning Tree

*Kruskal's algorithm*: Continuously add the current shortest edge to the tree; if it forms a circuit, delete it.

*Prim's algorithm*: Arbitrarily select a vertex to form a set, select the shortest edge incident to the vertex set, and add the other endpoint to the vertex set.

## Mathematical Logic

### Basic Concepts of Propositional Logic

#### Propositions

**Proposition**: A declarative sentence that is either true or false (not both). A proposition should only have two values: True (T) and False (F).

**True/False proposition**: A declarative sentence that matches the facts is a true sentence, otherwise it is a false sentence.

**Propositional variable**: A symbol representing an arbitrary proposition.

---

**Simple proposition** (atomic proposition): A proposition that contains no connectives. A simple proposition cannot be further decomposed.

**Compound proposition**: A new proposition formed by connecting one or several simple propositions with connectives.

#### Propositional Connectives and Truth Tables

**Negation**: Symbol $\neg$.

| $p$ | $\neg p$ |
|-----|----------|
|  T  |     F    |
|  F  |     T    |

---

**Conjunction (and)**: Symbol $\land$

| $p$ | $q$ | $p\land q$ |
|-----|-----|------------|
|  T  |  T  |      T     |
|  T  |  F  |      F     |
|  F  |  T  |      F     |
|  F  |  F  |      F     |

---

**Disjunction (or)**: Symbol $\lor$.

| $p$ | $q$ | $p\lor q$ |
|-----|-----|-----------|
|  T  |  T  |     T     |
|  T  |  F  |     T     |
|  F  |  T  |     T     |
|  F  |  F  |     F     |

---

**Conditional proposition (implication)**: Symbol $\to$, meaning if P then Q. $P\to Q=\neg P \lor Q$.

| $p$ | $q$ | $p\to q$ |
|-----|-----|----------|
|  T  |  T  |    T     |
|  T  |  F  |    F     |
|  F  |  T  |    T     |
|  F  |  F  |    T     |

A conditional proposition is false only when the antecedent is true and the consequent is false. Actually, $\{\neg, \lor\}$ constitutes a complete set of connectives.

---

**Biconditional proposition (equivalence)**: Symbol $\leftrightarrow$, read as if and only if. $P\leftrightarrow Q=(P\to Q)\land(Q\to P)$.

| $p$ | $q$ | $p\leftrightarrow q$ |
|-----|-----|----------------------|
|  T  |  T  |           T          |
|  T  |  F  |           F          |
|  F  |  T  |           F          |
|  F  |  F  |           T          |

---

**Exclusive or**: Symbol $\veebar$.

| $p$ | $q$ | $p\veebar q$ |
|-----|-----|---------------|
|  T  |  T  |       F       |
|  T  |  F  |       T       |
|  F  |  T  |       T       |
|  F  |  F  |       F       |

---

For a compound proposition composed of $n$ propositional variables, its truth table has $2^n$ rows, meaning there are $2^n$ interpretations.

#### Well-Formed Formulas

**Well-formed formula** (WFF): A propositional formula is derived from the following rules:

- A simple proposition is a well-formed formula.
- If $A$ is a well-formed formula, then $\neg A$ is also a well-formed formula.
- If $A$ and $B$ are well-formed formulas, then $(A\land B)$, $(A\lor B)$, $(A\to B)$, and $(A\leftrightarrow B)$ are also well-formed formulas.
- Only formulas constructed by the above methods are well-formed formulas.

**Precedence of connectives**: $\neg$ highest, then $\land$, then $\lor$, then $\to$ and $\leftrightarrow$ lowest.

---

**Tautology**: A well-formed formula that is true under all interpretations.

**Contradiction**: A well-formed formula that is false under all interpretations.

**Satisfiable formula**: A well-formed formula that is true under some interpretation.

**Substitution rule**: If $A$ is a well-formed formula, and formula $B$ is obtained by applying the substitution rule to $A$, and if $A$ is a tautology, then $B$ is also a tautology. To ensure the substitution rule preserves tautologies, only atomic propositions can be substituted, and all occurrences of the same propositional variable must be replaced by the same formula.

#### Formalization of Propositions

Commonly used expressions are infix expressions, i.e., expressions where connectives are placed between their two operands.

- **Polish notation (prefix expression)**: An expression where connectives precede their operands.
- **Reverse Polish notation (postfix expression)**: An expression where connectives follow their operands.

### Equivalence and Deductive Inference in Propositional Logic

#### Equivalence Theorem

**Equivalence**: For two propositions, if for all interpretations constructed from all propositional variables appearing in them, the two propositions have exactly the same truth value under the same interpretation, then the two propositions are said to be equivalent, denoted as $A\Leftrightarrow B$ or $A=B$.

**Equivalence theorem**: For any well-formed formulas $A$ and $B$, $A\Leftrightarrow B$ if and only if $A\leftrightarrow B$ is a tautology.

The equivalence symbol is not a connective; it is only a symbol representing the relation. Equivalence is reflexive, symmetric, and transitive. These attributes will be refered in Part [Set Theory](#Set-Theory).

#### Equivalent Formulas

**Double negation law**: $\neg \neg P \Leftrightarrow P$.

---

**Associative laws**:

- $(P\land Q)\land R \Leftrightarrow P\land(Q\land R)$;
- $(P\lor Q)\lor R \Leftrightarrow P\lor(Q\lor R)$.
- $(P\leftrightarrow Q)\leftrightarrow R \Leftrightarrow P\leftrightarrow(Q\leftrightarrow R)$.

---
**Commutative laws**:

- $P\land Q \Leftrightarrow Q\land P$;
- $P\lor Q \Leftrightarrow Q\lor P$;
- $P\leftrightarrow Q \Leftrightarrow Q\leftrightarrow P$.

---
**Distributive laws**:

- $P\land(Q\lor R) \Leftrightarrow (P\land Q)\lor(P\land R)$;
- $P\lor(Q\land R) \Leftrightarrow (P\lor Q)\land(P\lor R)$.
- $P\rightarrow(Q\rightarrow R) \Leftrightarrow (P\to Q)\rightarrow(P\to R)$;

---
**De Morgan's laws**:

- $\neg(P\land Q) \Leftrightarrow \neg P\lor \neg Q$;
- $\neg(P\lor Q) \Leftrightarrow \neg P\land \neg Q$.
- $\neg(P\leftrightarrow Q) \Leftrightarrow \neg P\leftrightarrow Q \Leftrightarrow P\leftrightarrow \neg Q$.
- $\neg(P\rightarrow Q) \Leftrightarrow P\land \neg Q$.

---
**Identity laws**:

- $P\land T \Leftrightarrow P$;
- $P\lor F \Leftrightarrow P$.

---

- $P\rightarrow Q \Leftrightarrow \neg P\lor Q$.
- $P\rightarrow Q \Leftrightarrow \neg Q\rightarrow \neg P$.
- $P\rightarrow (Q\rightarrow R) \Leftrightarrow (P\land Q)\rightarrow R$.
- $P\leftrightarrow Q \Leftrightarrow (P\land Q)\lor(\neg P\land \neg Q)$.
- $P\leftrightarrow Q \Leftrightarrow (P\lor \neg Q)\land(\neg P\lor Q)$.
- $P\rightarrow (Q\rightarrow R) \Leftrightarrow Q\rightarrow(P\rightarrow R) \Leftrightarrow (P\lor \neg Q)\land (\neg P\lor R) \Leftrightarrow (P\rightarrow R)\land (Q\rightarrow R)$.
- $(P\rightarrow R) \land (Q\rightarrow R) \Leftrightarrow (P\lor Q)\rightarrow R$

#### Replacement Rule

For a subformula of formula $A$, replacing it with an equivalent formula is called **replacement**.

> Replacement and substitution are different. Replacement only requires substituting some subformula of $A$, not necessarily all identical subformulas.

#### Complete Sets of Connectives

- **Exclusive or**: $\veebar$, $P\veebar Q=(P\land \neg Q)\lor(\neg P\land Q)$.
- **NAND**: $\uparrow$, $P\uparrow Q=\neg(P\land Q)$.
- **NOR**: $\downarrow$, $P\downarrow Q=\neg(P\lor Q)$.

For each interpretation of $n$ propositional variables, a connective can give 2 different judgments: true or false. For the group of propositional variables above, we can construct $2^n$ interpretations, each has 2 possible judgments to choose. Thus,$\displaystyle 2^{2^n}$ kinds of connectives can be defined, where $n$ is the number of propositional variables.

**Basis**: The smallest complete set of connectives.

#### Dual Formulas

**Dual formula**: Given a well-formed formula $A$, replace every $\land$ with $\lor$, every $\lor$ with $\land$, and replace all occurrences of $T$ with $F$, all occurrences of $F$ with $T$. The resulting formula is called the dual of $A$, denoted as $A^*$.

Denote $A^-=A(\neg P_1,\neg P_2,\dots,\neg P_n)$, where $P_1,P_2,\dots,P_n$ are all propositional variables appearing in $A$.

- $(A^-)^-=A$, $(A^*)^*=A$;
- $\neg (A^*)=(\neg A)^*$, $\neg (A^-)=(\neg A)^-$;
- $\neg A=A^{-*}$.

#### Normal Forms

**Normal form theorem**: Any propositional formula has an equivalent disjunctive normal form and an equivalent conjunctive normal form.

- Eliminate biconditionals and conditionals.
- Push negations inward to propositional variables.
- Use equivalence transformations.

**Minterm**: A well-formed formula composed of $n$ propositional variables, where each propositional variable appears exactly once, either as the variable itself or as its negation, is called a minterm of the $n$ propositional variables.

> Encoding: Arrange the propositional variables in a certain order. Represent $P_i$ being true as 1, false as 0. This gives a binary number, and thus a decimal number, which is called the encoding of that minterm.

**Principal disjunctive normal form**: The disjunctive normal form consisting of the disjunction of all minterms for which the formula is true.

**Principal conjunctive normal form**: The conjunctive normal form consisting of the conjunction of all maxterms for which the formula is false.

> Refer to materials about digital electronics.

#### Deductive Inference

**Inference rules**:

- **Premise introduction**: Premises can be introduced at any time during the inference process.
- **Conclusion citation**: Intermediate conclusions obtained during the inference process can be used as premises for subsequent inference.
- **Substitution rule**: Can be applied to propositional variables of tautologies.
- **Replacement rule**: Any subformula can be replaced by an equivalent formula.
- **Detachment rule (Modus Ponens)**: From $P\land Q$ and $P$, one can infer $Q$.
- **Conditional proof**: A conditional as a conclusion can be used as a condition.

#### Resolution Reasoning

That is, after converting the formula into conjunctive normal form, use the detachment rule and conditional proof for inference.

### Predicate Logic

#### Predicates and Individual Terms

**Predicate**: A word that indicates a property of an object or a relationship between objects. In a proposition, if there is more than one subject, the word indicating the relationship between these subjects is called a predicate. This is a multi-place predicate, denoted by $P(x, y)$, $Q(x, y)$, $R(x, y, z)$, ...

**Individual term**: A word that denotes a specific object.

**Domain of discourse (Universe)**: The set of all possible individuals in predicate logic.

#### Well-Formed Formulas

Quantifiers are restricted to act on individual variables. Quantifiers are not allowed to act on propositional variables or predicate variables, and predicates of predicates are not discussed.

> Focus on first-order predicate logic, not higher-order predicate logic.

- Propositional constants, propositional variables, and atomic predicate formulas are all well-formed formulas.
- If $A$ is a well-formed formula, then $\neg A$ is also a well-formed formula.
- If $A$ and $B$ are well-formed formulas, and no variable $x$ is bound in $A$ and free in $B$, then $(A\land B)$, $(A\lor B)$, $(A\to B)$, and $(A\leftrightarrow B)$ are also well-formed formulas.
- If $A$ is a well-formed formula, and $x$ is an individual variable in $A$, then $(\forall x A)$ and $(\exists x A)$ are also well-formed formulas.
- Only formulas constructed by the above methods are well-formed formulas.

#### Formalization of Natural Language Statements

The following are some common examples of formalizing natural language statements.

**All rational numbers are real numbers**: $(\forall x) (Q(x) \to R(x))$, where $Q(x)$ means "$x$ is a rational number", $R(x)$ means "$x$ is a real number".

> Cannot be expressed as $(\forall x) (Q(x) \land R(x))$, because that means "All numbers are rational and real".

**Some real numbers are rational numbers**: $(\exists x) (R(x) \land Q(x))$, where $Q(x)$ means "$x$ is a rational number", $R(x)$ means "$x$ is a real number".

> Cannot be expressed as $(\exists x) (R(x) \to Q(x))$, because that means "There exists a number such that if it is real, then it is rational".

**No irrational number is a rational number**: $\neg( \exists x) (I(x) \land Q(x))$, where $Q(x)$ means "$x$ is a rational number", $I(x)$ means "$x$ is an irrational number".

> Can also be expressed as $(\forall x) (I(x) \to \neg Q(x))$ or $(\forall x) (Q(x) \to \neg I(x))$, which are logically equivalent.

#### Analysis of Multiple Quantifications on Predicate Variables

- $(\forall x)(\forall y) P(x, y)$, the order of the two quantifiers in this formula can be interchanged, equivalent to $(\forall y)(\forall x) P(x, y)$.
- $(\exists x)(\exists y) P(x, y)$, the order of the two quantifiers in this formula can be interchanged, equivalent to $(\exists y)(\exists x) P(x, y)$.
- $(\forall x)(\exists y) P(x, y)$, the order of the two quantifiers in this formula cannot be interchanged; it is generally not equivalent to $(\exists y)(\forall x) P(x, y)$.

#### Formula Representation of Quantifiers in Finite Domains

In a finite domain $D=\{d_1,d_2,\dots,d_n\}$:
- $\displaystyle (\forall x) P(x) \Leftrightarrow P(d_1)\land P(d_2)\land \cdots \land P(d_n)$;
- $\displaystyle (\exists x) P(x) \Leftrightarrow P(d_1)\lor P(d_2)\lor \cdots \lor P(d_n)$.

**Multiple quantification formulas**: Taking binary as an example,

- $\displaystyle (\forall x)(\forall y) P(x,y) \Leftrightarrow \bigwedge_{i=1}^n \bigwedge_{j=1}^n P(d_i,d_j)$;
- $\displaystyle (\exists x)(\exists y) P(x,y) \Leftrightarrow \bigvee_{i=1}^n \bigvee_{j=1}^n P(d_i,d_j)$;
- $\displaystyle (\forall x)(\exists y) P(x,y) \Leftrightarrow \bigwedge_{i=1}^n \bigvee_{j=1}^n P(d_i,d_j)$;
- $\displaystyle (\exists x)(\forall y) P(x,y) \Leftrightarrow \bigvee_{i=1}^n \bigwedge_{j=1}^n P(d_i,d_j)$.

#### Universal Validity and the Decision Problem of Formulas

*Universally valid formula*: A well-formed formula that is true under every interpretation in every domain.

*Satisfiable*: A well-formed formula that is true under some interpretation in some domain.

*Decidable*: There exists an algorithm that can decide whether any well-formed formula is universally valid.

### Equivalence Calculus in Logic

#### Negation-type Equivalences

In predicate logic, what needs to be interpreted includes: the domain, predicate variables, propositional variables, functions, free individuals.

**Generalization of De Morgan's laws**:
- $\neg (\forall x) P(x) \Leftrightarrow (\exists x) \neg P(x)$;
- $\neg (\exists x) P(x) \Leftrightarrow (\forall x) \neg P(x)$.

#### Quantifier Distribution Equivalences

The distribution laws of quantifiers over $\land$ and $\lor$ are as follows:

- $(\forall x)(P(x)\land Q) \Leftrightarrow (\forall x) P(x) \land Q$, where $x$ does not occur in $Q$;
- $(\forall x)(P(x)\lor Q) \Leftrightarrow (\forall x) P(x) \lor Q$, where $x$ does not occur in $Q$;
- $(\exists x)(P(x)\land Q) \Leftrightarrow (\exists x) P(x) \land Q$, where $x$ does not occur in $Q$;
- $(\exists x)(P(x)\lor Q) \Leftrightarrow (\exists x) P(x) \lor Q$, where $x$ does not occur in $Q$.

Quantifier distribution over $\rightarrow$:

- $(\forall x)(P(x)\to Q) \Leftrightarrow (\exists x) P(x) \to Q$, where $x$ does not occur in $Q$;
- $(\exists x)(P(x)\to Q) \Leftrightarrow (\forall x) P(x) \to Q$, where $x$ does not occur in $Q$.
- $(\forall x)(Q\to P(x)) \Leftrightarrow Q \to (\forall x) P(x)$, where $x$ does not occur in $Q$;
- $(\exists x)(Q\to P(x)) \Leftrightarrow Q \to (\exists x) P(x)$, where $x$ does not occur in $Q$.

Distribution of $\forall$ over $\land$, $\exists$ over $\lor$:

- $(\forall x)(P(x)\land Q(x)) \Leftrightarrow (\forall x) P(x) \land (\forall x) Q(x)$;
- $(\exists x)(P(x)\lor Q(x)) \Leftrightarrow (\exists x) P(x) \lor (\exists x) Q(x)$.

Distribution laws after variable renaming:

- $(\forall x)(\forall y)(P(x)\lor P(y)) \Leftrightarrow (\forall x)(P(x)\lor P(x))$;
- $(\exists x)(\exists y)(P(x)\land P(y)) \Leftrightarrow (\exists x)(P(x)\land P(x))$.

#### Normal Forms

**Prenex normal form**: All quantifiers are at the very front of the formula, followed by a quantifier-free formula.

**Suffix normal form**: All quantifiers are at the very end of the formula, preceded by a quantifier-free formula.

**Skolem standard form**: A prenex form that does not retain existential quantifiers, only retains universal quantifiers, and converts existentially quantified free variables within the scope into function forms.

> Skolem standard form is not equivalent to the original prenex normal form.

#### Basic Inference Formulas

The basic form of inference is $T \to T$.

- $(\forall x)P(x)\lor(\forall x)Q(x) \Rightarrow (\forall x)(P(x)\lor Q(x))$
- $(\exists x)(P(x)\land Q(x)) \Rightarrow (\exists x)P(x)\land(\exists x)Q(x)$
- $(\forall x)(P(x)→Q(x)) \Rightarrow (\forall x)P(x)→(\forall x)Q(x)$
- $(\forall x)(P(x)→Q(x)) \Rightarrow (\exists x)P(x)→(\exists x)Q(x)$
- $(\forall x)(P(x)↔Q(x)) \Rightarrow (\forall x)P(x)↔(\forall x)Q(x)$
- $(\forall x)(P(x)↔Q(x)) \Rightarrow (\exists x)P(x)↔(\exists x)Q(x)$
- $(\forall x)(P(x)→Q(x)) ∧ (\forall x)(Q(x)→R(x)) \Rightarrow (\forall x)(P(x)→R(x))$
- $(\forall x)(P(x)→Q(x)) ∧ P(a) \Rightarrow Q(a)$
- $(\forall x)(\forall y)P(x,y) \Rightarrow (\exists x)(\forall y)P(x,y)$
- $(\exists x)(\forall y)P(x,y) \Rightarrow (\forall y)(\exists x)P(x,y)$

The converses of these inference formulas generally do not hold.

#### Deductive Calculus

**Universal quantifier elimination rule (Universal Instantiation)**: From $(\forall x)P(x)$, one can infer $P(a)$, where $a$ is any individual constant in the domain.

**Universal quantifier introduction rule (Universal Generalization)**: If $P(a)$ holds, and $a$ is an arbitrary individual constant in $P(x)$, then one can infer $(\forall x)P(x)$.

**Existential quantifier introduction rule (Existential Generalization)**: From $P(a)$, one can infer $(\exists x)P(x)$, where $a$ is any individual constant in the domain.

**Existential quantifier elimination rule (Existential Instantiation)**: If $(\exists x)P(x)$ holds, and from $P(a)$ one can infer $Q$, where $a$ is an arbitrary individual constant in both $P(x)$ and $Q$, then one can infer $Q$.

First eliminate existential quantifiers, then eliminate universal quantifiers, and finally perform propositional logic resolution reasoning. Introduction has no restrictions.

#### Resolution Reasoning

To prove that $A\rightarrow B$ is a theorem ($A$, $B$ are predicate formulas), i.e., $A\Rightarrow B$, it is equivalent to prove that $A\land\neg B=G$ is a contradiction. This is the starting point of the resolution method (proof by contradiction).

## Set Theory

### Sets

#### Concepts and Representation of Sets

A set is the most basic concept in set theory but is difficult to give a precise definition. As a result, the set is the only concept not defined in set theory, but it is easy to understand and grasp.

**Set**: A collection of distinct, distinguishable things gathered together to form a whole. Each thing that makes up a set is called an **element** of the set. If $a$ is an element of set $A$, we say $a$ **belongs to** $A$, or $a$ is **in** $A$, denoted $a \in A$. If $b$ is not an element of set $A$, we say $b$ **does not belong to** $A$, or $b$ is **not in** $A$, denoted $b \notin A$.

The elements in a set are **unordered** and **mutually distinct**. Whether any given thing belongs to a given set is **determinate**.

---

**Roster (Extensional) notation**: The method of representing a set by listing all its elements within braces.

**Set-builder (Intensional) notation**: The method of representing a set by using a property or condition that all elements satisfy. Generally, if $P(x)$ is a predicate formula concerning only $x$, then set $A$ can be represented as $A=\{x|P(x)\}$.

**Russell's paradox**: The set of all sets cannot be studied. If such set exists, axiom separation rule of set theory ensures the existence of set $R=\{x|x \notin x\}$. If $R \in R$, then by definition of $R$, $R \notin R$; if $R \notin R$, then by definition of $R$, $R \in R$. This leads to a contradiction.

#### Relations Between Sets and Special Sets

**Equality**: If all elements of set $A$ and set $B$ are exactly the same, then set $A$ and set $B$ are said to be **equal**, denoted $A=B$; otherwise, they are **not equal**, denoted $A \neq B$. That is: $A=B \Leftrightarrow (\forall x) (x \in A \leftrightarrow x \in B)$, $A \neq B \Leftrightarrow (\exists x) \lnot (x \in A \leftrightarrow x \in B)$.

**Principle of extensionality**: The same set can be represented by different methods.

---

**Subset**: If every element of set $A$ is also an element of set $B$, then set $A$ is called a **subset** of set $B$, denoted $A \subseteq B$; otherwise, set $A$ is **not a subset** of set $B$, denoted $A \not\subseteq B$. That is: $A \subseteq B \Leftrightarrow (\forall x) (x \in A \to x \in B)$.

**Two sets are equal if and only if they are subsets of each other**, that is: $A=B \Leftrightarrow (A \subseteq B) \land (B \subseteq A)$.

The subset relation is **reflexive**, **antisymmetric**, and **transitive**: 
- $A\subseteq A$; 
- $A \subseteq B \land B \subseteq A \Rightarrow A=B$; 
- $A \subseteq B \land B \subseteq C \Rightarrow A \subseteq C$.

**Proper subset**: If set $A$ is a subset of set $B$, and set $A$ is not equal to set $B$, then set $A$ is called a **proper subset** of set $B$, or $B$ is a **proper superset** of $A$, denoted $A \subset B$; otherwise, set $A$ is not a proper subset of set $B$, denoted $A \not\subset B$. That is: $A \subset B \Leftrightarrow (A \subseteq B) \land (A \neq B)$.

---

**Empty set**: The set containing no elements, denoted $\varnothing$. That is: $\varnothing = \{ \}$.

For any set $A$, $\varnothing \subseteq A$. The empty set is unique.

---

**Universal set**: In a given problem, the set of all things under consideration is called the **universal set**, denoted $E$, i.e., $E=\{x|x=x\}$. The universal set corresponds to the domain of discourse in predicate logic.

#### Set Operations

- **Union**: $A\cup B=\{x|x \in A \lor x \in B\}$.
- **Intersection**: $A\cap B=\{x|x \in A \land x \in B\}$.
- **Difference (Relative complement)**: $A-B=\{x|x \in A \land x \notin B\}$.
- **Complement (Absolute complement)**: $\bar{A}=E-A=\{x|x \notin A\}$. The absolute complement is the relative complement with respect to $E$.
- **Symmetric difference**: $A \oplus B = (A - B) \cup (B - A)$.

---

- **Generalized union**: $\cup A=\{x| (\exists z)(z\in A \land x \in z)\}$, where $A$ is a non-empty set of sets.
- **Generalized intersection**: $\cap A=\{x| (\forall z)(z\in A \to x \in z)\}$, where $A$ is a non-empty set of sets.

Specifically, $\cup \varnothing=\varnothing$, and $\cap \varnothing$ is meaningless.

---

**Power set**: Let $A$ be a set and the set of all subsets of $A$ is called the **power set** of $A$, denoted $P(A)$, i.e., $P(A)=\{x|x \subseteq A\}$. All elements of the power set are sets, and the number of elements is $2^{|A|}$.

---

Define the **ordered pair** $\langle a,b\rangle$ as the set $\{\{a\},\{a,b\}\}$. $n$-tuples can be recursively defined as $\langle a_1,a_2,\dots,a_n\rangle=\langle \langle a_1,a_2,\dots,a_{n-1}\rangle,a_n\rangle$.

**Cartesian product**: Let $A$ and $B$ be two sets. The set of all ordered pairs $\langle a,b\rangle$ (where $a \in A$ and $b \in B$) is called the **Cartesian product** of set $A$ and set $B$, denoted $A \times B$, i.e., $A \times B = \{\langle a,b\rangle | a \in A \land b \in B\}$.

The $n$-ary Cartesian product is defined as $A_1 \times A_2 \times \cdots \times A_n = \{\langle a_1,a_2,\dots,a_n \rangle | a_1 \in A_1 \land a_2 \in A_2 \land \cdots \land a_n \in A_n \}$.

---

**Precedence of set operations**

- **Unary operators** ($−A$, $P(A)$, $\cap A$, $\cup A$) take precedence over
- **Binary operators** ($−$, $\cap$, $\cup$, $\oplus$, $\times$) take precedence over
- **Set relation symbols** ($=$, $\subseteq$, $\subset$, $\in$) take precedence over
- **Unary connectives** ($\lnot$) take precedence over
- **Binary connectives** ($\land$, $\lor$, $\to$, $\leftrightarrow$) take precedence over
- **Logical relation symbols** ($\Leftrightarrow$, $\Rightarrow$).

Additionally, parentheses following mathematical conventions denote priority, with left-to-right priority for equal precedence.
- Inside parentheses takes precedence over outside.
- Inside the same parentheses, follow the above priorities.
- Inside the same parentheses, for operations with the same priority, follow left-to-right order.

#### Graphical Representation of Sets

Graphical representations (e.g., Venn diagrams, Hasse diagrams) are more intuitive but lack rigorous theoretical foundation; they can only be used for illustration, not for strict mathematical proof.

#### Properties and Proofs of Set Operations

**Some properties of $\cap$, $\cup$, and $-$**

- Commutative laws:
  - $A \cup B = B \cup A$;
  - $A \cap B = B \cap A$.
- Associative laws:
  - $(A \cup B) \cup C = A \cup (B \cup C)$;
  - $(A \cap B) \cap C = A \cap (B \cap C)$.
- Distributive laws:
  - $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$;
  - $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$.
- Absorption laws:
  - $A \cup (A \cap B) = A$;
  - $A \cap (A \cup B) = A$.
- Idempotent laws:
  - $A \cup A = A$;
  - $A \cap A = A$.
- Domination (Zero) laws:
  - $A \cup \varnothing = A$;
  - $A \cap \varnothing = \varnothing$.
- Identity laws:
  - $A \cup E = E$;
  - $A \cap E = A$.
- Complement laws:
  - $A \cup \bar{A} = E$;
  - $A \cap \bar{A} = \varnothing$.
- De Morgan's laws:
  - $\overline{A \cup B} = \bar{A} \cap \bar{B}$;
  - $\overline{A \cap B} = \bar{A} \cup \bar{B}$.

---

**Some properties of $-$**

- $A-B=A-(A \cap B)$;
- $A-B=A \cap \bar{B}$;
- $A\cup (B-A) = A\cup B$;
- $A\cap (B-C) = (A \cap B) - C$.

---

**Some properties of $\oplus$**

- Commutative law: $A \oplus B = B \oplus A$;
- Associative law: $(A \oplus B) \oplus C = A \oplus (B \oplus C)$;
- Distributive law: $A \cap (B \oplus C) = (A \cap B) \oplus (A \cap C)$;
- Identity law: $A \oplus \varnothing = A$;
- Domination law: $A \oplus A = \varnothing$.
- $A\oplus(A\oplus B)=B$.

---

**Some properties of $\subseteq$**

---

**Properties of power sets and transitive sets**

- $A \subseteq B \Leftrightarrow P(A) \subseteq P(B)$;
- $A=B \Leftrightarrow P(A)=P(B)$;
- $P(A) \cap P(B) = P(A \cap B)$;
- $P(A) \cup P(B) \subseteq P(A \cup B)$;
- $P(A) \in P(B) \Rightarrow A \in B$;
- $P(A-B)\subseteq (P(A)-P(B))\cup \{\varnothing\}$.

**Transitive set**: If every element of set $A$ is a set, and every element of every element is also an element of set $A$, then set $A$ is called a **transitive set**. That is: $A$ is transitive $\Leftrightarrow (\forall x)(\forall y)(x \in y \land y \in A \to x \in A)$ or $\cup A \subseteq A$.

$A$ is transitive $\Leftrightarrow P(A)$ is transitive.

---

**Properties of generalized union and intersection**

If a non-empty set $A$ is transitive, then $\cap A$ is also transitive.

---

**Properties of Cartesian Product**

- $A\times \varnothing=\varnothing \times A=\varnothing$;
- If non-empty sets $A$ and $B$ are not equal, then $A\times B \neq B \times A$;
- $(A \times B) \times C \neq A \times (B \times C)$;
- If $x,y\in A$, then $\langle x,y\rangle\in PP(A)$, where $PP(A)$ refers to $P(P(A))$;
- For non-empty sets $A,B,C,D$, $(A \times B) \subseteq (C \times D) \Leftrightarrow A \subseteq C \land B \subseteq D$.

---

**Cardinality of Finite Set**: Define the cardinality (size) of a finite set $A$, denoted $|A|$, as the number of distinct elements in set $A$.

- $\lvert A\times B\rvert =|A|\cdot |B|$;
- $\lvert P(A)\rvert =2^{|A|}$;

**Exclusion Principle**: Suppose set $\displaystyle A=\bigcup_k A_i$, where $A_i$ are finite sets ($1 \leq i \leq n$). Then $\displaystyle \lvert A \rvert = \sum_{i=1}^n \lvert A_i \rvert - \sum_{1 \leq i < j \leq n} \lvert A_i \cap A_j \rvert + \sum_{1 \leq i < j < k \leq n} \lvert A_i \cap A_j \cap A_k \rvert - \cdots + (-1)^{n+1} \lvert A_1 \cap A_2 \cap \cdots \cap A_n \rvert$.

### Relations

#### Binary Relations

**Binary relation**: Let $A$ and $B$ be two sets. A **binary relation** $R$ from set $A$ to set $B$ is a subset of the Cartesian product $A\times B$, denoted $R \subseteq A \times B$. If $\langle a,b \rangle \in R$, we say $a$ is **related to** $b$ under relation $R$, or $a$ and $b$ satisfy relation $R$, denoted $aRb$. Binary relations are simply called **relations**.

**$n$-ary relation**: Let $A_1,A_2,\dots,A_n$ be $n$ sets. An **$n$-ary relation** $R$ from set $A_1$ to $A_2$, ..., to $A_n$ is a subset of the Cartesian product $A_1 \times A_2 \times \cdots \times A_n$.

---

**Identity relation**: Let $A$ be a set. The **identity relation** $I_A$ from set $A$ to set $A$ is defined as: $I_A=\{\langle a,a \rangle | a \in A\}$.

**Universal relation (Total relation)**: Let $A$ be a set. The **universal relation** $E_A$ from set $A$ to set $A$ is defined as: $E_A=\{\langle a,b \rangle | a \in A \land b \in A\}$.

**Empty relation**: Let $A$ be a set. The **empty relation** $O_A$ from set $A$ to set $A$ is defined as: $O_A=\varnothing$.

---

**Domain**: Let $R$ be a binary relation from set $A$ to set $B$. The set of all elements in $A$ that are related to at least one element in $B$ is called the **domain** of relation $R$, denoted $\text{dom}(R)$, i.e., $\text{dom}(R)=\{a|(\exists b)(\langle a,b \rangle \in R)\}$.

**Range**: Let $R$ be a binary relation from set $A$ to set $B$. The set of all elements in $B$ that are related to at least one element in $A$ is called the **range** of relation $R$, denoted $\text{ran}(R)$, i.e., $\text{ran}(R)=\{b|(\exists a)(\langle a,b \rangle \in R)\}$.

**Field**: Let $R$ be a binary relation from set $A$ to set $B$. The **field** of relation $R$, denoted $\text{fld}(R)$, is $\text{fld}(R)=\text{dom}(R) \cup \text{ran}(R)$.

---

**Relation matrix**: Let $R$ be a binary relation from set $A=\{a_1,a_2,\dots,a_m\}$ to set $B=\{b_1,b_2,\dots,b_n\}$. The **relation matrix** $M_R$ of $R$ is an $m \times n$ matrix defined by:

$$
m_{ij}=\begin{cases}1,&\langle a_i,b_j \rangle \in R;\\0,&\langle a_i,b_j \rangle \notin R.\end{cases}
$$

**Relation graph**: Let $R$ be a binary relation from set $A$ to set $B$. The **relation graph** of $R$ is a directed graph whose vertex set is $A \cup B$ and whose arc set is $\{\langle a,b \rangle | a \in A \land b \in B \land \langle a,b \rangle \in R\}$.

---

**Inverse of a relation**: Let $R$ be a binary relation from set $A$ to set $B$. The **inverse relation** $R^{-1}$ from set $B$ to set $A$ is defined as: $R^{-1}=\{\langle b,a \rangle | \langle a,b \rangle \in R\}$. $\textbf{M}(R^{-1})=\mathbf{M}(R)^T$.

**Composition of relations**: Let $R$ be a binary relation from set $A$ to set $B$, and $S$ a binary relation from set $B$ to set $C$. The **composition** $S \circ R$ of $R$ and $S$ is a binary relation from $A$ to $C$ defined as: $S \circ R=\{\langle a,c \rangle | (\exists b)(\langle a,b \rangle \in R \land \langle b,c \rangle \in S)\}$. $\textbf{M}(R\circ S)=\textbf{M}(S)\textbf{M}(R)$.

**Composition is associative but not commutative**. The composition operator has higher precedence than set operators.

**Restriction of a relation**: Let $R$ be a binary relation from set $A$ to set $B$, and $C \subseteq A$. The **restriction** of $R$ to $C$, denoted $R|_C$, is a binary relation from $C$ to $B$ defined as: $R|_C=\{\langle a,b \rangle | a \in C \land \langle a,b \rangle \in R\}$.

**Image under a relation**: Let $R$ be a binary relation from set $A$ to set $B$, and $C \subseteq A$. The **image** of $C$ under $R$, denoted $R(C)$, is defined as: $R[C]=\{b | (\exists a)(a \in C \land \langle a,b \rangle \in R)\}$.

For a relation $R$ from $X$ to $Y$ and a relation $S$ from $Y$ to $Z$:

- $\text{dom}(R^{-1})=\text{ran}(R)$;
- $\text{ran}(R^{-1})=\text{dom}(R)$;
- $(R^{-1})^{-1}=R$;
- $(S \circ R)^{-1} = R^{-1} \circ S^{-1}$.

For relations $R_2$, $R_3$ from $X$ to $Y$ and relation $R_1$ from $Y$ to $Z$:

- $R_1\circ (R_2 \cup R_3)=R_1 \circ R_2 \cup R_1 \circ R_3$;
- $R_1 \circ (R_2 \cap R_3) \subseteq R_1 \circ R_2 \cap R_1 \circ R_3$;

For relation $R_3$ from $X$ to $Y$ and relations $R_1$, $R_2$ from $Y$ to $Z$:

- $(R_1 \cup R_3) \circ R_3 = R_1 \circ R_3 \cup R_2 \circ R_3$;
- $(R_1 \cap R_2) \circ R_3 \subseteq R_1 \circ R_3 \cap R_2 \circ R_3$.

- $R[A\cup B]=R[A] \cup R[B]$;
- $R[A\cap B] \subseteq R[A] \cap R[B]$;
- $R[\cup A]=\cup\{R[B] | B\in A\}$;
- $R[\cap A] \subseteq \cap\{R[B] | B\in A\}$;
- $R[A]-R[B]=R[A-B]$.

#### Properties of Relations

**Reflexive relation**: Let $R$ be a binary relation on a set $A$ (i.e., from $A$ to $A$). $R$ is **reflexive** if and only if for every element $a$ in $A$, $\langle a,a \rangle \in R$. That is: $R$ is reflexive $\Leftrightarrow (\forall a)(a \in A \to \langle a,a \rangle \in R)$. The identity relation and the universal relation are reflexive.

**Irreflexive relation**: Let $R$ be a binary relation on a set $A$. $R$ is **irreflexive** if and only if for every element $a$ in $A$, $\langle a,a \rangle \notin R$. That is: $R$ is irreflexive $\Leftrightarrow (\forall a)(a \in A \land \langle a,a \rangle \notin R)$. The empty relation is irreflexive.

The union of reflexive and irreflexive relations does not constitute the universal relation. There exist relations that are neither reflexive nor irreflexive.

---

**Symmetric relation**: Let $R$ be a binary relation on a set $A$. $R$ is **symmetric** if and only if for any two elements $a$ and $b$ in $A$, if $\langle a,b \rangle \in R$, then $\langle b,a \rangle \in R$. That is: $R$ is symmetric $\Leftrightarrow (\forall a)(\forall b)(\langle a,b \rangle \in R \to \langle b,a \rangle \in R)$. The identity relation is symmetric; the universal relation is also symmetric.

The matrix of a symmetric relation is symmetric.

**Antisymmetric relation**: Let $R$ be a binary relation on a set $A$. $R$ is **antisymmetric** if and only if for any two distinct elements $a$ and $b$ in $A$, if $\langle a,b \rangle \in R$ and $\langle b,a \rangle \in R$, then $a=b$. That is: $R$ is antisymmetric $\Leftrightarrow (\forall a)(\forall b)((\langle a,b \rangle \in R \land \langle b,a \rangle \in R) \to a=b)$. The identity relation is antisymmetric; the universal relation is not antisymmetric.

Symmetry and antisymmetry can both hold, or both not hold.

The definition of antisymmetry can also be expressed using the contrapositive: if $a \neq b$, then $\langle a,b \rangle \notin R \lor \langle b,a \rangle \notin R$.

---

**Transitive relation**: Let $R$ be a binary relation on a set $A$. $R$ is **transitive** if and only if for any three elements $a$, $b$, and $c$ in $A$, if $\langle a,b \rangle \in R$ and $\langle b,c \rangle \in R$, then $\langle a,c \rangle \in R$. That is: $R$ is transitive $\Leftrightarrow (\forall a)(\forall b)(\forall c)((\langle a,b \rangle \in R \land \langle b,c \rangle \in R) \to \langle a,c \rangle \in R)$. The identity relation is transitive; the universal relation is also transitive.

---

If $R$ and $S$ are both reflexive/symmetric, then $R \cap S$, $R^{-1}$, and $R \cup S$ are also reflexive/symmetric.

If $R$ and $S$ are both transitive/antisymmetric, then $R \cap S$ and $R^{-1}$ are also transitive/antisymmetric, but $R \cup S$ is generally not transitive/antisymmetric.

If $R$ is symmetric, then $R=R^{-1}$; if $R$ is antisymmetric, then $R \cap R^{-1} \subseteq I_A$.

#### Closures of Relations

**Power of a relation**: Let $R$ be a binary relation on a set $A$. The **$n$th power** $R^n$ (where $n$ is a non-negative integer) is defined as:

- $R^0=I_A$;
- $R^{n+1}=R \circ R^n$.

If $A$ is a finite set and $R$ is a binary relation on $A$, then there exist positive integers $s$ and $t$ such that $R^s=R^t$.

- $R^m \circ R^n=R^{m+n}$;
- $(R^m)^n=R^{mn}$.

---

**Reflexive/Symmetric/Transitive closure**: Let $R$ be a binary relation on a set $A$. The **reflexive closure** $r(R)$, **symmetric closure** $s(R)$, and **transitive closure** $t(R)$ of $R$ are defined as:
- $R\subseteq r(R)$/$s(R)$/$t(R)$;
- $r(R)$/$s(R)$/$t(R)$ is reflexive/symmetric/transitive;
- If $R \subseteq Q$ and $Q$ is reflexive/symmetric/transitive, then $r(R) \subseteq Q$/$s(R) \subseteq Q$/$t(R) \subseteq Q$.

The reflexive/symmetric/transitive closure is the smallest superset of $R$ with the reflexive/symmetric/transitive property.

---

For any binary relation $R$ on a non-empty set $A$:
- $R$ is reflexive $\Leftrightarrow r(R) = R$;
- $R$ is symmetric $\Leftrightarrow s(R) = R$;
- $R$ is transitive $\Leftrightarrow t(R) = R$.

For binary relations $R_1$, $R_2$ on a non-empty set $A$, if $R_1\subseteq R_2$, then:
- $r(R_1) \subseteq r(R_2)$;
- $s(R_1) \subseteq s(R_2)$;
- $t(R_1) \subseteq t(R_2)$.
- $r(R_1 \cup R_2) = r(R_1) \cup r(R_2)$;
- $s(R_1 \cup R_2) = s(R_1) \cup s(R_2)$;
- $t(R_1 \cup R_2) \subseteq t(R_1) \cup t(R_2)$.

**Construction methods for closures**
- Reflexive closure: $r(R) = R \cup R^0$;
- Symmetric closure: $s(R) = R \cup R^{-1}$;
- Transitive closure: $t(R) = \bigcup_{n=1}^{\infty} R^n$.

**Warshall's algorithm**:
Let $A=\{a_1,a_2,\dots,a_n\}$ be a finite set, $R$ a binary relation on $A$, and $\mathbf{M}(R)=(m_{ij})_{n \times n}$ the relation matrix of $R$. Define a sequence of matrices $\{\mathbf{M}_k\}$, $k=0,1,2,\dots,n$, as follows:

- $\mathbf{M}_0=\mathbf{M}(R)$;
- $m_{ij}^{(k)}=\begin{cases}m_{ij}^{(k-1)},&\text{if } m_{ik}^{(k-1)}=0 \text{ or } m_{kj}^{(k-1)}=0;\\1,&\text{if } m_{ik}^{(k-1)}=1 \text{ and } m_{kj}^{(k-1)}=1.\end{cases}$
- Then $\mathbf{M}_n$ is the relation matrix of the transitive closure $t(R)$ of $R$.

---

For a relation $R$ on a non-empty set $A$:
- If $R$ is reflexive, then $t(R)$ and $s(R)$ are reflexive.
- If $R$ is symmetric, then $t(R)$ and $r(R)$ are symmetric.
- If $R$ is transitive, then $r(R)$ is transitive.

For a relation $R$ on a non-empty set $A$:
- $r(s(R))=s(r(R))$;
- $t(r(R))=r(t(R))$;
- $s(t(R)) \subseteq t(s(R))$.

#### Equivalence Relations and Partitions

**Equivalence relation**: Let $R$ be a binary relation on a set $A$. $R$ is called an **equivalence relation** if and only if $R$ is reflexive, symmetric, and transitive.

**Equivalence class**: Let $R$ be an equivalence relation on a set $A$. For any element $a$ in $A$, the set of all elements in $A$ that are related to $a$ under $R$ is called the **equivalence class** of $a$, denoted $[a]_R$, i.e., $[a]_R=\{b|b \in A \land \langle a,b \rangle \in R\}$. Geometrically, an equivalence class corresponds to one of the square blocks on the diagonal.

- $[x]_R\neq \varnothing$;
- $[x]_R\subseteq A$;
- $\cup\{[x]_R | x \in A\} = A$;

**Quotient set**: Let $R$ be an equivalence relation on a set $A$. The set of all distinct equivalence classes of $A$ under $R$ is called the **quotient set** of $A$ by $R$, denoted $A/R$, i.e., $A/R=\{[x]_R | x \in A\}$.

**Partition**: Let $A$ be a non-empty set. A collection $P=\{A_i | i \in I\}$ is called a **partition** of $A$ if:
- For all $i \in I$, $A_i \neq \varnothing$;
- For all $i,j \in I$, if $i \neq j$, then $A_i \cap A_j = \varnothing$;
- $\cup\{A_i | i \in I\} = A$.

The quotient set is the partition of $A$ induced by the equivalence relation $R$, denoted $\pi_R$. Conversely, a partition $\pi$ induces an equivalence relation $R_{\pi}$.

For a partition $\pi$ of a non-empty set $A$ and an equivalence relation $R$, $\pi$ induces $R$ if and only if $R$ induces $\pi$.

#### Tolerance Relations and Coverings

**Tolerance relation (Compatibility relation)**: Let $R$ be a binary relation on a set $A$. If $R$ is reflexive and symmetric, then $R$ is called a **tolerance relation** on $A$.

**Tolerance class**: Let $R$ be a tolerance relation on a set $A$. For any element $a$ in $A$, the set of all elements in $A$ related to $a$ under $R$ is called a **tolerance class** of $a$, denoted $[a]_R$, i.e., $[a]_R=\{b|b \in A \land \langle a,b \rangle \in R\}$.

**Maximal tolerance class**: Let $R$ be a tolerance relation on a set $A$. For any element $a$ in $A$, the union of all tolerance classes containing $a$ is called the **maximal tolerance class** of $a$, denoted $[a]_R^*$, i.e., $[a]_R^*=\cup\{[b]_R | b \in A \land \langle a,b \rangle \in R\}$.

---

**Covering**: Let $A$ be a non-empty set. A collection $C=\{A_i | i \in I\}$ is called a **covering** of $A$ if:
- For all $i \in I$, $A_i \neq \varnothing$;
- $\cup\{A_i | i \in I\} = A$.

A partition is a covering, but a covering is not necessarily a partition. Elements in a covering may intersect.

The set of maximal tolerance classes is a covering of $A$ induced by the tolerance relation $R$, denoted $\gamma_R$, called the **complete covering**.

#### Partial Orders

**Partial order relation**: Let $R$ be a binary relation on a set $A$. $R$ is called a **partial order relation** if and only if $R$ is reflexive, antisymmetric, and transitive, often denoted $\leq$.

**Quasi-order relation**: Let $R$ be a binary relation on a set $A$. $R$ is called a **quasi-order relation** if and only if $R$ is irreflexive and transitive, often denoted $<$. It can be proven that quasi-order relations are antisymmetric.

**Partially ordered set (poset)**: Let $A$ be a non-empty set and $\leq$ a partial order on $A$. The ordered pair $\langle A,R\rangle$ is called a **partially ordered structure**.

---

**Covering relation**: Let $\langle A,\leq \rangle$ be a partially ordered set, and $a,b \in A$. If $a\leq b$ and there exists no $c \in A$ such that $a\leq c\leq b$, then we say $b$ **covers** $a$. The **covering relation** $\text{cov}A$ of $A$ can be defined as: $\text{cov}A=\{\langle a,b \rangle | a,b \in A \land a \leq b \land \nexists c \in A (a \leq c \land c \leq b)\}$.

Let $\langle A,\leq \rangle$ be a partially ordered set, $B \subseteq A$:

- If $(\exist y)(y\in B \land (\forall x)(x\in B \rightarrow y\leq x))$, then $y$ is called the **least element** of $B$;
- If $(\exist y)(y\in B \land (\forall x)(x\in B \rightarrow x\leq y))$, then $y$ is called the **greatest element** of $B$;
- If $(\exist y)(y\in A \land (\forall x)(x\in B \land x\leq y)\rightarrow x=y)$, then $y$ is called a **minimal element** of $B$;
- If $(\exist y)(y\in A \land (\forall x)(x\in B \land y\leq x)\rightarrow x=y)$, then $y$ is called a **maximal element** of $B$.

> **Difference between least and minimal elements**: The least element should be less than or equal to all other elements in $B$; a minimal element is not greater than any other element in $B$ (less than or equal to some, and incomparable to others). The least (greatest) element may not exist, but if it exists, it is unique. A non-empty finite set must have minimal (maximal) elements, but they may not be unique.

- If $(\exist y)(y\in A \land (\forall x)(x\in B \rightarrow y\leq x))$, then $y$ is called a **lower bound** of $B$;
- If $(\exist y)(y\in A \land (\forall x)(x\in B \rightarrow x\leq y))$, then $y$ is called an **upper bound** of $B$;
- If $(\exist y)(y\in A \land (\forall z)(z\in A \land (\forall x)(x\in B \rightarrow z\leq x) \rightarrow z\leq y))$, then $y$ is called the **greatest lower bound** (or **infimum**) of $B$, denoted $\inf B$;
- If $(\exist y)(y\in A \land (\forall z)(z\in A \land (\forall x)(x\in B \rightarrow x\leq z) \rightarrow y\leq z))$, then $y$ is called the **least upper bound** (or **supremum**) of $B$, denoted $\sup B$.

> The supremum and infimum may or may not be in $B$, but they must be in $A$. Upper (lower) bounds may not exist, and if they exist, they may not be unique. The supremum (infimum) may not exist, but if it exists, it is unique.

---

**Total order relation**: Let $R$ be a binary relation on a set $A$. $R$ is called a **total order relation** (or **linear order**) if and only if $R$ is a partial order and for any two elements $a$ and $b$ in $A$, either $a \leq b$ or $b \leq a$ holds.

**Chain**: Let $\langle A,\leq \rangle$ be a partially ordered set. A subset $B \subseteq A$ is called a **chain** in $A$ if for any two elements $a$ and $b$ in $B$, either $a \leq b$ or $b \leq a$ holds.

**Antichain**: Let $\langle A,\leq \rangle$ be a partially ordered set. A subset $B \subseteq A$ is called an **antichain** in $A$ if for any two distinct elements $a$ and $b$ in $B$, neither $a \leq b$ nor $b \leq a$ holds.

**Dilworth's theorem (Decomposition theorem for posets)**: Let $\langle A,\leq \rangle$ be a finite partially ordered set. Then $A$ can be partitioned into a number of antichains, and the minimum number of antichains needed equals the length of the longest chain in $A$.

---

**Well-order relation**: Let $R$ be a binary relation on a set $A$. $R$ is called a **well-order relation** if and only if $R$ is a total order and every non-empty subset of $A$ has a least element. A well-ordered set must be totally ordered. A finite totally ordered set must be well-ordered.

**Well-ordering theorem (Zermelo's theorem)**: Every set can be well-ordered. That is, for any set $A$, there exists a well-order relation $\leq$ such that $\langle A,\leq \rangle$ is a well-ordered structure.

**Interval**: In a totally ordered set $\langle A,\leq \rangle$, for $a,b \in A$ with $a \leq b$, the set $[a,b]=\{x | x \in A \land a \leq x \leq b\}$ is called a **closed interval**; $(a,b)=\{x | x \in A \land a < x < b\}$ is an **open interval**; $[a,b)=\{x | x \in A \land a \leq x < b\}$ is a **left-closed right-open interval**; $(a,b]=\{x | x \in A \land a < x \leq b\}$ is a **left-open right-closed interval**. Intervals including limits can also be defined.

### Functions

#### Functions and the Axiom of Choice

**Function**: For a relation $f$ from set $A$ to $B$, if for every $x\in \text{dom}(f)$, there exists a unique $y \in \text{ran}(f)$ such that $\langle x,y \rangle \in f$, and $\text{dom}(f)=A$, then the relation $f$ is called a **function** from set $A$ to set $B$, denoted $f:A \to B$. For $x \in \text{dom}(f)$, we write $f(x)=y$ or $f:x \mapsto y$.

> **Partial function**: If $\text{dom}(f) \subset A$, then $f$ is called a **partial function** from set $A$ to set $B$, denoted $f:A \rightharpoonup B$.

In the matrix representation of a function relation, each row has exactly one 1, others 0. In the relation graph of a function, each starting vertex has exactly one outgoing edge.

For sets $A$ and $B$, denote the set of all functions from $A$ to $B$ as $A_B$. For finite sets $A$ and $B$, if $|A|=m$ and $|B|=n$, then $|A_B|=n^m$.

> *The empty set and functions*. There is exactly one function from $\varnothing$ to any set $B$, namely the empty function $f=\varnothing$; there is no function from any non-empty set $A$ to $\varnothing$. That is: $\varnothing_B=\varnothing_\varnothing=\{\varnothing\}$, $A_{\varnothing}=\varnothing$ (when $A \neq \varnothing$).

**Image under a function**: Let $f:A \to B$ be a function, $C \subseteq A$. The **image** of $C$ under $f$, denoted $f(C)$, is defined as: $f[C]=\{b | (\exists a)(a \in C \land f(a)=b)\}$.

**Inverse image (Preimage)**: Let $f:A \to B$ be a function, $D \subseteq B$. The **inverse image** (or **preimage**) of $D$ under $f$, denoted $f^{-1}(D)$, is defined as: $f^{-1}[D]=\{a | a \in A \land f(a) \in D\}$.

---

**Surjective function (Onto)**: Let $f:A \to B$ be a function. If $\text{ran}(f)=B$, then $f$ is called a **surjective function** from $A$ to $B$.

**Injective function (One-to-one)**: Let $f:A \to B$ be a function. If for any two distinct elements $a_1$ and $a_2$ in $A$, $f(a_1) \neq f(a_2)$, then $f$ is called an **injective function** from $A$ to $B$.

**Bijective function (One-to-one correspondence)**: Let $f:A \to B$ be a function. If $f$ is both injective and surjective, then $f$ is called a **bijective function** from $A$ to $B$.

Specifically, $\varnothing:\varnothing \to B$ is injective; $\varnothing:\varnothing \to \varnothing$ is bijective.

---

**Constant function**: Let $f:A \to B$ be a function. If there exists $b \in B$ such that for all $a \in A$, $f(a)=b$, then $f$ is called a **constant function**.

**Identity function**: Let $A$ be a set. The **identity function** $I_A$ on $A$ is defined as: for all $a \in A$, $I_A(a)=a$.

**Monotonic increasing/decreasing function**: Let $\langle A,\leq_A \rangle$ and $\langle B,\leq_B \rangle$ be two totally ordered sets, and $f:A \to B$ a function. If for any $a_1, a_2 \in A$, $a_1 \leq_A a_2 \Rightarrow f(a_1) \leq_B f(a_2)$, then $f$ is called **monotonic increasing**. If $a_1 \leq_A a_2 \Rightarrow f(a_1) \geq_B f(a_2)$, then $f$ is called **monotonic decreasing**.

---

**$n$-ary operation**: Let $A$ be a set, $n$ a positive integer. A function $f:A^n \to A$ is called an **$n$-ary operation** on $A$.

**Functional**: Let $A$, $B$, $C$ be sets. A function $f:A \to B_C$ is called a **functional** on $A$.

> A functional maps elements of $A$ to functions from $B$ to $C$.

**Characteristic function**: Let $A\subseteq E$. The function $\chi_A:E \to \{0,1\}$ defined by:
$$\chi_A(a)=\begin{cases}1,&a \in A;\\0,&a \notin A.\end{cases}$$
is called the **characteristic function** of set $A$.

> The characteristic function is another way to represent a set. In fuzzy set theory, membership functions with range $[0,1]$ are used.

---

**Canonical (Natural) projection**: Let $R$ be an equivalence relation on a set $A$. The function $\pi:A \to A/R$ defined by $\pi(a)=[a]_R$ for all $a \in A$ is called the **canonical projection** of the equivalence relation $R$.

**Axiom of Choice**: For any relation $R$, there exists a function $f$ such that $f\subseteq R$ and $\text{dom}(f)=\text{dom}(R)$.

#### Composition and Inverse of Functions

**Composition of functions**: Let $f:A \to B$, $g:B \to C$. The **composition** $g \circ f$ is a function from $A$ to $C$ defined by $(g \circ f)(a)=g(f(a))$ for all $a \in A$.

| Properties of $f$ and $g$ | Property of $g \circ f$ |
| --- | --- |
| Surjective & Surjective | Surjective |
| Injective & Injective | Injective |
| Bijective & Bijective | Bijective |

| Property of $g \circ f$ | Properties of $f$ and $g$ |
| --- | --- |
| Surjective | $g$ surjective |
| Injective | $f$ injective |
| Bijective | Both $f$ and $g$ bijective |

**Inverse of a function**: Let $f:A \to B$. If there exists a function $g:B \to A$ such that for all $a \in A$, $g(f(a))=a$ and for all $b \in B$, $f(g(b))=b$, then $g$ is called the **inverse function** of $f$, denoted $f^{-1}$.

A function has an inverse if and only if it is bijective.

**Left inverse and right inverse**: Let $f:A \to B$ be a function.
- If there exists a function $g:B \to A$ such that $(\forall x\in A)((g\circ f)(x)=x)$, then $g$ is called a **left inverse** of $f$.
- If there exists a function $h:B \to A$ such that $(\forall y\in B)((f\circ h)(y)=y)$, then $h$ is called a **right inverse** of $f$.

A function has a left inverse if and only if it is injective. It has a right inverse if and only if it is surjective. It has both a left and a right inverse if and only if it is bijective. In that case, the left and right inverses coincide, equaling $f^{-1}$.
