
p = console.log;

String.prototype.measure = function () { return this + ":" + this.length }
p('asdf'.measure())

function Tune(song, artist) {
	this.access1 = () => (song + artist)
}

// new turns it into a constructor call
var happySongs = new Tune("Put", "Ella")
console.log(happySongs.access1())


/* ----------------- FUNCTION ---------------- */

// allowing a function that is intensive to execute when there is time and not immediately

var foo = function (arg, cb) {
	var res = arg * 9832;
	if (cb && typeof cb === 'function') { cb(res) }
};

var cb = function (v) { p("here is res", v); };

setTimeout(() => (foo(777, cb)), 0);



function x(a, b) {
	return a + b
}
var x = function (a, b) { return a + b }
var x = ((a, b) => a + b)
var x = ((a, b) => { return a + b })

var recur = function (a) {
	return a == 1 ? a : a * recur(a - 1)
}

var x = (a => a * 77)
var y = function (a, b) {
	return typeof (b) === 'function' ? a + b(a) : a + 10
}

p(y(10, x))


// string to array
var s = "123"
var arr = [...s].map((v, i, arr) => Number(v))

// array to string
p([1, 2, 3].join(''))

// dict to arr
Object.entries({ 1: 'a', 2: 'b' }).forEach(([k, v], i) => i === 0 ? r = [Number(k)] : r.push(Number(k)))


// iterate array
var arr = [1, 2, 3]
for (let x in arr) {
	p(x)
}
arr.forEach((v, i, arr) => p(v))
p(arr.reduce((p,c,i,a) => (p+c)))

/* ----------------- SET ---------------- */

x = new Set()
x.add(1)
p(x.has(1))
p(x.size)

arr = [...x]
p(arr)

/* ----------------- DICT ---------------- */

//remember that all keys get converted to string

x = { 1: 3 }
Object.entries(x).forEach(([key, value]) => console.log(key, value));
p(Object.keys(x))
p(Object.values(x))
p(1 in x)

/* ----------------- ARRAY ---------------- */

p(Array.from({ length: 10 }, (_, i) => (i)))

var a = [1, 2, 3], b = [1, 2, 3, 4]

//array to string
var str = a.join()

// reduce will take init arg {}. if you don't provide init will be first value, iter will begin from second
var x = a.concat(b).reduce((accumulator, cv, index) => (
	{ ...accumulator, [cv]: accumulator[cv] ? accumulator[cv] + 1 : 1 }
), {});

x = Array.from({ length: 10 }).fill(7, 0, 5).fill(11, 5, 10).map((v, i, a) => v * 2)

x = Array.from({ length: 10 }).map(() => Array.from({ length: 10 }).map((v, i, a) => i * 10))
x = Array.from({ length: 10 }, (_, i) => Array.from({ length: 10 }, (_, i2) => i * i2))

// init an array of 10, remove 4 from it
x = Array.from({ length: 10 }, (_, i) => i)
x.splice(x.indexOf(4), 1)
p(x)

/* ----------------- ARRAY2 ---------------- */

// flatten array
x = [[1, 2], [3, 4]].flat()

rm_three_mul_four = x.filter((v, i, arr) => v !== 3).map((v, i, arr) => v == 4 ? v ** 2 : v)
gr_than_10_exists = x.filter((v, i, arr) => v > 10).length > 0

while (x.indexOf(2) != -1) {
	x.splice(x.indexOf(2), 1)
}

var x = [1, 2, 3, 4, 2]
p(x.indexOf(2, 3))

x.push(99)
x = x.concat([100, -1, 100, -2, -3], [55])

x = x.sort((a, b) => a == 100 ? -1 : b == 100 ? 1 : a - b).reverse()
p(x)

/* ----------------- STRING ---------------- */
var x = '0', y = '1'
p(Number(x) === 0)

//string to array
var x = [..."hello world. This is a second space"]

// last index of
x.reduce((acc, v, i) => (acc = v === " " ? i : acc), 0) === x.lastIndexOf(' ')


z = x + y

var x = 'asdf'
p(x === 'asdf')
p(typeof (x) === 'number', typeof (x) !== 'string',
	typeof (x) !== 'boolean', typeof (x) === 'function', typeof (x) === 'undefined')


//indexOf, substring
var str1 = "Hello.amal."
var st = str1.indexOf(".")
var end = str1.indexOf(".", st + 1)
p(str1.substring(st + 1, end))

str1 = str1.replace("amal", "voilawala")
p(str1)

str1 = " ".repeat(4)

// more str func
p(str1.charAt(2), str1.length, str1 + ":" + str1)
p(str1.lastIndexOf(" "))
p(str1.indexOf(" "))


// str to arr
var str1 = "apple: orange:mango"
var arr = str1.split(":")
arr.forEach((v, i, arr) => { arr[i] = arr[i].trim() })

x = "apple:orange:mango"
x.indexOf("a")
p(x.substring(x.indexOf("a"), x.indexOf(":")))
p(x.slice(1, x.length))


/* ----------------- OTHER ---------------- */
Math.max(...[arr])

// check if var is defined
typeof (m) === 'undefined'

