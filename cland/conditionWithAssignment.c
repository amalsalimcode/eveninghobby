
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

int returnfive() {
	return 5;
}

int main(void){

	int a = 0;

	if( (a=returnfive()) == 7){
		printf("yo it works %d", a);
	}


}

