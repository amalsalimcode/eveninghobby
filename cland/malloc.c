#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	char *ptr_one;

	ptr_one = (char *)malloc(2 * sizeof(char));

	if (ptr_one == 0)
		{
		printf("ERROR: Out of memory\n");
		return 1;
		}

	*ptr_one = 'a';
	(*ptr_one)++;
	*ptr_one = 'b';
	printf("%c\n", *ptr_one);

	free(ptr_one);

	///////////////////////////////////////////
	char str[255];

	snprintf(str, sizeof(str), "rockon roll");

	printf("%d", strlen(str));

	return 0;
}
