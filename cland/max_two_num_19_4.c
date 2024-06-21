#include <stdio.h>
#include <stdlib.h>

int main ( void ) {

    int a = 5;
    int b = 10;

    int c = a-b;

    //now check if c is negative (b > a)
    //if c is -ve, k == 1, else k == 0
    int k = (c >> 31) & 0x1;

    int z = a - k*(a-b);

    printf("greater number is %d", z);

    return 0;
}
