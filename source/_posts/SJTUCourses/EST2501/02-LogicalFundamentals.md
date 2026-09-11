---
title: "EST2501 Digital Fundamentals (2): Logical Fundamentals"
date: 2026-05-23 22:10:13
tags:
- Electronics
- Notes
- SJTU Courses
categories: Exploration
mathjax: true
tikzjax: true
---

This chapter covers basic concepts of logic gates and the art of logic circuit design and simplication. In my own opinion, this part should be learned together with Discrete Mathematics.

<!--more-->

> Collections of **EST2501 Digital Electronics** notes:
>
> 1. [*Digital Fundamentals*](../01-DigitalFundamentals);
> 2. [*Logical Fundamentals*](../02-LogicalFundamentals) (this article);
> 3. [*Combinational Logic Circuit*](../03-CombinationalLogicCircuit);
> 4. [*Sequential Logic Circuit*](../04-SequentialLogicCircuit).
>
> You can find a general introduction to this course in the first article of this series.

## Gate

**Gate** is a simple electronic circuit that realized a logical operation.

### Basic Logic Gates

| Name |  Logical Expression | 
|------|---------------------|
| Inverter (NOT) gate | $\overline{X}$ |
| AND gate | $X \cdot Y$ |
| OR gate | $X + Y$ |
| NAND gate | $\overline{X \cdot Y}$ |
| NOR gate | $\overline{X + Y}$ |
| Exclusive-OR (XOR) gate | $X \oplus Y$ |
| XNOR gate | $\overline{X \oplus Y}$ |

