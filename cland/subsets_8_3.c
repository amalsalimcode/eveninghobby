#include <stdio.h>
#include <stdlib.h>

void find_combination(char *set_arr, int set_arr_len, char *var_arr, int var_arr_len);
void find_subsets(char *arr, int arr_len);

int main (void)
{

    char arr[4] = {'a', 'b', 'c', 'd'};

    find_subsets(arr, 4);
    //find_combination(NULL, 0, arr, 4);

    return 0;
}

void
find_subsets(char *arr, int arr_len) {


    int idx = 0;
    int arr_idx = 0;
    int remove_idx = 0;

    find_combination(NULL, 0, arr, arr_len);

    /* for array: arr, with size: arr_len, create arr_len number of arr,
     * and for each arr created, remove one element from the original arr
     */
    for ( remove_idx = 0; remove_idx < arr_len; remove_idx++ ) {

        char *set_arr = malloc(sizeof(int)*(arr_len - 1));

        /* set each entry except one */
        for ( idx = 0, arr_idx = 0; idx < arr_len; idx++, arr_idx++ ) {

            if ( idx == remove_idx ) {
                arr_idx++;
            }
            set_arr[idx] = arr[arr_idx];

        }
        find_subsets(set_arr, arr_len - 1);

        free(set_arr);
    }


    return;
}


/*
 * pick each entry in var_arr, then put it in set_arr.
 * For each entry picked, recursively call the function.
 *
 * set_arr begins with size 0, and var_arr begins with size S.
 *
 * First Recursive depth:
 * set_arr size = 1
 * var_arr size = S-1
 *
 * Second Recursive depth:
 * set_arr size = 2
 * var_arr size = S-2
 *
 * Recurse Base Condition:
 * var_arr_len > 0
 *
 * For each iteration in the loop an entry is picked from var_arr
 * and dropped in set_arr
 */
    void
find_combination(char *set_arr, int set_arr_len, char *var_arr, int var_arr_len)
{

    if ( var_arr_len == 0 ) {
        return;
    }

    /* print the combination */
    int idx = 0;
    for ( idx = 0; idx < set_arr_len; idx++) {
        printf("%c ", set_arr[idx]);
    }
    //printf("var ");
    for ( idx = 0; idx < var_arr_len; idx++ ) {
        printf("%c ", var_arr[idx]);
    }
    printf("\n");

    int subset_idx = 0;
    for ( subset_idx = 0; subset_idx < var_arr_len; subset_idx++ ) {

        char *new_set_arr = malloc(sizeof(int)*(set_arr_len + 1));
        char *new_var_arr = malloc(sizeof(int)*(var_arr_len - 1));

        int idx = 0;
        for ( idx = 0; idx < set_arr_len; idx++ ) {
            new_set_arr[idx] = set_arr[idx];
        }
        /* pick element from var_arr and put in new_set_arr */
        new_set_arr[idx] = var_arr[subset_idx];

        int tmp_idx = 0;
        for ( idx = 0; idx < var_arr_len; idx++ ) {
            /* new_var_arr should have everything except
             * the entry that was put in new_set_arr*/
            if ( idx == subset_idx ) {
                tmp_idx++;
            }
            new_var_arr[idx] = var_arr[tmp_idx++];
        }

        find_combination(new_set_arr, set_arr_len + 1, new_var_arr, var_arr_len - 1);

        free(new_set_arr);
        free(new_var_arr);
    }

    return;
}
