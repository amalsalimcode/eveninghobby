#include <stdio.h>
#include <stdlib.h>

int bin_search(int *arr, int start, int end, int search_val);

int main (void)
{

    int arr[10] = {1, 3, 4, 5, 7, 8, 10, 13, 24, 29};

    int x = bin_search(arr, 0, 9, 10);
    printf("here is result %d\n", x);

    return 0;
}

int
bin_search(int *arr, int start, int end, int search_val)
{

    int mid = (start + end) / 2;

    if ( arr[mid] == search_val ) {
        return mid;
    } else if ( arr[mid] > search_val ) {
        return bin_search(arr, start, mid-1, search_val);
    } else if ( arr[mid] < search_val ) {
        return bin_search(arr, mid+1, end, search_val);
    }

    return -1;
}
