#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define BOARD_LEN 4

typedef struct matrix {
    int val[BOARD_LEN][BOARD_LEN];
}matrix;

typedef struct largest_matrix {
    int start_row;
    int start_col;
    int extension;
} largest_matrix;

void init_matrix(matrix *m);
void find_max_matrix(matrix *m, largest_matrix *l_m, int start_row, int start_col);

int main (void) {

    matrix m = {{0,1,1,1,
                 0,1,1,1,
                 0,1,1,1,
                 0,0,0,0}};

    largest_matrix l_m = {0, 0, 0};

    int row_idx = 0;
    int col_idx = 0;

    for ( row_idx = 0; row_idx < BOARD_LEN; row_idx++ )  {
        for ( col_idx = 0; col_idx < BOARD_LEN; col_idx++ ) { 
            find_max_matrix(&m, &l_m, row_idx, col_idx);
        }
    }

    return 0;
}

void
init_matrix(matrix *m) {

    int row_idx = 0;
    int col_idx = 0;

    for ( row_idx = 0; row_idx < BOARD_LEN; row_idx++ )  {
        for ( col_idx = 0; col_idx < BOARD_LEN; col_idx++ ) { 
            m->val[row_idx][col_idx] = 0;
        }   
    }   

    return;
}


void
find_max_matrix(matrix *m, largest_matrix *l_m,
                int start_row, int start_col)
{ 

    bool dark_spot = false;
    int next_row   = start_row;
    int next_col   = start_col;
    int extension  = 0;

    /* check if start_row, and start_col, have dark spot */
    if( m->val[start_row][start_col] ) {
        dark_spot = true;
    }


    /* for iteration */
    int idx = 0;

    while ( dark_spot ) {

        next_row  = start_row+1;
        next_col  = start_col+1;
        extension++;

        if ( start_col + extension > BOARD_LEN ) {
            break;
        }

        if ( start_row + extension > BOARD_LEN ) {
            break;
        }

       /* check through the column */
        for ( idx = start_col; idx <= start_col+extension; idx++ ) {
            if (m->val[next_row][idx] == 0 ) {
                dark_spot = false;
                break;
            }
        }

        /* check through the row */
        for ( idx = start_row; idx <= start_row+extension; idx++ ) {
            if (m->val[idx][next_col] == 0) {
                dark_spot = false;
                break;
            }
        }

        if ( !dark_spot ) {
            break;
        }

    }

    /* this is the largest matrix seen */
    if ( extension > l_m->extension ) {
        printf("found max matrix"
               " row: %d, col: %d, ext:%d\n", start_row,
                                    start_col, extension);
        l_m->start_row = start_row;
        l_m->start_col = start_col;
        l_m->extension = extension;
    }

    return;
}
