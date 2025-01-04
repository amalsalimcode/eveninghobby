#include <sys/types.h>
#include <sys/socket.h>
#include <stdio.h>

int main (void) {

	int ab=9;
	int cd=2;
	printf("%02d.%02d", cd, ab);
	return 0;

	u_short a = 2;
	u_short n;

	n = htons(a);

	printf("%u, %u", a, n);
	return 0;
}
