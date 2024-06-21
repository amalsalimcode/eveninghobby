#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>


typedef struct node {
  int val;
  struct node *nxt;
} node_t;

/* unsorted list with duplicate entries */
node_t n10 = { 5,  NULL };
node_t n9  = { 5,  &n10 };
node_t n8  = { 8,  &n9 };
node_t n7  = { 8,  &n8 };
node_t n6  = { 6,  &n7 };
node_t n5  = { 0,  &n6 };
node_t n4  = { 2,  &n5 };
node_t n3  = { 3,  &n4 };
node_t n2  = { 2,  &n3 };
node_t n1  = { 1,  &n2 };

//1 2 3 2 5 6 8 8 8 5

node_t *head = &n1;


node_t a4  = { 3,  NULL };
node_t a3  = { 3,  &a4 };
node_t a2  = { 2,  &a3 };
node_t a  =  { 1,  &a2 };

node_t b3  = { 9,  NULL };
node_t b2  = { 9,  &b3 };
node_t b  =  { 2,  &b2 };

//1 2 3 3
//2 9 9

/* circular list */
extern node_t c4;
node_t c7  = { 8,  &c4 };
node_t c6  = { 6,  &c7 };
node_t c5  = { 0,  &c6 };
node_t c4  = { 2,  &c5 };
node_t c3  = { 3,  &c4 };
node_t c2  = { 2,  &c3 };
node_t c1  = { 1,  &c2 };

node_t *circ_head = &c1;

//1-2-3-2-0-6-8
//      |     |  
//      |-----|



