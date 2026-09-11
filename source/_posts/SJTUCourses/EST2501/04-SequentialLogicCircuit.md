---
title: "EST2501 Digital Fundamentals (4): Sequential Logic Circuits"
date: 2026-05-23 22:10:15
tags:
- Electronics
- Notes
- SJTU Courses
categories: Exploration
mathjax: true
tikzjax: true
---

Compared with combinational logic circuits, sequential logic circuits have memory and feedback loops, which means that the output not only depends on the current inputs but also on the past history of inputs. In this part, we will discuss the basic building blocks of sequential logic circuits, such as flip-flops and registers, and how to design and analyze more complex sequential circuits like counters and finite state machines.

```tikz
\begin{document}
\begin{tikzpicture}[x=1cm,y=1cm,thick,every node/.style={anchor=north west,inner sep=4pt}]
\draw (0,3.6) rectangle (10.5,5.1);
\node at (0,5.1) {Bistable};
\draw[red] (2,4.8) -- (10.3,4.8);
\draw[blue] (2,3.9) -- (10.3,3.9);
\draw (0,1.8) rectangle (10.5,3.3);
\node at (0,3.3) {Monostable};
\draw[blue] (2,3.0) -- (3.7,3.0) -- (3.7,2.1) -- (4.4,2.1) -- (4.4,3.0) -- (10.3,3.0);
\draw[red] (2,2.1) -- (3.7,2.1) -- (3.7,3.0) -- (4.4,3.0) -- (4.4,2.1) -- (10.3,2.1);
\draw (0,0) rectangle (10.5,1.5);
\node at (0,1.5) {Astable};
\draw[red] (1.8,0.3) \foreach \x in {2.2,3.0,3.8,4.6,5.4,6.2,7.0,7.8,8.6,9.4} { -- (\x,0.3) -- (\x,1.2) -- (\x+0.4,1.2) -- (\x+0.4,0.3) } -- (10.3,0.3);
\end{tikzpicture}
\end{document}
```

Sequential logic circuits can be classified into three types based on their behavior:
- **Bistable** device has two stable states and can store one bit of information. It can be implemented using flip-flops, which are the basic building blocks of sequential logic circuits.
- **Monostable** device has one stable state and one unstable state. It can be implemented using a simple RC circuit or a 555 timer.
- **Astable** device has no stable states and continuously oscillates between two states. It can be implemented using a 555 timer or a pair of cross-coupled NAND gates.

<!--more-->

> Collections of **EST2501 Digital Electronics** notes:
>
> 1. [*Digital Fundamentals*](../01-DigitalFundamentals);
> 2. [*Logical Fundamentals*](../02-LogicalFundamentals);
> 3. [*Combinational Logic Circuit*](../03-CombinationalLogicCircuit);
> 4. [*Sequential Logic Circuit*](../04-SequentialLogicCircuit) (this article).
>
> You can find a general introduction to this course in the first article of this series.

## Latches

**Latch** is a kind of bistable device that can store one bit of information. It has two inputs, usually called **Set** and **Reset**, and one output.

The difference between a latch and a flip-flop is that a latch is level-sensitive, meaning that it changes its output as long as the input is active, while a flip-flop is edge-sensitive, meaning that it changes its output only at the moment of a clock edge.

## Set-Reset Latch

**Set-Reset Latch**, or **SR Latch**, is the simplest type of latch. It can be implemented using two cross-coupled NOR gates or two cross-coupled NAND gates. It has two inputs, **Set** (S) and **Reset** \(R\), and one output (Q). The behavior of the SR Latch can be described by the following truth table:

| State | S | R | Q |
|------|---|---|---|
| Hold | 0 | 0 | Q |
| Set  | 1 | 0 | 1 |
| Reset| 0 | 1 | 0 |
| Invalid | 1 | 1 | X |

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\tikzset{nor/.pic={\draw[fill=gray!10] (0,0.4) .. controls (0.2,0.1) and (0.2,-0.1) .. (0,-0.4) .. controls (0.5,-0.4) and (0.9,-0.1) .. (1.1,0) .. controls (0.9,0.1) and (0.5,0.4) .. (0,0.4);\draw[fill=white] (1.2,0) circle (0.1);\coordinate (-in1) at (0.08,0.2);\coordinate (-in2) at (0.08,-0.2);\coordinate (-out) at (1.3,0);},nand/.pic={\draw[fill=gray!10] (0,0.4) -- (0,-0.4) -- (0.6,-0.4) arc (-90:90:0.4) -- cycle;\draw[fill=white] (1.1,0) circle (0.1);\coordinate (-in1) at (0,0.2);\coordinate (-in2) at (0,-0.2);\coordinate (-out) at (1.2,0);}}
\pic (N1) at (0,1.2) {nor};
\pic (N2) at (0,-1.2) {nor};
\draw (N1-in1) -- ++(-1.2,0) node[left,text=magenta] {$R$};
\draw (N2-in2) -- ++(-1.2,0) node[left,text=magenta] {$S$};
\draw (N1-out) -- ++(1,0) node[right,text=magenta] {$Q$};
\draw (N2-out) -- ++(1,0) node[right,text=magenta] {$\overline{Q}$};
\path (N1-out) -- ++(0.4,0) coordinate (j1);
\path (N2-out) -- ++(0.4,0) coordinate (j2);
\path (N1-in2) -- ++(-0.6,0) coordinate (f1);
\path (N2-in1) -- ++(-0.6,0) coordinate (f2);
\fill (j1) circle (2pt);
\fill (j2) circle (2pt);
\draw (j1) -- (j1 |- 0,0.4) -- (f2 |- 0,-0.4) -- (f2) -- (N2-in1);
\draw (j2) -- (j2 |- 0,-0.4) -- (f1 |- 0,0.4) -- (f1) -- (N1-in2);
\node at (0.6,-2.8) {(a) Active-HIGH input S-R latch};
\begin{scope}[xshift=7cm]
\pic (N3) at (0,1.2) {nand};
\pic (N4) at (0,-1.2) {nand};
\draw (N3-in1) -- ++(-1.2,0) node[left,text=magenta] {$\overline{S}$};
\draw (N4-in2) -- ++(-1.2,0) node[left,text=magenta] {$\overline{R}$};
\draw (N3-out) -- ++(1,0) node[right,text=magenta] {$Q$};
\draw (N4-out) -- ++(1,0) node[right,text=magenta] {$\overline{Q}$};
\path (N3-out) -- ++(0.4,0) coordinate (j3);
\path (N4-out) -- ++(0.4,0) coordinate (j4);
\path (N3-in2) -- ++(-0.6,0) coordinate (f3);
\path (N4-in1) -- ++(-0.6,0) coordinate (f4);
\fill (j3) circle (2pt);
\fill (j4) circle (2pt);
\draw (j3) -- (j3 |- 0,0.4) -- (f4 |- 0,-0.4) -- (f4) -- (N4-in1);
\draw (j4) -- (j4 |- 0,-0.4) -- (f3 |- 0,0.4) -- (f3) -- (N3-in2);
\node at (0.6,-2.8) {(b) Active-LOW input $\overline{S}$-$\overline{R}$ latch};
\end{scope}
\end{tikzpicture}
\end{document}
```

The circuit diagram of active-HIGH input S-R latch and active-LOW input $\overline{S}$-$\overline{R}$ latch are shown above.

An enable input can be added to the SR latch to control when the latch can change its state. This is called an **Gated SR Latch**. The circuit diagram is shown below.

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\tikzset{nand/.pic={\draw[fill=gray!10] (0,0.4) -- (0,-0.4) -- (0.6,-0.4) arc (-90:90:0.4) -- cycle;\draw[fill=white] (1.1,0) circle (0.1);\coordinate (-in1) at (0,0.2);\coordinate (-in2) at (0,-0.2);\coordinate (-out) at (1.2,0);},negor/.pic={\draw[fill=gray!10] (0.2,0.4) .. controls (0.4,0.1) and (0.4,-0.1) .. (0.2,-0.4) .. controls (0.7,-0.4) and (1.1,-0.1) .. (1.3,0) .. controls (1.1,0.1) and (0.7,0.4) .. (0.2,0.4);\draw[fill=white] (0.1,0.2) circle (0.1);\draw[fill=white] (0.1,-0.2) circle (0.1);\coordinate (-in1) at (0,0.2);\coordinate (-in2) at (0,-0.2);\coordinate (-out) at (1.3,0);}}
\pic (N1) at (0,1.2) {nand};
\pic (N2) at (0,-1.2) {nand};
\pic (N3) at (2.5,1.0) {negor};
\pic (N4) at (2.5,-1.0) {negor};
\draw (N1-in1) -- ++(-1.5,0) node[left,text=magenta] {$S$};
\draw (N2-in2) -- ++(-1.5,0) node[left,text=magenta] {$R$};
\draw (-1.0,0) node[left,text=magenta] {$EN$} -- (-0.5,0);
\fill (-0.5,0) circle (2pt);
\draw (-0.5,0) |- (N1-in2);
\draw (-0.5,0) |- (N2-in1);
\draw (N1-out) -- (N3-in1);
\draw (N2-out) -- (N4-in2);
\draw (N3-out) -- ++(1.5,0) node[right,text=magenta] {$Q$};
\draw (N4-out) -- ++(1.5,0) node[right,text=magenta] {$\overline{Q}$};
\path (N3-out) -- ++(0.5,0) coordinate (j3);
\path (N4-out) -- ++(0.5,0) coordinate (j4);
\fill (j3) circle (2pt);
\fill (j4) circle (2pt);
\path (N3-in2) -- ++(-0.4,0) coordinate (f3);
\path (N4-in1) -- ++(-0.4,0) coordinate (f4);
\draw (j3) -- (j3 |- 0,0.4) -- (f4 |- 0,-0.4) -- (f4) -- (N4-in1);
\draw (j4) -- (j4 |- 0,-0.4) -- (f3 |- 0,0.4) -- (f3) -- (N3-in2);
\end{tikzpicture}
\end{document}
```

