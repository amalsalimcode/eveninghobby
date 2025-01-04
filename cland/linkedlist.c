#include <stdio.h>


struct groceries {
	int a;
	int b;
	struct groceries *next;
};

int main (void){

 struct groceries safeway;
 safeway.a = 19;
 safeway.b = 20;
 struct groceries walgreens = {60, 40};
 safeway.next = &walgreens; 

 struct groceries *p;
 p = (groceries *)malloc(sizeof (groceries));
 p = p->next;
 printf("%d", p->b);

}
