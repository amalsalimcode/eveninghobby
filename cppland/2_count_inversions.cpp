#include <iostream>
#include <array>

using namespace std;
#define ARR_SZ 4

void divide_and_conquer(array<int, ARR_SZ> &arr, int start_idx,
                        int end_idx, int *split_inversions);

int main(void)
{
    array<int,ARR_SZ> arr = {1, 2, 4, 5};
    int split_inversions = 0;

    divide_and_conquer(arr, 0, arr.size(), &split_inversions);

    cout << "split inversions: " << split_inversions << endl;

    return 0;
}

void divide_and_conquer(array<int, ARR_SZ> &arr, int start_idx, int end_idx,
                        int *split_inversions)
{

    if ( start_idx >= end_idx ) {
       return;
    } 

    int idx = 0;
    for ( idx = start_idx; idx < end_idx; idx++ ) {
        cout << arr[idx] << endl;
    }

    int len_idx = start_idx + end_idx;
    int mid_idx = len_idx/2;

    cout << "To Call: start: " << start_idx << " mid_idx " 
         << mid_idx << " start: " << mid_idx << " end "
         << len_idx << endl;

    if ( start_idx <= mid_idx ) {
        divide_and_conquer(arr, start_idx, mid_idx, split_inversions);
    }

    if ( mid_idx > start_idx ) {
        divide_and_conquer(arr, mid_idx, end_idx, split_inversions);
    }

    array<int,ARR_SZ> result = arr;
    int result_idx = start_idx;

    /* create index's to treat one array like two
     * separate non overlapping arrays */
    int arr1_curr = start_idx;
    int arr1_end  = mid_idx;
    int arr2_curr = mid_idx;
    int arr2_end  = end_idx;

    while ( arr1_curr < arr1_end && arr2_curr < arr2_end ) {
        if ( arr[arr1_curr] < arr[arr2_curr] ) {
            result[result_idx] = arr[arr1_curr];
            arr1_curr++;
        } else {
            result[result_idx] = arr[arr2_curr];
            arr2_curr++;
            /* for each entry from right arr, sum all rem. entry from left arr */
            *split_inversions = *split_inversions + (arr1_end - arr1_curr);
        }
        result_idx++;
    }

    /* copy over remaining elements.
     * Only one of the conditions will run below.
     * It's either left array has unprocessed values or right */
    while ( arr1_curr < arr1_end ) {
        result[result_idx] = arr[arr1_curr];
        result_idx++;
        arr1_curr++;
    }

    while ( arr2_curr < arr2_end ) {
        result[result_idx] = arr[arr2_curr];
        result_idx++;
        arr2_curr++;
    }

    /* now copy contents of result into arr */
    arr = result;

    return;
}

//
