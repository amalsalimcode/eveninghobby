#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <inttypes.h>

uint64_t hash(const char* s, uint64_t seed);


int main(void){

	uint64_t what = hash("helloworld", 0);
	printf("%" PRIu64 "\n", what);

	return;

}

uint64_t
hash(const char* s, uint64_t seed)
{
	uint64_t hash = seed;
	while (*s)
	{
		hash = hash * 101  +  *s++;
	}
	return hash;
}
