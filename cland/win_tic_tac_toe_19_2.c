#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct matrix {
    int val[3][3];
} matrix_t;

bool row_check(matrix_t *m, int row_num);
bool col_check(matrix_t *m, int col_num);
bool diag_check(matrix_t *m);

int main ( void ) {

    //1 for x, 0 for o, and -1 for no entry
    matrix_t m = { {{ 1,  0,  0 },
                    { 0,  1,  1 },
                    { 0, -1,  1 }} };

    bool row = row_check(&m, 0) && row_check(&m, 1) && row_check(&m, 2);
    bool col = col_check(&m, 0) && col_check(&m, 1) && col_check(&m, 2);

    if ( row || col || diag_check(&m) ) {
        printf("someone has won\n");
    }

    return 0;
}

bool row_check(matrix_t *m, int row_num) {
    return m->val[row_num][0] == m->val[row_num][1] == m->val[row_num][2];
}

bool col_check(matrix_t *m, int col_num) {
    return m->val[0][col_num] == m->val[1][col_num] == m->val[2][col_num];
}

bool diag_check(matrix_t *m) {
    bool l_diag = m->val[0][0] == m->val[1][1] == m->val[2][2];
    bool r_diag = m->val[0][2] == m->val[1][1] == m->val[2][0];

    return l_diag | r_diag;
} 
