#include <stdio.h>
#include <stdlib.h>
#include <time.h>

/* assume M_set and N_set are larger
 * than the random generated number */

#define M_LEN 13
#define N_LEN 7

#define RAN_GEN_LEN 5

int rand_api(void);

int main (void) {

    //only accounting for one type,
    //but same logic applies
    char m_arr[M_LEN] = {'C', 'E', 'Q', 'J', '9', 'A', '7', 'R', '5', 'L', 'J', 'H', '1'}; 
    srand(time(0));

    int x;
    int last_idx = M_LEN - 1;

    int n_idx = 0;

    //the array len is larger than the random num (0..5)
    //So we generate a rand(), use that as an index to array,
    //then swap the value with the last index, so m_arr[0..5]
    //is still unhit vals
    while ( n_idx <= N_LEN - 1 ) {
        x = rand_api();
        printf("rand_idx: %d, %c\n", x, m_arr[x]);

        m_arr[x] = m_arr[last_idx];
        last_idx--;

        n_idx++;
    }
   
    return 0;
}

int rand_api(void)
{
    int random = rand();
    return random % RAN_GEN_LEN;
}