When the enable input (EN) is active, the gated SR latch behaves like a normal SR latch. When the enable input is inactive, the outputs Q and $\overline{Q}$ will hold their previous state regardless of the inputs S and R. This is level-triggered behavior, which is a characteristic of latches.

## Flip-Flops

**Flip-Flop** is synchronous bistable device, which means that it changes its state only at the moment of a clock edge. In other words, a flip-flop is actually a gated latch that is triggered by a clock signal.

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\tikzset{nand/.pic={\draw[fill=white] (0,0.4) -- (0,-0.4) -- (0.6,-0.4) arc (-90:90:0.4) -- cycle;\draw[fill=white] (1.1,0) circle (0.1);\coordinate (-in1) at (0,0.2);\coordinate (-in2) at (0,-0.2);\coordinate (-out) at (1.2,0);},negor/.pic={\draw[fill=white] (0.2,0.4) .. controls (0.4,0.1) and (0.4,-0.1) .. (0.2,-0.4) .. controls (0.7,-0.4) and (1.1,-0.1) .. (1.3,0) .. controls (1.1,0.1) and (0.7,0.4) .. (0.2,0.4);\draw[fill=white] (0.1,0.2) circle (0.1);\draw[fill=white] (0.1,-0.2) circle (0.1);\coordinate (-in1) at (0,0.2);\coordinate (-in2) at (0,-0.2);\coordinate (-out) at (1.3,0);}}
\node[below] at (2.4,-2.0) {Steering gates};
\node[below] at (5.6,-2.0) {Latch};
\pic (G1) at (2.2,1.2) {nand};
\pic (G2) at (2.2,-1.2) {nand};
\pic (G3) at (5.0,1.2) {negor};
\pic (G4) at (5.0,-1.2) {negor};
\node at (2.7,1.2) {$G_1$};
\node at (2.7,-1.2) {$G_2$};
\node at (5.7,1.2) {$G_3$};
\node at (5.7,-1.2) {$G_4$};
\draw[fill=yellow!10] (-3.0,-0.8) rectangle (-0.5,0.8);
\node[align=center,font=\small] at (-1.75,0) {Pulse\\transition\\detector};
\draw (-4.5,0) node[left] {CLK} -- (-3.0,0);
\draw[thick,blue!70] (-4.3,0.2) -- (-4.1,0.2) -- (-4.1,0.5) -- (-3.7,0.5) -- (-3.7,0.2) -- (-3.5,0.2);
\draw (-0.5,0) -- (1.5,0);
\fill (1.5,0) circle (2pt);
\draw (1.5,0) |- (G1-in2);
\draw (1.5,0) |- (G2-in1);
\draw (G1-in1) -- ++(-2.2,0) node[left,text=magenta] {$S$};
\draw (G2-in2) -- ++(-2.2,0) node[left,text=magenta] {$R$};
\draw (G1-out) -- (G3-in1);
\draw (G2-out) -- (G4-in2);
\draw (G3-out) -- ++(1.5,0) node[right,text=magenta] {$Q$};
\draw (G4-out) -- ++(1.5,0) node[right,text=magenta] {$\overline{Q}$};
\path (G3-out) -- ++(0.4,0) coordinate (j3);
\path (G4-out) -- ++(0.4,0) coordinate (j4);
\fill (j3) circle (2pt);
\fill (j4) circle (2pt);
\path (G3-in2) -- ++(-0.4,0) coordinate (f3);
\path (G4-in1) -- ++(-0.4,0) coordinate (f4);
\draw (j3) -- (j3 |- 0,0.4) -- (f4 |- 0,-0.4) -- (f4) -- (G4-in1);
\draw (j4) -- (j4 |- 0,-0.4) -- (f3 |- 0,0.4) -- (f3) -- (G3-in2);
\end{tikzpicture}
\end{document}
```

The above is a simplified logic diagram for a positive edge-triggered SR flip-flop. To ensure that the flip flop changes state only at the moment of a clock edge, we use a pulse transition detector to generate a short pulse when the clock signal transitions from low to high, and apply this pulse to enable the steering gates (G1 and G2) that control the inputs to the latch. This way, the latch will only respond to the inputs S and R during the short pulse generated by the clock edge, effectively making it an edge-triggered flip-flop.

The logic diagram of the pulse transition detector is shown below. Here, the propagation delay of the inverter should be considered.

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\tikzset{
and/.pic={\draw[fill=gray!10] (0,0.4) -- (0,-0.4) -- (0.5,-0.4) arc (-90:90:0.4) -- cycle;\coordinate (-in1) at (0,0.2);\coordinate (-in2) at (0,-0.2);\coordinate (-out) at (0.9,0);},
not/.pic={\draw[fill=gray!10] (0,0.3) -- (0,-0.3) -- (0.5,0) -- cycle;\draw[fill=white] (0.6,0) circle (0.1);\coordinate (-in) at (0,0);\coordinate (-out) at (0.7,0);}
}
\draw (-1.5,0.2) node[left] {CLK} -- (1.5,0.2);
\fill (-0.5,0.2) circle (2pt);
\draw (-0.5,0.2) |- (0,-0.4);
\pic (N1) at (0,-0.4) {not};
\pic (A1) at (1.5,0) {and};
\draw (N1-out) -- (1.0,-0.4) |- (A1-in2);
\draw (A1-out) -- ++(1,0) node[right] {OUT};
\end{tikzpicture}
\end{document}
```

### D Flip-Flop

The D flip-flop, also known as the data or delay flip-flop, is a type of flip-flop that has a single data input (D) and a clock input (CLK). The output Q takes the value of the input D at the moment of the clock edge. The behavior of the D flip-flop can be described by the following truth table:

| State | CLK | D | Q |
|-------|-----|---|---|
| RESET | ↑   | 0 | 0 |
| SET   | ↑   | 1 | 1 |

In other words, D flip-flop is a special case of SR flip-flop where the S and R inputs are connected to the D input and its complement, respectively. This ensures that the invalid state of the SR flip-flop is never reached, making the D flip-flop more reliable and easier to use in digital circuits. The logic diagram of a D flip-flop is shown as below.

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\tikzset{
nand/.pic={\draw[fill=white] (0,0.4) -- (0,-0.4) -- (0.6,-0.4) arc (-90:90:0.4) -- cycle;\draw[fill=white] (1.1,0) circle (0.1);\coordinate (-in1) at (0,0.2);\coordinate (-in2) at (0,-0.2);\coordinate (-out) at (1.2,0);},
negor/.pic={\draw[fill=white] (0.2,0.4) .. controls (0.4,0.1) and (0.4,-0.1) .. (0.2,-0.4) .. controls (0.7,-0.4) and (1.1,-0.1) .. (1.3,0) .. controls (1.1,0.1) and (0.7,0.4) .. (0.2,0.4);\draw[fill=white] (0.1,0.2) circle (0.1);\draw[fill=white] (0.1,-0.2) circle (0.1);\coordinate (-in1) at (0,0.2);\coordinate (-in2) at (0,-0.2);\coordinate (-out) at (1.3,0);},
not/.pic={\draw[fill=white] (0,0.3) -- (0,-0.3) -- (0.5,0) -- cycle;\draw[fill=white] (0.6,0) circle (0.1);\coordinate (-in) at (0,0);\coordinate (-out) at (0.7,0);}
}
\node[below] at (1.85,-2.0) {Steering gates};
\node[below] at (5.6,-2.0) {Latch};
\pic (G1) at (2.2,1.2) {nand};
\pic (G2) at (2.2,-1.2) {nand};
\pic (G3) at (5.0,1.2) {negor};
\pic (G4) at (5.0,-1.2) {negor};
\pic (INV) at (0.2,-1.4) {not};
\node at (2.7,1.2) {$G_1$};
\node at (2.7,-1.2) {$G_2$};
\node at (5.7,1.2) {$G_3$};
\node at (5.7,-1.2) {$G_4$};
\draw[fill=yellow!10] (-3.0,-0.8) rectangle (-0.5,0.8);
\node[align=center,font=\small] at (-1.75,0) {Pulse\\transition\\detector};
\draw (-4.5,0) node[left] {CLK} -- (-3.0,0);
\draw[thick,cyan!70] (-4.3,0.2) -- (-4.1,0.2) -- (-4.1,0.5) -- (-3.7,0.5) -- (-3.7,0.2) -- (-3.5,0.2);
\draw (-3.0,1.4) node[left,text=magenta] {$D$} -- (G1-in1);
\fill (-0.2,1.4) circle (2pt);
\draw (-0.2,1.4) -- (-0.2,-1.4) -- (INV-in);
\draw (INV-out) -- (G2-in2);
\draw (-0.5,0) -- (1.5,0);
\fill (1.5,0) circle (2pt);
\draw (1.5,0) |- (G1-in2);
\draw (1.5,0) |- (G2-in1);
\draw (G1-out) -- (G3-in1);
\draw (G2-out) -- (G4-in2);
\draw (G3-out) -- ++(1.5,0) node[right,text=magenta] {$Q$};
\draw (G4-out) -- ++(1.5,0) node[right,text=magenta] {$\overline{Q}$};
\path (G3-out) -- ++(0.4,0) coordinate (j3);
\path (G4-out) -- ++(0.4,0) coordinate (j4);
\fill (j3) circle (2pt);
\fill (j4) circle (2pt);
\path (G3-in2) -- ++(-0.4,0) coordinate (f3);
\path (G4-in1) -- ++(-0.4,0) coordinate (f4);
\draw (j3) -- (j3 |- 0,0.4) -- (f4 |- 0,-0.4) -- (f4) -- (G4-in1);
\draw (j4) -- (j4 |- 0,-0.4) -- (f3 |- 0,0.4) -- (f3) -- (G3-in2);
\end{tikzpicture}
\end{document}
```

### JK Flip-Flop

The JK flip-flop is a more versatile type of flip-flop that has two inputs, J and K, and a clock input (CLK). The behavior of the JK flip-flop can be described by the following truth table:

| State | CLK | J | K | Q |
|-------|-----|---|---|---|
| HOLD  | ↑   | 0 | 0 | Q |
| SET   | ↑   | 1 | 0 | 1 |
| RESET | ↑   | 0 | 1 | 0 |
| TOGGLE| ↑   | 1 | 1 | $\overline{Q}$ |

The logic diagram of a JK flip-flop is shown below.

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\tikzset{
nand/.pic={\draw[fill=white] (0,0.4) -- (0,-0.4) -- (0.6,-0.4) arc (-90:90:0.4) -- cycle;\draw[fill=white] (1.1,0) circle (0.1);\coordinate (-in1) at (0,0.3);\coordinate (-in2) at (0,0);\coordinate (-in3) at (0,-0.3);\coordinate (-out) at (1.2,0);},
negor/.pic={\draw[fill=white] (0.2,0.4) .. controls (0.4,0.1) and (0.4,-0.1) .. (0.2,-0.4) .. controls (0.7,-0.4) and (1.1,-0.1) .. (1.3,0) .. controls (1.1,0.1) and (0.7,0.4) .. (0.2,0.4);\draw[fill=white] (0.1,0.2) circle (0.1);\draw[fill=white] (0.1,-0.2) circle (0.1);\coordinate (-in1) at (0,0.2);\coordinate (-in2) at (0,-0.2);\coordinate (-out) at (1.3,0);}
}
\pic (G1) at (2.0,1.2) {nand};
\pic (G2) at (2.0,-1.2) {nand};
\pic (G3) at (4.5,1.0) {negor};
\pic (G4) at (4.5,-1.0) {negor};
\node at (2.5,1.2) {$G_1$};
\node at (2.5,-1.2) {$G_2$};
\node at (5.2,1.0) {$G_3$};
\node at (5.2,-1.0) {$G_4$};
\draw[fill=yellow!10] (-2.0,-0.5) rectangle (0.5,0.5);
\node[align=center,font=\small] at (-0.75,0) {Pulse transition\\detector};
\draw (-3.0,0) node[left,text=magenta] {CLK} -- (-2.0,0);
\draw (0.5,0) -- (1.5,0) -- (1.5,1.2) -- (G1-in2);
\draw (1.5,0) -- (1.5,-1.2) -- (G2-in2);
\fill (1.5,0) circle (2pt);
\draw (-3.0,1.5) node[left,text=magenta] {$J$} -- (G1-in1);
\draw (-3.0,-1.5) node[left,text=magenta] {$K$} -- (G2-in3);
\draw (G1-out) -- (G3-in1);
\draw (G2-out) -- (G4-in2);
\draw (G3-out) -- ++(1.0,0) node[right,text=magenta] {$Q$};
\draw (G4-out) -- ++(1.0,0) node[right,text=magenta] {$\overline{Q}$};
\path (G3-out) -- ++(0.4,0) coordinate (j3);
\path (G4-out) -- ++(0.4,0) coordinate (j4);
\fill (j3) circle (2pt);
\fill (j4) circle (2pt);
\draw (j3) -- (j3 |- 0,2.2) -- (1.25,2.2) -- (1.25,-0.9) -- (G2-in1);
\draw (j4) -- (j4 |- 0,-2.2) -- (1,-2.2) -- (1,0.9) -- (G1-in3);
\path (G3-in2) -- ++(-0.4,0) coordinate (f3);
\path (G4-in1) -- ++(-0.4,0) coordinate (f4);
\draw (j3) -- (j3 |- 0,0.5) -- (f4 |- 0,-0.4) -- (f4) -- (G4-in1);
\draw (j4) -- (j4 |- 0,-0.5) -- (f3 |- 0,0.4) -- (f3) -- (G3-in2);
\end{tikzpicture}
\end{document}
```

