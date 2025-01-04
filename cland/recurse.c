#include <stdio.h>
#include <stdlib.h>

void print_reverse(char *sentence);
int factorial(int n);

int main (void ){

	/*
	 * example 1
	 */
	char *sentence = "hello";
	print_reverse(sentence);

	/*
	 * example 2
	 */
	int num = factorial(5);
	printf("%d", num);
}

void print_reverse(char *sentence)
{
	if (*sentence) {
		print_reverse(sentence+1);
	}

	printf("%c", *sentence);


}

int factorial(int n) {
	if(n <= 1 ) {
		return 1;
	}
	return n*(factorial(n-1));
}
