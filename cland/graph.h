#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h> 

/* create a cyclic graph */

/* We need a node */

typedef struct node {
        char value;
        struct node *vertex;
        struct node *adjacent;
        bool visited;
} node_t;

extern node_t a, b, c, d, e, f, g;

/*
         a
      /     \
     .       .
     b   -.  c
 /   .  \
.    |   .
d -. e   f
|
.
g

*/

node_t a = {'a', &b,   NULL, false};
node_t b = {'b', &d,   &c,   false};
node_t c = {'c', NULL, &d,   false};
node_t d = {'d', &e,   &f,   false};
node_t e = {'e', &b,   &g, false};
node_t f = {'f', NULL, NULL, false};
node_t g = {'g', NULL, NULL, false};

node_t *HEAD = &a;
