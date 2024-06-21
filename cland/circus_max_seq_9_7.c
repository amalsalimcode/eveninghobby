#include <stdio.h>
#include <stdlib.h>

#define CNT 8

typedef struct figure {
    int height;
    int weight;
} figure_t;

typedef struct record_sequence {
    int start_idx;
    int end_idx;
    int len; //end_idx - start_idx
} record_sequence_t;

void swap(figure_t *m1, figure_t *m2);

int main ( void ) {


    figure_t members[CNT] = { { 60, 100}, { 65, 100},
                              { 70,  65}, { 75,  75},
                              {100, 110}, {110, 100},
                              {100,  95}, {110, 100} };


    /* original seq. */
    /* {60,100}, {65,100}, {70,65}, {75,75}, {100,110}, {100,95}, {110,100, {110,100} */

    /* sorted height */ 
    /* {60,100}, {65,100}, {70,65}, {75,75}, {100,110}, {100,95}, {110,100, {110,100} */

    /* sorted weight */
    /* {60,100}, {65,100}, {70,65}, {75,75}, {100,95}, {100,110}, {110,100, {110,100} */

    /* max sequences. */
    /* {60,100}, {65,100}, {75,75},  {100,95},  {100,110} */
    /* {70, 65}, {75,75},  {100,95}, {110,100}, {110,110} */


    int idx = 0;
    int iter_idx = 0;

    //sort by height using bubble sort
    for ( idx = 0; idx < CNT; idx++ ) {
        for ( iter_idx = 0; iter_idx < CNT-1; iter_idx++ ) {
            if ( members[iter_idx].height > members[iter_idx+1].height ) {
                swap(&members[iter_idx], &members[iter_idx+1]);
            }
        }
    }

    for( idx = 0; idx < CNT; idx++ ) {
        printf("{ %d, %d } ", members[idx].height, members[idx].weight);
    }
    printf("\n");

    //sort by weight using bubble sort
    for ( idx = 0; idx < CNT; idx++ ) {
        for ( iter_idx = 0; iter_idx < CNT-1; iter_idx++ ) {

            //swap only if the height is the same, but the weight is different
            if ( members[iter_idx].weight > members[iter_idx+1].weight &&
                    members[iter_idx].height == members[iter_idx+1].height) {
                swap(&members[iter_idx], &members[iter_idx+1]);
            }

        }
    }

    for( idx = 0; idx < CNT; idx++ ) {
        printf("{ %d, %d } ", members[idx].height, members[idx].weight);
    }
    printf("\n");

    /* now we need to find which ones break the sequence */
    /* we know that the height doesn't, because they are sorted, but weights
     * may as they are subsorted */

    /* we know the sequence is broken, when the next weight is smaller, so
    record until then*/

    int start_idx = 0;
    record_sequence_t req_seq = {0,0,0};
    record_sequence_t tmp_seq = {0,0,0};
    
    for ( idx = 0; idx < CNT; idx++ ) {

        if ( members[idx+1].weight < members[idx].weight ) {
            //sequence is broken. the next weight is smaller
            //record the sequence entry
            tmp_seq.end_idx = idx;
            tmp_seq.len = tmp_seq.end_idx - tmp_seq.start_idx;

            //check if this is the largest sequence seen, if so record it
            if ( req_seq.len < tmp_seq.len ) {
                req_seq.start_idx = tmp_seq.start_idx;
                req_seq.end_idx   = tmp_seq.end_idx;
                req_seq.len       = tmp_seq.end_idx - tmp_seq.start_idx;
            }

            //reset the reading. Now we start from current index and reach
            //till sequence is broken again
            tmp_seq.start_idx = idx;
            tmp_seq.end_idx = 0;
        }

    }

    //print the recorded sequence (largest sequence)
    for( idx = req_seq.start_idx; idx <= req_seq.end_idx; idx++ ) {
        printf("{ %d, %d } ", members[idx].height, members[idx].weight);
    }
    printf("\n");

    return 0;
}

void
swap(figure_t *m1, figure_t *m2) {

    //swap
    figure_t tmp;

    tmp.height = m1->height;
    tmp.weight = m1->weight;

    m1->height = m2->height;
    m1->weight = m2->weight;

    m2->height = tmp.height;
    m2->weight = tmp.weight;

    return;
}


