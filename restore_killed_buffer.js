// From https://github.com/scottjad/restore_killed_buffer_url

// I think by the time kill_buffer_hook runs the buffer is gone so I
// patch kill_buffer

var kill_buffer_original = kill_buffer_original || kill_buffer;

var killed_buffers = [];

// I don't need ALL buffers to be able to be revived.
// And it takes lots of memory I assume.
var killed_buffers_size = 5;

kill_buffer = function (buffer, force) {
    if (buffer.display_uri_string) {
        killed_buffers.push({url: buffer.display_uri_string,
                             title: buffer.title,
                             history: buffer.web_navigation.sessionHistory});
    }

    kill_buffer_original(buffer,force);

    if (killed_buffers.length > killed_buffers_size) {
        killed_buffers.shift();
    }
};

interactive("restore-killed-buffer-url", "Loads url from a previously killed buffer",
            function restore_killed_buffer_url (I) {
                if (killed_buffers.length !== 0) {
                    var killed_buffer = yield I.minibuffer.read(
                        $prompt = "Restore killed buffer url:",
                        $completer = new all_word_completer($completions = killed_buffers,
                                                            $get_string = function (x) x.url,
                                                            $get_description = function (x) x.title),
                        $default_completion = killed_buffers[killed_buffers.length - 1],
                        $auto_complete = "url",
                        $auto_complete_initial = true,
                        $auto_complete_delay = 0,
                        $require_match = true
                    );

                    load_url_in_new_buffer(killed_buffer.url);

                    var buf = I.window.buffers.current;
                    buf.web_navigation.sessionHistory = killed_buffer.history;
                    var original_index = buf.web_navigation.sessionHistory.index;
                    buf.web_navigation.gotoIndex(original_index);

                    // remove the revived buffer from the list of the killed ones
                    killed_buffers.splice(
                        killed_buffers.findIndex(function(e) e == killed_buffer),
                        1);
                } else {
                    I.window.minibuffer.message("No killed buffer urls");
                }
            });

define_key(default_global_keymap, "C-x r", "restore-killed-buffer-url");
