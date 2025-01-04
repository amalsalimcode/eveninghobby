#include <stdio.h>
#include <stdlib.h>
#include <string.h>


void print_rev(char *name);

int main (void)
{
	char *name = "amal";
	print_rev(name);

	int i = 0;

	for ( i = strlen(name); i >= 0; i-- ) {
		printf("%c", name[i]);
	}
}

void
print_rev(char *name) {

	if (!*name) {
		return;
	}

	print_rev(name+1);
	printf("%c", *name);
}