An activate-LOW preset and clear inputs can be added to the JK flip-flop to allow **asynchronous** setting and resetting of the output. The former input will set the output Q to 1 when activated, while the latter input will reset the output Q to 0 when activated, regardless of the clock signal or the J and K inputs.

### Characteristics of Flip-Flops Operation

```tikz
\begin{document}
\begin{tikzpicture}[>=latex,thick]
\draw[cyan!80!blue](0,2)--(1,2)--(1.4,3)--(4,3)--(4.4,2)--(5,2);\draw[cyan!80!blue,dashed](5,2)--(6.5,2);
\draw[green!60!black](0,0)--(2,0)--(2.4,1)--(5,1);\draw[green!60!black,dashed](5,1)--(6.5,1);
\node[left]at(-0.2,2.5){CLK};\node[left]at(-0.2,0.5){$Q$};
\fill[cyan!80!blue](1.2,2.5)circle(2pt);\fill[green!60!black](2.2,0.5)circle(2pt);
\draw[magenta,dashed,thin](1.2,2.5)--(1.2,-0.8);\draw[magenta,dashed,thin](2.2,0.5)--(2.2,-0.8);
\draw[magenta,<->](1.2,-0.5)--(2.2,-0.5)node[midway,below]{$t_{PLH}$};
\draw[magenta,<-,thin](1.1,2.6)--(0.8,3.2)node[above]{50\% point on triggering edge};
\draw[magenta,<-,thin](2.3,0.5)--(2.8,0.5)node[right,align=left]{50\% point on LOW-to-HIGH\\transition of $Q$};
\draw[cyan!80!blue](8,2)--(9,2)--(9.4,3)--(12,3)--(12.4,2)--(13,2);\draw[cyan!80!blue,dashed](13,2)--(14.5,2);
\draw[green!60!black](8,1)--(10,1)--(10.4,0)--(13,0);\draw[green!60!black,dashed](13,0)--(14.5,0);
\node[left]at(7.8,2.5){CLK};\node[left]at(7.8,0.5){$Q$};
\fill[cyan!80!blue](9.2,2.5)circle(2pt);\fill[green!60!black](10.2,0.5)circle(2pt);
\draw[magenta,dashed,thin](9.2,2.5)--(9.2,-0.8);\draw[magenta,dashed,thin](10.2,0.5)--(10.2,-0.8);
\draw[magenta,<->](9.2,-0.5)--(10.2,-0.5)node[midway,below]{$t_{PHL}$};
\node[magenta,right]at(9.4,2.5){50\% point};
\node[magenta,right,align=left]at(10.4,0.5){50\% point on HIGH-to-LOW\\transition of $Q$};
\end{tikzpicture}
\end{document}
```

The time interval between the 50\% point on the triggering edge of the clock signal and the 50\% point on the LOW-to-HIGH transition of the output Q is called the **propagation delay time from LOW to HIGH** ($t_{PLH}$), while the time interval between the 50\% point on the triggering edge of the clock signal and the 50\% point on the HIGH-to-LOW transition of the output Q is called the **propagation delay time from HIGH to LOW** ($t_{PHL}$).

```tikz
\usetikzlibrary{decorations.pathreplacing}
\begin{document}
\begin{tikzpicture}[>=latex,thick]
\draw[cyan!80!blue](0,2)--(1.5,2)--(1.8,3)--(7.5,3);
\draw[cyan!80!blue](0,0)--(2.8,0)--(3.1,1)--(6.5,1)--(6.8,0)--(7.5,0);
\node[left]at(-0.2,2.5){$D$};\node[left]at(-0.2,0.5){CLK};
\fill[cyan!80!blue](1.65,2.5)circle(2pt);\fill[cyan!80!blue](2.95,0.5)circle(2pt);
\node[magenta,right]at(1.75,2.5){50\% point};
\node[magenta,right]at(3.05,0.5){50\% point on triggering edge};
\draw[magenta,dashed,thin](1.65,2.5)--(1.65,-0.5);\draw[magenta,dashed,thin](2.95,0.5)--(2.95,-0.5);
\draw[magenta,decorate,decoration={brace,amplitude=5pt,mirror}](1.65,-0.6)--(2.95,-0.6)node[midway,below=6pt]{Set-up time ($t_s$)};
\end{tikzpicture}
\end{document}
```

The time interval between the 50\% point on the triggering edge of the clock signal and the 50\% point on the data input D is called the **set-up time** ($t_s$). The data input D must be stable during this time interval before the clock edge to ensure that the flip-flop can correctly capture the input value.

```tikz
\usetikzlibrary{decorations.pathreplacing}
\begin{document}
\begin{tikzpicture}[>=latex,thick]
\draw[cyan!80!blue](0,3)--(3.5,3)--(3.8,2)--(8,2);
\draw[cyan!80!blue](0,0)--(2.5,0)--(2.8,1)--(7,1)--(7.3,0)--(8,0);
\node[left]at(-0.2,2.5){$D$};\node[left]at(-0.2,0.5){CLK};
\fill[cyan!80!blue](3.65,2.5)circle(2pt);\fill[cyan!80!blue](2.65,0.5)circle(2pt);
\node[magenta,right]at(3.75,2.5){50\% point};
\draw[magenta,<-,thin](2.75,0.5)--(4.2,0.5)node[right,align=left]{50\% point on\\triggering edge};
\draw[magenta,dashed,thin](3.65,2.5)--(3.65,-0.5);\draw[magenta,dashed,thin](2.65,0.5)--(2.65,-0.5);
\draw[magenta,decorate,decoration={brace,amplitude=5pt,mirror}](2.65,-0.6)--(3.65,-0.6)node[midway,below=6pt]{Hold time ($t_h$)};
\end{tikzpicture}
\end{document}
```

Similarly, the time interval between the 50\% point on the triggering edge of the clock signal and the 50\% point on the data input D is called the **hold time** ($t_h$). The data input D must be stable during this time interval after the clock edge to ensure that the flip-flop can correctly capture the input value.

### One-shot

