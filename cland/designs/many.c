#include <stdio.h>
#define max 35

int main (void){

        int row = 5;
	int col_counter = 0;
	int row_counter = 0;
	int column = 3;
        char karat = 'a';

	int count = 0;
	for(row_counter = 0; row_counter < row; row_counter++){
	int n = max;
		while(n > 0){
			for(col_counter = 0; col_counter < column; col_counter++){
				for(count = 0; count < (n-1)/2; count++){
					printf(" ", count);
				}
				for(count = 0; count < (max-n+1); count++){
					printf("%c", karat);
				}
				for(count = 0; count < (n-1)/2; count++){
					printf(" ", count);
				}
			}
			printf("\n");
			n=n-2;
		}
		n=0;
		while(n < (max-1)/2){

			for(col_counter = 0; col_counter < column; col_counter++){
				for(count = 0; count < (n+1); count++){
					printf(" ", count);
				}
				for(count = 0; count < (max-(n+n+2)); count++){
					printf("%c", karat);
				}
				for(count = 0; count < (n+1); count++){
					printf(" ", count);
				}
			}
			printf("\n");
			n=n+1;
		}
		karat++;
	}

}
