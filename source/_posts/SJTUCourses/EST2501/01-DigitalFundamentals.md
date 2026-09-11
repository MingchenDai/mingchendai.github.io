---
title: "EST2501 Digital Fundamentals (1): Digital Fundamentals"
date: 2026-05-23 22:10:12
tags:
- Electronics
- Notes
- SJTU Courses
categories: Exploration
mathjax: true
tikzjax: true
---

**Digital Electronics** is a fundamental course for electronics and computer engineering. The course, *Digital Electronics* with course code EST2501, is offered by SAIS at SJTU to grade 1 SEIEE students, accounting for 2 credits. Although either a CS or IE undergraduate at SJTU should take this course, I think you can grasp a better understanding of this course if you have some background in discrete mathematics and computer architecture, especially for contents related to number systems and signed numbers. In the other hand, such contents like flip-flops serve as an important role in memory, which is a main focus in architecture course.

Textbook for this course is *Digital Fundamentals* by Thomas L. Floyd, which is a widely used textbook for these courses. It is really a detailed textbook with precise illustrations and clear explanations. However, it is also quite lengthy and too detailed - learning with reading every page exactly as it is written is a little inefficient. Therefore, I recommend to read the textbook in a more flexible way: just skimming through examples, too detailed descriptions and explanations, and focus on the main concepts and principles.

However, this course does not contain all chapters of this textbook, and only chapter 1 - 9 are included in the syllabus. These chapters are summarized into four parts, corresponding to the four articles in this series of notes. The first two parts, *Digital Fundamentals* and *Logical Fundamentals*, introduce the basic concepts and principles of digital electronics, while the last two parts, *Combinational Logic Circuit* and *Sequential Logic Circuit*, focus on the design and analysis of digital circuits.

<!--more-->

> Collections of **EST2501 Digital Electronics** notes:
>
> 1. [*Digital Fundamentals*](../01-DigitalFundamentals) (this article);
> 2. [*Logical Fundamentals*](../02-LogicalFundamentals);
> 3. [*Combinational Logic Circuit*](../03-CombinationalLogicCircuit);
> 4. [*Sequential Logic Circuit*](../04-SequentialLogicCircuit).
>
> You can find a general introduction to this course in the first article of this series.

## Digital and Analog Quantities

- **Analog signal** is continuous in both time and amplitude.
- **Sampled signal** is continuous in amplitude but discrete in time.
- **Quantized signal** is discrete in both time and amplitude.

## Binary Digits, Logical Levels and Digital Waveforms

In digital electronics, there are only two possible states represented by different voltage levels: **HIGH** (true, 1) and **LOW** (false, 0).

> In some active-LOW systems, the HIGH and LOW levels are reversed, where HIGH represents false (0) and LOW represents true (1). However, in most cases and this course we will only focus on the active-HIGH systems.

### Logical Levels and Threshold Voltage

Ideally there should be only one voltage level for HIGH and one voltage level for LOW, but in practice there is always some noise and variation in the voltage levels. Therefore, in an actual digital circuit, a HIGH or LOW signal is defined as any voltage level that is above or below a certain **threshold voltage**, respectively. This allows for some tolerance in the voltage levels and ensures that the circuit can operate reliably even in the presence of noise.

In the picture beloew, $V_{\mathrm{L(min)}}$ and $V_{\mathrm{L(max)}}$ are the minimum and maximum voltage levels that can be considered as LOW, while $V_{\mathrm{H(min)}}$ and $V_{\mathrm{H(max)}}$ are the minimum and maximum voltage levels that can be considered as HIGH. The region between $V_{\mathrm{L(max)}}$ and $V_{\mathrm{H(min)}}$ is considered unacceptable because it may not be reliably interpreted as either HIGH or LOW.

```tikz
\begin{document}
\begin{tikzpicture}
\fill[green!20] (0,0) rectangle (4,2);
\fill[pink!50] (0,2) rectangle (4,4);
\fill[green!20] (0,4) rectangle (4,6);
\draw[-latex, very thick] (0,-0.5) -- (0,7);
\draw[very thick] (0,0) -- (4,0) (0,2) -- (4,2) (0,4) -- (4,4) (0,6) -- (4,6);
\node[left] at (-0.1,0) {$V_{\mathrm{L(min)}}$};
\node[left] at (-0.1,2) {$V_{\mathrm{L(max)}}$};
\node[left] at (-0.1,4) {$V_{\mathrm{H(min)}}$};
\node[left] at (-0.1,6) {$V_{\mathrm{H(max)}}$};
\node[align=center] at (2,1) {LOW\\(binary 0)};
\node[align=center] at (2,3) {Unacceptable};
\node[align=center] at (2,5) {HIGH\\(binary 1)};
\end{tikzpicture}
\end{document}
```

