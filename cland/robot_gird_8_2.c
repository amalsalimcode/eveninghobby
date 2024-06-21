#include <stdio.h>
#include <stdlib.h>

int get_grid_combination(int x, int y);

int main (void) {

    int ret = get_grid_combination(1, 1);
    printf("here are combinations: %d", ret);

    return 0;
}

int
get_grid_combination(int x, int y)
{
    if ( x == 0 || y == 0 ) {
        return 1;
    }

    return get_grid_combination(x-1, y) + get_grid_combination(x, y-1);

}
