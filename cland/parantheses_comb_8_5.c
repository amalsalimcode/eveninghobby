#include <stdio.h>
#include <stdlib.h>

void print_comb(int open_cnt, int close_cnt, char *arr, int arr_idx);

int main (void) {

    int bracket_set_cnt = 3;
    char arr[6];
    print_comb(bracket_set_cnt, bracket_set_cnt, arr, 0);

    return 0;
}

void
print_comb(int open_cnt, int close_cnt, char *arr, int arr_idx)
{

    if ( arr_idx == 6 ) {
        printf("%s\n", arr);
        return;
    }

    if ( close_cnt < open_cnt ) {
        return;
    }

    if ( open_cnt ) {
        arr[arr_idx] = '(';
        print_comb(open_cnt-1, close_cnt, arr, arr_idx+1);
    }

    if ( close_cnt ) {
        arr[arr_idx] = ')';
        print_comb(open_cnt, close_cnt-1, arr, arr_idx+1);
    }

    return;
}
