import sys
import re

data = sys.stdin.readlines()
path = re.search(r'path d="(.*)"', str(data))
if path:
    current = {"x":None, "y":None}
    points = []
    for val in path.group(1).split(" "):
        #print(val)
        try:
            fval = float(val)
            if current["x"] is None:
                current["x"] = float(val) - 550
            else:
                current["y"] = float(val) - 220.5
                points.append(current)
                current = {"x":None, "y":None}
        except:
            pass
    
    points.pop()
    print("points: [")
    for point in points: 
        print("    new Point(" + str(round(point["x"], 2)) + ", " + str(round(point["y"], 2)) + "),")
    print("]")
                