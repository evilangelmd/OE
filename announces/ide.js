(function(win){

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
            _element = $('[data-adid="'+key+'"] .item-multimedia');
            _element.find('.item-ribbon-container').remove();
            _element.find('.item-gallery').before(ribbon);
        }
        
        return listings;
    }
  
  function getListings(type){
        let tag = utag_data;
        let ids = tag.list_ads_adId;
        let owners = tag.list_ads_owner_type;

        let result = {};

        try {
            result = owners.reduce(function (result, field, index) {
                let element = processElement(ids[index]);
                element.ownerType = parseInt(field);
                element.type = type;
                result[ids[index]] = element;
                return result;
            }, {});
        } catch (e) {
            tag.list.ads.forEach(function(item, i){
                let element = processElement(item.adId);
                element.ownerType = parseInt(item.owner.type);
                element.type = type;
                result[item.adId] = element;
            });
        }

        return result;
    }
    
    if(typeof OE !== 'object') {
        win.OE = {};
        win.OE.parsers = {};
    }
    
    win.OE.parsers.ide = {
        list: getListings,
        setBadges: setPrivates
    };
})(unsafeWindow);
