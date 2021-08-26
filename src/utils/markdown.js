import hljs from "highlight.js";
const markdown_config = {
    html:         true,        // 在源码中启用 HTML 标签
    xhtmlOut:     true,        // 使用 '/' 来闭合单标签 （比如 <br />）。
    // 这个选项只对完全的 CommonMark 模式兼容。
    breaks:       true,        // 转换段落里的 '\n' 到 <br>。
    langPrefix:   'language-',  // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
    linkify:      true,        // 将类似 URL 的文本自动转换为链接。

    // 启用一些语言中立的替换 + 引号美化
    typographer:  true,

    // 双 + 单引号替换对，当 typographer 启用时。
    // 或者智能引号等，可以是 String 或 Array。
    //
    // 比方说，你可以支持 '«»„“' 给俄罗斯人使用， '„“‚‘'  给德国人使用。
    // 还有 ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] 给法国人使用（包括 nbsp）。
    quotes: '“”‘’',

    // 高亮函数，会返回转义的HTML。
    // 或 '' 如果源字符串未更改，则应在外部进行转义。
    // 如果结果以 <pre ... 开头，内部包装器则会跳过。
    highlight: function (str, lang) {
        console.error("language:",lang)
        console.error("preCode",str)
        if (lang && hljs.getLanguage(lang)) {
            try {
                const preCode = '<pre class="hljs"><code>' +
                    hljs.highlight(str,{language:lang,ignoreIllegals:true}).value +
                    '</code></pre>'
                console.log(preCode)
                return preCode;
            } catch (__) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
}
const md = require('markdown-it')(markdown_config)
const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
};
// 为a标签添加 target="_blank"属性
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const hIndex = tokens[idx].attrIndex('href');
    if (tokens[idx].attrs[hIndex][1].startsWith('#')) return defaultRender(tokens, idx, options, env, self);
    // If you are sure other plugins can't add `target` - drop check below
    const aIndex = tokens[idx].attrIndex('target');

    if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']); // add new attribute
    } else {
        tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
    }
    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
}
export {
    md
}
