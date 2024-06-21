#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

/*
Input: DAMP, LIKE
Output: DAMP -> LAMP -> LIMP -> LIME -> LIKE
*/

void convert_words(char *start, char *start_cpy, char *finish);
bool does_word_exist(char *word);

int main (void) {

    char start[5] = "DAMP";
    char finish[5] = "LIKE";

    char start_cpy[5] = "DAMP";

    convert_words(start, start_cpy, finish);

    return 0;
}

void
convert_words(char *start, char *start_cpy, char *finish) {

    /* iterate through each letter in start, and convert it.
     * After conversion, check if such a word exists, if so, call recursively.
     * if a word that it was changed to doesn't exist, then we don't recurse
     * if a word matches finish, then we return */

    if ( strcmp(start_cpy, finish) == 0 ) {
        printf("we have converted between start to finish\n");
        return;
    }

    int idx = 0;
    for ( idx = 0; idx < strlen(start); idx++ ) {
        /* skip, if the conversion for
         * this letter has already taken place */
        if ( start_cpy[idx] != start[idx] ) {
            continue;
        }
        start_cpy[idx] = finish[idx];
        if ( does_word_exist(start_cpy) ) {
            convert_words(start, start_cpy, finish);
        }
        start_cpy[idx] = start[idx];
    }

    return;

}


bool
does_word_exist(char *word) {

    char *dictionary[10] = { "DAMP", "LAMP", "LIMP", "LIME", "LIKE" };

    int idx = 0;

    /* we want to iterate every word in dictionary,
     * and check if it matches with "word" */
    for (idx = 0; idx < 5; idx++) {
        if (strcmp(dictionary[idx], word) == 0) {
            printf("match found with %s\n", word);
            return true;
        }
    }

    return false;
}

