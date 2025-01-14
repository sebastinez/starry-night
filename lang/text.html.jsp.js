// This is a TextMate grammar distributed by `starry-night`.
// This grammar is developed at
// <https://github.com/textmate/java.tmbundle>
// and licensed permissive.
// See <https://github.com/wooorm/starry-night> for more info.
/** @type {import('../lib/index.js').Grammar} */
const grammar = {
  extensions: ['.gsp', '.jsp', '.tag'],
  injections: {
    'text.html.jsp - (meta.embedded.block.jsp | meta.embedded.line.jsp | meta.tag | comment), meta.tag string.quoted':
      {
        patterns: [
          {include: '#comment'},
          {include: '#declaration'},
          {include: '#expression'},
          {include: '#el_expression'},
          {include: '#tags'},
          {
            begin: '(^\\s*)(?=<%(?=\\s))',
            beginCaptures: {
              0: {name: 'punctuation.whitespace.embedded.leading.erb'}
            },
            end: '(?!\\G)(\\s*$\\n)?',
            endCaptures: {
              0: {name: 'punctuation.whitespace.embedded.trailing.erb'}
            },
            patterns: [{include: '#scriptlet'}]
          },
          {include: '#scriptlet'}
        ]
      }
  },
  names: [
    'groovy-server-pages',
    'gsp',
    'java-server-page',
    'java-server-pages',
    'jsp'
  ],
  patterns: [{include: '#xml_tags'}, {include: 'text.html.basic'}],
  repository: {
    comment: {
      begin: '<%--',
      captures: {0: {name: 'punctuation.definition.comment.jsp'}},
      end: '--%>',
      name: 'comment.block.jsp'
    },
    declaration: {
      begin: '<%!',
      beginCaptures: {0: {name: 'punctuation.section.embedded.begin.jsp'}},
      contentName: 'source.java',
      end: '(%)>',
      endCaptures: {
        0: {name: 'punctuation.section.embedded.end.jsp'},
        1: {name: 'source.java'}
      },
      name: 'meta.embedded.line.declaration.jsp',
      patterns: [{include: 'source.java'}]
    },
    el_expression: {
      begin: '\\$\\{',
      beginCaptures: {0: {name: 'punctuation.section.embedded.begin.jsp'}},
      contentName: 'source.java',
      end: '(\\})',
      endCaptures: {
        0: {name: 'punctuation.section.embedded.end.jsp'},
        1: {name: 'source.java'}
      },
      name: 'meta.embedded.line.el_expression.jsp',
      patterns: [{include: 'source.java'}]
    },
    expression: {
      begin: '<%=',
      beginCaptures: {0: {name: 'punctuation.section.embedded.begin.jsp'}},
      contentName: 'source.java',
      end: '(%)>',
      endCaptures: {
        0: {name: 'punctuation.section.embedded.end.jsp'},
        1: {name: 'source.java'}
      },
      name: 'meta.embedded.line.expression.jsp',
      patterns: [{include: 'source.java'}]
    },
    scriptlet: {
      begin: '<%',
      beginCaptures: {0: {name: 'punctuation.section.embedded.begin.jsp'}},
      contentName: 'source.java',
      end: '(%)>',
      endCaptures: {
        0: {name: 'punctuation.section.embedded.end.jsp'},
        1: {name: 'source.java'}
      },
      name: 'meta.embedded.block.scriptlet.jsp',
      patterns: [
        {match: '\\{', name: 'punctuation.section.scope.begin.java'},
        {match: '\\}', name: 'punctuation.section.scope.end.java'},
        {include: 'source.java'}
      ]
    },
    tags: {
      begin: '(<%@)\\s*(?=(attribute|include|page|tag|taglib|variable)\\s)',
      beginCaptures: {1: {name: 'punctuation.definition.tag.begin.jsp'}},
      end: '%>',
      endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
      name: 'meta.tag.template.include.jsp',
      patterns: [
        {
          begin: '\\G(attribute)(?=\\s)',
          captures: {1: {name: 'keyword.control.attribute.jsp'}},
          end: '(?=%>)',
          patterns: [
            {
              captures: {
                1: {name: 'entity.other.attribute-name.jsp'},
                2: {name: 'punctuation.separator.key-value.jsp'},
                3: {name: 'string.quoted.double.jsp'},
                4: {name: 'punctuation.definition.string.begin.jsp'},
                5: {name: 'punctuation.definition.string.end.jsp'}
              },
              match:
                '(name|required|fragment|rtexprvalue|type|description)(=)((")[^"]*("))'
            }
          ]
        },
        {
          begin: '\\G(include)(?=\\s)',
          captures: {1: {name: 'keyword.control.include.jsp'}},
          end: '(?=%>)',
          patterns: [
            {
              captures: {
                1: {name: 'entity.other.attribute-name.jsp'},
                2: {name: 'punctuation.separator.key-value.jsp'},
                3: {name: 'string.quoted.double.jsp'},
                4: {name: 'punctuation.definition.string.begin.jsp'},
                5: {name: 'punctuation.definition.string.end.jsp'}
              },
              match: '(file)(=)((")[^"]*("))'
            }
          ]
        },
        {
          begin: '\\G(page)(?=\\s)',
          captures: {1: {name: 'keyword.control.page.jsp'}},
          end: '(?=%>)',
          patterns: [
            {
              captures: {
                1: {name: 'entity.other.attribute-name.jsp'},
                2: {name: 'punctuation.separator.key-value.jsp'},
                3: {name: 'string.quoted.double.jsp'},
                4: {name: 'punctuation.definition.string.begin.jsp'},
                5: {name: 'punctuation.definition.string.end.jsp'}
              },
              match:
                '(language|extends|import|session|buffer|autoFlush|isThreadSafe|info|errorPage|isErrorPage|contentType|pageEncoding|isElIgnored)(=)((")[^"]*("))'
            }
          ]
        },
        {
          begin: '\\G(tag)(?=\\s)',
          captures: {1: {name: 'keyword.control.tag.jsp'}},
          end: '(?=%>)',
          patterns: [
            {
              captures: {
                1: {name: 'entity.other.attribute-name.jsp'},
                2: {name: 'punctuation.separator.key-value.jsp'},
                3: {name: 'string.quoted.double.jsp'},
                4: {name: 'punctuation.definition.string.begin.jsp'},
                5: {name: 'punctuation.definition.string.end.jsp'}
              },
              match:
                '(display-name|body-content|dynamic-attributes|small-icon|large-icon|description|example|language|import|pageEncoding|isELIgnored)(=)((")[^"]*("))'
            }
          ]
        },
        {
          begin: '\\G(taglib)(?=\\s)',
          captures: {1: {name: 'keyword.control.taglib.jsp'}},
          end: '(?=%>)',
          patterns: [
            {
              captures: {
                1: {name: 'entity.other.attribute-name.jsp'},
                2: {name: 'punctuation.separator.key-value.jsp'},
                3: {name: 'string.quoted.double.jsp'},
                4: {name: 'punctuation.definition.string.begin.jsp'},
                5: {name: 'punctuation.definition.string.end.jsp'}
              },
              match: '(uri|tagdir|prefix)(=)((")[^"]*("))'
            }
          ]
        },
        {
          begin: '\\G(variable)(?=\\s)',
          captures: {1: {name: 'keyword.control.variable.jsp'}},
          end: '(?=%>)',
          patterns: [
            {
              captures: {
                1: {name: 'entity.other.attribute-name.jsp'},
                2: {name: 'punctuation.separator.key-value.jsp'},
                3: {name: 'string.quoted.double.jsp'},
                4: {name: 'punctuation.definition.string.begin.jsp'},
                5: {name: 'punctuation.definition.string.end.jsp'}
              },
              match:
                '(name-given|alias|variable-class|declare|scope|description)(=)((")[^"]*("))'
            }
          ]
        }
      ]
    },
    xml_tags: {
      patterns: [
        {
          begin: '(^\\s*)(?=<jsp:(declaration|expression|scriptlet)>)',
          beginCaptures: {
            0: {name: 'punctuation.whitespace.embedded.leading.erb'}
          },
          end: '(?!\\G)(\\s*$\\n)?',
          endCaptures: {
            0: {name: 'punctuation.whitespace.embedded.trailing.erb'}
          },
          patterns: [{include: '#embedded'}]
        },
        {include: '#embedded'},
        {include: '#directive'},
        {include: '#actions'}
      ],
      repository: {
        actions: {
          patterns: [
            {
              begin: '(</?)(jsp:attribute)\\b',
              beginCaptures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'}
              },
              end: '>',
              endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
              name: 'meta.tag.template.attribute.jsp',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match: '(name|trim)(=)((")[^"]*("))'
                }
              ]
            },
            {
              captures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'},
                3: {name: 'punctuation.definition.tag.end.jsp'}
              },
              match: '(</?)(jsp:body)(>)',
              name: 'meta.tag.template.body.jsp'
            },
            {
              begin: '(</?)(jsp:element)\\b',
              beginCaptures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'}
              },
              end: '>',
              endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
              name: 'meta.tag.template.element.jsp',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match: '(name)(=)((")[^"]*("))'
                }
              ]
            },
            {
              begin: '(<)(jsp:doBody)\\b',
              beginCaptures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'}
              },
              end: '/>',
              endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
              name: 'meta.tag.template.dobody.jsp',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match: '(var|varReader|scope)(=)((")[^"]*("))'
                }
              ]
            },
            {
              begin: '(</?)(jsp:forward)\\b',
              beginCaptures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'}
              },
              end: '/?>',
              endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
              name: 'meta.tag.template.forward.jsp',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match: '(page)(=)((")[^"]*("))'
                }
              ]
            },
            {
              begin: '(<)(jsp:param)\\b',
              beginCaptures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'}
              },
              end: '/>',
              endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
              name: 'meta.tag.template.param.jsp',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match: '(name|value)(=)((")[^"]*("))'
                }
              ]
            },
            {
              begin: '(<)(jsp:getProperty)\\b',
              beginCaptures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'}
              },
              end: '/>',
              endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
              name: 'meta.tag.template.getproperty.jsp',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match: '(name|property)(=)((")[^"]*("))'
                }
              ]
            },
            {
              begin: '(</?)(jsp:include)\\b',
              beginCaptures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'}
              },
              end: '/?>',
              endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
              name: 'meta.tag.template.include.jsp',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match: '(page|flush)(=)((")[^"]*("))'
                }
              ]
            },
            {
              begin: '(<)(jsp:invoke)\\b',
              beginCaptures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'}
              },
              end: '/>',
              endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
              name: 'meta.tag.template.invoke.jsp',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match: '(fragment|var|varReader|scope)(=)((")[^"]*("))'
                }
              ]
            },
            {
              begin: '(<)(jsp:output)\\b',
              beginCaptures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'}
              },
              end: '/>',
              endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
              name: 'meta.tag.template.output.jsp',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match:
                    '(omit-xml-declaration|doctype-root-element|doctype-system|doctype-public)(=)((")[^"]*("))'
                }
              ]
            },
            {
              begin: '(</?)(jsp:plugin)\\b',
              beginCaptures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'}
              },
              end: '>',
              endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
              name: 'meta.tag.template.plugin.jsp',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match:
                    '(type|code|codebase|name|archive|align|height|hspace|jreversion|nspluginurl|iepluginurl)(=)((")[^"]*("))'
                }
              ]
            },
            {
              captures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'},
                3: {name: 'punctuation.definition.tag.end.jsp'}
              },
              end: '>',
              match: '(</?)(jsp:fallback)(>)',
              name: 'meta.tag.template.fallback.jsp'
            },
            {
              begin: '(</?)(jsp:root)\\b',
              beginCaptures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'}
              },
              end: '>',
              endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
              name: 'meta.tag.template.root.jsp',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match: '(xmlns|version|xmlns:taglibPrefix)(=)((")[^"]*("))'
                }
              ]
            },
            {
              begin: '(<)(jsp:setProperty)\\b',
              beginCaptures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'}
              },
              end: '/>',
              endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
              name: 'meta.tag.template.setproperty.jsp',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match: '(name|property|value)(=)((")[^"]*("))'
                }
              ]
            },
            {
              captures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'},
                3: {name: 'punctuation.definition.tag.end.jsp'}
              },
              end: '>',
              match: '(</?)(jsp:text)(>)',
              name: 'meta.tag.template.text.jsp'
            },
            {
              begin: '(</?)(jsp:useBean)\\b',
              beginCaptures: {
                1: {name: 'punctuation.definition.tag.begin.jsp'},
                2: {name: 'entity.name.tag.jsp'}
              },
              end: '/?>',
              endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
              name: 'meta.tag.template.usebean.jsp',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match: '(id|scope|class|type|beanName)(=)((")[^"]*("))'
                }
              ]
            }
          ]
        },
        directive: {
          begin:
            '(<)(jsp:directive\\.(?=(attribute|include|page|tag|variable)\\s))',
          beginCaptures: {
            1: {name: 'punctuation.definition.tag.begin.jsp'},
            2: {name: 'entity.name.tag.jsp'}
          },
          end: '/>',
          endCaptures: {0: {name: 'punctuation.definition.tag.end.jsp'}},
          name: 'meta.tag.template.$3.jsp',
          patterns: [
            {
              begin: '\\G(attribute)(?=\\s)',
              captures: {1: {name: 'entity.name.tag.jsp'}},
              end: '(?=/>)',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match:
                    '(name|required|fragment|rtexprvalue|type|description)(=)((")[^"]*("))'
                }
              ]
            },
            {
              begin: '\\G(include)(?=\\s)',
              captures: {1: {name: 'entity.name.tag.jsp'}},
              end: '(?=/>)',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match: '(file)(=)((")[^"]*("))'
                }
              ]
            },
            {
              begin: '\\G(page)(?=\\s)',
              captures: {1: {name: 'entity.name.tag.jsp'}},
              end: '(?=/>)',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match:
                    '(language|extends|import|session|buffer|autoFlush|isThreadSafe|info|errorPage|isErrorPage|contentType|pageEncoding|isElIgnored)(=)((")[^"]*("))'
                }
              ]
            },
            {
              begin: '\\G(tag)(?=\\s)',
              captures: {1: {name: 'entity.name.tag.jsp'}},
              end: '(?=/>)',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match:
                    '(display-name|body-content|dynamic-attributes|small-icon|large-icon|description|example|language|import|pageEncoding|isELIgnored)(=)((")[^"]*("))'
                }
              ]
            },
            {
              begin: '\\G(variable)(?=\\s)',
              captures: {1: {name: 'entity.name.tag.jsp'}},
              end: '(?=/>)',
              patterns: [
                {
                  captures: {
                    1: {name: 'entity.other.attribute-name.jsp'},
                    2: {name: 'punctuation.separator.key-value.jsp'},
                    3: {name: 'string.quoted.double.jsp'},
                    4: {name: 'punctuation.definition.string.begin.jsp'},
                    5: {name: 'punctuation.definition.string.end.jsp'}
                  },
                  match:
                    '(name-given|alias|variable-class|declare|scope|description)(=)((")[^"]*("))'
                }
              ]
            }
          ]
        },
        embedded: {
          begin: '(<)(jsp:(declaration|expression|scriptlet))(>)',
          beginCaptures: {
            0: {name: 'meta.tag.template.$3.jsp'},
            1: {name: 'punctuation.definition.tag.begin.jsp'},
            2: {name: 'entity.name.tag.jsp'},
            4: {name: 'punctuation.definition.tag.end.jsp'}
          },
          contentName: 'source.java',
          end: '((<)/)(jsp:\\3)(>)',
          endCaptures: {
            0: {name: 'meta.tag.template.$4.jsp'},
            1: {name: 'punctuation.definition.tag.begin.jsp'},
            2: {name: 'source.java'},
            3: {name: 'entity.name.tag.jsp'},
            4: {name: 'punctuation.definition.tag.end.jsp'}
          },
          name: 'meta.embedded.block.jsp',
          patterns: [{include: 'source.java'}]
        }
      }
    }
  },
  scopeName: 'text.html.jsp'
}

export default grammar
