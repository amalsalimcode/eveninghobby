#include <stdio.h>
#include <stdint.h>

void print(char letter);

int main (void){

    char letter = 'a';
    uint64_t value = (uint64_t)letter;

    print(letter?'a':'b');

    return 0;
}

void print(char letter)
{
	printf("%c", letter);
}

