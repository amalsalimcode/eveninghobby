#include <stdio.h>
#include <stdint.h>


typedef struct inj_type{
    int injected;
} inj_type_t;

void check_if_null(inj_type_t ptr_pass);

int main (void ){
 
    inj_type_t amal;
    amal.injected = (int)NULL;
 
    printf("%d", *NULL);
    if(NULL==0){
        printf("hello");
    }

    inj_type_t *hello = (inj_type_t *)(NULL);
    //check_if_null(*(*inj_type_t(NULL)));


    return 0;
}

void check_if_null(inj_type_t ptr_pass){

    if(ptr_pass.injected){
        printf("you have passed in a null value");
    }

}