The negation indicator is a “bubble” ($\circ$) that indicates inversion or complementation when it appears on the input or output of any logic element.

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\def\twotable#1#2#3#4{\begin{scope}[shift={(0,#1)}]\draw (0.4,-1.0)--(0.4,-2.3) (-0.1,-1.3)--(0.9,-1.3);\node at (0.1,-1.1){X}; \node at (0.7,-1.1){Z};\node at (0.1,-1.5){0}; \node at (0.7,-1.5){#2};\node at (0.1,-1.9){1}; \node at (0.7,-1.9){#3};\node at (0.4,-2.8){#4};\end{scope}}
\def\threetable#1#2#3#4#5#6{\begin{scope}[shift={(0,#1)}]\draw (0.4,-1.0)--(0.4,-3.1) (0.8,-1.0)--(0.8,-3.1) (-0.1,-1.3)--(1.3,-1.3);\node at (0.15,-1.1){X}; \node at (0.6,-1.1){Y}; \node at (1.05,-1.1){Z};\node at (0.15,-1.5){0}; \node at (0.6,-1.5){0}; \node at (1.05,-1.5){#2};\node at (0.15,-1.9){0}; \node at (0.6,-1.9){1}; \node at (1.05,-1.9){#3};\node at (0.15,-2.3){1}; \node at (0.6,-2.3){0}; \node at (1.05,-2.3){#4};\node at (0.15,-2.7){1}; \node at (0.6,-2.7){1}; \node at (1.05,-2.7){#5};\node at (0.6,-3.6){#6};\end{scope}}
\begin{scope}[shift={(0,0)}]
\draw (-0.5,0)node[left]{X}--(0,0); \draw (0,0.3)--(0,-0.3)--(0.8,0)--cycle; \draw (0.8,0)--(1.3,0)node[right]{Z};
\twotable{0}{0}{1}{a. Buffer}
\end{scope}
\begin{scope}[shift={(3.5,0)}]
\draw (-0.5,0)node[left]{X}--(0,0); \draw (0,0.3)--(0,-0.3)--(0.8,0)--cycle; \draw (0.9,0)circle(0.1); \draw (1.0,0)--(1.5,0)node[right]{Z};
\twotable{0}{1}{0}{b. Inverter}
\end{scope}
\begin{scope}[shift={(7,0)}]
\draw (-0.5,0.15)node[left]{X}--(0,0.15); \draw (-0.5,-0.15)node[left]{Y}--(0,-0.15); \draw (0,0.4)--(0.6,0.4)arc(90:-90:0.4)--(0,-0.4)--cycle; \draw (1.0,0)--(1.5,0)node[right]{Z};
\threetable{0}{0}{0}{0}{1}{c. AND Gate}
\end{scope}
\begin{scope}[shift={(10.5,0)}]
\draw (-0.5,0.15)node[left]{X}--(0.12,0.15); \draw (-0.5,-0.15)node[left]{Y}--(0.12,-0.15); \draw (0,0.4)..controls(0.4,0.4)and(0.8,0.1)..(1.1,0)..controls(0.8,-0.1)and(0.4,-0.4)..(0,-0.4)..controls(0.15,-0.2)and(0.15,0.2)..(0,0.4); \draw (1.1,0)--(1.6,0)node[right]{Z};
\threetable{0}{0}{1}{1}{1}{d. OR Gate}
\end{scope}
\begin{scope}[shift={(0,-5.5)}]
\draw (-0.5,0.15)node[left]{X}--(0,0.15); \draw (-0.5,-0.15)node[left]{Y}--(0,-0.15); \draw (0,0.4)--(0.6,0.4)arc(90:-90:0.4)--(0,-0.4)--cycle; \draw (1.1,0)circle(0.1); \draw (1.2,0)--(1.7,0)node[right]{Z};
\node at (0.6,-0.7){or};
\begin{scope}[shift={(0,-1.4)}]
\draw (-0.5,0.15)node[left]{X}--(-0.1,0.15); \draw (-0.5,-0.15)node[left]{Y}--(-0.1,-0.15); \draw (0,0.15)circle(0.1); \draw (0,-0.15)circle(0.1); \draw (0.1,0.4)..controls(0.5,0.4)and(0.9,0.1)..(1.2,0)..controls(0.9,-0.1)and(0.5,-0.4)..(0.1,-0.4)..controls(0.25,-0.2)and(0.25,0.2)..(0.1,0.4); \draw (1.2,0)--(1.7,0)node[right]{Z};
\end{scope}
\threetable{-1.8}{1}{1}{1}{0}{e. NAND Gate}
\end{scope}
\begin{scope}[shift={(3.5,-5.5)}]
\draw (-0.5,0.15)node[left]{X}--(0.12,0.15); \draw (-0.5,-0.15)node[left]{Y}--(0.12,-0.15); \draw (0,0.4)..controls(0.4,0.4)and(0.8,0.1)..(1.1,0)..controls(0.8,-0.1)and(0.4,-0.4)..(0,-0.4)..controls(0.15,-0.2)and(0.15,0.2)..(0,0.4); \draw (1.2,0)circle(0.1); \draw (1.3,0)--(1.8,0)node[right]{Z};
\node at (0.6,-0.7){or};
\begin{scope}[shift={(0,-1.4)}]
\draw (-0.5,0.15)node[left]{X}--(-0.1,0.15); \draw (-0.5,-0.15)node[left]{Y}--(-0.1,-0.15); \draw (0,0.15)circle(0.1); \draw (0,-0.15)circle(0.1); \draw (0.1,0.4)--(0.7,0.4)arc(90:-90:0.4)--(0.1,-0.4)--cycle; \draw (1.1,0)--(1.6,0)node[right]{Z};
\end{scope}
\threetable{-1.8}{1}{0}{0}{0}{f. NOR Gate}
\end{scope}
\begin{scope}[shift={(7,-5.5)}]
\begin{scope}[shift={(0,-0.7)}]
\draw (-0.2,0.4)..controls(-0.05,0.2)and(-0.05,-0.2)..(-0.2,-0.4); \draw (0,0.4)..controls(0.4,0.4)and(0.8,0.1)..(1.1,0)..controls(0.8,-0.1)and(0.4,-0.4)..(0,-0.4)..controls(0.15,-0.2)and(0.15,0.2)..(0,0.4); \draw (-0.5,0.15)node[left]{X}--(-0.1,0.15); \draw (-0.5,-0.15)node[left]{Y}--(-0.1,-0.15); \draw (1.1,0)--(1.6,0)node[right]{Z};
\end{scope}
\threetable{-1.8}{0}{1}{1}{0}{g. Exclusive OR Gate}
\end{scope}
\begin{scope}[shift={(10.5,-5.5)}]
\begin{scope}[shift={(0,-0.7)}]
\draw (-0.2,0.4)..controls(-0.05,0.2)and(-0.05,-0.2)..(-0.2,-0.4); \draw (0,0.4)..controls(0.4,0.4)and(0.8,0.1)..(1.1,0)..controls(0.8,-0.1)and(0.4,-0.4)..(0,-0.4)..controls(0.15,-0.2)and(0.15,0.2)..(0,0.4); \draw (-0.5,0.15)node[left]{X}--(-0.1,0.15); \draw (-0.5,-0.15)node[left]{Y}--(-0.1,-0.15); \draw (1.2,0)circle(0.1); \draw (1.3,0)--(1.8,0)node[right]{Z};
\end{scope}
\threetable{-1.8}{1}{0}{0}{1}{e. Equivalence Gate}
\end{scope}
\end{tikzpicture}
\end{document}
```

**Negative-OR** is a logic gate that performs the OR operation followed by a NOT operation. It can be represented by the logical expression $\overline{X}+\overline{Y}$, which is equivalent to the NAND gate.

**Negative-AND** is a logic gate that performs the AND operation followed by a NOT operation. It can be represented by the logical expression $\bar{X}\cdot\bar{Y}$, which is equivalent to the NOR gate.

Truth table is trivial and can be easily derived from the logical expression, so it is not listed here.

### Gate Implementations

This section presents a very simple structural model of gates based on an idealized device called a logic switch.

A **logic switch** is a three-terminal device that is used to control the connection of two points in a circuit. The three terminals are called the **control terminal**, the **input terminal**, and the **output terminal**.

A logic switch can be in one of two states: **open** or **closed**. The open state means that the input terminal is not connected to the output terminal, while the closed state means that the switch conducts between its data terminals.

By the status when the control terminal is not activated, or normal state, the logic switch can be divided into two types: **normally open** (NO, or active-high) and **normally closed** (NC, or active-low) logic switches.

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\begin{scope}
\draw[rounded corners=6pt] (-0.6,-0.7) rectangle (0.6,0.7);
\draw (0,0.3) circle(0.08) (0,-0.3) circle(0.08);
\draw[line width=2pt] (0,-0.3) -- (0.35,0.25);
\draw (0,0.38) -- (0,1.0) node[above, align=center]{Data\\Terminal} (0,-0.38) -- (0,-1.0) node[below, align=center]{Data\\Terminal};
\draw[-latex] (-1.6,0) node[left, align=center]{Control\\Terminal C} -- (-0.6,0);
\node at (0,-2) {Normally Open Switch};
\end{scope}
\begin{scope}[shift={(6,0)}]
\draw[rounded corners=6pt] (-0.6,-0.7) rectangle (0.6,0.7);
\draw (0,0.3) circle(0.08) (0,-0.3) circle(0.08);
\draw[line width=2pt] (0,-0.3) -- (-0.12,0.3);
\draw (0,0.38) -- (0,1.0) node[above, align=center]{Data\\Terminal} (0,-0.38) -- (0,-1.0) node[below, align=center]{Data\\Terminal};
\draw[-latex] (-1.6,0) node[left, align=center]{Control\\Terminal C} -- (-0.6,0);
\node at (0,-2) {Normally Closed Switch};
\end{scope}
\end{tikzpicture}
\end{document}
```
**Ideal logic switch** is a logic switch that has zero resistance when it is closed and infinite resistance when it is open. However, in practice, there is always some resistance when the switch is closed and some leakage current when the switch is open. Also, time required to change states is greater than zero.

