#include "list.h"

int main(void)
{

  /*
   * find nth to last element
   */


    /*
     * 1 2 3 4 5: nth = 2
     * then return 4
     *
     * initialize two pointers
     * increment one by nth in the list
     * then increment both until the first one is NULL
     */

    node_t *head = &n1;
    int n = 1;

    node_t *tr_node       = head;
    node_t *nth_last_node = head;

    int n_idx = 0;
    for ( n_idx = 0; n_idx < n; n_idx++ ) {
        tr_node = tr_node->nxt; 
    }

    while ( tr_node->nxt ) {
        tr_node = tr_node->nxt;
        nth_last_node = nth_last_node->nxt;
    }

    /*
     * corner case: if 0th last element is asked
     */
    if (n_idx) {
        nth_last_node = nth_last_node->nxt;
    }

    printf("%d\n", nth_last_node->val);




  return 0;
}
