#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include <math.h>

typedef struct node {
	struct node *left;
	struct node *right;
	int	value;
} node_t;

/* Tree 1:
	    500
        /  \
      300   700
              \
              800
                \
                900
*/

node_t n900 = {NULL, NULL, 900};
node_t n300 = {NULL, NULL, 300};
node_t n800 = {NULL,  &n900, 800};
node_t n700 = {NULL,  &n800, 700};
node_t n500 = {&n300, &n700, 500};

node_t *tree1 = &n500;



/* Tree 2:
	      50
          /
         40
        /
      30
*/
node_t n30 = {NULL, NULL, 30};
node_t n40 = {&n30, NULL, 40};
node_t n50 = {&n40, NULL, 50}; 

node_t *tree2 = &n30;

/* Tree 3:
    	3
       / \
      2   5
         / \
        4   7
	      /   \
          6   10
             /
            9
*/

node_t n9 = {NULL, NULL, 9};
node_t n10 = {&n9, NULL, 10};
node_t n6 = {NULL, NULL, 6};
node_t n7 = {&n6, &n10, 7};
node_t n4 = {NULL, NULL, 4};
node_t n5 = {&n4, &n7, 5};
node_t n2 = {NULL, NULL, 2};
node_t n3 = {&n2, &n5, 3};

node_t *tree3 = &n3;



typedef struct pnode {
	struct pnode *left;
	struct pnode *right;
    struct pnode *parent;
	int	value;
} pnode_t;

/* Tree 3:
    	3
       / \
      2   5
         / \
        4   7
	      /   \
          6   10
             /
            9
*/

extern pnode_t p10;
extern pnode_t p7;
extern pnode_t p5;
extern pnode_t p3;

pnode_t p9  =  {NULL, NULL, &p10, 9};
pnode_t p10 =  {&p9,  NULL, &p7,  10};
pnode_t p6  =  {NULL, NULL, &p7,  6};
pnode_t p7  =  {&p6,  &p10, &p5,  7};
pnode_t p4  =  {NULL, NULL, &p5,  4};
pnode_t p5  =  {&p4,  &p7,  &p3,  5};
pnode_t p2  =  {NULL, NULL, &p3,  2};
pnode_t p3  =  {&p2,  &p5,  NULL, 3};





