#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

#define BOARD_LEN 8
#define BOARD_DIMENSION 2

typedef struct matrix {
    int val[BOARD_LEN][BOARD_LEN];
}matrix;

typedef struct queen_pos {
    int row;
    int col;
}queen_pos;

void set_queen_all_power(matrix *m, queen_pos *q_pos, int queen_cnt);
void register_queen_pos(queen_pos *q_pos, int queen_idx, int row, int col);
bool get_pos_at_count(matrix *m, int count_idx, int *row, int *col);
void set_queen_power(matrix *m, int row, int col);
void init_matrix(matrix *m);
void print_all_queen_pos(queen_pos *q_pos, int queen_cnt);
void find_queen_pos(matrix *m, queen_pos *q_pos, int queen_cnt);
int get_avail_pos_count(matrix *m);

int main (void) {

    /* chess board has 8 rows, 8 columns */
    matrix m;
    init_matrix(&m);

    /* the question mentions 8 queens */
    queen_pos q_pos[8];
    int idx = 0;
    for ( idx = 0; idx < 8; idx++ ) {
        q_pos[idx].row = 0;
        q_pos[idx].col = 0;
    }
    print_all_queen_pos(q_pos, 8);

    find_queen_pos(&m, q_pos, 0);

    return 0;
}

void
find_queen_pos(matrix *m, queen_pos *q_pos, int queen_cnt) {


    int count = get_avail_pos_count(m);

    int tmp_count = 0;

    for ( tmp_count = 0; tmp_count < count; tmp_count++ ) {


        int avail_row = 0;
        int avail_col = 0;

        if ( !get_pos_at_count(m, tmp_count, &avail_row, &avail_col) ) {
            return;
        }

        register_queen_pos(q_pos, queen_cnt, avail_row, avail_col);

        set_queen_all_power(m, q_pos, queen_cnt);

        count = get_avail_pos_count(m);

        /* 8 queens, but starting at 0 */
        if ( queen_cnt == 7 ) {
            printf("\nFound new SET\n");
            print_all_queen_pos(q_pos, queen_cnt);
            return;
        }


        /* recursive call */
        find_queen_pos(m, q_pos, queen_cnt+1); 

        set_queen_all_power(m, q_pos, queen_cnt);

        queen_cnt++;

    }

}

void
set_queen_all_power(matrix *m, queen_pos *q_pos, int queen_cnt)
{
    init_matrix(m);

    int idx = 0;
    for ( idx = 0; idx <= queen_cnt; idx++ ) {
        set_queen_power(m, q_pos[idx].row, q_pos[idx].col);
    }

}

void
print_all_queen_pos(queen_pos *q_pos, int queen_cnt)
{

    int q_idx = 0;
    for ( q_idx = 0; q_idx <= queen_cnt; q_idx++ ) {
        printf("the queen idx: %d, row: %d, col: %d\n",
                            q_idx, q_pos[q_idx].row, q_pos[q_idx].col);
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

void
register_queen_pos(queen_pos *q_pos, int queen_idx, int row, int col) {

    q_pos[queen_idx].row = row;
    q_pos[queen_idx].col = col;

    return;
}

void
set_queen_power(matrix *m, int row, int col) {

    int row_idx = 0;
    int col_idx = 0;

    /*
     * for simplicity, lets ignore their diagonal power
     * Setting row and col power
     */
    for ( row_idx = 0; row_idx < 8; row_idx++ )  {
        for ( col_idx = 0; col_idx < 8; col_idx++ ) {
            if ( row_idx == row || col_idx == col) {
                m->val[row_idx][col_idx] = 1;
            } 
        }
    }

}

int
get_avail_pos_count(matrix *m) {

    int count = 0;

    int row_idx = 0;
    int col_idx = 0;

    for ( row_idx = 0; row_idx < BOARD_LEN; row_idx++ )  {
        for ( col_idx = 0; col_idx < BOARD_LEN; col_idx++ ) {
            if ( m->val[row_idx][col_idx] == 0 ) {
                count++;
            }
        }
    }

    return count;
}

bool
get_pos_at_count(matrix *m, int count_idx, int *row, int *col) {

    int tmp_idx = 0;

    int row_idx = 0;
    int col_idx = 0;

    for ( row_idx = 0; row_idx < 8; row_idx++ )  {
        for ( col_idx = 0; col_idx < 8; col_idx++ ) {

            if ( m->val[row_idx][col_idx] == 0 ) {
                if ( tmp_idx == count_idx ) {
                    *row = row_idx;
                    *col = col_idx;
                    return true;
                }
                tmp_idx++;
            } 

        }//end col_idx
    }//end row_idx

    return false;
}        

/*
   printf("count: %d, positions_left: %d, queen_cnt: %d\n", tmp_count, count, queen_cnt);
   printf("nxt_row: %d, nxt_col: %d\n", avail_row, avail_col);

   int idx = 0; 
   for (idx = 0; idx < 8; idx++) {
   printf("%d %d %d %d %d %d %d %d\n", m->val[idx][0], m->val[idx][1], m->val[idx][2],
   m->val[idx][3], m->val[idx][4], m->val[idx][5],
   m->val[idx][6], m->val[idx][7]);
   }
   print_all_queen_pos(q_pos, queen_cnt);
   */
