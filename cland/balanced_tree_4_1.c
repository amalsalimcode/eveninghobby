#include "tree.h"

void check_balanced(node_t *node, int *l_height, int *r_height, bool *is_balanced);

int main (void) {

    int l_height=0, r_height=0;
    bool is_balanced = true;
    
    check_balanced(tree2, &l_height, &r_height, &is_balanced);

    printf("status of the tree is %s\n", is_balanced ? "balanced" :
                                                      "unbalanced");

    return 0;
}


void
check_balanced(node_t *node, int *l_height,
                                int *r_height,
                                bool *is_balanced)
{    
    if ( node->left ) {
        check_balanced(node->left, l_height, r_height, is_balanced);
        *l_height = *l_height + 1;
	}

    if ( node->right ) {
        check_balanced(node->right, l_height, r_height, is_balanced);
        *r_height = *r_height + 1;
	}


    if ( labs(*r_height - *l_height) > 1 ) {
        *is_balanced = false;
    }
}
