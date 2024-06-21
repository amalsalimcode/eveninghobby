#include "tree.h"

typedef struct list {
    node_t      *node;
    struct list *nxt;
} list_t;

typedef struct depth_list {
    list_t      *item_list;
    struct depth_list *nxt;
} depth_list_t;

/*
 * Given a binary tree,
 * build a list of list, where each list contains all elements at each depth
 */

/*
 * You can create two lists. list1 and list2. All children of list 1 goes to
 * list2. Then list1 can get set to list2, and list2->nxt is done a malloc()
 */
/*
 * Another thought, i had was to just have one list. Keep populating it, and
 * you can indicate the next list with a NULL inbetween
 */

int main (void) {

    node_t *root = tree3;

    /*
     * malloc for two lists. list1->nxt == list 2
     */
    depth_list_t *tr_list    = malloc(sizeof(depth_list_t));
    tr_list->item_list       = malloc(sizeof(list_t));

    tr_list->nxt             = malloc(sizeof(depth_list_t));
    tr_list->nxt->item_list  = malloc(sizeof(list_t));

    depth_list_t *list1      = tr_list;
    depth_list_t *list2      = tr_list->nxt;

    /* populate tree root in list1 */
    list1->item_list->node = root;
    list1->item_list->nxt  = NULL;

    list_t *tmp_list1 = list1->item_list;
    list_t *tmp_list2 = list2->item_list;

    /*
     * 1. we iterate list1,
     * 1a. get the children of each node,
     * 1b. populate it in list2
     */
    while ( tmp_list1 ) {

        while ( tmp_list1 && tmp_list1->node ) {

            printf("\n\nNext iter\n");

            if ( tmp_list1->node->left ) {
                tmp_list2->node      = tmp_list1->node->left;
                printf("left insertion: list1 position %d, list2 position %d\n",
                                                tmp_list1->node->value, 
                                                tmp_list2->node->value);
                tmp_list2->nxt       = malloc(sizeof(list_t));
                tmp_list2            = tmp_list2->nxt;
                tmp_list2->nxt       = NULL;
            }

            if ( tmp_list1->node->right ) {
                tmp_list2->node      = tmp_list1->node->right;
                printf("right insertion: list1 position %d, list2 position %d\n",
                                                tmp_list1->node->value, 
                                                tmp_list2->node->value);
                tmp_list2->nxt       = malloc(sizeof(list_t));
                tmp_list2            = tmp_list2->nxt;
                tmp_list2->nxt       = NULL;
            }

            tmp_list1 = tmp_list1->nxt;

        }

        /* no more children */
        if (list2->item_list == tmp_list2) {
            break;
        }

        /*
         * 2. Update list1 to list2
         * 2a. malloc for list2->nxt
         * 2b. set list2 to the new list
         */
        list1 = list2;

        /* 2a. malloc for list->nxt */
        list2->nxt             = malloc(sizeof(depth_list_t));
        list2->nxt->item_list  = malloc(sizeof(list_t));

        /* 2b. set list2 to the new list */
        list2 = list2->nxt;

        tmp_list1 = list1->item_list;
        tmp_list2 = list2->item_list;

        printf("end of first depth\n");

    }

    return 0;
}

