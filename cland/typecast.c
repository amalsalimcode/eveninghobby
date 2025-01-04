
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <inttypes.h>


int main(void){

	char letter = '9';
	uint8_t num = letter - '0';
	//printf("%d", num);

	uint16_t count = 1;

	printf("%02u:%c", count, (count+64));

	return 0;
}
