#include <stdio.h>
#include <string.h>
#include <stdlib.h>

struct file_logging_t {
	char name[20];
};


int main(void){

	char amal[13]="hello world";
	char cpy[13];
	struct file_logging_t rocks;
	strcpy(rocks.name, amal);
	puts(rocks.name);

	return;
}
