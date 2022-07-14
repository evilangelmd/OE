(function(win){
  let statusBar = {
        text: '',
        _el: $('.statusInfo'),
        update: function(text) {
            this.text = text;
            this.set();
        },
        append: function(text) {
            this.text += text;
            this.set();
        },
        clear: function(){
            this.text = '';
            this.set();
        },
        set: function(){
            this._el.text(this.text);
        }
    }
  
   if(typeof OE !== 'object') {
        win.OE = {};
    }
    
    win.OE.statusBar = statusBar;
})(unsafeWindow);
