#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include "binary.h"


int main ( void ) {

    uint32_t a = B_TO_INT(111001101);
    uint32_t b = B_TO_INT(100110101);

    uint32_t mask = CREATE_MASK(2, 3);

    printf("here is the mask");
    PRINT_B(mask);
    printf("\n");

    uint32_t mask_cmp = ~mask;

    uint32_t b_isolated = b & mask_cmp;
    uint32_t a_cleared  = a & mask;

    PRINT_B(a_cleared | b_isolated);
    printf("\n");

    return 0;
}
