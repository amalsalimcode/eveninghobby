#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define ARR_SZ 10

int main (void) {

    int arr[ARR_SZ] = {1, 3, 4, 2, 7, 10, 6, 8, 5, 9};
    int search_sum = 7;

    int iter = 0;
    int idx = 0;
    int tmp = 0;

    /* bubble sort */
    for ( iter = 0; iter < ARR_SZ; iter++ ) {
        for ( idx = 0; idx < ARR_SZ-1; idx++ ) {

            if ( arr[idx] > arr[idx+1] ) {
                /*swap*/
                tmp = arr[idx+1];
                arr[idx+1] = arr[idx];
                arr[idx] = tmp;
            }

        }//end of if(idx
    }//end of if(iter

    int *head = arr;
    int *tail = arr + (ARR_SZ - 1);
    printf("head: %d, tail: %d\n", *head, *tail);

    /* we have two pointers. loop until
     * tail and head are at a length */
    while ( tail - head >= 0 ) {
        if ( *head + *tail == search_sum ) {
            printf("comb: %d, %d\n", *head, *tail);
            head++;
            tail--;
        }
        if ( *head + *tail > search_sum ) {
            tail--;
        }
        if ( *head + *tail < search_sum ) {
            head++;
        }
    }

    return 0;
}
