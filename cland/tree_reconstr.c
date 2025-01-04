#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define ARR_SZ 7

typedef struct node {
	struct node	*left;
	struct node	*right;
	int value;
} node_t;

void insert(int value, node_t *root );
node_t *traverse(int value, node_t *node);
void print_preorder ( node_t *node );

int main ( void ) {

	//provided array
	int array[ARR_SZ] = {7, 5, 3, 6, 16, 8, 18};

	//In a preorder given array,
	//the first index of array will be the root of BST
	int idx = 0;
	node_t *root = malloc ( sizeof (node_t) );
	root->value = array[0];

	//the rest of the array, will follow BST rules for insertion
	for ( idx = 1; idx < ARR_SZ; idx ++) {
		insert( array[idx], root );
	}

	//print the tree in preorder, to verify
	print_preorder(root);

	return 0;
}

void
insert(int value, node_t *root ) {

	//traverse per BST rules, till last child
	node_t *node = traverse(value, root);

	//the value is going in as a new node to tree
	node_t *new_node = malloc ( sizeof (node_t) );
	new_node->value = value;

	//Following BST rule to add
	if ( value > node->value ) {
		node->right = new_node;
	} else {
		node->left = new_node;
	}
}

node_t *
traverse ( int value, node_t *node ) {

	//Following BST rule to traverse
	if ( value > node->value && node->right) {
		traverse( value, node->right );
	} else if ( value < node->value && node->left ){
		traverse( value, node->left );
	} else {
		return node;
	}
}

void
print_preorder ( node_t *node ) {

	printf ("%d ", node->value);

	if ( node->left ) {
		print_preorder(node->left);
	}
	if (node->right ) {
		print_preorder(node->right);
	}
}
