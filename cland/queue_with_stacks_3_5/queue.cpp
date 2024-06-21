#include "queue.h"
#include <iostream>

using namespace std;

queue::queue() {
    s1 = stack("str1");
    s2 = stack("str2");
}

void
queue::add(int value) {
    s1.push(value);
}

int
queue::remove() {

    int val1;

    while ( true ) {
        val1 = s1.pop();
        if ( val1 == -1 ) {
            break;
        }
        s2.push(val1);
    }

    cout << "done pulling out of s1" << endl; 
    int ret_val = s2.pop();
    cout << "first pull from s2" << ret_val << endl;

    val1 = 0;
    while ( true ) {
        val1 = s2.pop();
        if ( val1 == s2.pop()) {
            break;
        }
        s1.push(val1);
    }

    return ret_val;
}