A one-shot, also known as a **monostable** multivibrator, is a type of circuit that generates a single output pulse of a specified duration in response to an input trigger. The output pulse is generated when the input signal transitions from low to high (or from high to low, depending on the design). The duration of the output pulse is determined by the circuit components and can be adjusted as needed.

```tikz
\begin{document}
\begin{tikzpicture}[>=latex,thick]
\draw(-2,0.2)--(1.05,0.2);\draw(2.7,0)--(3.3,0);\draw(3.61,0)--(5.5,0);\draw(6.5,0)--(8.5,0)node[magenta,right]{$Q$};
\draw(8,0)--(8,-1.8)--(0.5,-1.8)--(0.5,-0.2)--(1.05,-0.2);
\draw[fill=white](1,0.5)..controls(1.5,0.5)and(2,0.2)..(2.5,0)..controls(2,-0.2)and(1.5,-0.5)..(1,-0.5)..controls(1.2,-0.2)and(1.2,0.2)..(1,0.5)--cycle;
\draw[fill=white](2.6,0)circle(0.1);\node at(1.6,0){$G_1$};\node[magenta,below]at(2.4,-0.1){$\overline{Q}$};
\draw(3.3,-0.4)--(3.3,0.4);\draw(3.5,-0.4)arc(-30:30:0.8);\node[below]at(3.4,-0.5){$C$};
\draw(4.5,0)--(4.5,0.5)--(4.3,0.6)--(4.7,0.8)--(4.3,1.0)--(4.7,1.2)--(4.3,1.4)--(4.7,1.6)--(4.5,1.7)--(4.5,2.2);
\draw[fill=white](4.5,2.3)circle(0.1);\node[above]at(4.5,2.4){$+V$};\node[right]at(4.8,1.1){$R$};
\draw[fill=white](5.6,0)circle(0.1);\draw[fill=white](5.7,-0.4)--(5.7,0.4)--(6.5,0)--cycle;\node at(6.0,0){$G_2$};
\fill(4.5,0)circle(2pt);\fill(8,0)circle(2pt);
\draw[cyan!80!blue](-2.2,0.4)--(-1.8,0.4)--(-1.8,1.0)--(-1.6,1.0)--(-1.6,0.4)--(-1.2,0.4);
\node[above]at(-1.7,1.0){$t_1$};\node[magenta,below]at(-1.7,0.2){Trigger};
\end{tikzpicture}
\end{document}
```

The diagram above shows a simple one-shot circuit. When the trigger signal is applied, the output Q goes high for a certain duration determined by the resistor R and capacitor C, and then returns to low.

The **pulse width** of a one-shot is the time interval during which the output remains in the high state after receiving the trigger signal. The pulse width can be calculated using the following formula:
$$t_p = R \cdot C \cdot \ln\left(\frac{V_{supply}}{V_{threshold}}\right)$$
where $R$ is the resistance, $C$ is the capacitance, $V_{supply}$ is the supply voltage, and $V_{threshold}$ is the threshold voltage at which the output transitions from high to low.

#### Non-retriggerable One-shot

A non-retriggerable one-shot is a type of one-shot circuit that does not allow the output pulse to be extended or retriggered by additional input triggers while the output is still high. In other words, once the output pulse is generated, it will complete its duration regardless of any subsequent triggers until it returns to low.

```tikz
\begin{document}
\begin{tikzpicture}[>=latex,thick]
\draw[very thick](0,0)rectangle(6,5);
\draw[very thick](0,2)--(4,2)--(4,5);
\draw[very thick](0,3.5)--(2,3.5)--(2,5);
\draw(-1.5,4.5)--node[above]{(3)}(0,4.5);\draw[thick](0,4.65)--(0.15,4.5);
\draw(-1.5,3.8)--node[above]{(4)}(0,3.8);\draw[thick](0,3.95)--(0.15,3.8);
\draw(-1.5,2.8)--node[above]{(5)}(0,2.8);
\node[left,purple]at(-1.5,4.5){$A_1$};
\node[left,purple]at(-1.5,3.8){$A_2$};
\node[left,purple]at(-1.5,2.8){$B$};
\draw(6,4.0)--node[above]{(6)}(7.5,4.0);
\draw(6,2.0)--node[above]{(1)}(7.5,2.0);\draw[thick](6,1.85)--(6.15,2.0);
\node[right,purple]at(7.5,4.0){$Q$};
\node[right,purple]at(7.5,2.0){$\overline{Q}$};
\draw(1,0)--(1,-1.0);\draw[thick](0.8,-0.5)--(1.2,-0.9);\draw[thick](0.8,-0.9)--(1.2,-0.5);
\node[right]at(1.1,-0.3){(9)};\node[below,purple]at(1,-1.0){$R_{\mathrm{INT}}$};
\draw(3,0)--(3,-1.0);\draw[thick](2.8,-0.5)--(3.2,-0.9);\draw[thick](2.8,-0.9)--(3.2,-0.5);
\node[right]at(3.1,-0.3){(10)};\node[below,purple]at(3,-1.0){$C_{\mathrm{EXT}}$};
\draw(5,0)--(5,-1.0);\draw[thick](4.8,-0.5)--(5.2,-0.9);\draw[thick](4.8,-0.9)--(5.2,-0.5);
\node[right]at(5.1,-0.3){(11)};\node[below,purple]at(5,-1.0){$R_{\mathrm{EXT}}/C_{\mathrm{EXT}}$};
\node at(1,4.25){$\ge 1$};\node at(3,4.25){\&};
\draw[thick,line cap=round,line join=round](0.6,2.4)--(1.1,2.4)--(1.3,3.0)--(1.6,3.0);
\draw[thick,line cap=round,line join=round](1.4,3.0)--(0.9,3.0)--(0.7,2.4)--(0.4,2.4);
\node at(4.4,4.3){$1$};\draw[thick](4.8,4.2)--(4.9,4.2)--(4.9,4.4)--(5.2,4.4)--(5.2,4.2)--(5.3,4.2);
\draw[thick](4,3.1)--(4.2,2.9)--(4,2.7);
\node at(1,0.5){$\mathit{RI}$};\node at(3,0.5){$\mathit{CX}$};\node at(5,0.5){$\mathit{RX/CX}$};
\node at(3,-2.2){(b) ANSI/IEEE std. 91--1984 logic symbol};
\end{tikzpicture}
\end{document}
```

The above is the ANSI/IEEE standard logic symbol of 74LS121, a classic non-retriggerable one-shot. The inputs A1 and A2 are the trigger inputs combined with a OR gate, while the input B is an active-LOW reset input. The output Q goes high for a certain duration when either A1 or A2 receives a trigger signal, and it returns to low when the reset input B is activated or when the pulse duration expires.

If we do not want to use the internal resistor, we can connect the external resistor with $R_{\mathrm{EXT}}/C_{\mathrm{EXT}}$ (Pin 11) and $V_{CC}$. Similarly, for the external capacitor, we can connect it to Pin 11 and $C_{\mathrm{EXT}}$ (Pin 10). If internal resistor is used, connect $R_{\mathrm{INT}}$ (Pin 9) to $V_{CC}$.

The $A_1$, $A_2$ and $B$ are connected with a strange device - a **Schmitt trigger**. A Schmitt trigger is a type of comparator circuit that incorporates hysteresis, which means it has two different threshold voltage levels for switching between high and low output states. It will only change its output state when the input signal crosses the upper threshold voltage (for a rising input) or the lower threshold voltage (for a falling input). This makes it ideal for use in one-shot circuits, as it ensures that the output pulse is generated only in response to a valid trigger signal, and not due to noise or glitches on the input.

So, the final internal trigger signal can be expressed as:
$$\mathit{Trigger} =( \overline{A_1} + \overline{A_2}) B$$

#### Retriggerable One-shot

74LS122 is a retriggerable one-shot, which means that if a new trigger signal is received while the output is still high, the output pulse will be extended by resetting the timing interval. This allows for continuous triggering without waiting for the previous pulse to complete.

The structure of 74LS122 is similar to that of 74LS121, but it uses a different internal configuration to allow for retriggering.

When the chip does not connect to external resistor and capacitor, the pulse width can be calculated using the following formula:
$$t_p = \ln 2 \cdot R_{\mathrm{INT}} \cdot C_{\mathrm{INT}}$$
where $R_{\mathrm{INT}}$ is the internal resistance and $C_{\mathrm{INT}}$ is the internal capacitance.

If external components are used, the pulse width can be calculated using the following experience formula:
$$t_p = 0.32 \cdot R_{\mathrm{EXT}} \cdot C_{\mathrm{EXT}}(1+\frac{0.7}{R_{\mathrm{EXT}}})$$
where $R_{\mathrm{EXT}}$ is the external resistance and $C_{\mathrm{EXT}}$ is the external capacitance. In this formula, the units of $R_{\mathrm{EXT}}$ and $C_{\mathrm{EXT}}$ should be in kilo-ohms and picofarads, respectively, to get the pulse width in nanoseconds.

### 555 Timer

The 555 timer is a widely used integrated circuit that can be configured in various modes, including Schmitt trigger, monostable (one-shot), astable (oscillator), and bistable (flip-flop) modes.

