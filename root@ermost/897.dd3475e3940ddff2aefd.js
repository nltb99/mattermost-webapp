"use strict";(self.webpackChunkmattermost_webapp=self.webpackChunkmattermost_webapp||[]).push([[897],{80897:(e,n,a)=>{function s(e){const n=e.regex,a={className:"subst",variants:[{begin:"\\$[A-Za-z0-9_]+"},{begin:/\$\{/,end:/\}/}]},s={className:"string",variants:[{begin:'"""',end:'"""'},{begin:'"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},{begin:'[a-z]+"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE,a]},{className:"string",begin:'[a-z]+"""',end:'"""',contains:[a],relevance:10}]},t={className:"type",begin:"\\b[A-Z][A-Za-z0-9_]*",relevance:0},i={className:"title",begin:/[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,relevance:0},l={className:"class",beginKeywords:"class object trait type",end:/[:={\[\n;]/,excludeEnd:!0,contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{beginKeywords:"extends with",relevance:10},{begin:/\[/,end:/\]/,excludeBegin:!0,excludeEnd:!0,relevance:0,contains:[t]},{className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,relevance:0,contains:[t]},i]},c={className:"function",beginKeywords:"def",end:n.lookahead(/[:={\[(\n;]/),contains:[i]};return{name:"Scala",keywords:{literal:"true false null",keyword:"type yield lazy override def with val var sealed abstract private trait object if then forSome for while do throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit export enum given transparent"},contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,s,t,c,l,e.C_NUMBER_MODE,{begin:[/^\s*/,"extension",/\s+(?=[[(])/],beginScope:{2:"keyword"}},{begin:[/^\s*/,/end/,/\s+/,/(extension\b)?/],beginScope:{2:"keyword",4:"keyword"}},{match:/\.inline\b/},{begin:/\binline(?=\s)/,keywords:"inline"},{begin:[/\(\s*/,/using/,/\s+(?!\))/],beginScope:{2:"keyword"}},{className:"meta",begin:"@[A-Za-z]+"}]}}a.r(n),a.d(n,{default:()=>s})}}]);
//# sourceMappingURL=897.dd3475e3940ddff2aefd.js.map