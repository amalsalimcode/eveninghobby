import itertools
import functools
import random
import string


### flatten array
arg, ans = [[1, 2, 3], [4, 5, 6, [7, 8, 9]]], []
iter_arr = lambda arg: [iter_arr(x) for x in arg] if isinstance(arg, list) else ans.append(arg)
iter_arr(arg)


### itertools
itertools.accumulate([1, 2, 3], lambda x,y: x+y)
itertools.chain([1, 2, 3], [3, 4, 5])
itertools.dropwhile(lambda x: x != 2, [1, 2, 3])
itertools.cycle(range(10))

itertools.permutations([1, 2, 3])
itertools.combinations([1, 2, 3], 2)

itertools.zip_longest([1, 2, 3], ['a', 'b', 'c'], fillvalue=None)


### arr manipulation
filter(lambda x: x is not None, [1, 2, 3, None])
map(lambda x: x*2, [1, 2, 3, 4])
functools.reduce(lambda x,y: x+y, [1, 2, 3, 5])
list(zip([1, 2, 3], [4, 5, 6]))


### string
idx = "asdf".find('s',0,len("asdf"))
idx = "asdfasdf".rfind('f',0, len("asdfasdf"))

### sort
print(sorted([1, 2, 3, 4], key=lambda x: -x))
print(sorted([(1,2), (1,3), (5,6), (1,1)], key=lambda x: (x[0], x[1])))

def my_srt(x, y):
	if x == 55: return -1
	if y == 55: return 1
	if x < y: return -1
	if y < x: return 1
	if x == y: return 0

print(sorted([1, 2, 3, 4, 55, 55, 22], key=functools.cmp_to_key(my_srt)))

string.ascii_letters
string.ascii_lowercase
string.ascii_uppercase
string.digits
''.isalnum()
''.isalpha()
''.count('3', 0, len(''))
''.endswith('asdf', 0, len(''))
''.startswith('asdf', 0, len(''))
''.isdigit()
''.split('.')


### datetime

### flip-flop values
x = 1; x ^= 1
toggle = lambda x=1: 1 if x != 1 else 3

### call me three times
thr = lambda x,y=0: thr(x(),y+1) if y < 3 else x()
thr(toggle)

random.randrange(0, 30)

arr = [1, 2, 3]
arr.shuffle()
''.join(arr)
