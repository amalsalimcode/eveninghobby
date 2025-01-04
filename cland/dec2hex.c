#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>


static uint32_t
dec2hex(uint32_t value)
{
        int ones, tens;
        char str[3];

        ones  = value%16;
        value = value/16;
        tens = value%16;

        snprintf(str, sizeof(str), "%x%x", tens, ones);

        return (uint32_t)strtol(str, NULL, 16);
}


int main(void) {

	char version[9] = "11000000";
	char val_str[16];

	int fw_itr = 0, shft_val = 0, i = 0;
	uint32_t val = 0;
	for ( i = 0; i < strlen(version); i=i+2 ) {

		uint32_t conv_val = ((version[i]-'0')*10 + (version[i+1] - '0'));
		val |= conv_val << shft_val;
		shft_val += 8;
		printf("%x\n",val);
	}

	printf("%08x\n",val);

	snprintf(val_str, sizeof(val_str),
			"%02d.%02d.%02d.%02d",
			(val & 0x000000FF),
			(val & 0x0000FF00) >> 8,
			(val & 0x00FF0000) >> 16,
			(val & 0xFF000000) >> 24);

	printf("%s\n",val_str);


	return 0;
}


