
#include <stdio.h>
#include <stdlib.h>

const char * whynot();

int main(void){

	//char *training = whynot();

	printf("%d\n", strcmp("00:a0:98:19:53:ee", " "));
	printf("%d\n", strcmp("00:a0:98:32:d6:ac", "00:a0:98:32:d6:dc"));
	printf("%d\n", strcmp("00:a0:98:32:d6:dc", "00:a0:98:19:55:16"));

	return 0;
}

const char * whynot(){
	return "hello world";
}
