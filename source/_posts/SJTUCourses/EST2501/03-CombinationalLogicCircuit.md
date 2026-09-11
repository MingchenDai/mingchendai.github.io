---
title: "EST2501 Digital Fundamentals (3): Combinational Logic Circuits"
date: 2026-05-23 22:10:14
tags:
- Electronics
- Notes
- SJTU Courses
categories: Exploration
mathjax: true
tikzjax: true
---

In this part, we will discuss the basic applications and combinations of logic gates, which are called **combinational logic circuits**. These circuits take multiple input signals and produce output signals based on the combination of the inputs, without any memory or feedback loops. How to design and simplify the circuit in convenience of combination and cascading will be the main focus of this part.

<!--more-->

> Collections of **EST2501 Digital Electronics** notes:
>
> 1. [*Digital Fundamentals*](../01-DigitalFundamentals);
> 2. [*Logical Fundamentals*](../02-LogicalFundamentals);
> 3. [*Combinational Logic Circuit*](../03-CombinationalLogicCircuit) (this article);
> 4. [*Sequential Logic Circuit*](../04-SequentialLogicCircuit).
>
> You can find a general introduction to this course in the first article of this series.

## Adders

### Half Adder

```tikz
\usetikzlibrary{decorations.pathreplacing}
\begin{document}
\begin{tikzpicture}[thick]
\draw (0,0) rectangle (2.5,3.5);
\node at (1.25, 3) {\Large $\Sigma$};
\draw (-1, 2.5) -- (0, 2.5); \node[right] at (0.1, 2.5) {$A$};
\draw (-1, 1) -- (0, 1); \node[right] at (0.1, 1) {$B$};
\draw (2.5, 2.5) -- (3.5, 2.5) node[right, magenta] {Sum}; \node[left] at (2.4, 2.5) {$\Sigma$};
\draw (2.5, 1) -- (3.5, 1) node[right, magenta] {Carry}; \node[left] at (2.4, 1) {$C_{\mathrm{out}}$};
\draw[decorate, decoration={brace, amplitude=6pt}, magenta] (-1.2, 0.8) -- (-1.2, 2.7) node[midway, left=8pt] {Input bits};
\draw[decorate, decoration={brace, amplitude=6pt}, magenta] (4.6, 2.7) -- (4.6, 0.8) node[midway, right=8pt] {Outputs};
\end{tikzpicture}
\end{document}
```

The figure above is the loigc symbol of a **half adder**. It takes two input bits $A$ and $B$, and produces a sum bit $\Sigma=A \oplus B$ and a carry bit $C_{\mathrm{out}}=A \cdot B$. 

In other words, the sum bit is the result of adding $A$ and $B$ without considering any carry from previous bits, while the carry bit indicates whether there is an overflow that needs to be carried to the next higher bit.

