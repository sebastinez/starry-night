// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/scala/vscode-scala-syntax>
// and licensed permissive.
// See <https://github.com/wooorm/starry-night> for more info.
/** @type {import('../lib/index.js').Grammar} */
const grammar = {
  extensions: ['.scala', '.kojo', '.sbt', '.sc'],
  names: ['scala'],
  patterns: [{include: '#code'}],
  repository: {
    backQuotedVariable: {match: '`[^`]+`'},
    'block-comments': {
      patterns: [
        {
          captures: {0: {name: 'punctuation.definition.comment.scala'}},
          match: '/\\*\\*/',
          name: 'comment.block.empty.scala'
        },
        {
          begin: '^\\s*(/\\*\\*)(?!/)',
          beginCaptures: {1: {name: 'punctuation.definition.comment.scala'}},
          end: '\\*/',
          endCaptures: {0: {name: 'punctuation.definition.comment.scala'}},
          name: 'comment.block.documentation.scala',
          patterns: [
            {
              captures: {
                1: {name: 'keyword.other.documentation.scaladoc.scala'},
                2: {name: 'variable.parameter.scala'}
              },
              match: '(@param)\\s+(\\S+)'
            },
            {
              captures: {
                1: {name: 'keyword.other.documentation.scaladoc.scala'},
                2: {name: 'entity.name.class'}
              },
              match: '(@(?:tparam|throws))\\s+(\\S+)'
            },
            {
              match:
                '@(return|see|note|example|constructor|usecase|author|version|since|todo|deprecated|migration|define|inheritdoc)\\b',
              name: 'keyword.other.documentation.scaladoc.scala'
            },
            {
              captures: {
                1: {name: 'punctuation.definition.documentation.link.scala'},
                2: {name: 'string.other.link.title.markdown'},
                3: {name: 'punctuation.definition.documentation.link.scala'}
              },
              match: '(\\[\\[)([^\\]]+)(\\]\\])'
            },
            {include: '#block-comments'}
          ]
        },
        {
          begin: '/\\*',
          captures: {0: {name: 'punctuation.definition.comment.scala'}},
          end: '\\*/',
          name: 'comment.block.scala',
          patterns: [{include: '#block-comments'}]
        }
      ]
    },
    'char-literal': {
      begin: "'",
      beginCaptures: {
        0: {name: 'punctuation.definition.character.begin.scala'}
      },
      end: "'|$",
      endCaptures: {0: {name: 'punctuation.definition.character.end.scala'}},
      name: 'string.quoted.other constant.character.literal.scala',
      patterns: [
        {
          match: '\\\\(?:[btnfr\\\\"\']|[0-7]{1,3}|u[0-9A-Fa-f]{4})',
          name: 'constant.character.escape.scala'
        },
        {
          match: '\\\\.',
          name: 'invalid.illegal.unrecognized-character-escape.scala'
        },
        {match: "[^']{2,}", name: 'invalid.illegal.character-literal-too-long'},
        {
          match: "(?<!')[^']",
          name: 'invalid.illegal.character-literal-too-long'
        }
      ]
    },
    code: {
      patterns: [
        {include: '#using-directive'},
        {include: '#script-header'},
        {include: '#storage-modifiers'},
        {include: '#declarations'},
        {include: '#inheritance'},
        {include: '#extension'},
        {include: '#imports'},
        {include: '#exports'},
        {include: '#comments'},
        {include: '#strings'},
        {include: '#initialization'},
        {include: '#xml-literal'},
        {include: '#keywords'},
        {include: '#using'},
        {include: '#constants'},
        {include: '#scala-symbol'},
        {include: '#singleton-type'},
        {include: '#inline'},
        {include: '#scala-quoted'},
        {include: '#char-literal'},
        {include: '#empty-parentheses'},
        {include: '#parameter-list'},
        {include: '#qualifiedClassName'},
        {include: '#backQuotedVariable'},
        {include: '#curly-braces'},
        {include: '#meta-brackets'},
        {include: '#meta-bounds'},
        {include: '#meta-colons'}
      ]
    },
    comments: {
      patterns: [
        {include: '#block-comments'},
        {
          begin: '(^[ \\t]+)?(?=//)',
          beginCaptures: {
            1: {name: 'punctuation.whitespace.comment.leading.scala'}
          },
          end: '(?!\\G)',
          patterns: [
            {
              begin: '//',
              beginCaptures: {
                0: {name: 'punctuation.definition.comment.scala'}
              },
              end: '\\n',
              name: 'comment.line.double-slash.scala'
            }
          ]
        }
      ]
    },
    constants: {
      patterns: [
        {match: '\\b(false|null|true)\\b', name: 'constant.language.scala'},
        {match: '\\b(0[xX][0-9a-fA-F_]*)\\b', name: 'constant.numeric.scala'},
        {
          match:
            '\\b(([0-9][0-9_]*(\\.[0-9][0-9_]*)?)([eE](\\+|-)?[0-9][0-9_]*)?|[0-9][0-9_]*)[LlFfDd]?\\b',
          name: 'constant.numeric.scala'
        },
        {
          match: '(\\.[0-9][0-9_]*)([eE](\\+|-)?[0-9][0-9_]*)?[LlFfDd]?\\b',
          name: 'constant.numeric.scala'
        },
        {match: '\\b(this|super)\\b', name: 'variable.language.scala'}
      ]
    },
    'curly-braces': {
      begin: '\\{',
      beginCaptures: {0: {name: 'punctuation.section.block.begin.scala'}},
      end: '\\}',
      endCaptures: {0: {name: 'punctuation.section.block.end.scala'}},
      patterns: [{include: '#code'}]
    },
    declarations: {
      patterns: [
        {
          captures: {
            1: {name: 'keyword.declaration.scala'},
            2: {name: 'entity.name.function.declaration'}
          },
          match:
            '\\b(def)\\b\\s*(?!//|/\\*)((?:(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)|`[^`]+`))?'
        },
        {
          captures: {
            1: {name: 'keyword.declaration.scala'},
            2: {name: 'entity.name.class.declaration'}
          },
          match:
            '\\b(trait)\\b\\s*(?!//|/\\*)((?:(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)|`[^`]+`))?'
        },
        {
          captures: {
            1: {name: 'keyword.declaration.scala'},
            2: {name: 'keyword.declaration.scala'},
            3: {name: 'entity.name.class.declaration'}
          },
          match:
            '\\b(?:(case)\\s+)?(class|object|enum)\\b\\s*(?!//|/\\*)((?:(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)|`[^`]+`))?'
        },
        {
          captures: {
            1: {name: 'keyword.declaration.scala'},
            2: {name: 'entity.name.type.declaration'}
          },
          match:
            '(?<!\\.)\\b(type)\\b\\s*(?!//|/\\*)((?:(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)|`[^`]+`))?'
        },
        {
          captures: {
            1: {name: 'keyword.declaration.stable.scala'},
            2: {name: 'keyword.declaration.volatile.scala'}
          },
          match:
            '\\b(?:(val)|(var))\\b\\s*(?!//|/\\*)(?=(?:(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)|`[^`]+`)?\\()'
        },
        {
          captures: {
            1: {name: 'keyword.declaration.stable.scala'},
            2: {name: 'keyword.declaration.volatile.scala'}
          },
          match:
            '\\b(?:(val)|(var))\\b\\s*(?!//|/\\*)(?:(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)|`[^`]+`)(?=\\s*,)'
        },
        {
          captures: {
            1: {name: 'keyword.declaration.stable.scala'},
            2: {name: 'keyword.declaration.volatile.scala'},
            3: {name: 'variable.other.declaration.scala'}
          },
          match:
            '\\b(?:(val)|(var))\\b\\s*(?!//|/\\*)((?:(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)|`[^`]+`))?'
        },
        {
          captures: {
            1: {name: 'keyword.other.scoping.scala'},
            2: {name: 'keyword.declaration.scala'},
            3: {name: 'entity.name.class.declaration'}
          },
          match:
            '\\b(package)\\s+(object)\\b\\s*(?!//|/\\*)((?:(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)|`[^`]+`))?'
        },
        {
          begin: '\\b(package)\\s+',
          beginCaptures: {1: {name: 'keyword.other.import.scala'}},
          end: '(?<=[\\n;])',
          name: 'meta.package.scala',
          patterns: [
            {include: '#comments'},
            {
              match:
                '(`[^`]+`|(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+))',
              name: 'entity.name.package.scala'
            },
            {match: '\\.', name: 'punctuation.definition.package'}
          ]
        },
        {
          captures: {
            1: {name: 'keyword.declaration.scala'},
            2: {name: 'entity.name.given.declaration'}
          },
          match:
            '\\b(given)\\b\\s*([_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|`[^`]+`)?'
        }
      ]
    },
    'empty-parentheses': {
      captures: {1: {name: 'meta.bracket.scala'}},
      match: '(\\(\\))',
      name: 'meta.parentheses.scala'
    },
    exports: {
      begin: '\\b(export)\\s+(given\\s+)?',
      beginCaptures: {
        1: {name: 'keyword.other.export.scala'},
        2: {name: 'keyword.other.export.given.scala'}
      },
      end: '(?<=[\\n;])',
      name: 'meta.export.scala',
      patterns: [
        {include: '#comments'},
        {
          match:
            '(`[^`]+`|(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+))',
          name: 'entity.name.export.scala'
        },
        {match: '\\.', name: 'punctuation.definition.export'},
        {
          begin: '{',
          beginCaptures: {0: {name: 'meta.bracket.scala'}},
          end: '}',
          endCaptures: {0: {name: 'meta.bracket.scala'}},
          name: 'meta.export.selector.scala',
          patterns: [
            {
              captures: {
                1: {name: 'entity.name.export.renamed-from.scala'},
                2: {name: 'keyword.other.arrow.scala'},
                3: {name: 'entity.name.export.renamed-to.scala'}
              },
              match:
                '(?x)\\s*(`[^`]+`|(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+))\\s*(=>)\\s*(`[^`]+`|(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+))\\s*'
            },
            {match: '([^\\s.,}]+)', name: 'entity.name.export.scala'}
          ]
        }
      ]
    },
    extension: {
      patterns: [
        {
          captures: {1: {name: 'keyword.declaration.scala'}},
          match: '^\\s*(extension)\\s+(?=[\\[\\(])'
        }
      ]
    },
    imports: {
      begin: '\\b(import)\\s+',
      beginCaptures: {1: {name: 'keyword.other.import.scala'}},
      end: '(?<=[\\n;])',
      name: 'meta.import.scala',
      patterns: [
        {include: '#comments'},
        {match: '\\b(given)\\b', name: 'keyword.other.import.given.scala'},
        {
          match:
            '[A-Z\\p{Lt}\\p{Lu}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?',
          name: 'entity.name.class.import.scala'
        },
        {
          match:
            '(`[^`]+`|(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+))',
          name: 'entity.name.import.scala'
        },
        {match: '\\.', name: 'punctuation.definition.import'},
        {
          begin: '{',
          beginCaptures: {0: {name: 'meta.bracket.scala'}},
          end: '}',
          endCaptures: {0: {name: 'meta.bracket.scala'}},
          name: 'meta.import.selector.scala',
          patterns: [
            {
              captures: {
                1: {name: 'keyword.other.import.given.scala'},
                2: {name: 'entity.name.class.import.renamed-from.scala'},
                3: {name: 'entity.name.import.renamed-from.scala'},
                4: {name: 'keyword.other.arrow.scala'},
                5: {name: 'entity.name.class.import.renamed-to.scala'},
                6: {name: 'entity.name.import.renamed-to.scala'}
              },
              match:
                '(?x)(given\\s)?\\s*(?:([A-Z\\p{Lt}\\p{Lu}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?)|(`[^`]+`|(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)))\\s*(=>)\\s*(?:([A-Z\\p{Lt}\\p{Lu}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?)|(`[^`]+`|(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)))\\s*'
            },
            {match: '\\b(given)\\b', name: 'keyword.other.import.given.scala'},
            {
              captures: {
                1: {name: 'keyword.other.import.given.scala'},
                2: {name: 'entity.name.class.import.scala'},
                3: {name: 'entity.name.import.scala'}
              },
              match:
                '(given\\s+)?(?:([A-Z\\p{Lt}\\p{Lu}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?)|(`[^`]+`|(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)))'
            }
          ]
        }
      ]
    },
    inheritance: {
      patterns: [
        {
          captures: {
            1: {name: 'keyword.declaration.scala'},
            2: {name: 'entity.name.class'}
          },
          match:
            '\\b(extends|with|derives)\\b\\s*([A-Z\\p{Lt}\\p{Lu}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|`[^`]+`|(?=\\([^\\)]+=>)|(?=(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+))|(?="))?'
        }
      ]
    },
    initialization: {
      captures: {1: {name: 'keyword.declaration.scala'}},
      match: '\\b(new)\\b'
    },
    inline: {
      patterns: [
        {
          match:
            '\\b(inline)(?=\\s+((?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)|`[^`]+`)\\s*:)',
          name: 'storage.modifier.other'
        },
        {
          match:
            '\\b(inline)\\b(?=(?:.(?!\\b(?:val|def|given)\\b))*\\b(if|match)\\b)',
          name: 'keyword.control.flow.scala'
        }
      ]
    },
    keywords: {
      patterns: [
        {
          match: '\\b(return|throw)\\b',
          name: 'keyword.control.flow.jump.scala'
        },
        {
          match: '\\b(classOf|isInstanceOf|asInstanceOf)\\b',
          name: 'support.function.type-of.scala'
        },
        {
          match: '\\b(else|if|then|do|while|for|yield|match|case)\\b',
          name: 'keyword.control.flow.scala'
        },
        {
          match:
            '^\\s*(end)\\s+(if|while|for|match)(?=\\s*(//.*|/\\*(?!.*\\*/\\s*\\S.*).*)?$)',
          name: 'keyword.control.flow.end.scala'
        },
        {
          match:
            '^\\s*(end)\\s+(val)(?=\\s*(//.*|/\\*(?!.*\\*/\\s*\\S.*).*)?$)',
          name: 'keyword.declaration.stable.end.scala'
        },
        {
          match:
            '^\\s*(end)\\s+(var)(?=\\s*(//.*|/\\*(?!.*\\*/\\s*\\S.*).*)?$)',
          name: 'keyword.declaration.volatile.end.scala'
        },
        {
          captures: {
            1: {name: 'keyword.declaration.end.scala'},
            2: {name: 'keyword.declaration.end.scala'},
            3: {name: 'entity.name.type.declaration'}
          },
          match:
            '^\\s*(end)\\s+(?:(new|extension)|([A-Z\\p{Lt}\\p{Lu}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?))(?=\\s*(//.*|/\\*(?!.*\\*/\\s*\\S.*).*)?$)'
        },
        {
          match: '\\b(catch|finally|try)\\b',
          name: 'keyword.control.exception.scala'
        },
        {
          match:
            '^\\s*(end)\\s+(try)(?=\\s*(//.*|/\\*(?!.*\\*/\\s*\\S.*).*)?$)',
          name: 'keyword.control.exception.end.scala'
        },
        {
          captures: {
            1: {name: 'keyword.declaration.end.scala'},
            2: {name: 'entity.name.declaration'}
          },
          match:
            '^\\s*(end)\\s+(`[^`]+`|(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+))?(?=\\s*(//.*|/\\*(?!.*\\*/\\s*\\S.*).*)?$)'
        },
        {
          match: '(==?|!=|<=|>=|<>|<|>)',
          name: 'keyword.operator.comparison.scala'
        },
        {
          match: '(\\-|\\+|\\*|/(?![/*])|%|~)',
          name: 'keyword.operator.arithmetic.scala'
        },
        {
          match:
            '(?<![!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]|_)(!|&&|\\|\\|)(?![!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}])',
          name: 'keyword.operator.logical.scala'
        },
        {
          match: '(<-|←|->|→|=>|⇒|\\?|\\:+|@|\\|)+',
          name: 'keyword.operator.scala'
        }
      ]
    },
    'meta-bounds': {match: '<%|=:=|<:<|<%<|>:|<:', name: 'meta.bounds.scala'},
    'meta-brackets': {
      patterns: [
        {match: '\\{', name: 'punctuation.section.block.begin.scala'},
        {match: '\\}', name: 'punctuation.section.block.end.scala'},
        {match: '{|}|\\(|\\)|\\[|\\]', name: 'meta.bracket.scala'}
      ]
    },
    'meta-colons': {
      patterns: [{match: '(?<!:):(?!:)', name: 'meta.colon.scala'}]
    },
    'parameter-list': {
      patterns: [
        {
          captures: {
            1: {name: 'variable.parameter.scala'},
            2: {name: 'meta.colon.scala'}
          },
          match:
            '(?<=[^\\._$a-zA-Z0-9])(`[^`]+`|[_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?)\\s*(:)\\s+'
        }
      ]
    },
    qualifiedClassName: {
      captures: {1: {name: 'entity.name.class'}},
      match:
        '(\\b([A-Z][\\w]*)(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?)'
    },
    'scala-quoted': {
      patterns: [
        {match: "['$]\\{(?!')", name: 'punctuation.section.block.begin.scala'},
        {match: "'\\[(?!')", name: 'meta.bracket.scala'}
      ]
    },
    'scala-symbol': {
      match:
        "(?>'(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+))(?!')",
      name: 'constant.other.symbol.scala'
    },
    'script-header': {
      captures: {1: {name: 'string.unquoted.shebang.scala'}},
      match: '^#!(.*)$',
      name: 'comment.block.shebang.scala'
    },
    'singleton-type': {
      captures: {1: {name: 'keyword.type.scala'}},
      match:
        '\\.(type)(?![A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[0-9])'
    },
    'storage-modifiers': {
      patterns: [
        {
          match:
            '\\b(private\\[\\S+\\]|protected\\[\\S+\\]|private|protected)\\b',
          name: 'storage.modifier.access'
        },
        {
          match:
            '\\b(synchronized|@volatile|abstract|final|lazy|sealed|implicit|override|@transient|@native)\\b',
          name: 'storage.modifier.other'
        },
        {
          match:
            '(?<=^|\\s)\\b(transparent|opaque|infix|open|inline)\\b(?=[a-z\\s]*\\b(def|val|var|given|type|class|trait|object|enum)\\b)',
          name: 'storage.modifier.other'
        }
      ]
    },
    'string-interpolation': {
      patterns: [
        {
          match: '\\$\\$',
          name: 'constant.character.escape.interpolation.scala'
        },
        {
          captures: {
            1: {name: 'punctuation.definition.template-expression.begin.scala'}
          },
          match:
            '(\\$)([A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\p{Lo}\\p{Nl}\\p{Ll}0-9]*)',
          name: 'meta.template.expression.scala'
        },
        {
          begin: '\\$\\{',
          beginCaptures: {
            0: {name: 'punctuation.definition.template-expression.begin.scala'}
          },
          contentName: 'meta.embedded.line.scala',
          end: '\\}',
          endCaptures: {
            0: {name: 'punctuation.definition.template-expression.end.scala'}
          },
          name: 'meta.template.expression.scala',
          patterns: [{include: '#code'}]
        }
      ]
    },
    strings: {
      patterns: [
        {
          begin: '"""',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.scala'}
          },
          end: '"""(?!")',
          endCaptures: {0: {name: 'punctuation.definition.string.end.scala'}},
          name: 'string.quoted.triple.scala',
          patterns: [
            {
              match: '\\\\\\\\|\\\\u[0-9A-Fa-f]{4}',
              name: 'constant.character.escape.scala'
            }
          ]
        },
        {
          begin: '\\b(raw)(""")',
          beginCaptures: {
            1: {name: 'keyword.interpolation.scala'},
            2: {
              name: 'string.quoted.triple.interpolated.scala punctuation.definition.string.begin.scala'
            }
          },
          end: '(""")(?!")|\\$\n|(\\$[^\\$"_{A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}])',
          endCaptures: {
            1: {
              name: 'string.quoted.triple.interpolated.scala punctuation.definition.string.end.scala'
            },
            2: {name: 'invalid.illegal.unrecognized-string-escape.scala'}
          },
          patterns: [
            {match: '\\$[\\$"]', name: 'constant.character.escape.scala'},
            {include: '#string-interpolation'},
            {match: '.', name: 'string.quoted.triple.interpolated.scala'}
          ]
        },
        {
          begin:
            '\\b((?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?))(""")',
          beginCaptures: {
            1: {name: 'keyword.interpolation.scala'},
            2: {
              name: 'string.quoted.triple.interpolated.scala punctuation.definition.string.begin.scala'
            }
          },
          end: '(""")(?!")|\\$\n|(\\$[^\\$"_{A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}])',
          endCaptures: {
            1: {
              name: 'string.quoted.triple.interpolated.scala punctuation.definition.string.end.scala'
            },
            2: {name: 'invalid.illegal.unrecognized-string-escape.scala'}
          },
          patterns: [
            {include: '#string-interpolation'},
            {
              match: '\\\\\\\\|\\\\u[0-9A-Fa-f]{4}',
              name: 'constant.character.escape.scala'
            },
            {match: '.', name: 'string.quoted.triple.interpolated.scala'}
          ]
        },
        {
          begin: '"',
          beginCaptures: {
            0: {name: 'punctuation.definition.string.begin.scala'}
          },
          end: '"',
          endCaptures: {0: {name: 'punctuation.definition.string.end.scala'}},
          name: 'string.quoted.double.scala',
          patterns: [
            {
              match: '\\\\(?:[btnfr\\\\"\']|[0-7]{1,3}|u[0-9A-Fa-f]{4})',
              name: 'constant.character.escape.scala'
            },
            {
              match: '\\\\.',
              name: 'invalid.illegal.unrecognized-string-escape.scala'
            }
          ]
        },
        {
          begin: '\\b(raw)(")',
          beginCaptures: {
            1: {name: 'keyword.interpolation.scala'},
            2: {
              name: 'string.quoted.double.interpolated.scala punctuation.definition.string.begin.scala'
            }
          },
          end: '(")|\\$\n|(\\$[^\\$"_{A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}])',
          endCaptures: {
            1: {
              name: 'string.quoted.double.interpolated.scala punctuation.definition.string.end.scala'
            },
            2: {name: 'invalid.illegal.unrecognized-string-escape.scala'}
          },
          patterns: [
            {match: '\\$[\\$"]', name: 'constant.character.escape.scala'},
            {include: '#string-interpolation'},
            {match: '.', name: 'string.quoted.double.interpolated.scala'}
          ]
        },
        {
          begin:
            '\\b((?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?))(")',
          beginCaptures: {
            1: {name: 'keyword.interpolation.scala'},
            2: {
              name: 'string.quoted.double.interpolated.scala punctuation.definition.string.begin.scala'
            }
          },
          end: '(")|\\$\n|(\\$[^\\$"_{A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}])',
          endCaptures: {
            1: {
              name: 'string.quoted.double.interpolated.scala punctuation.definition.string.end.scala'
            },
            2: {name: 'invalid.illegal.unrecognized-string-escape.scala'}
          },
          patterns: [
            {match: '\\$[\\$"]', name: 'constant.character.escape.scala'},
            {include: '#string-interpolation'},
            {
              match: '\\\\(?:[btnfr\\\\"\']|[0-7]{1,3}|u[0-9A-Fa-f]{4})',
              name: 'constant.character.escape.scala'
            },
            {
              match: '\\\\.',
              name: 'invalid.illegal.unrecognized-string-escape.scala'
            },
            {match: '.', name: 'string.quoted.double.interpolated.scala'}
          ]
        }
      ]
    },
    using: {
      patterns: [
        {
          captures: {1: {name: 'keyword.declaration.scala'}},
          match: '(?<=\\()\\s*(using)\\s'
        }
      ]
    },
    'using-directive': {
      begin: '^\\s*(//>)\\s*(using)[^\\S\\n]+',
      beginCaptures: {
        1: {name: 'punctuation.definition.comment.scala'},
        2: {name: 'keyword.other.import.scala'}
      },
      end: '\\n',
      name: 'comment.line.shebang.scala',
      patterns: [
        {
          match:
            '[A-Z\\p{Lt}\\p{Lu}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|`[^`]+`|(?:[A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}][A-Z\\p{Lt}\\p{Lu}_a-z\\$\\p{Lo}\\p{Nl}\\p{Ll}0-9]*(?:(?<=_)[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)?|[!#%&*+\\-\\/:<>=?@^|~\\p{Sm}\\p{So}]+)',
          name: 'entity.name.import.scala'
        },
        {match: '\\.', name: 'punctuation.definition.import'},
        {include: '#strings'},
        {include: '#constants'}
      ]
    },
    'xml-doublequotedString': {
      begin: '"',
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.xml'}},
      end: '"',
      endCaptures: {0: {name: 'punctuation.definition.string.end.xml'}},
      name: 'string.quoted.double.xml',
      patterns: [{include: '#xml-entity'}]
    },
    'xml-embedded-content': {
      patterns: [
        {
          begin: '{',
          captures: {0: {name: 'meta.bracket.scala'}},
          end: '}',
          name: 'meta.source.embedded.scala',
          patterns: [{include: '#code'}]
        },
        {
          captures: {
            1: {name: 'entity.other.attribute-name.namespace.xml'},
            2: {name: 'entity.other.attribute-name.xml'},
            3: {name: 'punctuation.separator.namespace.xml'},
            4: {name: 'entity.other.attribute-name.localname.xml'}
          },
          match: ' (?:([-_a-zA-Z0-9]+)((:)))?([_a-zA-Z-]+)='
        },
        {include: '#xml-doublequotedString'},
        {include: '#xml-singlequotedString'}
      ]
    },
    'xml-entity': {
      captures: {
        1: {name: 'punctuation.definition.constant.xml'},
        3: {name: 'punctuation.definition.constant.xml'}
      },
      match: '(&)([:a-zA-Z_][:a-zA-Z0-9_.-]*|#[0-9]+|#x[0-9a-fA-F]+)(;)',
      name: 'constant.character.entity.xml'
    },
    'xml-literal': {
      patterns: [
        {
          begin:
            '(<)((?:([_a-zA-Z0-9][_a-zA-Z0-9]*)((:)))?([_a-zA-Z0-9][-_a-zA-Z0-9:]*))(?=(\\s[^>]*)?></\\2>)',
          beginCaptures: {
            1: {name: 'punctuation.definition.tag.xml'},
            3: {name: 'entity.name.tag.namespace.xml'},
            4: {name: 'entity.name.tag.xml'},
            5: {name: 'punctuation.separator.namespace.xml'},
            6: {name: 'entity.name.tag.localname.xml'}
          },
          end: '(>(<))/(?:([-_a-zA-Z0-9]+)((:)))?([-_a-zA-Z0-9:]*[_a-zA-Z0-9])(>)',
          endCaptures: {
            1: {name: 'punctuation.definition.tag.xml'},
            2: {name: 'meta.scope.between-tag-pair.xml'},
            3: {name: 'entity.name.tag.namespace.xml'},
            4: {name: 'entity.name.tag.xml'},
            5: {name: 'punctuation.separator.namespace.xml'},
            6: {name: 'entity.name.tag.localname.xml'},
            7: {name: 'punctuation.definition.tag.xml'}
          },
          name: 'meta.tag.no-content.xml',
          patterns: [{include: '#xml-embedded-content'}]
        },
        {
          begin:
            '(</?)(?:([_a-zA-Z0-9][-_a-zA-Z0-9]*)((:)))?([_a-zA-Z0-9][-_a-zA-Z0-9:]*)(?=[^>]*?>)',
          captures: {
            1: {name: 'punctuation.definition.tag.xml'},
            2: {name: 'entity.name.tag.namespace.xml'},
            3: {name: 'entity.name.tag.xml'},
            4: {name: 'punctuation.separator.namespace.xml'},
            5: {name: 'entity.name.tag.localname.xml'}
          },
          end: '(/?>)',
          name: 'meta.tag.xml',
          patterns: [{include: '#xml-embedded-content'}]
        },
        {include: '#xml-entity'}
      ]
    },
    'xml-singlequotedString': {
      begin: "'",
      beginCaptures: {0: {name: 'punctuation.definition.string.begin.xml'}},
      end: "'",
      endCaptures: {0: {name: 'punctuation.definition.string.end.xml'}},
      name: 'string.quoted.single.xml',
      patterns: [{include: '#xml-entity'}]
    }
  },
  scopeName: 'source.scala'
}

export default grammar
