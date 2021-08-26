/**
 * textarea 插入内容
 */
function isExistSelectionObj(textareaDom) {
    return typeof textareaDom.selectionStart === 'number' && typeof textareaDom.selectionEnd === 'number';
}
// 处理粗体与斜体冲突问题
function judgeItalicAndBold(prefix, suffix, tmpStr, startPos, endPos) {
    if (prefix === '*' && suffix ===  '*') {
        if (tmpStr.substring(startPos - 2, startPos - 1) === '*' && tmpStr.substring(endPos + 1, endPos + 2) === '*') {
            return false
        }
    }
    return true
}
export const insertTextAtCaret = (dom, {prefix, suffix, str}, $vm) => {
    dom.focus()
    if (isExistSelectionObj(dom)) {
        const startPos = dom.selectionStart;
        const endPos = dom.selectionEnd;
        let tmpStr = dom.value;
        if (startPos === endPos) {
            dom.value = tmpStr.substring(0, startPos) + prefix + str + suffix + tmpStr.substring(endPos, tmpStr.length);
            console.log(dom.value)
            //表格不重新定位光标
            if(prefix!==''){
                dom.selectionStart = startPos + prefix.length;
                dom.selectionEnd = startPos + (str.length + prefix.length);
            }
        } else {
            // 存在选中区域
            if (tmpStr.substring(startPos - prefix.length, startPos) === prefix && tmpStr.substring(endPos, endPos + suffix.length) === suffix && judgeItalicAndBold(prefix, suffix, tmpStr, startPos, endPos)) {
                // 取消
                dom.value = tmpStr.substring(0, startPos - prefix.length) + tmpStr.substring(startPos, endPos) + tmpStr.substring(endPos + suffix.length, tmpStr.length);
                dom.selectionStart = startPos - prefix.length;
                dom.selectionEnd = endPos - prefix.length;
            } else {
                // 确定
                dom.value = tmpStr.substring(0, startPos) + prefix + tmpStr.substring(startPos, endPos) + suffix + tmpStr.substring(endPos, tmpStr.length);
                dom.selectionStart = startPos + prefix.length;
                dom.selectionEnd = startPos + (endPos - startPos + prefix.length);
            }
        }
    } else {
        alert('Error: Browser version is too low')
    }
    // 触发change事件
    $vm.editText = dom.value
    dom.focus()
}
