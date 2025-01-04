#include <stdio.h>
#include <stdint.h>
#include <string.h>


int leter();

int main (void ){

	char *rock = NULL;
	printf(	"%x", (int) strtol("0B000000", &rock, 10) );
	printf(	"%x", (int) strtol("11000000", &rock, 10) );
	return 0;







	printf(	"%d", (int) strtol("asdfasd", &rock, 0) );
	printf("%s", rock);

	printf(	"%d", (int) strtol("asdf", &rock, 0) );
	printf("%s", rock);

	return 0;
}

int leter(){
	return 23;
}
