#include <stdio.h>


void interchange(int* a, int* b);



int main(void){

    typedef enum hello {
      INJ_NO_TAG,
      INJ_DISK_INQUIRY,
      INJ_RAID_LABEL,
      INJ_DDR_READ
    } s_persistent_t;

 
    typedef struct together {
        int a;
        s_persistent_t tags;
        int b;
    } together_t;


    together_t tag_list = {0x00 ,INJ_NO_TAG , 5};


    int a = INJ_DISK_INQUIRY;

    printf("%d", a);

    s_persistent_t amal = INJ_DISK_INQUIRY;

    if(amal == INJ_RAID_LABEL){
        amal = INJ_NO_TAG;
        printf("wow man, you have found an enum");
    }

    printf("here is an enum 0x%02x\n", amal);

	int num1 = 5;
	int num2 = 10;
	printf("the first number is num1 %d, and second num2 %d", num1, num2);
	interchange(&num1, &num2);
	printf("the first number is num1 %d, and second num2 %d", num1, num2);
}

void interchange(int *a, int *b){
	int temp = *a;
	*a = *b;
	*b = temp;
}


