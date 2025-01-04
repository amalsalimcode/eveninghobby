#include <stdio.h>
#define MAXIMUM 15

void recur(int, int);

int main (void){

	recur(15, -1);

}


void recur(int max, int init){
	
	int i = 0;
	for(i = 0; i < max; i++){
		printf("s");
	}
	for(i = 0; i < init; i++){
		printf("*");
	}
	//printf("max value: %d and init value: %d\n", max, init);
	printf("\n");
		init = init+2;
		max--;
	if(max > 0){
		recur(max, init);
	}
	for(i = 0; i < max; i++){
		printf(" ");
	}
	for(i = 0; i < init; i++){
		printf("*");
	}
	//printf("max value: %d and init value: %d", max, init);
	printf("\n");





}
