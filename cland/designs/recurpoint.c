#include <stdio.h>
#define MAXIMUM 15

void recur(int *, int *);

int main (void){

	int max = 15;
	int init = -1;

	int *maxim = &max;
	int *initi = &init;
	recur(maxim, initi);

}


void recur(int *max, int *init){
	
	int i = 0;
	for(i = 0; i < *max; i++){
		printf(" ");
	}
	for(i = 0; i < *init; i++){
		printf("*");
	}
	//printf("max value: %d and init value: %d\n", max, init);
	printf("\n");
		*init = *init+2;
		*max = *max - 1;
	if(*max > 0){
		recur(max, init);
	}
	*init = *init-2;
	*max = *max + 1;
	for(i = 0; i < *max; i++){
		printf(" ");
	}
	for(i = 0; i < *init; i++){
		printf("*");
	}
	printf("\n");





}