```tikz
\usetikzlibrary{decorations.pathmorphing, arrows.meta}
\begin{document}
\begin{tikzpicture}[>=latex, resistor/.style={decorate,decoration={zigzag, segment length=5pt, amplitude=2.5pt, pre length=3pt, post length=3pt}}]
    \fill[cyan!15] (-1, -0.5) rectangle (8.0, 8); \draw (0, 0.3) -- (0, -1);
    \draw (0, 8.5) -- (0, 7.7); \draw[resistor] (0, 7.7) -- (0, 6.3);
    \draw (0, 6.3) -- (0, 5.7); \draw[resistor] (0, 5.7) -- (0, 4.3);
    \draw (0, 4.3) -- (0, 1.7); \draw[resistor] (0, 1.7) -- (0, 0.3);
    \node [left] at (-0.2, 7.2) {$R$};\node[left] at (-0.2, 6.8) {$5\mathrm{ k}\Omega$};
    \node [left] at (-0.2, 5.2) {$R$};\node[left] at (-0.2, 4.8) {$5\mathrm{ k}\Omega$};
    \node [left] at (-0.2, 1.2) {$R$};\node[left] at (-0.2, 0.8) {$5\mathrm{ k}\Omega$};
    \draw [thick] (1.5, 6.8) -- (1.5, 5.2) -- (2.6, 6) -- cycle;
    \node at (1.7, 6.4) {$+$}; \node at (1.7, 5.6) {$-$}; \node at (2.2, 6) {A};
    \draw [thick] (1.5, 4.8) -- (1.5, 3.2) -- (2.6, 4) -- cycle;
    \node at (1.7, 4.4) {$+$}; \node at (1.7, 3.6) {$-$}; \node at (2.2, 4) {B};
    \draw (-1.5, 6.1) -- (1.5, 6.1); \draw (-1.5, 5.9) -- (1.5, 5.9);
    \draw (0, 4.1) -- (1.5, 4.1); \draw (-1.5, 3.9) -- (1.5, 3.9);
    \draw [fill=black] (0, 5.9) circle (2pt); \draw [fill=black] (0, 4.1) circle (2pt);
    \draw [fill=white] (0, 8.5) circle (2pt); \draw [fill=white] (0, -1) circle (2pt);
    \draw [fill=white] (-1.5, 5.9) circle (2pt);
    \draw [fill=white] (-1.5, 6.1) circle (2pt);
    \draw [fill=white] (-1.5, 3.9) circle (2pt);
    \draw [thick] (4, 3.5) rectangle (5.5, 6.5);
    \node at (4.3, 6) {$R$}; \node at (4.3, 4) {$S$}; \node at (5.2, 5) {$Q$};
    \draw [thick] (5.6, 5) circle (0.1); \draw[thick] (4.75, 3.4) circle (0.1);
    \draw (4.75, 3.3) -- (4.75, -1); \draw [fill=white] (4.75, -1) circle (2pt);
    \draw (2.6, 4) -- (4, 4); \draw (2.6, 6) -- (4, 6);
    \draw [thick, fill=white] (1.5, 1) circle (0.5); \draw (1.7, 1) -- (2, 1); 
    \draw [thick] (1.7, 0.7) -- (1.7, 1.3); \draw (1.7, 1.1) -- (1.3, 1.4);
    \draw [-latex] (1.7, 0.9) -- (1.3, 0.6);
    \draw (1.3, 1.4) -- (1.3, 2) -- (-1.5, 2); \draw [fill=white] (-1.5, 2) circle (2pt);
    \draw (1.3, 0.6) -- (1.3, 0) -- (0, 0); \draw [fill=black] (0, 0) circle (2pt);
    \node [right] at (2, 1.3) {$Q_1$};
    \draw (6, 5) -- (6, 1) -- (2, 1); \draw [fill=black] (6, 5) circle (2pt);
    \draw [thick] (6.5, 5.5) -- (6.5, 4.5) -- (7.5, 5) -- cycle;
    \draw (5.7, 5) -- (6.3, 5); \draw (7.5, 5) -- (8.5, 5);
    \draw [fill=white] (8.5,5) circle (2pt); \draw[thick] (6.4, 5) circle (0.1); 
    \node [below] at (0, -1.2) {(1) GND}; \node [left] at (-1.7, 3.9) {(2) Trigger};
    \node [right] at (8.7, 5) {(3) Output}; \node [below] at (4.75, -1.2) {(4) Reset};
    \node [left] at (-1.7, 5.8) {(5) Control voltage}; \node [left] at (-1.7, 6.2) {(6) Threshold};
    \node [left] at (-1.7, 2) {(7) Discharge}; \node [above] at (0, 8.7) {(8) VCC};
\end{tikzpicture}
\end{document}
```

The diagram above shows the internal structure of a 555 timer. Here, we introduce two new basic components.

The first device in shape of triangle is a **comparator**, which compares the input voltage of the upper and lower input. If the voltage at the upper input is higher than that at the lower input, the output of the comparator will be high; otherwise, it will be low. The two comparators in the 555 timer are used to compare the voltage across the capacitor with two reference voltages (1/3 and 2/3 of the supply voltage) to determine when to set or reset the flip-flop.

The second device is a **discharge transistor**. When the base of the transistor receives a high signal from the flip-flop, it turns on and allows current to flow from the capacitor to ground, effectively discharging the capacitor. This is used to reset the timing interval in monostable mode or to create a square wave in astable mode.

#### One-shot Mode

```tikz
\usetikzlibrary{decorations.pathmorphing}
\begin{document}
\begin{tikzpicture}[
    >=latex,
    resistor/.style={decorate, decoration={zigzag, segment length=5pt, amplitude=2.5pt, pre length=3pt, post length=3pt}}
]
\draw[thick, fill=brown!10] (0, 0) rectangle (4, 5);
\node at (2, 3) {\Large 555};
\node[anchor=north west] at (0.1, 4.9) {\textit{RESET}};
\node[anchor=north east] at (3.9, 4.9) {$V_{CC}$};
\node[anchor=west] at (0.1, 4) {\textit{DISCH}};
\node[anchor=west] at (0.1, 2.5) {\textit{THRESH}};
\node[anchor=west] at (0.1, 1) {\textit{TRIG}};
\node[anchor=south] at (2, 0.1) {GND};
\node[anchor=east] at (3.9, 2.5) {\textit{OUT}};
\node[anchor=east] at (3.9, 1) {\textit{CONT}};
\draw[thick] (1, 5.1) circle (0.1);
\draw (1, 5.2) -- (1, 6);
\node[right] at (1, 5.5) {(4)};
\draw (3, 5) -- (3, 6);
\node[right] at (3, 5.5) {(8)};
\draw (3, 6) -- (3, 6.5);
\filldraw[fill=white] (3, 6.5) circle (2pt);
\node[above] at (3, 6.6) {$+V_{CC}$};
\filldraw (3, 6) circle (1.5pt);
\draw (3, 6) -- (1, 6);
\filldraw (1, 6) circle (1.5pt);
\draw (1, 6) -- (-1.5, 6) -- (-1.5, 5.5);
\draw[resistor] (-1.5, 5.5) -- (-1.5, 4.5);
\node[right] at (-1.2, 4.25) {$R_1$};
\draw (-1.5, 4.5) -- (-1.5, 2.5);
\draw (-1.5, 4) -- (0, 4);
\filldraw (-1.5, 4) circle (1.5pt);
\node[above left] at (0, 4) {(7)};
\draw (-1.5, 2.5) -- (0, 2.5);
\filldraw (-1.5, 2.5) circle (1.5pt);
\node[above left] at (0, 2.5) {(6)};
\draw (-1.5, 2.5) -- (-1.5, 0.5);
\draw[thick] (-1.9, 0.5) -- (-1.1, 0.5);
\draw[thick] (-1.9, 0.3) -- (-1.1, 0.3);
\node[right] at (-1.0, 0.4) {$C_1$};
\draw (-1.5, 0.3) -- (-1.5, -0.5);
\draw[thick] (-1.8, -0.5) -- (-1.2, -0.5);
\draw[thick] (-1.7, -0.6) -- (-1.3, -0.6);
\draw[thick] (-1.6, -0.7) -- (-1.4, -0.7);
\draw (0, 1) -- (-2.5, 1);
\filldraw[fill=white] (-2.5, 1) circle (2pt);
\node[above left] at (0, 1) {(2)};
\draw (2, 0) -- (2, -0.5);
\node[right] at (2, -0.3) {(1)};
\draw[thick] (1.7, -0.5) -- (2.3, -0.5);
\draw[thick] (1.8, -0.6) -- (2.2, -0.6);
\draw[thick] (1.9, -0.7) -- (2.1, -0.7);
\draw (4, 2.5) -- (5.5, 2.5);
\filldraw[fill=white] (5.5, 2.5) circle (2pt);
\node[above right] at (4, 2.5) {(3)};
\draw (4, 1) -- (5.5, 1) -- (5.5, 0.5);
\node[above right] at (4, 1) {(5)};
\draw[thick] (5.1, 0.5) -- (5.9, 0.5);
\draw[thick] (5.1, 0.3) -- (5.9, 0.3);
\node[right, align=left] at (6, 0.2) {$C_2$ \\ $0.01\ \mu$F \\ (decoupling optional)};
\draw (5.5, 0.3) -- (5.5, -0.5);
\draw[thick] (5.2, -0.5) -- (5.8, -0.5);
\draw[thick] (5.3, -0.6) -- (5.7, -0.6);
\draw[thick] (5.4, -0.7) -- (5.6, -0.7);
\end{tikzpicture}
\end{document}
```

The pulse width of the one-shot mode can be calculated using the following formula:
$$t_p = \ln 3 \cdot R_1 \cdot C_1$$
where $R_1$ is the resistance of the timing resistor and $C_1$ is the capacitance of the timing capacitor. The control voltage pin can be used to adjust the threshold voltage levels, which in turn can affect the pulse width. However, in most applications, the control voltage pin is left unconnected or connected to ground through a capacitor for noise filtering.

#### Astable Mode

