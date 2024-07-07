import itertools
import functools
import string
from collections import defaultdict

"""
REQUIREMENTS       Look at args, see how args are related, write each arg in a new line with description
TESTCASE           MOST IMPORTANT! Copy each arg from prev line, and put values. Think mathematically what other tcs can be added
PREALGORITHM       How would a child solve this, you can write steps that have brute force, then see which steps can be optimized
ALGORITHM          Mention Concepts
VERIFICATION
"""

#################
#### REQUESTS ###
#################
import requests
url = 'https://jsonplaceholder.typicode.com/posts'

r = requests.get(url)
print(r.status_code, r.json(), r.content)

headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}
r = requests.post(url, json={'what': "happend"}, headers=headers)
print(r.status_code, r.json(), r.content)

# how to return data in http?

#################
##### TRIE ######
#################

def build_trie(words):

	root = {'children': {}, 'end': None}

	for w in words:
		c_n = root
		for i,c in enumerate(w):
			if c not in c_n['children']:
				c_n['children'][c] = {'children': {}, 'end': None}
				
			c_n = c_n['children'][c]

			if i == len(w) - 1:
				c_n["end"] = w

	return root

#################
#### SUBSET #####
#################

"""
take something. eg: [1, 2, 3]
start with empty. eg: []

for one of each from input_arr put into empty arr (prefix_arr)
	gen new stack for each item pulled
	update the input_arr with that removed item

[1] arr = [2,3]
[2] arr = [1,3]
[3] arr = [1,2]

repeat the same until the something becomes empty
"""

def gen_subset(arr):
	def bt(st, prefix):

		for i in range(st, len(arr)):
			# [], [a,b,c] -> put each char in prefix
			# for each iterate from next idx, so char is not repeated
			prefix.append(arr[i])
			bt(i+1, prefix)
			prefix.pop()
	
	bt(0, [])
gen_subset([1,2,3])

#################
# INSERTION SORT#
#################

# take an entry from 1 till end of array
# for each iter, walk backward and keep swapping
#	until holding val is not lesser
def insertion_sort(arr):
	for i in range(1, len(arr)):
		j = i
		while j > 0 and arr[j-1] > arr[j]:
			arr[j-1], arr[j] = arr[j], arr[j-1]
			j -= 1

arr = [5,3,2,5,6,7,13]
insertion_sort(arr)
print(arr)

#################
## QUICK SORT ###
#################

# pick a pivot (in value)
# two ptrs, slo, fast: j holds position of everything less. i iterates array
# anything less than pivot found, put in j position, increment j

def quick_sort(arr, lo, hi):

	if hi == lo:
		return

	pivot = arr[hi - 1]
	j = lo
	for i in range(lo, hi):
		if arr[i] < pivot:
			arr[i], arr[j] = arr[j], arr[i]
			j += 1
	
	# put pivot in place now
	arr[j], arr[hi-1] = arr[hi-1], arr[j]

	quick_sort(arr, lo, j)
	quick_sort(arr, j+1, hi) # no need to account for pivot at j

arr = [5,3,12,51,6,7,13,8]
quick_sort(arr, 0, len(arr))
print(arr)


##################
## binary search #
##################

# use <= when looking for exact match
# use < when looking for closest match

def bin_search(arr, item):

	l, r = 0, len(arr)-1
	ans = -1

	# equal to because case mid == l == r
	while l <= r:
		mid = (l + r) // 2

		if arr[mid] == item:
			# return idx
			return mid

		elif arr[mid] > item:
			r = mid - 1

		else:
			# case len(arr) == 2, avoid redundant 0
			l = mid+1

	return ans

print(bin_search([1,3,4,7,23,25], 4))


#################
##### SORT ######
#################

print(sorted([1, 2, 3, 4], key=lambda x: -x))
print(sorted([(1,2), (1,3), (5,6), (1,1)], key=lambda x: (x[0], x[1])))

def my_srt(x, y):
	if x == 55: return -1
	if y == 55: return 1
	if x < y: return -1
	if y < x: return 1
	if x == y: return 0

print(sorted([1, 2, 3, 4, 55, 55, 22], key=functools.cmp_to_key(my_srt)))

arr.sort()
arr.sort(reverse=True)

from operator import itemgetter, attrgetter
arr.sort(key=itemgetter(1))
arr.sort(key=attrgetter('age'))


#################
### ITERTOOLS ###
#################

itertools.accumulate([1, 2, 3], lambda x,y: x+y)

# x + y
itertools.chain([1, 2, 3], [3, 4, 5])

itertools.dropwhile(lambda x: x != 2, [1, 2, 3])

# (idx + 1) % len(arr)
itertools.cycle(range(10))

itertools.permutations([1, 2, 3])

