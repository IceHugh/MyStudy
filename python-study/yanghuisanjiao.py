#！ /usr/bin/python3

def triangle(n):
  L = [1]
  while True:
    yield L
    L = [L[x] + L[x + 1] for x in range(len(L) - 1)]
    L.insert(0, 1)
    L.append(1)
    if len(L) > n:
      break

a = triangle(10)
print(a)
for i in a:
  print(i)