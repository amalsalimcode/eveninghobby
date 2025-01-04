#include <stdio.h>

struct phone {
	char *messages;
	char *voicemail;
};

void seecontents(struct phone *hi);


int main (void){

	struct phone hello = {"hello world", "bad password"};

	struct phone *follow;

	follow = &hello;
        printf("%s", follow->messages);

	struct phone *spy;
        spy = &hello;
	seecontents(spy);

}

void seecontents(struct phone *hi){
	
	puts(hi->messages);
}