**Passive pullup** and **active pullup** are techniques used to ensure that the input terminal of a logic switch is held at a known voltage level when the control terminal is not activated.

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\begin{scope}
\node[above] at (0,2.3) {\Large \textbf{+}};
\draw (0,2.3) -- (0,2.0) -- (0.15,1.85) -- (-0.15,1.55) -- (0.15,1.25) -- (-0.15,0.95) -- (0,0.8) -- (0,0);
\draw (-0.8,0) rectangle (0.8,-1.5);
\node at (0,-0.75) {\Large T};
\fill (0,0.5) circle(0.06);
\draw[-latex] (0,0.5) -- (1.2,0.5) node[right] {Z};
\draw[-latex] (-1.4,-0.2) node[left] {x$_0$} -- (-0.8,-0.2);
\draw[-latex] (-1.4,-0.6) node[left] {x$_1$} -- (-0.8,-0.6);
\node[left] at (-1.35,-0.9) {$\vdots$};
\draw[-latex] (-1.4,-1.2) node[left] {x$_n$} -- (-0.8,-1.2);
\draw (0,-1.5) -- (0,-2.0);
\draw (-0.4,-2.0) -- (0.4,-2.0) (-0.25,-2.1) -- (0.25,-2.1) (-0.1,-2.2) -- (0.1,-2.2);
\fill (0,-2.3) circle(0.02);
\node[below] at (0,-2.4) {Passive Pullup};
\end{scope}
\begin{scope}[shift={(5.5,0)}]
\node[above] at (0,2.3) {\Large \textbf{+}};
\draw (0,2.3) -- (0,1.8);
\draw (-0.6,1.8) rectangle (0.6,0.8);
\node[align=center] at (0,1.3) {Active\\Load};
\draw (0,0.8) -- (0,0);
\draw (-0.8,0) rectangle (0.8,-1.5);
\node at (0,-0.75) {\Large T};
\fill (0,0.5) circle(0.06);
\draw[-latex] (0,0.5) -- (1.2,0.5) node[right] {Z};
\draw[-latex] (-1.4,-0.2) node[left] {x$_0$} -- (-0.8,-0.2);
\draw[-latex] (-1.4,-0.6) node[left] {x$_1$} -- (-0.8,-0.6);
\node[left] at (-1.35,-0.9) {$\vdots$};
\draw[-latex] (-1.4,-1.2) node[left] {x$_n$} -- (-0.8,-1.2);
\draw (0,-1.5) -- (0,-2.0);
\draw (-0.4,-2.0) -- (0.4,-2.0) (-0.25,-2.1) -- (0.25,-2.1) (-0.1,-2.2) -- (0.1,-2.2);
\fill (0,-2.3) circle(0.02);
\node[below] at (0,-2.4) {Active Pullup};
\end{scope}
\end{tikzpicture}
\end{document}
```

### Integrated Circuit Technology

#### Supply Voltage and Power Dissipation

For **TTL** (Transistor-Transistor Logic) technology, the supply voltage is typically 5V, and the power dissipation is around 10mW per gate. For **CMOS** (Complementary Metal-Oxide-Semiconductor) technology, the supply voltage can range from 3.3V to 5V, and the power dissipation is much lower than TTL, typically in the range of microwatts to milliwatts per gate.

Below are the input and output logic levels for TTL. The input logic level is the voltage level that is recognized as a HIGH or LOW signal by the gate, while the output logic level is the voltage level that the gate produces when it outputs a HIGH or LOW signal.

```tikz
\begin{document}
\begin{tikzpicture}
\node[align=center, font=\bfseries\large] at (3.5, 7.0) {TTL Logic Levels (5V)};
\fill[red!30] (2,3.5) rectangle (5,4.5); \draw[dashed, blue, thick] (2,4.5)--(5,4.5) (2,3.5)--(5,3.5);
\fill[green!30] (2,1.5) rectangle (5,2.5); \draw[dashed, blue, thick] (2,2.5)--(5,2.5) (2,1.5)--(5,1.5);
\fill[cyan!15] (0,0) rectangle (2,2.5) (0,3.5) rectangle (2,6) (5,0) rectangle (7,1.5) (5,4.5) rectangle (7,6);
\fill[gray!20] (0,2.5) rectangle (2,3.5) (5,1.5) rectangle (7,4.5);
\draw[thick] (0,0) rectangle (2,6) (0,2.5)--(2,2.5) (0,3.5)--(2,3.5) (5,0) rectangle (7,6) (5,1.5)--(7,1.5) (5,4.5)--(7,4.5);
\node[magenta] at (1,6.3) {Input}; \node[magenta] at (6,6.3) {Output};
\node[align=center] at (1,4.75) {Logic 1\\(HIGH)}; \node[align=center] at (1,3.0) {Unallowed}; \node[align=center] at (1,1.25) {Logic 0\\(LOW)};
\node[align=center] at (6,5.25) {Logic 1\\(HIGH)}; \node[align=center] at (6,3.0) {Unallowed}; \node[align=center] at (6,0.75) {Logic 0\\(LOW)};
\node[left, magenta] at (0,6) {5.0 V}; \node[left, magenta] at (0,3.5) {2.0 V}; \node[left, magenta] at (0,2.5) {0.8 V}; \node[left, magenta] at (0,0) {0 V};
\node[right, magenta] at (7,6) {5.0 V}; \node[right, magenta] at (7,4.5) {2.4 V}; \node[right, magenta] at (7,1.5) {0.4 V}; \node[right, magenta] at (7,0) {0 V};
\node[right, magenta] at (2,3.5) {$V_{\mathrm{IH(min)}}$}; \node[right, magenta] at (2,2.5) {$V_{\mathrm{IL(max)}}$};
\node[left, magenta] at (5,4.5) {$V_{\mathrm{OH(min)}}$}; \node[left, magenta] at (5,1.5) {$V_{\mathrm{OL(max)}}$};
\end{tikzpicture}
\end{document}
```

Below are the input and output logic levels for different voltage levels in CMOS technology.

```tikz
\begin{document}
\begin{tikzpicture}
\node[align=center, font=\bfseries\large] at (3.5, 7.0) {CMOS Logic Levels (5V)};
\fill[red!30] (2,3.5) rectangle (5,4.5); \draw[dashed, blue, thick] (2,4.5)--(5,4.5) (2,3.5)--(5,3.5);
\fill[green!30] (2,1.5) rectangle (5,2.5); \draw[dashed, blue, thick] (2,2.5)--(5,2.5) (2,1.5)--(5,1.5);
\fill[cyan!15] (0,0) rectangle (2,2.5) (0,3.5) rectangle (2,6) (5,0) rectangle (7,1.5) (5,4.5) rectangle (7,6);
\fill[gray!20] (0,2.5) rectangle (2,3.5) (5,1.5) rectangle (7,4.5);
\draw[thick] (0,0) rectangle (2,6) (0,2.5)--(2,2.5) (0,3.5)--(2,3.5) (5,0) rectangle (7,6) (5,1.5)--(7,1.5) (5,4.5)--(7,4.5);
\node[magenta] at (1,6.3) {Input}; \node[magenta] at (6,6.3) {Output};
\node[align=center] at (1,4.75) {Logic 1\\(HIGH)}; \node[align=center] at (1,3.0) {Unallowed}; \node[align=center] at (1,1.25) {Logic 0\\(LOW)};
\node[align=center] at (6,5.25) {Logic 1\\(HIGH)}; \node[align=center] at (6,3.0) {Unallowed}; \node[align=center] at (6,0.75) {Logic 0\\(LOW)};
\node[left, magenta] at (0,6) {5.0 V}; \node[left, magenta] at (0,3.5) {3.5 V}; \node[left, magenta] at (0,2.5) {1.5 V}; \node[left, magenta] at (0,0) {0 V};
\node[right, magenta] at (7,6) {5.0 V}; \node[right, magenta] at (7,4.5) {4.9 V}; \node[right, magenta] at (7,1.5) {0.1 V}; \node[right, magenta] at (7,0) {0 V};
\node[right, magenta] at (2,3.5) {$V_{\mathrm{IH(min)}}$}; \node[right, magenta] at (2,2.5) {$V_{\mathrm{IL(max)}}$};
\node[left, magenta] at (5,4.5) {$V_{\mathrm{OH(min)}}$}; \node[left, magenta] at (5,1.5) {$V_{\mathrm{OL(max)}}$};
\end{tikzpicture}
\end{document}
```

```tikz
\begin{document}
\begin{tikzpicture}
\node[align=center, font=\bfseries\large] at (3.5, 7.0) {CMOS Logic Levels (3.3V)};
\fill[red!30] (2,3.5) rectangle (5,4.5); \draw[dashed, blue, thick] (2,4.5)--(5,4.5) (2,3.5)--(5,3.5);
\fill[green!30] (2,1.5) rectangle (5,2.5); \draw[dashed, blue, thick] (2,2.5)--(5,2.5) (2,1.5)--(5,1.5);
\fill[cyan!15] (0,0) rectangle (2,2.5) (0,3.5) rectangle (2,6) (5,0) rectangle (7,1.5) (5,4.5) rectangle (7,6);
\fill[gray!20] (0,2.5) rectangle (2,3.5) (5,1.5) rectangle (7,4.5);
\draw[thick] (0,0) rectangle (2,6) (0,2.5)--(2,2.5) (0,3.5)--(2,3.5) (5,0) rectangle (7,6) (5,1.5)--(7,1.5) (5,4.5)--(7,4.5);
\node[magenta] at (1,6.3) {Input}; \node[magenta] at (6,6.3) {Output};
\node[align=center] at (1,4.75) {Logic 1\\(HIGH)}; \node[align=center] at (1,3.0) {Unallowed}; \node[align=center] at (1,1.25) {Logic 0\\(LOW)};
\node[align=center] at (6,5.25) {Logic 1\\(HIGH)}; \node[align=center] at (6,3.0) {Unallowed}; \node[align=center] at (6,0.75) {Logic 0\\(LOW)};
\node[left, magenta] at (0,6) {3.3 V}; \node[left, magenta] at (0,3.5) {2.0 V}; \node[left, magenta] at (0,2.5) {0.8 V}; \node[left, magenta] at (0,0) {0 V};
\node[right, magenta] at (7,6) {3.3 V}; \node[right, magenta] at (7,4.5) {2.4 V}; \node[right, magenta] at (7,1.5) {0.4 V}; \node[right, magenta] at (7,0) {0 V};
\node[right, magenta] at (2,3.5) {$V_{\mathrm{IH(min)}}$}; \node[right, magenta] at (2,2.5) {$V_{\mathrm{IL(max)}}$};
\node[left, magenta] at (5,4.5) {$V_{\mathrm{OH(min)}}$}; \node[left, magenta] at (5,1.5) {$V_{\mathrm{OL(max)}}$};
\end{tikzpicture}
\end{document}
```

**Noise margin** is the difference between the input logic level and the output logic level of a gate. It is a measure of how much noise can be tolerated by the gate without causing an error in the output.

#### CMOS Technology

**Complementary Metal-Oxide-Semiconductor** (CMOS) technology is based on the use of both p-type and n-type MOSFETs (**Metal-Oxide-Semiconductor Field-Effect Transistors**) to implement logic gates.

```tikz
\begin{document}
\begin{tikzpicture}
\draw[thick] (0,0) -- (0.8,0);
\draw[thick] (0.8,-0.7) -- (0.8,0.7);
\draw[thick] (1.1,0.7) -- (1.1,0.3) (1.1,0.2) -- (1.1,-0.2) (1.1,-0.3) -- (1.1,-0.7);
\draw[thick] (1.1,0.5) -- (1.8,0.5) -- (1.8,1.5);
\draw[-latex, thick] (1.8,0) -- (1.1,0);
\draw[thick] (1.8,-0.5) -- (1.8,0);
\draw[thick] (1.1,-0.5) -- (1.8,-0.5) -- (1.8,-1.5);
\fill (1.8,-0.5) circle(0.08);
\node[magenta, left, align=center] at (0,0) {Gate\\(G)};
\node[magenta, above] at (1.8,1.5) {Drain (D)};
\node[magenta, below] at (1.8,-1.5) {Source (S)};
\node[below] at (1.8,-2.2) {$n$-channel};
\begin{scope}[shift={(5,0)}]
\draw[thick] (0,0) -- (0.8,0);
\draw[thick] (0.8,-0.7) -- (0.8,0.7);
\draw[thick] (1.1,0.7) -- (1.1,0.3) (1.1,0.2) -- (1.1,-0.2) (1.1,-0.3) -- (1.1,-0.7);
\draw[thick] (1.1,0.5) -- (1.8,0.5) -- (1.8,1.5);
\draw[-latex, thick] (1.1,0) -- (1.8,0);
\draw[thick] (1.8,-0.5) -- (1.8,0);
\draw[thick] (1.1,-0.5) -- (1.8,-0.5) -- (1.8,-1.5);
\fill (1.8,-0.5) circle(0.08);
\node[magenta, left] at (0,0) {Gate};
\node[magenta, above] at (1.8,1.5) {Drain};
\node[magenta, below] at (1.8,-1.5) {Source};
\node[below] at (1.8,-2.2) {$p$-channel};
\end{scope}
\end{tikzpicture}
\end{document}
```

Take $n$-channel MOSFET as an example. When the control terminal is at a HIGH voltage level, the n-channel conducts between the input and output terminals, i.e., $V_{DS}=0$ when $V_{GS}>V_{TH}$ where $V_{TH}$ is the threshold voltage.

Similarly, for $p$-channel MOSFET, it conducts when the control terminal is at a LOW voltage level, i.e., $V_{DS}=0$ when $|V_{SG}|>|V_{TH}|$.

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\begin{scope}
\draw (0,0) -- (0.8,0); \node[left, magenta] at (0,0) {+5 V}; \node[below] at (0.4,-0.2) {G};
\draw (0.8,-0.7) -- (0.8,0.7);
\draw (1.1,0.7) -- (1.1,0.3) (1.1,0.2) -- (1.1,-0.2) (1.1,-0.3) -- (1.1,-0.7);
\draw (1.1,0.5) -- (1.8,0.5) -- (1.8,1.62) (1.1,-0.5) -- (1.8,-0.5) -- (1.8,-1.2);
\draw[-latex] (1.8,0) -- (1.1,0); \draw (1.8,0) -- (1.8,-0.5);
\fill (1.8,-0.5) circle(0.08);
\draw (1.8,1.7) circle(0.08); \node[above] at (1.8,1.8) {+5 V};
\node[right] at (1.8,1) {D}; \node[right] at (1.8,-0.9) {S};
\draw (1.5,-1.2) -- (2.1,-1.2) (1.6,-1.3) -- (2.0,-1.3) (1.7,-1.4) -- (1.9,-1.4);
\node[magenta] at (3.0,0) {ON \Large $\equiv$};
\draw (4.5,1.7) circle(0.08); \node[above] at (4.5,1.8) {+5 V};
\draw (4.5,1.62) -- (4.5,0.58); \draw (4.5,0.5) circle(0.08);
\draw (4.5,0.42) -- (4.4,-0.42);
\draw (4.5,-0.5) circle(0.08); \draw (4.5,-0.58) -- (4.5,-1.2);
\draw (4.2,-1.2) -- (4.8,-1.2) (4.3,-1.3) -- (4.7,-1.3) (4.4,-1.4) -- (4.6,-1.4);
\node at (3.15,-2) {ON};
\end{scope}
\begin{scope}[shift={(7.5,0)}]
\draw (0,0) -- (0.8,0); \node[left, magenta] at (0,0) {0 V}; \node[below] at (0.4,-0.2) {G};
\draw (0.8,-0.7) -- (0.8,0.7);
\draw (1.1,0.7) -- (1.1,0.3) (1.1,0.2) -- (1.1,-0.2) (1.1,-0.3) -- (1.1,-0.7);
\draw (1.1,0.5) -- (1.8,0.5) -- (1.8,1.62) (1.1,-0.5) -- (1.8,-0.5) -- (1.8,-1.2);
\draw[-latex] (1.8,0) -- (1.1,0); \draw (1.8,0) -- (1.8,-0.5);
\fill (1.8,-0.5) circle(0.08);
\draw (1.8,1.7) circle(0.08); \node[above] at (1.8,1.8) {+5 V};
\node[right] at (1.8,1) {D}; \node[right] at (1.8,-0.9) {S};
\draw (1.5,-1.2) -- (2.1,-1.2) (1.6,-1.3) -- (2.0,-1.3) (1.7,-1.4) -- (1.9,-1.4);
\node[magenta] at (3.0,0) {OFF \Large $\equiv$};
\draw (4.5,1.7) circle(0.08); \node[above] at (4.5,1.8) {+5 V};
\draw (4.5,1.62) -- (4.5,0.58); \draw (4.5,0.5) circle(0.08);
\draw (4.5,-0.42) -- (4.9,0.4);
\draw (4.5,-0.5) circle(0.08); \draw (4.5,-0.58) -- (4.5,-1.2);
\draw (4.2,-1.2) -- (4.8,-1.2) (4.3,-1.3) -- (4.7,-1.3) (4.4,-1.4) -- (4.6,-1.4);
\node at (3.15,-2) {OFF};
\end{scope}
\end{tikzpicture}
\end{document}
```

