#include <stdio.h>
#include <stdlib.h>
#include <inttypes.h>

int main (void ){

	uint64_t mac = 0xa098207354;
	uint8_t amal = 0xFE;
	uint8_t status = 3;

	printf("%x", amal & status);


	return 0;
}
