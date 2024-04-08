(function(win){

    const ribbonPrivate = '<div class="item-ribbon-container"><div class="item-ribbon ribbon-new">Privato</div></div>';
    const ribbonAgency = '<div class="item-ribbon-container"><div class="item-ribbon ribbon-price-down">Agenzia</div></div>';
    
    const utag_data = Object.assign({}, win.dataLayerContext);

    function setPrivates(type){
        listings = getListings(type);
        let ribbon;
        let _element;
        for(let key in listings) {
            if(listings[key].ownerType == 2) {
                ribbon = ribbonAgency;
            } else {
                ribbon = ribbonPrivate;
            }
            _element = $('[data-element-id="'+key+'"] .item-multimedia');
            _element.find('.item-ribbon-container').remove();
            _element.find('.item-gallery, .no-pics').before(ribbon);
        }
        
        return listings;
    }
  
  function getListings(type){
        let tag = utag_data;
let result = {};
            tag.list.ads.forEach(function(item, i){
                let element = processElement(item.adId);
                element.ownerType = parseInt(item.owner.type);
                element.type = type;
                result[item.adId] = element;
            });

        return result;
    }
    
    function processElement(id){
        let _element = $('[data-element-id="'+id+'"]');
        if(_element.length === 0) {
            console.log('non ho trovato: ' + id);
            return;
        }
        let data = {};
        data.id = parseInt(id);
        data.link = document.location.origin + _element.find('.item-link').attr('href');
        data.price = parseInt(_element.find('.item-price').parent().clone().find('span:not(:first)').remove().end().text().trim().replace(/[,\.]00$/, "").replace(/\./g, ""));
        data.surface = parseInt(_element.find('.item-detail span:contains("m2")').text().trim().replace(/\./g, ""));
        data.locals = parseInt(_element.find('.item-detail span:contains("local")').text().trim());
        data.phone = _element.find('span.icon-phone').text().replace("++39", "").trim();
        return data;
    }
    
    if(typeof OE !== 'object') {
        win.OE = {};
        win.OE.parsers = {};
    }
    
    if(typeof win.OE.parsers !== 'object') {
        win.OE.parsers = {};
    }
    
    win.OE.parsers.ide = {
        list: getListings,
        setBadges: setPrivates
    };
})(unsafeWindow);
