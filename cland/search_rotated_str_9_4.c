#include <stdio.h>
#include <stdlib.h>

void bin_search(int *arr, int start, int end, int search_val, int *result);

int main (void)
{

    int arr[10] = {31, 33, 44, 57, 7, 8, 10, 13, 24, 29};

    int result = -1;
    bin_search(arr, 0, 9, 10, &result);
    printf("here is result %d\n", result);

    return 0;
}

void
bin_search(int *arr, int start, int end, int search_val, int *result)
{

    int mid = (start + end) / 2;

    /*
     * result already found.
     * No need to recurse deeper. get out
     */
    if ( *result != -1 ) {
        return;
    }

    /* found result */
    if ( arr[mid] == search_val ) {
        *result = mid;
        return;
    }

    /* went too far */
    if ( start >= end ) {
        return;
    }


    if ( arr[mid] > search_val && arr[mid] > arr[start] ) {
        /* If mid value is greater than start, then the array is sorted
         * and we can do binary search */
        bin_search(arr, start, mid-1, search_val, result);
    } else if ( arr[mid] < search_val && arr[start] > arr[mid] ) {
        /* If end value is greater than mid, then the array is sorted
         * and we can do binary search */
        bin_search(arr, mid+1, end, search_val, result);
    } else {
        /* The array we have is not sorted, and we can't do bin search.
         * So split the array into two and search them both */
        bin_search(arr, start, mid-1, search_val, result);
        bin_search(arr, mid+1, end, search_val, result);
    }

}
