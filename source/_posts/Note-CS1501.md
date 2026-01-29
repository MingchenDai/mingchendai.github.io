---
title: CS1501 Programming Language and Thoughts Via C++
subtitle: Key Points For CS1501
date: 2025-02-02
categories: Exploration
tags: 
- Program Language
- SJTU Courses
- Notes
type: Post
---

This is a document I organized while reviewing for my C++ final exam, focusing only on the key points.

<!-- more -->

# Introduction

The three characteristics of algorithms: **clear representation (unambiguous)**, **effectiveness**, and **finiteness**.

**Compiler**: A program that performs the translation task between high-level language and machine language.

### Basic Structure of a Program

C++ compilation occurs in two stages: **preprocessing** and **compilation**. Preprocessing is done first, followed by compilation and preprocessing commands usually begin with `#`.

Common preprocessing commands include **library inclusion**, and the corresponding information is provided by **header files**.

```C++
#include <file> // This library is a standard C++ library.
#include "file" // This library is a user-defined library. The compiler first looks in the user's directory for the corresponding file, and if not found, it will search the system's standard library directory.
```

#### Variables

Variable naming rules:

1. Must start with a letter or an underscore.
2. Other characters must be letters, underscores, or digits; no spaces or other symbols; and letters are case-sensitive.
3. Cannot be a system reserved keyword.

Assigning values to variables:

```C++
int a = 5;           // This is a valid assignment.
int a(5);            // This is a valid assignment.
int a = 5, b = 5, c; // Some variables are assigned values while others are not.
```

#### Data Types

Integers are represented in the computer in **two's complement**. The two's complement of a positive integer is its **binary representation**, and the two's complement of a negative integer is the **binary representation of its absolute value with bits inverted and 1 added**.

Real numbers are stored in the computer in the form of $a \times 2^b$, where $a$ is called the mantissa, and $b$ is the exponent. This is known as **floating-point representation**. A `float` guarantees at least **6** decimal digits of precision (4 bytes of space, 1 byte for the mantissa, and 3 bytes for the exponent). `double` and `long double` guarantee at least **10** decimal digits of precision (8 bytes of space, 3 bytes for the mantissa, and 5 bytes for the exponent). **Computers cannot precisely represent real numbers.**

The ASCII values for characters 'A', 'a', and '0' are 65, 97, and 48, respectively. A `char` occupies **1** byte of space to store the corresponding ASCII value.

```C++
char a = 'A';
cout << a - 1 << endl; // Outputs 64
cout << --a << endl;   // Outputs '@'
cout << a << endl;     // Outputs '@'
```

Boolean type variables occupy **1** byte and store values 0 (false) and 1 (true).

```C++
bool Bool = 2;
Bool -= 1;
cout << Bool << endl;     // Outputs 0
Bool -= 1;
cout << Bool << endl;     // Outputs 1
cout << 1 + Bool << endl; // Outputs 2
```

Enumerations can only perform assignment and comparison operations. `bool` is a pre-defined enumeration in C++, but can also perform arithmetic, relational, and logical operations.

```C++
enum weekdayT { Sunday = 1, Monday, Tuesday = 10, Wednesday, Thursday, Friday, Saturday };
```

Type aliases:

```C++
typedef int INTEGER;
int a;     // Valid
INTEGER b; // Valid
```

Size of types or variables:

```C++
cout << sizeof(int) << endl;      // Returns 4
cout << sizeof('a' + 15) << endl; // Returns 4
int x = 0;
cout << sizeof(x) << endl;        // Returns 4
```

#### Constants and Symbolic Constants

Integer constants are automatically represented as either `int` or `long int` based on their value. To force an integer to be treated as a long integer, append an `l` or `L` to the number, such as `100L`. Octal numbers start with `0`, and hexadecimal numbers start with `0x`.

Floating-point constants have two representations: **decimal** and **scientific** notation. Scientific notation is represented as `aeb` or `aEb`, for example, `123e4` or `123E4`. Note that `e` or `E` must **have digits on both sides**, and the number after `e` or `E` must be an **integer**. In C++, floating-point constants are treated as `double` by default. To treat a floating-point constant as float, append `F` to the number, like `123.4F`.

Character constants are enclosed in single quotes. Non-printable characters can be represented using escape sequences. A character constant can be stored in a char variable, but a char variable cannot store in a string.

C-style symbolic constants are simple text replacements and may lead to errors. A `const` symbolic constant can only be assigned an initial value at the time of definition, and its value cannot be changed later.

