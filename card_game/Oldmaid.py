from Card import Player, Deck
from collections import defaultdict
from itertools import cycle
import random

class OldMaid:

    # init players for player count
    # init deck, remove queen
    # for each card, for each player draw a card
    def __init__(self, cnt):

        self.d = Deck()
        q = self.d.deck.pop([i for i, x in enumerate(self.d.deck) if x.rank == 11][0])
        print("Queen popped", q)

        self.p = [Player(i) for i in range(cnt)]
        self.dist_c()

        self.c_p = self.p[0]
        self.n_p = self.p[1]
        self.skp = []

    def dist_c(self):
        try:
            [self.p[i].hand.append(self.d.draw()) for i in cycle(range(len(self.p)))]
        except IndexError:
            pass

    def get_nxt_pl(self, p):
        i = self.p.index(p)
        while True:
            i = (i + 1) % len(self.p)
            if i not in self.skp:
                return self.p[i]
        raise Exception("code unreachable")

    def play(self):

        while len(self.p) - len(self.skp) > 1:
            print(self.c_p, self.n_p)
            self.round()

            self.skp = [p.idx for p in self.p if not p.hand]
            self.c_p, self.n_p = [self.get_nxt_pl(x) for x in [self.c_p, self.n_p]]
            if self.c_p == self.n_p:
                self.n_p = self.get_nxt_pl(self.n_p)

        print(len(self.p), self.p)

    def round(self):
        c = self.c_p.hand.pop(random.randrange(len(self.c_p.hand)))
        self.n_p.hand.append(c)
        self.fnd_twos(self.n_p)

    @staticmethod
    def fnd_twos(p):
        m = defaultdict(list)
        _ = [m[c.rank].append(c) for c in p.hand]

        for k, v in m.items():
            # must have at least 2 cards
            if len(v) <= 1:
                continue

            cnt = len(v) - 1 if len(v) % 2 != 0 else len(v)
            _ = [p.hand.remove(c) for c in v[:cnt]]