With analysis above, the sum and carry bit output can be implemented by an XOR gate and an AND gate respectively. The logic diagram is shown below.

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\draw (0,0.4) -- (2.2,0.4);
\draw (0,-0.4) -- (2.2,-0.4);
\fill (0.8,0.4) circle (0.08);
\draw (0.8,0.4) -- (0.8,2.9) -- (2.26,2.9);
\fill (1.4,-0.4) circle (0.08);
\draw (1.4,-0.4) -- (1.4,2.1) -- (2.23,2.1);
\draw[very thick] (2.2,-0.8) -- (2.8,-0.8) arc(-90:90:0.8) -- (2.2,0.8) -- cycle;
\draw (3.6,0) -- (4.8,0);
\draw[very thick] (1.9,1.5) to[bend right=25] (1.9,3.5);
\draw[very thick] (2.1,1.5) to[bend right=25] (2.1,3.5) .. controls (3.3,3.5) and (4.0,3.0) .. (4.3,2.5) .. controls (4.0,2.0) and (3.3,1.5) .. (2.1,1.5);
\draw (4.3,2.5) -- (4.8,2.5);
\node[left, red!80!black, font=\Large] at (-0.2,0.4) {$A$};
\node[left, red!80!black, font=\Large] at (-0.2,-0.4) {$B$};
\node[right, red!80!black, font=\Large] at (4.9,2.5) {$\Sigma = A \oplus B$};
\node[right, red!80!black, font=\Large] at (4.9,0) {$C_{\mathrm{out}} = AB$};
\end{tikzpicture}
\end{document}
```

### Full Adder

The spirit of designing combinational logic circuits is to break down a complex circuit into smaller, simpler components and to cascade them together.

For a half adder, it can only add two bits and produce a sum and a carry bit; so it is difficult to cascade them to add multiple bits together. To solve this problem, we can design a **full adder** that takes three input bits: $A$, $B$, and $C_{\mathrm{in}}$ (carry from the previous bit), and produces a sum bit $\Sigma$ and a carry bit $C_{\mathrm{out}}$.

```tikz
\usetikzlibrary{decorations.pathreplacing}
\begin{document}
\begin{tikzpicture}[thick]
\draw (0,0) rectangle (2.5,4);
\node at (1.25, 3.5) {\Large $\Sigma$};
\draw (-1, 3) -- (0, 3); \node[right] at (0.1, 3) {$A$};
\draw (-1, 2) -- (0, 2); \node[right] at (0.1, 2) {$B$};
\draw (-1, 0.5) -- (0, 0.5); \node[right] at (0.1, 0.5) {$C_{\mathrm{in}}$};
\draw (2.5, 2.5) -- (3.5, 2.5) node[right, magenta] {Sum}; \node[left] at (2.4, 2.5) {$\Sigma$};
\draw (2.5, 1) -- (3.5, 1) node[right, magenta] {Output carry}; \node[left] at (2.4, 1) {$C_{\mathrm{out}}$};
\draw[decorate, decoration={brace, amplitude=6pt}, magenta] (-1.2, 1.8) -- (-1.2, 3.2) node[midway, left=8pt, align=center] {Input\\bits};
\node[left, magenta] at (-1.2, 0.5) {Input carry};
\end{tikzpicture}
\end{document}
```

The above figure shows the logic symbol of a full adder. The sum bit can be expressed as $\Sigma = A \oplus B \oplus C_{\mathrm{in}}$, and the carry bit can be expressed as $C_{\mathrm{out}} = AB + AC_{\mathrm{in}} + BC_{\mathrm{in}}$.

So, the full adder can be implemented either by using XOR, OR and AND gates, or by using two half adders and an OR gate.

### Parallel Adder

With the implement of the full adder, we can cascade them together to design a multi-bit parallel adder. The inputs of each full adder are the corresponding bits of the two numbers to be added, and the carry from the previous full adder. The outputs are the sum bits and the final carry out. A sample 4-bbit parallel adder is shown below.



The parallel provides input and output for carry bits, so it can also be cascaded together to design an adder for even more bits. For instance, with the 4-bit parallel adder above, 8-bit and 16-bit adders can be designed by cascading two and four of the 4-bit adders together respectively.

```tikz
\usetikzlibrary{decorations.pathreplacing}
\begin{document}
\begin{tikzpicture}[thick, var/.style={text=red!80!black}]
\draw[very thick] (0, 0) rectangle (5.2, 3);
\foreach \x/\inner/\outer in {0.8/4/8, 1.3/3/7, 1.8/2/6, 2.3/1/5} {
    \draw (\x, 3) -- (\x, 4.5) node[above, var] {$B_\outer$};
    \node at (\x, 2.7) {\inner};
}
\draw[decorate, decoration={brace, amplitude=4pt, mirror}] (0.7, 2.5) -- (2.4, 2.5) node[midway, below=4pt] {$B$};
\foreach \x/\inner/\outer in {3.0/4/8, 3.5/3/7, 4.0/2/6, 4.5/1/5} {
    \draw (\x, 3) -- (\x, 4.5) node[above, var] {$A_\outer$};
    \node at (\x, 2.7) {\inner};
}
\draw[decorate, decoration={brace, amplitude=4pt, mirror}] (2.9, 2.5) -- (4.6, 2.5) node[midway, below=4pt] {$A$};
\foreach \x/\inner/\outer in {1.8/4/8, 2.3/3/7, 2.8/2/6, 3.3/1/5} {
    \draw (\x, 0) -- (\x, -1.5) node[below, var] {$\Sigma_\outer$};
    \node at (\x, 0.3) {\inner};
}
\draw[decorate, decoration={brace, amplitude=4pt}] (1.7, 0.5) -- (3.4, 0.5) node[midway, above=4pt] {$\Sigma$};
\node[right] at (0.1, 0.3) {$C_{\mathrm{out}}$};
\draw (0.5, 0) -- (0.5, -1.5) node[below, var] {$C_8$};
\node[left] at (5.1, 2.5) {$C_{\mathrm{in}}$};
\draw[very thick] (6, 0) rectangle (11.2, 3);
\foreach \x/\inner/\outer in {6.8/4/4, 7.3/3/3, 7.8/2/2, 8.3/1/1} {
    \draw (\x, 3) -- (\x, 4.5) node[above, var] {$B_\outer$};
    \node at (\x, 2.7) {\inner};
}
\draw[decorate, decoration={brace, amplitude=4pt, mirror}] (6.7, 2.5) -- (8.4, 2.5) node[midway, below=4pt] {$B$};
\foreach \x/\inner/\outer in {9.0/4/4, 9.5/3/3, 10.0/2/2, 10.5/1/1} {
    \draw (\x, 3) -- (\x, 4.5) node[above, var] {$A_\outer$};
    \node at (\x, 2.7) {\inner};
}
\draw[decorate, decoration={brace, amplitude=4pt, mirror}] (8.9, 2.5) -- (10.6, 2.5) node[midway, below=4pt] {$A$};
\foreach \x/\inner/\outer in {7.8/4/4, 8.3/3/3, 8.8/2/2, 9.3/1/1} {
    \draw (\x, 0) -- (\x, -1.5) node[below, var] {$\Sigma_\outer$};
    \node at (\x, 0.3) {\inner};
}
\draw[decorate, decoration={brace, amplitude=4pt}] (7.7, 0.5) -- (9.4, 0.5) node[midway, above=4pt] {$\Sigma$};
\node[right] at (6.1, 0.3) {$C_{\mathrm{out}}$};
\node[left] at (11.1, 2.5) {$C_{\mathrm{in}}$};
\draw (6.5, 0) -- (6.5, -0.6) -- (5.6, -0.6) -- (5.6, 2.5) -- (5.2, 2.5);
\draw (11.2, 2.5) -- (11.8, 2.5);
\draw (11.8, 2.5) -- (11.8, 3.2) node[above, var] {$C_0$};
\draw (11.8, 2.5) -- (11.8, 1.8);
\draw[very thick] (11.5, 1.8) -- (12.1, 1.8);
\draw[very thick] (11.65, 1.65) -- (11.95, 1.65);
\draw[very thick] (11.75, 1.5) -- (11.85, 1.5);
\end{tikzpicture}
\end{document}
```

### Carry Look-Ahead Adder

Cascading brings wonderful expansion capability for adders, but it also brings a critical problem: the carry bit has to **propagate** through all the full adders, which leads to a long delay for the final sum and carry outputs. With the expansion of the number of cascaded full adders, the delay can be even more significant.

To solve this problem, define the **carry generation bit** $G_i = A_i B_i$ and the **carry propagation bit** $P_i = A_i \oplus B_i$. Then, the carry out of each full adder can be expressed as $C_{i+1} = G_i + P_i C_i$.

With this expression, the carry out of each full adder can be calculated in parallel without waiting for the carry to propagate through all the previous full adders, and each bit of the sum can also be calculated in form of the production and sum of input bits by expanding the expression of $C_i$ recursively. This design is called **carry look-ahead adder**.

74LS283 is a classical 4-bit carry look-ahead adder integrated circuit, which can be used to design adders for more bits by cascading together.

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\draw (0,0) -- (9,0) -- (9,2.5) -- (0,2.5) -- (0,1.55) arc(90:-90:0.3) -- cycle;
\foreach \x/\num/\lbl in {1/1/\Sigma_2, 2/2/B_2, 3/3/A_2, 4/4/\Sigma_1, 5/5/A_1, 6/6/B_1, 7/7/C_0, 8/8/\mathrm{GND}} {
    \draw (\x, 0) -- (\x, -0.5);
    \node[below] at (\x, -0.5) {$\lbl$};
    \node[above] at (\x, 0.05) {\num};
}
\foreach \x/\num/\lbl in {8/9/C_4, 7/10/\Sigma_4, 6/11/B_4, 5/12/A_4, 4/13/\Sigma_3, 3/14/A_3, 2/15/B_3, 1/16/V_{\mathrm{CC}}} {
    \draw (\x, 2.5) -- (\x, 3.0);
    \node[above] at (\x, 3.0) {$\lbl$};
    \node[below] at (\x, 2.45) {\num};
}
\end{tikzpicture}
\end{document}
```

