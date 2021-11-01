import hljs from 'highlight.js'
import insert from 'markdown-it-ins'
import anchor from "markdown-it-anchor";
import toc from 'markdown-it-toc-done-right'

const markdown_config = {
    html: false,        // 在源码中启用 HTML 标签
    xhtmlOut: true,        // 使用 '/' 来闭合单标签 （比如 <br />）。
    // 这个选项只对完全的 CommonMark 模式兼容。
    breaks: true,        // 转换段落里的 '\n' 到 <br>。
    langPrefix: 'language-',  // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
    linkify: true,        // 将类似 URL 的文本自动转换为链接。

    // 启用一些语言中立的替换 + 引号美化
    typographer: true,
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
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(str, {language: lang, ignoreIllegals: true}).value +
                    '</code></pre>'
            } catch (__) {
            }
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
}
const md = require('markdown-it')(markdown_config)

// 如果覆盖，或者是对默认渲染器的代理，则记住老的渲染器。
let linkRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
};
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // 如果你确认其他的插件不能添加 `target` - 放弃以下检查：
    let aIndex = tokens[idx].attrIndex('target');

    if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']); // 添加新属性
    } else {
        tokens[idx].attrs[aIndex][1] = '_blank';    // 替换已经存在的属性值
    }
    // 传递 token 到默认的渲染器。
    return linkRender(tokens, idx, options, env, self);
};
let imgRender = md.renderer.rules.image || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
};
md.renderer.rules.image = function (tokens, idx, options, env, self) {
    tokens[idx].attrPush(['id', 'blog-img'])
    // 传递 token 给默认的渲染器
    return imgRender(tokens, idx, options, env, self);
};
md.use(insert)// 引入下划线插件
    .use(anchor, {permalink: anchor.permalink.headerLink(), permalinkBefore: true, permalinkSymbol: '#'}) //生成标题锚点
    .use(toc);//${toc}自动生成标题导航列表
export {
    md,
}
// module.exports = function(src) {
//     const html = md.render(src)
//     return (
//         `<template>\n` +
//         `<div class="markdown">${html}</div>\n` +
//         `</template>\n`
//     )
// }
