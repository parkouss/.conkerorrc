interactive("instapaper-link", "Send the current link to InstaPaper.", function (I) {
  bo = yield read_browser_object(I) ;
  mylink = load_spec_uri_string(load_spec(encodeURIComponent(bo)));
  check_buffer(I.buffer, content_buffer);
  let posturl = 'https://www.instapaper.com/api/add?' +
        'username=' + encodeURIComponent(INSTAPAPER_USER) + '&' +
        'password=' + encodeURIComponent(INSTAPAPER_PWD) + '&url=' + mylink +
        '&title=' + encodeURIComponent(
          yield I.minibuffer.read(
            $prompt = "Title (optional): ",
            $initial_value = bo.textContent)) +
        '&selection=' + encodeURIComponent(
          yield I.minibuffer.read(
            $prompt = "Description (optional): ",
            $initial_value = "From: "+ I.buffer.title +" ("+I.window.content.location.href+")"
          ));
  try {
    var content = yield send_http_request(load_spec({uri: posturl}));
    if (content.responseText == "201") {
      I.window.minibuffer.message("InstaPaper ok!");
    } else {
      I.window.minibuffer.message("Error." + content.responseText);
    }
  } catch (e) {
    I.window.minibuffer.message(e);
  }
}, $browser_object = browser_object_links);

define_key(default_global_keymap, "C-x i", "instapaper-link");
