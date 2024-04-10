class Tennis:

    def __init__(self, game):
        self.game = game
        self.s = {"P0": 0, "P1": 0}
        self.n_s = {0: 15, 15: 30, 30: 45}

        self.o_p = lambda c_p: [x for x in self.s.keys() if x != c_p][0]

    def play(self):

        p = self.game.pop(0)

        if self.s[p] in [0, 15, 30]:
            self.s[p] = self.n_s[self.s[p]]

        elif self.s[p] == "adv":
            print(p, "WON")
            return

        elif self.s[p] == 45:

            if self.s[self.o_p(p)] == "adv":
                self.s[self.o_p(p)] = "45"

            else:
                self.s[p] = "adv"

        print(p, self.s)
        self.play()

