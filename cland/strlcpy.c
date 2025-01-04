#include <stdio.h>
#include <stdlib.h>
#include <inttypes.h>
#include <string.h>

int main (void ){

	char tmp_shelf[7] = ".50.A";
	char shelf_info[9] = "0a.50.A";

	printf("%d %d", sizeof(shelf_info), sizeof(tmp_shelf));

	return 0;
}
