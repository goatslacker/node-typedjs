{
    _cj$_runtime.visits.call(0, 0, 1);
    ((function() {
        _cj$_runtime.visits.call(0, 2, 10);
        {
            _cj$_runtime.visits.call(0, 19, 22);
            var exports = this;
        }
        {
            _cj$_runtime.visits.call(0, 43, 46);
            var Code = function(src) {
                _cj$_runtime.visits.call(0, 54, 62);
                _cj$_runtime.visits.funcargs(0, arguments, [ {
                    pos: 63,
                    endpos: 66
                } ]);
                {
                    _cj$_runtime.visits.call(0, 78, 82);
                    this.src = src.split("\n");
                }
            };
        }
        {
            _cj$_runtime.visits.call(0, 117, 121);
            Code.prototype.getCode = function() {
                _cj$_runtime.visits.call(0, 142, 150);
                {
                    _cj$_runtime.visits.call(0, 163, 169);
                    return this.src.join("\n");
                }
            };
        }
        {
            _cj$_runtime.visits.call(0, 202, 206);
            Code.prototype.fix = function(fn, o) {
                _cj$_runtime.visits.call(0, 223, 231);
                _cj$_runtime.visits.funcargs(0, arguments, [ {
                    pos: 232,
                    endpos: 234
                }, {
                    pos: 236,
                    endpos: 237
                } ]);
                {
                    _cj$_runtime.visits.call(0, 249, 252);
                    var line = o.line;
                }
                {
                    _cj$_runtime.visits.call(0, 276, 282);
                    return this.src[line] = fn.call(fn, this.src[line], o, this);
                }
            };
        }
        {
            _cj$_runtime.visits.call(0, 349, 353);
            Code.prototype.getChr = function(r) {
                _cj$_runtime.visits.call(0, 373, 381);
                _cj$_runtime.visits.funcargs(0, arguments, [ {
                    pos: 382,
                    endpos: 383
                } ]);
                {
                    _cj$_runtime.visits.call(0, 395, 398);
                    var lineNo = r.line;
                }
                {
                    _cj$_runtime.visits.call(0, 424, 427);
                    var tabs = this.src[lineNo].split("\t");
                }
                {
                    _cj$_runtime.visits.call(0, 473, 479);
                    return r.character - (tabs.length - 1) * (r.config.indent - 1) - 1;
                }
            };
        }
        {
            _cj$_runtime.visits.call(0, 552, 555);
            var fix = function() {
                _cj$_runtime.visits.call(0, 583, 586);
                {
                    _cj$_runtime.visits.call(0, 583, 586);
                    var helpers = {
                        insertIntoString: function(str, offset, newstr) {
                            _cj$_runtime.visits.call(0, 629, 637);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 638,
                                endpos: 641
                            }, {
                                pos: 643,
                                endpos: 649
                            }, {
                                pos: 651,
                                endpos: 657
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 677, 680);
                                var part1 = str.substr(0, offset);
                            }
                            {
                                _cj$_runtime.visits.call(0, 728, 731);
                                var part2 = str.substr(offset);
                            }
                            {
                                _cj$_runtime.visits.call(0, 776, 782);
                                return part1 + newstr + part2;
                            }
                        },
                        rmFromString: function(str, pos) {
                            _cj$_runtime.visits.call(0, 848, 856);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 857,
                                endpos: 860
                            }, {
                                pos: 862,
                                endpos: 865
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 885, 891);
                                return str.slice(0, pos) + "".substr(0, 1) + "".slice(1) + str.slice(pos + 1);
                            }
                        }
                    };
                }
                {
                    _cj$_runtime.visits.call(0, 997, 1e3);
                    var Fix = {
                        addSemicolon: function(str, o, code) {
                            _cj$_runtime.visits.call(0, 1035, 1043);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 1044,
                                endpos: 1047
                            }, {
                                pos: 1049,
                                endpos: 1050
                            }, {
                                pos: 1052,
                                endpos: 1056
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 1076, 1079);
                                var chr = code.getChr(o);
                            }
                            {
                                _cj$_runtime.visits.call(0, 1118, 1124);
                                return helpers.insertIntoString(str, chr, ";");
                            }
                        },
                        addSpace: function(str, o, code) {
                            _cj$_runtime.visits.call(0, 1203, 1211);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 1212,
                                endpos: 1215
                            }, {
                                pos: 1217,
                                endpos: 1218
                            }, {
                                pos: 1220,
                                endpos: 1224
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 1244, 1247);
                                var chr = code.getChr(o);
                            }
                            {
                                _cj$_runtime.visits.call(0, 1286, 1292);
                                return helpers.insertIntoString(str, chr, " ");
                            }
                        },
                        alreadyDefined: function(str, o) {
                            _cj$_runtime.visits.call(0, 1377, 1385);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 1386,
                                endpos: 1389
                            }, {
                                pos: 1391,
                                endpos: 1392
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 1412, 1415);
                                var a = o.a;
                            }
                            {
                                _cj$_runtime.visits.call(0, 1441, 1444);
                                var rx = new RegExp("(.*)(var " + a + ")");
                            }
                            {
                                _cj$_runtime.visits.call(0, 1501, 1504);
                                var exec = "";
                            }
                            {
                                _cj$_runtime.visits.call(0, 1532, 1535);
                                var incorrect = "";
                            }
                            {
                                _cj$_runtime.visits.call(0, 1568, 1571);
                                var replacement = "";
                            }
                            if (_cj$_runtime.visits.callWithRet(0, rx.test(str), 1610, 1622)) {
                                _cj$_runtime.branches.call(0, 1606, 1608, 1622, 1623);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 1646, 1650);
                                        exec = rx.exec(str);
                                    }
                                    {
                                        _cj$_runtime.visits.call(0, 1687, 1696);
                                        incorrect = str.replace(exec[1], "");
                                    }
                                    {
                                        _cj$_runtime.visits.call(0, 1745, 1756);
                                        replacement = incorrect.replace(exec[2], a);
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 1606, 1608, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 1824, 1830);
                                return str.replace(incorrect, replacement);
                            }
                        },
                        arrayLiteral: function(str) {
                            _cj$_runtime.visits.call(0, 1909, 1917);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 1918,
                                endpos: 1921
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 1941, 1947);
                                return str.replace("new Array()", "[]");
                            }
                        },
                        dotNotation: function(str, o) {
                            _cj$_runtime.visits.call(0, 2022, 2030);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 2031,
                                endpos: 2034
                            }, {
                                pos: 2036,
                                endpos: 2037
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 2057, 2060);
                                var dot = o.a;
                            }
                            {
                                _cj$_runtime.visits.call(0, 2088, 2091);
                                var rx = new RegExp("\\[[\"']" + dot + "[\"']\\]");
                            }
                            {
                                _cj$_runtime.visits.call(0, 2156, 2159);
                                var sqbNotation;
                            }
                            if (_cj$_runtime.visits.callWithRet(0, rx.test(str), 2193, 2205)) {
                                _cj$_runtime.branches.call(0, 2189, 2191, 2205, 2206);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 2229, 2240);
                                        sqbNotation = rx.exec(str);
                                    }
                                    {
                                        _cj$_runtime.visits.call(0, 2277, 2280);
                                        str = str.replace(sqbNotation[0], "." + dot);
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 2189, 2191, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 2357, 2363);
                                return str;
                            }
                        },
                        immed: function(str) {
                            _cj$_runtime.visits.call(0, 2403, 2411);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 2412,
                                endpos: 2415
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 2435, 2438);
                                var rx = /\)\((.*)\);/;
                            }
                            {
                                _cj$_runtime.visits.call(0, 2475, 2478);
                                var params;
                            }
                            if (_cj$_runtime.visits.callWithRet(0, rx.test(str), 2507, 2519)) {
                                _cj$_runtime.branches.call(0, 2503, 2505, 2519, 2520);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 2543, 2549);
                                        params = rx.exec(str);
                                    }
                                    {
                                        _cj$_runtime.visits.call(0, 2586, 2589);
                                        str = str.replace(params[0], "(" + params[1] + "));");
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 2503, 2505, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 2675, 2681);
                                return str;
                            }
                        },
                        indent: function(str, o) {
                            _cj$_runtime.visits.call(0, 2722, 2730);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 2731,
                                endpos: 2734
                            }, {
                                pos: 2736,
                                endpos: 2737
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 2757, 2760);
                                var indent = o.b;
                            }
                            {
                                _cj$_runtime.visits.call(0, 2791, 2794);
                                var config = o.config;
                            }
                            {
                                _cj$_runtime.visits.call(0, 2830, 2833);
                                var ident;
                            }
                            if (_cj$_runtime.visits.callWithRet(0, config.auto_indent === true, 2861, 2888) && _cj$_runtime.visits.callWithRet(0, config.indentpref, 2892, 2909)) {
                                _cj$_runtime.branches.call(0, 2857, 2859, 2909, 2910);
                                {
                                    if (_cj$_runtime.visits.callWithRet(0, config.indentpref === "spaces", 2937, 2967)) {
                                        _cj$_runtime.branches.call(0, 2933, 2935, 2967, 2968);
                                        {
                                            {
                                                _cj$_runtime.visits.call(0, 2995, 2998);
                                                str = (new Array(indent)).join(" ") + str.trim();
                                            }
                                        }
                                    } else {
                                        _cj$_runtime.branches.call(0, 2933, 2935, 3067, 3071);
                                        if (_cj$_runtime.visits.callWithRet(0, config.indentpref === "tabs", 3076, 3104)) {
                                            _cj$_runtime.branches.call(0, 3072, 3074, 3104, 3105);
                                            {
                                                {
                                                    _cj$_runtime.visits.call(0, 3132, 3137);
                                                    ident = (indent + 1) / config.indent;
                                                }
                                                if (_cj$_runtime.visits.callWithRet(0, ident > 0, 3198, 3207)) {
                                                    _cj$_runtime.branches.call(0, 3194, 3196, 3207, 3208);
                                                    {
                                                        {
                                                            _cj$_runtime.visits.call(0, 3239, 3242);
                                                            str = (new Array(ident)).join("\t") + str.trim();
                                                        }
                                                    }
                                                } else _cj$_runtime.branches.call(0, 3194, 3196, 0, 0);
                                            }
                                        } else _cj$_runtime.branches.call(0, 3072, 3074, 0, 0);
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 2857, 2859, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 3371, 3377);
                                return str;
                            }
                        },
                        invokeConstructor: function(str) {
                            _cj$_runtime.visits.call(0, 3429, 3437);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 3438,
                                endpos: 3441
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 3461, 3464);
                                var rx = /new [a-zA-Z_$][0-9a-zA-Z_$]*\(/g;
                            }
                            {
                                _cj$_runtime.visits.call(0, 3521, 3524);
                                var result = str;
                            }
                            function addInvocation(tmp) {
                                _cj$_runtime.visits.call(0, 3555, 3563);
                                _cj$_runtime.visits.funcargs(0, arguments, [ {
                                    pos: 3578,
                                    endpos: 3581
                                } ]);
                                {
                                    _cj$_runtime.visits.call(0, 3605, 3608);
                                    var rx = /new ([a-zA-Z_$][0-9a-zA-Z_$]*)/;
                                }
                                {
                                    _cj$_runtime.visits.call(0, 3668, 3671);
                                    var res;
                                }
                                if (_cj$_runtime.visits.callWithRet(0, rx.test(tmp), 3701, 3713)) {
                                    _cj$_runtime.branches.call(0, 3697, 3699, 3713, 3714);
                                    {
                                        {
                                            _cj$_runtime.visits.call(0, 3741, 3744);
                                            res = rx.exec(tmp).shift();
                                        }
                                        {
                                            _cj$_runtime.visits.call(0, 3793, 3796);
                                            str = str.replace(res, res + "()");
                                        }
                                    }
                                } else _cj$_runtime.branches.call(0, 3697, 3699, 0, 0);
                                {
                                    _cj$_runtime.visits.call(0, 3871, 3877);
                                    return str;
                                }
                            }
                            if (_cj$_runtime.visits.callWithRet(0, rx.test(str), 3921, 3933)) {
                                _cj$_runtime.branches.call(0, 3917, 3919, 3933, 3934);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 3957, 3963);
                                        result = str.replace(rx, "");
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 3917, 3919, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 4021, 4027);
                                return addInvocation(result);
                            }
                        },
                        leadingDecimal: function(str) {
                            _cj$_runtime.visits.call(0, 4094, 4102);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 4103,
                                endpos: 4106
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 4126, 4129);
                                var rx = /([\D])(\.[0-9]*)/;
                            }
                            {
                                _cj$_runtime.visits.call(0, 4171, 4174);
                                var result;
                            }
                            if (_cj$_runtime.visits.callWithRet(0, rx.test(str), 4203, 4215)) {
                                _cj$_runtime.branches.call(0, 4199, 4201, 4215, 4216);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 4239, 4245);
                                        result = rx.exec(str);
                                    }
                                    {
                                        _cj$_runtime.visits.call(0, 4282, 4285);
                                        str = str.replace(rx, result[1] + "0" + result[2]);
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 4199, 4201, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 4368, 4374);
                                return str;
                            }
                        },
                        mixedSpacesNTabs: function(str, o) {
                            _cj$_runtime.visits.call(0, 4425, 4433);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 4434,
                                endpos: 4437
                            }, {
                                pos: 4439,
                                endpos: 4440
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 4460, 4463);
                                var config = o.config;
                            }
                            {
                                _cj$_runtime.visits.call(0, 4499, 4502);
                                var spaces;
                            }
                            if (_cj$_runtime.visits.callWithRet(0, config.indentpref, 4531, 4548)) {
                                _cj$_runtime.branches.call(0, 4527, 4529, 4548, 4549);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 4572, 4578);
                                        spaces = (new Array(config.indent + 1)).join(" ");
                                    }
                                    if (_cj$_runtime.visits.callWithRet(0, config.indentpref === "spaces", 4647, 4677)) {
                                        _cj$_runtime.branches.call(0, 4643, 4645, 4677, 4678);
                                        {
                                            {
                                                _cj$_runtime.visits.call(0, 4705, 4708);
                                                str = str.replace(/\t/g, spaces);
                                            }
                                        }
                                    } else {
                                        _cj$_runtime.branches.call(0, 4643, 4645, 4761, 4765);
                                        if (_cj$_runtime.visits.callWithRet(0, config.indentpref === "tabs", 4770, 4798)) {
                                            _cj$_runtime.branches.call(0, 4766, 4768, 4798, 4799);
                                            {
                                                {
                                                    _cj$_runtime.visits.call(0, 4826, 4829);
                                                    str = str.replace(new RegExp(spaces, "g"), "\t");
                                                }
                                            }
                                        } else _cj$_runtime.branches.call(0, 4766, 4768, 0, 0);
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 4527, 4529, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 4932, 4938);
                                return str;
                            }
                        },
                        noDeleteVar: function(str) {
                            _cj$_runtime.visits.call(0, 4984, 4992);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 4993,
                                endpos: 4996
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 5016, 5019);
                                var rx = /delete ([a-zA-Z_$][0-9a-zA-Z_$]*)/;
                            }
                            {
                                _cj$_runtime.visits.call(0, 5078, 5081);
                                var exec;
                            }
                            if (_cj$_runtime.visits.callWithRet(0, rx.test(str), 5108, 5120)) {
                                _cj$_runtime.branches.call(0, 5104, 5106, 5120, 5121);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 5144, 5148);
                                        exec = rx.exec(str);
                                    }
                                    {
                                        _cj$_runtime.visits.call(0, 5185, 5188);
                                        str = str.replace(exec[0], exec[1] + " = undefined");
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 5104, 5106, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 5273, 5279);
                                return str;
                            }
                        },
                        noNew: function(str) {
                            _cj$_runtime.visits.call(0, 5319, 5327);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 5328,
                                endpos: 5331
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 5351, 5354);
                                var rx = /new ([a-zA-Z_$][0-9a-zA-Z_$]*)/;
                            }
                            {
                                _cj$_runtime.visits.call(0, 5410, 5413);
                                var exec;
                            }
                            {
                                _cj$_runtime.visits.call(0, 5436, 5439);
                                var rmnew = "";
                            }
                            if (_cj$_runtime.visits.callWithRet(0, rx.test(str), 5472, 5484)) {
                                _cj$_runtime.branches.call(0, 5468, 5470, 5484, 5485);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 5508, 5512);
                                        exec = rx.exec(str);
                                    }
                                    {
                                        _cj$_runtime.visits.call(0, 5549, 5554);
                                        rmnew = exec[0].replace("new ", "");
                                    }
                                    {
                                        _cj$_runtime.visits.call(0, 5606, 5609);
                                        str = str.replace(exec[0], rmnew);
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 5468, 5470, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 5675, 5681);
                                return str;
                            }
                        },
                        objectLiteral: function(str) {
                            _cj$_runtime.visits.call(0, 5729, 5737);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 5738,
                                endpos: 5741
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 5761, 5767);
                                return str.replace("new Object()", "{}");
                            }
                        },
                        objNoConstruct: function(str) {
                            _cj$_runtime.visits.call(0, 5846, 5854);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 5855,
                                endpos: 5858
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 5878, 5881);
                                var rx = /new (Number|String|Boolean|Math|JSON)/;
                            }
                            {
                                _cj$_runtime.visits.call(0, 5944, 5947);
                                var exec;
                            }
                            if (_cj$_runtime.visits.callWithRet(0, rx.test(str), 5974, 5986)) {
                                _cj$_runtime.branches.call(0, 5970, 5972, 5986, 5987);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 6010, 6014);
                                        exec = rx.exec(str);
                                    }
                                    {
                                        _cj$_runtime.visits.call(0, 6051, 6054);
                                        str = str.replace(exec[0], exec[1]);
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 5970, 5972, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 6122, 6128);
                                return str;
                            }
                        },
                        useIsNaN: function(str) {
                            _cj$_runtime.visits.call(0, 6171, 6179);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 6180,
                                endpos: 6183
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 6203, 6206);
                                var rx = /([a-zA-Z_$][0-9a-zA-Z_$]*)( )*(=|!)(=|==)( )*NaN/;
                            }
                            {
                                _cj$_runtime.visits.call(0, 6280, 6283);
                                var exec;
                            }
                            if (_cj$_runtime.visits.callWithRet(0, rx.test(str), 6310, 6322)) {
                                _cj$_runtime.branches.call(0, 6306, 6308, 6322, 6323);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 6346, 6350);
                                        exec = rx.exec(str);
                                    }
                                    if (_cj$_runtime.visits.callWithRet(0, exec, 6391, 6395)) {
                                        _cj$_runtime.branches.call(0, 6387, 6389, 6395, 6396);
                                        {
                                            {
                                                _cj$_runtime.visits.call(0, 6423, 6426);
                                                str = str.replace(exec[0], (_cj$_runtime.visits.callWithRet(0, exec[3] === "!", 6451, 6466) ? _cj$_runtime.visits.callWithRet(0, "!", 6469, 6472) : _cj$_runtime.visits.callWithRet(0, "", 6475, 6477)) + "isNaN(" + exec[1] + ")");
                                            }
                                        }
                                    } else _cj$_runtime.branches.call(0, 6387, 6389, 0, 0);
                                }
                            } else _cj$_runtime.branches.call(0, 6306, 6308, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 6564, 6570);
                                return str;
                            }
                        },
                        radix: function(str) {
                            _cj$_runtime.visits.call(0, 6610, 6618);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 6619,
                                endpos: 6622
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 6642, 6645);
                                var rx = /parseInt\((.*)\)/;
                            }
                            {
                                _cj$_runtime.visits.call(0, 6687, 6690);
                                var exec;
                            }
                            if (_cj$_runtime.visits.callWithRet(0, rx.test(str), 6717, 6729)) {
                                _cj$_runtime.branches.call(0, 6713, 6715, 6729, 6730);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 6753, 6757);
                                        exec = rx.exec(str);
                                    }
                                    {
                                        _cj$_runtime.visits.call(0, 6794, 6797);
                                        str = str.replace(exec[0], "parseInt(" + exec[1] + ", 10)");
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 6713, 6715, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 6889, 6895);
                                return str;
                            }
                        },
                        rmChar: function(str, o, code) {
                            _cj$_runtime.visits.call(0, 6936, 6944);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 6945,
                                endpos: 6948
                            }, {
                                pos: 6950,
                                endpos: 6951
                            }, {
                                pos: 6953,
                                endpos: 6957
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 6977, 6980);
                                var chr = code.getChr(o);
                            }
                            {
                                _cj$_runtime.visits.call(0, 7019, 7025);
                                return helpers.rmFromString(str, chr);
                            }
                        },
                        rmDebugger: function() {
                            _cj$_runtime.visits.call(0, 7097, 7105);
                            {
                                _cj$_runtime.visits.call(0, 7126, 7132);
                                return "";
                            }
                        },
                        rmUndefined: function(str) {
                            _cj$_runtime.visits.call(0, 7177, 7185);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 7186,
                                endpos: 7189
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 7209, 7215);
                                return str.replace(/( )*=( )*undefined/, "");
                            }
                        },
                        rmTrailingWhitespace: function(str) {
                            _cj$_runtime.visits.call(0, 7304, 7312);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 7313,
                                endpos: 7316
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 7336, 7342);
                                return str.replace(/\s+$/g, "");
                            }
                        },
                        tme: function() {
                            _cj$_runtime.visits.call(0, 7401, 7409);
                            {
                                _cj$_runtime.visits.call(0, 7430, 7435);
                                throw new Error("Too many errors reported by JSHint.");
                            }
                        },
                        trailingDecimal: function(str) {
                            _cj$_runtime.visits.call(0, 7530, 7538);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 7539,
                                endpos: 7542
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 7562, 7565);
                                var rx = /([0-9]*)\.(\D)/;
                            }
                            {
                                _cj$_runtime.visits.call(0, 7605, 7608);
                                var result;
                            }
                            if (_cj$_runtime.visits.callWithRet(0, rx.test(str), 7637, 7649)) {
                                _cj$_runtime.branches.call(0, 7633, 7635, 7649, 7650);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 7673, 7679);
                                        result = rx.exec(str);
                                    }
                                    {
                                        _cj$_runtime.visits.call(0, 7716, 7719);
                                        str = str.replace(rx, result[1] + result[2]);
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 7633, 7635, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 7796, 7802);
                                return str;
                            }
                        },
                        wrapRegExp: function(str) {
                            _cj$_runtime.visits.call(0, 7847, 7855);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 7856,
                                endpos: 7859
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 7879, 7882);
                                var rx = /\/(.*)\/\w?/;
                            }
                            {
                                _cj$_runtime.visits.call(0, 7919, 7922);
                                var result;
                            }
                            if (_cj$_runtime.visits.callWithRet(0, rx.test(str), 7951, 7963)) {
                                _cj$_runtime.branches.call(0, 7947, 7949, 7963, 7964);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 7987, 7993);
                                        result = rx.exec(str);
                                    }
                                    {
                                        _cj$_runtime.visits.call(0, 8030, 8033);
                                        str = str.replace(rx, "(" + result[0] + ")");
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 7947, 7949, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 8110, 8116);
                                return str;
                            }
                        }
                    };
                }
                {
                    _cj$_runtime.visits.call(0, 8155, 8161);
                    return Fix;
                }
            }();
        }
        {
            _cj$_runtime.visits.call(0, 8180, 8183);
            var errors = {};
        }
        function w(priority, err, fn) {
            _cj$_runtime.visits.call(0, 8201, 8209);
            _cj$_runtime.visits.funcargs(0, arguments, [ {
                pos: 8212,
                endpos: 8220
            }, {
                pos: 8222,
                endpos: 8225
            }, {
                pos: 8227,
                endpos: 8229
            } ]);
            {
                _cj$_runtime.visits.call(0, 8241, 8247);
                errors[err] = {
                    priority: priority,
                    fix: function(r, code) {
                        _cj$_runtime.visits.call(0, 8306, 8314);
                        _cj$_runtime.visits.funcargs(0, arguments, [ {
                            pos: 8315,
                            endpos: 8316
                        }, {
                            pos: 8318,
                            endpos: 8322
                        } ]);
                        {
                            _cj$_runtime.visits.call(0, 8342, 8348);
                            return code.fix(fn, r);
                        }
                    }
                };
            }
        }
        {
            _cj$_runtime.visits.call(0, 8401, 8402);
            w(0, "Extra comma.", fix.rmChar);
        }
        {
            _cj$_runtime.visits.call(0, 8439, 8440);
            w(0, "Missing semicolon.", fix.addSemicolon);
        }
        {
            _cj$_runtime.visits.call(0, 8489, 8490);
            w(0, "Missing space after '{a}'.", fix.addSpace);
        }
        {
            _cj$_runtime.visits.call(0, 8543, 8544);
            w(0, "Unexpected space after '{a}'.", fix.rmChar);
        }
        {
            _cj$_runtime.visits.call(0, 8598, 8599);
            w(0, "Unnecessary semicolon.", fix.rmChar);
        }
        {
            _cj$_runtime.visits.call(0, 8646, 8647);
            w(1, "'{a}' is already defined.", fix.alreadyDefined);
        }
        {
            _cj$_runtime.visits.call(0, 8705, 8706);
            w(1, "['{a}'] is better written in dot notation.", fix.dotNotation);
        }
        {
            _cj$_runtime.visits.call(0, 8778, 8779);
            w(1, "A leading decimal point can be confused with a dot: '.{a}'.", fix.leadingDecimal);
        }
        {
            _cj$_runtime.visits.call(0, 8871, 8872);
            w(1, "A trailing decimal point can be confused with a dot '{a}'.", fix.trailingDecimal);
        }
        {
            _cj$_runtime.visits.call(0, 8964, 8965);
            w(1, "All 'debugger' statements should be removed.", fix.rmDebugger);
        }
        {
            _cj$_runtime.visits.call(0, 9038, 9039);
            w(1, "Do not use {a} as a constructor.", fix.objNoConstruct);
        }
        {
            _cj$_runtime.visits.call(0, 9104, 9105);
            w(1, "Do not use 'new' for side effects.", fix.noNew);
        }
        {
            _cj$_runtime.visits.call(0, 9163, 9164);
            w(1, "Expected '{a}' to have an indentation at {b} instead at {c}.", fix.indent);
        }
        {
            _cj$_runtime.visits.call(0, 9249, 9250);
            w(1, "It is not necessary to initialize '{a}' to 'undefined'.", fix.rmUndefined);
        }
        {
            _cj$_runtime.visits.call(0, 9335, 9336);
            w(1, "Missing '()' invoking a constructor.", fix.invokeConstructor);
        }
        {
            _cj$_runtime.visits.call(0, 9408, 9409);
            w(1, "Missing radix parameter.", fix.radix);
        }
        {
            _cj$_runtime.visits.call(0, 9457, 9458);
            w(1, "Mixed spaces and tabs.", fix.mixedSpacesNTabs);
        }
        {
            _cj$_runtime.visits.call(0, 9515, 9516);
            w(1, "Move the invocation into the parens that contain the function.", fix.immed);
        }
        {
            _cj$_runtime.visits.call(0, 9602, 9603);
            w(1, "Trailing whitespace.", fix.rmTrailingWhitespace);
        }
        {
            _cj$_runtime.visits.call(0, 9662, 9663);
            w(1, "Use the isNaN function to compare with NaN.", fix.useIsNaN);
        }
        {
            _cj$_runtime.visits.call(0, 9733, 9734);
            w(1, "Use the array literal notation [].", fix.arrayLiteral);
        }
        {
            _cj$_runtime.visits.call(0, 9799, 9800);
            w(1, "Use the object literal notation {}.", fix.objectLiteral);
        }
        {
            _cj$_runtime.visits.call(0, 9867, 9868);
            w(1, "Variables should not be deleted.", fix.noDeleteVar);
        }
        {
            _cj$_runtime.visits.call(0, 9930, 9931);
            w(1, "Wrap the /regexp/ literal in parens to disambiguate the slash operator.", fix.wrapRegExp);
        }
        {
            _cj$_runtime.visits.call(0, 10031, 10032);
            w(2, "Too many errors.", fix.tme);
        }
        {
            _cj$_runtime.visits.call(0, 10070, 10077);
            exports.fixMyJS = function() {
                _cj$_runtime.visits.call(0, 10109, 10117);
                function copyResults(result, config) {
                    _cj$_runtime.visits.call(0, 10109, 10117);
                    _cj$_runtime.visits.funcargs(0, arguments, [ {
                        pos: 10130,
                        endpos: 10136
                    }, {
                        pos: 10138,
                        endpos: 10144
                    } ]);
                    {
                        _cj$_runtime.visits.call(0, 10160, 10163);
                        var r = {};
                    }
                    {
                        _cj$_runtime.visits.call(0, 10184, 10190);
                        Object.keys(result).forEach(function(key) {
                            _cj$_runtime.visits.call(0, 10212, 10220);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 10221,
                                endpos: 10224
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 10244, 10245);
                                r[key] = result[key];
                            }
                        });
                    }
                    {
                        _cj$_runtime.visits.call(0, 10294, 10295);
                        r.line -= 1;
                    }
                    {
                        _cj$_runtime.visits.call(0, 10319, 10320);
                        r.config = config;
                    }
                    {
                        _cj$_runtime.visits.call(0, 10350, 10356);
                        return r;
                    }
                }
                function fixError(r, code) {
                    _cj$_runtime.visits.call(0, 10378, 10386);
                    _cj$_runtime.visits.funcargs(0, arguments, [ {
                        pos: 10396,
                        endpos: 10397
                    }, {
                        pos: 10399,
                        endpos: 10403
                    } ]);
                    {
                        _cj$_runtime.visits.call(0, 10419, 10425);
                        errors[r.raw].fix(r, code);
                    }
                }
                function fixErrors(code, config) {
                    _cj$_runtime.visits.call(0, 10465, 10473);
                    _cj$_runtime.visits.funcargs(0, arguments, [ {
                        pos: 10484,
                        endpos: 10488
                    }, {
                        pos: 10490,
                        endpos: 10496
                    } ]);
                    {
                        _cj$_runtime.visits.call(0, 10512, 10518);
                        return function(result) {
                            _cj$_runtime.visits.call(0, 10519, 10527);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 10528,
                                endpos: 10534
                            } ]);
                            {
                                _cj$_runtime.visits.call(0, 10554, 10557);
                                var r = copyResults(result, config);
                            }
                            {
                                _cj$_runtime.visits.call(0, 10607, 10615);
                                fixError(r, code);
                            }
                        };
                    }
                }
                function byPriority(a, b) {
                    _cj$_runtime.visits.call(0, 10659, 10667);
                    _cj$_runtime.visits.funcargs(0, arguments, [ {
                        pos: 10679,
                        endpos: 10680
                    }, {
                        pos: 10682,
                        endpos: 10683
                    } ]);
                    {
                        _cj$_runtime.visits.call(0, 10699, 10702);
                        var p1 = errors[a.raw].priority;
                    }
                    {
                        _cj$_runtime.visits.call(0, 10744, 10747);
                        var p2 = errors[b.raw].priority;
                    }
                    if (_cj$_runtime.visits.callWithRet(0, p1 === p2, 10793, 10802)) {
                        _cj$_runtime.branches.call(0, 10789, 10791, 10802, 10803);
                        {
                            if (_cj$_runtime.visits.callWithRet(0, a.line === b.line, 10826, 10843)) {
                                _cj$_runtime.branches.call(0, 10822, 10824, 10843, 10844);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 10867, 10873);
                                        return b.character - a.character;
                                    }
                                }
                            } else {
                                _cj$_runtime.branches.call(0, 10822, 10824, 10919, 10923);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 10946, 10952);
                                        return b.line - a.line;
                                    }
                                }
                            }
                        }
                    } else {
                        _cj$_runtime.branches.call(0, 10789, 10791, 11002, 11006);
                        {
                            {
                                _cj$_runtime.visits.call(0, 11025, 11031);
                                return p1 - p2;
                            }
                        }
                    }
                }
                function fixMyJS(data, src) {
                    _cj$_runtime.visits.call(0, 11073, 11081);
                    _cj$_runtime.visits.funcargs(0, arguments, [ {
                        pos: 11090,
                        endpos: 11094
                    }, {
                        pos: 11096,
                        endpos: 11099
                    } ]);
                    {
                        _cj$_runtime.visits.call(0, 11115, 11118);
                        var code = new Code(src);
                    }
                    {
                        _cj$_runtime.visits.call(0, 11153, 11156);
                        var results = _cj$_runtime.visits.callWithRet(0, data.errors, 11167, 11178) || _cj$_runtime.visits.callWithRet(0, [], 11182, 11184);
                    }
                    {
                        _cj$_runtime.visits.call(0, 11198, 11201);
                        var config = _cj$_runtime.visits.callWithRet(0, data.options, 11211, 11223) || _cj$_runtime.visits.callWithRet(0, {}, 11227, 11229);
                    }
                    {
                        _cj$_runtime.visits.call(0, 11243, 11246);
                        var dupes = {};
                    }
                    {
                        _cj$_runtime.visits.call(0, 11271, 11274);
                        var current = 0;
                    }
                    {
                        _cj$_runtime.visits.call(0, 11300, 11307);
                        results = results.filter(function(v) {
                            _cj$_runtime.visits.call(0, 11325, 11333);
                            _cj$_runtime.visits.funcargs(0, arguments, [ {
                                pos: 11334,
                                endpos: 11335
                            } ]);
                            if (_cj$_runtime.visits.callWithRet(0, !v, 11359, 11361)) {
                                _cj$_runtime.branches.call(0, 11355, 11357, 11361, 11362);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 11385, 11391);
                                        return false;
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 11355, 11357, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 11433, 11436);
                                var err = "line" + v.line + "char" + v.character + "reason" + v.reason;
                            }
                            if (_cj$_runtime.visits.callWithRet(0, dupes.hasOwnProperty(err), 11525, 11550)) {
                                _cj$_runtime.branches.call(0, 11521, 11523, 11550, 11551);
                                {
                                    {
                                        _cj$_runtime.visits.call(0, 11574, 11580);
                                        return false;
                                    }
                                }
                            } else _cj$_runtime.branches.call(0, 11521, 11523, 0, 0);
                            {
                                _cj$_runtime.visits.call(0, 11622, 11627);
                                dupes[err] = v;
                            }
                            {
                                _cj$_runtime.visits.call(0, 11654, 11660);
                                return errors.hasOwnProperty(v.raw);
                            }
                        });
                    }
                    {
                        _cj$_runtime.visits.call(0, 11719, 11726);
                        results.sort(byPriority);
                    }
                    {
                        _cj$_runtime.visits.call(0, 11757, 11763);
                        return {
                            getErrors: function() {
                                _cj$_runtime.visits.call(0, 11793, 11801);
                                {
                                    _cj$_runtime.visits.call(0, 11826, 11832);
                                    return results.slice(0);
                                }
                            },
                            getCode: function() {
                                _cj$_runtime.visits.call(0, 11895, 11903);
                                {
                                    _cj$_runtime.visits.call(0, 11928, 11934);
                                    return code.getCode();
                                }
                            },
                            getConfig: function() {
                                _cj$_runtime.visits.call(0, 11997, 12005);
                                {
                                    _cj$_runtime.visits.call(0, 12030, 12036);
                                    return JSON.parse(JSON.stringify(config));
                                }
                            },
                            hasNext: function() {
                                _cj$_runtime.visits.call(0, 12117, 12125);
                                {
                                    _cj$_runtime.visits.call(0, 12150, 12156);
                                    return current < results.length;
                                }
                            },
                            next: function() {
                                _cj$_runtime.visits.call(0, 12224, 12232);
                                if (_cj$_runtime.visits.callWithRet(0, !this.hasNext(), 12261, 12276)) {
                                    _cj$_runtime.branches.call(0, 12257, 12259, 12276, 12277);
                                    {
                                        {
                                            _cj$_runtime.visits.call(0, 12304, 12309);
                                            throw new Error("End of list.");
                                        }
                                    }
                                } else _cj$_runtime.branches.call(0, 12257, 12259, 0, 0);
                                {
                                    _cj$_runtime.visits.call(0, 12379, 12382);
                                    var r = copyResults(results[current], config);
                                }
                                {
                                    _cj$_runtime.visits.call(0, 12446, 12449);
                                    var data = {
                                        fix: function() {
                                            _cj$_runtime.visits.call(0, 12488, 12496);
                                            {
                                                _cj$_runtime.visits.call(0, 12529, 12537);
                                                fixError(r, code);
                                            }
                                            {
                                                _cj$_runtime.visits.call(0, 12576, 12582);
                                                return code.getCode();
                                            }
                                        },
                                        getDetails: function() {
                                            _cj$_runtime.visits.call(0, 12662, 12670);
                                            {
                                                _cj$_runtime.visits.call(0, 12703, 12709);
                                                return JSON.parse(JSON.stringify(r));
                                            }
                                        }
                                    };
                                }
                                {
                                    _cj$_runtime.visits.call(0, 12810, 12817);
                                    current += 1;
                                }
                                {
                                    _cj$_runtime.visits.call(0, 12844, 12850);
                                    return data;
                                }
                            },
                            run: function() {
                                _cj$_runtime.visits.call(0, 12897, 12905);
                                {
                                    _cj$_runtime.visits.call(0, 12930, 12937);
                                    results.forEach(fixErrors(code, config));
                                }
                                {
                                    _cj$_runtime.visits.call(0, 12992, 12998);
                                    return code.getCode();
                                }
                            }
                        };
                    }
                }
                {
                    _cj$_runtime.visits.call(0, 13066, 13072);
                    return fixMyJS;
                }
            }();
        }
        if (_cj$_runtime.visits.callWithRet(0, typeof module !== "undefined", 13099, 13128)) {
            _cj$_runtime.branches.call(0, 13095, 13097, 13128, 13129);
            {
                {
                    _cj$_runtime.visits.call(0, 13140, 13146);
                    module.exports = exports.fixMyJS;
                }
            }
        } else _cj$_runtime.branches.call(0, 13095, 13097, 0, 0);
    })).call(this);
}
