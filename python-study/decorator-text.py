#! /usr/bin/env python3

import functools
import time

def log(text):
  def decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kw):
      print('%s %s():' % (text, func.__name__))
      return func(*args, **kw)
    return wrapper
  return decorator

@log('231')
def now():
  print('2017-11-23')

now()
print(now.__name__)


def metric(fn):
  @functools.wraps(fn)
  def wrapper(*args, **kw):
    print('start %s ms' % time.time())
    fn(*args, **kw)
    print('end %s ms' % time.time())
    return fn(*args, **kw)
  return wrapper

@metric
def test():
  time.sleep(3)

test()
print(dir(functools))