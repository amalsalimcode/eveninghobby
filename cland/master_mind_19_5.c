#include <stdio.h>
#include <stdlib.h>


int main (void) {

    char solution[4] = { 'R', 'Y', 'G', 'B' };
    char guess[4]    = { 'B', 'Y', 'O', 'P' };

    /* ' ' no match,
     * 'X' correct color wrong position
     * 'O' correct color correct position */
    char result[4]   = { ' ', ' ', ' ', ' ' };

    int idx = 0;
    for ( idx = 0; idx < 4; idx++ ) {

        /* check for correct position, correct color */
        if ( guess[idx] == solution[idx] ) {
            result[idx] = 'X';
            continue;
        }

        /* we are here because the guess didn't match
         * with correct color, and correct position */
        if ( guess[idx] == solution[0] ||
                guess[idx] == solution[1] ||
                guess[idx] == solution[2] ||
                guess[idx] == solution[3]) {
            result[idx] = 'O';
        }

    }

    for ( idx = 0; idx < 4; idx++ ) {
        printf("%c ", result[idx]);
    }
    printf("\n");
        
    return 0;
}
