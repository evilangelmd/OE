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
        const listings = $('article[data-element-id]') ;
        let result = {};
            listings.each(function(i, item){
                const jItem = $(item);
                const adId = jItem.data('elementId');
                let element = processElement(adId);
                element.ownerType = jItem.data('isProfessionalAd') ? 2 : 1;
                element.type = type;
                result[adId] = element;
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
        data.surface = parseInt(_element.find('.item-detail:contains("m²")').text().trim().replace(/\D/g, ""));
        data.locals = parseInt(_element.find('.item-detail:contains("local")').text().trim());
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
