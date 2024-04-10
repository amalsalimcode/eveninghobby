from typing import List


class Solution:
    def restoreIpAddresses(self, s: str) -> List[str]:

        ans = []

        def fil(x):
            if x is None:
                return False
            return all([False for a in x.split(".") if int(a) < 0 or int(a) > 255])

        def iter_ip(c_s, st):
            nonlocal ans

            if c_s.count('.') == 3:
                ans.append(c_s)
                return

            if st + 1 >= len(c_s):
                return

            c_s = c_s[:st] + "." + c_s[st+1:]

            pl = c_s.rfind(".")
            ans += [iter_ip(c_s, pl+2), iter_ip(c_s, pl+3), iter_ip(c_s, pl+4)]
            return

        iter_ip(s, 1)
        iter_ip(s, 2)
        iter_ip(s, 3)
        ans = list(set(filter(fil, ans)))
        return ans

x = Solution().restoreIpAddresses("25525511135")
print(x)



class Solution:
    def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:

        def get_m(x):
            r = list(filter(lambda y: y != -1, x))
            return min(r) if r else -1


        def iter_m(r, c, seen):
            nonlocal grid

            if any([r >= len(grid), r < 0, c >= len(grid[0]), c < 0]):
                return -1

            if grid[r][c] == 1:
                return -1

            if str([r,c]) in seen:
                return -1

            print("visiting", r,c)
            seen.add(str([r,c]))

            if [r,c] == [len(grid)-1, len(grid[0])-1]:
                return len(seen)

            return get_m([iter_m(r+1,c,seen.copy()), iter_m(r,c+1,seen.copy()), iter_m(r+1,c+1,seen.copy()),
                          iter_m(r-1,c,seen.copy()), iter_m(r,c-1,seen.copy()), iter_m(r-1,c-1,seen.copy())])


        return iter_m(0,0,set())

grid = [[0,1,1,0,0,0],[0,1,0,1,1,0],[0,1,1,0,1,0],[0,0,0,1,1,0],[1,1,1,1,1,0],[1,1,1,1,1,0]]
Solution().shortestPathBinaryMatrix(grid)