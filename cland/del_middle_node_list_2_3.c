#include "list.h"

int main (void) {

    node_t *head_cpy = head;

    printf("BEFORE: ");
    while ( head ) { 
        printf("%d ", head->val);
        head = head->nxt;
    }   
    printf("\n");

    head = head_cpy;


    node_t *del_node = &n5;

    node_t *nxt_node = NULL;
    node_t *tmp_nxt_node = NULL; //to save the nxt ptr val

    while ( del_node->nxt ) {

        if ( !tmp_nxt_node ) {
            //first time through
            tmp_nxt_node = del_node->nxt;
        } else {
            tmp_nxt_node = tmp_nxt_node->nxt;
        }

        nxt_node = tmp_nxt_node;

        //copy the nxt_node contents to del_node
        memcpy(del_node, nxt_node, sizeof (node_t)); 

        //we only want to copy contents, not the nxt ptr
        del_node->nxt = nxt_node;

        del_node = del_node->nxt;

        //last entry is reached
        if (!del_node->nxt->nxt) {
            del_node->nxt = NULL;
        }

    }
    del_node->nxt = NULL;

    printf("AFTER:  ");
    while ( head ) { 
        printf("%d ", head->val);
        head = head->nxt;
    }   
    printf("\n");

    return 0;
}
