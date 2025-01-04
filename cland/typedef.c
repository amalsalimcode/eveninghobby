#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define DUMP(varname) printf(stderr, "%s = %x", #varname, varname);

int main(void){

	typedef void *  sk_Pid;
	char * sentence = "hellow world";
	sk_Pid amal = &sentence;

	char* please = *(char**)amal;

	printf("ok so the value that you have is %s\n", please);



	typedef
		struct vartab {
			char const* name;
			int * var;
			char *amal;
		} vartab;

	int foo;
	int bar;

	/*
	vartab *varTable1;
	varTable1 = (vartab *)malloc(sizeof(struct vartab));
	varTable1->name = "hhhh";
	if(varTable1) {
		printf("%s\n", varTable1->name);
	}
	free(varTable1);
	printf("%s\n", varTable1->name);

	varTable1->name = "hhhh";
	printf("%s\n", varTable1->name);
	return;
	*/

	vartab varTable[] = {
		{ "foo", &foo },
		{ "bar", &bar }
	};

	foo = 40;
	bar = 50;


	printf("%d\n", *varTable[0].var);


	vartab *abc;
	//abc = malloc(sizeof(vartab));
	abc->name= malloc(20);
	abc->name = "hello world";
	abc->var = malloc(30);
	printf("%d\n", strlen(abc->name));

}

