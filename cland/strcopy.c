#include <stdio.h>



 void stringcopy(char *name1, char *name2);

int main(void){

	char *sentence = "Fri Jan 23 08:54:13 UTC 2015"

	printf("%s", sentence+4);
	return 0;

char *name1 = "hello_world";

 
 char *name2;
 while(*name1 != '\0'){
	 name2 = name1;
	 name2++;
	 name1++;
 }
 name2 = name2 - 5;
 puts(name2);
 return 0;

}

