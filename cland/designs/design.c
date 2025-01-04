#include <stdio.h>
#define max 15

int main (void){

	int n = max;
	int count = 0;
	while(n > 0){

		for(count = 0; count < (n-1)/2; count++){
			printf("s", count);
		}
		for(count = 0; count < (max-n+2); count++){
			printf("*");
		}
		for(count = 0; count < (n-1)/2; count++){
			printf(" ", count);
		}
		printf("\n");
		n=n-2;
	}
	while(n < (max-1)/2){

		for(count = 0; count < (n+1); count++){
			printf(" ", count);
		}
		for(count = 0; count < (max-(n+n+2)); count++){
			printf("*");
		}
		for(count = 0; count < (n+1); count++){
			printf(" ", count);
		}
		printf("\n");
		n=n+1;
	}
}
