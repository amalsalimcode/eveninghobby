#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

typedef struct str {
    char val[20];
    struct str *nxt;
} str_t;

#define MAX_LIST_SZ 6

extern str_t a;
str_t f = {"abc",   &a};
str_t e = {"acd",   &f};
str_t d = {"adc",   &e};
str_t c = {"abcdef",   &d};
str_t b = {"def",   &c};
str_t a = {"xyz",   &b};

#define LONGEST_LEN 100


void combine(char *curr_str, str_t *node, int depth, str_t **nodes_visited, char * longest_comb);
bool is_node_visited(str_t **nodes_visited, str_t *node);
bool are_all_nodes_visited(str_t **nodes_visited);

int main (void) {

    str_t *HEAD = &a;
    char  str[LONGEST_LEN] = "";
    char  longest_comb[LONGEST_LEN] = "";
    str_t *nodes_visited[MAX_LIST_SZ] = {NULL, NULL, NULL, NULL, NULL, NULL};

    combine(str, HEAD, 0, nodes_visited, longest_comb);

    printf("longest comb: %s", longest_comb);

    return 0;
}

void
combine(char *curr_str, str_t *node, int depth,
        str_t **nodes_visited, char *longest_comb) {

    int idx = 0;

    str_t *tmp_node = node;
    for (idx = 0; idx < MAX_LIST_SZ; idx++) {
        if ( strcmp(curr_str, tmp_node->val) == 0 &&
                strlen(curr_str) > strlen(longest_comb)) {
            memcpy(longest_comb, curr_str, LONGEST_LEN);
        }
        tmp_node = tmp_node->nxt;
    } 


    /* we iterate the entire array for each depth */
    for (idx = 0; idx < MAX_LIST_SZ; idx++) {
        char tmp_str[100];

        //save curr_str for backtracking
        memcpy(tmp_str, curr_str, LONGEST_LEN);

        //concatenate and mark node as visited
        curr_str = strcat(curr_str, node->val);
        nodes_visited[depth] = node;

        //go to the next depth, only if we have
        //unvisited nodes
        if ( !are_all_nodes_visited(nodes_visited) ) {
            //get next unvisited node
            while (is_node_visited(nodes_visited, node)) {
                node = node->nxt;
            }
            combine(curr_str, node, depth+1, nodes_visited, longest_comb);
        }

        //back track
        nodes_visited[depth] = NULL;
        memcpy(curr_str, tmp_str, LONGEST_LEN);

    }

    return;
}

bool
are_all_nodes_visited(str_t **nodes_visited) {
    int idx = 0;
    for ( idx = 0; idx < MAX_LIST_SZ; idx++ ) {
        if ( nodes_visited[idx] == NULL ) {
            return false;
        }
    }
    return true;
}

bool
is_node_visited(str_t **nodes_visited, str_t *node) {

    int idx = 0;
    for ( idx = 0; idx < MAX_LIST_SZ; idx++ ) {
        if ( node == nodes_visited[idx] ) {
            return true;
        }
    }
    return false;
}