## Comparator

The comparasion of single bits can be implemented by a simple XOR gate, which outputs 0 if the two bits are equal and 1 if they are different.

For nulti-bit comparasion, by listing the truth table, a circuit can be easily designed. The below is the logic structure of a  classic 74HC85 4-bit comparator integrated circuit, which provided 3 inputs for previous comparasion results to support cascading together for more bits.

```tikz
\usetikzlibrary{decorations.pathreplacing}
\begin{document}
\begin{tikzpicture}[thick]
\draw[very thick] (0, 0.5) rectangle (3.5, 9);
\node[font=\Large] at (1.75, 8.5) {COMP};
\foreach \y/\pin in {8.0/(10), 7.4/(12), 6.8/(13), 6.2/(15)} {
    \draw (-1, \y) -- (0, \y);
    \node[left] at (-1, \y) {\pin};
}
\node[right] at (0, 8.0) {0};
\node[right] at (0, 6.2) {3};
\draw[decorate, decoration={brace, amplitude=5pt, mirror}] (0.4, 6.1) -- (0.4, 8.1) node[midway, right=5pt] {$A$};
\foreach \y/\pin/\lbl in {5.2/(4)/A>B, 4.6/(3)/A=B, 4.0/(2)/A<B} {
    \draw (-1, \y) -- (0, \y);
    \node[left] at (-1, \y) {\pin};
    \node[right] at (0, \y) {$\lbl$};
}
\draw[decorate, decoration={brace, amplitude=5pt}, red!70!black] (-1.9, 3.9) -- (-1.9, 5.3) node[midway, left=5pt, align=center] {Cascading\\inputs};
\foreach \y/\pin in {3.0/(9), 2.4/(11), 1.8/(14), 1.2/(1)} {
    \draw (-1, \y) -- (0, \y);
    \node[left] at (-1, \y) {\pin};
}
\node[right] at (0, 3.0) {0};
\node[right] at (0, 1.2) {3};
\draw[decorate, decoration={brace, amplitude=5pt, mirror}] (0.4, 1.1) -- (0.4, 3.1) node[midway, right=5pt] {$B$};
\foreach \y/\pin/\lbl in {5.2/(5)/A>B, 4.6/(6)/A=B, 4.0/(7)/A<B} {
    \draw (3.5, \y) -- (4.5, \y);
    \node[right] at (4.5, \y) {\pin};
    \node[left] at (3.5, \y) {$\lbl$};
}
\draw[decorate, decoration={brace, amplitude=5pt, mirror}, red!70!black] (5.2, 3.9) -- (5.2, 5.3) node[midway, right=5pt] {Outputs};

% Power & GND
\node[anchor=south west, inner sep=2pt] at (3.5, 0.5) {$V_{\mathrm{CC}}(16)$, GND(8)};

\end{tikzpicture}
\end{document}
```

