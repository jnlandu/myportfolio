---
title: "Projection onto Hyperspace"
excerpt: "A simple explaination of projectiong points onto a hyperspace."
coverImage: "/placeholder.svg"
date: "2025-07-29"
readTime: ""
category: "Mathematics"
tags: ["Linear Algebra", "Tutorial"]
type: "text"
views: 0
featured: true
author: "Jérémie N. Mabiala"
---

# Projection onto Hyperplane

Projections play an important role in Linear algebra, optimization, and machine learning. Some time we are interested in projecting points onto a lower dimensional space, or say, a general subspace  of a higher dimensinal space.


In this note, we explain how to derive the projection formula of a point onto a hyperspace. The derivation works the same when the hyperspace is replaced by a  plane or a line.

## 0. Notations
We consider vectors in $\mathbb{R}^n$ and use the inner product notation $(a, b) = a^Tb$ for vectors $a, b\in \mathbb{R}^n$. The norm of a vector $a$ is denoted by $\|a\| = \sqrt{(a, a)}$. We denote by $0$ the zero vecor of $\mathbb{R}^n$. We also use the notation $a\perp b$ to mean that $a$ and $b$ are orthogonal, i.e. $(a, b) = 0$.

## 1. Hyperspace

Let $a, b\in \mathbb{R}^n$ be  two  vectors.  The set defined by 
$$H = \{x\in \mathbb{R}^n : ( a, x ) = b\}$$ 
is called  a **hyperplane** of $\mathbb{R}^n$ spanned by $a$ passing through by $b$. 

Additionally, the vector $a$ is orthogonal to $H$, i.e. 
$$ (a, x) = 0 \text{ for all } x\in H.$$ 
In fact, if $x\in H$, then $(a, x) = b$ and $(a, 0) = b$, which implies that $(a, x - 0) = 0$.

Fact 1 : Any vctor $w$ orthogonal to $H$ is a multiple of $a$, i.e. $w = \lambda a$ for some $\lambda\in \mathbb{R}$.

Proof: we already know  that $(a, v)=0$ for all $v\in H$. So, is any $w=\lambda a$ multiple of $a$. Assume $w\perp H$, i.e $(w, v)=0$ for all $v\in H$. Now, for a fixed $v$, we also have $(\lambda a, v)=0$. Hence,

$$
(w-\lambda a , v) = (w, v) - \lambda (a, v) = 0
$$
this is true  for all $v\in H$. This means that $w-\lambda a$ has to be zero, i.e. $w = \lambda a$.

## 2. Projection onto $H$

The prblem consists of projecting $w$ onto $H$, that is,  finding $w_H$ such that $w_H\in H$ and $w - w_H$ is orthogonal to $H$.

#### Claim : The projection of $w$ onto $H$ is given by
$$
w_H = w - \frac{b - (a, w)}{\|a\|^2} a.
$$

Proof: We know the following :
1. $w_H\in H$ 
2. $w_H - w \perp H$, i.e $w_H - w $ is orthogonal to $H$.

