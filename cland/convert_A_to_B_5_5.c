#include "binary.h"

int main ( void ) {

    int a = 31;
    int b = 14;

    int res = a ^ b;
    int one_count = 0;

    while ( res ) {
        if ( res & 1 ) {
            one_count++;
        }
        res = res >> 1;
    }

    printf("There are %d bit differences\n", one_count);

    return 0;
}
