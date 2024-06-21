#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

typedef struct trie {
    struct trie *val[26];
} trie_t;

void iterate_trie(trie_t *node, int depth);
trie_t *init_trie(trie_t *node);
bool does_pattern_exist(char *str, trie_t *head);

int main (void) {

    trie_t root;
    init_trie(&root);
    trie_t *head = &root;

    trie_t *node = &root;
    char arr[3][5] = { "abc", "jkl", "xyz" };
    char long_str[10] = "abjklmn";

    /* build a trie */
    int idx = 0;
    int idx_iter = 0;
    char letter;

    /* we want a trie where the root has children "abjklmn" on depth 0
     * and so each of the roots children will have its own children
     * eg: root child 0:a->b->j->k-l->m->n,
     *     another child of root: k->l->m->n
     */
    for ( idx = 0; idx < strlen(long_str); idx++ ) {
        /*iterate from whats not populated till end */
        for (idx_iter = idx; idx_iter < strlen(long_str); idx_iter++) {

            letter = long_str[idx_iter];
            if ( node->val[letter - 'a'] == NULL ) {
                node->val[letter - 'a'] = malloc(sizeof(trie_t));
                //returns the argument, after zeroing the struct
                node = init_trie(node->val[letter - 'a']);
            } else {
                node = node->val[letter - 'a'];
            }
        }
        /* done populating children to last depth,
         * no start over for the next char in long_str */
        node = head;
    }



    for ( idx = 0; idx < 3; idx++ ) {
        printf("Does %s exist in %s? %s\n", arr[idx], long_str,
                                       does_pattern_exist(arr[idx], head) ? "yes" : "no");
    }

    return 0;
}

bool
does_pattern_exist(char *str, trie_t *head) {

    int idx = 0;
    for ( idx = 0; idx < strlen(str); idx++ ) {
        if (head->val[str[idx] - 'a']) {
            head = head->val[str[idx] - 'a'];
        } else {
            return false;
        }
    }
    return true;
}


//TOCALL: iterate_trie(head, 0);
void
iterate_trie(trie_t *node, int depth) {

    int idx = 0;
    /* iterate the trie */
    for ( idx = 0; idx < 26; idx++ ) {
        if ( node->val[idx] ) {
            printf("letter: %c, depth: %d\n", 'a'+idx, depth); 
            iterate_trie(node->val[idx], depth+1);
        }
    }

    return;
}

trie_t *
init_trie(trie_t *node) {
    int idx = 0;
    for ( idx = 0; idx < 26; idx++ ) {
        node->val[idx] = NULL;
    }
    return node;
}

