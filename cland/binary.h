#include <string.h>
#include <stdlib.h>
#include <stdbool.h>
#include <stdio.h>

#define B_TO_INT(x) S_to_binary_(#x)

#define INT_TO_B(char_val, int_val) int_to_b(char_val, int_val) 
#define PRINT_B(int_val) print_b(int_val)

#define CREATE_MASK(start, end) create_mask(start, end)

static inline uint32_t create_mask(int M, int N) {

    uint32_t left;
    uint32_t right;

    left = (1 << N) - 1; // left has 1s from index 0 to index N-1
    left = ~left; // left now has 0s from index 0 to index N-1 
    right = (1 << M) - 1; // right has 1s from index 0 to index M-1.

    /*  
     * After setting mask = left | right, mask now looks thus:
     * 1,1,1,1,(N-1),0,0,0,0,(M-1),1,1,1,1
     */
    uint32_t mask = left | right;

    return mask;
}   

static inline uint32_t S_to_binary_(const char *s) {
    uint32_t len = strlen(s) - 1;
    uint32_t result = 0;

    int idx = 0;
    while ( len + 1 ) { 
        if ( s[len] == '1' ) { 
            result |= 1 << idx;
        }   
        idx++;
        len--;
    }   
    return result;
}

static inline void
int_to_b(char *char_val, int int_val) {
    int idx = 0;
    for ( idx = 0; idx < 32; idx++) {
        int n = 1 << idx;
        if ( int_val & n ) { 
            char_val[32-idx-1] = '1';
        } else {
            char_val[32-idx-1] = '0';
        }   
    }   

}

static inline void
print_b(int int_val) {

    char char_val[32];

    INT_TO_B(char_val, int_val);

    int idx = 0;
    bool skip_print = true;
    for ( idx = 0; idx < 32; idx++ ) { 
        if ( char_val[idx] == '1' ) { 
            skip_print = false;
        }   
        if ( skip_print ) { 
            continue;
        }   
        printf("%c", char_val[idx]);
    }
    //printf("\n");
}
