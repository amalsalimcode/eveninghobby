from Card import Deck, Player
from collections import defaultdict, Counter
import bisect

class BigTwo:

    def __init__(self, cnt):
        self.d = Deck()
        self.p = [Player(i) for i in range(cnt)]
        _ = [x.hand.append(self.d.draw()) for x in self.p for _ in range(52)]
        self.c_p = self.p[0]
        self.skp = []
        self.f_c = None

    def play(self):

        while True:

            while len(self.p) - len(self.skp) > 1:
                if not self.round():
                    self.skp.append(self.c_p)

                if len(self.c_p.hand) == 0:
                    print(self.c_p, " WON")
                    return

                self.c_p = self.get_nxt_pl()

            self.c_p = list(set(self.p) - set(self.skp))[0]

    def round(self):
        for x in [self.str_fl(), self.thr_two_knd(), self.two_knd(), self.single()]:
            if x is not None:
                _ = [self.c_p.hand.remove(a) for a in x]
                self.f_c = x
                return True

        return False

    def get_nxt_pl(self):
        n_p = lambda x: self.p[(x + 1) % len(self.p)]

        i = self.c_p.idx
        while n_p(i) in self.skp:
            i += 1
        return n_p(i)

    def single(self):
        return self.c_p.hand.pop()

    def two_knd(self):
        m = defaultdict(list)
        _ = [m[c.rank].append(c) for c in self.c_p.hand]
        for _, v in m.items():
            if len(v) >= 2:
                return v[:2]

    def thr_two_knd(self):
        m = defaultdict(list)
        _ = [m[c.rank].append(c) for c in self.c_p.hand]
        ans, th, tw = [], False, False

        for _, v in m.items():
            if len(v) >= 3 and th is False:
                ans += v[0:3]
                th = True
            elif len(v) >= 2 and tw is False:
                ans += v[0:2]
                tw = True

        return ans if len(ans) == 5 else []

    def str_fl(self):
        m = defaultdict(list)
        _ = [m[c.suit].append(c) for c in self.c_p.hand]

        for _, arr in m.items():
            if len(arr) < 5: continue
            arr.sort(key=lambda x: x.rank)
            pr, l, ans = arr[0], 1, [arr[0]]

            for c in arr[1:]:
                if l == 5:
                    return ans
                l = l + 1 if pr.rank + 1 == c.rank else 1
                ans = ans + [c] if pr.rank + 1 == c.rank else [c]
                pr = c
        return None




