#include <stdio.h>
#include <stdlib.h>
#include <inttypes.h>
#include <string.h>
#include <stdbool.h>

void print_st(void);
void print_st2(void);

bool nvme_is_pegasus_enabled(void);

int main (void ){

	printf("%d\n", 4096 % 4096 );
	printf("%d", 64 % 4096 );
	return 0;
	int out_day;
	int out_mnt;
	int out_yr;

	scanf("%d %d %d", &out_day, &out_mnt, &out_yr);

	int ret_day;
	int ret_mnt;
	int ret_yr;

	scanf("%d %d %d", &ret_day, &ret_mnt, &ret_yr);


	if ( ret_yr  - out_yr ) {
		printf("10000");
		return 0;
	}

	int diff_mnt = abs(ret_mnt - out_mnt);
	if ( diff_mnt ) {
		printf("%d", diff_mnt * 500);
		return 0;
	}

	int diff_days = abs(ret_day - out_day);
	if ( diff_days ) {
		printf("%d", diff_days * 15);
		return 0;
	}

	printf("0");

	return 0;
}


bool nvme_is_pegasus_enabled(void)
{
	return true;
}
void print_st(void) {

	static int a = 0;

	printf("%d", a++);

}

void print_st2(void) {

	static int a = 0;
	int *b;
	b = &a;

	*b = *b + 1;

	printf("%d", a++);

}
