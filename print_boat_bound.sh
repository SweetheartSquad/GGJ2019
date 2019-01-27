echo "{"
cat ./bounds/boat_scene/bound1.svg | python ./svg_path.py
echo "},{"
cat ./bounds/boat_scene/bound2.svg | python ./svg_path.py
echo "},{"
cat ./bounds/boat_scene/bound3.svg | python ./svg_path.py
echo ".reverse()"
echo "},{"
cat ./bounds/boat_scene/bound4.svg | python ./svg_path.py
echo ".reverse()"
echo "}"