### Digital Waveform

**Digital waveforms** consist of voltage levels that are changing back and forth between the HIGH and LOW levels or states.

#### Ideal Waveform

The figure below shows an ideal digital positive-going waveform. In ideal waveform, the edge from LOW to HIGH is called a **rising edge**, while the edge from HIGH to LOW is called a **falling edge**.

```tikz
\begin{document}
\begin{tikzpicture}
\draw[cyan, very thick] (0,0) -- (2,0) -- (2,3) -- (6,3) -- (6,0) -- (7,0);
\node[magenta, left] at (-0.2,0) {LOW};
\node[magenta, left] at (-0.2,3) {HIGH};
\draw[dashed, thick] (-0.2,3) -- (2,3);
\node[below] at (2,0) {$t_0$};
\node[below] at (6,0) {$t_1$};
\node[align=left, left] (rise) at (1.5,1.5) {Rising or\\leading edge};
\draw[-latex] (rise) -- (1.95,2.5);
\node[align=left, right] (fall) at (6.5,1.5) {Falling or\\trailing edge};
\draw[-latex] (fall) -- (6.05,0.5);
\end{tikzpicture}
\end{document}
```

#### Real Waveform

In ideal waveform, the rising and falling edges are assumed to change in zero time. However, in real waveform, the edges are not vertical but sloped, and the time it takes for the signal to change from 10% LOW to 90% HIGH or from HIGH to LOW is called the **rise time** or **fall time**, respectively.  The time during which the pulse is over 50% of the amplitude is called the **pulse width**. 

```tikz
\begin{document}
\begin{tikzpicture}
\draw[dashed, thick] (-1,4) -- (7,4);
\draw[dashed, thick] (-1,0) -- (1,0);
\draw[latex-latex, magenta, thick] (-1,0) -- (-1,4) node[midway, fill=white] {Amplitude};
\node[magenta, below] at (-1,0) {Base line};
\draw[cyan, very thick] (0,0) to[out=0,in=250] (1,0.4) -- (2,3.6) to[out=70,in=180] (2.8,4.8) to[out=0,in=180] (3.4,3.4) to[out=0,in=180] (3.9,4.2) to[out=0,in=180] (4.4,3.7) to[out=0,in=180] (4.9,4.0) to[out=0,in=160] (7,3.6) -- (8,0.4) to[out=-70,in=180] (8.8,-0.8) to[out=0,in=180] (9.5,0.4) to[out=0,in=180] (10.1,-0.3) to[out=0,in=180] (10.6,0.1) to[out=0,in=180] (11,0);
\fill[cyan] (1,0.4) circle (0.1); \node[left] at (0.8,0.4) {10\%};
\fill[cyan] (1.5,2.0) circle (0.1); \node[left] at (1.3,2.0) {50\%};
\fill[cyan] (2,3.6) circle (0.1); \node[left] at (1.8,3.6) {90\%};
\fill[cyan] (7,3.6) circle (0.1);
\fill[cyan] (7.5,2.0) circle (0.1);
\fill[cyan] (8,0.4) circle (0.1);
\draw[dashed, thick] (1,0.4) -- (1,-1.2);
\draw[dashed, thick] (2,3.6) -- (2,-1.2);
\draw[latex-latex, magenta, thick] (1,-1) -- (2,-1) node[midway, below] {$t_r$};
\node[magenta, below] at (1.5,-1.6) {Rise time};
\draw[dashed, thick] (7,3.6) -- (7,-1.2);
\draw[dashed, thick] (8,0.4) -- (8,-1.2);
\draw[latex-latex, magenta, thick] (7,-1) -- (8,-1) node[midway, below] {$t_f$};
\node[magenta, below] at (7.5,-1.6) {Fall time};
\draw[latex-latex, magenta, thick] (1.5,2) -- (7.5,2) node[midway, above] {$t_w$} node[midway, below] {Pulse width};
\draw[-latex, magenta, thick] (3.8,5.4) node[right] {Overshoot} to[out=180,in=45] (2.8,4.8);
\draw[-latex, magenta, thick] (4.9,4.8) node[right] {Ringing} to[out=180,in=45] (3.9,4.2);
\draw[-latex, magenta, thick] (7.5,4.3) node[right] {Droop} to[out=180,in=45] (6.5,3.75);
\draw[-latex, magenta, thick] (9.6,-1.2) node[right] {Undershoot} to[out=180,in=-45] (8.8,-0.8);
\draw[-latex, magenta, thick] (10.4,0.8) node[right] {Ringing} to[out=180,in=45] (9.5,0.4);
\end{tikzpicture}
\end{document}
```

