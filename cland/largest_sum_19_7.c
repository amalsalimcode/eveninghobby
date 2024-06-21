#include <stdio.h>
#include <stdlib.h>

#define ARR_LEN 8

typedef struct max_len {
    int start_idx;
    int end_idx;
    int total;
} max_len_t;

int main (void) {

    int arr[ARR_LEN] = { 5, 4, 1, -1, -3, 0, -50, 9 };

    max_len_t record     = {0,0,0};
    max_len_t tmp_record = {0,0,0};

    int idx = 0;
    for ( idx = 0; idx < ARR_LEN; idx++ ) {
        
        /* update total */
        tmp_record.total   = tmp_record.total + arr[idx];
        tmp_record.end_idx = idx;

        /* less than zero means,
         * we need to restart sequence from next +ve sum */
        if ( tmp_record.total < 0 ) {
            while (arr[idx] < 0 && idx < ARR_LEN ) {
               idx++;
            } 
            /* record new start sequence */
            tmp_record.start_idx = idx;
            tmp_record.end_idx   = idx;
            tmp_record.total     = arr[idx];
        }

        /* we found a larger record. save it */
        if ( tmp_record.total > record.total ) {
            record.total     = tmp_record.total;
            record.end_idx   = tmp_record.end_idx;
            record.start_idx = tmp_record.start_idx;
        }

    }

    for ( idx = record.start_idx; idx <= record.end_idx; idx++ ) {
        printf("%d ", arr[idx]);
    }

    return 0;
}