```tikz
\usetikzlibrary{decorations.pathmorphing}
\begin{document}
\begin{tikzpicture}[
    >=latex,
    resistor/.style={decorate, decoration={zigzag, segment length=5pt, amplitude=2.5pt, pre length=3pt, post length=3pt}}
]
\draw[thick, fill=brown!10] (0, 0) rectangle (4, 5);
\node at (2, 3) {\Large 555};
\node[anchor=north west] at (0.1, 4.9) {\textit{RESET}};
\node[anchor=north east] at (3.9, 4.9) {$V_{CC}$};
\node[anchor=west] at (0.1, 4) {\textit{DISCH}};
\node[anchor=west] at (0.1, 2.5) {\textit{THRESH}};
\node[anchor=west] at (0.1, 1) {\textit{TRIG}};
\node[anchor=south] at (2, 0.1) {GND};
\node[anchor=east] at (3.9, 2.5) {\textit{OUT}};
\node[anchor=east] at (3.9, 1) {\textit{CONT}};
\draw[thick] (1, 5.1) circle (0.1);
\draw (1, 5.2) -- (1, 6);
\node[right] at (1, 5.5) {(4)};
\draw (3, 5) -- (3, 6);
\node[right] at (3, 5.5) {(8)};
\draw (3, 6) -- (3, 6.5);
\filldraw[fill=white] (3, 6.5) circle (2pt);
\node[above] at (3, 6.6) {$+V_{CC}$};
\filldraw (3, 6) circle (1.5pt);
\draw (3, 6) -- (1, 6);
\filldraw (1, 6) circle (1.5pt);
\draw (1, 6) -- (-1.5, 6) -- (-1.5, 5.5);
\draw[resistor] (-1.5, 5.5) -- (-1.5, 4.5);
\draw[resistor] (-1.5, 2.875) -- (-1.5, 3.625);
\node[right] at (-1.2, 4.25) {$R_1$};
\draw (-1.5, 4.5) -- (-1.5, 3.625); \draw (-1.5, 2.5) -- (-1.5, 2.875);
\draw (-1.5, 4) -- (0, 4);
\filldraw (-1.5, 4) circle (1.5pt);
\node[above left] at (0, 4) {(7)};
\draw (-1.5, 2.5) -- (0, 2.5);
\filldraw (-1.5, 2.5) circle (1.5pt);
\node[above left] at (0, 2.5) {(6)};
\draw (-1.5, 2.5) -- (-1.5, 0.5);
\draw[thick] (-1.9, 0.5) -- (-1.1, 0.5);
\draw[thick] (-1.9, 0.3) -- (-1.1, 0.3);
\node[right] at (-1.0, 0.4) {$C_1$};
\draw (-1.5, 0.3) -- (-1.5, -0.5);
\draw[thick] (-1.8, -0.5) -- (-1.2, -0.5);
\draw[thick] (-1.7, -0.6) -- (-1.3, -0.6);
\draw[thick] (-1.6, -0.7) -- (-1.4, -0.7);
\draw (0, 1) -- (-1.5, 1);
\filldraw[fill=black] (-1.5, 1) circle (2pt);
\node[above left] at (0, 1) {(2)};
\draw (2, 0) -- (2, -0.5);
\node[right] at (2, -0.3) {(1)};
\draw[thick] (1.7, -0.5) -- (2.3, -0.5);
\draw[thick] (1.8, -0.6) -- (2.2, -0.6);
\draw[thick] (1.9, -0.7) -- (2.1, -0.7);
\draw (4, 2.5) -- (5.5, 2.5);
\filldraw[fill=white] (5.5, 2.5) circle (2pt);
\node[above right] at (4, 2.5) {(3)};
\draw (4, 1) -- (5.5, 1) -- (5.5, 0.5);
\node[above right] at (4, 1) {(5)};
\draw[thick] (5.1, 0.5) -- (5.9, 0.5);
\draw[thick] (5.1, 0.3) -- (5.9, 0.3);
\node[right, align=left] at (6, 0.2) {$C_2$ \\ $0.01\ \mu$F \\ (decoupling optional)};
\draw (5.5, 0.3) -- (5.5, -0.5);
\draw[thick] (5.2, -0.5) -- (5.8, -0.5);
\draw[thick] (5.3, -0.6) -- (5.7, -0.6);
\draw[thick] (5.4, -0.7) -- (5.6, -0.7);
\end{tikzpicture}
\end{document}
```

In the astable mode. the 555 timer will repeat the following cycle indefinitely:
- The $R_1+R_2$ path charges the capacitor $C_1$ until the voltage across it reaches 2/3 of $V_{CC}$, at which point the upper comparator triggers and sets the flip-flop, causing the discharge transistor to turn on and discharge the capacitor through $R_2$.
- The capacitor discharges until the voltage across it drops to 1/3 of $V_{CC}$, at which point the lower comparator triggers and resets the flip-flop, causing the discharge transistor to turn off and allowing the capacitor to start charging again.

The frequency of the oscillation can be calculated using the following formula:
$$f = \frac{1}{\ln 2(R_1 + 2R_2) \cdot C_1}$$
where $R_1$ and $R_2$ are the resistances of the timing resistors and $C_1$ is the capacitance of the timing capacitor. The duty cycle of the output waveform can be calculated using the following formula:
$$D = \frac{R_1 + R_2}{R_1 + 2R_2}$$
where $D$ is the duty cycle expressed as a fraction (e.g., 0.5 for 50\%).

#### Schmitt Trigger

```tikz
\usetikzlibrary{decorations.pathmorphing}
\begin{document}
\begin{tikzpicture}[
    >=latex,
    resistor/.style={decorate, decoration={zigzag, segment length=5pt, amplitude=2.5pt, pre length=3pt, post length=3pt}}
]
\draw[thick, fill=brown!10] (0, 0) rectangle (4, 5);
\node at (2, 3) {\Large 555};
\node[anchor=north west] at (0.1, 4.9) {\textit{RESET}};
\node[anchor=north east] at (3.9, 4.9) {$V_{CC}$};
\node[anchor=west] at (0.1, 4) {\textit{DISCH}};
\node[anchor=west] at (0.1, 2.5) {\textit{THRESH}};
\node[anchor=west] at (0.1, 1) {\textit{TRIG}};
\node[anchor=south] at (2, 0.1) {GND};
\node[anchor=east] at (3.9, 2.5) {\textit{OUT}};
\node[anchor=east] at (3.9, 1) {\textit{CONT}};
\draw[thick] (1, 5.1) circle (0.1);
\draw (1, 5.2) -- (1, 6);
\node[right] at (1, 5.5) {(4)};
\draw (3, 5) -- (3, 6);
\node[right] at (3, 5.5) {(8)};
\draw (3, 6) -- (3, 6.5);
\filldraw[fill=white] (3, 6.5) circle (2pt);
\node[above] at (3, 6.6) {$+V_{CC}$};
\filldraw (3, 6) circle (1.5pt);
\draw (3, 6) -- (1, 6);
\node[above left] at (0, 4) {(7)};
\node[above left] at (0, 2.5) {(6)};
\node[above left] at (0, 1) {(2)};
\draw (0, 2.5) -- (-1.5, 2.5) -- (-1.5, 1) -- (0, 1);
\draw (-1.5, 1.75) -- (-2.5, 1.75);
\filldraw (-1.5, 1.75) circle (1.5pt);
\filldraw[fill=white] (-2.5, 1.75) circle (2pt);
\node[left] at (-2.6, 1.75) {$V_{IN}$};
\draw (2, 0) -- (2, -0.5);
\node[right] at (2, -0.3) {(1)};
\draw[thick] (1.7, -0.5) -- (2.3, -0.5);
\draw[thick] (1.8, -0.6) -- (2.2, -0.6);
\draw[thick] (1.9, -0.7) -- (2.1, -0.7);
\draw (4, 2.5) -- (5.5, 2.5);
\filldraw[fill=white] (5.5, 2.5) circle (2pt);
\node[above right] at (4, 2.5) {(3)};
\node[right] at (5.6, 2.5) {$V_{OUT}$};
\draw (4, 1) -- (5.5, 1) -- (5.5, 0.5);
\node[above right] at (4, 1) {(5)};
\draw[thick] (5.1, 0.5) -- (5.9, 0.5);
\draw[thick] (5.1, 0.3) -- (5.9, 0.3);
\node[right, align=left] at (6, 0.2) {$C_2$ \\ $0.01\ \mu$F \\ (decoupling optional)};
\draw (5.5, 0.3) -- (5.5, -0.5);
\draw[thick] (5.2, -0.5) -- (5.8, -0.5);
\draw[thick] (5.3, -0.6) -- (5.7, -0.6);
\draw[thick] (5.4, -0.7) -- (5.6, -0.7);
\end{tikzpicture}
\end{document}
```

It is easy to see that the Schmitt trigger is essentially a 555 timer without the discharge transistor and the flip-flop. The output of the Schmitt trigger will be high when the input voltage is above the upper threshold (2/3 of $V_{CC}$) and low when the input voltage is below the lower threshold (1/3 of $V_{CC}$). The hysteresis provided by the two thresholds helps to prevent noise from causing false triggering, making it ideal for use in applications such as signal conditioning and debouncing.

## Sequential Logic Circuits

```tikz
\usepackage{tikz}
\begin{document}
\begin{tikzpicture}[>=latex, align=center]
\node[draw, minimum width=3cm, minimum height=2.5cm] (comb) at (0,0) {Combinational\\Logic\\Network};
\node[draw, minimum width=0.8cm, minimum height=0.8cm] (ff1) at (0, -2.5) {FF};
\node[draw, minimum width=0.8cm, minimum height=0.8cm] (ff2) at (0, -4.5) {FF};
\node at (0, -3.4) {$\vdots$};
\node[left, align=left] at (-2.6, 0.5) {Input\\Signals};
\draw[->] (-2.6, 0.8) -- (-1.5, 0.8);
\draw[->] (-2.6, 0.2) -- (-1.5, 0.2);
\node at (-2.05, 0.55) {$\vdots$};
\node[right, align=left] at (2.6, 0.5) {Output\\Signals};
\draw[->] (1.5, 0.8) -- (2.6, 0.8);
\draw[->] (1.5, 0.2) -- (2.6, 0.2);
\node at (2.05, 0.55) {$\vdots$};
\draw[->] (1.5, -0.4) -- (2.2, -0.4) -- (2.2, -2.5) -- (0.4, -2.5);
\draw[->] (1.5, -1.0) -- (2.8, -1.0) -- (2.8, -4.5) -- (0.4, -4.5);
\node at (1.85, -0.65) {$\vdots$};
\draw[->] (-0.4, -2.5) -- (-2.2, -2.5) -- (-2.2, -0.4) -- (-1.5, -0.4);
\draw[->] (-0.4, -4.5) -- (-2.8, -4.5) -- (-2.8, -1.0) -- (-1.5, -1.0);
\node at (-1.85, -0.65) {$\vdots$};
\node[align=left] at (-1.3, -3.5) {Current\\State\\Signals};
\node[align=left] at (1.8, -3.5) {Next\\State\\Signals};
\draw (0.8, -5.3) node[below]{CLK} -- (0.8, -2.8) -- (0.4, -2.8);
\draw (0.8, -4.8) -- (0.4, -4.8);
\end{tikzpicture}
\end{document}
```

