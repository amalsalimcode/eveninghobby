#include <stdio.h>

 struct book {
        char *name;
        char name2[3];
 };


int main(void){

     struct book book_title[10];

     book_title[0].name = "hello world";
     book_title[1].name = "harry";


    void *p;

    printf("%d\n", sizeof(p));
	p = book_title;
    printf("%d\n", sizeof(p));
	printf("%s\n",p);


 return 0;

}

