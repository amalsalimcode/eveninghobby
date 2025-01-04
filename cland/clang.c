#include <stdio.h>

#define max_row_count 10

int main()
{

	float a = 3.0;
	float b = 0;
	float c = a/b;

	
	
	char karacter = 'A';
        int max_column_count = 1;
        int row_count = 0;
        int column_count = 0;


	for(row_count = 0; row_count < max_row_count; row_count++){
		printf("%d\n", row_count);
	}

	for(row_count = 0; row_count <= max_row_count; row_count++){
		printf("%d\n", row_count);
	}

	return 0;

	for(;;){
	for(row_count = 0; row_count < max_row_count; row_count++){
	        karacter = 'A';
		for(column_count = 0; column_count < max_column_count; column_count++){
			printf("%c", karacter++);
		}
		printf("\n");
		max_column_count++;
	}

	for(row_count = 0; row_count < max_row_count; row_count++){
		karacter = 'A';
		for(column_count = max_column_count; column_count > 0; column_count--){
			printf("%c", karacter++);
		}
                printf("\n");
		max_column_count--;


	}
	}
}
