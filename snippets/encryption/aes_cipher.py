import base64
from Crypto.Cipher import AES
from Crypto import Random

from chatproj import settings

BLOCK_SIZE = 16


class AESCipher:
    """
    This class is written to encrypt any given UTF-8 string. It uses AES to do the encryption
    The provided initial value will be used for the encryption, and it preferred to be a unique
    value.
    The caller should ensure that IV is initialized with a length of 16 or under
    IV is expected to be a unique value for each initialization, and expects a UTF-8 string
    """
    def __init__(self, key:str ,iv:str=None):
        self.block_size = 16
        if self.iv:
            self.iv = iv.encode('utf-8')
        self.key = key

    def _pad(self, s):
        """
        Pad the input with carriage return to length that is divisible by block_size
        """
        return s + (self.block_size - len(s) % self.block_size) * chr(self.block_size - len(s) % self.block_size)

    @staticmethod
    def _unpad(s: bytes) -> bytes:
        """
        Unpad the input by removing the carriage return values from the input
        """
        return s[:-ord(s[len(s)-1:])]

    def encrypt(self, raw: str) -> bytes:
        """
        Provided a UTF-8 string input, encrypt the input and return as bytes
        """
        padded_raw = self._pad(raw)
        if len(self.iv) < 16:
            iv = self.iv + Random.new().read(16 - len(self.iv))
        else:
            # this should never happen, but in case the provided
            # iv is longer than 16, we will create a random key
            iv = Random.new().read(16)

        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(padded_raw))

    def decrypt(self, enc: bytes) -> str:
        """Decrypt the input, that was encrypted before by the same instance of this class"""
        enc = base64.b64decode(enc)
        iv = enc[:16]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return self._unpad(cipher.decrypt(enc[16:])).decode()

