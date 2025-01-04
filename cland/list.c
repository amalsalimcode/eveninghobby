#include <stdio.h>
#include <stdlib.h>

struct check {
	int amount;
	struct check *next;
};

int main (void){

	struct check amal;
	struct check newgirl;

	amal.amount = 100;
	newgirl.amount = 200;

	amal.next = &newgirl;

	struct check *follow;

	follow = &amal;
	printf("amal value %d\n", follow->amount);

	follow = follow->next;
	printf("girl amount value %d\n", follow->amount);

	follow->next = (struct check*)malloc(sizeof(struct check));
	follow->next->amount = 700;

	follow = follow->next;
	printf("the list value %d\n", follow->amount);

	follow->next = &amal;

	int i = 0;
	for(i = 0;i<10; i++){

		printf("the list value %d\n", follow->amount);
		follow = follow->next;
	}
}
