#include <stdio.h>
#include <stdlib.h>

typedef struct {
	char *name;
	char *hobby;
}profile;

typedef struct {
	char *name;
}profiler;

int main(void){

	hi = (profile *)malloc(sizeof (profile));
	printf("%d\n", sizeof(hi->name));
	hi->name = (char *)malloc(5 * sizeof (char));
	printf("%d\n", sizeof(hi->name));
	hi->name = "name";
	puts(hi->name);
}
