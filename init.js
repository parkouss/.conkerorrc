// use sessions
require("session.js");
session_auto_save_auto_load = true;
session_save_buffer_access_order = true;


// load urls from the command line in new buffers instead
// of new windows.
url_remoting_fn = load_url_in_new_buffer;


// load download buffers in the background in the current
// window, instead of in new windows.
download_buffer_automatic_open_target = OPEN_NEW_BUFFER_BACKGROUND;

require("favicon");
read_buffer_show_icons = true;

// allow install of extensions from the web
session_pref("xpinstall.whitelist.required", false);
