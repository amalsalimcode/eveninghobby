#include <stdio.h>
#include <stdlib.h>

int find_sum(int a, int b);

int main (void) {

    int a = 12342;
    int b = 23459;

    printf("%d", find_sum(a, b));

    return 0;
}

int
find_sum(int a, int b)
{
    int sum = a ^ b;
    int carry = a & b;

    if ( carry == 0 ) {
        return sum;
    } else {
        return find_sum(sum, carry << 1);
    }
}
