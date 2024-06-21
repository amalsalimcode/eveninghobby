#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int rand_api(void);

int main (void) {

    int arr[5][5] = { {1, 2, 3, 4, 5},
                      {6, 7, 1, 2, 3},
                      {4, 5, 6, 7, 1},
                      {2, 3, 4, 5, 6},
                      {7, 0, 0, 0, 0} };

    int x = 0;

    //iterate until x is non zero value
    while ((x=arr[rand_api()][rand_api()]) == 0);
    printf("val: %d", x);


    return 0;
}

int rand_api(void)
{
    srand(time(0));
    int random = rand();
    return random % 5;
}
