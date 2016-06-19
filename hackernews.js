/**
 * (C) Copyright 2016 Julien Pagès
 *
 * Use, modification, and distribution are subject to the terms specified in the
 * COPYING file.
 **/

require("content-buffer.js");


define_browser_object_class("hackernews-links",
    null,
    xpath_browser_object_handler(
        "//td[@class='title']/a"
    ),
    $hint = "select hacker news"
);


var hackernews_link_commands = [
    "follow", "follow-new-buffer", "follow-new-buffer-background",
    "follow-new-window", "save", "copy", "shell-command-on-file"
];


define_page_mode("hackernews-mode",
    build_url_regexp($domain = /news\.ycombinator/,
                     $allow_www = true,
                     $tlds = ["com"]),
    function enable (buffer) {
        for each (var c in hackernews_link_commands) {
            buffer.default_browser_object_classes[c] =
                browser_object_hackernews_links;
        }
    },
    function disable (buffer) {
        for each (var c in hackernews_link_commands) {
            delete buffer.default_browser_object_classes[c];
        }
    },
    $display_name = "Hacker News"
);


page_mode_activate(hackernews_mode);

provide("hackernews");
