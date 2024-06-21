#include "tree.h"

int get_in_order_successor(pnode_t *pnode);

int main (void) {

    printf("In order successor of %d is %d\n", p7.value, get_in_order_successor(&p7));
    printf("In order successor of %d is %d\n", p10.value, get_in_order_successor(&p10));
    printf("In order successor of %d is %d\n", p6.value, get_in_order_successor(&p6));
    printf("In order successor of %d is %d\n", p3.value, get_in_order_successor(&p3));

    return 0;
}


int
get_in_order_successor(pnode_t *pnode)
{

    /* Sanity check */
    if ( !pnode ) {
        return -1;
    }

    /* Special case for single pnode tree */
    if ( !pnode->parent && !pnode->left && !pnode->right ) {
        return pnode->value;
    }

     pnode_t *tmp_child = pnode;
     pnode_t *tmp_parent = pnode->parent;

    /*
     * If there is right child, then we
     * want the left most child of the
     * right pnode
     */
     if (pnode->right) {

        tmp_child = tmp_child->right;
        while ( tmp_child->left ) {
            tmp_child = tmp_child->left;
        }

        return tmp_child->value;
     }

     /*
      * check if a left ancestor exists,
      * If not, return -1
      */
     while ( !tmp_parent->left ||
             (tmp_parent->left->value != tmp_child->value) ) {

         tmp_child = tmp_child->parent;
         tmp_parent = tmp_parent->parent;

         if ( !tmp_parent ) {
             return -1;
         }
     }
     return tmp_parent->value;
}
