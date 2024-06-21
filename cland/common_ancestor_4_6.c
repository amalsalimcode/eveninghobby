#include "tree.h"

void common_ancestor(node_t *node, int *cmn_ancestor,
                     bool *cmn_anc_fnd, int val1, int val2,
                     bool *val1_fnd, bool *val2_fnd); 

int main (void) {

   int cmn_ancestor = 0;
   bool cmn_anc_fnd = false;
   bool val1_fnd = false;
   bool val2_fnd = false;


   common_ancestor(&n3, &cmn_ancestor, &cmn_anc_fnd, n4.value, n10.value, &val1_fnd, &val2_fnd); 
   printf("common ancestor: %d\n", cmn_ancestor); 

   return 0;
}


void common_ancestor(node_t *node, int *cmn_ancestor,
                     bool *cmn_anc_fnd, int val1, int val2,
                     bool *val1_fnd, bool *val2_fnd)
{

    /* set the local found variables */
    bool lcl_val1_fnd = *val1_fnd;
    bool lcl_val2_fnd = *val2_fnd;

    if ( node->value == val1 ) {
        *val1_fnd = true;
        
    }

    if ( node->value == val2 ) {
        *val2_fnd = true;
        
    }

    /* don't iterate anymore, if both values are found */
    if ( *val1_fnd && *val2_fnd ) {
        return;
    }

    if ( node->left ) {
        common_ancestor(node->left, cmn_ancestor, cmn_anc_fnd, val1, val2, val1_fnd, val2_fnd);
    }

    if ( node->right ) {
        common_ancestor(node->right, cmn_ancestor, cmn_anc_fnd, val1, val2, val1_fnd, val2_fnd);
    }

    /*
     * *val1_fnd    == true means val1 was found in tree
     * lcl_val1_fnd == false means val1 is found in subtree
     * cmn_anc_fnd  == false means, so far no common ancestor.
     *                 Note: We want the first common ancestor from bottom
     */ 
    if ( *val1_fnd && *val2_fnd &&
                        !lcl_val1_fnd && !lcl_val2_fnd &&
                        !*cmn_anc_fnd) {
        *cmn_anc_fnd = true;
        *cmn_ancestor = node->value;
        
    }

    return;

}
