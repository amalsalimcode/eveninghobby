
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

int main(void){

	int *a;

	int b = 5;

	a = &b;

	*a = 10;

	printf("%d", *a);

}


