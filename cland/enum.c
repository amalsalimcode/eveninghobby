#include <stdio.h>

typedef struct list{

      #define A #A;
      char * name;

}list_t

/* To shorten example, not using argp */

typedef enum {
	E_DSA_MODULE_FIRST = 0,
	E_DSA_MODULE_A = E_DSA_MODULE_FIRST,
	E_DSA_MODULE_B,
	E_DSA_MODULE_LAST = E_DSA_MODULE_B,
	E_DSA_MODULE_INVALID,
	E_DSA_MODULE_UNKNOWN = 0xffff,
} dsa_shelf_module_id_t;

int main ()
{


dsa_shelf_module_id_t value = 2;


  return 0;
}