From  fact 1, we write $w_H - w = \lambda a$ for some $\lambda\in \mathbb{R}$, that is 
$$
w_H = w + \lambda a \tag{\#}
$$

Because, $w_H\in H$, we must have $(w_H, a)= b$, according to the definition of $H$. Using $(\#)$ above, we have
$$
\begin{align*}
b &= (w_H, a) = (w + \lambda a, a) = (w, a) + \lambda (a, a)\\
&= (w, a) + \lambda \|a\|^2
\end{align*}
$$

Therefore, 
$$
\lambda = \frac{b - (w, a)}{\|a\|^2}. \tag{\#\#}
$$

Inserting this into $(\#)$, we obtain
$$
w_H = w + \frac{b - (w, a)}{\|a\|^2} a

$$
Which proves our claim. It is the projection of $w$ onto the hyperplane $H$.

## 3. Applications

As we have alrady mentioned earlier, projections are widely used whether in science or in engineering. To illustration this statement, we will consider some xamples of algorithms or techniques that use (the idea of ) orthogonal projections. 

Our first examples are from the field of (Randomized) Linear Algebrae and Optimization.

#### 1. The Karczmarz method
The Karczmarz method is an iterative methods intensively for solving overdetermied systems of linear equations. The method, named after its initiator,  the Polish mathenatician Stefan Karczmarz, has gained popularity in the optimization community because of its simplicity and effectictiveness in solving large-scale linear systems, like those arise in machine learning (e.g. linear regression). For a broad litterature review,see these papers [1](https://arxiv.org/abs/2006.14447), [2](https://arxiv.org/abs/2303.11393), and [3](https://arxiv.org/abs/2405.00524).



Consider the system of linear equations
$
Ax = b
$
where $A\in \mathbb{R}^{m\times n}$ is a matrix with $m$ equations and $n$ variables, and $b\in \mathbb{R}^m$ is a vector of constants.  That is, we have the system
$$
\begin{align*}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n &= b_1 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n &= b_2 \\
&\vdots \\
a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n &= b_m
\end{align*}
$$



We assume the the system is consistent, i.e. it exists $\overline{x}$ such that $A\overline{x} = b$ and $m>>n$. The (classic) Karczmarz Method  method iteratively projects an initial guess $x_0$ onto the hyperplane $(a_i, x)=b_i$ for $i=1, \ldots, m$.  That is, at an iteration $k$, the KM select a row $a_i$ of $A$ and  computes the projection of $x_{k}$ onto the hyperspace spanned by the row $a_i$ , i.e. $H_{a_i}=\{ x\mid (a_i, x)=b \}$, to obtain 

$$
\begin{align}
x_{k+1} = x_k + \frac{b_i - (a_i, x_k)}{\|a_i\|^2} a_i 
\end{align}
$$
We recogize that is is the same projection formula derived above.


What the (classic) KM methds does is, at iteration k, to project the current iterate $x_k$ onto the hyperplane  spanned by the $i-th$ rows of $A$, i.e $H_i$, and repeates this process untill a stopping condition is met.


The full algorithm is as follows:

```text
Procedure Karczmarz(A, b, x₀, max_iter)
Input: Matrix A ∈ ℝ^{m×n}, vector b ∈ ℝ^m, initial guess x₀ ∈ ℝ^n, maximum iterations max_iter
1. Set x = x₀
2. For k = 1 to max_iter do:
    a. Select i_k ∈ {1, ..., m}, s.t i_k = k mod m +1 
    b. Let a_i be the i-th row of A
    c. Let b_i be the i-th entry of b
    d. Update:
        x ← x + [(b_i - ⟨a_i, x⟩) / ⟨a_i, a_i⟩] * a_i
3. Return x
```

For the python implementation, we can use the following code snippet:
```python
def karczmarz(A, b, x0, max_iter=1000):
    m, n = A.shape
    x = x0.copy()
    for k in range(max_iter):
        i_k = k % m  # Cyclically select a row     
        a_i = A[i, :]
        b_i = b[i]
        # Project onto the hyperplane defined by a_i
        x += (b_i - np.dot(a_i, x)) / np.dot(a_i, a_i) * a_i
    return x
```     


**Analytical Example:** Consider the consistent overdetermined system

$$
A=\begin{bmatrix}
1&0\\
1&2\\
1&-1
\end{bmatrix},\qquad
b=\begin{bmatrix}1\\3\\0\end{bmatrix},
$$

whose exact solution is

$$
\bar x=\begin{bmatrix}1\\1\end{bmatrix}
$$

(since $x_1=1$, $x_1+2x_2=3\Rightarrow x_2=1$, and $x_1-x_2=0$).

## Kaczmarz update

Given row $a_i^\top$ and scalar $b_i$, one step is the orthogonal projection

$$
x_{k+1}
= x_k + \alpha\, a_i,
\qquad
\alpha=\frac{b_i-a_i^\top x_k}{\|a_i\|_2^2}.
$$

This enforces $a_i^\top x_{k+1}=b_i$.

We start from $x_0=\begin{bmatrix}-2\\ 2\end{bmatrix}$ and use **cyclic** rows $i=1,2,3,1,2,3,\ldots$.

**Iterations (arithmetic operations): **

1. **$k=0$, row 1**: $a_1 = (1,\,0)$, $\|a_1\|^2 = 1$  
    $\displaystyle \alpha = \frac{1 - (1,\,0) \cdot (-2,\,2)}{1} = 3$  
    $\displaystyle x_1 = x_0 + 3(1,\,0) = (1,\,2)$

2. **$k=1$, row 2**: $a_2 = (1,\,2)$, $\|a_2\|^2 = 5$  
    $a_2^\top x_1 = 1 + 2 \cdot 2 = 5$  
    $\displaystyle \alpha = \frac{3 - 5}{5} = -\frac{2}{5} = -0.4$  
    $\displaystyle x_2 = x_1 - 0.4(1,\,2) = (0.6,\,1.2)$

3. **$k=2$, row 3**: $a_3 = (1,\,-1)$, $\|a_3\|^2 = 2$  
    $a_3^\top x_2 = 0.6 - 1.2 = -0.6$  
    $\displaystyle \alpha = \frac{0 - (-0.6)}{2} = 0.3$  
    $\displaystyle x_3 = x_2 + 0.3(1,\,-1) = (0.9,\,0.9)$

4. **$k=3$, row 1**:  
    $\displaystyle \alpha = 1 - (1,\,0) \cdot (0.9,\,0.9) = 0.1$  
    $\displaystyle x_4 = (1.0,\,0.9)$

5. **$k=4$, row 2**:  
    $a_2^\top x_4 = 1.0 + 2 \cdot 0.9 = 2.8$  
    $\displaystyle \alpha = \frac{3 - 2.8}{5} = 0.04$  
    $\displaystyle x_5 = (1.04,\,0.98)$

6. **$k=5$, row 3**:  
    $a_3^\top x_5 = 1.04 - 0.98 = 0.06$  
    $\displaystyle \alpha = \frac{0 - 0.06}{2} = -0.03$  
    $\displaystyle x_6 = (1.01,\,1.01)$




Several papers have showed the converges of the KM algorithm under various conditions. One of the issue of  the (classical) KM is that it can be slow to converge, especially for large systems: it is shown in the litterature that its converegence rate depends on the row order of the matruix $A$.


To address this issue, Strohmer et al [1] introduced the **Randomized Karczmarz Method** (RKM), which randomly selects a row of $A$ at each iteration. They have shown randomization helps to improve the convergence rate and robustness of the method, especially for large-scale problems.

The RKM algorithm is as follows:

```text
Procedure Randomized Karczmarz(A, b, x₀, max_iter)
Input: Matrix A ∈ ℝ^{m×n}, vector b ∈ ℝ^m, initial guess x₀ ∈ ℝ^n, maximum iterations max_iter  
1. Set x = x₀
2. For k = 1 to max_iter do:
    a. Randomly select i_k ∈ {1, ..., m} with probability proportional p_i = ||a_i ||/||A||_F^2
    b. Let a_i be the i-th row of A
    c. Let b_i be the i-th entry of b
    d. Update:
        x ← x + [(b_i - ⟨a_i, x⟩) / ⟨a_i, a_i⟩] * a_i
3. Return x
```

Its python implementation is as follows:
```python
def randomized_karczmarz(A, b, x0, max_iter=1000):
    m, n = A.shape
    x = x0.copy()
    for k in range(max_iter):
        i_k = np.random.choice(m, p=np.linalg.norm(A, axis=1) / np.linalg.norm(A, ord='fro')**2)
        a_i = A[i_k, :]
        b_i = b[i_k]
        # Project onto the hyperplane defined by a_i
        x += (b_i - np.dot(a_i, x)) / np.dot(a_i,a_i) *a_i
    return x
```

To illustration the usefullness of projctions, we are going to to give a detailled proof of the main result of the paper by Strohmer et al [1].  For that, we need to precise some notations and definitions.




#### 2. Least Squares Regression



