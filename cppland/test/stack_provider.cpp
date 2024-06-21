#include "stack_provider.h"
#include <iostream>

stack_provider::stack_provider(void)
{
    cur_stack = stack();
    x = 0;
}

void
stack_provider::push(int val)
{
	int result = cur_stack.push(val);

	/*push failed (max exceeded), get a new stack */
	if ( result == -1 ) {
		mylist.push_back(cur_stack);
		cur_stack = stack();
		cur_stack.push(val);
	}
}

int
stack_provider::pop(int stack_no)
{
	if (stack_no <= 0) {
		int result = -1; 
		result = cur_stack.pop();
		while ( result == -1 ) { 
			cur_stack = mylist.front();
			mylist.pop_front();
			result = cur_stack.pop();
		}   
		return result;
	}   

	std::list<stack>::iterator it; 
	int idx = 0;
	for ( it = mylist.begin(); it != mylist.end(); ++it ) { 
		idx++;
		if ( idx == stack_no ) { 
			return it->pop();
		}
	}

	return -1;
}