itertools.combinations([1, 2, 3], 2)

itertools.zip_longest([1, 2, 3], ['a', 'b', 'c'], fillvalue=None)

#################
##### ARRAY #####
#################

filter(lambda x: x is not None, [1, 2, 3, None])

map(lambda x: x*2, [1, 2, 3, 4])

functools.reduce(lambda x,y: x+y, [1, 2, 3, 5])

list(zip([1, 2, 3], [4, 5, 6]))

arr = [1, 2, 3]

len(arr)

arr[1:-1]

[1, 2, 3, 3, 3, 5].count(4)
arr.index(2)
arr.insert(2, 344)

arr = arr[:]

arr = arr[::-1]

arr3 = ['a', 'b'] + ['c']

arr.pop(0)

splice = arr[3:5]

arr[-3:]

set(arr)

''.join(['a', 'b'])

##################
##### DICT #######
##################

x = {1:23}
x.get(3, 11) # get default value of 11

##################
##### STRING #####
##################

idx = "asdf".find('s',0,len("asdf"))

idx = "asdfasdf".rfind('f',0, len("asdfasdf"))

string.digits
string.ascii_letters
string.ascii_lowercase
string.ascii_uppercase

''.isalnum()
''.isalpha()
''.count('3', 0, len(''))
''.endswith('asdf', 0, len(''))
''.startswith('asdf', 0, len(''))
''.isdigit()

'A'.isupper()
'a'.islower()
'1'.isdigit()
'a1'.isalnum()

' asdf '.strip().replace('a', 'A')

''.split('.')
list('123')

#################
###### SET ######
#################
x = set()
x = {x for x in range(10)}
x.difference({3,4,5}).update({4, 0})  # use add for single item
x.update({5})
x.union({3,4,5})

x.intersection({3,4,5})


#################
###### heapq ####
#################

from collections import namedtuple
import heapq

Person = namedtuple('Person', ['name', 'age'])
arr = [Person('amal', 35), Person('Jon', 22)]

h = []
# heapq.heappush(arr, (val, datastruct))
for v in arr:
	heapq.heappush(h, (v.age, v))

# by default its heapmin. for max, set value to -v
for i in range(len(arr)):
	print(heapq.heappop(h))

#################
### MATH ########
#################

from math import floor, ceil
floor(3.3)
ceil(3.3)

#################
### RANDOM ######
#################

import random

arr = [1, 2, 3]

random.randrange(0, 30)

random.sample(arr, 2) # 2 random vals returned

random.shuffle(arr)


#################
### DATETIME ####
#################

import pytz
import datetime

# '2024-02-13T12:38:11.028320'
datetime.datetime.now().isoformat()

datetime.datetime.now().astimezone(pytz.utc)
datetime.datetime(2024, 2, 13, 20, 38, 11, 28320, tzinfo=pytz.utc)


# 2024-03-31 14:34:50
datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# datetime str to datetime
from dateutil.parser import parse
x = parse('2011-2-2')
print(x.day, x.year, x.month, x.timestamp())

#################
### SNIPPETS ####
#################

### flip-flop values
x = 1; x ^= 1
toggle = lambda x=1: 1 if x != 1 else 3


### call me three times
thr = lambda x,y=0: thr(x,y+1) if y < 3 else x()
thr(toggle)


### flatten array
arg, ans = [[1, 2, 3], [4, 5, 6, [7, 8, 9]]], []
iter_arr = lambda arg: [iter_arr(x) for x in arg] if isinstance(arg, list) else ans.append(arg)
iter_arr(arg)

any([1, 0, 0])		# if any True exists
all([1, 1, 1])		# if all contents are True

max([1, 2, 3], key=lambda x: x)
min([1, 2, 3], key=lambda x: x)

list(dict.fromkeys("asdf"))


from collections import Counter
Counter(arr).most_common(2)[0] 		# 2 most common entries


from collections import defaultdict
x = defaultdict(list)


# deque
from collections import deque
d = deque()
d.append(1)
d.appendleft(0)
_ = d.pop()
_ = d.popleft()


# bisect
import bisect
arr = [1, 2, 3, 6, 7]
bisect.insort_left(arr, 5)


@functools.lru_cache(maxsize=None)
def foo():
	return 4

# nonlocal
def foo():
	arr = [1, 2, 3]
	def foo2():
		nonlocal arr
		print(arr)
	foo2()

# all substring where string is s
s = "asdf"
[s[i:j+1] for i in range(len(s)) for j in range(i,len(s))]

import textwrap
textwrap.wrap("amal is under python practice", 10)

#################
##### GOTCHA ####
#################


x = {}		# this is a declaration of a dict, not a set! 
x = {3}		# this is the definition of a set! 

#################
