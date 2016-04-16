function org_store_link (url, title, window) {
    // register a link in emacs org mode.
    // You can use that many times, and then do in emacs
    // M-x org-insert-link or M-x org-insert-all-links
    // to insert links in a text buffer.
    // Also the urls are copied into emacs kill ring.
    var cmd_str = 'emacsclient -a \'\' \'org-protocol://store-link://'+url+'/'+title+'\'';
    if (window !== null) {
        window.minibuffer.message('Issuing ' + cmd_str);
    }
    shell_command_blind(cmd_str);
}

interactive(
    "org-store-current-link",
    "Send current page link and title to org store link",
    function (I) {
        org_store_link(
            encodeURIComponent(I.buffer.display_uri_string),
            encodeURIComponent(I.buffer.document.title),
            I.window
        );
    });

define_key(default_global_keymap, "O", "org-store-current-link");

interactive(
    "org-store-link",
    "Select and send a link to org store link",
    function(I) {
        bo = yield read_browser_object(I) ;
        link = load_spec_uri_string(load_spec(encodeURIComponent(bo)));
        check_buffer(I.buffer, content_buffer);
        org_store_link(
            link,
            encodeURIComponent(bo.textContent),
            I.window
        );
    }, $browser_object = browser_object_links);

define_key(default_global_keymap, "o", "org-store-link");

// on google, use the same selection defined by google page mode.
if (google_search_results_link_commands) {
    google_search_results_link_commands.push("org-store-link");
}
// same on hacker news
if(hackernews_link_commands) {
    hackernews_link_commands.push("org-store-link");
}
