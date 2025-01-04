#include <stdio.h>
#include <stdlib.h>

struct profile{
	char *name;
	int  age;
	char *career;
	struct profile *next;
};

void add(char *, int, char *, struct profile **);

int main (void){

	struct profile *list;
	struct profile *head;
        head = (struct profile *)malloc(sizeof (struct profile));
	head->name = "tom";
        head->next = list;
	list = (struct profile *)malloc(sizeof (struct profile));
	list->name = "gregory";

	//add("bill", 33, "engineer", &list);
	puts(head->next->name);
	return 0;
	add("hansen", 38, "engineer", &list);
	add("amal", 24, "engineer", &list);

	int count = 0;
	for(count = 0; count < 4; count++){
		puts(head->name);
		head = head->next;
	}



}

void add(char *name, int age, char *career, struct profile **list){

	*list = (struct profile *)malloc(sizeof (struct profile));
	(*list)->name = name;
	*list = (*list)->next;


}
