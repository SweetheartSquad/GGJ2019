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
                current["x"] = float(val) - 650
            else:
                current["y"] = float(val) - 337.5
                points.append(current)
                current = {"x":None, "y":None}
        except:
            pass
    
    print("points: [")
    for point in points: 
        print("    new Point(" + str(point["x"]) + ", " + str(point["y"]) + "),")
    print("]")
                