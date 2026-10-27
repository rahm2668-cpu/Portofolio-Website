from pathlib import Path
from PIL import Image
from shutil import copyfile

root = Path(__file__).resolve().parents[1]
source = root / 'canva-assets/rahmawan-face-original-v2.png'
target = root / 'app/public/assets/profile'
copyfile(source, target / 'rahmawan-original.png')
# Trace only the existing alpha silhouette into a native SVG. Photo bytes stay intact.
im = Image.open(source).convert('RGBA')
alpha = im.getchannel('A')
left, right = [], []
for y in range(0, im.height, 5):
    xs = [x for x in range(0, im.width, 3) if alpha.getpixel((x,y)) > 128]
    if xs:
        left.append((min(xs),y))
        right.append((max(xs),y))
points = left + right[::-1]
path = 'M' + ' L'.join(f'{x} {y}' for x,y in points) + ' Z'
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1165 1350"><path id="silhouette" pathLength="1" d="{path}"/></svg>'
(target / 'rahmawan-outline.svg').write_text(svg,encoding='utf8')
print('Original portrait copied unchanged; silhouette SVG generated from alpha.')
