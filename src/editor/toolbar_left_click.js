//keyword area是否存在
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
    $vm.blog.editText = textarea.value
    textarea.focus()
}

function undo($vm) {
    if ($vm.historyIndex > 0) {
        $vm.historyIndex--
        $vm.blog.editText = $vm.historyText[$vm.historyIndex]
        window.clearTimeout($vm.inputTimeout);
    }
}

function redo($vm) {
    if ($vm.historyIndex < $vm.historyText.length - 1) {
        $vm.historyIndex++
        $vm.blog.editText = $vm.historyText[$vm.historyIndex]
        window.clearTimeout($vm.inputTimeout);
    }
}

function trash($vm) {
    if ($vm.blog.editText !== '') {
        $vm.blog.editText = ''
    }
}

function upload_image($vm) {
    let image_link = {
        prefix: `![${$vm.words.image_alt}](`,
        suffix: ')',
        str: process.env.VUE_APP_SERVER_URL+$vm.image
    }
    insertTextAtCaret(image_link,'upload_image',$vm)
}

export default function toolbar_left_click(type, $vm) {
    const param_of_insert_text = {
        'bold': {
            prefix: '**',
            suffix: '**',
            str: $vm.words.bold
        },
        'italic': {
            prefix: '*',
            suffix: '*',
            str: $vm.words.italic
        },
        'header': {
            prefix: '# ',
            suffix: '',
            str: $vm.words.header
        },
        'header1': {
            prefix: '# ',
            suffix: '',
            str: $vm.words.header1
        },
        'header2': {
            prefix: '## ',
            suffix: '',
            str: $vm.words.header2
        },
        'header3': {
            prefix: '### ',
            suffix: '',
            str: $vm.words.header3
        },
        'header4': {
            prefix: '#### ',
            suffix: '',
            str: $vm.words.header4
        },
        'header5': {
            prefix: '##### ',
            suffix: '',
            str: $vm.words.header5
        },
        'header6': {
            prefix: '###### ',
            suffix: '',
            str: $vm.words.header6
        },
        'underline': {
            prefix: '++',
            suffix: '++',
            str: $vm.words.underline
        },
        'strikethrough': {
            prefix: '~~',
            suffix: '~~',
            str: $vm.words.strikethrough
        },
        'quote': {
            prefix: '> ',
            suffix: '',
            str: $vm.words.quote
        },
        'ol': {
            prefix: '1. ',
            suffix: '2. ',
            str: ''
        },
        'ul': {
            prefix: '- ',
            suffix: '- ',
            str: ''
        },
        'link': {
            prefix: `[${$vm.words.link_text}](`,
            suffix: ')',
            str: $vm.words.link
        },
        'image_link': {
            prefix: `![${$vm.words.image_alt}](`,
            suffix: ')',
            str: $vm.words.image_link
        },

        'code': {
            prefix: "```",
            suffix: "\n```\n",
            str: "language"
        },
        'table': {
            prefix: '',
            suffix: '',
            str: '|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n'
        },

    }
    if (Object.prototype.hasOwnProperty.call(param_of_insert_text, type)) {
        insertTextAtCaret(param_of_insert_text[type], type, $vm)
        return
    }
    const other_left_click = {
        undo,
        redo,
        trash,
        upload_image,
    }
    if (Object.prototype.hasOwnProperty.call(other_left_click, type)) {
        other_left_click[type]($vm)
    }
}
