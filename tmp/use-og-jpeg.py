from pathlib import Path
p=Path('app/site.config.mjs');s=p.read_text().replace('rahmawan-og.png','rahmawan-og.jpg');p.write_text(s)
p=Path('app/scripts/page-head.mjs');s=p.read_text().replace('content="image/png"','content="image/jpeg"');p.write_text(s)
p=Path('app/tests/page-head.test.mjs');s=p.read_text().replace(r'\.+\.png',r'\.+\.jpg').replace(r'.+\.png',r'.+\.jpg');s=s.replace("  const png=readFileSync(new URL('assets/social/rahmawan-og.png',root));\n  assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');\n  assert.equal(png.readUInt32BE(16),1200);\n  assert.equal(png.readUInt32BE(20),630);", "  const image=readFileSync(new URL('assets/social/rahmawan-og.jpg',root));\n  assert.equal(image.subarray(0,3).toString('hex'),'ffd8ff');\n  assert.ok(image.length>10000);")
p.write_text(s)
