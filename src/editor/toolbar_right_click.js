import screenfull from "screenfull";
function navigation($vm) {
    if ($vm.blog.editText === ''||$vm.blog.editText.match('#\\s')===null) {
        return
    }
    $vm.overlay=!$vm.overlay
}
function html_text($vm) {
    $vm.show_html_text = !$vm.show_html_text
}

function preview($vm) {
    $vm.show_render = !$vm.show_render
}

function fullscreen($vm) {
    if (screenfull.isEnabled) {
        if ($vm.isFullscreen) {
            screenfull.exit();
        }else {
            screenfull.request(document.getElementById('editor'));
        }
    }
}

export default function toolbar_right_click(type, $vm) {
    const right_click = {
        navigation,
        html_text,
        preview,
        fullscreen,
    }
    if (Object.prototype.hasOwnProperty.call(right_click, type)) {
        right_click[type]($vm);
    }
}
