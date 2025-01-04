#include <stdio.h>
#include <stdint.h>


int main (void ){

	int a = 5;
	char amal[a];

	int i = 0;
	for (i = 0; i < a; i++) {
		printf("c");
		amal[i] = 'd';
	}

	for (i = 0; i < a; i++) {
		printf("%c", amal[i]);
	}



	return 0;
}

