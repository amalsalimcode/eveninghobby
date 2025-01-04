#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>


void change_value(int *a);
void change_value_2(int *a);
void set_num(uint64_t *num);

int aas=12442;

typedef struct hello {
	int a;
	char *world;
}hello_t;
void set_value(hello_t *john);
void malloc_struct(hello_t **john);
void free_struct(hello_t **john);

int main (void ){

	int a = 0;
	int *b;

	b = &a;
	*b = 19;

	printf("%d", a);

	return 0;

	hello_t *john;
	malloc_struct(&john);
	set_value(john);
	printf("john->world: %s\n", john->world);
	printf("john->a: %d\n", john->a);
	free_struct(&john);

	uint64_t world_no = (uint64_t)john->world;
	printf("%d", world_no);

	return 0;
}

void malloc_struct(hello_t **john)
{
	char str[10];
	snprintf(str, sizeof(str), "worldach");

	hello_t *lil_john;
	*john = malloc(sizeof(hello_t));
	lil_john = *john;
	lil_john->world = malloc(10);
	memcpy(lil_john->world, str, 10);
	lil_john->a = 1234;
	/*
	(*john)->world = malloc(10);
	memcpy((*john)->world, "world", 10);
	(*john)->a = 1234;
	*/
}

void free_struct(hello_t **john)
{
	free((*john)->world);
	free(*john);
}

void set_value(hello_t *john)
{
	memcpy(john->world, "world", 10);
	john->a = 1234;
}
void change_value(int *a)
{
	a=&aas;
}
void set_num(uint64_t *num)
{
	*num = 1234567;
}
void change_value_2(int *a)
{
	*a=aas;
}
