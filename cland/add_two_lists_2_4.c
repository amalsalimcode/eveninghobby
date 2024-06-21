#include "list.h"

void add_list(node_t *a, node_t *b, node_t *result, int diff, int *carry);
int find_diff(node_t *a, node_t *b); 


int main (void) {

    /*
     * find the sum of two numbers,
     * given each digit is an entry in a list
     */

    /* 
     * first find the difference
     * in number of digits
     */
    int diff = find_diff(&a, &b);
    printf("diff found between two nodes %d\n", diff);

    int carry = 0;
    node_t *result = malloc(sizeof (node_t));

    add_list(&a, &b, result, diff, &carry);

    while ( result ) {
        printf("%d ", result->val);
        result = result->nxt;
    }

}

void
add_list(node_t *a, node_t *b, node_t *result, int diff, int *carry) {

    int a_val = 0;
    int b_val = 0;

    result->nxt = malloc(sizeof (node_t));
    result->nxt->nxt = NULL;

    if ( diff > 0 ) {
        a_val = a->val;
        add_list(a->nxt, b, result->nxt, --diff, carry);
    }

    else if ( diff < 0 ) {
        b_val = b->val;
        add_list(a, b->nxt, result->nxt, ++diff, carry);
    }

    else if ( a->nxt && b->nxt ) {
        a_val = a->val;
        b_val = b->val;
        add_list(a->nxt, b->nxt, result->nxt, diff, carry);
    }
    
    else {
        a_val = a->val;
        b_val = b->val;
    }

    result->nxt->val = ( a_val + b_val + *carry ) % 10;
    *carry           = ( a_val + b_val + *carry ) / 10;

    return;
}

/*
 * diff >  0 == a has more nodes
 * diff <  0 == b has more nodes
 * diff == 0 == a and b has same no of nodes
 */
int
find_diff(node_t *a, node_t *b) {

    int diff = 0;

    while ( a || b ) {

        if ( a ) {
            a = a->nxt;
            diff++;
        }

        if ( b ) {
            b = b->nxt;
            diff--;
        }
    }
    return diff;
}