#### Duty Cycle and Frequency

A **periodic** pulse is a pulse that repeats itself at regular intervals. The time between the start of one pulse and the start of the next pulse is called the **period**, usually denoted as $T$. The number of pulses per second is called the **frequency**, usually denoted as $f$, and is related to the period by $\displaystyle f = \frac{1}{T}$.

**Duty cycle** is the ratio of the pulse width to the period, usually expressed as a percentage as $\displaystyle\text{DutyCycle}=\frac{t_w}{T} \times 100\%$ where $t_w$ is the pulse width.

The **clock signal** is a special periodic pulse that is used to synchronize the operations of a digital circuit. The clock waveform itself does not contain any information.

### Data Transfer

When bits are transferred in **serial** communication, they are sent one at a time over a single wire or channel.

```tikz
\begin{document}
\begin{tikzpicture}
\fill[gray!20] (0,0) rectangle (2,1.5);
\draw[thick] (0,0) rectangle (2,1.5);
\node[align=center] at (1,0.75) {Sending\\device};
\fill[cyan!20] (7,0) rectangle (9,1.5);
\draw[thick] (7,0) rectangle (9,1.5);
\node[align=center] at (8,0.75) {Receiving\\device};
\draw[-latex, thick] (2,0.5) -- (7,0.5);
\draw[cyan, very thick] (2.0,1.0) -- (2.2,1.0) -- (2.2,1.5) -- (2.8,1.5) -- (2.8,1.0) -- (3.4,1.0) -- (3.4,1.5) -- (4.6,1.5) -- (4.6,1.0) -- (5.8,1.0) -- (5.8,1.5) -- (6.4,1.5) -- (6.4,1.0) -- (6.8,1.0);
\draw[dashed] (2.2,1.0) -- (2.2,1.5) (2.8,1.0) -- (2.8,1.5) (3.4,1.0) -- (3.4,1.5) (4.0,1.0) -- (4.0,1.5) (4.6,1.0) -- (4.6,1.5) (5.2,1.0) -- (5.2,1.5) (5.8,1.0) -- (5.8,1.5) (6.4,1.0) -- (6.4,1.5);
\node[magenta] at (2.5,1.25) {1}; \node[magenta] at (3.1,1.25) {0}; \node[magenta] at (3.7,1.25) {1}; \node[magenta] at (4.3,1.25) {1}; \node[magenta] at (4.9,1.25) {0}; \node[magenta] at (5.5,1.25) {0}; \node[magenta] at (6.1,1.25) {1}; \node[magenta] at (6.7,1.25) {0};
\node[below] at (2.2,1.0) {$t_0$}; \node[below] at (2.8,1.0) {$t_1$}; \node[below] at (3.4,1.0) {$t_2$}; \node[below] at (4.0,1.0) {$t_3$}; \node[below] at (4.6,1.0) {$t_4$}; \node[below] at (5.2,1.0) {$t_5$}; \node[below] at (5.8,1.0) {$t_6$}; \node[below] at (6.4,1.0) {$t_7$};
\end{tikzpicture}
\end{document}
```

In **parallel** communication, multiple bits are sent simultaneously over multiple wires or channels.

