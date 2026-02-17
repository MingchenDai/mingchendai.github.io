---
title: CS3321 Database System Technology
date: 2026-02-13 19:19:10
tags:
  - Database
  - SQL
  - SJTU Courses
  - Notes
categories: Exploration
mathjax: true
---

This is the note of **CS3321 Database System Technology**(数据库技术), a course offered to Grade 3 Computer Science undergraduates at SJTU focusing on mathematical principle of relational normalizations and design theory of database instead usage of database. If you focus on practical usage of database systems such as writing SQL queries and building database applications, you may consider <del>[NIS3351 Database Principle and Security](./NIS3351-Database-Principle-and-Security)</del> (unavailable) instead. Sacastically, NIS3351 has nothing to do with database security.

Some pictures and content in this note are taken from slides, which can be checked at [course homepage](https://wiki.pdy.app:8443/s/d087fcd4-7c93-4f17-b631-68910a064353) or [homepage of Qiang Yin](https://basics.sjtu.edu.cn/~qyin/), the lecturer.

<!--more-->

## Introduction

### Database, DBMS and Database System

**Database** is an organized coolection of inter-related data that models some respects of the real-world.

**Database Management System (DBMS)** is a software that facilitates the creation and use of databases.

**Database system** is a combination of databases and DBMS.

### DBMS is Complex

*Example 1.1* How to find the public elements in two different lists? If one of them is too large to fit in memory? If both of them is so?

*Solution 1.1* Use multiple hash functions and separate the records into many so small groups that the memory can fit in.

**DBMS must make no assumption about its data.**

- Numerous corner cases exist.
- A list can contain duplicates.
- A single duplicate value may exceed the size of main memory.
- Multiple ways to process a query but none of them efficiently covers all cases.

## Relational Data Model

Key features for a relational data model: data integrity, implementation and durability.

A **data model** is a collection of concepts/tools for describing the data in a database.

- A database is a collection of relations and each
relation is an unordered set of tuples (or rows).
- Each relation has a set of attributes (or columns).
- Each attribute has a name and a domain and each
tuple has a value for each attribute of the relation.
- Values are atomic/scalar.

### Schema and Instance

A unordered tuple of attributes is a **relational schema** which specifies the logical structure of data.

Instance is a concrete table content matching a certain schema.

The relationship between the two concepts is like the relationship between class and instance in C++.

### Keys

Suppose $K$ is an attribute of a schema. Then $K$ is a **superkey** if values of $K$ is special enough to specify a certain tuple for each possible instance of the schema.

A superkey is a **candidate key** if $k$ is minimal, in the other words, does not contain any other keys.

A **primary key** is a designated candidate key of a relation.

A **foreign key** specifies that a tuple from one relation must map to a tuple in another relation.

Referenced attributed must be a primary key and no dangling pointers from the attributes of a foreign key are allowed.

### Relation Algebra

Relational Algebra is a language for querying relational data based on fundamental relational operations. Each operation takes one or more relations as its input and output a new relation.

Operations can be composed to make complex queries.

#### Selection

**Selection** operation selects tuples that satisfy a given **predicate**.

The operation can be denoted by $\sigma_P(R)$ where $R$ is the input relation and $p$ is the selection predicate (condition).

Boolean connectives and logical connectives is allowed in the predicate.

#### Projection

The **projection** produces from an input relation $R$ a new $R'$ that has only some of $R$'s attributes.

The operation can be denoted as $\Pi_{A_1,\dots,A_n}(R)$ where $R$ is the input relation and $A_1,\dots,A_n$ are attributes of $R$.

Some simple calculations can be done in projection, for instance, $\Pi_{A_1,\dots,A_n/12}(R)$.

In this operation, duplicated output tuples are removed since the input and output are both sets.

> Removing duplicate results is optional in detailed instance of relational algebra. Multi-set instead of set is used in specific curriculum.

#### Cartesian product

The **Cartesian Product** of two relations $R$ and $S$, denoted as $R\times S$, is the set of all possible combinations of ruples from $R$ and $S$.

We include the relation name as a prefix in the attribute name of a product relation to avoid ambiguity such as $A.S$. However, for simplicity, we drop the relation name prefix for attributes that appear only in $R$ or $S$.

#### Join

The **theta join**  (join) opertaion combines a selection operation and a Casterian-production operation into a single operation.

Theta join can be denoted as $R\bowtie_\theta S=\sigma_\theta(R\times S)$ where $\theta$ is used to referred to as the *join condition*.

The **natural join** of $R$ and $S$, denoted as $R \bowtie S$, combines the tuples from $R$ and $S$ based on their common attributes.

The operation enforces equality between attributes that share the same time and retains one copy for each pair of identically named attributes.

If $R$ and $S$ has no common attributes, then $R\bowtie S=R\times S$. 

#### Union

The union of $R$ and $S$, denoted as $R\cup S$, consists of all the tuples that appear in $R$ or $S$. Duplicated tuples are removed by **set semantics**.

> The two relations must have identical schema.

#### Difference

The **difference** of $R$ and $S$, denoted as $R-S$, consists of all the tuples appear in $R$ but not in $S$.

#### Renaming

The **renaming operation** $\rho_{S(A_1,\dots,A_n)}(R)$ changes the name of relation $R$ to $S$.

> User should focus on describing relations instead of optimizing query logitics. Relational algebra is only descriptive language.

## SQL: Structured Query Language

**SQL**: **S**tructured **Q**uery **L**anguage, pronounced as "S-Q-L" or "sequel".

**DDL**: Data Definition Language

**DML**: Data Manipulation Language

- SQL is insensitive to case and white spaces;
- Everything from `--` to the end of the line is ignored.

### SQL DDL

#### Built-in Data Types

| **SQL Data Types**         | **Usage** |
|----------------------------|-----------|
| `char(n)`                  | Fixed length string with length $n$  |
| `varchar(n)`               | Variable length string with max length $n$ |
| `int`, `smallint`          | Integer and small integer |
| `numeric(p,d)`             | Fixed point integer similar to decimal |
| `real`, `double precision` | Floating point and double-precision floating point numbers |
| `float(n)`                 | Floating point numer with precision at least $n$ digits |

Machine dependent types are `int`, `smallint`, `real` and `double precision`.

> Sizes of these data types are dependent to the machines.

#### Integrity Constraints

`primary key (...)`: The attributes contained in the braces form the primary key for the relation.

`foreign key (...) references ...`: Values of the attributes contained in the braces must correspond to the primary key of reference table.

Referenced attributes must be a **primary key** and referencing attributes form a **foreign key**. No dangling pointers allowed.

SQL maintain the referential integrity in 3 ways:

- **Reject**: SQL's default option to handle updates. It rejects any update that violate the referential integrity.
- **Set as `NULL`**: set all child records to `NULL` if original record is deleted.
- **`CASCADE`**: propagated changes to all referring rows.

`not null`: For specified attributes, `NULL` value is not allowed.

> Primary keys are not nullable.

```sql
CREATE TABLE instructor(
    ID        varchar(5),
    name      varchar(20) not null,
    dept_name varchar(20),
    salary    numeric(8,2),
    primary key(ID),
    foreign key (dept_name) references department
);
```

#### `UNIQUE` Constraint

`UNIQUE (...)` statement declares that the attributes included in the braces form a super key.

#### `CHECK`

A `CHECK (...)` clause specifies a predicate condition that must be satisfied by **every tuple** in a relation.

#### Basic Database Modification

**Insertion**: insert a tuple into a table.

```sql
INSERT INTO instructor(ID, name) VALUES('10222','Root');
```

**Deletion**: purge tuples satisfying a given condition from certain table.

```sql
DELETE FROM instructor WHERE name='Turing';
```

> **DBMS will prevent any update to the database that would violate an integrity constraint.**

### Basic SQL Queries

A basic SQL query can be expressed by a `SELECT-FROM-WHERE` statement.

```sql
SELECT ID, name FROM instructor WHERE dept_name = 'SCS';
```

`WHERE` clause is optional and logical connectives such as `AND`, `OR` and `NOT` is allowed in the clause.

`SELECT` clause can contain expressions.

```sql
SELECT ID, name, salary/12 FROM instructor;
```

A relation name can be used as prefix to distinguish attributes with the same name.

```sql
SELECT student.name, instructor.name FROM student, advisor, instructor WHERE student.ID=advisor.S_IS AND advisor.i_ID =instructor.ID
```

> SQL uses bag semantics by default where duplicates are allowed in query results. Keyword `DISTINCT` should be used to eliminate duplicates explicitly.

#### `NULL`

`NULL` is a special value for unknown or inapplicable values.

`NULL` is usually omitted in operations. For example, if a table has 4 lines but with a `NULL` value, the result of `COUNT(A)` is 3 and `COUNT(*)` is 4.

Evaluating aggregation functions except `COUNT` on an empty bag is `NULL`.

#### Special Rules

All arithmetic operations with `NULL` result in `NULL`, and comparsions with `NULL` result in `UNKNOWN`.

Aggreation functions ignore `NULL` except `COUNT(*)` which just counts rows.

Evaluating aggregation functions except `COUNT` on an empty bag returns `NULL`.

However, `NULL` cannot be used explicitly used an operand. For instance, `NULL+3` is invalid.

> In SQL we use a special three-value logic. `TRUE` is 1, `FALSE` is 0 and `UNKNOWN` is 0.5.
>
> `x AND Y` clause returns the mininum value of x and y and `x OR y` returns the maximum. `NOT x` returns $1-x$.

#### Pitfalls of `NULL`

`NULL` will break many equivalences.

```sql
SELECT * FROM instructor;
SELECT * FROM instructor WHERE salary>5000 OR salary<5000;
-- The two clauses are not equivalent.
```

### Joins

Join expression is typically used in `FROM` clauses.

#### Theta Join and Natural Join

```sql
R JOIN S join_condition -- Theta Join
R NATURAL JOIN S        -- Natural Join
```

For example:

```sql
-- student(ID, name, dept_name, tot_cred)
-- takes(ID, course_id, sec_id, semester, year, grade)

SELECT * FROM student JOIN takes ON studen.ID = takes.ID;
SELECT * FROM student, takes WHERE student.ID = takes.ID;
SELECT * FROM student JOIN takes USING(ID); -- Grammar treat
```

You can join more than 2 relations using natural join.

```sql
SELECT A_1,...A_n FROM R_1 NATURAL JOIN R_2 NATURAL JOIN ... R_k WHERE P;
```

#### `USING`

Attributs with the same name sometimes get equated expectedly in natural join.

One solution of this problem is to use `WHERE` and product to avoid joining on unrelated attribute, and the other solution is using `USING` keyword to specify which attribute(s) should be joined.

```sql
SELECT name,title FROM (student NATURAL JOIN takes) JOIN course USING (course_id);
```

#### Outer Join Motivation

A left outer join between $R$ and $S$, denoted as $R⟕S$ includes both rows in $R\Join S$ and dangling $R$ rows padded with `NULL`s.

The definition of right outer join ,denoted as ⟖, and full join, denoted as ⟗, can refer to the definition above.

```sql
SELECT * FROM course NATURAL RIGHT OUTER JOIN prereq;
SELECT * FROM course RIGHT OUTER JOIN prereq ON course.course_id = prereq.course_id;
SELECT * FROM course RIGHT OUTER JOIN prereq USING course_id;
```

> The difference between `ON` and `WHERE` condition should be noticed. When using `ON`, some records may be paddling.
>
> `ON` is not a redundant keyword in SQL.

### Subqueries

#### Nested Subqueries

A subquery is a `SELECT-FROM-WHERE` expression nested in another query.

Subquery can be nested in `FROM`, `EXISTS`, `IN`, `WHERE` and `WITH` query clause.

```sql
SELECT DISTINCT course_id
FROM section
WHERE semester = 'Fall' AND year = 2017 AND
 course_id NOT IN (SELECT course_od
 FROM section
 WHERE semester = 'Spring' AND year = 2018)
;
```

Expression `EXISTS(subquery)` represents whether the result of subquery is non-empty.

> An attribute refers to the most closely nested relation with that attribute.

`ALL` means for all record in subquery result and `SOME` means some.

A scalar subquery can be used as a value in `WHERE`, `SELECT` and `HAVING` clauses. Runtime error if subquery returns more than one row. A `NULL` will be used if subquery returns no rows.

### Common Table Expression

```sql
WITH R1(A_1,A_2,...) AS (subquery_1),
R2(B_1,B_2,...) AS (subquery_2),
...
SELECT ... FROM ... WHERE ...;
```

Defines temporary relations can be used other relations refined in the same `WITH` clause and the actual query.

The temporary relation is only valid in the single statement.

### CTE with Recursion

`CTE` is a keyword for recursion.

```sql
WITH RECURSIVE ReachableVertices(src, dst) AS (SELECT 
)
```

***RECURSIVE CTE STATEMENT SHOULD BE FILLED.***

#### Update

```sql
UPDATE instructor SET salary = salary*1.03 WHERE salary > 100000;
UPDATE instructor SET salary = salary*1.05 WHERE salary <= 100000;
```

Or with `CASE` clause:

```sql
UPDATE instructor SET salary = CASE
    WHEN salary <= 100000 THEN salary * 1.05
    ELSE salary*1.03
END;
```

## Relational Database Design Theory

### Functional Dependency Theory

A **functional dependency (FD)** is of the form $X\to Y$ that requires the attributes of $X$ functionally determine the attributes of $Y$. 

---

**Candidate Keys**
A set of attributes $K$ is a candidate key for a relation schema $R$ if:
1. $K\to R$ (i.e., $K$ functionally determines all attributes in $R$);
2. No proper subset of $K$ functionally determines all attributes in $R$ (i.e., $K$ is minimal).

---

A set $F$ logically implies a functional dependency $X\to Y$, denoted as $F\models X\to Y$, if every relation that satisfies all functional dependencies in $F$ also satisfies $X\to Y$.

---

**Closure of attributes**
The closure of a set of attributes $X$, denoted as $X^+$, is the set of attributes that can be functionally determined by $X$ using a set of functional dependencies $F$. 

The subscript $F$ is often omitted when it is clear from the context.

Closure of attributes can be computed by repeatedly applying the functional dependencies in $F$ until no new attributes can be added to $X^+$.

> Time complexity is normally $O(n^2)$ where $n$ is the number of functional dependencies, but can be optimized to $O(n)$ with proper data structures.

---

**Closure of functional dependencies**
The closure of $F$, denoted as $F^+$, is the set of all functional dependencies that can be inferred from $F$.

$F^+$ can be computed by repeatedly applying Armstrong's axioms until no new functional dependencies can be added to $F^+$.

**Armstrong's Axioms**

1. **Reflexivity**: If $Y \subseteq X$, then $X \to Y$.
2. **Augmentation**: If $X \to Y$, then $XZ \to YZ$ for any attribute set $Z$.
3. **Transitivity**: If $X \to Y$ and $Y \to Z$, then $X \to Z$.

Armstrong's axioms are sound and complete.

---

**Extraneous Attributes**
An attribute is considered extraneous in a functional dependency $X \to Y$ if it can be removed from $X$ without changing $F^+$. 

- $A\in X$ is extraneous in $X\to Y$ if $Y\subseteq \{X\backslash \{A\}\}_F^+$.
- $B\in Y$ is extraneous in $X\to Y$ if $B\in X_F^+$ where $F=\{F\backslash \{X\to Y\}\cup\{X\to Y\backslash \{B\}\}\}$.

**Canonical Cover**
A canonical cover for a set of functional dependencies $F$ is a minimal set of functional dependencies $C$ such that $C^+ = F^+$. In other words, $C$ is a subset of $F$ that preserves the closure of $F$ but has no extraneous attributes or dependencies.

In a canonical cover, there are no FDs that contain extraneous attributes, and each LHS of a FD is unique.

To compute a canonical cover, we can use the following steps:

1. **Remove Extraneous Attributes**: For each functional dependency in $F$, remove any extraneous attributes from the left-hand side and right-hand side.
2. **Remove Redundant Dependencies**: For each functional dependency in $F$, check if it can be derived from the other dependencies. If it can, remove it from the set.
3. **Resulting Set**: The resulting set of functional dependencies is the canonical cover.

Canonical cover is not unique, but the number of functional dependencies in any canonical cover for a given set of functional dependencies is the same.

**Algorithm to compute canonical cover**

```plaintextInput: A set of functional dependencies F
Output: A canonical cover C for F
C := F
// Step 1: Remove extraneous attributes
for each functional dependency X -> Y in C do
    for each attribute A in X do
        if Y ⊆ (X - {A})^+ then
            X := X - {A}
    for each attribute B in Y do
        if B ∈ X^+ where F = (C - {X -> Y}) ∪ {X -> (Y - {B})} then
            Y := Y - {B}
// Step 2: Remove redundant dependencies
for each functional dependency X -> Y in C do
    if Y ⊆ X^+ where F = C - {X -> Y}   then
        C := C - {X -> Y}
return C
```

### Normalization Theory

#### Decomposition Criteria

**Lossless Decomposition**

Original relation schema should be able to be reconstructed by joining the decomposed relation schemas.

Suppose $R$ can be decomposed into $R_1$ and $R_2$. If either $R_1\cap R_2\to R_1$ or $R_1\cap R_2\to R_2$ holds, then the decomposition is lossless.

> *Proof.* Let $I$ be an instance of schema $R$ and we try to prove that $I= \Pi_{R_1}(I)\bowtie \Pi_{R_2}(I)$. The following content will prove that $\Pi_{R_1}(I)\bowtie \Pi_{R_2}(I)\subseteq I$ since the opposite direction is trivial.
> 
> Suppose a record in $\Pi_{R_1}(I)\bowtie \Pi_{R_2}(I)$ is $t$ and there must exist $t_1$ and $t_2$ in $I$ such that $\Pi_{R_1}(t_1)=\Pi_{R_1}(t)$ and $\Pi_{R_2}(t_2)=\Pi_{R_2}(t)$. Since $R_1\cap R_2\to R_1$, we have $\Pi_{R_1}(t_1)=\Pi_{R_1}(t_2)$ and thus $t_1$ and $t_2$ are identical on $R_1\cap R_2$. Therefore, $t$ must be in $I$. *Q.E.D.*

---

**Redundancy and Anomalies Avoidance**

Unnecessary redundancy and anomalies should be avoided in a decomposition.

---

**Dependency preservation**

Minimize the cost to check the integrity constraints defined in terms of functional dependencies.

Let $F$ be a set of FD's on a schema $R$ and let $R_1,\cdots,R_n$ be a decomposition of $R$. The **restriction of** $F$ to $R_i$ is the set of all functional dependencies in $F$ that involve only attributes from $R_i$.

A decomposition is **dependency preserving** if $F^+=F_1^+ \cup \cdots \cup F_n^+$, where $F_i$ is the restriction of $F$ to $R_i$.

BCNF decomposition is not always dependency preserving. If you focus more on dependency preservation rather tha n redundancy, you can refer to **Third Normal Form**.

#### Boyce-Codd Normal Form (BCNF)

A relation schema $R$ is in **Boyce-Codd Normal Form (BCNF)** if for every non-trivial functional dependency $X\to Y$ that holds in $R$, $X$ is a superkey of $R$.

A database schema is in BCNF if every relation schema in the database schema is in BCNF.

**BCNF Decomposition Algorithm**

```plaintext
Input:  A schema R and a set F of FD's
Output: A BCNF decomposition of R
D<-{R};
while there is a relation schema S in D that is not in BCNF do
    choose a non-trivial X->Y in F^+ with XY\supset S such that X is not a superkey for S;
    replace S in D by two relation schemas: S1=XY and S2=S-(Y-X);
return D;
```

### Third Normal Form (3NF)

A relation schema $R$ is in **Third Normal Form (3NF)** if any FD in $F^+$ at least holds one of the following conditions:

- $X\to A$ is trivial;
- $X$ is a superkey of $R$;
- $A$ is part of a candidate key for $R$.

**Third Normal Form (3NF) Decomposition Algorithm**

```plaintext
Input:  A schema R and a set F of FD's
Output: A 3NF decomposition of R that preserves F
C<-a canonical cover for F;
computes F^+;
for each X->Y\in F+ do
    add relation schema XY to D;
if none of the relation schemas in D contains a candidate key for R then
    add a relation schema that is a candidate key for R to D;
remove redundant relation schemas from D;
return D;
```

Let $F$ be a set of FD's holds on a schema $R$ and let $R_1,\cdots,R_n$ be a decomposition of $R$. Furthermore, assume that for every FD $X\to A$ in $F$, there is some $R_i$ that contains both $X$ and $A$ and at least one schema in the decomposition contains a candidate key of $R$. Then the decomposition is dependency preserving and lossless.

For other normal forms such as 1NF, 2NF and 4NF, refer to notes of <del>[NIS3351: Database Principle and Security](.)</del>(unavailable).

## Storage

Why DBMS manage the buffer pool instead of letting OS do it?

**Volatile Storage**: loses contents when power if switched off, such as DRAM and CPU caches. It can be randomly accessed and bytes are individually addressable.

**Non-volatile Storage**: retains contents when power is switched off, such as magnetic disks and flash memory. It can be sequentially accessed but only in blocks.

Disk-oriented DBMSs are all about reducing disk I/O.

- Sequential I/O is more cheaper than random I/O.
- Cache blocks from non-volatile storage to volatile storage.

![Storage Hierarchy](Storage-Hierarchy.png)

### Storage Structures

In DBMS, data is stored in files which consists of a collection of pages. Each page holds a collection of tuples.

- **Heap file**: Tuples are placed arbiitrarily in pages.
- **Sorted file**: Tuples are sorted on some attribute(s).
- **Index file**: A data structure that improves the speed of data retrieval operations on a database table, such as B+ tree and hash index.

#### Format of Page

A **database page** is a fixed-size block of data that is given a unique page number as identifier. Each page has a header that contains number of slots/tuples, free space, data checksum and transaction visibility.

A **heap file** is an unordered collection of pages where tuples are placed in arbitrary order. It requires meta-data to track existing pages and find free space.

![Heap File Via Linked List](Heap-Via-Linked-List.png)

- *Linked List*: A header page at start stores the HEAD of the data page list and free page list.
- *Page Directory*: A special directory page is used to track data pages. Each directory entry records the number of free slots in its corresponding data page.

![Heap File Via Page Directory](Heap-Via-Page-Directory.png)

#### Page Structure: How are tuples organized within a database?

![Slotted Page Structure](Slot-Page-Structure.png)

**Slotted page** structure is used in most DBMSs. In a slotted page, each tuple is stored in a fixed-size slot, and the page contains a header that keeps track of the free and occupied slots. This structure allows for efficient insertion and deletion of tuples, as the DBMS can easily find free slots and reuse them.

The header tracks number of slots, number of used slots, free space and an array of slot offsets.

When deleteing a tuple, the corresponding slot is marked as free but the space is not reclaimed until a compaction operation is performed.

#### Record Formats

In fixed-length format, each attribute has a fixed size and the size of each tuple is the sum of the sizes of its attributes. This format allows for efficient access to individual attributes, as their offsets can be easily calculated.

System catalog is a table that stores metadata about other tables. In fixed-length format, the system catalog stores the size of each attribute for each table. `NULL` values are handled by using a bit map at the beginning of the tuple.

In variable-length format, we move all variable-length attributes to the end of the tuple and use an array of offsets to locate them.

### Buffer Pool Management

A **buffer pool** is a memory region organized as an array of fixed-size pages. Each array entry is called a **frame** which can hold one page.

> **MMAP** is another way to manage buffer pool. It maps disk pages directly to memory addresses. However, it is less flexible and controllable than traditional buffer pool management.

#### Buffer Pool Metadata

The page table tracks which pages are currently in the buffer pool and maps page numbers to frame numbers.

Each frame has a **pin or reference counter** used for eviction decisions and a **dirty bit** which indicates whether the page has been modified.

#### Page Replacement Policies

When a new page is requested and the buffer pool is full, a page replacement policy is used to decide which page to evict. The final goal is to minimize cache misses.

- **LRU (Least Recently Used)**: Evict the page that has not been used for the longest time.
- **CLOCK**: A more efficient approximation of LRU that uses a circular list and a reference bit.

Page replacement policy are usually specialized according to different access patterns.

### Storage Layout

For a logical layout, there are several physical layouts such as **row-oriented**, **column-oriented** and **hybrid** layouts. Each layout has its own advantages and disadvantages depending on the access patterns of the workload.

![Storage Layouts](Storage-Layout.png)

#### Different Workload Patterns

- **OLTP (Online Transaction Processing)**: Workloads that involve a large number of short online transactions such as insert, update and delete. These workloads typically require low latency and high concurrency. As a result, **row-oriented** layout is often preferred for OLTP workloads.
- **OLAP (Online Analytical Processing)**: Workloads that involve complex queries for data analysis. These workloads typically require high throughput and can tolerate higher latency. As a result, **column-oriented** layout is often preferred for OLAP workloads.
- **HTAP (Hybrid Transactional/Analytical Processing)**: Workloads that combine both OLTP and OLAP characteristics. These workloads require a balance between low latency for transactions and high throughput for analytical queries.

> **ETL**, standing for Extract, Transform, Load, is a process to transform data from OLTP systems to OLAP systems for analysis.

### Cache Behavior Analysis

If size of cache line is less than size of tuple, then each tuple access may cause multiple cache misses. This can significantly impact performance, especially for workloads with large tuples or high access rates.

#### PAX: Partition Attributes Across

PAX, starting from 2002, can maximize inter-tuple spatial locality and minimize intra-tuple spatial locality.

![PAX Storage Layout](PAX.png)

Group values of the same attributes are stored in the same minipage within a page. Fixed-length attribute value are stored in F-minipages while variable-length attribute values are stored in V-minipages.

When accessing a tuple, only the relevant minipages need to be loaded into cache, reducing cache misses and improving performance.

Also, PAX supports SIMD for faster analytical queries.

#### Columnar Storage

Column-oriented storage stores each attribute in a separate column file. It is optimized for OLAP for better cache performance and fewer I/O when accessing a subset of attributes while also enabling high compression ratios and reducing storage space.

![Data Organization of Apache Parquet](Parquet-Structure.png) 

As a page is a collection of column values, each page can be compressed/encoded independently. Dictionary encoding and run-length encoding, RLE, are commonly used compression techniques.

![RLE Dictionary Encoding](REL-Directory.png)

## Indexing

Sequential scan and index scan are two common methods for accessing data in a database.

### Index Basics

#### Index Data Structure

An index consists of a search key and a pointer to the actual data record.

An index file consists of records, called index entries, is usually much smaller than the actual data file.

This lecture focus on **ordered indexes**.

**Dense Index**: A dense index contains an index entry for every search key value in the data file. This allows for faster searches but requires more storage space.

It is possible that one index entry points to multiple records in the data file if there are duplicate search key values.

**Sparse Index**: A sparse index contains an index entry for only some of the search key values in the data file. This reduces storage space but can result in slower searches.

Sparse index is only applicable for sorted data files.

**Clustering Index**: A clustering index is an index that determines the physical order of data records in a table.

**Non-Clustered Index**: A non-clustered index is an index that does not affect the physical order of data records in a table. Instead, it creates a separate data structure that points to the actual data records.

A non-clustered index is also known as a secondary index which is always dense.

#### Index in SQL

```sql
CREATE INDEX index_name ON table_name (attribute1, attribute2,...);
DROP TABLE index_name;
```

A B$^+$-tree index is created for primary keys by default and a unique index is created for `UNIQUE` keys.

### Concurrency Control in B$^+$-Tree

> For concept of B$^+$-Tree, refer to [CS0501 Data Structure](../CS0501-Data-Structure).

Add a lock to the root node of tree every I/O seems too time-consuming. To improve the performance of concurrent operations on B$^+$-trees, latch is used to protect nodes during modifications. The **latch crabbing protocol** keeps the tree safe and concurrent.

#### Latch

**Latch** is a *lightweight*, *short-term* lock for in-memory structures which protects pages or nodes in buffer and index managers, and ensures physical (not transactional) consistency. It is implemented using spinlocks or mutexes.

A latch only allows multiple shared holders or a single exclusive holder.

---

**Latch Crabbing Protocol** enables concurrent access and modification to B$^+$-trees by acquiring and releasing latches in a specific order during tree traversal and modification.

- Latch parent node
- Latch child node
- If child is safe, release parent latch

> A node is considered **safe** if an update will not trigger a split or merge. In insertion it means that the node has enough free space, and in deletion it means that the node stays above the minimum occupancy after deletion.

Instead of locking the entire tree during an operation, latch crabbing allows threads to acquire and release latches on individual nodes as they traverse the tree. This allows multiple threads to work on different parts of the tree simultaneously, improving concurrency and performance.

## Query Processing

![Query Processing Overview](Query-Processing.png)

---

**Parsing and Translation**

DBMS checks the syntax and semantics of the SQL statement and builds a parse tree representing its structure. The parse tree is analyzed and then translated into a logical plan, a tree of relational algebra operators that captures the query's semantics.

---

**Query Optimization**

Then, DBMS transforms the initial logical plan into an optimized physical plan consisting of two main phases:
- **Logical Optimization**: Rewrites the logical plan into an equivalent but more efficient logical plan using RA rules.
- **Physical Optimization**: Translates the optimized logical plan into a physical plan that specifies the actual algorithms and data structures to be used for query execution.

---

**Query Execution**

DBMS executes optimized physical plan to produce the final query result.

Common query execution models:
- **Materialization Model**: Each operator fully computes and stores its result in temporary tables before passing it to the next operator.
- **Iterator (Volcano) Model**: Operators are implemented as iterators that produce one tuple at a time, allowing for pipelined execution and reduced memory usage. Each operator implements three methods: `open()`, `next()`, and `close()`(optional).

Materialization model is good for OLTP workloads since it touches a few records at a time, but not good for OLAP.

### Algorithms for Relational Operations

**Notations**

- *Number of pages*: $P(R)$
- *Table*: $R$
- *Number of available buffer pool pages*: $B$
- *Cost metric*: number of disk I/Os

---

**Sorting**

External sorting is required when data cannot fit in memory.

A divide-and-conquer algorithm called **external merge sort** is commonly used for external sorting. Recall that we have $B$ buffer pages available.

Read $B$ pages of data, sort them in memory using an efficient in-memory sorting algorithm (e.g., quicksort or heapsort), and write the sorted pages back to disk as sorted runs. This process is repeated until all data has been processed, resulting in $\displaystyle\left\lceil \frac{P(R)}{B} \right\rceil$ sorted runs.

In the merge phase, we repeatedly merge $B-1$ sorted runs at a time using $B-1$ buffer pages for input and 1 buffer page for output. This process continues until only one sorted run remains.

**Cost Analysis**: The total cost of external merge sort can be expressed as:

$$\text{Cost} = 2P(R) \left( \left\lceil \log_{B-1} \left\lceil \frac{P(R)}{B} \right\rceil \right\rceil +\frac{1}{2} \right)$$

By same idea, we can implement **Sort-based Duplication Elimination**. Cost is the same as external merge sort.

As in SQL, union, intersection and difference requires duplication elimination by default, they can be implemented using sort-based algorithms with cost similar to external merge sort.

Cost of **Sort-based Aggregation** is same as external merge sort.

---

**Join**

Cost of **Naive Nested Loop Join** is $P(R)+|R|\times P(S)$ compared with **Blocked Nested Loop Join** whose cost is $P(R)+\left\lceil \frac{P(R)}{B-2} \right\rceil \times P(S)$.

Cost of **Index Nested Loop Join** is $P(R)+|R|\times C$ where $C$ is the cost of accessing the index, usually 2~4 disk I/Os. If $R$ and $S$ support index lookup, better pick the smaller one as outer relation.

**Sort-Merge Join** requires both relations to be sorted on join attributes. If not, we need to sort them first. For most cases, the cost is $P(R)+P(S)+\text{Sorting}$. But in worst case, it can be as high as $P(R)+2\times P(S)+\text{Sorting}$.

**Hash Join** is applicable for equality joins and natural joins. (*Build Phase*) Select a table and build a corresponding hash table in memory on the join attribute(s). (*Probe Phase*) For each tuple in the other table, use the hash table to find matching tuples. 

Cost of this kind of join is $P(R)+P(S)$ if both relations fit in memory. Buffer pool requirement is $B\geq P(R) +2$.

If neither relation fits in memory, we can use **Grace Hash Join**. Both relations are partitioned into $B-1$ partitions using a hash function $g$ on the join attribute(s). Each partition of one relation is then joined with the corresponding partition of the other relation using an in-memory hash join. Cost of Grace Hash Join is $3(P(R)+P(S))$.

>**Hash-based Algorithms**: Duplication elimination, union, intersection, difference, group by aggregation.

## Query Optimization

SQL is **declarative**. Users specify what tuples they want and query optimizer searches and picks the best query plan. Cost difference between query plans for a query can be huge. This section takes System R's optimizer as an example.

### Rule-based Query Rewriting (RBQ)

**Push down selection**: $\sigma_{\theta_1\land \theta_2}(R\Join_\theta S)=\sigma_{\theta_1}(R)\Join_\theta \sigma_{\theta_2}(S)$. By this rule, we can reduce the size of intermediate results in most conditions.

**Push down projection**: $\Pi(\sigma_\theta(R))=\Pi_L(\sigma_\theta(\Pi_{L\cup L'}(R)))$ where $L'$ is the set of attributes appear in $\theta$. By this rule, we can reduce the size of intermediate results by removing unnecessary attributes early.

$\Pi_L(R\Join_\theta S)=\Pi_L(\Pi_{L'}(R)\Join_\theta S)$ where $L'$ consists of the set of attributes from $R$ that either in $L$ or appear in $\theta$, vice versa for $S$.

In visualization aspect, the optimization is actually push down selection and projection operators down the query plan tree and clear unnecessary attributes early.

### Cost-based Query Optimization (CBQ)

RBQ omits consideration on cost. CBQ estimates the cost of different query plans and picks the cheapest one.

#### Cost Estimation

Cost of a query plan is estimated by summing up the cost of each operator in the plan and each operator's cost can be considered as linear function of the size of its input.

DBMS stores statistics information about relations in system catalog to help estimate the size of intermediate results. Catalogs are updated periodically.

**Selection With Equality Predicates** assumes uniform distribution of values. For $\sigma_{A=a}(R)$, if $A$ is a key, then size is 1; otherwise, size is $\displaystyle\frac{P(R)}{V(R,A)}$ where $V(R,A)$ is the number of distinct values of attribute $A$ in relation $R$. 

For **conjunctive predicates** such as $\displaystyle \sigma_{A=v \land B=u}(R)$, the selectivity factor is estimated as $\displaystyle \frac{1}{V(A,R)V(B,R)}$ with assumption of independence, no over-selection and both $A$ and $B$ are not keys.

For **negative predicates** such as $\sigma_{A \neq v}(R)$, the selectivity is $\displaystyle1-\frac{1}{V(A,R)}$.

For **disjunctive predicates** such as $\sigma_{A=v \lor B=u}(R)$, the selectivity is estimated as $\displaystyle \frac{1}{V(A,R)}+\frac{1}{V(B,R)}-\frac{1}{V(A,R)V(B,R)}$ by applying includsion-exclusion principle.

In **Range predicates** such as $\sigma_{A<v}(R)$, the selectivity is estimated as $\displaystyle \frac{v-\text{min}(A,R)}{\text{max}(A,R)-\text{min}(A,R)}$ assuming uniform distribution. If $v<\text{min}(A,R)$, then size is 0. Conditions such as $\sigma_{A\geq v}(R)$ can be estimated symmetrically.

In **join size estimation** with instance such as $R(A,B) \Join S(B,C)$, take $\displaystyle \frac{|R|\times |S|}{\max(V(R,B),V(S,B))}$ as the size of join result.

> This estimation is a very rough one and may be very inaccurate in practice, and skewness is one of the major reasons. The assumption of independence may also not hold in many cases.

Historgrams in catalog can improve selectivity estimation by dividing values into different buckets with roughly equal number of tuples.

#### Cost-based Plan Search

We will enumerate all possible physical plans and pick the cheapest one. The practical goal in this process is not to find the optimal plan but to avoid bad ones. Take searching for optimal join orders as an example.

For $n$ relations, there are $\displaystyle \frac{(2(n-1))!}{(n-1)!}$ different join orders. Exhaustive search is impractical for large $n$.

System R reduces search space by only considering left-deep trees which enables generation of fully pipelined plans because logical plans are based on volcano model.

**A dynamic programming algorithm** is used to find the optimal left-deep join tree in a bottom-up manner. Firstly, we should find the optimal access path for each single relation. Then, we can build optimal plans for joining two relations based on the optimal single-relation plans. This process continues until we build the optimal plan for joining all $n$ relations.

Thereby, the cost can be expressed as $\text{Opt\\\_cost}=\min_{R\in S}\{\text{Opt\\\_cost}(S-R)+\text{Join\\\_cost}(S-R,R)\}$.

However, this algorithm is not effective for interesting orders problem, which can be solved by increasing the state space to keep track of interesting orders.

## Worst-Case Optimal Join Algorithms

This chapter will expand from triangle query.

![Binary Join Plan](WCOJ-Binary-Join-Plans.png)

We assume in this query that $R$, $S$ and $T$ are all of size $N$. In the worst case, any binary join plan takes time $\Omega(N^2)$.

### Delay the Computation (DC)

The key idea of DC is to delay the computation of intermediate results as much as possible and process tuples only when can contribute to the final output.

```plaintext
for each a in π_A(R) do
    for each b in π_B(σ_{A=a}(R) ⋈ S) do
        for each c in π_C(σ_{B=b}(S) ⋈ T) do
            if (a,c) in π_{A,C}(σ_{C=c}(T)) then
                output (a,b,c)
```

The time complexity of DC is $O(N^{3/2})$ for any instance.

### AGM Bound and WCOJ Algorithms

Consider a framework of general join queries $Q=R_1\Join R_2\Join ... \Join R_m$ over a set of relations $\mathcal{R}=\{R_1,R_2,...,R_m\}$ and a set of attributes $\mathcal{A}=\{A_1,A_2,...,A_n\}$. Each relation $R_i$ is defined over a subset of attributes $\text{attr}(R_i)\subseteq \mathcal{A}$.

The hypergraph $\mathcal{H}(Q)=(\mathcal{V},\mathcal{E})$ associated with $Q$ is defined as follows:
- The set of vertices $\mathcal{V}=\mathcal{A}$.
- The set of hyperedges $\mathcal{E}=\{\text{attr}(R_1),\text{attr}(R_2),...,\text{attr}(R_m)\}$.

A fractional edge cover of a hypergraph $\mathcal{H}=(\mathcal{V},\mathcal{E})$ is a set of non-negative weights $\{x_e|e\in \mathcal{E}\}$ such that for every vertex $v\in \mathcal{V}$, the sum of weights of edges incident to $v$ is at least 1, i.e., $\sum_{e:v\in e} x_e \geq 1$.

The minimum fractional edge cover of $\mathcal{H}$ is $\displaystyle \rho^*=\min\{\sum_{F\in \mathcal{E}} x_F| \text{for all } v\in \mathcal{V}, \sum_{e:v\in e} x_e \geq 1\}$.

The AGM bound states that the size of the join result $|Q|$ is bounded by $\prod_{R\in \mathcal{R}} |R|^{x_R}$, where $\{x_R|R\in \mathcal{R}\}$ is a minimum fractional edge cover of the hypergraph $\mathcal{H}(Q)$. Specially, for all input relations of size $N$, the size of the join result is $O(N^{\rho^*})$ where $\rho^*$ is the minimum fractional edge cover number of $\mathcal{H}(Q)$. **It can be proved that AGM bound is tight.**

**Generic Join Algorithm** 

```plaintext
function Generic-Join(Attrs, Relations, Partial-Tuple)
    if Attrs is empty then
        output Partial-Tuple
        return
    A := choose an attribute from Attrs
    for each value a in ⋂_{R∈Relations, A∈attr(R)} π_A(σ_{Partial-Tuple}(R)) do
        New-Relations := {}
        for each R in Relations do
            if A in attr(R) then
                New-Relations := New-Relations ∪ {σ_{A=a}(R)}
            else
                New-Relations := New-Relations ∪ {R}
        Generic-Join(Attrs - {A}, New-Relations, Partial-Tuple ∪ {(A,a)})
```

