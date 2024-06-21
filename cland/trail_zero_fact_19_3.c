#include <stdio.h>
#include <stdlib.h>


int main ( void ) {

    int val = 11;
    int factor = 5;

    /* keep dividing with squares of 5 until you can't */
    int cnt = 0;
    while (val/factor >= 1) {
        factor = factor * factor;
        cnt++;
    }

    printf("the number of zero is %d\n", cnt);

    return 0;
}