```tikz
\begin{document}
\begin{tikzpicture}
\fill[gray!20] (0,0) rectangle (2,6.5);
\draw[thick] (0,0) rectangle (2,6.5);
\node[align=center] at (1,5.5) {Sending\\device};
\fill[green!20] (6,0) rectangle (8,6.5);
\draw[thick] (6,0) rectangle (8,6.5);
\node[align=center] at (7,5.5) {Receiving\\device};
\foreach \y in {0.5, 1.2, 1.9, 2.6, 3.3, 4.0, 4.7, 5.4} { \draw[-latex, thick] (2,\y) -- (6,\y); }
\draw[dashed] (3.5,0.3) -- (3.5,6);
\draw[dashed] (4.5,0.3) -- (4.5,6);
\node[below] at (3.5,0.3) {$t_0$};
\node[below] at (4.5,0.3) {$t_1$};
\draw[cyan, very thick] (3.3,5.4) -- (3.5,5.4) -- (3.5,5.8) -- (4.5,5.8) -- (4.5,5.4) -- (4.7,5.4); \node[magenta] at (4.0,5.6) {1};
\draw[cyan, very thick] (3.3,4.7) -- (4.7,4.7); \node[magenta] at (4.0,4.9) {0};
\draw[cyan, very thick] (3.3,4.0) -- (3.5,4.0) -- (3.5,4.4) -- (4.5,4.4) -- (4.5,4.0) -- (4.7,4.0); \node[magenta] at (4.0,4.2) {1};
\draw[cyan, very thick] (3.3,3.3) -- (3.5,3.3) -- (3.5,3.7) -- (4.5,3.7) -- (4.5,3.3) -- (4.7,3.3); \node[magenta] at (4.0,3.5) {1};
\draw[cyan, very thick] (3.3,2.6) -- (4.7,2.6); \node[magenta] at (4.0,2.8) {0};
\draw[cyan, very thick] (3.3,1.9) -- (4.7,1.9); \node[magenta] at (4.0,2.1) {0};
\draw[cyan, very thick] (3.3,1.2) -- (3.5,1.2) -- (3.5,1.6) -- (4.5,1.6) -- (4.5,1.2) -- (4.7,1.2); \node[magenta] at (4.0,1.4) {1};
\draw[cyan, very thick] (3.3,0.5) -- (4.7,0.5); \node[magenta] at (4.0,0.7) {0};
\end{tikzpicture}
\end{document}
```

## Digital Integrated Circuits

For a integrated circuit (IC), the pin 1 is usually marked with a **dot** or a **notch**. The pins are numbered in a **counterclockwise** direction when viewed from the top. The pin 1 is usually used as a reference point for identifying the other pins and their functions.

```tikz
\begin{document}
\begin{tikzpicture}
\foreach \y in {0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0} {
    \draw[thick, fill=white] (-0.3, \y-0.15) rectangle (0, \y+0.15);
    \draw[thick, fill=white] (2, \y-0.15) rectangle (2.3, \y+0.15);
}
\fill[black!75] (0,0) -- (2,0) -- (2,4.5) -- (1.25,4.5) arc(360:180:0.25) -- (0,4.5) -- cycle;
\draw[thick] (0,0) -- (2,0) -- (2,4.5) -- (1.25,4.5) arc(360:180:0.25) -- (0,4.5) -- cycle;
\draw[thick, white] (0.4, 4.0) circle(0.1);
\foreach \y/\n in {4.0/1, 3.5/2, 3.0/3, 2.5/4, 2.0/5, 1.5/6, 1.0/7, 0.5/8} { \node[left] at (-0.3, \y) {\n}; }
\foreach \y/\n in {0.5/9, 1.0/10, 1.5/11, 2.0/12, 2.5/13, 3.0/14, 3.5/15, 4.0/16} { \node[right] at (2.3, \y) {\n}; }
\node[magenta, align=center] (p1) at (-1.2, 5.2) {Pin 1\\identifier};
\draw[-latex, magenta, thick] (p1) -- (0.3, 4.1);
\node[magenta] (n1) at (1.0, 5.5) {Notch};
\draw[-latex, magenta, thick] (n1) -- (1.0, 4.5);
\foreach \y in {1.0, 1.6, 2.2, 2.8, 3.4} {
    \draw[thick, fill=white] (5.7, \y-0.15) rectangle (6, \y+0.15);
    \draw[thick, fill=white] (10, \y-0.15) rectangle (10.3, \y+0.15);
}
\foreach \x in {7.2, 7.8, 8.4, 9.0, 9.6} {
    \draw[thick, fill=white] (\x-0.15, 0.2) rectangle (\x+0.15, 0.5);
    \draw[thick, fill=white] (\x-0.15, 4.5) rectangle (\x+0.15, 4.8);
}
\fill[black!75] (6,0.5) -- (10,0.5) -- (10,4.5) -- (6.7,4.5) -- (6,3.8) -- cycle;
\draw[thick] (6,0.5) -- (10,0.5) -- (10,4.5) -- (6.7,4.5) -- (6,3.8) -- cycle;
\draw[thick, white] (6.7,0.5) -- (6.7,4.5);
\draw[thick, white] (6,3.8) -- (10,3.8);
\draw[thick, white] (8.4, 4.1) circle(0.1);
\node[left] at (5.7, 3.4) {4};
\node[left] at (5.7, 1.0) {8};
\node[below] at (7.2, 0.2) {9};
\node[below] at (9.6, 0.2) {13};
\node[right] at (10.3, 1.0) {14};
\node[right] at (10.3, 3.4) {18};
\node[above] at (7.2, 4.8) {3};
\node[above] at (9.6, 4.8) {19};
\node[magenta, align=center] (p2) at (8.4, 6.0) {Pin 1\\identifier};
\draw[-latex, magenta, thick] (p2) -- (8.4, 4.25);
\end{tikzpicture}
\end{document}
```

