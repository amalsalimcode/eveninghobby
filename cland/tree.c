#include <stdio.h>
#include <stdlib.h>


typedef struct node {
	struct node	*left;
	struct node	*right;
	int		value;
} node_t;


void insert(node_t *root, int value);

int main (void) {


	node_t *root = malloc(sizeof(node_t));
	root->left = malloc(sizeof(node_t));
	root->right = malloc(sizeof(node_t));
	root->value = 5;

	insert(root, 6);
	insert(root, 5);
	insert(root, 7);
	insert(root, 4);
	insert(root, 8);


	return 0;

}

void
insert(node_t *root, int value)
{
	node_t	*node = root;

	while ( node->value != 0 ) {
		if ( value > node->value ) {
			node = node->right;
		}

		if ( value < node->value ) {
			node = node->left;
		}

		if ( node->value == value ) {
			return;
		}
	}

	node->value = value;
	node->left = malloc(sizeof(node_t));
	node->right = malloc(sizeof(node_t));

	return;

}
