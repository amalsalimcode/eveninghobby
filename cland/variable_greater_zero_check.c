#include <stdio.h>
#include <stdint.h>


int leter();

int main (void ){

	int a = 0;
	if (!a){
		printf("you");
	}
	return 0;
	char letter = (const char)leter();
	uint64_t value = (uint64_t)letter;

	printf("ok so the value is %02x", value);


	return 0;
}

int leter(){
	return 23;
}