#### TTL Technology

Transistor-Transistor Logic (TTL) technology is based on the use of bipolar junction transistors (BJTs) to implement logic gates. If $V_{BE}$ is greater than the threshold voltage (usually around 0.7V), the transistor is in the active region and conducts between the collector and emitter terminals, i.e., $V_{CE}=0$ when $V_{BE}>V_{TH}$.

```tikz
\begin{document}
\begin{tikzpicture}
\begin{scope}[shift={(0,0)}]
\node[left, red] at (-0.8,0) {$+V$};
\draw[thick] (0,0.3) -- (0,-0.3);
\draw[thick] (0,0) -- (-0.8,0);
\draw[thick] (0,0.15) -- (0.5,0.5) -- (0.5,1.0);
\draw[thick] (0,-0.15) -- (0.5,-0.5) -- (0.5,-1.0);
\draw[-latex, thick] (0,-0.15) -- (0.35,-0.395);
\draw[thick] (0.5,1.0) -- (0.5,1.2) -- (0.2,1.3) -- (0.8,1.5) -- (0.2,1.7) -- (0.8,1.9) -- (0.2,2.1) -- (0.8,2.3) -- (0.5,2.4) -- (0.5,2.6);
\draw (0.5, 2.7) circle(0.08);
\node[above] at (0.5, 2.8) {$+V_{\mathrm{CC}}$};
\draw[thick] (0.1,-1.0) -- (0.9,-1.0);
\draw[thick] (0.25,-1.15) -- (0.75,-1.15);
\draw[thick] (0.4,-1.3) -- (0.6,-1.3);
\draw[-latex, red, thick] (-0.8,-0.2) -- (-0.2,-0.2) node[midway, below] {$I_{\mathrm{B}}$};
\draw[-latex, red, thick] (1.0, 2.2) -- (1.0, 1.2) node[midway, right] {$I_{\mathrm{C}}$};
\node[red] at (0.9, 0) {ON};
\end{scope}
\begin{scope}[shift={(3.5,0)}]
\node[red] at (-1.2, 0) {\huge $\equiv$};
\draw[thick] (0.5,1.0) -- (0.5,1.2) -- (0.2,1.3) -- (0.8,1.5) -- (0.2,1.7) -- (0.8,1.9) -- (0.2,2.1) -- (0.8,2.3) -- (0.5,2.4) -- (0.5,2.6);
\draw (0.5, 2.7) circle(0.08);
\node[above] at (0.5, 2.8) {$+V_{\mathrm{CC}}$};
\draw[thick] (0.1,-1.0) -- (0.9,-1.0);
\draw[thick] (0.25,-1.15) -- (0.75,-1.15);
\draw[thick] (0.4,-1.3) -- (0.6,-1.3);
\draw (0.5, 1.0) -- (0.5, 0.4);
\draw (0.5, 0.3) circle(0.1);
\draw (0.5, -0.3) circle(0.1);
\draw (0.5, -0.4) -- (0.5, -1.0);
\draw[-latex, thick] (0.5, 0.2) -- (0.5, -0.2);
\draw[-latex, red, thick] (1.2, 2.4) -- (1.2, -0.5);
\end{scope}
\begin{scope}[shift={(8,0)}]
\node[left, red] at (-0.8,0) {$0\mathrm{\ V}$};
\draw[thick] (0,0.3) -- (0,-0.3);
\draw[thick] (0,0) -- (-0.8,0);
\draw[thick] (0,0.15) -- (0.5,0.5) -- (0.5,1.0);
\draw[thick] (0,-0.15) -- (0.5,-0.5) -- (0.5,-1.0);
\draw[-latex, thick] (0,-0.15) -- (0.35,-0.395);
\draw[thick] (0.5,1.0) -- (0.5,1.2) -- (0.2,1.3) -- (0.8,1.5) -- (0.2,1.7) -- (0.8,1.9) -- (0.2,2.1) -- (0.8,2.3) -- (0.5,2.4) -- (0.5,2.6);
\draw (0.5, 2.7) circle(0.08);
\node[above] at (0.5, 2.8) {$+V_{\mathrm{CC}}$};
\draw[thick] (0.1,-1.0) -- (0.9,-1.0);
\draw[thick] (0.25,-1.15) -- (0.75,-1.15);
\draw[thick] (0.4,-1.3) -- (0.6,-1.3);
\node[red] at (1.0, 0) {OFF};
\end{scope}
\begin{scope}[shift={(11.5,0)}]
\node[red] at (-1.2, 0) {\huge $\equiv$};
\draw[thick] (0.5,1.0) -- (0.5,1.2) -- (0.2,1.3) -- (0.8,1.5) -- (0.2,1.7) -- (0.8,1.9) -- (0.2,2.1) -- (0.8,2.3) -- (0.5,2.4) -- (0.5,2.6);
\draw (0.5, 2.7) circle(0.08);
\node[above] at (0.5, 2.8) {$+V_{\mathrm{CC}}$};
\draw[thick] (0.1,-1.0) -- (0.9,-1.0);
\draw[thick] (0.25,-1.15) -- (0.75,-1.15);
\draw[thick] (0.4,-1.3) -- (0.6,-1.3);
\draw (0.5, 1.0) -- (0.5, 0.4);
\draw (0.5, 0.3) circle(0.1);
\draw (0.5, -0.3) circle(0.1);
\draw (0.5, -0.4) -- (0.5, -1.0);
\draw[thick] (0.5, -0.2) -- (0.1, 0.3);
\end{scope}
\end{tikzpicture}
\end{document}
```