## Number Systems

**Number system**. Mostly used number systems in digital electronics are decimal (10), binary (2), octal (8), and hexadecimal (16).

**Sum-of-weight expression**. Under $r$-base number system, the value of a number can be calculated as $\displaystyle N_r = \sum_{i=m}^{n-1} C_i r^i$ where $C_i$ is the digit at position $i$ and $r$ is the base of the number system. This expression can be used to convert a number from one base to another, especially to decimal.

### Conversions

#### Conversion between decimal and $r$-base number system

For integer decimal number convention to $r$-base number system, **repeated division by r** is used, and by recording the remainders in reverse order we can get the digit of the number.

```plainText
2 | 45 ... 1
  2 | 22 ... 0
    2 | 11 ... 1
      2 | 5  ... 1
        2 | 2  ... 0
          2 | 1  ... 1
```

Take the above example for converting 45 to binary. We can see that the remainders are 1, 0, 1, 0, 1, 1 from bottom to top. So the binary representation of 45 is $101101_2$.

For fractional decimal number convention to $r$-base number system, **repeated multiplication by r** is used, and by recording the integer part of the result we can get the digit of the number.

```plainText
0.625 * 2 = 1.25 ... 1
0.25  * 2 = 0.5  ... 0
0.5   * 2 = 1.0  ... 1
```

Take the above example for converting 0.625 to binary. We can see that the integer parts are 1, 0, 1 from top to bottom. So the binary representation of 0.625 is $0.101_2$.

#### Conversion between binary, octal and hexadecimal

Since $8 = 2^3$ and $16 = 2^4$, we can convert between binary and octal or hexadecimal by grouping the binary digits into groups of 3 or 4 respectively. Vice versa, we can convert octal or hexadecimal to binary by replacing each digit with its 3 or 4 bit binary equivalent.

The grouping should be done from the right for integer part and from the left for fractional part, i.e., from **most significant bit** (MSB) to **least significant bit** (LSB). If the number of digits is not a multiple of 3 or 4, we can add leading zeros for integer part or trailing zeros for fractional part to make it a multiple.

```
Binary          101101
Octal           010 101 55
Hexadecimal     00101101    2D
```

Take 45 as an example. In other words, hexidecimal and octal number system are just **zipped version of binary number system**.

### Binary Operations

#### Binary Addition

Binary addition follows the same rules as decimal addition, but with only two digits (0 and 1). The rules are:
| A | B | Sum | Carry Out |
|---|---|-----|-----------|
| 0 | 0 |  0  |     0     |
| 0 | 1 |    1     |  0  |
| 1 | 0 |    1     |  0  |
| 1 | 1 |    0     |  1  |

#### Binary Subtraction

Rules for binary subtraction are:
| A | B | Difference | Borrow Out |
|---|---|------------|------------|
| 0 | 0 |     0      |     0      |
| 0 | 1 |     1      |     1      |
| 1 | 0 |     1      |     0      |
| 1 | 1 |     0      |     0      |

#### Binary Multiplication

Binary multiplication is similar to decimal multiplication, but with only two digits (0 and 1). The rules are:
| A | B | Product |
|---|---|---------|
| 0 | 0 |    0    |
| 0 | 1 |    0    |
| 1 | 0 |    0    |
| 1 | 1 |    1    |

