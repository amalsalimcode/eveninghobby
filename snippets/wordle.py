from nltk.corpus import words
import random

class Wordle:

    def __init__(self):
        self.m = {}
        self.p = ""
        self.n = ""

        self.exact = lambda arg: all([arg[k] == v for k, v in self.m.items()]) if len(self.m.keys()) > 0 else True
        self.not_in = lambda arg: all([x not in self.n for x in arg]) if len(self.p) > 0 else True
        self.partial = lambda arg: all([x in arg for x in self.p]) if len(self.p) > 0 else True

        self.w_list = [x.lower() for x in filter(lambda x: len(x) == 5, words.words())]

    def filter_wrds(self):
        f_w = [x for x in self.w_list if all([self.exact(x), self.not_in(x), self.partial(x)])]
        self.w_list = list(set(f_w))

    def choose_wrd(self):
        return self.w_list[random.randrange(len(self.w_list))]

    def cmp_add_checks(self, chosen_word, answer):
        for i, c in enumerate(chosen_word):
            if c in answer:
                self.p += c
            else:
                self.n += c

            if answer[i] == c:
                self.m[i] = c


def get_wordle():
    w = Wordle()
    w_list = [x.lower() for x in filter(lambda x: len(x) == 5, words.words())]
    answer = w_list[random.randrange(len(w_list))]

    while len(w.m.keys()) != 5:
        w.filter_wrds()
        chosen = w.choose_wrd()
        w.cmp_add_checks(chosen, answer)

        print("answer", answer, ": ", chosen, w.w_list)

get_wordle()

