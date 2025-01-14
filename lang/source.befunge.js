// This is a TextMate grammar distributed by `starry-night`.
// This grammar is licensed `mit`.
// See <https://github.com/wooorm/starry-night> for more info.
/** @type {import('../lib/index.js').Grammar} */
const grammar = {
  extensions: ['.befunge', '.bf'],
  names: ['befunge'],
  patterns: [
    {match: '[0-9]', name: 'constant.numberic.bf'},
    {match: '[+\\-*/%!`]', name: 'storage.type.bf'},
    {match: '[#<>^v?|_@]', name: 'storage.type.bf'},
    {match: '[:$"]', name: 'stack.bf'},
    {match: '[.,&~]', name: 'function.io.bf'},
    {match: '[pg]', name: 'storage.type.bf'},
    {match: '"(.*?)"', name: 'comment.block.bf'}
  ],
  scopeName: 'source.befunge'
}

export default grammar