Cascading them is easy - just connect the outputs of one comparator to the cascading inputs of the next comparator, and the final comparasion result can be obtained from the outputs of the last comparator. With this design, comparators for more bits can be easily designed by cascading together more comparators.

## Decoder

The name of decoder is a bit confusing, and in my opinion it should be called as a **selector**. With input in binary code, it selects one of the output lines to be active (1) and all the other output lines to be inactive (0). The figure below shows the logic symbol of a 4-to-16 line decoder, which takes 4 input bits and produces 16 output lines, with only one of them being active at a time.

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\draw (0, 1) rectangle (3, -8.5);
\node[font=\large] at (1.5, 0.4) {BIN/DEC};
\foreach \lbl/\y in {1/-3.2, 2/-3.9, 4/-4.6, 8/-5.3} {
    \draw (-1.2, \y) -- (0, \y);
    \node[right] at (0.1, \y) {\lbl};
}
\foreach \i in {0,...,15} {
    \def\y{-0.5 * \i}
    \node[left] at (2.9, \y) {\i};
    \draw (3.1, \y) circle (0.1);
    \draw (3.2, \y) -- (4.4, \y);
}
\end{tikzpicture}
\end{document}
```

In this figure and maybe the following ones, the circles on the input or output lines should be paid attention to. They indicate that the signal is active low, which means that the line is **active** when it is at **logic level 0**, and **inactive** when it is at **logic level 1**. This is a common convention in digital logic design, and it can be used to **simplify** the circuit design and **reduce power consumption**.

Another thing to be noticed is single or multiple **enable inputs**. The enable input is used to control whether the decoder is active or not.
- When the enable input is active, the decoder will function normally and produce the output based on the input bits.
- When the enable input is inactive, the decoder will ignore the input bits and keep all the output lines inactive.

In decoders, 138 series have 3 enable inputs, while 154 series have only 2 enable input. Take 74LS138 as an example, it has one active-high enable input (G1) and two active-low enable inputs (G2A and G2B). The decoder will only produce an active output when G1 is high and both G2A and G2B are low, i.e., $\text{EN}=\text{G1} \cdot \overline{\text{G2A}} \cdot \overline{\text{G2B}}$. This allows for more complex control logic to be implemented when using the decoder in a larger circuit.

In 154 series, there are only two active-low enable inputs (G1 and G2), and the decoder will produce an active output when both G1 and G2 are low, i.e., $\text{EN}=\overline{\text{G1}} \cdot \overline{\text{G2}}$. This design is simpler than the 138 series, but it may require additional logic gates to implement more complex control logic.

The enable input is useful for expansion. For instance, to construct a 5-to-32 line decoder, two 4-to-16 line decoders can be used together. The 5th input bit can be used as the enable input for the two decoders, so that when the 5th bit is 0, the first decoder is enabled and produces outputs for the lower 16 lines, and when the 5th bit is 1, the second decoder is enabled and produces outputs for the upper 16 lines.

Decoders are fundamental building blocks in digital logic design, and they are widely used in various applications such as memory address decoding, data multiplexing, BCD -to-decimal decoding and 7-segment display driving.

## Encoder and Priority Encoder

Encoder accepts input in the form of an activation signal in exactly one of the input lines, and produces output in binary code corresponding to the active input line. 

However, if the input is not valid, i.e., there are zero or more than one active input lines, the output is undefined. To solve this problem, a **priority encoder** can be designed, which assigns priority to the input lines and produces output corresponding to the highest priority active input line.

For instance, in a 4-to-2 line priority encoder, if both input lines 0 and 1 are active, the output will correspond to input line 1 because it has higher priority than input line 0. If only input line 0 is active, the output will correspond to input line 0. If no input lines are active, the output can be defined as a specific value (e.g., all zeros) or can be left undefined depending on the design requirements.

```tikz
\begin{document}
\begin{tikzpicture}[thick]
\draw[very thick] (0, 0.5) rectangle (3.0, 7.5);
\node[align=center] at (1.5, 7.1) {HPRI/BIN};
\draw (1.5, 7.5) -- (1.5, 8.5) node[above] {$V_{\mathrm{CC}}$};
\node[above right, inner sep=2pt] at (1.5, 7.5) {(16)};
\draw (1.5, 0.5) -- (1.5, -0.5) node[below] {GND};
\node[below right, inner sep=2pt] at (1.5, 0.5) {(8)};
\foreach \y/\lbl/\pin in {6.5/\textit{EI}/(5), 5.8/0/(10), 5.1/1/(11), 4.4/2/(12), 3.7/3/(13), 3.0/4/(1), 2.3/5/(2), 1.6/6/(3), 0.9/7/(4)} {
    \draw (-1.5, \y) -- (-0.15, \y);
    \draw (-0.075, \y) circle (0.075);
    \node[right] at (0.05, \y) {\lbl};
    \node[above] at (-0.8, \y) {\pin};
}
\foreach \y/\lbl/\pin in {6.5/\textit{EO}/(15), 5.8/\textit{GS}/(14)} {
    \draw[fill=white] (3.075, \y) circle (0.075);
    \draw (3.15, \y) -- (4.6, \y);
    \node[left] at (2.95, \y) {\lbl};
    \node[above] at (3.9, \y) {\pin};
}
\foreach \y/\lbl/\pin/\redlbl in {5.1/1/(9)/\overline{A}_0, 4.4/2/(7)/\overline{A}_1, 3.7/4/(6)/\overline{A}_2} {
    \draw (3.075, \y) circle (0.075);
    \draw (3.15, \y) -- (4.6, \y) node[right, red!80!black] {$\redlbl$};
    \node[left] at (2.95, \y) {\lbl};
    \node[above] at (3.9, \y) {\pin};
}
\end{tikzpicture}
\end{document}
```

The figure above shows the logic symbol of classic 74F148 8-to-3 line priority encoder integrated circuit, which has 8 input lines and produces a 3-bit binary code corresponding to the highest priority active input line. It also has an enable input (EI) and an output valid signal (EO) to indicate whether the output is valid or not.

The priority is assigned from the highest input line (7) to the lowest input line (0), meaning that if multiple input lines are active, the output will correspond to the highest numbered active input line. For example, if input lines 3 and 5 are active, the output will correspond to input line 5 because it has higher priority than input line 3. If only input line 2 is active, the output will correspond to input line 2.

If no input lines are active, the output will be all HIGHs and the output valid signal (EO) will be LOW, indicating that the output is not valid. The enable input (EI) can be used to control whether the priority encoder is active or not. When EI is not activated, the priority encoder will ignore the input lines and produce an output of all HIGHs.

The chip also provides a GS (Group Select) output, which is active low when any of the input lines are active. This can be used for cascading multiple priority encoders together to create a larger priority encoder with more input lines. For example, two 8-to-3 line priority encoders can be cascaded together to create a 16-to-4 line priority encoder, where the GS output of the first encoder is connected to the EI input of the second encoder.

## Multiplexer and Demultiplexer

A **multiplexer** (MUX) is a combinational logic circuit that selects one of several input signals and forwards the selected input to a single output line. The selection of the input signal is controlled by a set of selection lines.

```tikz
\usetikzlibrary{decorations.pathreplacing}
\begin{document}
\begin{tikzpicture}[thick]
\draw[very thick] (0, -0.5) rectangle (2.5, 8);
\draw (-1.5, 0) -- (-0.15, 0);
\draw[fill=white] (-0.075, 0) circle (0.075);
\node[left, text=red!80!black] at (-1.5, 0) {$\overline{EN}$};
\node[above] at (-0.75, 0) {(7)};
\node[anchor=west] at (0.05, 0) {$EN$};
\foreach \y/\pin/\lbl/\inlbl in {
    6.0/(9)/S_2/2,
    6.6/(10)/S_1/1,
    7.2/(11)/S_0/0
} {
    \draw (-1.5, \y) -- (0, \y);
    \node[left, text=red!80!black] at (-1.5, \y) {$\lbl$};
    \node[above] at (-0.75, \y) {\pin};
    \node[anchor=west] at (0.05, \y) {\inlbl};
}
\draw[decorate, decoration={brace, amplitude=4pt,mirror}] (0.4, 5.8) -- (0.4, 7.4) node[midway, right=4pt] {$G\frac{0}{7}$};
\foreach \y/\pin/\lbl/\inlbl in {
    0.8/(12)/D_7/7,
    1.4/(13)/D_6/6,
    2.0/(14)/D_5/5,
    2.6/(15)/D_4/4,
    3.2/(1)/D_3/3,
    3.8/(2)/D_2/2,
    4.4/(3)/D_1/1,
    5.0/(4)/D_0/0
} {
    \draw (-1.5, \y) -- (0, \y);
    \node[left, text=red!80!black] at (-1.5, \y) {$\lbl$};
    \node[above] at (-0.75, \y) {\pin};
    \node[anchor=west] at (0.05, \y) {\inlbl};
}
\draw (2.5, 4.4) -- (4, 4.4);
\node[above] at (3.25, 4.4) {(5)};
\node[right, text=red!80!black] at (4, 4.4) {$Y$};
\draw[fill=white] (2.575, 3.8) circle (0.075);
\draw (2.65, 3.8) -- (4, 3.8);
\node[above] at (3.25, 3.8) {(6)};
\node[right, text=red!80!black] at (4, 3.8) {$\overline{Y}$};
\end{tikzpicture}
\end{document}
```

The figure above shows the logic symbol of a classic 74LS151 8-to-1 line multiplexer integrated circuit, which has 8 data input lines (D0 to D7), 3 selection lines (S0 to S2), an active-low enable input ($\overline{EN}$), and two outputs ($\text{Y}$ and $\overline{Y}$). 

When the enable input is active (i.e., $\overline{EN}$ is low), the multiplexer will select one of the 8 data inputs based on the binary value of the selection lines and output it on Y. The output $\overline{Y}$ will be the complement of Y. If the enable input is inactive (i.e., $\overline{EN}$ is high), both outputs will be inactive (Y will be low and $\overline{Y}$ will be high).

A **demultiplexer** (DEMUX) is the opposite of a multiplexer. It takes a single input signal and routes it to one of several output lines based on the values of selection lines. The figure below shows the logic symbol of a 1-to-8 line demultiplexer, which has one data input line, 3 selection lines, an active-low enable input, and 8 output lines.

The figure below shows how to construct a 1-to-16 line demultiplexer using a 4-16 line decoder.

```tikz
\usetikzlibrary{decorations.pathreplacing}
\begin{document}
\begin{tikzpicture}[thick]
\draw[very thick] (0, 0) rectangle (2.8, 12);
\node[below] at (1.4, 11.9) {DEMUX};
\foreach \i/\pin in {0/1, 1/2, 2/3, 3/4, 4/5, 5/6, 6/7, 7/8, 8/9, 9/10, 10/11, 11/13, 12/14, 13/15, 14/16, 15/17} {
    \pgfmathsetmacro{\y}{11.0 - 0.62*\i}
    \node[left] at (2.7, \y) {\i};
    \draw (2.875, \y) circle (0.075);
    \draw (2.95, \y) -- (4.2, \y);
    \node[above] at (3.6, \y) {(\pin)};
    \node[right, text=red!80!black] at (4.2, \y) {$\overline{D}_{\i}$};
}
\foreach \i/\pin/\y in {0/23/7.5, 1/22/6.7, 2/21/5.9, 3/20/5.1} {
    \draw (-1.5, \y) -- (0, \y);
    \node[above] at (-0.75, \y) {(\pin)};
    \node[left, text=red!80!black] at (-1.5, \y) {$S_\i$};
}
\node[right] at (0, 7.5) {0};
\node[right] at (0, 5.1) {3};
\draw[decorate, decoration={brace, amplitude=4pt, mirror}] (0.4, 4.9) -- (0.4, 7.7) node[midway, right=4pt] {$G\frac{0}{15}$};
\draw[decorate, decoration={brace, amplitude=5pt}, red!80!black] (-2.2, 4.9) -- (-2.2, 7.7) node[midway, left=5pt, align=center] {Data\\select\\lines};
\draw (0, 2) -- (1.2, 2) -- (1.2, 0);
\node at (0.3, 1.6) {\&};
\node at (2.0, 0.8) {$EN$};
\draw (-1.5, 1.4) -- (-0.15, 1.4);
\draw (-0.075, 1.4) circle (0.075);
\node[above] at (-0.75, 1.4) {(18)};
\draw (-1.1, 0.6) -- (-0.15, 0.6);
\draw (-0.075, 0.6) circle (0.075);
\node[above] at (-0.75, 0.6) {(19)};
\draw (-1.1, 0.6) -- (-1.1, 0.0);
\draw[very thick] (-1.4, 0.0) -- (-0.8, 0.0);
\draw[very thick] (-1.25, -0.15) -- (-0.95, -0.15);
\draw[very thick] (-1.15, -0.3) -- (-1.05, -0.3);
\node[left, text=red!80!black, align=center] at (-1.6, 1.0) {Data\\in};
\end{tikzpicture}
\end{document}
```

## Parity Generator and Parity Checker

**Even parity code** and **odd parity code** are used to detect errors in data transmission. A parity bit is added to a group of bits to make the total number of 1s either even or odd.Single parity code can only detect single-bit error.

We can describe the process of even parity generation as give out 1 if the serial does not have even number of 1s to make the total number of 1s even. In the other words, the even parity generator will generate 1 for those error codes (with odd number of 1s) and generate 0 for those correct codes (with even number of 1s).

As a result, an even parity generator can be considered as an odd parity checker, if we consider the output signal 1 as the true signal, and vice versa.