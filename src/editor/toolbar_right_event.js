function html_text_click($vm) {
    $vm.show_html_text=!$vm.show_html_text
}
export default function toolbar_right_click(type,$vm){
    const right_click = {
        'html_text': html_text_click,
    }
    if (Object.prototype.hasOwnProperty.call(right_click,type)) {
        right_click[type]($vm);
    }
}
