# My conkeror configuration

[conkeror][1] is an awesome keyboard driven browser based on firefox.

# Installation

Clone conkeror:

```bash
git clone git://repo.or.cz/conkeror.git ~/dev/
```

Clone this repository in ~/.conkerorrc:

```bash
git clone https://github.com/parkouss/.conkerorrc ~
```

Create an executable launcher script */usr/local/bin/conkeror*:

```bash
#!/bin/sh
cd /home/jp/dev/conkeror
exec firefox -app application.ini "$@"
```

# Configuration

## youtube, html5 and fullscreen

Change the following preferences of the browser (about:config):

- full-screen-api.enabled: true
- media.fragmented.mp4.*: true
- media.mediasource.enabled: true
- media.mediasource.mp4.enabled: true
- media.mediasource.webm.enabled: true

**Be sure to leave the following set to false**:
media.fragmented-mp4.use-blank-decoder

[1]: http://conkeror.org/
