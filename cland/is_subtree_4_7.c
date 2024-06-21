#include "tree.h"

bool traverse(node_t *node, node_t *sub_node);
void check_subtree_match(node_t *node, node_t *sub_node, bool *is_subtree);

int main (void) {

    printf("The result of is_subtree: %d\n", traverse(&n3, &n7));

}

bool
traverse(node_t *node, node_t *sub_node)
{

    if ( !node ) {
        return true;
    }

    if ( node->value == sub_node->value ) {
        bool is_subtree = true;
        check_subtree_match(node, sub_node, &is_subtree);
        if ( !is_subtree ) {
            return true;
        }
    }

    return (traverse(node->left,  sub_node) || traverse(node->right, sub_node));
}


void
check_subtree_match(node_t *node, node_t *sub_node, bool *is_subtree)
{ 
    if ( node->value != sub_node->value ) {
        *is_subtree = false;
    }

    if ( node->left && !node->left ) {
        *is_subtree = false;
    }

    if ( !node->left && node->left ) {
        *is_subtree = false;
    }

    if ( node->right && !node->right ) {
        *is_subtree = false;
    }

    if ( !node->right && node->right ) {
        *is_subtree = false;
    }

    if ( !*is_subtree ) {
        return;
    }

    if ( node->left ) {
        check_subtree_match(node->left, sub_node->left, is_subtree);
    }

    if ( node->right ) {
        check_subtree_match(node->right, sub_node->right, is_subtree);
    }

}


