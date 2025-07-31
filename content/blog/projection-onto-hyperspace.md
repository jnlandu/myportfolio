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
We say earlier that projections are applied  in many fields such Optimization ans Maxhine Learning. To support our claim, let's consider an example of  problem or algorithm that uses projections.

#### 1. The Karczmarz method
The Karczmarz method is an iterative methods intensively for solving overdetermied systems of linear equations. The method, named after the Polish mathenatician Stefan Karczmarz, has gained popularity in the optionization communit because of its simplicity and effecticitevemess in solving lareg-scale linear sysstems, like those arise in machine learning.

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

We assume the the system is consistent, i.e. it exists $\overline{x}$ such that $A\overline{x} = b$ and $m>>n$. The KM method iteratively projects an initial guess $x_0$ onto the hyperplane $(a_i, x)=b_i$ for $i=1, \ldots, m$.  That is, at an iteration $k$, the KM select a row $a_i$ of $A$ and  computes the projection of $x_{k}$ onto the hyperspace spanned by the row $a_i$ , i.e. $H_{a_i}=\{ x\mid (a_i, x)=b \}$, to obtain 

$$
\begin{align}
x_{k+1} = x_k + \frac{b_i - (a_i, x_k)}{\|a_i\|^2} a_i 
\end{align}
$$

The Karczmarz method iteratively refines an initial guess $x_0$ by projecting it onto the hyperplanes

#### 2. Least Squares Regression



