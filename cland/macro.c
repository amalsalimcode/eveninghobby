#include <stdio.h>
#include <stdint.h>

#define ola "hello world"

#define WOOT 1

/*
 * convert %d to %s
 */
#define xstr(a) str(a)
#define str(a) #a

#define RECORDS 10

#define hello printf("%s,%u", __func__, __LINE__);

int main (void){

#if WOOT
	printf("ok so the value is %d", sizeof(ola)-1);
	printf("ok so the value is %s", str(RECORDS));
#endif

	hello

	return 0;
}
