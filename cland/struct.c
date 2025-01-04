#include <stdio.h>
#define max 20

 struct book {
	char *name;
	char name2[3];
 };

typedef struct test {
	int num;
}test_t;

int main (void){

 struct book book_title[10];

 book_title[0].name = "hello world";
 book_title[1].name = "harry";

 struct book hi = {"hello world", "abc"};

 puts(hi.name2);

 test_t index;

 index.num = 1234;

 test_t *ptr;
 
 ptr = &index;

  ptr->num += 1234;

  printf("%d", ptr->num);
}
