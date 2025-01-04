#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>

int main() {

	int a = 10;
	int b = 15;

	int c = 0;

	while (b) {

		c = a ^ b;
		b = (a & b) << 1;

		a = c;
	}

	printf("%d", a);

	return 0;
}