```C++
#define PI 3.14        // C-style
const float PI = 3.14; // C++ style
```

#### \*Extension

`long long int` occupies **8** bytes.

The `auto` type can automatically deduce the variable's type, but the variable must be initialized. `decltype` can also deduce the type from an expression without evaluating it.

```C++
auto c = 'a';
int a, b;
decltype(a + b) d;
```

A constant expression is one whose value is determined at compile time and cannot change. C++ allows declaring variables as `constexpr` to inform the compiler to verify that their value is a constant at compile time.

`using` can be used to declare type aliases, similar to `typedef`.

```C++
using REAL = double;
```

#### Input and Output

The `get` function is used as `cin.get(character variable);` or `character variable = cin.get();`.

#### Arithmetic Operations

The `%`, `/`, and `*` operators have the same priority level.

C++ only performs operations between operands of the same type. When performing operations between different types, **automatic type conversion** occurs, with the general rule being: **non-standard types are converted to standard types**, **smaller data types are converted to larger types**, **and smaller numerical ranges are converted to larger ranges**.

Non-standard integer types such as `bool`, `char`, and `short` are first converted to `int` before performing arithmetic operations.

When a real number is converted to an integer, the fractional part is discarded. When an integer is converted to a real number, its value remains the same but is represented as a floating-point number. When an integer is converted to a character type, the least significant **8** bits of the integer are used.

The form of explicit type casting is:

```C++
float(a / b);
(float)(a / b);
(float)a / b;
a / (float)b;
```

There are four types of explicit type casts: `static_cast`, `reinterpret_cast`, `const_cast`, and `dynamic_cast`. The syntax for casting is `cast_type<Type>(expression)`.

```C++
char ch;
int d = 10;
ch = static_cast<char>(d);
```

When dividing integers, the result is truncated, regardless of whether the numbers are positive or negative.

$m \% (-n) = m % n$, $(-m) \% n = -m % n$.

#### Assignment Operations

In an assignment expression, the left side is the **left value**, and the right side is the **right value**. The left value must be a memory location that stores data, while the right value is disposable after being used. When the left and right sides have different types, automatic type conversion occurs.

The result of an assignment expression is the right value. Assignment and compound assignment operators are **right-associative**, and their priority is lower than arithmetic operators.

`x++` means the original value of `x` participates in the operation, and `x` is incremented afterward. `++x` means `x` is incremented first, and then the new value of `x` participates in the operation.

### Branch

#### Relational Expressions

The operators `<`, `>`, `<=`, `>=` have the same priority level, and `==`, `!=` also have the same priority, but the first four have higher priority than the last two. When relational operators are combined with arithmetic operators, **arithmetic operations are performed first**. When relational operators are combined with assignment operators, **relational operations are performed first**. Relational operators are **left-associative**.

Relational expressions also undergo automatic type conversion, and the result is of type `bool`.

#### Logical Expressions

`!` is a unary operator, while `&&` and `||` are binary operators. The priority order is: `!` > arithmetic operators > relational operators > `&&` > `||` > assignment operators.

#### Conditional Expressions

The conditional expression format is: `(condition)? expression1 : expression2`.

#### `switch` Statement

The `default` clause is **optional**. The `case` label must be an **integer constant expression** (which can be `int`, `char`, or an enumeration type).

### Loop

For list iteration: `for(int i : {1, 2, 3, 4, 3, 2, 1})`, where elements in the list can also be expressions.

`break` jumps out of the loop, while `continue` skips the current iteration and goes to the next iteration.

### Array

**The number of array elements cannot be a variable.** Some compilers may compile this successfully due to compiler optimizations, but it is not universal.

When defining an array, you can assign initial values to all elements, or just some of them. Elements that are not assigned an initial value will have a default value of 0.

When assigning initial values to all elements, the array size can be omitted, and the system will determine the size based on the number of given initial values.

**C++ does not check the validity of array subscripts.**

You can use a range-based `for` loop to access array elements.

```C++
for(int x : a) {  // Or: for(auto x : a)
    cout << x << endl;
}
```

#### String Input and Output

`cin.getline(char array, array size, delimiter)` where the delimiter can be omitted, and the default is the newline character.

### Functions

A function's return statement can be `return expr` or `return(expr)`. C++ functions can only have **one** return value per execution and cannot return a **complete array**.

