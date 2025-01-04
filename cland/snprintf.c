#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

int main()
{
	int aInt = 368;
	int bint = 234;
	char str[15];
	sprintf(str, "%x, %x", aInt, bint);
	strcat(str, ",");
	printf("%s", str);
	return 0;
}
