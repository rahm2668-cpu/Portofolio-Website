from PIL import Image
import numpy as np
from pathlib import Path
im=Image.open(r'C:/Users/Pongo/OneDrive/Pictures/CV/foto cv.png').convert('RGBA')
a=np.array(im); original=a.copy(); r,g,b=[a[:,:,i].astype(float) for i in range(3)]
red=(r>95)&(r>1.8*g)&(r>1.8*b)
mask=np.zeros(red.shape,dtype=bool)
stack=[(0,0),(red.shape[0]-1,red.shape[1]-1)]
while stack:
 y,x=stack.pop()
 if y<0 or x<0 or y>=red.shape[0] or x>=red.shape[1] or mask[y,x] or not red[y,x]: continue
 mask[y,x]=True
 stack.extend([(y-1,x),(y+1,x),(y,x-1),(y,x+1)])
a[:,:,3]=np.where(mask,0,255).astype('uint8')
assert np.array_equal(a[:,:,:3],original[:,:,:3])
print('Face mask sample:',a[650,580].tolist())
Image.fromarray(a).save('canva-assets/rahmawan-original-transparent.png')
print('RGB identical to original. Transparent background pixels:',int(mask.sum()))


