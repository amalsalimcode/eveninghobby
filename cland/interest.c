#include <stdio.h>

#define max_row_count 10
#define MACRO(hello)

int main()
{

    void *mac;
    mac = hello;
	int p = 1000000;
	float i = 0.08;
	p = p + i*p;

	while(p > 0){
		    printf("here is the value of p %d \n", p);
		    p = p - 100000;
		    p = p + i*p;
	}


}
