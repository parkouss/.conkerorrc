function jjf_load_private_rc () {
    var path = make_file("~/.conkerorrc/private/");
    if (! path.exists())
        return;
    var entries = path.directoryEntries;
    while (entries.hasMoreElements()) {
        var entry = entries.getNext();
        entry.QueryInterface(Ci.nsIFile);
        if (entry.leafName.substr(-3).toLowerCase() == '.js') {
            try {
                load(entry);
            } catch (e) {
                dump_error(e);
            }
        }
    }
}

jjf_load_private_rc();