Although ideally an inverter should only have one transistor, in practice, it is implemented with multiple transistors to achieve better performance and noise margin.

#### TTL vs CMOS

**Power**. Even the most power-efficient Bipolar family listed (ALS at 1.4 mW, or 1400 µW) consumes over 500 times more quiescent power than the highest-consuming CMOS family listed (HC/AHC at 2.75 µW). CMOS is heavily favored for low-power or battery-operated designs.

**Speed**. Historically, Bipolar TTL was much faster than early CMOS, but the table shows advanced CMOS has closed the gap.

**Output drive**. BiCMOS effectively combines the high output current driving capabilities of Bipolar transistors with the lower power characteristics of CMOS, making it ideal for bus interfacing or driving heavy loads.

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\draw[dashed] (0,4) -- (7,4) node[right] {50\%};
\draw[dashed] (0,1) -- (7,1) node[right] {50\%};
\draw[cyan, very thick] (0,3) -- (1,3) -- (1.5,5) -- (4.5,5) -- (5,3) -- (7,3);
\draw[cyan, very thick] (0,2) -- (1.5,2) -- (2,0) -- (5,0) -- (5.5,2) -- (7,2);
\node[left, align=center] at (-0.2, 4) {Input};
\node[left, align=center] at (-0.2, 1) {Output};
\draw[dashed, magenta] (1.25,4) -- (1.25,2.5);
\draw[dashed, magenta] (1.75,2.5) -- (1.75,1);
\draw[latex-latex, magenta, thick] (1.25,2.5) -- (1.75,2.5) node[midway, above right] {$t_{PHL}$};
\draw[dashed, magenta] (4.75,4) -- (4.75,2.5);
\draw[dashed, magenta] (5.25,2.5) -- (5.25,1);
\draw[latex-latex, magenta, thick] (4.75,2.5) -- (5.25,2.5) node[midway, below left] {$t_{PLH}$};
\end{tikzpicture}
\end{document}
```

The **propagation delay time** is the time it takes for a change in the input of a gate to produce a change in the output. TTL gates typically have a propagation delay of around 10 nanoseconds, while CMOS gates can have a propagation delay as low as 1 nanosecond.

| | TTL | CMOS|
| --- | --- | --- |
| DC Supply Voltage (Vcc) | 5V | 5V,3.3V |
| Switching Speed | FAST | slow |
| Propagation Delay | FAST | slow |
| Power Dissipation | HIGH | low |
| Noise Immunity | low | HIGH |
| Integrated Complexity | HIGH | low |
| Unused pin | Open | Connect to +V |

## Boolean Algebra and Logic Simplification

**Sum term**. A sum term is the sum of literals, such as $A+B$, $A+\overline{B}$, etc. A sum term is false if all literals are false, and true otherwise.

**Product term**. A product term is the product of literals, such as $AB$, $A\overline{B}$, etc. A product term is true if all literals are true, and false otherwise.

### Operation Laws

**De Morgan's Theorems**

1. $\displaystyle \overline{\sum A_i} = \prod \overline{A_i}$
2. $\displaystyle \overline{\prod A_i} = \sum \overline{A_i}$

Here is another important theorem, which will be refered again in the simplicaton of product-of-sum expression: $A+\overline{A}B = A+B$.

### Standard Forms

- **Sum of Products (SOP)**. A Boolean expression is in SOP form if it is a sum of product terms. For example, $AB + \overline{A}C$ is in SOP form.
- **Product of Sums (POS)**. A Boolean expression is in POS form if it is a product of sum terms. For example, $(A+B)(\overline{A}+C)$ is in POS form.
- **Standard sum of products (SSP)**. A Boolean expression is in SSP form if it is a sum of product terms, and each product term contains all variables in either true or complemented form. For example, $AB\overline{C} + \overline{A}BC$ is in SSP form.
- **Standard product of sums (SPS)**. A Boolean expression is in SPS form if it is a product of sum terms, and each sum term contains all variables in either true or complemented form. For example, $(A+B+\overline{C})(\overline{A}+B+C)$ is in SPS form.

2 rules are often used in the conversioin: $A+\bar{A}=1$ and $A\bar{A}=0$.

Truth table is an important tool for converting between different forms of Boolean expressions. For SOP form, we can identify the minterms (product terms) that correspond to the rows of the truth table where the output is 1. For POS form, we can identify the maxterms (sum terms) that correspond to the rows of the truth table where the output is 0.

The **index** of a minterm or maxterm is the decimal equivalent of the binary representation of the input variables in the truth table. For example, for 3 variables $A$, $B$, and $C$, the minterm $A\overline{B}C$ corresponds to the binary input 101, which has an index of 5 ($101_2$). The maxterm $\overline{A}+B+\overline{C}$ corresponds to the binary input 010, which has an index of 2 ($010_2$).

### Karnaugh Map

A **Karnaugh Map** (K-map), invented by Maurice Karnaugh in 1953, is a graphical method for simplifying Boolean expressions. It rearranges the truth table into a two-dimensional grid where adjacent cells differ by exactly one variable (Gray code ordering), allowing visual identification of terms that can be combined and eliminated.

#### Structure of K-Map

Each cell in a K-map corresponds to a minterm. The rows and columns are labeled using Gray code so that moving between any two adjacent cells (horizontally or vertically) changes exactly one variable. The top/bottom edges and left/right edges are also considered adjacent (the map wraps around like a torus).

**2-Variable K-Map:**

| | $\overline{B}$ | $B$ |
|---|---|---|
| $\overline{A}$ | $\overline{A}\,\overline{B}\;(m_0)$ | $\overline{A}B\;(m_1)$ |
| $A$ | $A\overline{B}\;(m_2)$ | $AB\;(m_3)$ |

**4-Variable K-Map:**

```tikz
\begin{document}
\begin{tikzpicture}
% 4-variable K-map
\draw[thick] (0,0) grid (4,4);
\node at (0.5,4.5) {$\overline{C}\,\overline{D}$};
\node at (1.5,4.5) {$\overline{C}D$};
\node at (2.5,4.5) {$CD$};
\node at (3.5,4.5) {$C\overline{D}$};
\node at (-0.8,3.5) {$\overline{A}\,\overline{B}$};
\node at (-0.8,2.5) {$\overline{A}B$};
\node at (-0.8,1.5) {$AB$};
\node at (-0.8,0.5) {$A\overline{B}$};
\node at (0.5,3.5) {$m_0$}; \node at (1.5,3.5) {$m_1$}; \node at (2.5,3.5) {$m_3$}; \node at (3.5,3.5) {$m_2$};
\node at (0.5,2.5) {$m_4$}; \node at (1.5,2.5) {$m_5$}; \node at (2.5,2.5) {$m_7$}; \node at (3.5,2.5) {$m_6$};
\node at (0.5,1.5) {$m_{12}$}; \node at (1.5,1.5) {$m_{13}$}; \node at (2.5,1.5) {$m_{15}$}; \node at (3.5,1.5) {$m_{14}$};
\node at (0.5,0.5) {$m_8$}; \node at (1.5,0.5) {$m_9$}; \node at (2.5,0.5) {$m_{11}$}; \node at (3.5,0.5) {$m_{10}$};
\end{tikzpicture}
\end{document}
```

#### Minimization of SOP Using K-Map

The goal of SOP minimization is to find a minimal sum-of-products expression. The procedure:

1. **Plot the function**: Place 1s in all cells corresponding to minterms where the function evaluates to 1.
2. **Form prime implicants**: Group adjacent 1s into the largest possible rectangular groups of size $2^k$ ($k = 0,1,2,\ldots$). Each group must contain only 1s and must be a power of 2 in size (1, 2, 4, 8, ...). Groups may wrap around edges.
3. **Cover all 1s**: Select a minimum set of prime implicants that covers every 1 in the map (essential prime implicants must be included).
4. **Write the expression**: Each selected group corresponds to a product term — variables that remain constant (same value) across the group are kept; variables that change (both 0 and 1 appear) are eliminated.

**Rules for grouping**:
- Groups must be rectangular and contain $2^k$ cells.
- Groups must be as large as possible (to eliminate more variables).
- Overlapping groups are allowed and often necessary.
- A cell may be covered by multiple groups (by the idempotent law: $X + X = X$).
- Always include essential prime implicants (those covering a 1 not covered by any other prime implicant).

```tikz
\begin{document}
\begin{tikzpicture}
% 3-variable K-map for example
\draw[thick] (0,0) grid (2,4);
\node at (0.5,4.5) {$\overline{C}$};
\node at (1.5,4.5) {$C$};
\node at (-0.7,3.5) {$\overline{A}\,\overline{B}$};
\node at (-0.7,2.5) {$\overline{A}B$};
\node at (-0.7,1.5) {$AB$};
\node at (-0.7,0.5) {$A\overline{B}$};
\node at (0.5,3.5) {0}; \node at (1.5,3.5) {1};
\node at (0.5,2.5) {1}; \node at (1.5,2.5) {1};
\node at (0.5,1.5) {1}; \node at (1.5,1.5) {1};
\node at (0.5,0.5) {0}; \node at (1.5,0.5) {0};
\draw[blue, thick, rounded corners] (0.15,1.15) rectangle (1.85,2.85);
\node[blue] at (3.0,2.0) {$B$};
\draw[red, thick, rounded corners] (1.15,2.15) rectangle (1.85,3.85);
\node[red] at (3.0,3.5) {$\overline{A}C$};
\end{tikzpicture}
\end{document}
```

#### Minimization of POS Using K-Map

For POS minimization, the procedure is dual to SOP:

1. **Plot the function**: Place 0s in cells corresponding to maxterms where the function evaluates to 0.
2. **Group adjacent 0s** into the largest possible rectangular groups of size $2^k$, same rules as SOP.
3. **Write the expression**: Each group corresponds to a sum term. For each group, identify variables that are constant — if a variable is 0 across the group, it appears uncomplemented in the sum term; if it is 1, it appears complemented. Variables that change are eliminated.
4. The final POS expression is the product of all sum terms.

**Alternative method**: Minimize the complement function $\overline{F}$ in SOP form using 0s on the K-map, then take the complement using De Morgan's theorem to obtain $F$ in POS form.

**Relationship between SOP and POS on K-Map**: The SOP form covers the 1s; the POS form covers the 0s. The choice depends on which yields a simpler expression — if the function has fewer 0s than 1s, POS minimization on 0s is more efficient.

#### Minimization with Don't-Care Terms

A **don't-care term** is an input combination that either never occurs in practice or for which the output value does not matter. Don't-cares are denoted by $d$ or $X$ on the K-map.

The key insight: each don't-care can be treated as either 0 or 1, whichever helps form larger groups. Different don't-cares in the same map may be assigned different values.

**Procedure for SOP with don't-cares**:
1. Plot 1s for minterms where $F=1$, and $X$s for don't-care terms.
2. When grouping 1s, treat an $X$ as 1 only if it allows forming a larger group (one that would otherwise be impossible or smaller). Do not form groups consisting entirely of don't-cares.
3. Any $X$ not used in a group is treated as 0.

```tikz
\begin{document}
\begin{tikzpicture}
\draw[thick] (0,0) grid (4,4);
\node at (0.5,4.5) {$\overline{C}\,\overline{D}$};
\node at (1.5,4.5) {$\overline{C}D$};
\node at (2.5,4.5) {$CD$};
\node at (3.5,4.5) {$C\overline{D}$};
\node at (-0.8,3.5) {$\overline{A}\,\overline{B}$};
\node at (-0.8,2.5) {$\overline{A}B$};
\node at (-0.8,1.5) {$AB$};
\node at (-0.8,0.5) {$A\overline{B}$};
\node at (0.5,3.5) {X}; \node at (1.5,3.5) {1}; \node at (2.5,3.5) {1}; \node at (3.5,3.5) {X};
\node at (0.5,2.5) {0}; \node at (1.5,2.5) {X}; \node at (2.5,2.5) {1}; \node at (3.5,2.5) {0};
\node at (0.5,1.5) {0}; \node at (1.5,1.5) {0}; \node at (2.5,1.5) {1}; \node at (3.5,1.5) {0};
\node at (0.5,0.5) {0}; \node at (1.5,0.5) {0}; \node at (2.5,0.5) {1}; \node at (3.5,0.5) {0};
\draw[blue, thick, rounded corners] (0.15,3.15) rectangle (3.85,3.85);
\draw[red, thick, rounded corners] (1.15,2.15) rectangle (2.85,3.85);
\draw[green!60!black, thick, rounded corners] (2.15,3.85) rectangle (2.85,0.15);
\end{tikzpicture}
\end{document}
```

#### Dimension-Reduced K-Map (Variable-Entered Map)

A **Dimension-Reduced K-Map** (also called a **Variable-Entered Map**, VEM) extends the standard K-map by allowing variables (or expressions) to be placed inside cells instead of just constants 0, 1, or X. This effectively compresses a higher-dimensional map into a lower-dimensional one, reducing the number of variables displayed in the grid structure.

**Motivation**: A 5- or 6-variable K-map becomes unwieldy. By "entering" one or more variables into the map cells, we can represent functions of more variables using a smaller grid.

**Map entries and their meaning**:

| Entry | Meaning |
|-------|---------|
| 0 | Function is 0 regardless of entered variable(s) |
| 1 | Function is 1 regardless of entered variable(s) |
| $E$ | Function equals $E$ (1 when $E=1$, 0 when $E=0$) |
| $\overline{E}$ | Function equals $\overline{E}$ (1 when $E=0$, 0 when $E=1$) |

**Example: $F(A,B,C) = \sum m(1,2,4,5,7)$ using a 2-variable map with $C$ entered**

Decompose with respect to $C$:
- $F(A,B,0)$: evaluate for $C=0$ → $m_0=0, m_2=1, m_4=1, m_6=0$ → entries for $C=0$
- $F(A,B,1)$: evaluate for $C=1$ → $m_1=1, m_3=0, m_5=1, m_7=1$ → entries for $C=1$

Construct the 2-variable VEM:

| | $\overline{B}$ | $B$ |
|---|---|---|
| $\overline{A}$ | $C$ | $\overline{C}$ |
| $A$ | 1 | $C$ |

*Reading cell $(\overline{A},\overline{B})$:* $C=1$ gives minterm $m_1$, so entry is $C$.  
*Reading cell $(A,\overline{B})$:* both $C=0$ and $C=1$ give 1 (minterms $m_4,m_5$), so entry is $1$.

**Minimization using VEM**:

The grouping rules extend naturally:

1. Cells with entry **1** can be grouped with other 1s just as in a standard K-map.
2. Cells with entry **$E$** can be grouped with cells containing $E$ or 1 — the resulting term includes $E$.
3. Cells with entry **$\overline{E}$** can be grouped with cells containing $\overline{E}$ or 1 — the resulting term includes $\overline{E}$.
4. A cell with $E$ cannot be directly grouped with a cell containing $\overline{E}$ (unless both are subsumed by a larger group covering both polarities).
