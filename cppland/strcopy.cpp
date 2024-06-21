// string constructor
#include <iostream>
#include <string>

using namespace std;

void get_str(string& name);

int main ()
{
    string name (6, '0');
    get_str(name);
    cout << name << endl;
    return 0;
}


void
get_str(string& name) {
    name = "amal";
}
