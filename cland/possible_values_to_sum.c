#include "list.h"

#define ARR_SZ 10

void
check_for_sum (int sum, int *paths_traversed, int *possible_paths, int depth, int req_sum);


int main (void) {

    int arr[ARR_SZ] = { 1, 3, 5, 6, 7, 4, 2 ,10, 8, 12 };

    int sum = 0;

    int paths_traversed[ARR_SZ];
    int idx = 0;
    for ( idx = 0; idx < ARR_SZ; idx ++ ) {
        paths_traversed[idx] = 0;
    }

    check_for_sum(sum, paths_traversed, arr, -1, 3); 

}

void
check_for_sum (int sum, int *paths_traversed, int *possible_paths, int depth, int req_sum) {

    if ( sum == req_sum ) {
        printf("\nI have found the sum. Here is a path.\n");  

        int i = 0;
        for ( i = 0; i <= depth; i++ ) {
            printf("%d ", paths_traversed[i]);
        }
        printf("\n");

    }

    depth++;
    //printf("\n\nNew depth %d\n", depth); 

    if ( depth == ARR_SZ ) {
        return;
    }

    if ( sum > req_sum ) {
        //return;
    }

    int pp_idx = 0;
    for ( pp_idx = 0; pp_idx < ARR_SZ - depth; pp_idx++ ) {

        int tmp_sum = sum + possible_paths[pp_idx];

        //populate paths_traversed
        int tmp_paths_traversed[ARR_SZ];
        int tmp_idx = 0;
        for ( tmp_idx = 0; tmp_idx < ARR_SZ; tmp_idx++ ) {
            tmp_paths_traversed[tmp_idx] = paths_traversed[tmp_idx];
        }
        tmp_paths_traversed[depth] = possible_paths[pp_idx]; 

        //populate possible_paths
        int tmp_possible_paths[ARR_SZ];
        int tmp_idx2 = 0;
        for ( tmp_idx = 0; tmp_idx < ARR_SZ; tmp_idx++ ) {
            if ( tmp_idx != pp_idx ) {
                tmp_possible_paths[tmp_idx2] = possible_paths[tmp_idx];
                tmp_idx2++;
            }
        }

        /*
        printf("values of stack before recurse\n");
        printf("sum: %d, depth: %d\n", tmp_sum, depth);

        printf("paths_traversed\n");
        for ( tmp_idx = 0; tmp_idx <= depth; tmp_idx++ ) {
            printf("%d ", tmp_paths_traversed[tmp_idx]);
        }

        printf("\npossible_paths\n");
        for ( tmp_idx = 0; tmp_idx < ARR_SZ - depth -1; tmp_idx++ ) {
            printf("%d ", tmp_possible_paths[tmp_idx]);
        }
        printf("\n\n\n");
        */

        check_for_sum(tmp_sum, tmp_paths_traversed,
                tmp_possible_paths,
                depth, req_sum);


        //make sure to reset for next stack call
        tmp_sum = sum;

    }

    return;
}

