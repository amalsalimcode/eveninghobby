#include <stdio.h>
#include <stdint.h>
#include <string.h>


typedef struct rock {
	char *name;
}rock_t;

int main (void ){

	char name[10];
	name[0]= 'a';
	name[1]= 'b';
	char nameme[10];

	memcpy(nameme, name, 40);
	printf("%s", nameme);
	return;

	rock_t *example;
	int chores[2];
	chores[0] = 6;
	chores[1] = 19;

	int copy[2];
	memcpy(copy, chores, 2*sizeof(int));
	printf("%d", copy[0]);

	char *hi = NULL;
	char *bye;
	memcpy(bye, hi, 5);
	printf("%s", bye);


	return 0;
}
