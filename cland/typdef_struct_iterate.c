
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

typedef struct rock {
	int a;
} rock_t;

int main(void){

	rock_t *counter = malloc(20*sizeof(counter));

	rock_t *follower;
	follower = &counter[0];
	follower->a = 10;

	follower = &counter[1];
	follower->a = 20;

	follower = &counter[2];
	follower->a = 30;

	follower = &counter[3];
	follower->a = 40;

	follower = &counter[4];
	follower->a = 50;

	follower = &counter[5];
	follower->a = 60;


	printf("%d", counter[0].a);
	printf("%d", counter[1].a);
	printf("%d", counter[2].a);
	printf("%d", counter[3].a);
	printf("%d", counter[4].a);
	printf("%d", counter[5].a);

}
