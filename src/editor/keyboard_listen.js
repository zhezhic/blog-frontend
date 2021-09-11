/**
 * 键盘事件监听
 *
 */

export default function keydownListen($vm) {
    $vm.$el.addEventListener('keydown', function (e) {
        if (e.key === 'Meta' || e.key === 'Alt' || e.key === 'Control'||e.key==='Shift') {
            return;
        }
        let {altKey, ctrlKey, shiftKey, metaKey} = e
        if (!altKey && !shiftKey && !ctrlKey && !metaKey) {
            // once
            // console.log(`once ${e.key}`)
            switch (e.key) {
                case 'F8':
                    e.preventDefault()
                    $vm.toolbar_right_click('navigation')
                    break
                case 'F9':
                    e.preventDefault()
                    $vm.toolbar_right_click('preview')
                    break
                case 'F10':
                    e.preventDefault()
                    $vm.toolbar_right_click('fullscreen')
                    break
                case 'F12':
                    e.preventDefault()
                    $vm.toolbar_right_click('html_text')
                    break
            }
        }else if (ctrlKey && !altKey && !shiftKey && !metaKey) {
            // console.log(`ctrl+${e.key}`)
            // ctrl +
            switch (e.key) {
                case 'b': {
                    //Ctrl + B
                    e.preventDefault()
                    $vm.toolbar_left_click('bold')
                    break;
                }
                case 'i': {
                    //Ctrl + I
                    e.preventDefault()
                    $vm.toolbar_left_click('italic')
                    break;
                }

                case 'u': {
                    // Ctrl + U
                    e.preventDefault()
                    $vm.toolbar_left_click('underline')
                    break;
                }
                case 'd': {
                    //Ctrl + D
                    e.preventDefault()
                    $vm.toolbar_left_click('strikethrough')
                    break;
                }
                case 'q': {
                    //Ctrl + Q
                    e.preventDefault()
                    $vm.toolbar_left_click('quote')
                    break;
                }
                case 'l': {
                    //Ctrl + L
                    e.preventDefault()
                    $vm.toolbar_left_click('link')
                    break;
                }
                case 'z': {
                    //Ctrl + Z
                    e.preventDefault()
                    $vm.toolbar_left_click('undo')
                    break;
                }
                case 'y': {
                    //Ctrl + Y
                    e.preventDefault()
                    $vm.toolbar_left_click('redo')
                    break;
                }
                case '[': {
                    //Ctrl + [
                    e.preventDefault()
                    $vm.toolbar_left_click('ol')
                    break;
                }
                case ']': {
                    // Ctrl + ]
                    e.preventDefault()
                    $vm.toolbar_left_click('ul')
                    break;
                }
                case 'Delete': {
                    //Ctrl + delete
                    e.preventDefault()
                    $vm.toolbar_left_click('trash')
                    break;
                }
                case 'h': {
                    //Ctrl + ONE
                    e.preventDefault()
                    $vm.toolbar_left_click('header')
                    break;
                }
                case '1': {
                    //Ctrl + ONE
                    e.preventDefault()
                    $vm.toolbar_left_click('header1')
                    break;
                }
                case '2': {
                    //Ctrl + TWO
                    e.preventDefault()
                    $vm.toolbar_left_click('header2')
                    break;
                }
                case '3': {
                    //Ctrl + THREE
                    e.preventDefault()
                    $vm.toolbar_left_click('header3')
                    break;
                }
                case '4': {
                    //Ctrl + FOUR
                    e.preventDefault()
                    $vm.toolbar_left_click('header4')
                    break;
                }
                case '5': {
                    //Ctrl + FIVE
                    e.preventDefault()
                    $vm.toolbar_left_click('header5')
                    break;
                }
                case '6': {
                    //Ctrl + SIX
                    e.preventDefault()
                    $vm.toolbar_left_click('header6')
                    break;
                }
            }
        } else if ( altKey &&!ctrlKey && !shiftKey && !metaKey){
            // alt +
            // console.log(`alt+${e.key}`)
            switch (e.key) {
                case 't': {
                    // T
                    e.preventDefault()
                    $vm.toolbar_left_click('table')
                    break;
                }
            }
        }else if ( ctrlKey && altKey && !shiftKey && !metaKey){
            //ctrl + alt +
            // console.log(`ctrl+alt+${e.key}`)
            switch (e.key) {
                case 'i': {
                    e.preventDefault()
                    $vm.toolbar_left_click('image_link')
                    break;
                }
                case 'c': {
                    // C
                    e.preventDefault()
                    $vm.toolbar_left_click('code')
                    break;
                }

            }
        }
    })
}
