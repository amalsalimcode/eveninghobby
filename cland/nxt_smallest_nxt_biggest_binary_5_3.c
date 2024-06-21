#include "binary.h"

int main (void) {

    /* start with a number */
    int num = 5;
    PRINT_B(num); // 0101 

    /*
     * The following snippet, gets the next largest
     * value with the same number of bits
     */
    int one_exists  = 0;
    int zero_exists = 0;

    int num_idx = 0;
    /* we iterate right to left, then check where the last '01' exists */
    for ( num_idx = 0; num_idx < sizeof(num); num_idx++ ) {
        /* comments when num_idx == 0 */
        one_exists  = num & ( 1 << num_idx ); /* 0101 & 0001 */
        zero_exists = (num & CREATE_MASK(num_idx+1, num_idx+2)) == num; /* 0101 & 1101 == 0101 */

        if ( one_exists && zero_exists ) {
            break;
        }

    }

    /* once we know where '01' exists, swap the bits */
    int one_mask = 1 << (num_idx+1);
    num |= one_mask; /* 0101 | 0010 */

    int zero_mask = CREATE_MASK(num_idx, num_idx+1); /* 1110 */
    num &= zero_mask; /* 0101 & 1110 */

    printf("\n");
    PRINT_B(num);
 
    /*
     * The following snippet, gets the next lower
     * value with the same number of bits
     */

    /*
     * The difference here is that instead of looking for '01',
     * we look for '10', and then swap the bits
     */
       
    num = 5;
    for ( num_idx = 0; num_idx < sizeof(num); num_idx++ ) {
        zero_exists = (num & CREATE_MASK(num_idx, num_idx+1)) == num;
        one_exists  = num & ( 1 << (num_idx+1) );

        if ( one_exists && zero_exists ) {
            break;
        }

    }

    one_mask = 1 << (num_idx);
    num |= one_mask;

    zero_mask = CREATE_MASK(num_idx+1, num_idx+2);
    num &= zero_mask;

    printf("\n");
    PRINT_B(num);

    return 0;
}
