#include <stdio.h>
#include <stdlib.h>

void move_ptr(char *x);

int main (void) {

    char x[6];
    x[5] = 'X';
    move_ptr(x);

    return 0;
}

void move_ptr(char *x)
{
    printf("%c\n", *(x+5));
    printf("%c\n", x[5]);

    return;
}
