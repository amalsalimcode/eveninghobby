#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int str_to_int(char *str);

#define ARR_SZ 3
#define STR_LEN 4

int main (void) {

    char str_arr[ARR_SZ][STR_LEN] = {"act\0", "dog\0", "cat\0"};
    int arr1_sz = ARR_SZ;

    int iter = 0;
    int idx = 0;

    /* bubble sort */
    for ( iter = 0; iter < arr1_sz; iter++ ) {
        for ( idx = 0; idx < arr1_sz-1; idx++ ) {

            if ( str_to_int(str_arr[idx]) > str_to_int(str_arr[idx+1]) ) {
                /*swap*/
                char tmp[STR_LEN];
                strncpy(tmp, str_arr[idx+1], STR_LEN);
                strncpy(str_arr[idx+1], str_arr[idx], STR_LEN);
                strncpy(str_arr[idx], tmp, STR_LEN);
            }

        }//end of if(idx
    }//end of if(iter

    idx = 0;
    for ( idx = 0; idx < ARR_SZ; idx++ ) {
        printf("%s\n", str_arr[idx]);
    }
    return 0;
}

int str_to_int(char *str)
{
    int idx = 0;
    int val = 0;

    for ( idx = 0; idx < strlen(str); idx++ ) {
        val += (int)str[idx];
    }

    return val;
}
