#include <stdio.h>
#include <stdlib.h>

struct hello {
	int a;
	int b;
};

int main(void){

	struct hello *poof;
	poof = (struct hello *)malloc(sizeof(struct hello));
	poof->a = 10;

	int *num;
	num = (int *)malloc(sizeof(int));
	*num = 10;
	printf("%d", *num);

	free(num);
	free(poof);
}
