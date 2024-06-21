#include <stdlib.h>
#include <stdio.h>

int fibonacci(int n) {

int main (void) {

    int ret = fibonacci(4);
    printf("ret value: %d", ret);

    return 0;
}

int fibonacci(int n) {

    if ( n < 1 ) {
       return 0;
    } 

    if ( n == 1 ) {
        return 1;
    } else {
        return fibonacci(n-1) + fibonacci(n-2);
    }
}