Above is the general structure of a sequential logic circuit. A sequential logic circuit is called **Moore sequential circuit** if the output signals depend only on the internal states of the system, and it is called **Mealy sequential circuit** if the output signals depend on both the current input signals and the current state signals.

The combinational logic network takes the current state signals and the input signals as inputs and produces the output signals and the next state signals as outputs. The flip-flops (FF) are used to store the current state signals, which are updated on each clock cycle based on the next state signals produced by the combinational logic network.

## Counters

Designing a counter is a common application of sequential logic circuits. In **synchronous counters**, all flip-flops are triggered by the exact same clock signal, which means that all state changes occur simutaneously. In contrast, in **asynchronous counters**, the flip-flops are triggered by clock signals that are generated by the output of the previous flip-flop.

### Asynchronous Counter

A 10-count asynchronous counter, designed with D-filp-flops, are shown below.

```tikz
\usepackage{tikz}
\begin{document}
\begin{tikzpicture}[>=latex, font=\normalsize]
\foreach \i/\x in {0/0, 1/3.5, 2/7.0, 3/10.5} {
\draw[thick, fill=black!5] (\x, 0) rectangle (\x+1.8, 4);
\node[above] at (\x+0.9, 4) {FF\i};
\node[right] at (\x, 3) {$D_\i$};
\node[right] at (\x+0.2, 1.5) {$C$};
\draw (\x, 1.7) -- (\x+0.3, 1.5) -- (\x, 1.3);
\draw[thick, fill=white] (\x-0.1, 1.5) circle (0.1);
\node[above right, magenta, inner sep=2pt] at (\x+1.8, 3) {$Q_\i$};
\node[above right, magenta, inner sep=2pt] at (\x+2.0, 0.5) {$\overline{Q}_\i$};
\draw[thick, fill=white] (\x+1.9, 0.5) circle (0.1);
\node[above] at (\x+0.9, 0) {$CLR$};
\draw[thick, fill=white] (\x+0.9, -0.1) circle (0.1);
}
\draw (2.0, 0.5) -- (2.5, 0.5) -- (2.5, -0.6) -- (-0.5, -0.6) -- (-0.5, 3) -- (0, 3);
\draw (5.5, 0.5) -- (6.0, 0.5) -- (6.0, -0.6) -- (3, -0.6) -- (3, 3) -- (3.5, 3);
\draw (9.0, 0.5) -- (9.5, 0.5) -- (9.5, -0.6) -- (6.5, -0.6) -- (6.5, 3) -- (7.0, 3);
\draw (12.5, 0.5) -- (13.0, 0.5) -- (13.0, -0.6) -- (10, -0.6) -- (10, 3) -- (10.5, 3);
\draw (-2.5, 1.5) node[left, magenta]{CLK} -- (-0.2, 1.5);
\draw (1.8, 3) -- (2.3, 3) -- (2.3, 1.5) -- (3.3, 1.5);
\draw (5.3, 3) -- (5.8, 3) -- (5.8, 1.5) -- (6.8, 1.5);
\draw (8.8, 3) -- (9.3, 3) -- (9.3, 1.5) -- (10.3, 1.5);
\fill (5.8, 3) circle (2pt);
\draw (5.8, 3) -- (5.8, 4.8) -- (14, 4.8);
\draw (12.3, 3) -- (13.5, 3) -- (13.5, 4.2) -- (14, 4.2);
\draw[thick, fill=black!5] (14,4) -- (14.5,4) arc (-90:90:0.5) -- (14,5) -- cycle;
\draw[thick, fill=white] (15.1, 4.5) circle (0.1);
\node[above] at (14.75, 5) {10 decoder};
\node[above right, magenta] at (15.2, 4.5) {$\overline{CLR}$};
\draw (15.2, 4.5) -- (15.8, 4.5) -- (15.8, -1.2) -- (0.9, -1.2) -- (0.9, -0.2);
\fill (4.4, -1.2) circle (2pt);
\draw (4.4, -1.2) -- (4.4, -0.2);
\fill (7.9, -1.2) circle (2pt);
\draw (7.9, -1.2) -- (7.9, -0.2);
\fill (11.4, -1.2) circle (2pt);
\draw (11.4, -1.2) -- (11.4, -0.2);
\end{tikzpicture}
\end{document}
```

In asynchronous counters, the end signal for the $n$-digital counter is exactly $n$. In other words, take 10-count counter as an example, the end signal is 10, which means that the system will generate a glitch signal of 10 when the counter reaches 10, and this signal can be used to reset the counter back to 0. However, due to the nature of asynchronous counters, there may be a short period of time during which the output signals are in an indeterminate state (glitch) when the counter transitions from one state to another, especially when multiple bits change simultaneously.

The end signal for 10-count is 10, or 1010 in binary. However, in the NAND gate implementation of the counter, only the second and the fourth bits are used to generate the end signal. This is **partial decoding**: since the combination of `11` in second and fourth bits will never occur in the counting sequence of a 10-count counter, we can use this combination to generate the end signal without affecting the normal counting sequence. This allows us to use fewer gates and simplify the circuit design. For instance, if we want to construct a 12-counter, only the third and the fourth bits are used to generate the end signal.

```tikz
\usepackage{tikz}
\begin{document}
\begin{tikzpicture}[>=latex, font=\normalsize]
\foreach \i/\x in {0/0, 1/3.5, 2/7.0, 3/10.5} {
    \draw[thick, fill=white] (\x, 0) rectangle (\x+1.8, 3);
    \node[above] at (\x+0.9, 3) {FF\i}; \node[right] at (\x, 2.5) {$J_\i$};
    \node[right] at (\x, 0.5) {$K_\i$}; \node[right] at (\x+0.2, 1.5) {$C$};
    \draw (\x, 1.7) -- (\x+0.2, 1.5) -- (\x, 1.3);
    \draw[thick, fill=white] (\x-0.1, 1.5) circle (0.1);
    \node[below right, inner sep=2pt] at (\x+1.8, 2.5) {$Q_\i$};
    \node[above] at (\x+0.9, 0) {$CLR$};
    \draw[thick, fill=white] (\x+0.9, -0.1) circle (0.1);
}
\node[left] at (-1.5, 4) {HIGH}; \draw (-1.5, 4) -- (10.0, 4);
\foreach \x in {0, 3.5, 7.0, 10.5} {
    \draw (\x-0.4, 4) -- (\x-0.4, 0.5) -- (\x, 0.5);
    \fill (\x-0.4, 4) circle (2pt);
    \draw (\x-0.4, 2.5) -- (\x, 2.5);\fill (\x-0.4, 2.5) circle (2pt);}\node[left] at (-1.5, 1.5) {CLK};\draw (-1.5, 1.5) -- (-0.2, 1.5);\fill (-0.8, 1.5) circle (2pt);\draw[thick] (-0.8, 1.5) -- (-0.8, -1.5) -- (7.0, -1.5);\draw[thick, fill=white] (7.0, -1.2) -- (7.0, -1.8) -- (7.5, -1.5) -- cycle;\draw[thick, fill=white] (7.6, -1.5) circle (0.1);\draw (7.7, -1.5) -- (14.1, -1.5) -- (14.1, 1.1) -- (14.5, 1.1);\draw (0.9, -0.2) -- (0.9, -0.6);\draw (4.4, -0.2) -- (4.4, -0.6);\draw (4.4, -0.6) -- (-1.2, -0.6) -- (-1.2, 4);\fill (-1.2, 4) circle (2pt);\fill (0.9, -0.6) circle (2pt);\draw (1.8, 2.5) -- (2.6, 2.5) -- (2.6, 1.5) -- (3.3, 1.5);\draw (5.3, 2.5) -- (6.1, 2.5) -- (6.1, 1.5) -- (6.8, 1.5);\draw (8.8, 2.5) -- (9.2, 2.5);\fill (9.2, 2.5) circle (2pt);\draw (9.2, 2.5) -- (9.6, 2.5) -- (9.6, 1.5) -- (10.3, 1.5);\draw (9.2, 2.5) -- (9.2, 3.7) -- (12.8, 3.7);\draw (12.3, 2.5) -- (12.5, 2.5) -- (12.5, 3.3) -- (12.8, 3.3);\draw[thick, fill=white] (12.8, 3.1) -- (12.8, 3.9) -- (13.2, 3.9) arc (90:-90:0.4) -- cycle;\draw[thick, fill=white] (13.7, 3.5) circle (0.1);\node[above] at (13.2, 4.0) {12 decoder};\draw (13.8, 3.5) -- (14.5, 3.5);\draw[thick, fill=white] (14.5, 2.7) -- (14.5, 3.7) -- (15.0, 3.7) arc (90:-90:0.5) -- cycle;\draw[thick, fill=white] (15.6, 3.2) circle (0.1);\draw[thick, fill=white] (14.5, 0.9) -- (14.5, 1.9) -- (15.0, 1.9) arc (90:-90:0.5) -- cycle;\draw[thick, fill=white] (15.6, 1.4) circle (0.1);\draw (15.7, 3.2) -- (16.0, 3.2);\fill (15.9, 3.2) circle (2pt);\draw (15.9, 3.2) -- (14.3, 1.7) -- (14.5, 1.7);\draw (15.7, 1.4) -- (16.0, 1.4);\fill (15.9, 1.4) circle (2pt);\draw (15.9, 1.4) -- (14.3, 2.9) -- (14.5, 2.9);\draw (16.0, 3.2) -- (16.5, 3.2) -- (16.5, -0.9) -- (7.9, -0.9);\node[above] at (16.0, -0.9) {$\overline{CLR}$};\draw (7.9, -0.2) -- (7.9, -0.9);\draw (11.4, -0.2) -- (11.4, -0.9);\fill (11.4, -0.9) circle (2pt);\end{tikzpicture}\end{document}
```

