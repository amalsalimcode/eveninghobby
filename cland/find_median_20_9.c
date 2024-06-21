#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int value;
    struct node *nxt;
}node_t;

int process_input(int input);
void sorted_insert(node_t **head, node_t **tail, int value, int len_list, node_t *node_provided);
node_t *get_node_before_tail(node_t *node);
void print_nodes(node_t *h1, node_t *t1, node_t *h2, node_t *t2);

int main (void) {

    printf("input: %d, median: %d\n", 9, process_input(9));
    printf("input: %d, median: %d\n", 6, process_input(6));
    printf("input: %d, median: %d\n", 3, process_input(3));
    printf("input: %d, median: %d\n", 2, process_input(2));
    printf("input: %d, median: %d\n", 8, process_input(8));
    printf("input: %d, median: %d\n", 12, process_input(12));

    return 0;

}

int
process_input(int input)
{


    static node_t h1 = {0, NULL};
    static node_t h2 = {0, NULL};

    static node_t *head_h1 = &h1;
    static node_t *tail_h1 = &h1;

    static node_t *head_h2 = &h2;
    static node_t *tail_h2 = &h2;

    static int len_h1 = 0;
    static int len_h2 = 0;

    static int median = 0;

    node_t *tmp_node = NULL;

    //printf("going to insert %d\n", input);
    //print_nodes(head_h1, tail_h1, head_h2, tail_h2); 

    if ( input > median ) {
        sorted_insert(&head_h2, &tail_h2, input, len_h2, NULL);
        len_h2++;
    } else {
        sorted_insert(&head_h1, &tail_h1, input, len_h1, NULL);
        len_h1++;
    }

    //printf("after insert\n");
    //print_nodes(head_h1, tail_h1, head_h2, tail_h2); 

    if ( len_h2 - len_h1 > 1 ) {
        //head of h2 --> tail of h1
        node_t *tmp_node = head_h2;
        head_h2 = head_h2->nxt;
        tmp_node->nxt = NULL;

        tail_h1->nxt = tmp_node;
        tail_h1 = tail_h1->nxt;

        len_h2--;
        len_h1++;

        //printf("after h2 > h1\n");
        //print_nodes(head_h1, tail_h1, head_h2, tail_h2); 

    }
    
    if ( len_h1 - len_h2 > 1 ) {

        //tail of h1 --> head of h2
        node_t *tmp_node = get_node_before_tail(head_h1);
        node_t *tmp_tail = tail_h1;
        tmp_node->nxt = NULL;
        tail_h1 = tmp_node;

        sorted_insert(&head_h2, &tail_h2, tmp_tail->value, len_h2, tmp_tail);

        len_h2++;
        len_h1--;

        //printf("after h1 > h2\n");
        //print_nodes(head_h1, tail_h1, head_h2, tail_h2); 
    }

    print_nodes(head_h1, tail_h1, head_h2, tail_h2); 

    if ( len_h1 == len_h2 ) {
        median = (tail_h1->value + head_h2->value) /2;
    } else if ( len_h1 > len_h2 ) {
        median = tail_h1->value;
    } else {
        median = head_h2->value;
    }

    return median;
}

void
print_nodes(node_t *h1, node_t *t1, node_t *h2, node_t *t2) {

    printf("h1: ");
    node_t *iter_node = h1;
    while ( iter_node ) {
        printf("%d ", iter_node->value);
        iter_node = iter_node->nxt;
    }
    //printf("\ttail for h1: %d\n", t1->value);

    printf("\nh2: ");
    iter_node = h2;
    while ( iter_node ) {
        printf("%d ", iter_node->value);
        iter_node = iter_node->nxt;
    }
    //printf("\ttail for h2: %d\n", t2->value);
    printf("\n\n");
}





void
sorted_insert(node_t **head, node_t **tail, int value, int len_list, node_t *node_provided)
{

    node_t *new_node;
    if ( node_provided ) {
        new_node = node_provided;
    } else {
        new_node = malloc(sizeof(node_t));
    }

    new_node->value = value;

    /* this is the first entry */
    if ( len_list == 0 ) {
        (*head)->value = value;
        (*head)->nxt = NULL;
        return;
    }

    /* check if list insert is at head */
    if (value <= (*head)->value) {
        new_node->nxt = *head;
        *head = new_node;
        return;
    }

    /* check if list insert is at tail */
    if (value > (*tail)->value) {
        (*tail)->nxt = new_node;
        new_node->nxt = NULL;
        *tail = new_node;
        return;
    }

    /* we have already validated that
     * the insert is not at head */
    node_t *prev_node = *head;
    node_t *node = prev_node->nxt;

    while ( node ) {

        if (value > node->value) {
            prev_node = prev_node->nxt;
            node = node->nxt;
        } else {
            prev_node->nxt = new_node;
            new_node->nxt = node;
            return;
        }
    }

    return;
}

node_t *
get_node_before_tail(node_t *node)
{
    while ( node->nxt->nxt ) {
        node = node->nxt;
    }
    return node;
}
