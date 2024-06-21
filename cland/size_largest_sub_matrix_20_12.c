#include <stdio.h>
#include <stdlib.h>

#define BOARD_LEN 4

typedef struct matrix {
    int val[BOARD_LEN][BOARD_LEN];
}matrix;

typedef struct largest_matrix {
    int start_row;
    int start_col;
	int end_row;
    int end_col;
	int sum;
} largest_matrix;

void init_matrix(matrix *m);
void find_max_matrix(matrix *m, largest_matrix *largest_m,
                     int start_row, int start_col, int end_row, int end_col);

int main (void) {

    matrix m = {{0, 5, -1, -1,
                 9, 1, -1,-11,
                 0, 1,  1,  1,
                 0, 0,  0,  0}};

    largest_matrix l_m = {0, 0, 0, 0, 0};

    int row_idx = 0;
    int col_idx = 0;

    for ( row_idx = 0; row_idx < BOARD_LEN; row_idx++ )  {
        for ( col_idx = 0; col_idx < BOARD_LEN; col_idx++ ) {
            find_max_matrix(&m, &l_m, row_idx, col_idx, row_idx, col_idx);
        }
    }

    printf("largest found sum: %d\n"
           "start_row: %d, start_col: %d,\n"
           "end_row: %d,   end_col: %d\n", l_m.sum, l_m.start_row, l_m.start_col,
                                           l_m.end_row, l_m.end_col);

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
find_max_matrix(matrix *m, largest_matrix *largest_m,
                int start_row, int start_col,
                int end_row, int end_col)
{

    if ( end_row >= BOARD_LEN || end_col >= BOARD_LEN ) {
        return;
    }

    /* get the sum */
    int sum = 0;
    int row_idx = 0;
    int col_idx = 0;
    for ( row_idx = start_row; row_idx <= end_row; row_idx++ )  {
        for ( col_idx = start_col; col_idx <= end_col; col_idx++ ) {
            sum = sum+ m->val[row_idx][col_idx];
        }
    }

    /* record largest sum if found */
    if ( sum > largest_m->sum ) {
        largest_m->sum = sum;
        largest_m->start_row = start_row;
        largest_m->start_col = start_col;
        largest_m->end_row   = end_row;
        largest_m->end_col   = end_col;
    }

    /* recurse to the next level */
    find_max_matrix(m, largest_m, start_row, start_col, end_row + 1, end_col);
    find_max_matrix(m, largest_m, start_row, start_col, end_row, end_col + 1);
    find_max_matrix(m, largest_m, start_row, start_col, end_row + 1, end_col + 1);

    return;
}
