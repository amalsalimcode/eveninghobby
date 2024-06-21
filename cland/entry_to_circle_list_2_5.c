#include "list.h"


int main (void) {

    head = circ_head;
    int idx = 0;

    printf("CIRCULAR LIST:\n");
    while ( head && idx < 11 ) { 
        printf("%d ", head->val);
        if ( idx == 6 ) {
            printf("\n\t\t");
        }
        head = head->nxt;
        idx++;
    }   
    printf("\n");


    /* given a circular linked list, find the head of the circle */

    node_t *fast_ptr = circ_head;
    node_t *slow_ptr = circ_head;

    /*
     * if you increment fast_ptr twice as much,
     * they will eventually meet
     */
    do {
        fast_ptr = fast_ptr->nxt->nxt;
        slow_ptr = slow_ptr->nxt;
    } while ( fast_ptr != slow_ptr );

    printf("they met at %d\n", fast_ptr->val);

    slow_ptr = circ_head;

    /*
     * increment each at once,
     * the point of convergence is the head
     */
    while ( fast_ptr != slow_ptr ) {
        fast_ptr = fast_ptr->nxt;
        slow_ptr = slow_ptr->nxt;
    }

    printf("the head of the circ_list is %d\n", fast_ptr->val);

}
