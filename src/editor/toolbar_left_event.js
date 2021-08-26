import {insertTextAtCaret} from "./extra_function";

export default function toolbar_left_click(type, $vm){
    const param_of_insert_text = {
        'bold': {
            prefix: '**',
            suffix: '**',
            str: $vm.words.tl_bold
        },
        'italic': {
            prefix: '*',
            suffix: '*',
            str: $vm.words.tl_italic
        },
        'header': {
            prefix: '# ',
            suffix: '',
            str: $vm.words.tl_header
        },
        'header1': {
            prefix: '# ',
            suffix: '',
            str: $vm.words.tl_header_one
        },
        'header2': {
            prefix: '## ',
            suffix: '',
            str: $vm.words.tl_header_two
        },
        'header3': {
            prefix: '### ',
            suffix: '',
            str: $vm.words.tl_header_three
        },
        'header4': {
            prefix: '#### ',
            suffix: '',
            str: $vm.words.tl_header_four
        },
        'header5': {
            prefix: '##### ',
            suffix: '',
            str: $vm.words.tl_header_five
        },
        'header6': {
            prefix: '###### ',
            suffix: '',
            str: $vm.words.tl_header_six
        },
        'underline': {
            prefix: '++',
            suffix: '++',
            str: $vm.words.tl_underline
        },
        'strikethrough': {
            prefix: '~~',
            suffix: '~~',
            str: $vm.words.tl_strikethrough
        },
        'quote': {
            prefix: '> ',
            suffix: '',
            str: $vm.words.tl_quote
        },
        'link': {
            prefix: '[](',
            suffix: ')',
            str: $vm.words.tl_link
        },
        'image_link': {
            prefix: '![](',
            suffix: ')',
            str: $vm.words.tl_image
        },
        'table': {
            prefix: '',
            suffix: '',
            str: '|column1|column2|column3|\n|-|-|-|\n|content1|content2|content3|\n'
        },

    }
    if (Object.prototype.hasOwnProperty.call(param_of_insert_text,type)) {
        console.log(param_of_insert_text[type])
        insertTextAtCaret($vm.getTextareaDom(),param_of_insert_text[type],$vm)
    }
}
