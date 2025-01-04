#include <stdio.h>
#include <stdlib.h>


struct node {
	int index;
	struct node *next;
	int enaddr[6];
};

int main(void){

	struct node *voila;
	voila = (struct node *)malloc(sizeof(struct node));
	free(voila);
	if(voila) {
		printf("%d\n", voila);
	}
	voila->enaddr[0] = 23;
	voila->enaddr[1] = 13;
	voila->enaddr[2] = 25;
	printf("%d\n", voila->enaddr[0] << 2);
	printf("%d\n", voila->enaddr[1]);
	printf("%d\n", voila->enaddr[2]);
	printf("%d\n", !((voila->enaddr[0] == 0) && (voila->enaddr[1] == 0) && (voila->enaddr[2] == 0)));
	voila->index = 10;
	printf("%d\n", voila->index);
	return 0;

/*
	voila
		typedef void *  sk_Pid;
	char * sentence = "hello world";
	sk_Pid amal = sentence;
	sk_Pid blah = amal;
	blah = "kill me now";

	printf("ok so the value that you have is %s", amal);
*/
}
