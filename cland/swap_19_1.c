#include <stdio.h>
#include <stdlib.h>

int main ( void ) {

    int a = 5;
    int b = 10;

    a = a^b;
    b = a^b; //b=a^b^b
    a = a^b; //a=a^b ^ a^b^b

    printf("a:%d, b:%d\n", a, b);

    return 0;
}
