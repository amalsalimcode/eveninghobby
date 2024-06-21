#include "tree.h"

typedef struct list_node {
    int value;
    struct list_node *nxt;
}list_node_t;


/*
 * You have to iterate through each node of the tree,
 * and find out a possible path that gives u a given sum
 */

/*
 * Ans: Think of how to locate a sum, if you just need
 * to find it from the root.
 * Once you have that API, then do it for every node in 
 * the tree
 */

void find_if_sum_exists(node_t *node, int find_sum,
                        int cur_sum, bool *exists,
                        list_node_t *path);

void iterate_tree(node_t *node, int find_sum);

int main (void) {

    bool exists = false;
    list_node_t path;

    iterate_tree(&n3, 15);

    return 0;
}

void
iterate_tree(node_t *node, int find_sum) {

    bool exists = false;
    list_node_t path;

    find_if_sum_exists(node, find_sum, 0, &exists, &path); 

    if (exists) {
        list_node_t *tmp_path = &path;

        while ( tmp_path ) {
            printf("%d->", tmp_path->value);
            tmp_path = tmp_path->nxt;
        }
        printf("NULL");
    }


    if ( node->left ) {
        iterate_tree(node->left, find_sum);
    }

    if ( node->right ) {
        iterate_tree(node->left, find_sum);
    }
}

void
find_if_sum_exists(node_t *node, int find_sum, int cur_sum, bool *exists, list_node_t *path) {

    
    cur_sum += node->value;

    path->nxt        = malloc(sizeof(list_node_t));
    path->nxt->nxt   = NULL;
    path->nxt->value = node->value;

    if ( cur_sum == find_sum ) {
        *exists = true;
        return;
    }

    if ( node->left ) {
        find_if_sum_exists(node->left, find_sum, cur_sum, exists, path->nxt);
    }

    if ( node->right ) {
        find_if_sum_exists(node->right, find_sum, cur_sum, exists, path->nxt);
    }

    if ( !*exists ) {
        free(path->nxt);
    }

    return;
}
