#! /usr/bin/python3

def fib(max):
  a, n, b = 0, 0, 1
  while n < max:
    print(b)
    a, b = b, a + b
    n = n + 1
  return 'done'

fib(6)