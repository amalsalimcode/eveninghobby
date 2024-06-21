factorial = lambda x: x * factorial(x - 1) if x > 1 else x
factorial(4)