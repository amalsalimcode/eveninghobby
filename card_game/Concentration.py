from Card import Deck, Player
from random import randrange

class Concentration:

    def __init__(self, cnt):

        self.d1, self.d2 = [Deck() for _ in range(2)]
        self.l = len(self.d1.deck)

        self.p = [Player(i) for i in range(cnt)]
        self.c_p = self.p[0]

    def play(self):

        i = 0
        while self.l > 0:
            print("ROUND", i, self.l)
            self.round()
            self.set_nxt_pl()
            i += 1

        w = max(self.p, key=lambda x: x.score)
        print("WINNER", w)

    def set_nxt_pl(self):
        self.c_p = self.p[(self.c_p.idx + 1) % len(self.p)]

    def round(self):

        c1 = self.d1.deck[randrange(0, self.l)]
        c2 = self.d2.deck[randrange(0, self.l)]

        if c1.rank == c2.rank and c1.suit == c2.suit:
            self.d1.deck.remove(c1)
            self.d2.deck.remove(c2)
            self.c_p.score += 1
            self.l -= 1








