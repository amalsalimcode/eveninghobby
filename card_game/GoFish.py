from Card import Deck, Player
from collections import defaultdict
import random

class GoFish:

    def __init__(self, p_cnt):
        if p_cnt < 2:
            raise Exception("Player count must be > 2")

        self.d, self.p = Deck(), [Player(p) for p in range(p_cnt)]
        self.c_p, self.n_p, self.t_sc = self.p[0], self.p[1], 0

        _ = [p.hand.append(self.d.draw()) for p in self.p for _ in range(7 if p_cnt > 2 else 5)]
        print("Cards Distributed", self.p)

    def get_nxt_p(self, p):
        return self.p[(p.idx + 1) % len(self.p)]

    def round(self):
        dr_ap = lambda x, r: x.hand.append(self.d.draw()) is None and x.hand[-1].rank == r

        r = random.randrange(1, 14)
        r_c = [x for x in self.n_p.hand if x.rank == r]

        if len(r_c) or dr_ap(self.c_p, r):
            _ = [self.n_p.hand.remove(x) for x in r_c]
            _ = [self.c_p.hand.append(x) for x in r_c]
            _ = [self.check_four(x) for x in [self.c_p, self.n_p]]
            return True

        return False

    def check_four(self, pl):
        m = defaultdict(list)
        _ = [m[c.rank].append(c) for c in pl.hand]
        four = {k: v for k, v in m.items() if len(v) == 4}

        if not len(four.items()):
            return

        _ = [pl.hand.remove(x) for _, v in four.items() for x in v]
        _ = [self.d.discard(x) for _, v in four.items() for x in v]

        pl.score += len(four.items())
        self.t_sc += len(four.items())

    def play(self):
        while self.t_sc < 13:
            if self.round() is False:
                self.c_p, self.n_p = [self.get_nxt_p(x) for x in [self.c_p, self.n_p]]

        print(max(self.p, key=lambda x: x.score))

