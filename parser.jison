
/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"String"              return 'string'
"Number"              return 'number'
"Char"                return 'char'
"Boolean"             return 'boolean'
"Maybe"               return 'maybe'
([a-z]|[A-Z]|\_|\.)+  return 'VAR'
"//+"                 return 'BEGIN'
","                   return ','
"("                   return '('
")"                   return ')'
"["                   return '['
"]"                   return ']'
"{"                   return '{'
"}"                   return '}'
"::"                  return '::'
"->"                  return '->'
":"                   return ':'
"|"                   return '|'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left ','
%left ':'
%left '|'


%start expressions

%% /* language grammar */

expressions
    : BEGIN VAR "::" arg_list EOF
        {return '{"func":"' + $2 + '","args":[' +$4 + ']}';}
    ;

arg_list
    : e
      {$$ = $1;}
    | arg_list "->" e
      {$$ = $1 +"," + $3;}
    ;

primitive
    : string
        {$$ = '"String"';}
    | char
        {$$ = '"Char"';}
    | number
        {$$ = '"Number"';}
    | boolean
        {$$ = '"Boolean"';}
    ;

tuple
    : '(' e ')'
      {$$ = "["+$2+"]";}
    ;

object
    : '{' e '}'
      {$$ = "{"+$2+"}";}
    ;

list
    : '[' primitive ']'
      {$$ = '{"array":' + $2 + '}';}
    | '[' object ']'
      {$$ = '{"array":' + $2 + '}';}
    | '[' tuple ']'
      {$$ = '{"array":' + $2 + '}';}
    | '[' list ']'
      {$$ = '{"array":' + $2 + '}';}
    | '[' or ']'
      {$$ = '{"array":{"or":[' + $2 + ']}}'; }
    ;

or
  : e '|' e
    {$$ = $1 + ',' + $3;}
  ;

value
  : primitive
  | object
  | tuple
  | list
  | VAR
      {$$ = '"' + String(yytext) + '"';}
  ;

e
    : value
    | e ',' e
        {$$ = $1+','+$3;}
    | or
      {$$ = '{"or":[' + $1 + ']}';}
    | maybe value
      {$$ = '{"maybe":' + $2 + '}';}
    |  e ':' e
        {$$ = $1 +':'+ $3;}
    ;
