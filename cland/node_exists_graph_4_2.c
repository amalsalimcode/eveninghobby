#include "graph.h"

/*
 * iterating the graph:
 *
 * go to adjacent
 * go to vertex
 */
void
iterate_graph( node_t *node, char search_val, bool *is_exist ) { 

    if ( node->visited ) {
        return;
    }

    if ( node->value == search_val ) {
        *is_exist = true;
    }

    node->visited = true;

    /* iterate adjacent nodes first */
    node_t *tmp = node;
    while ( node->adjacent ) { 
        node = node->adjacent;
        iterate_graph(node, search_val, is_exist);
    }
    node = tmp;

    /* iterate vertex */
    if ( node->vertex ) { 
        iterate_graph(node->vertex, search_val, is_exist);
    }

}


int main (void)
{

    bool is_exist = false;
    iterate_graph(HEAD, 'c', &is_exist);

    printf("The search result is %d\n", is_exist);

    return 0;
}