This 12-module counter is designed differently with JK-FFs instead of D-FFs, and the end signal is generated by a **SR latch** instead of simply using NAND gates. It is noticed that, by introducing the SR latch, in the CLK cycle when the counter reaches 12, the former part of the CLK cycle will remain 12 in counter, and the latter part of the CLK cycle will reset the counter to 0. 

However, why we still substitute the NAND gate with a SR latch? The reason is different propagation delay of each JK-FFs. Suppose when a end signal is generated, only the fourth JK-FFs complete the state transition. In this state, the output of the counter is 8, and the end signal will not continue anymore, since current state of the counter is not 12. This will cause the counter to be stuck at 8, which is a problem. By using a SR latch, we can ensure that once the end signal is generated, it will remain high until the counter is reset to 0, thus preventing the counter from being stuck at an incorrect state.

```tikz
\usepackage{tikz}\begin{document}\begin{tikzpicture}[>=latex, font=\normalsize]\foreach \i/\x in {0/0, 1/3.5, 2/7.0, 3/10.5} {\draw[thick, fill=white] (\x, 0) rectangle (\x+1.8, 3);\node[right] at (\x+0.1, 2.5) {$J_\i$};\node[right] at (\x+0.1, 0.5) {$K_\i$};\node[right] at (\x+0.2, 1.5) {$C$};\draw (\x, 1.7) -- (\x+0.2, 1.5) -- (\x, 1.3);\draw[thick, fill=white] (\x-0.1, 1.5) circle (0.1);\node[above] at (\x+0.9, 0) {$CLR$};\draw[thick, fill=white] (\x+0.9, -0.1) circle (0.1);}\draw (-3.5, 1.5) -- (-0.2, 1.5);\node[left, magenta] at (-3.5, 1.5) {CLK A};\node[above right, inner sep=1pt] at (-3.5, 1.5) {(14)};\draw (-3.5, 3.5) -- (2.8, 3.5) -- (2.8, 1.5) -- (3.3, 1.5);\node[left, magenta] at (-3.5, 3.5) {CLK B};\node[above right, inner sep=1pt] at (-3.5, 3.5) {(1)};\draw (1.8, 2.5) -- (2.5, 2.5) -- (2.5, -2.5);\node[below, magenta] at (2.5, -2.5) {$Q_0$};\node[below, magenta] at (2.5, -3.0) {(LSB)};\node[right] at (2.5, -1.8) {(12)};\draw (5.3, 2.5) -- (6.0, 2.5) -- (6.0, -2.5);\draw (6.0, 1.5) -- (6.8, 1.5);\fill (6.0, 1.5) circle (2pt);\node[below, magenta] at (6.0, -2.5) {$Q_1$};\node[right] at (6.0, -1.8) {(9)};\draw (8.8, 2.5) -- (9.5, 2.5) -- (9.5, -2.5);\draw (9.5, 1.5) -- (10.3, 1.5);\fill (9.5, 1.5) circle (2pt);\node[below, magenta] at (9.5, -2.5) {$Q_2$};\node[right] at (9.5, -1.8) {(8)};\draw (12.3, 2.5) -- (13.0, 2.5) -- (13.0, -2.5);\node[below, magenta] at (13.0, -2.5) {$Q_3$};\node[below, magenta] at (13.0, -3.0) {(MSB)};\node[right] at (13.0, -1.8) {(11)};\draw[thick] (-2, -1) -- (-2, 0) -- (-1.2, 0) arc (90:-90:0.5) -- cycle;\draw[thick, fill=white] (-0.6, -0.5) circle (0.1);\draw (-3.5, -0.2) -- (-2, -0.2);\draw (-3.5, -0.8) -- (-2, -0.8);\node[left, magenta] at (-3.5, -0.2) {$RO(1)$};\node[above right, inner sep=1pt] at (-3.5, -0.2) {(2)};\node[left, magenta] at (-3.5, -0.8) {$RO(2)$};\node[above right, inner sep=1pt] at (-3.5, -0.8) {(3)};\draw (-0.5, -0.5) -- (11.4, -0.5) -- (11.4, -0.2);\draw (0.9, -0.5) -- (0.9, -0.2);\draw (4.4, -0.5) -- (4.4, -0.2);\draw (7.9, -0.5) -- (7.9, -0.2);\fill (0.9, -0.5) circle (2pt);\fill (4.4, -0.5) circle (2pt);\fill (7.9, -0.5) circle (2pt);\node[below, magenta] at (0.9, -0.6) {$\overline{CLR}$};\end{tikzpicture}\end{document}
```

The figure above shows the structure of 74HC93, which is a classic 16-modulo asynchronous counter. This chip is consist actually of two separate counters: a 1-bit binary counter (the first four JK-FFs) and a 3-bit binary counter (the last three JK-FFs).

For clear inputs, the chip provides two separate clear inputs: `RO(1)` for the first counter and `RO(2)` for the second counter and they are connected to active-LOW clear inputs of each JK-FF with a NAND gate.

### Synchronous Counter

Asynchronous counters have the disadvantages of glitches and cascaded propagation delay, which can be solved by using synchronous counters.

```tikz
\usepackage{tikz}\begin{document}\begin{tikzpicture}[>=latex, font=\normalsize]\foreach \i/\x in {0/0, 1/3.5, 2/7.0, 3/10.5} {\draw[thick, fill=white] (\x, 0) rectangle (\x+1.8, 3);\node[above] at (\x+0.9, 3) {FF\i};\node[right] at (\x, 2.5) {$J_\i$};\node[right] at (\x, 0.5) {$K_\i$};\node[right] at (\x+0.2, 1.5) {$C$};\draw (\x, 1.7) -- (\x+0.2, 1.5) -- (\x, 1.3);\node[above right, inner sep=1pt] at (\x+1.8, 2.5) {$Q_\i$};}\node[left] at (-0.5, 3.5) {HIGH};\draw (-0.5, 3.5) -- (-0.5, 0.5) -- (0, 0.5);\draw (-0.5, 2.5) -- (0, 2.5);\fill (-0.5, 2.5) circle (2pt);\node[left] at (-1.5, -1.0) {CLK};\draw (-1.5, -1.0) -- (10.3, -1.0);\foreach \x in {0, 3.5, 7.0, 10.5} {\draw (\x-0.3, -1.0) -- (\x-0.3, 1.5) -- (\x, 1.5);\fill (\x-0.3, -1.0) circle (2pt);}\draw (1.8, 2.5) -- (3.0, 2.5) -- (3.5, 2.5);\draw (3.0, 2.5) -- (3.0, 0.5) -- (3.5, 0.5);\fill (3.0, 2.5) circle (2pt);\draw (2.4, 2.5) -- (2.4, 4.2) -- (6.0, 4.2);\fill (2.4, 2.5) circle (2pt);\draw (5.3, 2.5) -- (5.6, 2.5) -- (5.6, 3.8) -- (6.0, 3.8);\draw[thick, fill=white] (6.0, 3.7) -- (6.4, 3.7) arc (-90:90:0.3) -- (6.0, 4.3) -- cycle;\draw (6.7, 4.0) -- (6.8, 4.0) -- (6.8, 2.5) -- (7.0, 2.5);\draw (6.8, 2.5) -- (6.8, 0.5) -- (7.0, 0.5);\fill (6.8, 2.5) circle (2pt);\draw (6.8, 4.0) -- (6.8, 4.2) -- (9.5, 4.2);\fill (6.8, 4.0) circle (2pt);\draw (8.8, 2.5) -- (9.1, 2.5) -- (9.1, 3.8) -- (9.5, 3.8);\draw[thick, fill=white] (9.5, 3.7) -- (9.9, 3.7) arc (-90:90:0.3) -- (9.5, 4.3) -- cycle;\draw (10.2, 4.0) -- (10.3, 4.0) -- (10.3, 2.5) -- (10.5, 2.5);\draw (10.3, 2.5) -- (10.3, 0.5) -- (10.5, 0.5);\fill (10.3, 2.5) circle (2pt);\draw (12.3, 2.5) -- (13.0, 2.5);\end{tikzpicture}\end{document}
```

Above is the structure of a 16-modulo synchronous counter. It is noticed that the clock signal is directly connected to **all** flip-flops, which means that all flip-flops are triggered simultaneously. The combinational logic network is used to generate the J and K inputs for each flip-flop based on the current state of the counter, ensuring that the counter counts correctly without any glitches or propagation delay issues.

For example, if we want to construct a 12-modulo synchronous counter, the end signal is generated in status 11.

Classic synchronous counters include 74HC161, 74HC163, and 74HC193. Some new inputs include:
- $\overline{LOAD}$ (**synchronous**): active-LOW load input, which can be used to load a specific value into the counter.
- $\overline{CLR}$ (asynchronous): active-LOW clear input, which can be used to reset the counter to zero.
- $\overline{ENP}$ (asynchronous), or **enable parallel** pin only controls the internal counting logic. It determines whether the flip-flops are allowed to change state. It has absolutely no effect on the RCO pin.
- $\overline{ENT}$ (asynchronous), or **enable trickle** pin, controls the internal counting logic and also gates the RCO.
- $\overline{RCO}$ (asynchronous): active-LOW ripple carry output, which indicates when the counter has reached its maximum count and is about to roll over to zero. This can be used for cascading multiple counters together to create a larger counter.
