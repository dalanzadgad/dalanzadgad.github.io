# dalanzadgad.github.io

Make a spritesheet from a gif:

```sh
$ convert -coalesce /tmp/campFire.gif /tmp/frames/%02d.png
$ montage -resize 100% -background transparent -tile 4x -geometry +0+0 /tmp/frames/*.png images/campFire.png
```

Extract mp3 from a video (youtube-dl):


```sh
$ ffmpeg -i theme.webm -vn -acodec libmp3lame -ac 2 -ab 160k -ar 48000 fnaf.mp3
```
