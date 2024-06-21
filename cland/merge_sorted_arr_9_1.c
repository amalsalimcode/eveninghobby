#include <stdio.h>
#include <stdlib.h>

int main (void) {

    int arr1[10] = {1, 7, 9, 15};
    int arr2[6]  = {2, 8, 9, 10, 11, 12};

    int arr2_len = 6;
    int arr1_len = 4;
    int arr1_total_len = 10;

    /* algorithm */

    /* -1, as we index from 0 */
    int iter = arr1_total_len - 1;
    int arr1_idx = arr1_len - 1;
    int arr2_idx = arr2_len - 1;

    for ( ; iter >= 0; iter-- ) {
        if ( arr1[arr1_idx] > arr2[arr2_idx] ) {
            arr1[iter] = arr1[arr1_idx];
            arr1_idx--;
        } else if ( arr2[arr2_idx] > arr1[arr1_idx] ) {
            arr1[iter] = arr2[arr2_idx];
            arr2_idx--;
        } else {
            arr1[iter] = arr1[arr1_idx];
            arr1_idx--;
            iter--;
            arr1[iter] = arr2[arr2_idx];
            arr2_idx--;
        }
    }

    /* end of algorithm */

    /* print array */
    int idx = 0;
    for ( idx = 0; idx < arr1_total_len; idx++ ) {
        printf("%d ", arr1[idx]);
    }
    printf("\n");

    return 0;
}
            

