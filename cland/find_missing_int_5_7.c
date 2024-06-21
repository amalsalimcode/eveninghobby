#include <stdio.h>
#include "binary.h"

bool fetch_jth_bit(int bit_idx, int value);
int construct_num_from_bit(int arr_idx);

#define ARR_SZ 5

int main (void)
{

    int idx = 0;

    for ( idx = 0; idx < ARR_SZ; idx++ ) {
        int res_a = construct_num_from_bit(idx);
        int res_b = construct_num_from_bit(idx+1);
        if ( (res_a - res_b) != 1 ) {
            printf("the missing number is %d", res_a-1);
            break;
        }
    }

    return 0;
}

bool
fetch_jth_bit(int bit_idx, int arr_idx) {
    int arr[ARR_SZ] = {6, 4, 3, 2, 1};
    return (arr[arr_idx] & (1 << bit_idx) );
}

int
construct_num_from_bit(int arr_idx)
{   
    int idx = 0;
    int num = 0;
    for (idx = 0; idx < sizeof(int); idx++) {
        num |= (fetch_jth_bit(idx, arr_idx) << idx);
    }

    return num;
}
