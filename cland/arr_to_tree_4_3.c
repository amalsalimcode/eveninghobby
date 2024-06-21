#include "tree.h"


void insert_node(node_t *node, int *arr, int start_idx, int end_idx);

int arr[10] = {11, 21, 31, 41, 51, 61, 71, 81, 91, 101};
node_t tree_root;

int main (void) {

    node_t *root = &tree_root;
    /* sizeof - 1: to account for index 0 */
    insert_node(root, arr, 0, sizeof(arr)/sizeof(int) - 1);


    return 0;
}

void
insert_node(node_t *node, int *arr, int start_idx, int end_idx)
{

    int mid_idx = (start_idx + end_idx) / 2;
    node->value = arr[mid_idx];

    if ( start_idx < mid_idx ) {
        node->left = malloc(sizeof(node_t));
        insert_node(node->left, arr, start_idx, mid_idx-1);
    }

    if ( end_idx > mid_idx ) {
        node->right = malloc(sizeof(node_t));
        insert_node(node->right, arr, mid_idx+1, end_idx);
    }

}
