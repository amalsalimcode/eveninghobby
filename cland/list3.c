#include <stdio.h>
#include <stdlib.h>

typedef struct node {

	char letter;
	struct node *next;

} node_t;


/*
 * Objective:
 * 1. Create a linked list.
 * 2. Create a function that will add entries eg. append()
 * 3. Create a function that will delete entries eg. delete_entry()
 * 3. Create a function that will iterate and print all value eg. print_list()
 * 4. Create a two recursive functions that will print the reverse list
 * 5. Create a function that will reverse the list and then call print_list()
 *
 */

void append(node_t *node, char letter);
void print_list(node_t *node);
node_t *reverse (node_t *node);
void print_reverse(node_t *node);
char return_reverse(node_t *node);
void delete_entry(node_t *node, char del_letter);


int main (void) {


	node_t	*root;
	root = malloc(sizeof (node_t));

	append(root, 'a');
	append(root, 'b');
	append(root, 'c');
	append(root, 'd');
	append(root, 'e');
	append(root, 'f');

	delete_entry(root, 'c');

	print_list(root);

	print_reverse(root);
	printf("%c", return_reverse(root));

	root = reverse(root);
	root = reverse(root);
	print_list(root);

}

void
delete_entry (node_t *node, char del_letter) {

	node_t	*prev;

	while (node->letter != del_letter) {
		prev = node;
		node = node->next;
	}

	if (node->letter != del_letter) {
		return;
	}

	prev->next = node->next;
	free(node);
}

void
append( node_t *node, char letter ) {

	while ( node->next ) {
		node = node->next;
	}

	node->letter = letter;
	node->next = malloc(sizeof (node_t));

}

void
print_list(node_t *node) {

	while ( node ) {
		printf("%c", node->letter);
		node = node->next;
	}
}

/*
 * The trick here is to know that you need to
 * move your pointers.
 *
 * You have three pointers. prev, curr, next.
 *
 * 1.  set the next pointer to the previous pointer
 * 2.  move prev, curr and next.
 * 2.b next needs to be saved before setting it
 */
node_t *
reverse(node_t *root) {

	node_t *prev = NULL;
	node_t *curr = root;
	node_t *tmp_next = NULL;

	while ( curr->next ) {
		tmp_next = curr->next;
		curr->next = prev;
		prev = curr;
		curr = tmp_next;
	}

	return prev;

}

void
print_reverse(node_t *node) {

	if ( node->next) {
		print_reverse(node->next);
	}

	printf("%c", node->letter);
}

char
return_reverse(node_t *node) {

	if (node->next) {
		print_reverse(node->next);
	}

	return node->letter;
}
