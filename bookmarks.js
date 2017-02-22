require("services");

function iterBookmarks(visitor) {
    var options = nav_history_service.getNewQueryOptions();
    var query = nav_history_service.getNewQuery();

    // options.setGroupingMode(options.GROUP_BY_FOLDER);
    query.setFolders([nav_bookmarks_service.unfiledBookmarksFolder], 1);

    var result = nav_history_service.executeQuery(query, options);
    var rootNode = result.root;
    var returnedValue = [];

    rootNode.containerOpen = true;
    for (var i = 0; i < rootNode.childCount; i ++) {
        var node = rootNode.getChild(i);
        visitor(node);
    }

    // toujours fermer un conteneur après utilisation !
    rootNode.containerOpen = false;
}

function getBookmarks() {
    var results = [];
    iterBookmarks(function (x) { results.push(x) });
    return results;
}

function removeBookmark(bookmark) {
    nav_bookmarks_service.removeItem(bookmark.itemId);
}


define_keymap("list_bookmarks_keymap", $parent = minibuffer_keymap);
define_key(list_bookmarks_keymap, "C-k", "read-buffer-kill-bookmark");
define_key(list_bookmarks_keymap, "C-d", "read-buffer-kill-bookmark");
define_key(content_buffer_normal_keymap, "C-b", "bookmark-list");

interactive(
    "bookmark-list", "List known bookmarks",
    function (I) {
        var bookmarks = getBookmarks();
        if (bookmarks.length === 0) { return; }

        var bookmark = yield I.minibuffer.read(
            $keymap = list_bookmarks_keymap,
            $prompt = "Choose bookmark",
            $completer = new all_word_completer($completions=bookmarks,
                                                $get_string=function (x) x.uri,
                                                $get_description=function (x) x.title),
            $default_completion = bookmarks[0],
            $auto_complete="url",
            $auto_complete_initial=true,
            $auto_complete_delay=0,
            $require_match=true
        );

        I.window.buffers.current.document.location.href = bookmark.uri;
    });


interactive("read-buffer-kill-bookmark",
    "Kill the current selected bookmark in the completions list "+
    "in a read buffer minibuffer interaction.",
    function (I) {
        var s = I.window.minibuffer.current_state;
        var i = s.selected_completion_index;
        var c = s.completions;
        if (i == -1)
            return;
        removeBookmark(c.get_value(i));
        if (c.count > 1) {
            s.completer.completions_src = iterBookmarks;
            s.completer.refresh();
            s.handle_input(I.window.minibuffer);
        }
    });
