#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define CARD_LEN 13
#define RAN_GEN_LEN 5

int rand_api(void);

int main (void) {

    //only accounting for one type,
    //but same logic applies
    char arr[] = {'A', 'K', 'Q', 'J', '9', '8', '7', '6', '5', '4', '3', '2', '1'}; 
    srand(time(0));

    int x;
    int last_idx = CARD_LEN - 1;

    //the array len is larger than the random num (0..5)
    //So we generate a rand(), then swap the value with the last index
    while ( last_idx >= RAN_GEN_LEN ) {
        x = rand_api();
        printf("rand_idx: %d, %c\n", x, arr[x]);

        arr[x] = arr[last_idx];
        last_idx--;
    }
    
    //Now the array len is same as the random num (0..5)
    //We replace the visited element with X, and loop till
    //we don't see X
    int elements_left = RAN_GEN_LEN;
    while ( elements_left ) {
        x = rand_api();
        if ( arr[x] != 'X' ) {
            printf("rand_idx: %d, %c\n", x, arr[x]);
            arr[x] = 'X';
            elements_left--;
        }
    }

    return 0;
}

int rand_api(void)
{
    int random = rand();
    return random % RAN_GEN_LEN;
}
