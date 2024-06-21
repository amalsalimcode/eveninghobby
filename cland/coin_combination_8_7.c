#include <stdio.h>
#include <stdlib.h>

void find_number_combination(int amount, int *count);

int main (void) {


    int count = 0;
    find_number_combination(10, &count);

    printf("number of ways to get 10 cents %d\n", count);
    return 0;
}

/* 25, 10, 5, 1 */
void
find_number_combination(int amount, int *count)
{
    if ( amount == 0 ) {
        *count = *count+1;
        return;
    }

    if ( amount < 0 ) {
        return;
    }

    find_number_combination(amount - 25, count);
    find_number_combination(amount - 10, count);
    find_number_combination(amount - 5, count);
    find_number_combination(amount - 1, count);

    return;
}
