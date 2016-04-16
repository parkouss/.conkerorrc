// use sessions
require("session.js");
session_auto_save_auto_load = true;
session_save_buffer_access_order = true;

var emacs = "emacsclient -c -a ''";

// use C-i or C-x x to open the external editor in a text field
editor_shell_command = emacs;

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

//Follow new link in buffer
define_key(content_buffer_normal_keymap, "d", "follow-new-buffer");

// configure the mode line
add_hook("mode_line_hook", mode_line_adder(buffer_count_widget), true);

// useful page modes
require('google-search-results');
require('google-images');
require('google-maps');
require('hackernews');


define_webjump("gmail", "https://mail.google.com/mail/u/0/"); //primary account
define_webjump("hackernews", "https://news.ycombinator.com/")

// default webjump
read_url_handler_list = [read_url_make_default_webjump_handler("google")];

// open pdf within emacs
content_handlers.set("application/pdf", content_handler_open_default_viewer);
external_content_handlers.set("application/pdf", emacs);

// also open zip files within emacs
content_handlers.set("application/zip", content_handler_open_default_viewer);
external_content_handlers.set("application/zip", emacs);

define_key(default_global_keymap, "C-x c", "caret-mode");