For multiplying two binary numbers, we can use the **shift and add** method. We multiply each bit of the second number (multiplier) with the first number (multiplicand) and shift the result to the left according to the position of the bit. Finally, we add all the shifted results together to get the final product.

### Signed Numbers

**Sign bit** and **signed magnitude**. In signed binary numbers, the (MSB) is used as the **sign bit**. If the sign bit is 0, the number is positive; if the sign bit is 1, the number is negative. This number system is called **signed magnitude**, where positive and negative numbers with same absolute value have the same magnitude but different signs.

**1's complement**. In one's complement representation, negative numbers are represented by inverting all the bits of the corresponding positive number except the sign bit. For example, if we have a 4-bit system, the number 5 is represented as 0101, and its one's complement (which represents -5) is 1010.

**2's complement**. In two's complement representation, negative numbers are represented by taking the one's complement of the corresponding positive number and adding 1 to it. For example, if we have a 4-bit system, the number 5 is represented as 0101, and its two's complement (which represents -5) is 1011.

### Arithmetic Operations with Signed Numbers

**Addition**. Using 2's complement, we can perform addition of signed numbers by simply adding the two numbers together. If the result exceeds the range of representable numbers, we can ignore the carry out from the MSB.

**Subtraction**. Basically, subtraction changes the sign of the subtrahend and then performs addition. Result of subtraction is called **difference**. To subtract two signed numbers, we can **take the 2's complement** of the subtrahend and add it to the minuend and **discard the carry** out from the MSB if it exists.

**Multiplication**. To multiply two signed numbers, take the absolute values of the numbers, perform multiplication as if they were unsigned, and then determine the sign of the result based on the signs of the original numbers. If the signs of the original numbers are different, the result is negative; otherwise, it is positive.

> Booth algorithm can be considered. See computer architecture textbooks for more details.

**Division**. Take the absolute values of the numbers, do several times of subtraction as if they were unsigned, and then determine the sign of the result based on the signs of the original numbers.

### Codes

#### Binary Coded Decimal (BCD)

**Binary Code Decimal** (BCD) is a way to represent decimal digits with binary code. Each decimal digit (0-9) is represented by a 4-bit binary code. Most ways of representing BCD are named with the weight of the bits, such as 8421, 2421, 5421, etc. 

The most commonly used BCD code is the **8421 code**, where the weights of the bits are 8, 4, 2, and 1 from left to right. Therefore, 8421 code of each digit is actually the binary representation of that digit. 

It is worth noting that BCD codes have some invalid combinations, such as 1111 in 8421 code.

#### Gray Code

**Gray code** is the most used digital code in digital electronics. It is a binary code where two successive values differ in only one bit. This property makes it useful for error correction and for reducing the chances of errors during data transmission.

To convert a binary number to its corresponding Gray code, we can use the following steps:
1. The most significant bit (MSB) of the Gray code is the same as the MSB of the binary number.
2. For each subsequent bit of the Gray code, we can calculate it by performing an exclusive OR (XOR) operation between the current bit of the binary number and the previous bit of the binary number.

```plainText
Binary: 1 -+> 0 -+> 1 -+> 1 -+> 0
        |     |     |     |     |
Gray:   1     1     1     0     1
```

To convert a Gray code back to its corresponding binary number, we can use the following steps:
1. The most significant bit (MSB) of the binary number is the same as the MSB of the Gray code.
2. For each subsequent bit of the binary number, we can calculate it by performing an exclusive OR (XOR) operation between the current bit of the Gray code and the previous bit of the binary number.

```plainText
Gray:   1   / 1   / 0   / 1   / 1
        |  +  |  +  |  +  |  +  |
Binary: 1 /   0 /   0 /   1 /   0
```

#### Error Codes

**Parity bit** is a simple error detection code that adds an extra bit to a binary number to indicate whether the number of 1s in the binary number is even or odd. There are two types of parity bits: **even parity** and **odd parity**, counting for the number of 1s.

In even parity checking, the parity bit is set to 1 if the number of 1s in the binary number is even, and set to 0 if the number of 1s is odd. Odd parity can be defined vice versa.

> CRC code and Hamming code can be considered. See computer architecture textbooks for more details.