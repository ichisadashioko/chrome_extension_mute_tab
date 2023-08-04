// Flip the muted state of the tab
function updateMuteState(tab) {
    let current_state = tab.mutedInfo.muted;
    let should_mute = !current_state;
    chrome.tabs.update(tab.id, { muted: should_mute });
}

chrome.browserAction.onClicked.addListener(function (tab) {
    updateMuteState(tab);
});

chrome.commands.onCommand.addListener(function (command) {
    if (command == 'toggle_mute') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            updateMuteState(tabs[0]);
        });
    }
});
