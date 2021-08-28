//text area是否存在
function isExistSelectionObj(textareaDom) {
    return typeof textareaDom.selectionStart === 'number' && typeof textareaDom.selectionEnd === 'number';
}

//文本框插入
export const insertTextAtCaret = ({prefix, suffix, str}, type, $vm) => {
    let textarea = $vm.getTextareaDom()
    if (isExistSelectionObj(textarea)) {
        let {selectionStart: startPosition, selectionEnd: endPosition, value: text} = textarea
        let cursorFrontString = text.substring(0, startPosition)
        let selectedString = text.substring(startPosition, endPosition)
        let cursorBackString = text.substring(endPosition, text.length)
        let enter = '\n'
        switch (type) {
            case 'ol':
            case 'ul':
                if (startPosition === endPosition) {
                    // 直接插入
                    textarea.value = cursorFrontString + enter + prefix + enter + suffix + enter + cursorBackString;
                    textarea.selectionEnd = textarea.selectionStart = startPosition + enter.length + prefix.length
                } else {
                    // 存在选中区域
                    textarea.value = cursorFrontString + enter + prefix + selectedString + enter + suffix + enter + cursorBackString
                    textarea.selectionEnd = textarea.selectionStart = startPosition + enter.length + prefix.length + selectedString.length
                }
                break
            case 'code':
                if (startPosition === endPosition) {
                    // 无选中文本,直接插入
                    textarea.value = cursorFrontString + enter +
                        prefix +
                        str + enter +
                        suffix + enter +
                        cursorBackString
                } else {
                    // 选中文本
                    textarea.value = cursorFrontString + enter +
                        prefix +
                        str + enter +
                        selectedString + enter +
                        prefix +
                        cursorBackString
                }
                textarea.selectionStart = startPosition + enter.length + prefix.length + (str ? 0 : 1);
                textarea.selectionEnd = textarea.selectionStart + str.length
                break
            case 'table':
                textarea.value = cursorFrontString + enter + prefix + str + suffix + cursorBackString
                textarea.selectionEnd = textarea.selectionStart = textarea.value.length
                break
            default:
                if (startPosition === endPosition) {
                    textarea.value = cursorFrontString + prefix + str + suffix + cursorBackString
                    textarea.selectionStart = startPosition + prefix.length
                    textarea.selectionEnd = textarea.selectionStart + str.length
                } else {
                    textarea.value = cursorFrontString + prefix + selectedString + suffix + cursorBackString
                    textarea.selectionStart = startPosition + prefix.length + selectedString.length
                    textarea.selectionEnd = textarea.selectionStart
                }
        }
    } else {
        alert('Error: Browser version is too low')
    }
    // 触发change事件
    $vm.editText = textarea.value
    textarea.focus()
}

