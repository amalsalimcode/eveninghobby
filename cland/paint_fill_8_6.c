#include <stdio.h>
#include <stdlib.h>

#define BOARD_LEN 8
#define COLOR_VAL 3

typedef struct matrix {
    int val[BOARD_LEN][BOARD_LEN];
} matrix;

void init_matrix(matrix *m);
void fill_color(matrix *m, int x_val, int y_val);

int main (void) {

    matrix mat;
    init_matrix(&mat);

    fill_color(&mat, 3, 3);
    
    matrix *m = &mat; 
    int idx = 0; 
    for (idx = 0; idx < 8; idx++) {
        printf("%d %d %d %d %d %d %d %d\n",
                m->val[idx][0], m->val[idx][1], m->val[idx][2],
                m->val[idx][3], m->val[idx][4], m->val[idx][5],
                m->val[idx][6], m->val[idx][7]);
    }

    return 0;
}

void
fill_color(matrix *m, int x_val, int y_val) {

    if ( x_val >= BOARD_LEN || x_val < 0 ) {
        return;
    }
    
    if ( y_val >= BOARD_LEN || y_val < 0 ) {
        return;
    }

    m->val[x_val][y_val] = COLOR_VAL;
    
    if ( m->val[x_val+1][y_val] != COLOR_VAL ) {
        fill_color(m, x_val + 1, y_val);
    }

    if ( m->val[x_val-1][y_val] != COLOR_VAL ) {
        fill_color(m, x_val - 1, y_val);
    }
    
    if ( m->val[x_val][y_val+1] != COLOR_VAL ) {
        fill_color(m, x_val, y_val + 1);
    }

    if ( m->val[x_val][y_val-1] != COLOR_VAL ) {
        fill_color(m, x_val, y_val - 1);
    }

    return;

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