**The function name is an identifier** that follows [the identifier naming rules](#variables).

The called function cannot access the local variables of the calling function.

#### Parameter Passing in Function

In C++, parameters can be passed by **value** or **reference**.

In value passing, the actual parameters can be constants, variables, expressions, or other function calls. During the function call, the actual parameters are calculated first, and then passed (the corresponding formal parameters are initialized, and type conversion occurs automatically if types do not match). If multiple actual parameters are expressions, **the order of evaluation is determined by the specific compiler.**

When a function is called, the system allocates a memory space for it, called a **frame**. When the function finishes executing, the system reclaims the memory allocated for the function.

Global variables are shadowed in the local scope. If you need to access them, use the **scope resolution operator** `::`.

##### Arrays as Function Parameters

When passing arrays to functions, the address of the array’s start is passed. The formal and actual parameters are **the same** array. Therefore, the size of the array in the parameters is meaningless and can be omitted.

```C++
int func(int array[10]);  // Valid
int func(int array[]);    // Valid
```

#### Variable Storage Classes

Variables can be classified as automatic (`auto`), static (`static`), register (`register`), or external (`extern`).

##### Automatic Variables

Local variables, formal parameters, or variables defined in program blocks are automatic variables if not explicitly declared as another storage type. These variables are stored in the memory area called the **stack**. When a function is called, the system allocates a memory block in the stack for the function, called a **frame**, where all the automatic variables for that function are stored. Once the function finishes executing, the system **automatically** reclaims the memory.

##### Static Variables

Variables declared as `static` are called **static variables**. Both local and global variables can be static. Adding the `static` keyword to a global variable indicates that the variable is **private to the current source file**, and **cannot be accessed by functions in other source files**. Static global variables are stored in the **global variable section**, and the variable does not disappear when the function finishes executing. On the next function call, it uses the **previous value**.

Static variables that are not initialized by the programmer are initialized by the system to **0** (for `char` types, it is `\0`, and for strings). Local static variables persist after the function call, but they cannot be accessed by other functions.

Local static variables will be destroyed after the program finishes executing. If both static local variables and global variables exist in the program, the static local variables are destroyed first, followed by global variables.

A function can also be declared as `static`, meaning it can only be called by other functions in the same source file.

##### Register Variables

A **register variable** is a variable stored directly in the CPU registers, declared using the `register` keyword. If no suitable registers are available in the system, the compiler treats it as an automatic variable. In modern compilers, programmers generally do not need to specify this; the compiler decides whether to use a register for a variable as part of its optimization process.

##### External Variables

If a global variable defined in another function or source file is needed, the variable must be declared using the keyword `extern` for **external variable declaration**. This is mainly to allow global variables to be shared among multiple source files. The **type name can be omitted** when declaring external variables.

**External variables must be global variables.**

**Distinguish between declaration and definition.** A definition allocates memory for the variable based on its data type, while a declaration only specifies how the variable should be used, without allocating memory (similar to a function prototype declaration).

#### Default Arguments for Functions

Default values for parameters only make sense in function declarations, so the compiler disallows **defining default arguments in both the declaration and definition**. 

Once a default value is assigned to one parameter, all subsequent parameters must also have default values.

It is best to specify default values in the function declaration. Also, different source files can assign different default values to function parameters, but in the same source file, each parameter can only have one default value.

#### Inline Functions

When compiling, the compiler may copy the code of an inline function to the calling site to avoid the function call, but this may lead to multiple copies of the function's code, increasing the size of the target code. To define an inline function, add the `inline` keyword before the return type. Inline functions are just a suggestion to the compiler; it may decide to handle them differently based on the situation.

**Inline functions cannot be recursive.**

#### Function Overloading

Function overloading allows functions with the same name to differ in the number of parameters, the types of parameters, or both.

#### Function Templates

A function template allows some form parameters to have variable types, called **template parameters**. When calling the function, the actual parameter types determine the values of the template parameters, and the actual parameter types replace the template parameters to generate different **template functions**, a process called **template instantiation**.

```C++
template <class T>
T max(T a, T b) {
    return a > b ? a : b;
}
```

If some template parameters do not appear in the function's formal parameter list, **explicitly specify template arguments**.

```C++
calc<int, char, int>(5, 'a');
```

#### \*Trailing Return Type

The compiler can automatically deduce the return type of a function.

```C++
template <class Type1, class Type2>
auto cal(Type1 alpha, Type2 beta) -> decltype(alpha + beta) {
    return alpha + beta;
}
```

### Pointers

C++ does not allow assignment between pointers of different types. If necessary, use explicit type casting.

You can declare a pointer of the `void` type (a **generic pointer type**), which just indicates that the pointer holds an address, without specifying what type of data is stored at that address. `void` pointers can be assigned to pointers of any type.

**Constant Pointer**: A pointer to a constant `const int *p = &x` (`*p` cannot be modified, but `p` can be modified).

**Pointer Constant**: A constant pointer `int *const p = &x` (`*p` can be modified, but `p` cannot be modified).

**Constant Pointer Constant**: A constant pointer to a constant `const int *const p = &x` (`*p` and `p` cannot be modified).

#### Dynamic Memory Allocation

The `new` operator allocates memory for a specific data type on the heap, and the result is **the address of this memory block** (if the allocation fails, it returns a **null pointer**).

```C++
int *p;
p = new int(20);  // Can specify an initial value
*p = 20;
```

The `delete` operator can be used to free the memory that the pointer points to, and `delete[] p` is used to free the memory of an array when the pointer holds the address of an array.

Dynamic arrays can also be initialized with a list of values.

#### Pointers and Functions

If a function returns a pointer, just add a `*` before the function name.

You can define reference types using `int &j = i`. Reference types require the `&` symbol before the variable name and must immediately specify an initial value. Both the reference and the original variable share the same memory space. Once a variable is defined as a reference to another variable, it cannot be used as a reference to another variable.

If a reference is constant (i.e., `const int &a`), the reference variable’s initial value can be a constant.

You can use `for(int &k : a)` to access and modify each element of an array.

When using reference parameters, the actual argument passed must be a left-value expression.

A function that returns a reference can make the function call appear as a left-value, but it cannot return a **local variable** (as it will result in an invalid reference since local variables are destroyed).

You can use `&&` to declare a r-value reference, which refers to a temporary value that will be destroyed.

#### \*`main` Function

The `main` function has two formal parameters: `argc` represents the number of command-line arguments when the program is run, and `argv` is an array of pointers to characters, where each element is a pointer to an actual argument, and each actual argument is represented as a string.

#### Function Pointers

The format is `return_type (*pointer_variable)(parameter_list);`. You can assign values to the pointer by using `pointer_variable = function_name`.

#### \*Lambda Expressions

A lambda expression is an unnamed inline function with a return type, a parameter list, and a function body.

```c++
[](int x, int y) -> int { int z = x + y; return z; }
auto f = [](int x, int y) -> int { int z = x + y; return z; }; // Assign lambda to a function pointer
```

Lambda expressions allow access to other variables in the containing function, which is called **capture**.

Capture forms: capture specific variables by value (`x`), capture all variables by value (`=`), capture specific variables by reference (`&x`), or capture all variables by reference (`&`).

### Structures and Modularity

Pointer to a structure: `(*sp).item` or `sp->item`.

Preprocessing commands:

```c++
#ifndef
#define
//Contents
#endif
```

### Creating New Types

Private members can only be accessed by member functions of the same class, not by global functions or member functions of other classes. Public members can be accessed using `object_name.member_name`.

If access specifiers are not specified, the member is **private** by default.

Functions defined directly within a class are **inline functions** by default.

Member functions can access the private members of the class and can use `object_name.member_name` to access any member of another object of the same class.

If `rp` is a pointer to an object of a class, the corresponding object can be accessed using `rp->function()`. Objects of the same class can assign values to each other.

#### `this` Pointer

There is only one copy of a member function in memory, and all objects share this copy.

When a member function is called through an object, the compiler passes the address of the object to the parameter `this`. The member function can then access which object it is acting upon using `this`. Normally, you can omit `this` when writing member functions, but if accessing the whole object, you must explicitly use the `this` pointer, i.e., `*this`.

#### Constructors and Destructors

In C++, the constructor's name is the same as the class name, and it cannot have a return type. Constructors can be overloaded.

When the data member is not a basic type but an object of another class, and it cannot be directly initialized in the constructor body, it can be initialized in the initialization list. **Constant data members** must also be initialized in the initialization list. The initialization order is based on the order of the data members' definitions. To force the generation of the default constructor, you can declare it as `ClassName() = default;`.

When creating an object, you can use an object of the same class to initialize it, which uses the **copy constructor**. The prototype is `ClassName(const ClassName&)`. The **default copy constructor** will create a copy of the object with the same values. If assignment through copy construction is not allowed, it can be declared as `ClassName(const ClassName&) = delete;`.

The destructor's prototype is `~ClassName()`, and it has no parameters or return value.

C++ allows a constructor to call another constructor, called **delegating constructors**.

#### Constants and Classes

You can define a **constant member function** to be called by constant objects. The declaration of a constant member function is done by adding `const` after the function signature.

#### Static Data Members and Member Functions

A class's static data members have a separate data storage area, and they can be public or private.

```c++
class Sample {
private:
    static double rate;
};
double Sample::rate = 0.05;
```

Static member functions are used to operate on static data members and serve the class rather than the objects of the class. When defined outside the class, the `static` keyword is not required. Static member functions do not have an implicit `this` pointer, so they can only access static data members or other static member functions.

Static constant members are declared using `static const`. Constant data members belong to each object; static constant data members belong to the entire class. Static constant data members must be initialized in the class definition.

#### Friend Functions and Classes

You can specify that certain global functions, all member functions of another class, or a specific member function of another class are allowed to directly access the private members of a class. These are called **friend functions**, **friend classes**, and **friend member functions**, collectively known as **friends**.

To declare a function as a friend, you declare it within the class definition using the keyword `friend`. This declaration can be placed in either the public or private section.

```c++
class A {
    friend void f();
    friend int B::function(double);
    friend class B;
}
```

Friend relationships are **not symmetric** and **not transitive**.

### Operator Overloading

In C++, the overloaded function name is `operator@`, and the implicit `this` pointer is the first parameter of the operator. 

The `=`, `[]`, `()`, and `->` operators must be overloaded as member functions. The postfix operator overload function takes an extra `int` parameter, which is unused. When the postfix operator is called, the compiler uses 0 as the value for this parameter. The prefix operator uses the regular overloaded function.

```c++
Sample &Sample::operator=(const Sample &right) {
    if (this == &right) {
        return *this;
    }
    //Contents
    return *this;
}

double &Sample::operator[](int index) {
    //Contents
    return a[index];
}

Sample &Sample::operator++() {
    //Contents
    return *this;
}

Sample Sample::operator++(int x) {
    //Contents
    return tmp;
}

ostream &operator<<(ostream &os, const ClassType &obj) {
    os << Content;
    return os;
}

istream &operator>>(istream &is, const ClassType &obj) {
    is >> content;
    return is;
}
```

Adding `explicit` before the constructor prevents implicit type conversion. To perform the conversion, objects must be explicitly constructed.

Type conversion functions must be defined as member functions of the class. They tell C++ how to convert the current class type object to another type. Adding `explicit` before the conversion operator prevents implicit type conversion but supports explicit type conversion.

```c++
operator double() const {
    // Contents
}
```

### Composition and Inheritance

If a data member of a class is an object of another class, the member is called an **object member**.

An existing class is called the **base class** or **parent class**, and a new class derived from it is called the **derived class** or **child class**.

```c++
class Derived : public Base {};
```

Base and derived classes are two independent classes. Therefore, a member function of the derived class cannot access the private members of the base class. The `protected` access modifier is a special type of private member that cannot be accessed by global functions or member functions of other classes but can be accessed by member functions and friend functions of derived classes.

The derived class constructor body is responsible for initializing new data members. The base class's constructor is called in the initialization list to initialize the base class's data members. The base class portion of a derived class object is destroyed by the base class destructor. The destructor of the derived class automatically calls the base class destructor, with the derived class destructor executing first.

You can assign a derived class object to a base class object. When a base class pointer points to a derived class object, it can only access the base class portion of the derived class. When a base class reference is used to reference a derived class object, it can only modify the base class portion.

To assign a base class pointer to a derived class pointer, you should use explicit type casting, such as `reinterpret_cast`.

#### Virtual Functions

A **virtual function** is a function in the class definition that is declared with the `virtual` keyword. When redefining it in the derived class, its function prototype must match exactly with the base class's virtual function, otherwise the compiler will treat the derived class's function as an overloaded function.

When overriding, `virtual` can be included or omitted, but it's recommended to add it.

Constructors cannot be virtual, but destructors can be, and it's best to declare them as virtual.

A **pure virtual function** is a virtual function that is declared in the base class without being defined, but it must be defined in the derived class.

```c++
virtual double area() const = 0;
```

If a class contains at least one pure virtual function, it is called an **abstract class**. Abstract classes cannot have objects directly instantiated, but pointers to abstract classes can point to derived class objects.