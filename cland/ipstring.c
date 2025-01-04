
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <stdint.h>


int main()
{
	uint32_t ip = 3242341245;
	char ip_str[200];
		snprintf(ip_str, 200, "%d.%d.%d.%d",
				(ip ) & 0xff,
				(ip ) & 0xff,
				(ip ) & 0xff,
				ip & 0xff);
		printf("%s", ip_str);
	return 0;
}

