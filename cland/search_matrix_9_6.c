#include <stdio.h>
#include <stdlib.h>

#define ROW_SZ 4
#define COL_SZ 6

typedef struct row {
    int col_val[COL_SZ];
} row_t;

int main ( void ) {

    row_t matrix[ROW_SZ] = { {  1,  2,  3,  4,  5,  6 }, 
                             {  7,  8,  9, 10, 11, 12 },
                             { 13, 14, 15, 20, 24, 29 },
                             { 32, 34, 42, 50, 53, 59 } };
    
    /* we start our search at first row, last col */
    int row = 0;
    int col = COL_SZ - 1;

    int search_val = 53;

    /*
     * Our search increments the row and decrements the col
     * So set the threshold accordingly
     */
    while ( row < ROW_SZ && col >= 0 ) {

        /* we found a value */
        if ( matrix[row].col_val[col] == search_val ) {
            printf("found value at row: %d, col: %d\n", row, col);
            break;
        }

        if ( matrix[row].col_val[col] < search_val ) { 
            /* our matrix value is smaller, so increment the row to get
             * a bigger matrix value */
            row++;
        } else {
            /* our matrix value is larger, so decrement the col to get
             * a smaller matrix value */
            col--;
        }
    }

    return 0;
}
