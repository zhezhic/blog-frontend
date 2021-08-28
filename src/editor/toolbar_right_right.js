function html_text_click($vm) {
    $vm.show_html_text = !$vm.show_html_text
}

function renderSwitch($vm) {
    $vm.show_render = !$vm.show_render
}

function fullscreen($vm) {
    let element = document.documentElement;
    if ($vm.fullscreen) {
        document.exitFullscreen();
    } else {
        element.requestFullscreen();
    }
    $vm.fullscreen = !$vm.fullscreen;
}

export default function toolbar_right_click(type, $vm) {
    const right_click = {
        'html_text': html_text_click,
        'preview': renderSwitch,
        'fullscreen': fullscreen
    }
    if (Object.prototype.hasOwnProperty.call(right_click, type)) {
        right_click[type]($vm);
    }
}
