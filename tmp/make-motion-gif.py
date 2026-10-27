from pathlib import Path
from PIL import Image,ImageOps,ImageDraw
import json
root=Path(__file__).resolve().parents[1]
folder=root/'tmp/motion-frames'
paths=sorted(folder.glob('*.png'))
times=json.loads((folder/'times.json').read_text())
frames=[]
for p in paths:
    im=Image.open(p).convert('RGB')
    im.thumbnail((1000,600),Image.Resampling.LANCZOS)
    frames.append(im)
durations=[max(60,times[i+1]-times[i]) for i in range(len(times)-1)]+[1800]
frames[0].save(root/'docs/media/home-motion.gif',save_all=True,append_images=frames[1:],duration=durations,loop=0,optimize=True)
selected=[0,4,9,14,19,27]
sheet=Image.new('RGB',(960,620),'#151c29')
draw=ImageDraw.Draw(sheet)
for j,i in enumerate(selected):
    im=Image.open(paths[i]);im.thumbnail((470,270))
    x=(j%2)*480;y=(j//2)*205
    sheet.paste(im,(x,y+20))
    draw.text((x+8,y+4),f'{times[i]} ms',fill='white')
sheet.save(root/'tmp/motion-contact-sheet.png')
print('GIF saved with',len(frames),'real browser frames')
