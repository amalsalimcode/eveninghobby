#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdint.h>

#define MAXCHARS 1000000

int main() {

	FILE *fp = fopen("acplog", "r");
	if (fp == NULL) {
		printf("something is wrong with file open");
	}


	char xmltext[MAXCHARS];

	fread(xmltext, MAXCHARS, 1, fp);

	uint64_t count = 0;
	char *word = strtok(xmltext, ":");

	while(word) {
		if(count % 5 == 0){
			child_no = 0;
			if (strlen(word) != 8) {
				printf("something went wrong %d %s %d \n",
						strlen(word),
						word, count);
			}
		}
		handle_content(NULL, word, strlen(word));
		printf("count is %d, word is %s\n", count, word);
		word = strtok(NULL, ":\n");
		count++;
		child_no++;
	}


	fclose(fp);

	return 0;

}


