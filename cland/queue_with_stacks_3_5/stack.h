#include <string>

using namespace std;

class stack
{
    public:
        stack();
        stack(string name);
        int push(int value);
        int pop(void);
    private:
        string my_name;
        int cur_idx;
        int array[11];
};
