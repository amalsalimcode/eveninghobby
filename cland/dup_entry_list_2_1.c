#include "list.h"

/* remove duplicates of unsorted list */
int main(void)
{

    while ( head ) {
        printf("%d ", head->val);
        head = head->nxt;
    }
    printf("\n");

    /* 
     * create two ptrs.
     * One will iterate, to see if it matches with the other ptr
     */
    head = &n1;


    node_t *uniq_ptr_prev = NULL;
    node_t *uniq_ptr      = head;
    node_t *running_ptr   = head->nxt;
    
    while ( uniq_ptr ) {

        while ( running_ptr ) {

            if ( running_ptr->val == uniq_ptr->val ) {

                if ( uniq_ptr == head ) {
                    /* if match found on first entry */
                    head = head->nxt;
                    uniq_ptr = head;
                } else if (uniq_ptr->nxt){
                    /* match found in the middle */
                    uniq_ptr_prev->nxt = uniq_ptr->nxt;
                    uniq_ptr = uniq_ptr->nxt;
                } else {
                    /* match found at the end */
                    uniq_ptr_prev->nxt = NULL;
                }

            }

            running_ptr = running_ptr->nxt;
        }

        if ( !uniq_ptr->nxt ) {
            break;
        }

        uniq_ptr_prev = uniq_ptr;
        uniq_ptr      = uniq_ptr->nxt;
        running_ptr   = uniq_ptr->nxt;
    }


    while ( head ) {
        printf("%d ", head->val);
        head = head->nxt;
    }
    printf("\n");


    return 0;
}

