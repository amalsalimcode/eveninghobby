from Card import Deck, Player
from collections import defaultdict


class CrazyEights:
    def __init__(self, cnt):
        if cnt == 1:
            raise Exception("More than 1 player needed")

        self.d = Deck()
        self.p = [Player(i) for i in range(cnt)]
        _ = [p.hand.append(self.d.draw()) for p in self.p for _ in range(5 if cnt <= 4 else 7)]
        self.f = self.d.draw()

        self.c_p = self.p[0]

        self.is_m = lambda: any([x.rank == self.f.rank or x.suit == self.f.suit for x in self.c_p.hand])
        self.get_m = lambda: [x for x in self.c_p.hand if x.rank == self.f.rank or x.suit == self.f.suit]

    def get_nxt(self):
        return self.p[(self.c_p.idx + 1) % len(self.p)]

    def play(self):
        while self.round():
            self.c_p = self.get_nxt()
            print(self.c_p, self.f)
        print("WINNER! ", self.c_p)

    def round(self):
        r = lambda: True if len(self.c_p.hand) else False

        if not self.is_m() and len(self.d.deck):
            self.c_p.hand.append(self.d.draw())

        et = [x for x in self.c_p.hand if x.rank == 8]
        non_et = [x for x in self.get_m() if x.rank != 8]

        if len(non_et) > 1:
            self.c_p.hand.remove(non_et[0])
            self.f = non_et[0]
            return r()

        if len(et):
            self.c_p.hand.remove(et[0])
            self.f = et[0]
            self.f.suit = self.mst_cmn()
            return r()

        if len(non_et) == 1:
            self.c_p.hand.remove(non_et[0])
            self.f = non_et[0]
            return r()

        return r()

    def mst_cmn(self):
        m = defaultdict(list)
        _ = [m[c.suit].append(c) for c in self.c_p.hand]
        return sorted(m.items(), key=lambda x: -len(x[1]))[0][1][0].suit
