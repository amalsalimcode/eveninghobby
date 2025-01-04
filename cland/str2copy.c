#include <stdio.h>

void strcopy(char **, char **);

int main(void){

	char *a = "amal";
	char *b;
	strcopy(&a, &b);
	puts(b);
}

void strcopy(char **a, char **b){

	while(**a != '\0'){
		*b = *a;
		*a = *a + 1;
	}
	*b = *b - 3;
	//*b = *b-4;
}


