var beautify = require('./lib/beautify').js_beautify

var JPScriptProcessor = function(script) {
    this.script = script;
}

JPScriptProcessor.prototype = {
    stripSymbolAt: function() {
        this.script = this.script.replace(/\@(\[)|\@(\")|\@(\{)|\@(\()/g, "$1$2$3$4");
        return this;
    },
    beautify: function() {
        this.script = beautify(this.script);
        return this;
    },
    processPropertyGetter: function() {
        this.script = this.script.replace(/(\.[a-zA-z_]{1}[a-zA-z_1-9]*)/g, "$1()");
        return this;
    },
    replaceNil: function() {
        this.script = this.script.replace(/\bnil\b/g, "null");
        return this;
    },
    restoreDot: function() {
        this.script = this.script.replace(/\|__dot__\|/g, '.');
        return this;
    },
    finalScript: function() {
        this.stripSymbolAt().processPropertyGetter().restoreDot().replaceNil().beautify();
        return this.script;
    }
}


exports.JPScriptProcessor = JPScriptProcessor;