
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>
#include <string.h>


int main(void){

	char *data = "\000\000\017\313";

	printf("%c", data[0]);
	printf("%c", data[1]);
	printf("%c", data[2]);
	printf("%c", data[3]);
	return 0;

}
