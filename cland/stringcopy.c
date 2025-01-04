#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *name = "my name is amal";

//iterate the array
for ( int i = 0; i < strlen(name); i++ ) {

	//check for spaces
	if ( name[i] == ' ' ) {

		//copy remainder of string to next position
		shift_str(name, i+1);

		//set the spaces to be '#'
		name[i] = '#';
		name[i+1] = '#';
	}
}

void
shift_str(char *name, int i) {

	//"name is amal"
	char tmp = name[i+1];	//tmp == a
	char tmp2;
	int start_idx = i;

	do {
		name[i+1] = name[i];	//nnme
		tmp2 = name[i+2];	//tmp2 = m
		name[i+2] = tmp;	//nnae
		tmp = tmp2;		//tmp == m
		i++;

	} while ( name[i] )

	name[start_idx] = ' ';
	return;
}


int main (void){
	char *a = "hello";

	printf("%d", sizeof(a));
	printf("%d", strlen(a));

	char *b;
	int count = 0;
	while(*a != '\0'){
		b = a;
		b++;
		a++;
		count++;
	}
	b = b - count;

	puts(b);
}

