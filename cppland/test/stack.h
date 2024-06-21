class stack
{
    public:
        stack();
        int push(int value);
        int pop(void);
    private:
        int cur_idx;
        int array[10];
};
