#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int global=100;


char number(char a);

void change_value(int a, int *b);

int main (void){


	int hi=66;
	int bye;
	change_value(hi, &bye);
	printf("%d", bye);

	return;
/*
    char *b = NULL;
    int c;
    if((b) && (c=number(*b))!='3'){
	    printf("%c", c);
    }

    return 0;
    */
}

char number(char a){
	return a;
}

void change_value(int a, int *b){
	*b=50;
}
