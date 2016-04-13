var beautify = require('./lib/beautify').js_beautify

var JPScriptProcessor = function(script) {
    this.script = script;
    this.stringPair = {};
}

JPScriptProcessor.prototype = {
    replaceString: function() {
        var regex = /"(?:\\"|[^"])*"/g;
        var index = 0;
        this.stringPair = {};
        var self = this;
        this.script = this.script.replace(regex, function (result) {
            var replacement = '###' + index.toString() + '#####';
            self.stringPair[replacement] = result;
            index++;
            return replacement;
        })
        return this;
    },
    restoreString: function() {
        for (var replacement in this.stringPair) {
            this.script = this.script.replace(replacement, this.stringPair[replacement]);
        }
        return this;
    },
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
    replaceSuper: function() {
        this.script = this.script.replace(/(super\.)/g, 'self.super().');
        return this;
    },
    finalScript: function() {
        this.stripSymbolAt().replaceString().processPropertyGetter().restoreDot().replaceNil().replaceSuper().restoreString().beautify();
        return this.script;
    }
}


exports.JPScriptProcessor = JPScriptProcessor;