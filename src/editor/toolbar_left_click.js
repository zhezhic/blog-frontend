import {insertTextAtCaret} from "./extra_function";


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

        'table': {
            prefix: '',
            suffix: '',
            str: '|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n'
        },

    }
    if (Object.prototype.hasOwnProperty.call(param_of_insert_text, type)) {
        insertTextAtCaret(param_of_insert_text[type],type,$vm)
        return
    }
    const other_left_click = {
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
        'code': {
            prefix: "```",
            suffix: "\n```\n",
            str: "language"
        },
    }
    if (Object.prototype.hasOwnProperty.call(other_left_click, type)) {
        insertTextAtCaret(other_left_click[type],type,$vm)
    }
}
