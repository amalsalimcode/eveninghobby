#include <stdio.h>
#include <stdlib.h>
#include <string.h>


typedef struct str{
    char val[10];
} str_t;

int bin_search(str_t *arr, int start, int end, char *search_val);

int main (void)
{

    str_t arr[8] = { {"amal"}, {"bladder"}, {""}, {""}, {"count"}, {"degree"}, {""}, {"fails"} };
    char search_val[10] = "count";

    int x = bin_search(arr, 0, 7, search_val);
    printf("value found is %d", x);

    return 0;
}

int
bin_search(str_t *arr, int start, int end, char *search_val)
{

    if ( start > end ) {
        return -1;
    }

    int mid = (start + end) / 2;

    while ( strcmp(arr[mid].val, "")  == 0) {
        mid--;
    }

    int result = strcmp(arr[mid].val, search_val);

    if ( result == 0 ) {
        return mid;
    } else if ( result > 0 ) {
        return bin_search(arr, start, mid-1, search_val);
    } else if ( result < 0 ) {
        return bin_search(arr, mid+1, end, search_val);
    }

    return -1;
}
