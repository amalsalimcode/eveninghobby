import random
class Card:
    def __init__(self, rank, val, suit):
        self.rank, self.val, self.suit = rank, val, suit

    def __str__(self):
        return "{}:{}".format(self.val, self.suit)

    def __repr__(self):
        return str(self)

class Deck:
    def __init__(self):
        self.deck = self.init_card()
        random.shuffle(self.deck)
        self.d_pile = []

    @staticmethod
    def init_card():
        o = []
        for s in ["Club", "Diamond", "Heart", "Spade"]:
            _ = [o.append(Card(rank=x, val=str(x), suit=s)) for x in range(2, 11)]
            _ = [o.append(Card(rank=x, val=y, suit=s)) for (x, y) in [(11, "Jack"), (12, "Queen"), (13, "King"), (1, "Ace")]]
        return o

    def shuffle(self):
        random.shuffle(self.deck)

    def draw(self):
        if not len(self.deck):
            random.shuffle(self.d_pile)
            self.deck[:] = self.d_pile
        return self.deck.pop()

    def discard(self, c):
        self.d_pile.append(c)

class Player:
    def __init__(self, idx):
        self.hand = []
        self.idx = idx
        self.score = 0

    def __str__(self):
        return "Player{}: {}".format(self.idx, self.hand)

    def __repr__(self):
        return str(self)

