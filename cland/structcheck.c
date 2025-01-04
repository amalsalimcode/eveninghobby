#include <stdio.h>


struct test {
	int a;
	int b;
};


int main(void){
	
	struct test firsttest;
        firsttest = 0;
        return 0;
        firsttest.a = 10;
	printf("%d",firsttest.a);

        struct test *follow;

	follow = &firsttest;
	follow->a = 20;
	printf("%d", firsttest.a);

}
